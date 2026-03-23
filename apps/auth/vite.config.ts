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
    port: 3005,
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
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": resolve(workspaceRoot, "apps/auth/src/main.tsx"),
        "./LoginPage": resolve(workspaceRoot, "apps/auth/src/pages/LoginPage.tsx"),
        "./RegisterPage": resolve(workspaceRoot, "apps/auth/src/pages/RegisterPage.tsx"),
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
  },
});
