import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ProductCardWrapper } from "./product-card.client";

export const ProductCard = ({
  images,
  title,
  price,
  slug,
}: {
  title: string;
  price: number;
  images: {
    url: string;
    altText: string | null;
  }[];
  slug: string;
}) => {
  return (
    <ProductCardWrapper>
      <Image
        src={images[0].url}
        alt={images[0].altText || "Product image"}
        className="w-full h-1/2 object-cover"
        width={400}
        height={300}
      />
      <div className="p-6 grid grid-cols-1 grid-rows-3 gap-4 h-1/2 z-10">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-foreground-primary font-semibold text-xl">
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <Button className="w-full" asChild>
          <Link href={`/product/${slug}`}>See details</Link>
        </Button>
      </div>
    </ProductCardWrapper>
  );
};

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn("w-full h-[432px]", className)} />;
};
