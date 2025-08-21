import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "@/app/forgotpassword/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/ApiProvider", () => ({
  useAPI: () => ({
    post: jest.fn(),
    error: null,
    isLoading: false,
  }),
}));

describe("ForgotPassword Page", () => {
  const defaultTranslations = {
    "forgotPassword.heading": "Forgot your password?",
    "forgotPassword.paragraph": "Enter your email to reset.",
    "forgotPassword.button": "Send reset link",
    "validation.emailFormat": "Please enter a valid email address.",
    "validation.required": "This field is required.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("should display heading, paragraph and button", () => {
    render(<ForgotPassword />);
    expect(
      screen.getByText(defaultTranslations["forgotPassword.heading"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultTranslations["forgotPassword.paragraph"]),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: defaultTranslations["forgotPassword.button"],
      }),
    ).toBeInTheDocument();
  });

  test("shows error for empty email", async () => {
    render(<ForgotPassword />);
    const submitButton = screen.getByRole("button", {
      name: defaultTranslations["forgotPassword.button"],
    });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(defaultTranslations["validation.required"]),
      ).toBeInTheDocument(),
    );
  });

  test("shows error for invalid email", async () => {
    render(<ForgotPassword />);
    const emailInput = screen.getByRole("textbox");
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });

    const submitButton = screen.getByRole("button", {
      name: defaultTranslations["forgotPassword.button"],
    });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(defaultTranslations["validation.emailFormat"]),
      ).toBeInTheDocument(),
    );
  });
});
