import axios from 'axios'

/**
 * - Production / custom: set VITE_API_URL (e.g. https://your-api.onrender.com)
 * - Local dev: leave VITE_API_URL unset to use Vite proxy `/api` → Flask (no CORS issues)
 * - Direct local: VITE_API_URL=http://127.0.0.1:5000 (ensure Flask FRONTEND_ORIGIN matches your dev URL)
 */
function resolveBaseURL() {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw === 'string' && raw.trim()) {
    const trimmed = raw.trim().replace(/\/$/, '')
    // Relative /api on a static host (e.g. Vercel) hits SPA rewrites or 404/403 unless you add an edge proxy.
    if (trimmed === '/api' && import.meta.env.PROD) {
      console.warn(
        '[LeafGuard] VITE_API_URL="/api" in production is only valid if your host proxies /api to Flask. Prefer a full https://… API URL.',
      )
    }
    return trimmed
  }
  // Dev server: Vite `server.proxy` handles /api.
  if (import.meta.env.DEV) return '/api'
  // `vite preview` is a production build (DEV=false) but still uses `preview.proxy` on loopback.
  if (typeof window !== 'undefined') {
    const h = window.location.hostname
    if (h === 'localhost' || h === '127.0.0.1') return '/api'
  }
  return 'http://127.0.0.1:5000'
}

const baseURL = resolveBaseURL()

export const api = axios.create({
  baseURL,
  timeout: 120_000,
})

/**
 * POST /predict with multipart field `image`.
 * Do not set Content-Type manually — the browser must add the multipart boundary.
 */
export async function predictDisease(file) {
  const formData = new FormData()
  formData.append('image', file)

  const { data } = await api.post('/predict', formData)

  return data
}

export function getApiBase() {
  return baseURL === '/api' ? `${window.location.origin}/api → Flask` : baseURL
}
