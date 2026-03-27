import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ProductsPage } from "./pages/ProductsPage";

export { ProductsPage };

function ProductsApp() {
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
    <QueryClientProvider client={queryClient}>
      <ProductsPage />
    </QueryClientProvider>
  );
}

export function ProductsPageWithNuqs() {
  return <ProductsApp />;
}

