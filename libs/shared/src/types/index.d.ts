export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}
export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
export declare enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: ShippingAddress;
    createdAt: string;
    updatedAt: string;
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface RegisterData {
    email: string;
    password: string;
    name: string;
}
export interface ApiError {
    message: string;
    statusCode?: number;
}
export type CreateOrderInput = {
    items: Omit<OrderItem, "subtotal">[];
    shippingAddress: ShippingAddress;
};
