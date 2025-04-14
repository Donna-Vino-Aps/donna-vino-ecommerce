import { createGraphQLClient } from "@shopify/graphql-client";
import { logError } from "@/utils/logging";
import { getShopifyLanguage } from "@/utils/localization";
import {
  SHOPIFY_STOREFRONT_API_URL,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from "@/config/shopify";

if (!SHOPIFY_STOREFRONT_API_URL || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  logError(
    "Shopify configuration is incomplete. Please check your environment variables.",
  );
}

const shopifyClient = createGraphQLClient({
  url: SHOPIFY_STOREFRONT_API_URL || "",
  headers: {
    "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
    "Content-Type": "application/json",
  },
  retries: 3,
  customFetch: fetch,
});

/**
 * Execute a GraphQL query against the Shopify Storefront API with language support
 * @param {string} query - GraphQL query string
 * @param {Object} variables - Query variables
 * @param {string} language - Current application language (en or dk)
 * @returns {Promise<Object>} - Query response
 */
export async function shopifyQuery(query, variables = {}, language = "en") {
  try {
    const shopifyLanguage = getShopifyLanguage(language);

    const { data, errors } = await shopifyClient.request(query, {
      variables: {
        ...variables,
        language: shopifyLanguage,
      },
    });

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;
  } catch (error) {
    logError("Shopify API Error:", error);

    if (error.message.includes("ENOTFOUND undefined")) {
      throw new Error(
        "Shopify domain is not configured correctly. Check your SHOPIFY_STORE_DOMAIN environment variable.",
      );
    }
    throw error;
  }
}

export default shopifyClient;
