import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className={`relative z-[101] m-4 w-full ${wide ? 'max-w-4xl' : 'max-w-2xl'} max-h-[85vh] overflow-hidden rounded-3xl border border-white/25 bg-white/80 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/20 px-6 py-4 dark:border-white/10">
              <div>
                <p className="font-display text-lg font-semibold">{title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/30 bg-white/50 p-2 text-slate-700 backdrop-blur-md hover:bg-white/70 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[calc(85vh-72px)] overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
