import { z } from "zod";
import { shopifyFetch } from "..";

export const productsFragment = `
  edges {
    cursor
    node {
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
  pageInfo {
    hasNextPage
    hasPreviousPage
    endCursor
    startCursor
  } 
`;

export const graphqlProductNodeSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    handle: z.string().min(1),
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
  })
  .transform((node) => {
    return {
      id: node.id,
      title: node.title,
      price: Number(node.priceRange.maxVariantPrice.amount),
      description: node.description,
      slug: node.handle,
      images: node.media.nodes.map((mediaNode) => ({
        url: mediaNode.image.url,
        altText: mediaNode.image.altText,
      })),
    };
  });

export const graphqlProductsSchema = z
  .object({
    edges: z.array(
      z.object({
        cursor: z.string(),
        node: graphqlProductNodeSchema,
      })
    ),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      hasPreviousPage: z.boolean(),
      endCursor: z.string().optional(),
      startCursor: z.string().optional(),
    }),
  })
  .transform(({ edges, pageInfo }) => {
    return {
      products: edges.map((edge) => {
        return edge.node;
      }),
      pagination: {
        hasNextPage: pageInfo.hasNextPage,
        hasPreviousPage: pageInfo.hasPreviousPage,
        endCursor: pageInfo.endCursor,
        startCursor: pageInfo.startCursor,
      },
    };
  });

const getProductsResultSchema = z
  .object({
    data: z.object({
      products: graphqlProductsSchema,
    }),
  })
  .transform(({ data }) => {
    return data.products;
  });

export type GetProductsResult = z.infer<typeof getProductsResultSchema>;

export async function getProducts({
  query = "",
  pageSize = 9,
  endCursor,
  startCursor,
  sortBy = "title",
  order = "asc",
}: {
  query?: string;
  pageSize?: number;
  endCursor?: string | undefined;
  startCursor?: string | undefined;
  sortBy?: "title" | "price";
  order?: "asc" | "desc";
}) {
  return shopifyFetch({
    query: `
      query getProducts($productsQuery: String, $pageSize: Int, ${
        endCursor ? `$endCursor: String,` : ""
      } ${startCursor ? `$startCursor: String` : ""}) {
        products(
          query: $productsQuery,
          ${endCursor ? `after: $endCursor,` : ""}
          ${startCursor ? `before: $startCursor,` : ""}
          ${startCursor ? `last: $pageSize,` : `first: $pageSize,`}
          sortKey: ${sortBy.toUpperCase()},
          reverse: ${order === "desc"}
        ) {
          ${productsFragment}
        }
      }
    `,
    variables: {
      productsQuery: query,
      pageSize,
      endCursor,
      startCursor,
    },
    resultSchema: getProductsResultSchema,
  });
}
