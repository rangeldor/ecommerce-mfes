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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
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
          setAuthToken(state.token);
        }
        state && (state.isLoading = false);
      },
    }
  )
);
