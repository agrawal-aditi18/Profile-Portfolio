import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' uses relative asset paths so the same build works on
// Vercel (root) AND GitHub Pages project sites (/<repo>/) with no changes.
export default defineConfig({
  plugins: [react()],
  base: './',
})
