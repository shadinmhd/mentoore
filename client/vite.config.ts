import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	server : {
		https : {
			key : "./localhost+1-key.pem",
			cert : "./localhost+1.pem",
		}
	},
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  
})
