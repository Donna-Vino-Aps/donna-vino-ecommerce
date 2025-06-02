import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VerificationFailed from "@/app/signup/verification-failed/page";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the LanguageContext
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("VerificationFailed Page", () => {
  const mockRouter = { push: jest.fn() };

  const defaultTranslations = {
    "signUp.verificationFailed.title": "Verification Failed",
    "signUp.verificationFailed.message":
      "There was a problem with your verification. Please try signing up again or contact our support team if the issue persists.",
    "signUp.verificationFailed.signup.button": "Sign Up Again",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup router mock
    useRouter.mockReturnValue(mockRouter);

    // Setup translations mock
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("should render the verification failed page correctly", () => {
    render(<VerificationFailed />);

    expect(screen.getByText("Verification Failed")).toBeInTheDocument();
    expect(
      screen.getByText(
        "There was a problem with your verification. Please try signing up again or contact our support team if the issue persists.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Up Again" }),
    ).toBeInTheDocument();
  });

  test("should navigate to signup page when button is clicked", () => {
    render(<VerificationFailed />);

    const button = screen.getByRole("button", { name: "Sign Up Again" });
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("/signup");
  });
});
