import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/services/shopify/queries/getProducts";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const productsResponse = await getProducts({
    query: searchParams.q,
  });

  if (!productsResponse.success) {
    return <div>There was an error fetching the products</div>;
  }

  const {
    body: { products },
  } = productsResponse;

  const title = searchParams.q
    ? `Search results for "${searchParams.q}"`
    : "Showing all products";

  return (
    <div className="flex flex-col gap-6 py-10 container mx-auto">
      <h1 className="text-2xl font-semibold text-foreground-primary">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
}
