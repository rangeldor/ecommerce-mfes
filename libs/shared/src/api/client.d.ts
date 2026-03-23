import { type AxiosInstance } from "axios";
declare const API_BASE_URLS: {
    readonly auth: any;
    readonly products: any;
    readonly orders: any;
};
export type ApiType = keyof typeof API_BASE_URLS;
export declare const authApi: AxiosInstance;
export declare const productsApi: AxiosInstance;
export declare const ordersApi: AxiosInstance;
export declare function setAuthToken(token: string | null): void;
export {};
