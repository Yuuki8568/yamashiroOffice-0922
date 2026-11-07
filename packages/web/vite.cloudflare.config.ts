import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "node:path";
import assetOptimizerPlugin from "./vite/__plugins/asset-optimizer-plugin";

// Independent web build: no Runable plugins, server process, or credentials.
export default defineConfig({
  envDir: path.resolve(__dirname, "../.."),
  plugins: [react(), tailwind(), assetOptimizerPlugin()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src/web") },
  },
});
