import { parseISO } from "date-fns";
import { logError } from "@/utils/logging";
import {
  getMetafieldValue,
  getReferencedMetaobject,
  getMetaobjectLabel,
} from "./metafield-utils";

const formatDateTime = (utcTimeString) => {
  if (!utcTimeString) return null;
  try {
    const parsedDate = parseISO(utcTimeString);
    // Check if parseISO returned an Invalid Date object
    if (isNaN(parsedDate.getTime())) {
      logError("Invalid date-time string provided:", { utcTimeString });
      return utcTimeString;
    }
    return parsedDate;
  } catch (error) {
    logError("Error parsing date-time:", error, { utcTimeString });
    return utcTimeString;
  }
};

const getTransformedImages = (product) => {
  return (
    product.images?.edges.map((edge) => ({
      id: edge.node.id,
      url: edge.node.url,
      altText: edge.node.altText || product.title,
    })) || []
  );
};

const parseJsonMetafield = (metafield, fieldName, productIdForLogging) => {
  const rawValue = getMetafieldValue(metafield);
  if (rawValue) {
    try {
      return JSON.parse(rawValue);
    } catch (error) {
      logError(`Error parsing JSON for ${fieldName}:`, error, {
        productId: productIdForLogging,
        rawValue,
      });
      return null;
    }
  }
  return null;
};

export function reshapeCollectionResponse(
  shopifyCollection,
  productTransformerFn,
) {
  if (!shopifyCollection) {
    logError(
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
  if (!product) {
    logError("transformShopifyEventProduct received null or undefined product");
    return null;
  }

  // Extract the variant
  const firstVariant = product.variants?.edges?.[0]?.node || null;
  const variantId = firstVariant?.id || null;

  // Extract image data
  const images = getTransformedImages(product);

  // Extract price data from variant
  const priceString = firstVariant?.price?.amount || null;
  const price = priceString ? parseFloat(priceString) : null;
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
  if (!product) {
    logError("transformShopifyWineProduct received null or undefined product");
    return null;
  }

  const images = getTransformedImages(product);

  const variants =
    product.variants?.edges.map((edge) => {
      const variantNode = edge.node;
      return {
        id: variantNode.id,
        title: variantNode.title,
        price: {
          amount: parseFloat(variantNode.price?.amount) || null,
          currencyCode: variantNode.price?.currencyCode || "DKK",
        },
        availableForSale: variantNode.availableForSale || false,
        quantityAvailable: variantNode.quantityAvailable || 0,
        isDefault: variantNode.isDefaultDisplayVariant?.value === "true",
      };
    }) || [];

  const countryRef = getReferencedMetaobject(product.country);
  const regionRef = getReferencedMetaobject(product.region);
  const wineVarietyRef = getReferencedMetaobject(product.wineVariety);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    images,
    variants,

    // Wine specific fields from metaobjects
    country: countryRef ? getMetaobjectLabel(countryRef) : null,
    region: regionRef ? getMetaobjectLabel(regionRef) : null,
    wineVariety: wineVarietyRef ? getMetaobjectLabel(wineVarietyRef) : null,

    // Wine specific fields from direct value metafields
    grape: getMetafieldValue(product.grape),
    vineyard: getMetafieldValue(product.vineyard),
    producer: getMetafieldValue(product.producer),
    vintage: getMetafieldValue(product.vintage),
    servingTemperature: getMetafieldValue(product.servingTemperature),

    // Parsed JSON metafields
    tasteProfile:
      parseJsonMetafield(product.tasteProfile, "tasteProfile", product.id) ||
      [],
    volume: parseJsonMetafield(product.volume, "volume", product.id),

    // Parsed numeric metafields
    alcoholContent:
      parseFloat(getMetafieldValue(product.alcoholContent)) || null,
    softCrisp: parseFloat(getMetafieldValue(product.softCrisp)) || null,
    drySmooth: parseFloat(getMetafieldValue(product.drySmooth)) || null,
    velvetyAstringent:
      parseFloat(getMetafieldValue(product.velvetyAstringent)) || null,
    delicateBold: parseFloat(getMetafieldValue(product.delicateBold)) || null,
  };
}
