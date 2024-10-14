import { useSearchParamsState } from "@/lib/use-search-params-state";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const validateSort = (value: string | undefined | null) =>
  z.enum(["price", "title"]).safeParse(value).data ?? "title";
export const validateOrder = (value: string | undefined | null) =>
  z.enum(["asc", "desc"]).safeParse(value).data ?? "asc";

export const SearchFilters = () => {
  const [sort, setSort] = useSearchParamsState({
    paramName: "sort",
    validate: validateSort,
    paramsToReset: ["endCursor", "startCursor"],
  });

  const [order, setOrder] = useSearchParamsState({
    paramName: "order",
    validate: validateOrder,
    paramsToReset: ["endCursor", "startCursor"],
  });

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">
        <p>Sort by</p>
        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value);
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <p>Order</p>
        <Select
          value={order}
          onValueChange={(value) => {
            setOrder(value);
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
