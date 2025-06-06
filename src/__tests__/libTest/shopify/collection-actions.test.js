import {
  getCollectionByHandle,
  getEventsCollection,
  transformShopifyProduct,
} from "@/lib/shopify/collection-actions";
import { shopifyQuery } from "@/utils/shopify";
import { logError } from "@/utils/logging";
import { parseISO } from "date-fns";

// Mock dependencies
jest.mock("@/utils/shopify", () => ({
  shopifyQuery: jest.fn(),
}));

jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
}));

jest.mock("date-fns", () => ({
  parseISO: jest.fn((date) => new Date(date)),
}));

describe("Shopify Collection Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCollectionByHandle", () => {
    it("should fetch a collection by handle successfully", async () => {
      const mockCollection = {
        id: "gid://shopify/Collection/123",
        title: "Test Collection",
      };

      shopifyQuery.mockResolvedValue({ collection: mockCollection });

      const result = await getCollectionByHandle("test-collection");

      expect(shopifyQuery).toHaveBeenCalledWith(
        expect.any(String),
        { handle: "test-collection" },
        "en",
      );
      expect(result).toEqual(mockCollection);
    });

    it("should use the provided language parameter", async () => {
      const mockCollection = {
        id: "gid://shopify/Collection/123",
        title: "Test Collection",
      };

      shopifyQuery.mockResolvedValue({ collection: mockCollection });

      const result = await getCollectionByHandle("test-collection", "dk");

      expect(shopifyQuery).toHaveBeenCalledWith(
        expect.any(String),
        { handle: "test-collection" },
        "dk",
      );
      expect(result).toEqual(mockCollection);
    });

    it("should handle errors and return null", async () => {
      const error = new Error("API Error");
      shopifyQuery.mockRejectedValue(error);

      const result = await getCollectionByHandle("test-collection");

      expect(logError).toHaveBeenCalledWith(
        "Error fetching collection test-collection:",
        error,
      );
      expect(result).toBeNull();
    });
  });

  describe("getEventsCollection", () => {
    it("should call getCollectionByHandle with 'events' and default language", async () => {
      const mockCollection = { title: "Events Collection" };
      shopifyQuery.mockResolvedValue({ collection: mockCollection });

      const result = await getEventsCollection();

      expect(shopifyQuery).toHaveBeenCalledWith(
        expect.any(String),
        { handle: "events" },
        "en",
      );
      expect(result).toEqual(mockCollection);
    });

    it("should call getCollectionByHandle with 'events' and specified language", async () => {
      const mockCollection = { title: "Events Collection" };
      shopifyQuery.mockResolvedValue({ collection: mockCollection });

      const result = await getEventsCollection("dk");

      expect(shopifyQuery).toHaveBeenCalledWith(
        expect.any(String),
        { handle: "events" },
        "dk",
      );
      expect(result).toEqual(mockCollection);
    });
  });

  describe("transformShopifyProduct", () => {
    const mockProduct = {
      id: "gid://shopify/Product/123",
      title: "Wine Tasting Event",
      handle: "wine-tasting-event",
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/456",
              price: {
                amount: "599.0",
                currencyCode: "DKK",
              },
              availableSeats: 15,
            },
          },
        ],
      },
      description: "A wonderful wine tasting event",
      date: {
        value: "2025-08-15",
      },
      menuDescription: {
        value: "Delicious menu",
      },
      wineDescription: {
        value: "Fine wines",
      },
      winery: {
        value: "Test Winery",
      },
      wine: {
        value: "Test Wine",
      },
      timeStart: {
        value: "2025-08-15T18:00:00Z",
      },
      timeEnd: {
        value: "2025-08-15T21:00:00Z",
      },
      location: {
        value: "Copenhagen",
      },
      totalSeats: {
        value: "20",
      },
      images: {
        edges: [
          {
            node: {
              url: "https://example.com/image1.jpg",
              altText: "Wine Image",
              id: "img1",
            },
          },
          {
            node: {
              url: "https://example.com/image2.jpg",
              altText: "Wine Image",
              id: "img2",
            },
          },
        ],
      },
    };

    it("should transform a Shopify product to the expected format", () => {
      const result = transformShopifyProduct(mockProduct);

      expect(result).toEqual({
        id: "gid://shopify/Product/123",
        title: "Wine Tasting Event",
        handle: "wine-tasting-event",
        description: "A wonderful wine tasting event",
        variantId: "gid://shopify/ProductVariant/456",
        price: 599,
        currency: "DKK",
        images: [
          {
            id: "img1",
            url: "https://example.com/image1.jpg",
            altText: "Wine Image",
          },
          {
            id: "img2",
            url: "https://example.com/image2.jpg",
            altText: "Wine Image",
          },
        ],
        availableSeats: 15,
        date: "2025-08-15",
        menuDescription: "Delicious menu",
        wineDescription: "Fine wines",
        winery: "Test Winery",
        wine: "Test Wine",
        timeStart: expect.any(Date),
        timeEnd: expect.any(Date),
        location: "Copenhagen",
        totalSeats: 20,
      });

      expect(parseISO).toHaveBeenCalledWith("2025-08-15T18:00:00Z");
      expect(parseISO).toHaveBeenCalledWith("2025-08-15T21:00:00Z");
    });

    it("should handle missing or null values", () => {
      const incompleteProduct = {
        id: "gid://shopify/Product/123",
        title: "Wine Tasting Event",
        handle: "wine-tasting-event",
        description: "A wonderful wine tasting event",
        // Missing variants
        // Missing priceRange
        // Missing images
        // Missing availableSeats
        // Missing metafields
      };

      const result = transformShopifyProduct(incompleteProduct);

      expect(result).toEqual({
        id: "gid://shopify/Product/123",
        title: "Wine Tasting Event",
        handle: "wine-tasting-event",
        description: "A wonderful wine tasting event",
        variantId: null,
        price: null,
        currency: "DKK",
        images: [],
        availableSeats: 0,
        date: null,
        menuDescription: null,
        wineDescription: null,
        winery: null,
        wine: null,
        timeStart: null,
        timeEnd: null,
        location: null,
        totalSeats: 0,
      });
    });

    it("should handle errors in time parsing", () => {
      const invalidTimeString = "invalid-time";
      const mockProductWithInvalidTime = {
        id: "gid://shopify/Product/123",
        timeStart: { value: invalidTimeString },
      };

      parseISO.mockImplementation(() => {
        throw new Error("Invalid time format");
      });

      const result = transformShopifyProduct(mockProductWithInvalidTime);

      expect(result.timeStart).toBe(invalidTimeString);
      expect(logError).toHaveBeenCalledWith(
        "Error handling time:",
        expect.any(Error),
      );
    });

    it("should set default currency to DKK if not provided", () => {
      const productWithoutCurrency = {
        ...mockProduct,
        priceRange: {
          maxVariantPrice: {
            amount: "599.00",
            // Missing currencyCode
          },
        },
      };

      const result = transformShopifyProduct(productWithoutCurrency);

      expect(result.currency).toBe("DKK");
    });

    it("should handle products with no images", () => {
      const productWithoutImages = {
        ...mockProduct,
        images: {
          edges: [],
        },
      };

      const result = transformShopifyProduct(productWithoutImages);

      expect(result.images).toEqual([]);
    });

    it("should handle products with empty metafields", () => {
      const productWithEmptyMetafields = {
        ...mockProduct,
        date: null,
        menuDescription: null,
        wineDescription: null,
        winery: null,
        wine: null,
        timeStart: null,
        timeEnd: null,
        location: null,
        totalSeats: 0,
      };

      const result = transformShopifyProduct(productWithEmptyMetafields);

      expect(result.date).toBeNull();
      expect(result.menuDescription).toBeNull();
      expect(result.wineDescription).toBeNull();
      expect(result.winery).toBeNull();
      expect(result.wine).toBeNull();
      expect(result.timeStart).toBeNull();
      expect(result.timeEnd).toBeNull();
      expect(result.location).toBeNull();
      expect(result.totalSeats).toBe(0);
    });
  });
});
