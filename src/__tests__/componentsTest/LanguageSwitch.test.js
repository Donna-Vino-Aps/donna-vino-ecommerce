import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LanguageSwitch from "../../components/NavBar/LanguageSwitch";
import { LanguageProvider } from "../../context/LanguageContext";

describe("LanguageSwitch component", () => {
  test("should render LanguageSwitch component correctly", () => {
    render(
      <LanguageProvider>
        <LanguageSwitch />
      </LanguageProvider>,
    );

    const languageSwitch = screen.getByTestId("language-switch");
    expect(languageSwitch).toBeInTheDocument();

    const englishIcon = screen.getByTestId("en-icon");
    expect(englishIcon).toBeInTheDocument();

    const denmarkIcon = screen.getByTestId("dk-icon");
    expect(denmarkIcon).toBeInTheDocument();
  });

  test("should have the correct class when the icon is clicked", () => {
    render(
      <LanguageProvider>
        <LanguageSwitch />
      </LanguageProvider>,
    );

    const englishIcon = screen.getByTestId("en-icon");
    expect(englishIcon).toHaveClass("hover:bg-primary-light");

    const denmarkIcon = screen.getByTestId("dk-icon");
    fireEvent.click(denmarkIcon);

    expect(denmarkIcon).toHaveClass("hover:bg-primary-light");
    expect(englishIcon.classList.contains("bg-primary-light")).toBe(false);
  });
});
