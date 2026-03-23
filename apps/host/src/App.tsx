import { lazy, Suspense, type ComponentType } from "react";
import { Providers } from "./components/Providers";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Skeleton } from "@ecommerce/shared-ui";
import { useAuthStore } from "./stores/authStore";

const LoginMFE = lazy(() => import("auth/LoginPage").then(m => ({ default: m.LoginPage as unknown as ComponentType })));
const RegisterMFE = lazy(() => import("auth/RegisterPage").then(m => ({ default: m.RegisterPage as unknown as ComponentType })));
const ProductsMFE = lazy(() => import("products/ProductsPageWithProvider").then(m => ({ default: m.ProductsPageWithProvider as unknown as ComponentType })));
const OrdersMFE = lazy(() => import("orders/OrdersPageWithProvider").then(m => ({ default: m.OrdersPageWithProvider as unknown as ComponentType })));

function LoadingFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Discover our amazing products and shop with ease.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/products"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
        >
          Browse Products
        </a>
        {!isAuthenticated && (
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
          >
            Sign In
          </a>
        )}
      </div>
    </div>
  );
}

function App() {
  const path = window.location.pathname;

  const renderContent = () => {
    if (path.startsWith("/auth")) {
      const AuthComponent = path.includes("/register") ? RegisterMFE : LoginMFE;
      return (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <AuthComponent />
          </Suspense>
        </ErrorBoundary>
      );
    }
    if (path.startsWith("/products")) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <ProductsMFE />
          </Suspense>
        </ErrorBoundary>
      );
    }
    if (path.startsWith("/orders")) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <OrdersMFE />
          </Suspense>
        </ErrorBoundary>
      );
    }
    return <HomePage />;
  };

  return (
    <Providers>
      <Layout>{renderContent()}</Layout>
    </Providers>
  );
}

export default App;
