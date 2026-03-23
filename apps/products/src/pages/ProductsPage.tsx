import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { Card, CardContent } from "@ecommerce/shared-ui";
import { Skeleton } from "@ecommerce/shared-ui";
import type { Product } from "@ecommerce/shared/types";

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="flex flex-col h-full">
          <div className="aspect-square bg-muted animate-pulse" />
          <CardContent className="flex-1 pt-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
          <div className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
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
        <p className="text-destructive font-medium">Failed to load products</p>
        <p className="text-muted-foreground text-sm mt-1">{message}</p>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-muted-foreground">No products available</p>
        <p className="text-sm text-muted-foreground mt-1">
          Check back later for new products
        </p>
      </CardContent>
    </Card>
  );
}

interface ProductsPageProps {
  onAddToCart?: (product: Product) => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <span className="text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
