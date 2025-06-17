import { parseISO } from "date-fns";
import { logError, logInfo } from "@/utils/logging";
import {
  getMetafieldValue,
  getReferencedMetaobject,
  getMetaobjectLabel,
  getMetaobjectFields,
  getMultipleReferencedMetaobjects,
} from "./metafield-utils";

const formatDateTime = (utcTimeString) => {
  if (!utcTimeString) return null;
  try {
    const parsedDate = parseISO(utcTimeString);
    // Check if parseISO returned an Invalid Date object
    if (isNaN(parsedDate.getTime())) {
      logError("Invalid date-time string provided:", { utcTimeString });
      return utcTimeString; // Return original string if date is invalid
    }
    return parsedDate;
  } catch (error) {
    logError("Error parsing date-time:", error, { utcTimeString });
    return utcTimeString; // Return original string on other errors too
  }
};

export function reshapeCollectionResponse(
  shopifyCollection,
  productTransformerFn,
) {
  if (!shopifyCollection) {
    logInfo(
      "reshapeCollectionResponse received null or undefined shopifyCollection",
    );
    return null;
  }

  const products =
    shopifyCollection.products?.edges?.map((edge) =>
      productTransformerFn(edge.node),
    ) || [];

  return {
    id: shopifyCollection.id,
    handle: shopifyCollection.handle,
    title: shopifyCollection.title,
    description: shopifyCollection.description,
    products,
  };
}

export function transformShopifyEventProduct(product) {
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
  const availableSeats = firstVariant?.availableSeats ?? 0;

  return {
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
    timeStart: formatDateTime(getMetafieldValue(product.timeStart)),
    timeEnd: formatDateTime(getMetafieldValue(product.timeEnd)),
    location: getMetafieldValue(product.location),
    totalSeats: Number(getMetafieldValue(product.totalSeats) || 0),
  };
}

export function transformShopifyWineProduct(product) {
  const firstVariant = product.variants?.edges?.[0]?.node || null;
  const variantId = firstVariant?.id || null;

  const images =
    product.images?.edges.map((edge) => ({
      id: edge.node.id,
      url: edge.node.url,
      altText: edge.node.altText || product.title,
    })) || [];

  const priceString = firstVariant?.price?.amount || null;
  const price = priceString ? parseFloat(priceString.replace(",", ".")) : null;
  const currency = firstVariant?.price?.currencyCode || "DKK";

  let volumeParsed = null;
  const volumeString = getMetafieldValue(product.volume);
  if (volumeString) {
    try {
      let parsed = JSON.parse(volumeString);
      if (typeof parsed === "number") {
        // If JSON.parse results in a number, wrap it in the standard object
        volumeParsed = { value: parsed, unit: "L" };
      } else {
        // Otherwise, assume it's already the correct object structure or null
        volumeParsed = parsed;
      }
    } catch (e) {
      logError("Error parsing volume JSON for wine product:", e, {
        productId: product.id,
        volumeString,
      });
      // Fallback for when JSON.parse fails (e.g., not a valid JSON string at all)
      const numericValue = parseFloat(volumeString);
      if (!isNaN(numericValue)) {
        volumeParsed = { value: numericValue, unit: "L" }; // Default unit
      } else {
        volumeParsed = { value: null, unit: "L", raw: volumeString };
      }
    }
  }

  const countryRef = getReferencedMetaobject(product.country);
  const regionRef = getReferencedMetaobject(product.region);
  const wineVarietyRef = getReferencedMetaobject(product.wineVariety);
  const producerRef = getReferencedMetaobject(product.producer);
  const vineyardRef = getReferencedMetaobject(product.vineyard);
  const grapeRefs = getMultipleReferencedMetaobjects(product.grape);

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    variantId,
    description: product.description,
    price,
    currency,
    images,
    availableForSale: firstVariant?.availableForSale || false,
    quantityAvailable: firstVariant?.quantityAvailable || 0,

    // Wine specific fields
    country: countryRef ? getMetaobjectLabel(countryRef) : null,
    region: regionRef ? getMetaobjectLabel(regionRef) : null,
    wineVariety: wineVarietyRef ? getMetaobjectLabel(wineVarietyRef) : null,
    producer: producerRef ? getMetaobjectFields(producerRef) : {},
    vineyard: vineyardRef ? getMetaobjectFields(vineyardRef) : {},
    grapes: grapeRefs.map((ref) => getMetaobjectFields(ref)),

    alcoholContent: getMetafieldValue(product.alcoholContent),
    vintage: getMetafieldValue(product.vintage),
    servingTemperature: getMetafieldValue(product.servingTemperature),
    tasteProfile: getMetafieldValue(product.tasteProfile),
    volume: volumeParsed,
    softCrisp: getMetafieldValue(product.softCrisp),
    drySmooth: getMetafieldValue(product.drySmooth),
    velvetyAstringent: getMetafieldValue(product.velvetyAstringent),
    delicateBold: getMetafieldValue(product.delicateBold),
  };
}
