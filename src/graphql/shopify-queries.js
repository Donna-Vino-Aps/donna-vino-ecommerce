export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $locale: String!) {
    collection: collectionByHandle(handle: $handle) {
      id
      title(locale: $locale)
      handle
      products(first: 10) {
        edges {
          node {
            id
            title(locale: $locale)
            handle
            totalInventory
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            description(locale: $locale)
            date: metafield(namespace: "event", key: "date") {
              value
            }
            menuDescription: metafield(namespace: "event", key: "menuDescription", locale: $locale) {
              value
            }
            wineDescription: metafield(namespace: "event", key: "wineDescription", locale: $locale) {
              value
            }
            winery: metafield(namespace: "event", key: "winery", locale: $locale) {
              value
            }
            wine: metafield(namespace: "event", key: "wine", locale: $locale) {
              value
            }
            timeStart: metafield(namespace: "event", key: "timestart") {
              value
            }
            timeEnd: metafield(namespace: "event", key: "timeend") {
              value
            }
            location: metafield(namespace: "event", key: "location", locale: $locale) {
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
            availableSeats: variants(first: 1) {
              edges {
                node {
                  quantityAvailable
                }
              }
            }
          }
        }
      }
    }
  }
`;
