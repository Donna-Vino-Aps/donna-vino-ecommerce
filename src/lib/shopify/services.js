import {
  GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY,
  GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
} from "@/graphql/shopify-queries";
import { getRawCollectionByHandle } from "./fetchers";
import {
  reshapeCollectionResponse,
  transformShopifyEventProduct,
  transformShopifyWineProduct,
} from "./transformers";

export async function getEventsCollection(language = "en") {
  const rawCollection = await getRawCollectionByHandle(
    GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY,
    "events",
    language,
  );
  return reshapeCollectionResponse(rawCollection, transformShopifyEventProduct);
}

export async function getWinesCollection(collectionHandle, language = "en") {
  const rawCollection = await getRawCollectionByHandle(
    GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY,
    collectionHandle,
    language,
  );
  return reshapeCollectionResponse(rawCollection, transformShopifyWineProduct);
}

export async function fetchPreSaleWines(language = "en") {
  return await getWinesCollection("pre-sale-wines", language);
}
