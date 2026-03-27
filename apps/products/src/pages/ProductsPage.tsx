import { useState, useMemo, useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "@ecommerce/shared/types";

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="aspect-square bg-gray-200 animate-pulse mb-4" />
          <div className="h-5 bg-gray-200 animate-pulse w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 animate-pulse w-full mb-2" />
          <div className="h-4 bg-gray-200 animate-pulse w-2/3" />
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="border border-red-300 rounded-lg p-8 text-center bg-red-50">
      <p className="text-red-600 font-medium">Failed to load products</p>
      <p className="text-gray-500 text-sm mt-1">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-gray-200 rounded-lg p-8 text-center">
      <p className="text-gray-500">No products available</p>
      <p className="text-gray-400 text-sm mt-1">Check back later for new products</p>
    </div>
  );
}

function NoResultsState({ search }: { search: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-8 text-center">
      <p className="text-gray-500">No products found</p>
      <p className="text-gray-400 text-sm mt-1">No products match "{search}". Try a different search term.</p>
    </div>
  );
}

interface ProductsPageProps {
  onAddToCart?: (product: Product) => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products.filter((product) => {
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      return true;
    });
  }, [products, debouncedSearch]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filteredProducts, sortBy]);

  const hasActiveFilters = debouncedSearch !== "";

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
        <span className="text-gray-500">
          {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
          {hasActiveFilters && ` (filtered from ${products?.length || 0})`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 px-3 py-2 rounded-md border border-gray-300"
          />
        </div>
        <select
          className="h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm"
          aria-label="Sort products"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="name">Sort by Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {!Array.isArray(products) || products.length === 0 ? (
        <EmptyState />
      ) : sortedProducts.length === 0 ? (
        <NoResultsState search={debouncedSearch} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="aspect-square bg-gray-100 mb-4" />
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">${product.price}</span>
                <button
                  onClick={() => onAddToCart?.(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
