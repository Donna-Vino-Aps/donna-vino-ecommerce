import productBaseFragment from "./productBase";

const eventProductFragment = `
  fragment eventProduct on Product {
    ...productBase
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
    # Event-specific metafields
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
    totalSeats: metafield(namespace: "event", key: "totalSeats") {
      value
    }
  }
  ${productBaseFragment}
`;

export default eventProductFragment;
