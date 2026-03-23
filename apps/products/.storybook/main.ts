import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@ecommerce/shared": resolve(__dirname, "../../../libs/shared/src"),
          "@ecommerce/shared-ui": resolve(__dirname, "../../../libs/shared/ui/src"),
        },
      },
    });
  },
};

export default config;
