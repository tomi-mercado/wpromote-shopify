import { getProducts } from "@/services/shopify/queries/getProducts";

export default async function Home() {
  console.log(await getProducts());
  return <>Holis</>;
}
