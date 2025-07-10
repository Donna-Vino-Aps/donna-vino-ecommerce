import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Pending from "@/app/signup/pending/page";
import { useLanguage } from "@/context/LanguageContext";
import { APIProvider, useAPI } from "@/context/ApiProvider";
import { useRouter } from "next/navigation";
import * as sessionStorage from "@/utils/sessionStorage";
import * as loggingUtils from "@/utils/logging";
import { SessionProvider } from "next-auth/react";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the LanguageContext
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

// Mock the useAPI hook from ApiProvider
jest.mock("@/context/ApiProvider", () => ({
  ...jest.requireActual("@/context/ApiProvider"),
  useAPI: jest.fn(),
}));

// Mock sessionStorage
jest.mock("@/utils/sessionStorage", () => ({
  getSessionItem: jest.fn(),
  SESSION_KEYS: { PENDING_USER_EMAIL: "PENDING_USER_EMAIL" },
}));

// Constants matching the Pending component
const COOLDOWN_SECONDS = 60;
const MAX_RESEND_ATTEMPTS = 3;

describe("Pending Page", () => {
  const mockRouter = { push: jest.fn() };
  const mockPost = jest.fn();
  const defaultTranslations = {
    "signUp.welcome.title": "Done! Welcome on board!",
    "signUp.welcome.resend": "Didn't receive the email?",
    "signUp.welcome.resend.button": "Resend",
    "signUp.welcome.resend.sending": "Sending...",
    "signUp.welcome.resend.success":
      "Verification email has been resent successfully! If you still don't see the email, please check your spam folder.",
    "signUp.welcome.resend.error":
      "Failed to resend the verification email. Please try again.",
    "signUp.welcome.resend.noEmail":
      "No email address found. Please try signing up again.",
    "signUp.welcome.resend.maxReached": "Max attempts reached",
  };

  beforeAll(() => {
    jest.spyOn(loggingUtils, "logInfo").mockImplementation(() => {});
    jest.spyOn(loggingUtils, "logError").mockImplementation(() => {});
    jest.spyOn(loggingUtils, "logWarning").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
    useLanguage.mockReturnValue({ translations: defaultTranslations });
    useAPI.mockReturnValue({
      post: mockPost,
      isLoading: false,
      error: null,
    });
    sessionStorage.getSessionItem.mockReturnValue("test@example.com");
  });

  const renderWithProvider = (
    ui,
    { providerProps, session, ...renderOptions } = {},
  ) => {
    const mockSession = session || {
      data: {
        user: {
          email: "test@example.com",
          name: "Test User",
          id: "123",
          role: "user",
        },
        accessToken: "mock-access-token",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      status: "authenticated",
    };

    return render(
      <SessionProvider session={mockSession}>
        <APIProvider {...providerProps}>{ui}</APIProvider>
      </SessionProvider>,
      renderOptions,
    );
  };

  test("renders pending page with correct title and resend button", () => {
    renderWithProvider(<Pending />);
    expect(screen.getByText(/Done! Welcome on board!/i)).toBeInTheDocument();
    expect(screen.getByText(/Didn't receive the email?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resend/i })).toBeInTheDocument();
  });

  test("calls resend API with correct email and POST method", async () => {
    mockPost.mockResolvedValue({ success: true, message: "Email sent" });
    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/register/email/resend", {
        payload: { email: "test@example.com" },
      });
    });
  });

  test("shows no email error when email is not available", async () => {
    sessionStorage.getSessionItem.mockReturnValue(null);

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    fireEvent.click(resendButton);

    await waitFor(() => {
      const messageElement = screen.getByTestId("resend-message");
      expect(messageElement).toHaveTextContent(/No email address found/i);
    });
  });

  test("shows success message after successful resend", async () => {
    mockPost.mockResolvedValue({ success: true, message: "Success!" });

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    fireEvent.click(resendButton);

    await waitFor(() => {
      const messageElement = screen.getByTestId("resend-message");
      expect(messageElement).toHaveTextContent(
        /Verification email has been resent successfully!/i,
      );
    });
  });

  test("shows loading state while sending", () => {
    useAPI.mockReturnValue({
      post: mockPost,
      isLoading: true,
      error: null,
    });

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");
    expect(resendButton).toHaveTextContent(/Sending/i);
    expect(resendButton).toBeDisabled();
  });

  test("shows error message on API failure from useAPI error state", async () => {
    useAPI.mockReturnValue({
      post: mockPost.mockResolvedValue(null),
      isLoading: false,
      error: "Network connection failed",
    });

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    fireEvent.click(resendButton);

    await waitFor(() => {
      const messageElement = screen.getByTestId("resend-message");
      expect(messageElement).toHaveTextContent(
        /Failed to resend the verification email. Please try again./i,
      );
    });
  });

  test("shows error message on API failure from response", async () => {
    mockPost.mockResolvedValue({
      success: false,
      message: "Backend specific error, should not be shown",
    });

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    fireEvent.click(resendButton);

    await waitFor(() => {
      const messageElement = screen.getByTestId("resend-message");
      expect(messageElement).toHaveTextContent(
        /Backend specific error, should not be shown/i,
      );
    });
  });

  test("shows max attempts message after reaching limit", async () => {
    jest.useFakeTimers();
    mockPost.mockResolvedValue({ success: true, msg: "Success" });

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    for (let i = 0; i < MAX_RESEND_ATTEMPTS; i++) {
      fireEvent.click(resendButton);
      await act(async () => {
        await Promise.resolve();
      });

      if (i < MAX_RESEND_ATTEMPTS - 1) {
        act(() => {
          jest.advanceTimersByTime(COOLDOWN_SECONDS * 1000 + 100);
        });
      }
    }

    await waitFor(() => {
      expect(screen.getByTestId("resend-message")).toHaveTextContent(
        /Verification email has been resent successfully!/i,
      );
    });

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    expect(resendButton).toBeDisabled();
    expect(resendButton).toHaveTextContent(/Max attempts reached/i);

    jest.useRealTimers();
  });

  test("disables resend button during cooldown", async () => {
    jest.useFakeTimers();
    mockPost.mockResolvedValue({ success: true, msg: "Success" });

    renderWithProvider(<Pending />);
    const resendButton = screen.getByTestId("resend-button");

    fireEvent.click(resendButton);

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(resendButton).toBeDisabled());

    act(() => {
      jest.advanceTimersByTime(COOLDOWN_SECONDS * 1000 + 100);
    });

    await waitFor(() => expect(resendButton).not.toBeDisabled());

    jest.useRealTimers();
  });
});
