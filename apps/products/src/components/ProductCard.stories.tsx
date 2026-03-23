import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@ecommerce/shared/types";

const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: "prod-123e4567-e89b-12d3-a456-426614174000",
  name: "Wireless Bluetooth Headphones",
  description: "Premium noise-cancelling headphones with 30-hour battery life. Perfect for music lovers and professionals who need focus.",
  price: 149.99,
  stock: 25,
  categoryId: "cat-electronics",
  imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

const meta: Meta<typeof ProductCard> = {
  title: "Products/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    onAddToCart: { action: "add to cart clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: createMockProduct(),
  },
};

export const InStock: Story = {
  args: {
    product: createMockProduct({ stock: 50 }),
  },
};

export const LowStock: Story = {
  args: {
    product: createMockProduct({ stock: 3 }),
  },
  parameters: {
    docs: {
      description: {
        story: "Product with only 3 items remaining in stock",
      },
    },
  },
};

export const OutOfStock: Story = {
  args: {
    product: createMockProduct({ stock: 0 }),
  },
  parameters: {
    docs: {
      description: {
        story: "Product that is currently out of stock - Add to Cart button is disabled",
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    product: createMockProduct({ imageUrl: undefined }),
  },
  parameters: {
    docs: {
      description: {
        story: "Product without an image - shows placeholder",
      },
    },
  },
};

export const ExpensiveItem: Story = {
  args: {
    product: createMockProduct({
      name: "MacBook Pro 16-inch M3 Max",
      description: "The most powerful MacBook Pro ever with M3 Max chip, 36GB RAM, and 1TB SSD.",
      price: 3499.99,
      stock: 5,
    }),
  },
};

export const BudgetItem: Story = {
  args: {
    product: createMockProduct({
      name: "USB-C Hub",
      description: "7-in-1 USB-C hub with HDMI, USB-A, SD card reader, and more.",
      price: 29.99,
      stock: 100,
    }),
  },
};

export const WithCustomClassName: Story = {
  args: {
    product: createMockProduct(),
    className: "border-2 border-blue-500 shadow-lg",
  },
  parameters: {
    docs: {
      description: {
        story: "ProductCard with custom className for additional styling",
      },
    },
  },
};
