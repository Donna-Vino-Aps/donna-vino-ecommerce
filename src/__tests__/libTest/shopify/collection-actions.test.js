import { getCollectionByHandle } from "@/lib/shopify/collection-actions";
import { shopifyQuery } from "@/utils/shopify";

// Mock dependencies
jest.mock("@/utils/shopify", () => ({
  shopifyQuery: jest.fn(),
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
  });
});
