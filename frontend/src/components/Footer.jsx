import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">LeafGuard AI</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
              Few-shot friendly plant pathology screening with transfer-learned features—built for growers,
              advisors, and research teams.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link className="hover:text-emerald-600 dark:hover:text-emerald-300" to="/detect">
                  Detection console
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-600 dark:hover:text-emerald-300" to="/library">
                  Plant library
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-600 dark:hover:text-emerald-300" to="/about">
                  Science & accuracy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Connect</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-2 text-sm text-slate-700 backdrop-blur-md hover:border-emerald-300/50 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-2 text-sm text-slate-700 backdrop-blur-md hover:border-emerald-300/50 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-4 w-4" /> Twitter
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-2 text-sm text-slate-700 backdrop-blur-md hover:border-emerald-300/50 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-2 text-sm text-slate-700 backdrop-blur-md hover:border-emerald-300/50 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
                href="mailto:hello@leafguard.ai"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-8 text-xs text-slate-500 dark:border-white/10 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LeafGuard AI. All rights reserved.</p>
          <p className="max-w-xl">
            Disclaimer: predictions are decision-support only—confirm with qualified agronomists and local
            regulations before chemical applications.
          </p>
        </div>
      </div>
    </footer>
  )
}
