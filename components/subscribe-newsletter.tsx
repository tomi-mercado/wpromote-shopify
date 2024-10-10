import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SubscribeNewsletter = () => {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="border border-card-border p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-foreground-lighter">
          Stay updated with our latest products, gardening tips, and exclusive
          offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow border-card-border focus:ring-[#8A9A5B] focus:border-[#8A9A5B]"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};
