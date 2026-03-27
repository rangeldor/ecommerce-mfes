import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, AuthResponse } from "@ecommerce/shared/types";
import { setAuthToken } from "@ecommerce/shared/api/client";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (response: AuthResponse) => void;
  logout: () => void;
  updateToken: (token: string, refreshToken?: string) => void;
  setLoading: (loading: boolean) => void;
  checkTokenExpiration: () => boolean;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 < Date.now() : false;
  } catch {
    return true;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      login: (response: AuthResponse) => {
        setAuthToken(response.accessToken);
        set({
          user: response.user,
          token: response.accessToken,
          refreshToken: response.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        setAuthToken(null);
        localStorage.removeItem("ecommerce-auth-storage");
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
        window.location.href = "/auth/login";
      },

      updateToken: (token: string, refreshToken?: string) => {
        setAuthToken(token);
        set((state) => ({
          token,
          refreshToken: refreshToken ?? state.refreshToken,
        }));
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      checkTokenExpiration: () => {
        const { token } = get();
        if (!token) return true;
        if (isTokenExpired(token)) {
          get().logout();
          return true;
        }
        return false;
      },
    }),
    {
      name: "ecommerce-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          if (isTokenExpired(state.token)) {
            setAuthToken(null);
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("ecommerce-auth-storage");
            window.location.href = "/auth/login";
          } else {
            setAuthToken(state.token);
          }
        }
        state && (state.isLoading = false);
      },
    }
  )
);
