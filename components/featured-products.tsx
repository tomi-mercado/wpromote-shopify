import { getFeaturedProducts } from "@/services/shopify/queries/getFeaturedProducts";
import { Suspense } from "react";
import { ErrorScreen } from "./error-screen";
import { ProductCard } from "./product-card";
import { Skeleton } from "./ui/skeleton";

const FeaturedProductCardSkeleton = () => {
  return <Skeleton className="w-full h-[432px]" />;
};

const FeaturedProductsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {children}
    </div>
  );
};

const FeaturedProductsResult = async () => {
  try {
    const products = await getFeaturedProducts();

    if (!products.success) {
      return (
        <ErrorScreen title="An error ocurred" description={products.error} />
      );
    }

    return (
      <FeaturedProductsWrapper>
        {products.body.map((product) => {
          return (
            <ProductCard
              key={product.id}
              title={product.title}
              images={product.images}
              price={product.price}
              slug={product.slug}
            />
          );
        })}
      </FeaturedProductsWrapper>
    );
  } catch (e) {
    console.error(e);
    return <ErrorScreen title="An error ocurred" description="" />;
  }
};

export const FeaturedProducts = () => {
  return (
    <section className="bg-background-secondary py-16">
      <div className="container mx-auto px-4 flex flex-col gap-12">
        <h2 className="text-3xl font-bold text-center text-foreground-secondary">
          Featured Products
        </h2>
        <Suspense
          fallback={
            <FeaturedProductsWrapper>
              {Array.from({ length: 4 }).map((_, key) => (
                <FeaturedProductCardSkeleton key={key} />
              ))}
            </FeaturedProductsWrapper>
          }
        >
          <FeaturedProductsResult />
        </Suspense>
      </div>
    </section>
  );
};
