import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckInbox from "@/app/check-in-box/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPost = jest.fn();
jest.mock("@/context/ApiProvider", () => ({
  useAPI: () => ({
    post: mockPost,
    error: null,
    isLoading: false,
  }),
}));

jest.mock("@/hooks/api/useApiError", () => ({
  useApiError: () => null,
}));

describe("CheckInbox Page", () => {
  const defaultTranslations = {
    "forgotPassword.success-heading": "Check your inbox.",
    "forgotPassword.success-text1":
      "Please check your email address. We've sent a link to",
    "forgotPassword.success-text2": "to reset your password.",
    "forgotPassword.resend": "Didn't receive the email?",
    "forgotPassword.resend2": "Resend",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "test@example.com"),
      },
      writable: true,
    });
  });

  test("renders heading, info text and resend button", () => {
    render(<CheckInbox />);
    expect(
      screen.getByText(defaultTranslations["forgotPassword.success-heading"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(defaultTranslations["forgotPassword.success-text1"], "i"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(defaultTranslations["forgotPassword.success-text2"], "i"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: defaultTranslations["forgotPassword.resend2"],
      }),
    ).toBeInTheDocument();
  });

  test("calls resend API when clicking resend button", async () => {
    mockPost.mockResolvedValue({ message: "Resent successfully" });
    render(<CheckInbox />);
    const resendButton = screen.getByRole("button", {
      name: defaultTranslations["forgotPassword.resend2"],
    });
    fireEvent.click(resendButton);

    await waitFor(() =>
      expect(mockPost).toHaveBeenCalledWith("register/resend-password-reset", {
        payload: { email: "test@example.com" },
      }),
    );
  });

  test("shows API message after resend", async () => {
    mockPost.mockResolvedValue({ message: "Resent successfully" });
    render(<CheckInbox />);
    const resendButton = screen.getByRole("button", {
      name: defaultTranslations["forgotPassword.resend2"],
    });
    fireEvent.click(resendButton);

    await waitFor(() =>
      expect(screen.getByText("Resent successfully")).toBeInTheDocument(),
    );
  });
});
