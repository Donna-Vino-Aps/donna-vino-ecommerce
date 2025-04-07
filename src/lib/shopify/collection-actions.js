import { shopifyQuery } from "@/utils/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/graphql/shopify-queries";
import { logError } from "@/utils/logging";

export async function getCollectionByHandle(handle) {
  try {
    const response = await shopifyQuery(GET_COLLECTION_BY_HANDLE, { handle });
    return response.collection;
  } catch (error) {
    logError(`Error fetching collection ${handle}:`, error);
    return null;
  }
}

export async function getEventsCollection() {
  return getCollectionByHandle("events");
}

export function transformShopifyProduct(product) {
  // Extract image data
  const images =
    product.images?.edges.map((edge) => ({
      id: edge.node.id,
      url: edge.node.url,
      altText: edge.node.altText || product.title,
    })) || [];

  // Extract price data
  const price = product.priceRange?.maxVariantPrice?.amount || null;
  const currency = product.priceRange?.maxVariantPrice?.currencyCode || "DKK";

  // Extract available seats
  const quantityAvailable =
    product.availableSeats?.edges[0]?.node?.quantityAvailable || 0;

  // Extract metafield values, providing fallbacks for missing data
  const getMetafieldValue = (metafield) => metafield?.value || null;

  // Convert UTC time strings to local time strings
  const convertUTCtoLocal = (utcTimeString) => {
    if (!utcTimeString) return null;
    const date = new Date(utcTimeString);
    return date.toISOString().replace("Z", "");
  };

  const transformedProduct = {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    totalInventory: product.totalInventory,
    price,
    currency,
    images,
    availableSeats: quantityAvailable,
    // Event specific fields
    date: getMetafieldValue(product.date),
    menuDescription: getMetafieldValue(product.menuDescription),
    wineDescription: getMetafieldValue(product.wineDescription),
    winery: getMetafieldValue(product.winery),
    wine: getMetafieldValue(product.wine),
    timeStart: convertUTCtoLocal(getMetafieldValue(product.timeStart)),
    timeEnd: convertUTCtoLocal(getMetafieldValue(product.timeEnd)),
    location: getMetafieldValue(product.location),
  };

  return transformedProduct;
}
