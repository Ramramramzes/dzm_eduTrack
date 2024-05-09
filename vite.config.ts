import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const SERVER = 'http://localhost:3001'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': SERVER,
      '/check-profile': SERVER,
      '/default-data': SERVER,
      '/default-names': SERVER,
      '/send-profile': SERVER,
      '/send-adress': SERVER,
      '/get-hours': SERVER,
      '/get-programm-type': SERVER,
      '/get-main-spec': SERVER,
      '/get-dop-spec': SERVER,
      '/get-programm-adress': SERVER,
    }
  }
})
