import { Button } from "@/components/ui/button";

export const FeaturedCategories = () => {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Our Featured Categories
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-card-border p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Indoor Plants</h2>
          <p className="mb-6 text-foreground-lighter">
            Bring life to your interior spaces with our curated selection of
            indoor plants.
          </p>
          <Button>Shop Indoor</Button>
        </div>
        <div className="border border-card-border p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Outdoor Gardens</h2>
          <p className="mb-6 text-foreground-lighter">
            Transform your outdoor spaces into lush, vibrant gardens with our
            outdoor plants.
          </p>
          <Button>Shop Outdoor</Button>
        </div>
        <div className="border border-card-border p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Gardening Tools</h2>
          <p className="mb-6 text-foreground-lighter">
            Find the perfect tools to nurture your plants and create your dream
            garden.
          </p>
          <Button>Shop Tools</Button>
        </div>
      </div>
    </section>
  );
};
