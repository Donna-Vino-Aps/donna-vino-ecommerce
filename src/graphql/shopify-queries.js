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
            menu: metafield(namespace: "event", key: "menu") {
              value
            }
            winery: metafield(namespace: "event", key: "winery") {
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
