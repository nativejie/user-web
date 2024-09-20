import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  optimizeDeps: {
    include: ["v-charts", "echarts"],
  },
  plugins: [vue()],
});
