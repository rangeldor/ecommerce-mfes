import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { NuqsAdapter } from "nuqs/adapters/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useAuthStore.getState();

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
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NuqsAdapter>
  );
}
