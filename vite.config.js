import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ❌ Si tuvieras algo como root: 'frontend' bórralo o coméntalo
  // root: 'frontend',

  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
