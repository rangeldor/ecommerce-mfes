import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = resolve(__dirname, "..", "..");

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  root: __dirname,
  cacheDir: resolve(__dirname, "node_modules/.vite"),
  server: {
    port: 3000,
    hmr: { overlay: false },
    fs: {
      allow: [workspaceRoot],
    },
  },
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      dts: false,
      name: "host",
      filename: "remoteEntry.js",
      exposes: {
        "./authStore": resolve(workspaceRoot, "apps/host/src/stores/authStore.ts"),
        "./Header": resolve(workspaceRoot, "apps/host/src/components/Header.tsx"),
        "./Layout": resolve(workspaceRoot, "apps/host/src/components/Layout.tsx"),
        "./Providers": resolve(workspaceRoot, "apps/host/src/components/Providers.tsx"),
      },
      remotes: isProduction
        ? {
            auth: resolve(workspaceRoot, "dist/apps/auth/remoteEntry.js"),
            products: resolve(workspaceRoot, "dist/apps/products/remoteEntry.js"),
            orders: resolve(workspaceRoot, "dist/apps/orders/remoteEntry.js"),
          }
        : {
            auth: {
              type: "module",
              name: "auth",
              entry: "http://localhost:3005/remoteEntry.js",
              entryGlobalName: "auth",
              shareScope: "default",
            },
            products: {
              type: "module",
              name: "products",
              entry: "http://localhost:3006/remoteEntry.js",
              entryGlobalName: "products",
              shareScope: "default",
            },
            orders: {
              type: "module",
              name: "orders",
              entry: "http://localhost:3007/remoteEntry.js",
              entryGlobalName: "orders",
              shareScope: "default",
            },
          },
      shared: {
        react: {
          requiredVersion: "^18.3.0",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: "^18.3.0",
          singleton: true,
        },
        "react/jsx-runtime": {
          requiredVersion: "^18.3.0",
          singleton: true,
        },
        zustand: {
          requiredVersion: "^5.0.0",
          singleton: true,
        },
        "@tanstack/react-query": {
          requiredVersion: "^5.60.0",
          singleton: true,
        },
        "react-hook-form": {
          requiredVersion: "^7.53.0",
          singleton: true,
        },
        "@hookform/resolvers": {
          requiredVersion: "^3.9.0",
          singleton: true,
        },
        axios: {
          requiredVersion: "^1.7.0",
          singleton: true,
        },
        zod: {
          requiredVersion: "^3.23.0",
          singleton: true,
        },
      },
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
