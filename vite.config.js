import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // no definir root aquí → Vite usará la carpeta actual (donde está vite.config.js)
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
