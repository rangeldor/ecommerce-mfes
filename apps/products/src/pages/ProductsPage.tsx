import { useState, useMemo, useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { Card, CardContent, Input } from "@ecommerce/shared-ui";
import { Skeleton } from "@ecommerce/shared-ui";
import type { Product } from "@ecommerce/shared/types";
import { useProductFilters } from "../hooks/useProductFilters";

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="flex flex-col h-full">
          <div className="aspect-square bg-muted animate-pulse" />
          <CardContent className="flex-1 pt-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
          <div className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-destructive font-medium">Failed to load products</p>
        <p className="text-muted-foreground text-sm mt-1">{message}</p>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-muted-foreground">No products available</p>
        <p className="text-sm text-muted-foreground mt-1">
          Check back later for new products
        </p>
      </CardContent>
    </Card>
  );
}

function NoResultsState({ search }: { search: string }) {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">
          No products match "{search}". Try a different search term.
        </p>
      </CardContent>
    </Card>
  );
}

interface ProductsPageProps {
  onAddToCart?: (product: Product) => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const { data: products, isLoading, error } = useProducts();
  const { filters, updateFilter, hasActiveFilters } = useProductFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      updateFilter("search", searchInput);
    }, 300);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchInput, updateFilter]);

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products.filter((product) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.category) {
        if (product.categoryId !== filters.category) return false;
      }

      if (filters.minPrice !== null && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (filters.sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filteredProducts, filters.sortBy]);

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <span className="text-muted-foreground">
          {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
          {hasActiveFilters && ` (filtered from ${products?.length || 0})`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {!Array.isArray(products) || products.length === 0 ? (
        <EmptyState />
      ) : sortedProducts.length === 0 ? (
        <NoResultsState search={filters.search} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
