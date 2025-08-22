import productBaseFragment from "./productBase";

const wineProductFragment = `
  fragment wineProduct on Product {
    ...productBase
    variants(first: 2) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
          quantityAvailable
          isDefaultDisplayVariant: metafield(namespace: "wine", key: "default_display_variant") {
            value
          }
        }
      }
    }
    # Wine-specific metafields
    country: metafield(namespace: "shopify", key: "country") {
      references(first: 1) {
        edges {
          node {
            ... on Metaobject {
              name: field(key: "label") {
                value
              }
            }
          }
        }
      }
    }
    region: metafield(namespace: "shopify", key: "region") {
      references(first: 1) {
        edges {
          node {
            ... on Metaobject {
              name: field(key: "label") {
                value
              }
            }
          }
        }
      }
    }
    wineVariety: metafield(namespace: "shopify", key: "wine-variety") {
      references(first: 1) {
        edges {
          node {
            ... on Metaobject {
              name: field(key: "label") {
                value
              }
            }
          }
        }
      }
    }
    grape: metafield(namespace: "wine", key: "grape") {
      value
    }
    vineyard: metafield(namespace: "wine", key: "vineyard") {
      value
    }
    tasteProfile: metafield(namespace: "wine", key: "taste_profile") {
      value
    }
    tastesFruits: metafield(namespace: "wine", key: "tastes_fruits") {
      value
    }
    tastesSpices: metafield(namespace: "wine", key: "tastes_spices") {
      value
    }
    tastesNotes: metafield(namespace: "wine", key: "tastes_notes") {
      value
    }  
    alcoholContent: metafield(namespace: "wine", key: "alcohol_content") {
      value
    }
    servingTemperature: metafield(namespace: "wine", key: "serving_temperature") {
      value
    }
    vintage: metafield(namespace: "wine", key: "vintage") {
      value
    }
    producer: metafield(namespace: "wine", key: "producer") {
      value
    }
    volume: metafield(namespace: "wine", key: "volume") {
      value
    }
    softCrisp: metafield(namespace: "wine", key: "soft_crisp") {
      value
    }
    drySmooth: metafield(namespace: "wine", key: "dry_smooth") {
      value
    }
    velvetyAstringent: metafield(namespace: "wine", key: "velvety_astringent") {
      value
    }
    delicateBold: metafield(namespace: "wine", key: "delicate_bold") {
      value
    }
  }
  ${productBaseFragment}
`;

export default wineProductFragment;
