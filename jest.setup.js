process.env.NEXT_PUBLIC_API_URL_LOCAL = "http://localhost:3000";

// Mock logging utility
jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
  logInfo: jest.fn(),
  logWarning: jest.fn(),
}));

// Mock Shopify configuration to provide default values and prevent errors
jest.mock("@/config/shopify", () => ({
  SHOPIFY_STORE_DOMAIN: "mock-store.myshopify.com",
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: "mock-storefront-access-token",
  SHOPIFY_STOREFRONT_API_URL:
    "https://mock-store.myshopify.com/api/2024-04/graphql.json",
}));
