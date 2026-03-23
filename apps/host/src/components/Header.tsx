import { useAuthStore } from "../stores/authStore";
import { Button } from "@ecommerce/shared-ui";
import { LogOut, ShoppingBag, Package } from "lucide-react";

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">E-Commerce</span>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/products"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Package className="h-4 w-4" />
                Products
              </a>
              <a
                href="/orders"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Orders
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="default">
                <a href="/auth/login">Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
