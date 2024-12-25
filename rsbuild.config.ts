import { defineConfig } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginLess(), pluginReact()],
  html: {
    title: "小黑屋Pro",
    favicon: "./src/assets/profile.png",
  },
});
