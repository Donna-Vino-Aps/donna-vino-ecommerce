import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/page";
import { LanguageProvider } from "../../context/LanguageContext";
import enTranslations from "../../translations/en.json";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  const renderWithLanguage = (translations = enTranslations) => {
    return render(
      <GoogleOAuthProvider>
        <LanguageProvider value={translations}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Home />
          </LocalizationProvider>
        </LanguageProvider>
        ,
      </GoogleOAuthProvider>,
    );
  };

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      pathname: "/",
    });

    renderWithLanguage();
  });

  it("should render the home page content", () => {
    const mainContainer = screen.queryByTestId("home-container");
    expect(mainContainer).toBeInTheDocument();
  });
});
