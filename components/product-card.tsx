import Image from "next/image";
import { Button } from "./ui/button";

export const ProductCard = ({
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
