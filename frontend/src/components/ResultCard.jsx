import { motion } from 'framer-motion'
import { Activity, ShieldCheck, Stethoscope } from 'lucide-react'

export default function ResultCard({ result }) {
  if (!result) return null
  const healthy = String(result.prediction).toLowerCase().includes('healthy')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Model verdict
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">
            {result.prediction}
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.description}</p>
        </div>
        <div
          className={[
            'inline-flex min-w-[140px] flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center',
            healthy
              ? 'border-emerald-400/40 bg-emerald-500/10'
              : 'border-amber-400/40 bg-amber-500/10',
          ].join(' ')}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
            Confidence
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-slate-900 dark:text-white">
            {result.confidence}%
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/25 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Activity className="h-4 w-4 text-emerald-500" />
            Clinical read
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.description}</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Prevention
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.prevention}</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Stethoscope className="h-4 w-4 text-emerald-500" />
            Treatment
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.cure}</p>
        </div>
      </div>
    </motion.div>
  )
}
