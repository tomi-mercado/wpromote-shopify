"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { createContext, useContext, useState } from "react";

const ProductImagesContext = createContext<{
  selectedIndex: number;
  images: { url: string; altText: string | null }[];
  onSelectImage: (index: number) => void;
} | null>(null);

export function ProductImagesProvider({
  children,
  images,
}: {
  children: React.ReactNode;
  images: { url: string; altText: string | null }[];
}) {
  const [selectedImageIndex, setSelectedImage] = useState(0);
  return (
    <ProductImagesContext.Provider
      value={{
        images,
        selectedIndex: selectedImageIndex,
        onSelectImage: setSelectedImage,
      }}
    >
      {children}
    </ProductImagesContext.Provider>
  );
}

function useProductImages() {
  const context = useContext(ProductImagesContext);
  if (context === null) {
    throw new Error(
      "useProductImages must be used within a ProductImagesProvider"
    );
  }
  return context;
}

export const SelectedImage = () => {
  const { images, selectedIndex } = useProductImages();
  const selectedImage = images[selectedIndex];
  return (
    <Image
      src={selectedImage.url}
      alt={selectedImage.altText || "Product image"}
      className="w-full h-auto rounded-lg shadow-lg"
      width={600}
      height={600}
    />
  );
};

export const ImagesThumbnails = () => {
  const { images, onSelectImage, selectedIndex } = useProductImages();
  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.url}
          alt={image.altText || "Product image"}
          className={cn(
            "w-full h-auto rounded-lg shadow-lg cursor-pointer",
            selectedIndex === index && "border-2 border-primary"
          )}
          width={150}
          height={150}
          onClick={() => onSelectImage(index)}
        />
      ))}
    </div>
  );
};
