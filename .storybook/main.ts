import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../apps/host/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    const sharedUiPath = resolve(__dirname, "../libs/shared/ui/src");
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          { find: "@ecommerce/shared/ui", replacement: sharedUiPath },
          { find: "@ecommerce/shared/ui/", replacement: sharedUiPath + "/" },
          { find: "@ecommerce/shared-ui", replacement: sharedUiPath },
          { find: "@ecommerce/shared-ui/", replacement: sharedUiPath + "/" },
          { find: "@ecommerce/shared", replacement: resolve(__dirname, "../libs/shared/src") },
        ],
      },
    };
  },
};

export default config;
