import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md transition hover:border-emerald-300/60 hover:bg-white/70 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100 dark:hover:border-emerald-400/30 dark:hover:bg-slate-900/70 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="inline-flex"
      >
        {isDark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-slate-700" />}
      </motion.span>
      <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
    </motion.button>
  )
}
