import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VerificationFailed from "@/app/signup/verification-failed/page";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the LanguageContext
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("VerificationFailed Page", () => {
  const mockRouter = { push: jest.fn() };
  const mockSearchParams = new Map();
  let mockType = "error";
  let mockResent = false;

  const defaultTranslations = {
    "signUp.verificationFailed.expiredResent.title": "Check Your Email",
    "signUp.verificationFailed.notFound.title": "Registration Issue",
    "signUp.verificationFailed.generic.title": "Verification Failed",
    "signUp.verificationFailed.expiredResent.message":
      "We've sent a new verification email to your inbox. Please check your email and click the link to complete your registration.",
    "signUp.verificationFailed.notFound.message":
      "Something happened during the registration process. Please try signing up again.",
    "signUp.verificationFailed.generic.message":
      "There was a problem with your verification. Please try signing up again or contact our support team if the issue persists.",
    "signUp.verificationFailed.login.button": "Go to Login",
    "signUp.verificationFailed.signup.button": "Sign Up Again",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup router mock
    useRouter.mockReturnValue(mockRouter);

    // Setup translations mock
    useLanguage.mockReturnValue({ translations: defaultTranslations });

    // Setup searchParams mock
    mockSearchParams.get = jest.fn((key) => {
      if (key === "type") return mockType;
      if (key === "resent") return mockResent ? "true" : null;
      return null;
    });
    useSearchParams.mockReturnValue(mockSearchParams);
  });

  const resetMocks = (type, resent) => {
    mockType = type;
    mockResent = resent;
  };

  test("renders generic error state correctly", () => {
    resetMocks("error", false);

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

  test("renders missing token state correctly", () => {
    resetMocks("missing", false);

    render(<VerificationFailed />);

    expect(screen.getByText("Verification Failed")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Up Again" }),
    ).toBeInTheDocument();
  });

  test("renders expired token state correctly", () => {
    resetMocks("expired", false);

    render(<VerificationFailed />);

    expect(screen.getByText("Verification Failed")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Up Again" }),
    ).toBeInTheDocument();
  });

  test("renders invalid token state correctly", () => {
    resetMocks("invalid", false);

    render(<VerificationFailed />);

    expect(screen.getByText("Verification Failed")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Up Again" }),
    ).toBeInTheDocument();
  });

  test("renders not_found state correctly", () => {
    resetMocks("not_found", false);

    render(<VerificationFailed />);

    expect(screen.getByText("Registration Issue")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Something happened during the registration process. Please try signing up again.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Up Again" }),
    ).toBeInTheDocument();
  });

  test("renders expired with resent=true state correctly", () => {
    resetMocks("expired", true);

    render(<VerificationFailed />);

    expect(screen.getByText("Check Your Email")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We've sent a new verification email to your inbox. Please check your email and click the link to complete your registration.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to Login" }),
    ).toBeInTheDocument();
  });

  test("navigates to signup page when sign up again button is clicked", () => {
    resetMocks("error", false);

    render(<VerificationFailed />);

    const signUpButton = screen.getByRole("button", { name: "Sign Up Again" });
    fireEvent.click(signUpButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/signup");
  });

  test("navigates to login page when go to login button is clicked", () => {
    resetMocks("expired", true);

    render(<VerificationFailed />);

    const loginButton = screen.getByRole("button", { name: "Go to Login" });
    fireEvent.click(loginButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });

  test("uses default value when searchParams returns null for type", () => {
    mockSearchParams.get = jest.fn(() => null);
    useSearchParams.mockReturnValue(mockSearchParams);

    render(<VerificationFailed />);

    expect(screen.getByText("Verification Failed")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Up Again" }),
    ).toBeInTheDocument();
  });
});
