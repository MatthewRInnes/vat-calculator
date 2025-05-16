/**
 * Vite configuration file
 * Configures the build tool and development server settings
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Enable React plugin for JSX support
  plugins: [react()],
  resolve: {
    // Configure path aliases for cleaner imports
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
