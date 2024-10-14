import { useSearchParams } from "next/navigation";

export function useSearchParamsState<T extends string>({
  paramName,
  historyChangeState = "replace",
  paramsToReset,
  validate,
}: {
  validate: (value: string | undefined | null) => T;
  paramName: string;
  withPagination?: boolean;
  paginationParamName?: string;
  historyChangeState?: "push" | "replace";
  paramsToReset?: string[];
}) {
  const searchParams = useSearchParams();

  const state = validate(searchParams?.get(paramName));

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams || "");

    if (paramsToReset) {
      paramsToReset.forEach((param) => params.delete(param));
    }

    params.set(paramName, value);

    window.history[
      historyChangeState === "push" ? "pushState" : "replaceState"
    ](null, "", `?${params.toString()}`);
  };

  return [state, handleChange] as const;
}
