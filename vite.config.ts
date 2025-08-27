import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: el nombre del repo, con barra inicial y final
  base: '/arcos-chat/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // (opcional; por defecto ya es 'dist')
  build: {
    outDir: 'dist',
  },
})
