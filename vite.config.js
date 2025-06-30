import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Indica dónde está tu index.html y resto de archivos de frontend
  // Cámbialo a "./frontend" si tus fuentes viven en esa carpeta
  root: './frontend',

  build: {
    // Carpeta de salida relativa al root anterior
    outDir: 'dist',
    // Limpia la carpeta de salida antes de cada build
    emptyOutDir: true,
  },

  server: {
    proxy: {
      // Tu proxy al backend Express
      '/api': 'http://localhost:4000'
    }
  },

  plugins: [react()]
})
