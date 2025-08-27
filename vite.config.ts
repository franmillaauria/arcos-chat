import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Publica en https://franmillaauria.github.io/arcos-chat/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    react()
  ],
  base: '/arcos-chat/',   // ← ruta base = nombre del repo
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: { outDir: 'docs' } // ← generaremos el build en /docs
})
