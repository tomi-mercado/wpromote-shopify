import { FeaturedCategories } from "@/components/featured-categories";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { SubscribeNewsletter } from "@/components/subscribe-newsletter";

export default async function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <SubscribeNewsletter />
    </>
  );
}
