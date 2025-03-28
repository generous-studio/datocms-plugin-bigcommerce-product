import request, { gql } from "graphql-request";
import { Product } from "../types/product";
import { PRODUCT_FRAGMENT } from "./productFragment";
import {ValidConfig} from "../types/config.ts";

export const searchProducts: (
  term: string,
  config: ValidConfig
) => Promise<Product[]> = (term: string = "", config) => {
  return request<{
    site: {
      search: {
        searchProducts: {
          products: {
            edges: {
              node: Product;
            }[];
          };
        };
      };
    };
  }>(
    config.graphqlEndpoint,
    gql`
        ${PRODUCT_FRAGMENT}
        query productSearch($term: String) {
            site {
                search {
                    searchProducts(filters: { searchTerm: $term }) {
                        products {
                            edges {
                                node {
                                    ...ProductData
                                }
                            }
                        }
                    }
                }
            }
        }
    `,
    {
      term,
    },
    {
      Authorization: `Bearer ${config.authorizationToken}`,
    }
  )
  .then((response) =>
    response.site.search.searchProducts.products.edges.map((e) => e.node)
  )
};
