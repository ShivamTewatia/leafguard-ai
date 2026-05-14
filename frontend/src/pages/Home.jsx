import { motion } from 'framer-motion'
import {
  Brain,
  Camera,
  Leaf,
  LineChart,
  Quote,
  Shield,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection.jsx'

const features = [
  {
    title: 'On-device friendly pipeline',
    body: '224×224 RGB normalization mirrors research training while staying CDN-fast in production.',
    icon: Camera,
  },
  {
    title: 'Advisor-grade outputs',
    body: 'Structured prevention and treatment narratives—not just a label—so teams can act quickly.',
    icon: Shield,
  },
  {
    title: 'Built for iteration',
    body: 'Swap weights, keep UX. Few-shot workflows mean rapid class extension without re-skinning the product.',
    icon: Brain,
  },
]

const workflow = [
  { title: 'Capture', body: 'Phone or DSLR—consistent framing beats megapixels.' },
  { title: 'Preprocess', body: 'Resize, normalize, batch—handled in Flask + TF for repeatability.' },
  { title: 'Infer', body: 'Softmax confidence with human-readable copy from metadata store.' },
  { title: 'Act', body: 'Export history, compare visits, escalate to experts when needed.' },
]

const stats = [
  { label: 'Countries in beta', value: '12+' },
  { label: 'Crops covered', value: '4 core' },
  { label: 'Avg. console time', value: '< 30s' },
  { label: 'Model format', value: 'Keras .h5' },
]

const testimonials = [
  {
    quote:
      'LeafGuard turned our scouting notes into a single pane of glass. The UI feels closer to a Series A SaaS than a lab experiment.',
    name: 'Dr. Amara K.',
    role: 'Agronomy Lead, Greenbelt Cooperative',
  },
  {
    quote:
      'We pipe imagery from extension workshops straight into the API—confidence scores help prioritize field visits.',
    name: 'Leo M.',
    role: 'Crop Advisor, Midwest USA',
  },
]

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Why teams switch
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            A premium console for an unglamorous problem
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Agronomy deserves the same interaction design quality as fintech. LeafGuard is built to earn trust in
            the field—not just in a demo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: idx * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <f.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">{f.title}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-strong grid gap-10 rounded-3xl p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
              <Workflow className="h-4 w-4" />
              AI workflow
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">
              From leaf to decision, intentionally linear
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Each step is observable: uploads become tensors, tensors become probabilities, probabilities become
              agronomic guidance. No black-box mysticism—just a pipeline you can explain to growers.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
              <Link
                to="/about"
                className="inline-flex rounded-full border border-white/30 bg-white/50 px-5 py-2 text-sm font-semibold text-slate-900 backdrop-blur-md hover:border-emerald-300/60 dark:border-white/10 dark:bg-slate-950/40 dark:text-white"
              >
                Read the science
              </Link>
            </motion.div>
          </div>
          <div className="grid gap-4">
            {workflow.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 rounded-2xl border border-white/25 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-950/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-slate-950">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{w.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{w.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-white/20 bg-gradient-to-br from-emerald-500/15 via-white/40 to-cyan-500/10 p-8 backdrop-blur-xl dark:border-white/10 dark:from-emerald-500/10 dark:via-slate-950/40 dark:to-cyan-500/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{s.value}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Testimonials
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">
              Trusted where the work is messy
            </h3>
          </div>
          <LineChart className="hidden h-10 w-10 text-emerald-500/60 sm:block" />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <Quote className="h-8 w-8 text-emerald-500/70" />
              <blockquote className="mt-4 text-sm text-slate-700 dark:text-slate-200">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-slate-900 dark:text-white">{t.name}</span>
                <span className="text-slate-500 dark:text-slate-400"> · {t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                Ready when your fields are
              </p>
              <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Spin up the Flask service on Render, point Vercel at your API, and you are shipping a credible AI
                product in an afternoon.
              </p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/detect"
              className="inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
            >
              Detect Disease
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
