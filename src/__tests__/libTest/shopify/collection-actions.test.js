import { getCollectionByHandle } from "@/lib/shopify/collection-actions";
import { shopifyQuery } from "@/utils/shopify";
import { logError } from "@/utils/logging";

// Mock dependencies
jest.mock("@/utils/shopify", () => ({
  shopifyQuery: jest.fn(),
}));

jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
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

      expect(shopifyQuery).toHaveBeenCalledWith(expect.any(String), {
        handle: "test-collection",
      });
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
});
