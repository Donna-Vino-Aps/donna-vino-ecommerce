export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!) {
    collection: collectionByHandle(handle: $handle) {
      id
      title
      handle
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            totalInventory
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
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
            timeStart: metafield(namespace: "event", key: "timestart") {
              value
            }
            timeEnd: metafield(namespace: "event", key: "timeend") {
              value
            }
            location: metafield(namespace: "event", key: "location") {
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
