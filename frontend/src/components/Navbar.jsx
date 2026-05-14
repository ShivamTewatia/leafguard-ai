import { Link, NavLink } from 'react-router-dom'
import { Leaf, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/detect', label: 'Detect' },
  { to: '/library', label: 'Library' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/55 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 0.6 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-glow-sm"
          >
            <Leaf className="h-5 w-5" />
          </motion.div>
          <div className="leading-tight">
            <p className="font-display text-base font-semibold tracking-tight">LeafGuard AI</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Plant intelligence, field-ready</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden md:block">
            <Link
              to="/detect"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow-sm"
            >
              Launch Console
            </Link>
          </motion.div>

          <button
            type="button"
            className="inline-flex rounded-2xl border border-white/30 bg-white/50 p-2 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/15 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      'block rounded-2xl px-3 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                        : 'text-slate-700 dark:text-slate-200',
                    ].join(' ')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex items-center justify-between pt-2">
                <ThemeToggle />
                <Link
                  to="/detect"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Detect
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
