import { motion } from 'framer-motion'

/**
 * Soft floating orbs + subtle grid for depth without hurting readability.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
      <div className="absolute inset-0 bg-grid-slate bg-[length:36px_36px] dark:bg-grid-dark opacity-40 dark:opacity-30" />

      <motion.div
        aria-hidden
        className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-500/15"
        animate={{ y: [0, 30, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10"
        animate={{ y: [0, -24, 0], x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Lightweight “particles” */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="absolute h-1 w-1 rounded-full bg-emerald-400/50 dark:bg-emerald-300/40"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{ opacity: [0.15, 0.8, 0.15], y: [0, -18, 0] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}
