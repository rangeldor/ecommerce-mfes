import { useMutation } from "@tanstack/react-query";
import { authApi } from "@ecommerce/shared/api/client";
import { useAuthStore } from "host/authStore";
import type { AuthResponse } from "@ecommerce/shared/types";
import type { LoginFormData } from "../schemas/loginSchema";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await authApi.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
      window.location.href = "/";
    },
  });
}
