import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: '/BeyondCanvas/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName: (name) => {
          return name
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9_.-]/g, '')
        },
      },
    },
  },
})
