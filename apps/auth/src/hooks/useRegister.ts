import { useMutation } from "@tanstack/react-query";
import { authApi } from "@ecommerce/shared/api/client";
import { useAuthStore } from "host/authStore";
import type { AuthResponse } from "@ecommerce/shared/types";
import type { RegisterFormData } from "../schemas/registerSchema";

export function useRegister() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      await authApi.post<AuthResponse>("/users", data);
      const loginResponse = await authApi.post<AuthResponse>("/auth/login", {
        email: data.email,
        password: data.password,
      });
      return loginResponse.data;
    },
    onSuccess: (data) => {
      login(data);
      window.location.href = "/";
    },
  });
}
