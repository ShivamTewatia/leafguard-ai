import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'

export default function PlantCard({ plant, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(plant)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group w-full text-left"
    >
      <div className="glass relative overflow-hidden rounded-2xl p-4 ring-1 ring-white/30 transition group-hover:shadow-glow dark:ring-white/10">
        <div className="relative h-40 w-full overflow-hidden rounded-xl">
          <img
            src={plant.image}
            alt={plant.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <Sprout className="h-3.5 w-3.5" />
            {plant.growthDuration.split('·')[0].trim()}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">{plant.name}</p>
          <p className="mt-1 text-sm italic text-slate-600 dark:text-slate-400">{plant.scientificName}</p>
          <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
            Ideal soil: {plant.soil}
          </p>
        </div>
      </div>
    </motion.button>
  )
}
