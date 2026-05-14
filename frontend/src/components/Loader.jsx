import { motion } from 'framer-motion'

export default function Loader({ label = 'Analyzing leaf tissue…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="relative h-16 w-16">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-t-transparent border-emerald-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400/10 blur-md"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  )
}
