import { env } from "@/env";
import { z } from "zod";

const SHOPIFY_STORE_DOMAIN = env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ErrorCodes =
  | "JSON_PARSE_ERROR"
  | "ZOD_PARSE_ERROR"
  | "GRAPHQL_ERROR"
  | "UNKNOWN_ERROR"
  | "FETCH_ERROR";

type ShopifyFetchError = {
  success: false;
  errorCode: ErrorCodes;
  error: string;
};

type ShopifyFetchSuccess<Schema extends z.ZodSchema> = {
  success: true;
  body: z.infer<Schema>;
};

export async function shopifyFetch<Schema extends z.ZodSchema>({
  query,
  variables,
  resultSchema,
}: {
  query: string;
  variables?: string;
  resultSchema: Schema;
}): Promise<ShopifyFetchSuccess<Schema> | ShopifyFetchError> {
  let result: Response;
  try {
    result = await fetch(`${SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      errorCode: "FETCH_ERROR",
      error: "Error receiving data",
    } as const;
  }

  let jsonResult;
  try {
    jsonResult = await result.json();
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {
      success: false,
      errorCode: "JSON_PARSE_ERROR",
      error: "Result is not JSON",
    } as const;
  }

  if (result.status === 200 && "data" in jsonResult) {
    let parsedResult: z.infer<Schema>;
    try {
      parsedResult = resultSchema.parse(jsonResult);
    } catch (error) {
      console.log(jsonResult);
      console.error("Error parsing result:", error);
      return {
        success: false,
        errorCode: "ZOD_PARSE_ERROR",
        error: "Error parsing result",
      } as const;
    }

    return {
      success: true,
      body: parsedResult,
    } as const;
  }

  const errors = z
    .object({
      errors: z.array(
        z.object({
          message: z.string(),
        })
      ),
    })
    .safeParse(jsonResult);

  if (errors.success) {
    console.error("GraphQL error:", errors.data.errors);
    return {
      success: false,
      errorCode: "GRAPHQL_ERROR",
      error: errors.data.errors.map((error) => error.message).join(", "),
    } as const;
  }

  console.error("Unknown error:", jsonResult);
  return {
    success: false,
    errorCode: "UNKNOWN_ERROR",
    error: "Unknown error",
  };
}
