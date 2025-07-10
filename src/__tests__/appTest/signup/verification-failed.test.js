import React from "react";
import { render, screen } from "@testing-library/react";
import VerificationFailed from "@/app/signup/verification-failed/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("VerificationFailed Page", () => {
  const defaultTranslations = {
    "signUp.verificationFailed.title": "Verification Failed",
    "signUp.verificationFailed.message":
      "There was a problem with your verification. Please try signing up again or contact our support team if the issue persists.",
    "signUp.verificationFailed.signup.button": "Sign Up Again",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("should display verification failed message with appropriate elements", () => {
    render(<VerificationFailed />);

    const title = screen.getByText(
      defaultTranslations["signUp.verificationFailed.title"],
    );
    expect(title).toBeInTheDocument();

    const message = screen.getByText(
      defaultTranslations["signUp.verificationFailed.message"],
    );
    expect(message).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: defaultTranslations["signUp.verificationFailed.signup.button"],
    });
    expect(button).toBeInTheDocument();

    const link = button.closest("a");
    expect(link).toHaveAttribute("href", "/signup");
  });
});
