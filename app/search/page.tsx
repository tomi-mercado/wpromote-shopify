import { SearchResults } from "@/components/search-results";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const title = searchParams.q
    ? `Search results for "${searchParams.q}"`
    : "Showing all products";

  return (
    <div className="flex flex-col gap-6 py-10 container mx-auto">
      <h1 className="text-2xl font-semibold text-foreground-primary">
        {title}
      </h1>
      <SearchResults />
    </div>
  );
}
