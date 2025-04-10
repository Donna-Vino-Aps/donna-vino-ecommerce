import * as shopifyUtils from "@/utils/shopify";

// Mock dependencies
jest.mock("@shopify/graphql-client", () => ({
  createGraphQLClient: jest.fn(),
}));

jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
  logInfo: jest.fn(),
}));

describe("Shopify Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("shopifyQuery", () => {
    it("should execute a GraphQL query successfully", async () => {
      const mockData = { products: [{ id: "1", title: "Test Product" }] };
      jest.spyOn(shopifyUtils, "shopifyQuery").mockResolvedValueOnce(mockData);

      const query = "query { products { id title } }";
      const variables = { first: 10 };

      const result = await shopifyUtils.shopifyQuery(query, variables);

      expect(shopifyUtils.shopifyQuery).toHaveBeenCalledWith(query, variables);
      expect(result).toEqual(mockData);
    });

    it("should throw an error when GraphQL returns errors", async () => {
      const graphqlError = new Error("GraphQL Error");
      jest
        .spyOn(shopifyUtils, "shopifyQuery")
        .mockRejectedValueOnce(graphqlError);

      const query = "query { products { id title } }";

      await expect(shopifyUtils.shopifyQuery(query)).rejects.toThrow(
        /GraphQL Error/,
      );
    });

    it("should handle network errors", async () => {
      const networkError = new Error("Network Error");
      jest
        .spyOn(shopifyUtils, "shopifyQuery")
        .mockRejectedValueOnce(networkError);

      const query = "query { products { id title } }";

      await expect(shopifyUtils.shopifyQuery(query)).rejects.toThrow(
        /Network Error/,
      );
    });

    it("should handle domain configuration errors", async () => {
      const configError = new Error(
        "Shopify domain is not configured correctly",
      );
      jest
        .spyOn(shopifyUtils, "shopifyQuery")
        .mockRejectedValueOnce(configError);

      const query = "query { products { id title } }";

      await expect(shopifyUtils.shopifyQuery(query)).rejects.toThrow(
        /Shopify domain is not configured correctly/,
      );
    });
  });
});
