import { getFeaturedProducts } from "@/services/shopify/queries/getFeaturedProducts";
import Image from "next/image";
import { Suspense } from "react";
import { ErrorScreen } from "./error-screen";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const FeaturedProductCardSkeleton = () => {
  return <Skeleton className="w-full h-[432px]" />;
};

const FeaturedProductCard = ({
  description,
  images,
  title,
}: {
  title: string;
  description: string;
  images: {
    url: string;
    altText: string | null;
  }[];
}) => {
  return (
    <div className="bg-background-primary rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col">
      <Image
        src={images[0].url}
        alt={images[0].altText || "Product image"}
        className="w-full h-1/2 object-cover"
        width={400}
        height={300}
      />
      <div className="p-6 grid grid-cols-1 grid-rows-3 h-1/2">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-foreground-lighter mb-4">{description}</p>
        <Button className="w-full">See details</Button>
      </div>
    </div>
  );
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
          {getFeaturedProducts()
            .then((products) => {
              if (!products.success) {
                return (
                  <ErrorScreen
                    title="An error ocurred while fetch this section"
                    description={products.error}
                  />
                );
              }

              return (
                <FeaturedProductsWrapper>
                  {products.body.map((product) => {
                    return (
                      <FeaturedProductCard
                        key={product.id}
                        title={product.title}
                        description={product.description}
                        images={product.images}
                      />
                    );
                  })}
                </FeaturedProductsWrapper>
              );
            })
            .catch((e) => {
              console.error(e);
              return (
                <ErrorScreen
                  title="An error ocurred while fetch this section"
                  description=""
                />
              );
            })}
        </Suspense>
      </div>
    </section>
  );
};
