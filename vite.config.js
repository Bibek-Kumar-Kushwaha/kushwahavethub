import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from the local network
    port: 5173, // Optional: Default port is 5173
    strictPort: true, // Ensures the specified port is used
  },
})
