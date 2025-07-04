import React from "react";
import { render, screen } from "@testing-library/react";
import WineInfo from "../../components/WineDetails/WineInfo";
import LanguageProvider from "../../context/LanguageContext";
import { CartProvider } from "@/context/ShoppingCartContext";
import { normalizeWineData } from "@/utils/wineUtils";

// Mock next/image as a simple img tag
jest.mock("next/image", () => (props) => {
  return <img {...props} alt="image" />;
});

// Mock useLanguage hook
jest.mock("../../context/LanguageContext", () => ({
  __esModule: true, // This is important for mocking ES modules
  default: ({ children }) => <>{children}</>,
  useLanguage: () => ({
    translations: {
      "wine-details.instock": "In Stock",
      "wine-details.outofstock": "Out of Stock",
      "wine-details.switch-preorder": "Switch to Pre-Order",
      "wine-details.presale": "Pre Order",

      // taste profile translations
      "tasteProfile.delicate": "Delicate",
      "tasteProfile.bold": "Bold",
      "tasteProfile.velvety": "Velvety",
      "tasteProfile.astringent": "Astringent",
      "tasteProfile.dry": "Dry",
      "tasteProfile.smooth": "Smooth",
      "tasteProfile.soft": "Soft",
      "tasteProfile.crisp": "Crisp",
    },
  }),
}));

// Mock Button component
jest.mock("../../components/Button/Button", () => (props) => (
  <button {...props}>Add to Cart</button>
));

// Minimal wine mock
const rawWineMock = {
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
  delicateBold: 0.5,
  velvetyAstringent: 0.35,
  drySmooth: 0.25,
  softCrisp: 0.5,
};

// Mock translations object matching the hook
const testTranslations = {
  "wine-details.instock": "In Stock",
  "wine-details.outofstock": "Out of Stock",
  "wine-details.switch-preorder": "Switch to Pre-Order",
  "wine-details.presale": "Pre Order",

  "tasteProfile.delicate": "Delicate",
  "tasteProfile.bold": "Bold",
  "tasteProfile.velvety": "Velvety",
  "tasteProfile.astringent": "Astringent",
  "tasteProfile.dry": "Dry",
  "tasteProfile.smooth": "Smooth",
  "tasteProfile.soft": "Soft",
  "tasteProfile.crisp": "Crisp",
};

const wineMock = normalizeWineData(rawWineMock, testTranslations);

describe("WineInfo simple render test", () => {
  it("renders WineInfo without crashing", () => {
    render(
      <LanguageProvider>
        <CartProvider>
          <WineInfo wine={wineMock} />
        </CartProvider>
      </LanguageProvider>,
    );

    expect(screen.getByText(/Test Wine/i)).toBeInTheDocument();
  });
});
