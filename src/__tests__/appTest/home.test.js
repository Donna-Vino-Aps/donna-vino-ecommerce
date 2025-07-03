import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/page";
import { LanguageProvider } from "@/context/LanguageContext";
import enTranslations from "../../translations/en.json";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";

jest.mock("@/context/PreSaleWinesContext", () => ({
  usePreSaleWines: () => ({
    wines: [
      {
        id: 1,
        bottlePrice: 122,
        title: "Roccapietra Blanc De Noirs Brut - SCUROPASSO 1",
        imageUrl:
          "/images/https://cdn.shopify.com/s/files/1/0944/0149/5386/files/RoccaPietra_BlancDeNoirs_MedotoClassico.png?v=1751443154.jpg",
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

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
