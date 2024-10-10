import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful garden"
          className="w-full h-full object-cover"
          width={2000}
          height={1333}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to Our Green Oasis
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Discover the beauty of nature, right at your doorstep.
        </p>
        <Button size="xl">
          Explore Our Collection
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
