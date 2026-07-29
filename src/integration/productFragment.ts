import { gql } from "graphql-request";

export const PRODUCT_FRAGMENT = gql`
    fragment ProductData on Product {
        id
        entityId
        name
        plainTextDescription
        defaultImage {
            # sized down by BigCommerce: previews never render larger than ~250px,
            # and 480 keeps it sharp on retina displays
            url(width: 480)
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
