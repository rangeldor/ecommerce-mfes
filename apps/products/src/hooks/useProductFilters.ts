import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
}

export function useProductFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      category: parseAsString.withDefault(""),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
      sortBy: parseAsString.withDefault("name"),
    },
    {
      shallow: false,
    }
  );

  const updateFilter = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setFilters({ [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: null,
      maxPrice: null,
      sortBy: "name",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
}
