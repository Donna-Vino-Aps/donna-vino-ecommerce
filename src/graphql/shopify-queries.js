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

// Old Queries (to be removed later)
/*
export const GET_EVENTS_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
    collection: collectionByHandle(handle: $handle) {
      id
      title
      handle
      products(first: 50, sortKey: CREATED, reverse: true) {
        edges {
          node {
            id
            title
            handle
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  availableSeats: quantityAvailable
                }
              }
            }
            description
            date: metafield(namespace: "event", key: "date") {
              value
            }
            menuDescription: metafield(namespace: "event", key: "menuDescription") {
              value
            }
            wineDescription: metafield(namespace: "event", key: "wineDescription") {
              value
            }
            winery: metafield(namespace: "event", key: "winery") {
              value
            }
            wine: metafield(namespace: "event", key: "wine") {
              value
            }
            timeStart: metafield(namespace: "event", key: "timeStart") {
              value
            }
            timeEnd: metafield(namespace: "event", key: "timeEnd") {
              value
            }
            location: metafield(namespace: "event", key: "location") {
              value
            }
            totalSeats: metafield(namespace: "event", key: "totalSeats") {
              value
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
*/
