import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Few-shot ready · MobileNetV2 backbone · TensorFlow serving
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Precision crop protection,{' '}
            <span className="text-gradient">powered by leaf-level AI</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            LeafGuard AI pairs transfer learning with a production inference stack so advisors can triage
            disease pressure in seconds—beautifully designed, obsessively fast, and field honest.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/detect"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
              >
                Detect Disease
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/library"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/50 px-6 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md hover:border-emerald-300/50 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
              >
                Explore Library
              </Link>
            </motion.div>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm"
          >
            <div className="glass rounded-2xl p-4">
              <dt className="text-slate-500 dark:text-slate-400">Latency</dt>
              <dd className="mt-1 font-semibold text-slate-900 dark:text-white">Sub-second</dd>
            </div>
            <div className="glass rounded-2xl p-4">
              <dt className="text-slate-500 dark:text-slate-400">Input</dt>
              <dd className="mt-1 font-semibold text-slate-900 dark:text-white">224² RGB</dd>
            </div>
            <div className="glass rounded-2xl p-4">
              <dt className="text-slate-500 dark:text-slate-400">Stack</dt>
              <dd className="mt-1 font-semibold text-slate-900 dark:text-white">TF · Flask</dd>
            </div>
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
