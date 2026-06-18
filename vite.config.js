import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base configurado para GitHub Pages con repo: keni-afk/PadreMundialista2026
export default defineConfig({
  plugins: [react()],
  base: '/PadreMundialista2026/',
})
