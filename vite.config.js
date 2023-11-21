import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/github-actions",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.js",
  },
});