import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "../backend/client/node_modules/@tailwindcss/vite/dist/index.d.mts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
