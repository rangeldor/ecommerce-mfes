import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts, useProduct } from "./useProducts";

vi.mock("@ecommerce/shared/api/client", () => ({
  productsApi: {
    get: vi.fn(),
  },
}));

vi.mock("@ecommerce/shared/types", () => ({
  Product: {},
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return query result", () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toMatchObject({
      status: "pending",
      fetchStatus: "fetching",
    });
  });
});

describe("useProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not fetch when id is empty", () => {
    const { result } = renderHook(() => useProduct(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetchedAfterMount).toBe(false);
  });

  it("should have enabled false when id is empty", () => {
    const { result } = renderHook(() => useProduct(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
  });
});
