import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./styles.css";
import { ProductsPage } from "./pages/ProductsPage";
import { useProductFilters } from "./hooks/useProductFilters";

function ProductsQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { ProductsPage };
export { useProductFilters };

export function ProductsPageWithProvider() {
  return (
    <ProductsQueryProvider>
      <ProductsPage />
    </ProductsQueryProvider>
  );
}
