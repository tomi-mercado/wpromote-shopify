import { ErrorScreen } from "@/components/error-screen";
import {
  ImagesThumbnails,
  ProductImagesProvider,
  SelectedImage,
} from "@/components/product-images";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/services/shopify/queries/getProductBySlug";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await getProductBySlug(params.slug);

  if (!product.success) {
    return {
      title: "Something went wrong",
      description: product.error,
    };
  }

  if (!product.body) {
    return {
      title: "Product not found",
      description: "The product you're looking for doesn't exist",
    };
  }

  return {
    title: `${product.body.title}`,
    description: product.body.description,
  };
};

export default async function ProductDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const result = await getProductBySlug(params.slug);

    if (!result.success) {
      return (
        <ErrorScreen title="Something went wrong" description={result.error} />
      );
    }

    if (!result.body) {
      return (
        <ErrorScreen
          title="Product not found"
          description="The product you're looking for doesn't exist"
        />
      );
    }

    const { title, description, price, images } = result.body;

    return (
      <div className="container mx-auto py-8 px-4">
        <Button asChild variant="link">
          <Link href="/search">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>
        <ProductImagesProvider images={images}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <SelectedImage />
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-2xl font-bold">
                {price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="text-foreground-lighter">{description}</p>
            </div>
            <ImagesThumbnails />
          </div>
        </ProductImagesProvider>
      </div>
    );
  } catch (e) {
    console.error(e);
    return (
      <ErrorScreen
        title="Something went wrong"
        description="An error occurred while trying to fetch the product data"
      />
    );
  }
}
