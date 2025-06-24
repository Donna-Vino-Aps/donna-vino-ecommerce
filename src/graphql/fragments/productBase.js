import imageFragment from "./image";

const productBaseFragment = `
  fragment productBase on Product {
    id
    handle
    availableForSale
    title
    description
    images(first: 5) {
      edges {
        node {
          ...image
        }
      }
    }
  }
  ${imageFragment}
`;

export default productBaseFragment;
