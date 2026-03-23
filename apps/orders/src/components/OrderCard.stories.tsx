import type { Meta, StoryObj } from "@storybook/react";
import { OrderCard } from "./OrderCard";
import type { Order, OrderStatus, OrderItem, ShippingAddress } from "@ecommerce/shared/types";
import { OrderStatus as OrderStatusEnum } from "@ecommerce/shared/types";

const mockAddress: ShippingAddress = {
  street: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "USA",
};

const createMockOrder = (status: OrderStatus, totalAmount: number): Order => ({
  id: "order-123e4567-e89b-12d3-a456-426614174000",
  userId: "user-123",
  items: [
    {
      productId: "prod-1",
      productName: "Wireless Headphones",
      quantity: 1,
      unitPrice: 79.99,
      subtotal: 79.99,
    },
    {
      productId: "prod-2",
      productName: "USB-C Cable",
      quantity: 2,
      unitPrice: 9.99,
      subtotal: 19.98,
    },
  ] as OrderItem[],
  status,
  totalAmount,
  shippingAddress: mockAddress,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const meta: Meta<typeof OrderCard> = {
  title: "Orders/OrderCard",
  component: OrderCard,
  tags: ["autodocs"],
  argTypes: {
    onViewDetails: { action: "view details clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof OrderCard>;

export const Default: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.PENDING, 99.97),
  },
};

export const Pending: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.PENDING, 99.97),
  },
  parameters: {
    docs: {
      description: {
        story: "Order in pending state awaiting confirmation",
      },
    },
  },
};

export const Confirmed: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.CONFIRMED, 249.99),
  },
};

export const Shipped: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.SHIPPED, 149.99),
  },
};

export const Delivered: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.DELIVERED, 399.99),
  },
};

export const Cancelled: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.CANCELLED, 59.99),
  },
};

export const WithCustomClassName: Story = {
  args: {
    order: createMockOrder(OrderStatusEnum.PENDING, 99.97),
    className: "border-2 border-blue-500",
  },
  parameters: {
    docs: {
      description: {
        story: "OrderCard with custom className for styling",
      },
    },
  },
};
