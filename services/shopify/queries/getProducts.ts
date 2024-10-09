import { z } from "zod";
import { shopifyFetch } from "..";

export async function getProducts() {
  return shopifyFetch({
    query: `
      query getProducts($title: String) {
        products(sortKey: TITLE, first: 100, query: $title) {
          edges {
            node {
              id
              title
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
        }
      }
    `,
    resultSchema: z
      .object({
        data: z.object({
          products: z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  id: z.string().min(1),
                  title: z.string().min(1),
                  description: z.string(),
                  priceRange: z.object({
                    maxVariantPrice: z.object({
                      amount: z.string(),
                    }),
                  }),
                  media: z.object({
                    nodes: z.array(
                      z.object({
                        image: z.object({
                          url: z.string(),
                          altText: z.string().nullable(),
                        }),
                      })
                    ),
                  }),
                }),
              })
            ),
          }),
        }),
      })
      .transform((data) => {
        return data.data.products.edges.map((edge) => {
          return {
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            price: edge.node.priceRange.maxVariantPrice.amount,
            images: edge.node.media.nodes.map((node) => ({
              url: node.image.url,
              altText: node.image.altText,
            })),
          };
        });
      }),
  });
}
