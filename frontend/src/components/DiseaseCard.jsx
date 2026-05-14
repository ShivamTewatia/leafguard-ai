import { motion } from 'framer-motion'

export default function DiseaseCard({ disease }) {
  return (
    <motion.div
      layout
      className="glass overflow-hidden rounded-2xl"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="h-36 w-full overflow-hidden">
        <img src={disease.image} alt={disease.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <p className="font-semibold text-slate-900 dark:text-white">{disease.name}</p>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{disease.symptoms}</p>
      </div>
    </motion.div>
  )
}
