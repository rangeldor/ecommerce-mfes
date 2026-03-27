import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export { LoginPage };
export { RegisterPage };

function AuthApp() {
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

  const isRegister = window.location.pathname.includes("/register");

  return (
    <QueryClientProvider client={queryClient}>
      {isRegister ? <RegisterPage /> : <LoginPage />}
    </QueryClientProvider>
  );
}

export { AuthApp };
