import { Button } from "@/components/ui/button";
import Image from "next/image";

export const FeaturedProducts = () => {
  return (
    <section className="bg-background-secondary py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground-secondary">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-background-primary rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Image
                src={`/placeholder.svg?height=300&width=400`}
                alt="Plant"
                className="w-full h-56 object-cover"
                width={400}
                height={300}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Beautiful Plant</h3>
                <p className="text-foreground-lighter mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
