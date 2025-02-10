import React from "react";
import { render, screen } from "@testing-library/react";
import LoginForm from "@/components/LogIn/LoginForm.js";
import { useLanguage } from "@/context/LanguageContext";

// Mock useLanguage to avoid translation errors
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    useLanguage.mockReturnValue({
      translations: {
        "logIn.mail": "Email",
        "logIn.password": "Password",
        "logIn.button": "Log In",
      },
    });
    render(<LoginForm />);
  });

  test("renders the login container div", () => {
    // Check if the login container div is rendered
    expect(screen.getByTestId("login-container")).toBeInTheDocument();
  });

  test("renders the email input", () => {
    expect(screen.getByTestId("login-input-email")).toBeInTheDocument();
  });

  test("renders the password input", () => {
    expect(screen.getByTestId("login-input-password")).toBeInTheDocument();
  });

  test("renders the login button", () => {
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
});
