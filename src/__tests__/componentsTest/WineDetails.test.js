// src/__tests__/componentsTest/WineDetails.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import WineDetails from "../../components/WineDetails/WineDetails";

// Mock next/image as a simple img tag
jest.mock("next/image", () => (props) => {
  return <img {...props} alt={props.alt} />;
});

// Mock useLanguage hook
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    translations: {
      "wine-details.instock": "In Stock",
      "wine-details.outofstock": "Out of Stock",
      "wine-details.switch-preorder": "Switch to Pre-Order",
      "wine-details.presale": "Pre Order",
    },
  }),
}));

// Mock Button component
jest.mock("../../components/Button/Button", () => (props) => (
  <button {...props}>{props.text}</button>
));

// Minimal wine mock
const wineMock = {
  id: "gid://shopify/Product/10252479529306",
  title: "Test Wine",
  description:
    "Nuanced, berry flavor with hints of strawberries, wild raspberries, spices, blood orange, herbs and nuts.",
  images: [
    {
      url: "https://cdn.shopify.com/s/files/1/0944/0149/5386/files/catena-min.png?v=1750148316",
      altText: null,
      id: "gid://shopify/ProductImage/62288056615258",
    },
  ],
  variants: [
    {
      id: "gid://shopify/ProductVariant/51463087391066",
      title: "Single Bottle",
      price: {
        amount: 169,
        currencyCode: "DKK",
      },
      availableForSale: true,
      quantityAvailable: 5,
    },
    {
      id: "gid://shopify/ProductVariant/51463087423834",
      title: "Case (6 Bottles)",
      price: {
        amount: 1014,
        currencyCode: "DKK",
      },
      availableForSale: true,
      quantityAvailable: 5,
    },
  ],

  volume: {
    value: 0.75,
    unit: "LITERS",
  },
  country: "Italy",
  region: "Alto Adige",
  wineVariety: "Red",
  grape: "Pinot noir",
  vineyard: "Cantina Kurtatsch",
};

describe("WineDetails simple render test", () => {
  test("renders WineDetails without crashing", () => {
    render(<WineDetails wine={wineMock} />);
    // Check for something basic that should appear when inStock is true:
    expect(screen.getByText(/Test Wine/i)).toBeInTheDocument();
  });
});
