import React from "react";
import { render, screen } from "@testing-library/react";
import LoginForm from "@/components/LogIn/LoginForm.js";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

// Mock useLanguage to avoid translation errors
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
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

    useRouter.mockReturnValue({
      push: jest.fn(), // Mock navigation function
    });

    render(<LoginForm />);
  });

  test("renders the login container div", async () => {
    const loginContainer = await screen.findByTestId("login-container");
    expect(loginContainer).toBeInTheDocument();
  });

  // test("renders the email input", async () => {
  //   const emailInput = await screen.findByTestId("login-input-email");
  //   expect(emailInput).toBeInTheDocument();
  // });

  // test("renders the password input", async () => {
  //   const passwordInput = await screen.findByTestId("login-input-password");
  //   expect(passwordInput).toBeInTheDocument();
  // });

  // test("renders the login button", async () => {
  //   const loginButton = await screen.findByTestId("login-button");
  //   expect(loginButton).toBeInTheDocument();
  // });
});
