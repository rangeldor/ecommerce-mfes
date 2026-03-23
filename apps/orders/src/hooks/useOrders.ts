import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@ecommerce/shared/api/client";
import type { Order, CreateOrderInput } from "@ecommerce/shared/types";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await ordersApi.get<Order[]>("/orders");
      return response.data;
    },
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const response = await ordersApi.get<Order>(`/orders/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      const response = await ordersApi.post<Order>("/orders", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
