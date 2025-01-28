import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/page";
import { LanguageProvider } from "../../context/LanguageContext";
import enTranslations from "../../translations/en.json";

describe("Home Page", () => {
  // Mock the screen size adjustment for small screens
  const renderWithLanguage = (translations = enTranslations) => {
    return render(
      <LanguageProvider value={translations}>
        <Home />
      </LanguageProvider>,
    );
  };

  beforeEach(() => {
    renderWithLanguage();
  });

  it("should render the home page content", () => {
    // Check that the main container is rendered
    const mainContainer = screen.getByTestId("home-container");
    expect(mainContainer).toBeInTheDocument();
  });
});
