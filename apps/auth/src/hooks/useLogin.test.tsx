import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "./useLogin";

vi.mock("@ecommerce/shared/api/client", () => ({
  authApi: {
    post: vi.fn(),
  },
}));

vi.mock("host/authStore", () => ({
  useAuthStore: () => ({
    login: vi.fn(),
  }),
}));

vi.mock("@ecommerce/shared/types", () => ({
  AuthResponse: {},
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return mutation object", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toMatchObject({
      mutate: expect.any(Function),
      mutateAsync: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it("should have initial status as idle", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current.status).toBe("idle");
  });
});
