import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "lucide-react": resolve(
        __dirname,
        "node_modules/lucide-react/dist/cjs/lucide-react.js"
      ),
    },
  },
});
