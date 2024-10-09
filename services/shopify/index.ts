import { env } from "@/env";

const SHOPIFY_STORE_DOMAIN = env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query }: { query: string }) {
  try {
    const result = await fetch(
      `${SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables: null }),
      }
    );

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}
