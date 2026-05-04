import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './', // Esto le dice: "busca el index.html aquí mismo"
  server: {
    port: 5173,
    open: true
  }
})