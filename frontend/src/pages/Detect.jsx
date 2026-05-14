import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { History, Radar, Trash2 } from 'lucide-react'
import UploadBox from '../components/UploadBox.jsx'
import ResultCard from '../components/ResultCard.jsx'
import Loader from '../components/Loader.jsx'
import { SkeletonCard } from '../components/Skeleton.jsx'
import { predictDisease, getApiBase } from '../services/api.js'
import { prepareImageForModel } from '../services/imagePrep.js'

const HISTORY_KEY = 'leafguard_prediction_history_v1'

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistory(items) {
  const serializable = items.map(({ id, at, prediction, confidence }) => ({ id, at, prediction, confidence }))
  localStorage.setItem(HISTORY_KEY, JSON.stringify(serializable.slice(0, 12)))
}

export default function DetectPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [booting, setBooting] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState(loadHistory)

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 450)
    return () => clearTimeout(t)
  }, [])

  // Warm-up skeleton: mimic initial layout readiness
  if (booting) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }

  const onDetect = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const prepared = await prepareImageForModel(file)
      const data = await predictDisease(prepared)
      setResult(data)
      const entry = {
        id: `${Date.now()}`,
        at: new Date().toISOString(),
        prediction: data.prediction,
        confidence: data.confidence,
        thumb: URL.createObjectURL(file),
      }
      setHistory((h) => {
        const next = [entry, ...h]
        saveHistory(next)
        return next
      })
    } catch (e) {
      const status = e?.response?.status
      const isNetwork =
        e?.code === 'ERR_NETWORK' ||
        e?.message === 'Network Error' ||
        (typeof e?.message === 'string' && e.message.toLowerCase().includes('network'))
      const base = getApiBase()
      if (status === 403) {
        setError(
          `403 Forbidden from ${base}. If you are on Vercel (or another static host), the SPA rewrite was probably sending POST /api to /. Update to the latest vercel.json, set VITE_API_URL to your real API (https://…), or add a proxy rewrite for /api. For local preview, use npm run dev or ensure vite preview has the backend running and try again.`,
        )
      } else if (isNetwork) {
        setError(
          `Cannot reach the API (${base}). Start the backend from the backend folder (python app.py), keep it on port 5000, and in local dev either remove VITE_API_URL so requests use the Vite /api proxy, or set VITE_API_URL and add your exact dev origin to Flask FRONTEND_ORIGIN (localhost vs 127.0.0.1 must match).`,
        )
      } else {
        setError(e?.response?.data?.error || e.message || 'Prediction failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    history.forEach((h) => h.thumb && URL.revokeObjectURL(h.thumb))
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            AI console
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Disease detection
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Images are resized client-side to 224×224, then posted as multipart form data to{' '}
            <span className="font-mono text-xs text-emerald-700 dark:text-emerald-300">{getApiBase()}/predict</span>
            .
          </p>
        </div>
        <div className="glass inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
          <Radar className="h-4 w-4 text-emerald-500" />
          Production tip: keep leaf fill ~70% of frame for best calibration.
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <UploadBox file={file} onFile={setFile} disabled={loading} />
          <motion.button
            type="button"
            disabled={!file || loading}
            whileHover={{ scale: file && !loading ? 1.02 : 1 }}
            whileTap={{ scale: file && !loading ? 0.98 : 1 }}
            onClick={onDetect}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-slate-950 shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Running inference…' : 'Detect Disease'}
          </motion.button>
          {error && (
            <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-200">
              {error}
            </p>
          )}
        </motion.div>

        <div>
          {loading && <Loader />}
          {!loading && result && <ResultCard result={result} />}
          {!loading && !result && (
            <div className="glass flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl p-8 text-center">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Awaiting a leaf</p>
              <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">
                Upload an image to generate a structured readout with confidence, agronomic context, and treatment
                pathways.
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="mt-14">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Prediction history</h2>
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-2 text-xs font-semibold text-slate-700 backdrop-blur-md hover:border-red-300/50 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">No runs yet—your recent predictions will land here.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((h) => (
              <motion.div
                key={h.id}
                layout
                className="glass overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex gap-3 p-4">
                  {h.thumb ? (
                    <img src={h.thumb} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-500/25 to-cyan-500/15 ring-1 ring-white/20 dark:ring-white/10" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{h.prediction}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(h.at).toLocaleString()}</p>
                    <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      {h.confidence}% confidence
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
