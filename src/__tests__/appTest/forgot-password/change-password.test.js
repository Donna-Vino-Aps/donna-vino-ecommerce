import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePassword from "@/app/change-password/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/context/ApiProvider", () => ({
  useAPI: () => ({
    post: jest.fn(),
    error: null,
    isLoading: false,
  }),
}));

const defaultTranslations = {
  "changePassword.heading": "Change your password",
  "changePassword.paragraph1": "Please type a new password.",
  "changePassword.paragraph2":
    "Your new password must be different to previously used ones.",
  "changePassword.button": "Set new password",
  "changePassword.back.button": "Back to login",
  "validation.passwordFormat":
    "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., !, @, #, $).",
  "validation.passwordMatch":
    "Passwords do not match. Please check and try again.",
  "validation.required": "This field is required.",
};

describe("ChangePassword Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("renders heading, description and buttons", () => {
    render(<ChangePassword />);
    expect(
      screen.getByText(defaultTranslations["changePassword.heading"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultTranslations["changePassword.paragraph1"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultTranslations["changePassword.paragraph2"]),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: defaultTranslations["changePassword.button"],
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: defaultTranslations["changePassword.back.button"],
      }),
    ).toBeInTheDocument();
  });

  test("shows error for empty password fields", async () => {
    render(<ChangePassword />);
    fireEvent.click(
      screen.getByRole("button", {
        name: defaultTranslations["changePassword.button"],
      }),
    );

    await waitFor(() => {
      expect(
        screen.getAllByText(defaultTranslations["validation.required"]).length,
      ).toBe(2);
    });
  });

  test("shows error for password mismatch", async () => {
    render(<ChangePassword />);
    const passwordInputs = screen.getAllByLabelText(/password/i);
    fireEvent.change(passwordInputs[0], { target: { value: "Password123!" } });
    fireEvent.change(passwordInputs[1], { target: { value: "Password1234!" } });

    fireEvent.click(
      screen.getByRole("button", {
        name: defaultTranslations["changePassword.button"],
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(defaultTranslations["validation.passwordMatch"]),
      ).toBeInTheDocument();
    });
  });

  test("shows error for invalid password format", async () => {
    render(<ChangePassword />);
    const passwordInputs = screen.getAllByLabelText(/password/i);
    fireEvent.change(passwordInputs[0], { target: { value: "short" } });
    fireEvent.change(passwordInputs[1], { target: { value: "short" } });

    fireEvent.click(
      screen.getByRole("button", {
        name: defaultTranslations["changePassword.button"],
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(defaultTranslations["validation.passwordFormat"]),
      ).toBeInTheDocument();
    });
  });
});
