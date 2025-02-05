import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/page";
import { LanguageProvider } from "../../context/LanguageContext";
import enTranslations from "../../translations/en.json";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("Home Page", () => {
  const renderWithLanguage = (translations = enTranslations) => {
    return render(
      <LanguageProvider value={translations}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Home />
        </LocalizationProvider>
      </LanguageProvider>,
    );
  };

  beforeEach(() => {
    renderWithLanguage();
  });

  it("should render the home page content", () => {
    const mainContainer = screen.getByTestId("home-container");
    expect(mainContainer).toBeInTheDocument();
  });
});
