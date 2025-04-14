import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    tailwindcss(),
    react()]
})
