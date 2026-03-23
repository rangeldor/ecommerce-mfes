import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./styles.css";
import OrdersPage from "./pages/OrdersPage";

function OrdersQueryProvider({ children }: { children: React.ReactNode }) {
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

function OrdersPageWithProvider() {
  return (
    <OrdersQueryProvider>
      <OrdersPage />
    </OrdersQueryProvider>
  );
}

export { OrdersPage };
export { OrderCard } from "./components/OrderCard";
export { useOrders, useOrder, useCreateOrder } from "./hooks/useOrders";

export default OrdersPageWithProvider;
