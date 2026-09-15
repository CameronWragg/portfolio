import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// GitHub Pages serves project sites from /<repo>/, so the base path has to match.
// The deploy workflow sets BASE_PATH; local dev and custom domains use "/".
// actions/configure-pages emits it without a trailing slash ("/portfolio"), and
// Vite uses it verbatim, so BASE_URL + "images/x.jpeg" would become
// "/portfolioimages/x.jpeg". Normalise it here.
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/')

export default defineConfig({
  base,
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
  },
})
