declare module "auth/LoginPage" {
  import type { ComponentType } from "react";
  const LoginPage: ComponentType;
  export default LoginPage;
}

declare module "auth/RegisterPage" {
  import type { ComponentType } from "react";
  const RegisterPage: ComponentType;
  export default RegisterPage;
}

declare module "products/ProductsPage" {
  import type { ComponentType } from "react";
  interface ProductsPageProps {
    onAddToCart?: (product: unknown) => void;
  }
  const ProductsPage: ComponentType<ProductsPageProps>;
  export default ProductsPage;
}

declare module "products/ProductCard" {
  import type { ComponentType } from "react";
  interface ProductCardProps {
    product: unknown;
    onAddToCart?: (product: unknown) => void;
    className?: string;
  }
  const ProductCard: ComponentType<ProductCardProps>;
  export default ProductCard;
}

declare module "orders/OrdersPage" {
  import type { ComponentType } from "react";
  interface OrdersPageProps {
    onViewDetails?: (order: unknown) => void;
  }
  const OrdersPage: ComponentType<OrdersPageProps>;
  export default OrdersPage;
}

declare module "orders/OrderCard" {
  import type { ComponentType } from "react";
  interface OrderCardProps {
    order: unknown;
    onViewDetails?: (order: unknown) => void;
    className?: string;
  }
  const OrderCard: ComponentType<OrderCardProps>;
  export default OrderCard;
}


