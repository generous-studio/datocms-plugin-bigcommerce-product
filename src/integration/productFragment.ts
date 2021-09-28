import { gql } from "graphql-request";

export const PRODUCT_FRAGMENT = gql`
  fragment ProductData on Product {
    id
    name
    plainTextDescription
    defaultImage {
      urlOriginal
      altText
    }
    availabilityV2 {
      status
    }
    prices {
      price {
        value
        currencyCode
      }
    }
  }
`;
