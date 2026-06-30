import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Raise warning threshold — three.js + R3F is inherently large
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split heavy 3D/animation libs into their own chunks so the main
        // bundle loads faster and these are only fetched when actually needed
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['motion', 'framer-motion'],
          'vendor-ui': ['cobe', 'lenis'],
        },
      },
    },
  },
})
