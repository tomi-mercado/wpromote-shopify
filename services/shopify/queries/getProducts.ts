import { z } from "zod";
import { shopifyFetch } from "..";

export const productsFragment = `
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
`;

export const graphqlProductsSchema = z
  .object({
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
  })
  .transform(({ edges }) => {
    return edges.map((edge) => {
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
  });

export async function getProducts() {
  return shopifyFetch({
    query: `
      query getProducts($productsQuery: String) {
        products(first: 100, query: $productsQuery) {
          ${productsFragment}
        }
      }
    `,
    resultSchema: z
      .object({
        data: z.object({
          products: graphqlProductsSchema,
        }),
      })
      .transform(({ data }) => {
        return data.products;
      }),
  });
}
