import axios, { type AxiosInstance } from "axios";

const API_BASE_URLS = {
  auth: import.meta.env.VITE_AUTH_API_URL || "http://127.0.0.1:3001",
  products: import.meta.env.VITE_PRODUCTS_API_URL || "http://127.0.0.1:3002",
  orders: import.meta.env.VITE_ORDERS_API_URL || "http://127.0.0.1:3003",
} as const;

export type ApiType = keyof typeof API_BASE_URLS;

function createApiClient(type: ApiType): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URLS[type],
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const response = await axios.post(
              `${API_BASE_URLS.auth}/auth/refresh`,
              { refreshToken }
            );
            const { accessToken } = response.data;
            localStorage.setItem("token", accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}

export const authApi = createApiClient("auth");
export const productsApi = createApiClient("products");
export const ordersApi = createApiClient("orders");

export function setAuthToken(token: string | null): void {
  if (token) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    productsApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    ordersApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common.Authorization;
    delete productsApi.defaults.headers.common.Authorization;
    delete ordersApi.defaults.headers.common.Authorization;
  }
}
