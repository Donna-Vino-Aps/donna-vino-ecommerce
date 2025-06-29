import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopWinesSection from "@/components/Slider/TopWinesSection";
import { LanguageProvider } from "@/context/LanguageContext";

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

  test("renders at least one WineCardSmall", () => {
    render(
      <LanguageProvider>
        <TopWinesSection />
      </LanguageProvider>,
    );
    const wineCards = screen.getAllByTestId("wine-card");
    expect(wineCards.length).toBeGreaterThan(0);
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
