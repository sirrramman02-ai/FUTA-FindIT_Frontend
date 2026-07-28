// Local development uses Vite's /api proxy. On Vercel, set VITE_API_URL to the
// public Render API URL including /api, e.g. https://campus-findit-api.onrender.com/api.
const configuredUrl = import.meta.env.VITE_API_URL?.trim()
export const API_URL = (configuredUrl || '/api').replace(/\/$/, '')
