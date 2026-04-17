import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { qrcode } from 'vite-plugin-qrcode'

export default defineConfig(({ mode }) => ({
  plugins: [vue(), vueDevTools(), qrcode()],

  // Use correct base for dev vs production
  base: mode === 'production' ? '/BeyondCanvas/' : '/',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
