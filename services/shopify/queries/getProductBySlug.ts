import { cache } from "react";
import { z } from "zod";
import { shopifyFetch } from "..";
import { graphqlProductNodeSchema } from "./getProducts";

export const getProductBySlug = cache(async (slug: string) => {
  return shopifyFetch({
    query: `
      query getProductBySlug($handle: String) {
        product(handle: $handle) {
          id
          title
          handle
          description
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          media(first: 100) {
            nodes {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      handle: slug,
    },
    resultSchema: z
      .object({
        data: z.object({
          product: graphqlProductNodeSchema.nullable(),
        }),
      })
      .transform(({ data }) => {
        return data.product;
      }),
  });
});
