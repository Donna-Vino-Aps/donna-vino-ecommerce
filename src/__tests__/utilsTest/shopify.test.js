import * as shopifyUtils from "@/utils/shopify";
import { getShopifyLanguage } from "@/utils/localization";

// Mock dependencies
jest.mock("@shopify/graphql-client", () => ({
  createGraphQLClient: jest.fn(() => ({
    request: jest.fn(),
  })),
}));

jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
  logInfo: jest.fn(),
}));

jest.mock("@/utils/localization", () => ({
  getShopifyLanguage: jest.fn((lang) => (lang === "dk" ? "DA" : "EN")),
}));

describe("Shopify Utilities", () => {
  let mockClient;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = shopifyUtils.default;
    mockClient.request = jest.fn();
  });

  describe("shopifyQuery", () => {
    it("should execute a GraphQL query successfully with default language", async () => {
      const mockData = { products: [{ id: "1", title: "Test Product" }] };
      mockClient.request.mockResolvedValueOnce({
        data: mockData,
        errors: null,
      });

      const query = "query { products { id title } }";
      const variables = { first: 10 };

      const result = await shopifyUtils.shopifyQuery(query, variables);

      expect(mockClient.request).toHaveBeenCalledWith(query, {
        variables: {
          ...variables,
          language: "EN",
        },
      });
      expect(getShopifyLanguage).toHaveBeenCalledWith("en");
      expect(result).toEqual(mockData);
    });

    it("should execute a GraphQL query with specified language", async () => {
      const mockData = { products: [{ id: "1", title: "Test Produkt" }] };
      mockClient.request.mockResolvedValueOnce({
        data: mockData,
        errors: null,
      });

      const query = "query { products { id title } }";
      const variables = { first: 10 };
      const language = "dk";

      const result = await shopifyUtils.shopifyQuery(
        query,
        variables,
        language,
      );

      expect(mockClient.request).toHaveBeenCalledWith(query, {
        variables: {
          ...variables,
          language: "DA",
        },
      });
      expect(getShopifyLanguage).toHaveBeenCalledWith("dk");
      expect(result).toEqual(mockData);
    });

    it("should throw an error when GraphQL returns errors", async () => {
      const graphqlErrors = [{ message: "GraphQL Error" }];
      mockClient.request.mockResolvedValueOnce({
        data: null,
        errors: graphqlErrors,
      });

      const query = "query { products { id title } }";

      await expect(shopifyUtils.shopifyQuery(query)).rejects.toThrow(
        "GraphQL Error",
      );
    });

    it("should handle network errors", async () => {
      const networkError = new Error("Network Error");
      mockClient.request.mockRejectedValueOnce(networkError);

      const query = "query { products { id title } }";

      await expect(shopifyUtils.shopifyQuery(query)).rejects.toThrow(
        "Network Error",
      );
    });

    it("should handle domain configuration errors", async () => {
      const configError = new Error("ENOTFOUND undefined");
      mockClient.request.mockRejectedValueOnce(configError);

      const query = "query { products { id title } }";

      await expect(shopifyUtils.shopifyQuery(query)).rejects.toThrow(
        "Shopify domain is not configured correctly",
      );
    });

    it("should use default language when none is provided", async () => {
      const mockData = { products: [{ id: "1", title: "Test Product" }] };
      mockClient.request.mockResolvedValueOnce({
        data: mockData,
        errors: null,
      });

      const query = "query { products { id title } }";

      await shopifyUtils.shopifyQuery(query);

      expect(getShopifyLanguage).toHaveBeenCalledWith("en");
      expect(mockClient.request).toHaveBeenCalledWith(query, {
        variables: {
          language: "EN",
        },
      });
    });
  });
});
