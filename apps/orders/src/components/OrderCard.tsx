import { Card, CardContent, CardHeader, Badge, Button, cn } from "@ecommerce/shared-ui";
import type { Order, OrderStatus } from "@ecommerce/shared";
import { OrderStatus as OrderStatusEnum } from "@ecommerce/shared";

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  [OrderStatusEnum.PENDING]: { label: "Pending", variant: "outline" },
  [OrderStatusEnum.CONFIRMED]: { label: "Confirmed", variant: "secondary" },
  [OrderStatusEnum.SHIPPED]: { label: "Shipped", variant: "default" },
  [OrderStatusEnum.DELIVERED]: { label: "Delivered", variant: "secondary" },
  [OrderStatusEnum.CANCELLED]: { label: "Cancelled", variant: "destructive" },
};

interface OrderCardProps {
  order: Order;
  onViewDetails?: (order: Order) => void;
  className?: string;
}

export function OrderCard({ order, onViewDetails, className }: OrderCardProps) {
  const status = statusConfig[order.status];
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-muted-foreground">
            #{order.id.slice(0, 8)}
          </span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {formattedDate}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="text-sm">
          <span className="text-muted-foreground">Items: </span>
          <span className="font-medium">{order.items.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-bold">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            {order.shippingAddress.street}, {order.shippingAddress.city}
          </p>
        </div>
      </CardContent>
      <div className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewDetails?.(order)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
