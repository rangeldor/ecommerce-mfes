import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@ecommerce/shared";
import type { Product } from "@ecommerce/shared";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsApi.get<Product[]>("/products");
      return response.data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await productsApi.get<Product>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}
