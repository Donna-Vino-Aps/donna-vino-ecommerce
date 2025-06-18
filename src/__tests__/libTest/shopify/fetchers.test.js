import { getRawCollectionByHandle } from "@/lib/shopify/fetchers";
import { shopifyQuery } from "@/utils/shopify";
import { logError } from "@/utils/logging";

jest.mock("@/utils/shopify");

const mockQuery = 'query TestQuery { collection(handle: "test") { id } }';
const mockHandle = "test-collection";

describe("Shopify Data Fetchers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getRawCollectionByHandle", () => {
    it("should call shopifyQuery with the correct parameters and return collection data", async () => {
      const mockCollectionData = {
        id: "gid://shopify/Collection/1",
        title: "Test Collection",
      };
      shopifyQuery.mockResolvedValue({ collection: mockCollectionData });

      const result = await getRawCollectionByHandle(
        mockQuery,
        mockHandle,
        "en",
      );

      expect(shopifyQuery).toHaveBeenCalledTimes(1);
      expect(shopifyQuery).toHaveBeenCalledWith(
        mockQuery,
        { handle: mockHandle },
        "en",
      );
      expect(result).toEqual(mockCollectionData);
    });

    it("should use 'en' as default language if not provided", async () => {
      shopifyQuery.mockResolvedValue({ collection: {} });
      await getRawCollectionByHandle(mockQuery, mockHandle);
      expect(shopifyQuery).toHaveBeenCalledWith(
        mockQuery,
        { handle: mockHandle },
        "en",
      );
    });

    it("should return null and log error if shopifyQuery throws an error", async () => {
      const mockError = new Error("Shopify API Error");
      shopifyQuery.mockRejectedValue(mockError);

      const result = await getRawCollectionByHandle(mockQuery, mockHandle);

      expect(result).toBeNull();
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logError).toHaveBeenCalledWith(
        `Error fetching collection ${mockHandle}:`,
        mockError,
      );
    });

    it("should return null if shopifyQuery returns null or undefined response", async () => {
      shopifyQuery.mockResolvedValue(null);
      let result = await getRawCollectionByHandle(mockQuery, mockHandle);
      expect(result).toBeNull();

      shopifyQuery.mockResolvedValue({ collection: null });
      result = await getRawCollectionByHandle(mockQuery, mockHandle);
      expect(result).toBeNull();
    });
  });
});
