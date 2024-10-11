"use client";

import { GetProductsResult } from "@/services/shopify/queries/getProducts";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../product-card";
import { serverGetProducts } from "./actions";

export const ProductsResult = ({
  initialProductsResult,
}: {
  initialProductsResult: GetProductsResult;
}) => {
  const lastProductRowRenderedRef = useRef<HTMLSpanElement>(null);
  const [products, setProducts] = useState<GetProductsResult["products"]>(
    initialProductsResult.products
  );
  const [productsPagination, setProductsPagination] = useState(
    initialProductsResult.pagination
  );

  // Intersection observer to get more products when the user reaches the bottom of the list
  useEffect(() => {
    if (!lastProductRowRenderedRef.current || !productsPagination.hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const shouldExecute =
          entries[0].isIntersecting && productsPagination.hasNextPage;

        if (!shouldExecute) {
          return;
        }

        serverGetProducts({
          pageCursor: productsPagination.endCursor,
        }).then((newProductsResponse) => {
          if (!newProductsResponse.success) {
            // TODO: Handle error
            return;
          }

          setProductsPagination(newProductsResponse.body.pagination);
          setProducts((prev) => [
            ...prev,
            ...newProductsResponse.body.products,
          ]);
        });
      },
      { threshold: 1 }
    );

    observer.observe(lastProductRowRenderedRef.current);

    return () => {
      observer.disconnect();
    };
  }, [productsPagination.endCursor, productsPagination.hasNextPage]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          images={product.images}
          price={product.price}
          slug={product.slug}
        />
      ))}
      <span ref={lastProductRowRenderedRef} />
    </div>
  );
};
