import { defineConfig } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginLess(), pluginReact()],
  html: {
    title: "小黑屋",
    favicon: "./src/assets/profile.png",
  },
  server: {
    proxy: {
      "/api/mihoyo": {
        target: "https://public-operation-hk4e.mihoyo.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api/mihoyo": "https://public-operation-hk4e.mihoyo.com",
        },
      },
      // "/api/deltaForce": {
      //   target: "https://www.test.net",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api/deltaForce": "",
      //   },
      // },
    },
  },
});
