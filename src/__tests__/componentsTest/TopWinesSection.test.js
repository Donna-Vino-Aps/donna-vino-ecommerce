import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopWinesSection from "@/components/Slider/TopWinesSection";
import { LanguageProvider } from "@/context/LanguageContext";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    translations: {
      "topwinesection.title": "Most Popular Products",
      "topwinesection.headline": "Our Top Wines",
      "topwinesection.description":
        "Our Exclusive Selection of Finest Wines, Handpicked for You Discover our wine selection",
      "topwinesection.button-more": "See full catalog",
    },
  }),
  LanguageProvider: ({ children }) => children,
}));

jest.mock("@/context/TopWinesContext", () => ({
  useTopWines: () => ({
    wines: [
      {
        id: 1,
        bottlePrice: 122,
        title: "Roccapietra Blanc De Noirs Brut - SCUROPASSO 1",
        imageUrl:
          "/images/https://cdn.shopify.com/s/files/1/0944/0149/5386/files/RoccaPietra_BlancDeNoirs_MedotoClassico.png?v=1751443154.jpg",
        rating: 4.5,
        reviews: 10,
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

describe("TopWinesSection", () => {
  test("renders the title, subtitle, and description", () => {
    render(
      <LanguageProvider>
        <TopWinesSection />
      </LanguageProvider>,
    );
    expect(screen.getByText(/Most Popular Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Wines/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our Exclusive Selection of Finest Wines, Handpicked for You/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders at least one WineCard", () => {
    render(
      <LanguageProvider>
        <TopWinesSection />
      </LanguageProvider>,
    );
    const wineCards = screen.getAllByTestId("wine-card");
    expect(wineCards.length).toBeGreaterThan(0);
    expect(wineCards[0]).toHaveTextContent(
      "Roccapietra Blanc De Noirs Brut - SCUROPASSO 1",
    );
  });

  test("renders the navigation buttons", () => {
    render(
      <LanguageProvider>
        <TopWinesSection />
      </LanguageProvider>,
    );
    const prevButton = screen.getByAltText("Previous");
    const nextButton = screen.getByAltText("Next");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
});
