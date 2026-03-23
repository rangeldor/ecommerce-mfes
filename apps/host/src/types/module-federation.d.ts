declare module "auth/LoginPage" {
  import type { ComponentType } from "react";
  export function LoginPage(): JSX.Element;
}

declare module "auth/RegisterPage" {
  import type { ComponentType } from "react";
  export function RegisterPage(): JSX.Element;
}

declare module "products/ProductsPageWithProvider" {
  import type { ComponentType } from "react";
  export function ProductsPageWithProvider(): JSX.Element;
}

declare module "products/ProductsPage" {
  import type { ComponentType } from "react";
  interface ProductsPageProps {
    onAddToCart?: (product: unknown) => void;
  }
  export function ProductsPage(props: ProductsPageProps): JSX.Element;
}

declare module "products/ProductCard" {
  import type { ComponentType } from "react";
  interface ProductCardProps {
    product: unknown;
    onAddToCart?: (product: unknown) => void;
    className?: string;
  }
  export function ProductCard(props: ProductCardProps): JSX.Element;
}

declare module "products/useProductFilters" {
  export interface ProductFilters {
    search: string;
    category: string;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
  }
  export function useProductFilters(): {
    filters: ProductFilters;
    updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
    resetFilters: () => void;
    hasActiveFilters: boolean;
  };
}

declare module "orders/OrdersPageWithProvider" {
  import type { ComponentType } from "react";
  export function OrdersPageWithProvider(): JSX.Element;
}

declare module "orders/OrdersPage" {
  import type { ComponentType } from "react";
  interface OrdersPageProps {
    onViewDetails?: (order: unknown) => void;
  }
  export function OrdersPage(props: OrdersPageProps): JSX.Element;
}

declare module "orders/OrderCard" {
  import type { ComponentType } from "react";
  interface OrderCardProps {
    order: unknown;
    onViewDetails?: (order: unknown) => void;
    className?: string;
  }
  export function OrderCard(props: OrderCardProps): JSX.Element;
}
