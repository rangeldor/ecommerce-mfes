declare module "host/authStore" {
  import type { StoreApi, UseBoundStore } from "zustand";
  
  interface AuthState {
    user: unknown | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (response: unknown) => void;
    logout: () => void;
    updateToken: (token: string, refreshToken?: string) => void;
    setLoading: (loading: boolean) => void;
  }
  
  type UseAuthStore = UseBoundStore<StoreApi<AuthState>>;
  export const useAuthStore: UseAuthStore;
}
