import axios from "axios";
export declare const authApi: ReturnType<typeof axios.create>;
export declare const productsApi: ReturnType<typeof axios.create>;
export declare const ordersApi: ReturnType<typeof axios.create>;
export declare function setAuthToken(token: string | null): void;
export {};
