import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          pdf: ['pdfjs-dist'],
          ocr: ['tesseract.js'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['sql.js'],
  },
  worker: {
    format: 'es',
  },
})
