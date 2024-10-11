import { Leaf } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SearchButton } from "./search-button";

export const Navbar = () => {
  return (
    <header className="bg-background-secondary text-foreground-secondary p-4 fixed top-0 w-full z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Tom Mercado de Plantas</span>
        </Link>

        <Suspense>
          <SearchButton />
        </Suspense>
      </div>
    </header>
  );
};
