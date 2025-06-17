import { shopifyQuery } from "@/utils/shopify";
import {
  GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY,
  GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
} from "@/graphql/shopify-queries";
import { logError, logInfo } from "@/utils/logging";
import { parseISO } from "date-fns";

const getReferencedMetaobject = (metafield) => {
  return metafield?.references?.edges?.[0]?.node || null;
};

const getMetaobjectLabel = (metaobjectNode) => {
  return metaobjectNode?.name?.value || metaobjectNode?.label?.value || null;
};

const getMetaobjectFields = (metaobjectNode) => {
  if (!metaobjectNode?.fields) return {};
  return metaobjectNode.fields.reduce((acc, field) => {
    acc[field.key] = field.value;
    return acc;
  }, {});
};

const getMultipleReferencedMetaobjects = (metafield) => {
  return metafield?.references?.edges?.map((edge) => edge.node) || [];
};

export async function getCollectionByHandle(query, handle, language = "en") {
  try {
    const response = await shopifyQuery(query, { handle }, language);
    return response.collection;
  } catch (error) {
    logError(`Error fetching collection ${handle}:`, error);
    return null;
  }
}

export async function getEventsCollection(language = "en") {
  return await getCollectionByHandle(
    GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY,
    "events",
    language,
  );
}

export async function getWineCollection(language = "en") {
  const result = await getCollectionByHandle(
    GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
    "pre-sale-wines",
    language,
  );
  logInfo("Wine collection:", result);
  return result;
}

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

  const getMetafieldValue = (metafield, defaultValue = null) =>
    metafield?.value || defaultValue;

  let volumeParsed = null;
  const volumeString = getMetafieldValue(product.volume);
  if (volumeString) {
    try {
      volumeParsed = JSON.parse(volumeString);
    } catch (e) {
      logError("Error parsing volume JSON for wine product:", e, {
        productId: product.id,
        volumeString,
      });
      // Fallback or decide how to handle, e.g., store raw string or set to null
      volumeParsed = { value: parseFloat(volumeString) || null, unit: "L" }; // Simple fallback
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
    description: product.descriptionHtml, // Using descriptionHtml from productBaseFragment
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
    volume: volumeParsed, // Parsed JSON or fallback
    softCrisp: getMetafieldValue(product.softCrisp),
    drySmooth: getMetafieldValue(product.drySmooth),
    velvetyAstringent: getMetafieldValue(product.velvetyAstringent),
    delicateBold: getMetafieldValue(product.delicateBold),
  };
}
