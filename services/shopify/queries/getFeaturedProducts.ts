import { z } from "zod";
import { shopifyFetch } from "..";
import { graphqlProductsSchema, productsFragment } from "./getProducts";

export async function getFeaturedProducts() {
  return shopifyFetch({
    query: `
      query getFeaturedProducts {
        collections(first: 1, query: "title:Featured products") {
          edges {
            node {
              products(first:4) {
                ${productsFragment}
              }
            }
          }
        }
      }
    `,
    resultSchema: z
      .object({
        data: z.object({
          collections: z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  products: graphqlProductsSchema,
                }),
              })
            ),
          }),
        }),
      })
      .transform(({ data }) => {
        return data.collections.edges[0].node.products;
      }),
  });
}
