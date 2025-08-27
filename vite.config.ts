import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// Publica en https://franmillaauria.github.io/arcos-chat/
export default defineConfig({
  plugins: [react()],
  base: '/arcos-chat/',   // ← ruta base = nombre del repo
  build: { outDir: 'docs' }, // ← generaremos el build en /docs
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
