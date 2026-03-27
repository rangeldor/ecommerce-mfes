declare module "products/ProductsPage" {
  export const ProductsPage: React.ComponentType<{ onAddToCart?: (product: any) => void }>;
}

declare module "products/ProductsPageWithNuqs" {
  export const ProductsPageWithNuqs: React.ComponentType;
}

declare module "products/ProductCard" {
  export const ProductCard: React.ComponentType<any>;
}

declare module "products/useProductFilters" {
  export const useProductFilters: () => any;
}

declare module "auth/LoginPage" {
  export const LoginPage: React.ComponentType;
}

declare module "auth/RegisterPage" {
  export const RegisterPage: React.ComponentType;
}

declare module "auth/AuthApp" {
  export const AuthApp: React.ComponentType;
}

declare module "orders/OrdersPage" {
  export const OrdersPage: React.ComponentType;
}

declare module "orders/OrdersPageWithProvider" {
  export const OrdersPageWithProvider: React.ComponentType;
}

declare module "host/Providers" {
  export const Providers: React.ComponentType<{ children: React.ReactNode }>;
}

declare module "host/Header" {
  export const Header: React.ComponentType;
}

declare module "host/Layout" {
  export const Layout: React.ComponentType<{ children: React.ReactNode }>;
}

declare module "host/authStore" {
  export const useAuthStore: any;
}
