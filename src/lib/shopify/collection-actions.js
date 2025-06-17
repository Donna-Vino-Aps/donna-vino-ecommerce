import { shopifyQuery } from "@/utils/shopify";
import { GET_EVENTS_COLLECTION_BY_HANDLE } from "@/graphql/shopify-queries";
import { logError } from "@/utils/logging";
import { parseISO } from "date-fns";

export async function getCollectionByHandle(handle, language = "en") {
  try {
    const response = await shopifyQuery(
      GET_EVENTS_COLLECTION_BY_HANDLE,
      { handle },
      language,
    );
    return response.collection;
  } catch (error) {
    logError(`Error fetching collection ${handle}:`, error);
    return null;
  }
}

export async function getEventsCollection(language = "en") {
  return await getCollectionByHandle("events", language);
}

export function transformShopifyProduct(product) {
  // Extract the variant
  const firstVariant = product.variants?.edges?.[0]?.node || null;
  const variantId = firstVariant?.id || null;

  // Extract image data
  const images =
    product.images?.edges.map((edge) => ({
      id: edge.node.id,
      url: edge.node.url,
      altText: edge.node.altText || product.title,
    })) || [];

  // Extract price data from variant
  const priceString = firstVariant?.price?.amount || null;
  const price = priceString ? parseFloat(priceString.replace(",", ".")) : null;
  const currency = firstVariant?.price?.currencyCode || "DKK";

  // Extract available seats from variant
  const availableSeats = firstVariant?.availableSeats || 0;

  // Extract metafield values, providing fallbacks for missing data
  const getMetafieldValue = (metafield, defaultValue = null) =>
    metafield?.value || defaultValue;

  // Convert UTC time strings to CEST time
  const adjustTimeZone = (utcTimeString) => {
    if (!utcTimeString) return null;

    try {
      const date = parseISO(utcTimeString);
      return date;
    } catch (error) {
      logError("Error handling time:", error);
      return utcTimeString;
    }
  };

  const transformedProduct = {
    id: product.id,
    title: product.title,
    handle: product.handle,
    variantId,
    description: product.description,
    price,
    currency,
    images,
    availableSeats,
    // Event specific fields
    date: getMetafieldValue(product.date),
    menuDescription: getMetafieldValue(product.menuDescription),
    wineDescription: getMetafieldValue(product.wineDescription),
    winery: getMetafieldValue(product.winery),
    wine: getMetafieldValue(product.wine),
    timeStart: adjustTimeZone(getMetafieldValue(product.timeStart)),
    timeEnd: adjustTimeZone(getMetafieldValue(product.timeEnd)),
    location: getMetafieldValue(product.location),
    totalSeats: Number(getMetafieldValue(product.totalSeats, 0)),
  };

  return transformedProduct;
}
