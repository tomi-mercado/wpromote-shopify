import { getProducts } from "@/services/shopify/queries/getProducts";
import Image from "next/image";

export default async function Home() {
  const productsResult = await getProducts();

  if (!productsResult.success) {
    return <>{productsResult.error}</>;
  }

  return (
    <div className="flex flex-col gap-6">
      <p>Products:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsResult.body.map((product) => {
          return (
            <div key={product.id} className="flex flex-col gap-2">
              {product.images.map((image) => {
                return (
                  <Image
                    key={image.url}
                    src={image.url}
                    alt={image.altText || "Product image"}
                    width={200}
                    height={200}
                  />
                );
              })}
              <p>{product.title}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
