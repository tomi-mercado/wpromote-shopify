"use server";

import { getProducts } from "@/services/shopify/queries/getProducts";

export const serverGetProducts = async (
  args: Parameters<typeof getProducts>[0]
) => {
  return getProducts(args);
};
