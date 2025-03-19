import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,  // Cambia da 3000 a 4000
    https: false,
    strictPort: false, // Permetti a Vite di cercare un'altra porta se 4000 è occupata
  }
})
