import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the same build works at the GitHub Pages project
  // subpath (https://rexegan.github.io/d1deepdive/) and at the root on Vercel.
  // Routing is hash-based, so no server rewrites are needed on either host.
  base: './',
  plugins: [react()],
  server: { host: true },
})
