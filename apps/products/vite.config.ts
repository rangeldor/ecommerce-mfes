import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = resolve(__dirname, "..", "..");

export default defineConfig({
  root: __dirname,
  cacheDir: resolve(__dirname, "node_modules/.vite"),
  server: {
    port: 3006,
    fs: {
      allow: [workspaceRoot],
    },
  },
  build: {
    target: "esnext",
    modulePreload: {
      polyfill: true,
    },
  },
  plugins: [
    federation({
      dts: false,
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": resolve(workspaceRoot, "apps/products/src/main.tsx"),
        "./ProductsPage": resolve(workspaceRoot, "apps/products/src/pages/ProductsPage.tsx"),
        "./ProductsPageWithNuqs": resolve(workspaceRoot, "apps/products/src/bootstrap.tsx"),
        "./ProductCard": resolve(workspaceRoot, "apps/products/src/components/ProductCard.tsx"),
      },
      remotes: {
        host: {
          type: "module",
          name: "host",
          entry: "http://localhost:3000/remoteEntry.js",
          entryGlobalName: "host",
          shareScope: "default",
        },
      },
      shared: ["react", "react-dom"],
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@ecommerce/shared": resolve(workspaceRoot, "libs/shared/src"),
      "@ecommerce/shared-ui": resolve(workspaceRoot, "libs/shared/ui/src"),
    },
    dedupe: ["react", "react-dom"],
  },
});
