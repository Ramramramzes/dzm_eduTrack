import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const SERVER = 'http://localhost:3001'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': SERVER,
    }
  }
})
