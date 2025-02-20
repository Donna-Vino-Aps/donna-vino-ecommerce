import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopWinesSection from "@/components/Slider/TopWinesSection";

describe("TopWinesSection", () => {
  test("renders the title, subtitle, and description", () => {
    render(<TopWinesSection />);
    expect(screen.getByText(/Most Popular Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Wines/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our Exclusive Selection of Finest Wines, Handpicked for You/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders at least one WineCardSmall", () => {
    render(<TopWinesSection />);
    const wineCards = screen.getAllByTestId("wine-card");
    expect(wineCards.length).toBeGreaterThan(0);
  });

  test("renders the navigation buttons", () => {
    render(<TopWinesSection />);
    const prevButton = screen.getByAltText("Previous");
    const nextButton = screen.getByAltText("Next");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
});
