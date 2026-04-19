import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    // Bundle analyzer - run with ANALYZE=true npm run build
    ...(process.env.ANALYZE
      ? [
          visualizer({
            filename: "dist/stats.html",
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["lucide-react", "motion"],
          "utils-vendor": ["clsx", "tailwind-merge"],
        },
      },
    },
    // Enable compression
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Development server configuration
  server: {
    host: true,
    port: 5173,
  },
});
