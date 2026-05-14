import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sent')
    e.target.reset()
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Contact
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Let’s talk field trials
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            LeafGuard AI is a reference product shell you can brand for extension programs, seed companies, or
            climate-smart agriculture pilots. Reach out for partnerships—or fork the repo and make it yours.
          </p>

          <div className="mt-8 space-y-3">
            <a
              className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 hover:border-emerald-300/50 dark:text-slate-100"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="inline-flex items-center gap-2">
                <Github className="h-5 w-5" /> GitHub repository
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Open source ready</span>
            </a>
            <a
              className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 hover:border-emerald-300/50 dark:text-slate-100"
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="inline-flex items-center gap-2">
                <Twitter className="h-5 w-5" /> Twitter / X
              </span>
            </a>
            <a
              className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 hover:border-emerald-300/50 dark:text-slate-100"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="inline-flex items-center gap-2">
                <Linkedin className="h-5 w-5" /> LinkedIn
              </span>
            </a>
            <a
              className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 hover:border-emerald-300/50 dark:text-slate-100"
              href="mailto:hello@leafguard.ai"
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="h-5 w-5" /> hello@leafguard.ai
              </span>
            </a>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong space-y-4 rounded-3xl p-6"
        >
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-2xl border border-white/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none backdrop-blur-md focus:ring-2 focus:ring-emerald-400/50 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
              placeholder="Ada Agronomist"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none backdrop-blur-md focus:ring-2 focus:ring-emerald-400/50 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
              placeholder="you@organization.org"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300" htmlFor="message">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-2xl border border-white/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none backdrop-blur-md focus:ring-2 focus:ring-emerald-400/50 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
              placeholder="Tell us about crops, geographies, and integration needs."
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-slate-950 shadow-glow"
          >
            <Send className="h-4 w-4" />
            Send message
          </motion.button>
          {status === 'sent' && (
            <p className="text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Thanks—your note is queued (demo form).
            </p>
          )}
        </motion.form>
      </div>
    </div>
  )
}
