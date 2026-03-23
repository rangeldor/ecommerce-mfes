import { useOrders } from "../hooks/useOrders";
import { OrderCard } from "../components/OrderCard";
import { Card, CardContent } from "@ecommerce/shared-ui";
import { Skeleton } from "@ecommerce/shared-ui";
import type { Order } from "@ecommerce/shared/types";

function OrdersSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col h-full">
          <CardContent className="flex-1 pt-4 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-3 w-full pt-2 border-t" />
          </CardContent>
          <div className="p-4 pt-0">
            <Skeleton className="h-9 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-destructive font-medium">Failed to load orders</p>
        <p className="text-muted-foreground text-sm mt-1">{message}</p>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-muted-foreground">No orders yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Start shopping to see your orders here
        </p>
      </CardContent>
    </Card>
  );
}

interface OrdersPageProps {
  onViewDetails?: (order: Order) => void;
}

export default function OrdersPage({ onViewDetails }: OrdersPageProps) {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  if (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <span className="text-muted-foreground">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
