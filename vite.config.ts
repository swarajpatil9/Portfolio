import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/ogl/")) return "vendor-ogl";
          if (id.includes("/react-router") || id.includes("/@remix-run"))
            return "vendor-router";
          // Split react-dom (large) from react (small) so react-dom can be
          // preloaded in parallel with the app entry chunk.
          if (id.includes("/react-dom/")) return "vendor-react-dom";
          if (id.includes("/react/") || id.includes("/scheduler/"))
            return "vendor-react";
          if (id.includes("/zustand/")) return "vendor-zustand";
          return "vendor-misc";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
