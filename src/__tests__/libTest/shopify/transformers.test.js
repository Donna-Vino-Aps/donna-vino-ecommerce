import {
  reshapeCollectionResponse,
  transformShopifyEventProduct,
  transformShopifyWineProduct,
} from "@/lib/shopify/transformers";
import * as metafieldUtils from "@/lib/shopify/metafield-utils";
import * as logging from "@/utils/logging";

jest.mock("@/lib/shopify/metafield-utils");
jest.mock("@/utils/logging");

const mockShopifyProductBase = {
  id: "gid://shopify/Product/123",
  title: "Test Product",
  handle: "test-product",
  description: "This is a test product.",
  images: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductImage/1",
          url: "https://example.com/image1.jpg",
          altText: "Alt text 1",
        },
      },
    ],
  },
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/101",
          price: { amount: "100.00", currencyCode: "DKK" },
          availableForSale: true,
          quantityAvailable: 10,
        },
      },
    ],
  },
};

const mockShopifyEventProductSpecific = {
  ...mockShopifyProductBase,
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/102",
          price: { amount: "50.00", currencyCode: "EUR" },
          availableSeats: 50,
        },
      },
    ],
  },
  date: { value: "2024-12-31" },
  menuDescription: { value: "Delicious menu" },
  wineDescription: { value: "Fine wines" },
  winery: { value: "Test Winery" },
  wine: { value: "Test Wine" },
  timeStart: { value: "2024-12-31T18:00:00Z" },
  timeEnd: { value: "2024-12-31T22:00:00Z" },
  location: { value: "Test Location" },
  totalSeats: { value: "100" },
};

const mockShopifyWineProductSpecific = {
  id: "gid://shopify/Product/10252479529306",
  handle: "cantina-kurtatsch",
  availableForSale: true,
  title: "Cantina Kurtatsch",
  description:
    "Nuanced, berry flavor with hints of strawberries, wild raspberries, spices, blood orange, herbs and nuts.",
  images: {
    edges: [
      {
        node: {
          url: "https://cdn.shopify.com/s/files/1/0944/0149/5386/files/catena-min.png?v=1750148316",
          altText: null,
          id: "gid://shopify/ProductImage/62288056615258",
        },
      },
    ],
  },
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/51463087391066",
          title: "Single Bottle",
          price: {
            amount: "169.0",
            currencyCode: "DKK",
          },
          availableForSale: true,
          quantityAvailable: 0,
          isDefaultDisplayVariant: {
            value: "true",
          },
        },
      },
      {
        node: {
          id: "gid://shopify/ProductVariant/51463087423834",
          title: "Case (6 Bottles)",
          price: {
            amount: "1014.0",
            currencyCode: "DKK",
          },
          availableForSale: true,
          quantityAvailable: 0,
          isDefaultDisplayVariant: {
            value: "false",
          },
        },
      },
    ],
  },
  country: {
    references: {
      edges: [
        {
          node: {
            name: {
              value: "Italy",
            },
          },
        },
      ],
    },
  },
  region: {
    references: {
      edges: [
        {
          node: {
            name: {
              value: "Alto Adige",
            },
          },
        },
      ],
    },
  },
  wineVariety: {
    references: {
      edges: [
        {
          node: {
            name: {
              value: "Red",
            },
          },
        },
      ],
    },
  },
  grape: {
    value: "Pinot noir",
  },
  vineyard: {
    value: "Cantina Kurtatsch",
  },
  tasteProfile: {
    value: '[\"Nuanced\",\"Spicy\",\"Fruity\",\"Berries\",\"Acidic\"]',
  },
  alcoholContent: {
    value: "13.5",
  },
  servingTemperature: {
    value: "16-18",
  },
  vintage: {
    value: "2024",
  },
  producer: {
    value: "Cantina Kurtatsch",
  },
  volume: {
    value: '{\"value\":0.75,\"unit\":\"LITERS\"}',
  },
  softCrisp: {
    value: "0.5",
  },
  drySmooth: {
    value: "0.25",
  },
  velvetyAstringent: {
    value: "0.35",
  },
  delicateBold: {
    value: "0.5",
  },
};

describe("Shopify Data Transformers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    metafieldUtils.getMetafieldValue.mockImplementation(
      (field) => field?.value || null,
    );
    metafieldUtils.getReferencedMetaobject.mockImplementation(
      (field) => field?.references?.edges?.[0]?.node || null,
    );
    metafieldUtils.getMetaobjectLabel.mockImplementation(
      (node) => node?.name?.value || node?.label?.value || null,
    );
  });

  describe("reshapeCollectionResponse", () => {
    const mockTransformer = jest.fn((product) => ({
      ...product,
      transformed: true,
    }));

    it("should reshape the Shopify collection and transform products", () => {
      const shopifyCollection = {
        id: "gid://shopify/Collection/1",
        handle: "test-collection",
        title: "Test Collection",
        description: "A collection for testing.",
        products: {
          edges: [
            { node: { ...mockShopifyProductBase, id: "p1" } },
            { node: { ...mockShopifyProductBase, id: "p2" } },
          ],
        },
      };
      const result = reshapeCollectionResponse(
        shopifyCollection,
        mockTransformer,
      );

      expect(result.id).toBe(shopifyCollection.id);
      expect(result.title).toBe(shopifyCollection.title);
      expect(result.products.length).toBe(2);
      expect(mockTransformer).toHaveBeenCalledTimes(2);
      expect(result.products[0].transformed).toBe(true);
    });

    it("should return null if shopifyCollection is null or undefined", () => {
      const mockTransformer = jest.fn();
      expect(reshapeCollectionResponse(null, mockTransformer)).toBeNull();
      expect(reshapeCollectionResponse(undefined, mockTransformer)).toBeNull();
      expect(logging.logError).toHaveBeenCalledWith(
        "reshapeCollectionResponse received null or undefined shopifyCollection",
      );
    });

    it("should return empty products array if products are missing", () => {
      const shopifyCollection = { id: "1", title: "No Products" };
      const result = reshapeCollectionResponse(
        shopifyCollection,
        mockTransformer,
      );
      expect(result.products).toEqual([]);
    });
  });

  describe("transformShopifyEventProduct", () => {
    it("should transform a raw Shopify event product to the application shape", () => {
      const result = transformShopifyEventProduct(
        mockShopifyEventProductSpecific,
      );

      expect(result.id).toBe(mockShopifyEventProductSpecific.id);
      expect(result.title).toBe(mockShopifyEventProductSpecific.title);
      expect(result.price).toBe(50.0);
      expect(result.currency).toBe("EUR");
      expect(result.availableSeats).toBe(50);
      expect(result.date).toBe("2024-12-31");
      expect(result.timeStart).toBeInstanceOf(Date);
      expect(result.timeEnd).toBeInstanceOf(Date);
      expect(result.totalSeats).toBe(100);
      expect(result.images.length).toBe(1);
      expect(result.images[0].url).toBe("https://example.com/image1.jpg");
    });

    it("should handle missing optional fields gracefully for event product", () => {
      const minimalEventProduct = {
        ...mockShopifyProductBase,
        variants: { edges: [{ node: { id: "v1" } }] },
      };
      metafieldUtils.getMetafieldValue.mockReturnValue(null);
      const result = transformShopifyEventProduct(minimalEventProduct);
      expect(result.price).toBeNull();
      expect(result.availableSeats).toBe(0);
      expect(result.date).toBeNull();
      expect(result.timeStart).toBeNull();
    });

    it("should return original string if timeStart parsing fails", () => {
      const productWithInvalidTime = {
        ...mockShopifyEventProductSpecific,
        timeStart: { value: "invalid-date-string" },
      };
      const result = transformShopifyEventProduct(productWithInvalidTime);
      expect(result.timeStart).toBe("invalid-date-string");
      expect(logging.logError).toHaveBeenCalledWith(
        "Invalid date-time string provided:",
        { utcTimeString: "invalid-date-string" },
      );
    });

    it("should return null if product is null or undefined", () => {
      expect(transformShopifyEventProduct(null)).toBeNull();
      expect(transformShopifyEventProduct(undefined)).toBeNull();
      expect(logging.logError).toHaveBeenCalledWith(
        "transformShopifyEventProduct received null or undefined product",
      );
    });
  });

  describe("transformShopifyWineProduct", () => {
    it("should transform a raw Shopify wine product to the application shape", () => {
      const result = transformShopifyWineProduct(
        mockShopifyWineProductSpecific,
      );

      expect(result).toEqual({
        id: "gid://shopify/Product/10252479529306",
        handle: "cantina-kurtatsch",
        title: "Cantina Kurtatsch",
        description:
          "Nuanced, berry flavor with hints of strawberries, wild raspberries, spices, blood orange, herbs and nuts.",
        images: [
          {
            url: "https://cdn.shopify.com/s/files/1/0944/0149/5386/files/catena-min.png?v=1750148316",
            altText: "Cantina Kurtatsch", // Fallbacks to title if altText is null
            id: "gid://shopify/ProductImage/62288056615258",
          },
        ],
        variants: [
          {
            id: "gid://shopify/ProductVariant/51463087391066",
            title: "Single Bottle",
            price: {
              amount: 169.0,
              currencyCode: "DKK",
            },
            availableForSale: true,
            quantityAvailable: 0,
            isDefault: true,
          },
          {
            id: "gid://shopify/ProductVariant/51463087423834",
            title: "Case (6 Bottles)",
            price: {
              amount: 1014.0,
              currencyCode: "DKK",
            },
            availableForSale: true,
            quantityAvailable: 0,
            isDefault: false,
          },
        ],
        country: "Italy",
        region: "Alto Adige",
        wineVariety: "Red",
        grape: "Pinot noir",
        vineyard: "Cantina Kurtatsch",
        tasteProfile: ["Nuanced", "Spicy", "Fruity", "Berries", "Acidic"],
        alcoholContent: 13.5,
        servingTemperature: "16-18",
        vintage: "2024",
        producer: "Cantina Kurtatsch",
        volume: {
          value: 0.75,
          unit: "LITERS",
        },
        softCrisp: 0.5,
        drySmooth: 0.25,
        velvetyAstringent: 0.35,
        delicateBold: 0.5,
      });
    });

    it("should handle missing optional fields gracefully for wine product", () => {
      const minimalProductBase = {
        id: "gid://shopify/Product/min123",
        title: "Minimal Wine",
        handle: "minimal-wine",
        description: "Minimal description.",
        images: { edges: [] },
        variants: { edges: [] },
      };
      // Ensure metafield util mocks return null for missing fields
      metafieldUtils.getMetafieldValue.mockReturnValue(null);
      metafieldUtils.getReferencedMetaobject.mockReturnValue(null);
      // getMetaobjectLabel will receive null and should return null based on its impl

      const result = transformShopifyWineProduct(minimalProductBase);

      expect(result.country).toBeNull();
      expect(result.region).toBeNull();
      expect(result.wineVariety).toBeNull();
      expect(result.grape).toBeNull();
      expect(result.vineyard).toBeNull();
      expect(result.producer).toBeNull();
      expect(result.vintage).toBeNull();
      expect(result.servingTemperature).toBeNull();
      expect(result.tasteProfile).toEqual([]); // Default to empty array
      expect(result.volume).toBeNull();
      expect(result.alcoholContent).toBeNull();
      expect(result.softCrisp).toBeNull();
      expect(result.drySmooth).toBeNull();
      expect(result.velvetyAstringent).toBeNull();
      expect(result.delicateBold).toBeNull();
      expect(result.variants).toEqual([]);
      expect(result.images).toEqual([]);
    });

    it("should return null if product is null or undefined", () => {
      expect(transformShopifyWineProduct(null)).toBeNull();
      expect(transformShopifyWineProduct(undefined)).toBeNull();
      expect(logging.logError).toHaveBeenCalledWith(
        "transformShopifyWineProduct received null or undefined product",
      );
    });

    it("should log error and return an empty array for tasteProfile if JSON parsing fails", () => {
      const productWithInvalidTasteProfile = {
        ...mockShopifyWineProductSpecific,
        tasteProfile: { value: "not a json array" },
      };
      const result = transformShopifyWineProduct(
        productWithInvalidTasteProfile,
      );
      expect(result.tasteProfile).toEqual([]);
      expect(logging.logError).toHaveBeenCalledWith(
        expect.stringContaining("Error parsing JSON for tasteProfile"),
        expect.any(Error),
        expect.objectContaining({
          productId: mockShopifyWineProductSpecific.id,
          rawValue: "not a json array",
        }),
      );
    });

    it("should log error and return null for volume if JSON parsing fails", () => {
      const productWithInvalidVolume = {
        ...mockShopifyWineProductSpecific,
        volume: { value: "not a json object" },
      };
      const result = transformShopifyWineProduct(productWithInvalidVolume);
      expect(result.volume).toBeNull();
      expect(logging.logError).toHaveBeenCalledWith(
        expect.stringContaining("Error parsing JSON for volume"),
        expect.any(Error),
        expect.objectContaining({
          productId: mockShopifyWineProductSpecific.id,
          rawValue: "not a json object",
        }),
      );
    });
  });
});
