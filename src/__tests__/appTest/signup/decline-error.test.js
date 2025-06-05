import React from "react";
import { render, screen } from "@testing-library/react";
import DeclineError from "@/app/signup/decline-error/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("DeclineError Page", () => {
  const defaultTranslations = {
    "signUp.declineError.title": "Email Verification Error",
    "signUp.declineError.message":
      "There was an error during the email verification process. Please try again or contact our support team.",
    "common.button.backToHome": "Back to Home",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("should display verification error message with appropriate elements", () => {
    render(<DeclineError />);

    const title = screen.getByText(
      defaultTranslations["signUp.declineError.title"],
    );
    expect(title).toBeInTheDocument();
    const message = screen.getByText(
      defaultTranslations["signUp.declineError.message"],
    );
    expect(message).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: defaultTranslations["common.button.backToHome"],
    });
    expect(button).toBeInTheDocument();

    const link = button.closest("a");
    expect(link).toHaveAttribute("href", "/");
  });
});
