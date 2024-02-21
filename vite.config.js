import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
      { find: "@store", replacement: path.resolve(__dirname, "./src/store") },
      // { find: "@hooks", replacement: path.resolve(__dirname, "./src/hooks") },
      // {
      //   find: "@components",
      //   replacement: path.resolve(__dirname, "./src/components"),
      // },
    ],
  },
});
