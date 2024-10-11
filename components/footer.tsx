import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-background-secondary text-foreground-secondary py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button asChild variant="link">
                  <Link href="#">Home</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="link">
                  <Link href="#">Shop</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <p className="flex items-center">
                <MapPin className="size-4 mr-1 text-primary" />
                123 Green Street, Plantville
              </p>
              <p className="flex items-center">
                <Phone className="size-4 mr-1 text-primary" />
                Phone: (123) 456-7890
              </p>
              <p className="flex items-center">
                <Mail className="size-4 mr-1 text-primary" />
                Email: info@tommercadodeplantas.com
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p>&copy; 2023 Tom Mercado de Plantas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
