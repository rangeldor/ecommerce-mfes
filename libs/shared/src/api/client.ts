import axios from "axios";

const API_BASE_URLS = {
  auth: import.meta.env.VITE_AUTH_API_URL || "http://127.0.0.1:3001",
  products: import.meta.env.VITE_PRODUCTS_API_URL || "http://127.0.0.1:3002",
  orders: import.meta.env.VITE_ORDERS_API_URL || "http://127.0.0.1:3003",
} as const;

export type ApiType = keyof typeof API_BASE_URLS;

export const authApi = axios.create({
  baseURL: API_BASE_URLS.auth,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productsApi = axios.create({
  baseURL: API_BASE_URLS.products,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ordersApi = axios.create({
  baseURL: API_BASE_URLS.orders,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClients = [authApi, productsApi, ordersApi];

export function setAuthToken(token: string | null): void {
  const authHeader = token ? `Bearer ${token}` : undefined;
  apiClients.forEach((client) => {
    if (token) {
      client.defaults.headers.common.Authorization = authHeader;
    } else {
      delete client.defaults.headers.common.Authorization;
    }
  });
  
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

function handleUnauthorized() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  setAuthToken(null);
  
  if (!window.location.pathname.startsWith("/auth")) {
    window.location.href = "/auth/login";
  }
}

async function refreshToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const response = await axios.post(
      `${API_BASE_URLS.auth}/auth/refresh`,
      { refreshToken }
    );
    return response.data.accessToken;
  } catch {
    return null;
  }
}

apiClients.forEach((client) => {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newToken = await refreshToken();
        
        if (newToken) {
          setAuthToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        } else {
          handleUnauthorized();
        }
      }

      return Promise.reject(error);
    }
  );
});
