import React from "react";
import { render, screen, act } from "@testing-library/react";
import VerificationCompleted from "@/app/signup/verification-completed/page";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("@/components/UI/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner-mock">Loading...</div>,
}));

describe("VerificationCompleted Page", () => {
  const defaultTranslations = {
    "signUp.verification-completed.title": "Verification Completed",
    "signUp.verification-completed.message":
      "Your email has been verified successfully! You will be redirected to the homepage.",
  };

  let mockSearchParams;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    useLanguage.mockReturnValue({ translations: defaultTranslations });

    mockSearchParams = new URLSearchParams();
    useSearchParams.mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should render the verification completed page with correct content", () => {
    render(<VerificationCompleted />);

    const title = screen.getByText(
      defaultTranslations["signUp.verification-completed.title"],
    );
    expect(title).toBeInTheDocument();
    const message = screen.getByText(
      defaultTranslations["signUp.verification-completed.message"],
    );
    expect(message).toBeInTheDocument();
    const image = screen.getByAltText("verification completed");
    expect(image).toBeInTheDocument();
  });

  test("should not call signIn when tokens are not in URL params", () => {
    render(<VerificationCompleted />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(signIn).not.toHaveBeenCalled();
  });

  test("should call signIn with correct params after timeout when tokens are provided", () => {
    mockSearchParams = new URLSearchParams({
      accessToken: "test-access-token",
      refreshToken: "test-refresh-token",
    });
    useSearchParams.mockReturnValue(mockSearchParams);

    render(<VerificationCompleted />);

    expect(signIn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(signIn).toHaveBeenCalledWith("apiToken", {
      accessToken: "test-access-token",
      refreshToken: "test-refresh-token",
      callbackUrl: "/",
    });
  });
});
