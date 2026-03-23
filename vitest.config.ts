import { defineConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { defineConfig as viteDefineConfig } from "vite";
import { resolve } from "path";

export default mergeConfig(
  viteDefineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@ecommerce/shared": resolve(__dirname, "./libs/shared/src"),
        "@ecommerce/shared-ui": resolve(__dirname, "./libs/shared/ui/src"),
        "@ecommerce/shared/ui": resolve(__dirname, "./libs/shared/ui/src"),
        "host": resolve(__dirname, "./apps/host/src"),
      },
    },
  }),
  defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "libs/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "apps/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    exclude: [
      "apps/auth/src/hooks/useLogin.test.tsx",
      "apps/auth/src/hooks/useRegister.test.tsx",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  }),
);
