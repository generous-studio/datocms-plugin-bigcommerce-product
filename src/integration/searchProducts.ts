import request, { gql } from "graphql-request";
import { Product } from "../types/Product";
import { PRODUCT_FRAGMENT } from "./productFragment";
import { Plugin } from "../types/Plugin";

export const searchProducts: (
  term: string,
  config: Plugin["parameters"]["global"]
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
    .catch((e) => {
      console.error(e);
      return [] as Product[];
    });
};
