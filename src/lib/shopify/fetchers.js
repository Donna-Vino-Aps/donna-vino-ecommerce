import { shopifyQuery } from "@/utils/shopify";
import { logError } from "@/utils/logging";

export async function getRawCollectionByHandle(query, handle, language = "en") {
  try {
    const response = await shopifyQuery(query, { handle }, language);
    return response.collection;
  } catch (error) {
    logError(`Error fetching collection ${handle}:`, error);
    return null;
  }
}
