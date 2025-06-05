import React from "react";
import { render, screen } from "@testing-library/react";
import Canceled from "@/app/signup/canceled/page";
import { useLanguage } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("Canceled Page", () => {
  const defaultTranslations = {
    "signUp.canceled.title": "Verification Canceled",
    "signUp.canceled.message":
      "Your email verification has been canceled. You can always try again later.",
    "common.button.backToHome": "Back to Home",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({ translations: defaultTranslations });
  });

  test("should display verification canceled message with appropriate elements", () => {
    render(<Canceled />);

    const title = screen.getByText(
      defaultTranslations["signUp.canceled.title"],
    );
    expect(title).toBeInTheDocument();
    const message = screen.getByText(
      defaultTranslations["signUp.canceled.message"],
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
