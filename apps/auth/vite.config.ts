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
        "./AuthApp": resolve(workspaceRoot, "apps/auth/src/bootstrap.tsx"),
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
