import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Welcome from "@/app/signup/welcome/page";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/api/useFetch";
import * as sessionStorage from "@/utils/sessionStorage";
import * as loggingUtils from "@/utils/logging";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the LanguageContext
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

// Mock the useFetch hook
jest.mock("@/hooks/api/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock sessionStorage
jest.mock("@/utils/sessionStorage", () => ({
  getSessionItem: jest.fn(),
  SESSION_KEYS: { PENDING_USER_EMAIL: "PENDING_USER_EMAIL" },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} alt={props.alt || ""} />,
}));

// Constants matching the Welcome component
const COOLDOWN_SECONDS = 60;
const MAX_RESEND_ATTEMPTS = 5;

describe("Welcome Page", () => {
  const mockRouter = { push: jest.fn() };
  const mockPerformFetch = jest.fn();
  const defaultTranslations = {
    "signUp.welcome.title": "👏 Done! Welcome on board! 👏",
    "signUp.welcome.message":
      "Your email has been successfully registered in our system. <strong>Please check your inbox</strong> for the confirmation email regarding your registration. Once confirmed, you will be able to access your personalized profile dashboard, where you can upload your profile picture, update your information, and complete all the required details to streamline your future orders and enhance your shopping experience.",
    "signUp.welcome.button": "Back to the log in page",
    "signUp.welcome.resend": "Didn't receive the email?",
    "signUp.welcome.resend.button": "Resend",
    "signUp.welcome.resend.sending": "Sending...",
    "signUp.welcome.resend.success":
      "Verification email has been resent successfully! If you still don't see the email, please check your spam folder.",
    "signUp.welcome.resend.error":
      "Failed to resend the verification email. Please try again.",
    "signUp.welcome.resend.noEmail":
      "No email address found. Please try signing up again.",
    "signUp.welcome.resend.maxAttempts":
      "Maximum resend attempts reached. Please contact support if you still haven't received the email.",
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
    useFetch.mockReturnValue({
      performFetch: mockPerformFetch,
      isLoading: false,
      error: null,
    });
    sessionStorage.getSessionItem.mockReturnValue("test@example.com");
  });

  test("renders welcome page with correct title and buttons", () => {
    render(<Welcome />);
    expect(screen.getByText(/Done! Welcome on board!/i)).toBeInTheDocument();
    expect(screen.getByText(/Didn't receive the email?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Back to the log in page/i }),
    ).toBeInTheDocument();
  });

  test("login button redirects to login page", () => {
    render(<Welcome />);
    const loginButton = screen.getByRole("button", {
      name: /Back to the log in page/i,
    });
    fireEvent.click(loginButton);
    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });

  test("calls resend API with correct email", () => {
    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");

    act(() => {
      fireEvent.click(resendButton);
    });

    expect(mockPerformFetch).toHaveBeenCalledWith({
      method: "GET",
      params: { email: "test@example.com" },
    });
  });

  test("shows no email error when email is not available", () => {
    sessionStorage.getSessionItem.mockReturnValue(null);

    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");

    act(() => {
      fireEvent.click(resendButton);
    });

    const messageElement = screen.getByTestId("resend-message");
    expect(messageElement).toHaveTextContent(/No email address found/i);
  });

  test("shows success message after successful resend", async () => {
    let onReceivedCallback;

    useFetch.mockImplementation(
      (endpoint, method, params, parser, onReceived) => {
        onReceivedCallback = onReceived;
        return {
          performFetch: mockPerformFetch,
          isLoading: false,
          error: null,
        };
      },
    );

    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");

    act(() => {
      fireEvent.click(resendButton);
    });

    act(() => {
      onReceivedCallback({ success: true, msg: "Success" });
    });

    const messageElement = screen.getByTestId("resend-message");
    expect(messageElement).toHaveTextContent(
      /Verification email has been resent successfully!/i,
    );
  });

  test("shows loading state while sending", () => {
    useFetch.mockReturnValue({
      performFetch: mockPerformFetch,
      isLoading: true,
      error: null,
    });

    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");
    expect(resendButton).toHaveTextContent(/Sending/i);
  });

  test("shows error message on API failure", async () => {
    let onReceivedCallback;

    useFetch.mockImplementation(
      (endpoint, method, params, parser, onReceived) => {
        onReceivedCallback = onReceived;
        return {
          performFetch: mockPerformFetch,
          isLoading: false,
          error: null,
        };
      },
    );

    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");

    act(() => {
      fireEvent.click(resendButton);
    });

    act(() => {
      onReceivedCallback({ success: false, msg: "Failed to resend" });
    });

    const messageElement = screen.getByTestId("resend-message");
    expect(messageElement).toHaveTextContent(/Failed to resend/i);
  });

  test("shows max attempts message after reaching limit", async () => {
    jest.useFakeTimers();

    let onReceivedCallback;

    useFetch.mockImplementation(
      (endpoint, method, params, parser, onReceived) => {
        onReceivedCallback = onReceived;
        return {
          performFetch: mockPerformFetch,
          isLoading: false,
          error: null,
        };
      },
    );

    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");

    for (let i = 0; i < MAX_RESEND_ATTEMPTS; i++) {
      act(() => {
        fireEvent.click(resendButton);
      });

      act(() => {
        onReceivedCallback({ success: true, msg: "Success" });
      });

      if (i < MAX_RESEND_ATTEMPTS - 1) {
        act(() => {
          jest.advanceTimersByTime(COOLDOWN_SECONDS * 1000 + 100);
        });
      }
    }

    expect(screen.getByTestId("resend-message")).toHaveTextContent(
      /Verification email has been resent successfully!/i,
    );

    act(() => {
      jest.advanceTimersByTime(3100);
    });

    expect(screen.getByTestId("resend-message")).toHaveTextContent(
      /Maximum resend attempts reached/i,
    );

    jest.useRealTimers();
  });

  test("disables resend button during cooldown", async () => {
    jest.useFakeTimers();

    let onReceivedCallback;

    useFetch.mockImplementation(
      (endpoint, method, params, parser, onReceived) => {
        onReceivedCallback = onReceived;
        return {
          performFetch: mockPerformFetch,
          isLoading: false,
          error: null,
        };
      },
    );

    render(<Welcome />);
    const resendButton = screen.getByTestId("resend-button");

    act(() => {
      fireEvent.click(resendButton);
    });

    act(() => {
      onReceivedCallback({ success: true, msg: "Success" });
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(resendButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(COOLDOWN_SECONDS * 1000 + 100);
    });

    expect(resendButton).not.toBeDisabled();

    jest.useRealTimers();
  });
});
