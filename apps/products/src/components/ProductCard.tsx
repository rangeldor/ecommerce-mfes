import { Card, CardContent, CardFooter, CardHeader, Badge, Button, cn } from "@ecommerce/shared-ui";
import type { Product } from "@ecommerce/shared/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <div className="aspect-square bg-muted relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image
          </div>
        )}
        {isOutOfStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            Stock: {product.stock}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={isOutOfStock}
          onClick={() => onAddToCart?.(product)}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
