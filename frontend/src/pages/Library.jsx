import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search } from 'lucide-react'
import PlantCard from '../components/PlantCard.jsx'
import DiseaseCard from '../components/DiseaseCard.jsx'
import Modal from '../components/Modal.jsx'
import { plants } from '../data/plants.js'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'diseases', label: 'Diseases' },
  { id: 'prevention', label: 'Prevention' },
  { id: 'cure', label: 'Cure' },
]

export default function LibraryPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const [tab, setTab] = useState('overview')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return plants.filter((p) => {
      const matchesFilter = filter === 'all' || p.id === filter
      if (!matchesFilter) return false
      if (!q) return true
      const blob = `${p.name} ${p.scientificName} ${p.soil} ${p.season}`.toLowerCase()
      return blob.includes(q)
    })
  }, [query, filter])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Agronomy atlas
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Plant library
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Reference profiles for core crops—pair with detection results to coach growers on context, not just
            labels.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="glass relative flex w-full items-center gap-2 rounded-2xl px-4 py-3 lg:max-w-xl">
          <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by plant, soil, or season…"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <Filter className="h-4 w-4" />
            Filter
          </span>
          {['all', ...plants.map((p) => p.id)].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={[
                'rounded-full px-3 py-2 text-xs font-semibold transition',
                filter === id
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                  : 'border border-white/30 bg-white/50 text-slate-700 backdrop-blur-md hover:border-emerald-300/50 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200',
              ].join(' ')}
            >
              {id === 'all' ? 'All crops' : plants.find((p) => p.id === id)?.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <PlantCard
            key={p.id}
            plant={p}
            onOpen={(plant) => {
              setActive(plant)
              setTab('overview')
            }}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-300">No plants match that search.</p>
      )}

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active ? `${active.name} · Field guide` : ''}
        wide
      >
        {active && (
          <div>
            <div className="flex flex-wrap gap-2 border-b border-white/15 pb-4 dark:border-white/10">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={[
                    'rounded-full px-3 py-2 text-xs font-semibold',
                    tab === t.id
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                  ].join(' ')}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={active.image}
                  alt={active.name}
                  className="h-56 w-full rounded-2xl object-cover lg:h-full"
                />
                <dl className="grid gap-3 text-sm">
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Scientific name
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900 dark:text-white">{active.scientificName}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Growth duration
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.growthDuration}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Ideal soil
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.soil}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Water requirements
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.water}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Seed quantity (reference)
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.seedQuantity}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Temperature
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.temperature}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Best season
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.season}</dd>
                  </div>
                  <div className="glass rounded-2xl p-4 lg:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Fertilizer suggestions
                    </dt>
                    <dd className="mt-1 text-slate-700 dark:text-slate-200">{active.fertilizer}</dd>
                  </div>
                </dl>
              </div>
            )}

            {tab === 'diseases' && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {active.diseases.map((d) => (
                  <DiseaseCard key={d.id} disease={d} />
                ))}
              </div>
            )}

            {tab === 'prevention' && (
              <div className="mt-6 space-y-4">
                <div className="glass rounded-2xl p-5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Crop-level baseline</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{active.fertilizer}</p>
                </div>
                {active.diseases.map((d) => (
                  <div key={d.id} className="glass rounded-2xl p-5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{d.name}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{d.prevention}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'cure' && (
              <div className="mt-6 space-y-4">
                {active.diseases.map((d) => (
                  <div key={d.id} className="glass rounded-2xl p-5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{d.name}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{d.cure}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
