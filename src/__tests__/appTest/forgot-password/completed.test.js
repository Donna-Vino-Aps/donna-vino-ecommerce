import React from "react";
import { render, screen } from "@testing-library/react";
import Completed from "@/app/change-password/completed/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Completed Page", () => {
  const defaultTranslations = {
    "changePassword.completed.heading": "Password successfully reset!",
    "changePassword.completed.paragraph1":
      "Your password has been updated. You can now log in with your new password.",
    "changePassword.completed.button": "Back to login",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("should display completed title, message and button", () => {
    render(<Completed />);
    expect(
      screen.getByText(defaultTranslations["changePassword.completed.heading"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        defaultTranslations["changePassword.completed.paragraph1"],
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: defaultTranslations["changePassword.completed.button"],
      }),
    ).toBeInTheDocument();
  });
});
