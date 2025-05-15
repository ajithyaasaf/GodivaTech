import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import themeJson from "@replit/vite-plugin-shadcn-theme-json";
import { cartographer } from "@replit/vite-plugin-cartographer";
import runtimeErrorPlugin from "@replit/vite-plugin-runtime-error-modal";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    themeJson(), // This will automatically use the theme.json in the root directory
    cartographer(),
    runtimeErrorPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-slot'
          ],
          'animations': ['framer-motion', 'gsap'],
          'form': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'utils': ['clsx', 'tailwind-merge', 'date-fns']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
});