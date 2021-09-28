import request, { gql } from "graphql-request";
import { Product } from "../types/Product";
import { PRODUCT_FRAGMENT } from "./productFragment";
import { Plugin } from "../types/Plugin";

export const getProduct: (
  productId: string,
  config: Plugin["parameters"]["global"]
) => Promise<Product | undefined> = (productId: string, config) => {
  return request<{
    site: {
      product: Product;
    };
  }>(
    config.graphqlEndpoint,
    gql`
      ${PRODUCT_FRAGMENT}
      query productData($productId: ID) {
        site {
          product(id: $productId) {
            ...ProductData
          }
        }
      }
    `,
    {
      productId,
    },
    {
      Authorization: `Bearer ${config.authorizationToken}`,
    }
  )
    .then((response) => response.site.product)
    .catch((e) => {
      console.error(e);
      return undefined;
    });
};
