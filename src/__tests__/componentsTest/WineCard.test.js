import React from "react";
import { render, screen } from "@testing-library/react";
import WineCard from "@/components/Card/WineCard";
import { LanguageProvider } from "@/context/LanguageContext";

describe("WineCardSmall Component", () => {
  const mockProps = {
    title: "Château Margaux",
    price: 0.0,
    imageUrl: "/images/exampleImageWine.png",
  };

  test("renders WineCardSmall with title, price, and image", () => {
    render(
      <LanguageProvider>
        <WineCard {...mockProps} />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("wine-title")).toHaveTextContent(mockProps.title);
    expect(screen.getByTestId("wine-price")).toHaveTextContent(mockProps.price);
    expect(screen.getByTestId("wine-image")).toBeInTheDocument();
  });

  test("renders 'New' badge when isNew is true", () => {
    render(
      <LanguageProvider>
        <WineCard {...mockProps} isNew={true} />
      </LanguageProvider>,
    );

    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
