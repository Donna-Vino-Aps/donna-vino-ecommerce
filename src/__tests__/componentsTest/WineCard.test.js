import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WineCard from "@/components/Card/WineCard";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/ShoppingCartContext";

const mockWine = {
  title: "Château Margaux",
  bottlePrice: 150.0,
  imageUrl: "/images/exampleImageWine.png",
  rating: 4.7,
  nrOfRatings: 134,
  variantMap: {
    bottle: {
      id: "variant123",
      price: {
        amount: 150.0,
        currencyCode: "DKK",
      },
    },
  },
};

describe("WineCard Component", () => {
  const renderWithProviders = (ui) => {
    return render(
      <LanguageProvider>
        <CartProvider>{ui}</CartProvider>
      </LanguageProvider>,
    );
  };

  test("renders wine title, price, and image", () => {
    renderWithProviders(
      <WineCard wine={mockWine} context="pre-sale" setShowPopup={jest.fn()} />,
    );

    expect(screen.getByTestId("wine-title")).toHaveTextContent(mockWine.title);
    expect(screen.getByTestId("wine-price")).toHaveTextContent("Kr. 150,00");
    expect(screen.getByTestId("wine-image")).toBeInTheDocument();
  });

  test("renders 'New' badge when isNew is true", () => {
    renderWithProviders(
      <WineCard
        wine={mockWine}
        isNew
        context="pre-sale"
        setShowPopup={jest.fn()}
      />,
    );
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  test("adds wine to cart", () => {
    const mockSetShowPopup = jest.fn();
    renderWithProviders(
      <WineCard
        wine={mockWine}
        context="pre-sale"
        setShowPopup={mockSetShowPopup}
      />,
    );

    const button = screen.getByTestId("addToCart-button");
    fireEvent.click(button);

    expect(button).toHaveTextContent(/Added to Cart/i);
    expect(mockSetShowPopup).toHaveBeenCalled(); //
  });
});
