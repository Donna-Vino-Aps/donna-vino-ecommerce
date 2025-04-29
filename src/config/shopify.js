import { logInfo, logError } from "@/utils/logging";

// Shopify store configuration
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Check if environment variables are set
if (!SHOPIFY_STORE_DOMAIN) {
  logError("Error: SHOPIFY_DOMAIN environment variable is not set");
}

if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  logError(
    "Error: SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is not set",
  );
}

const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

logInfo(`Shopify Store Domain: ${SHOPIFY_STORE_DOMAIN}`);
logInfo(`Shopify API URL: ${SHOPIFY_STOREFRONT_API_URL}`);

export {
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_STOREFRONT_API_URL,
};
