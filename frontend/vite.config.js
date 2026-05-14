import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_DEV_API_PROXY || 'http://127.0.0.1:5000'

  const apiProxy = {
    '/api': {
      target: proxyTarget,
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      // Same-origin /api → Flask: avoids browser CORS when dev server is localhost vs 127.0.0.1
      proxy: apiProxy,
    },
    // `vite preview` does NOT inherit `server.proxy` unless mirrored here — avoids POST /api → 403/404.
    preview: {
      port: 4173,
      proxy: apiProxy,
    },
  }
})
