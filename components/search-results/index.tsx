"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErrorScreen } from "../error-screen";
import { ProductCard, ProductCardSkeleton } from "../product-card";
import { Button } from "../ui/button";
import { serverGetProducts } from "./actions";

export const SearchResults = () => {
  const searchParams = useSearchParams();

  const filters = {
    query: searchParams.get("q") ?? "",
    endCursor: searchParams.get("endCursor") ?? undefined,
    startCursor: searchParams.get("startCursor") ?? undefined,
    pageSize: 9,
  };

  const {
    data: productsResult,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () =>
      serverGetProducts(filters).then((res) => {
        if (!res.success) {
          throw new Error(res.error);
        }

        return res.body;
      }),
  });

  if (error) {
    return (
      <ErrorScreen title="Something went wrong" description={error.message} />
    );
  }

  const products = productsResult?.products ?? [];
  const pagination = productsResult?.pagination;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton className="bg-slate-200" key={i} />
            ))}
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                images={product.images}
                price={product.price}
                slug={product.slug}
              />
            ))}
          </>
        )}
      </div>

      {pagination && (
        <div className="flex justify-between">
          {pagination.hasPreviousPage ? (
            <Button variant="link" asChild className="text-lg">
              <Link
                href={{
                  query: {
                    startCursor: pagination.startCursor,
                    q: filters.query,
                  },
                }}
              >
                <ChevronLeft className="mr-1" />
                Previous
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {pagination.hasNextPage && (
            <Button variant="link" asChild className="text-lg">
              <Link
                href={{
                  query: { endCursor: pagination.endCursor, q: filters.query },
                }}
              >
                Next
                <ChevronRight className="ml-1" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
