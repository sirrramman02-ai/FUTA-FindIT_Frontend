import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// This is a frontend-only project. The deployed API address is supplied by
// VITE_API_URL when Vercel builds the app.
export default defineConfig({ plugins: [react()], server: { port: 5173 } })
