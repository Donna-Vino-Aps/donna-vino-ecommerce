import {
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from "@/config/shopify";
import { logError } from "@/utils/logging";

// Extracts the numeric ID from Shopify GraphQL ID
// graphqlId - The full GraphQL ID (e.g., "gid://shopify/ProductVariant/123456789")
export function extractNumericId(graphqlId) {
  if (!graphqlId) return "";

  const matches = graphqlId.match(/\/([0-9]+)$/);
  if (matches && matches[1]) {
    return matches[1];
  }
  return graphqlId;
}

export function createCheckoutUrl(variantId, quantity = 1) {
  try {
    if (!variantId) {
      throw new Error("Variant ID is required");
    }

    const numericId = extractNumericId(variantId);

    return `https://${SHOPIFY_STORE_DOMAIN}/cart/${numericId}:${quantity}?access_token=${SHOPIFY_STOREFRONT_ACCESS_TOKEN}`;
  } catch (error) {
    logError("Error creating checkout URL:", error);
    throw error;
  }
}
