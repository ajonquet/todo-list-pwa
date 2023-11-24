import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './src/manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
			entryFileNames: 'js/app.js'
			},
		},
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      manifest,
    }),
  ],
})
