import collectionBaseFragment from "./fragments/collectionBase";
import eventProductFragment from "./fragments/eventProduct";
import wineProductFragment from "./fragments/wineProduct";

export const GET_COLLECTION_WITH_EVENT_PRODUCTS_QUERY = `
  query GetCollectionWithEventProducts(
    $handle: String!
    $language: LanguageCode!
  ) @inContext(language: $language) {
    collection: collectionByHandle(handle: $handle) {
      ...collectionBase
      products(first: 50, sortKey: CREATED, reverse: true) {
        edges {
          node {
            ...eventProduct
          }
        }
      }
    }
  }
  ${collectionBaseFragment}
  ${eventProductFragment}
`;

export const GET_COLLECTION_WITH_WINE_PRODUCTS_QUERY = `
  query GetCollectionWithWineProducts(
    $handle: String!
    $language: LanguageCode!
  ) @inContext(language: $language) {
    collection: collectionByHandle(handle: $handle) {
      ...collectionBase
      products(first: 50, sortKey: CREATED, reverse: true) {
        edges {
          node {
            ...wineProduct
          }
        }
      }
    }
  }
  ${collectionBaseFragment}
  ${wineProductFragment}
`;
