import { motion } from 'framer-motion'
import { BookOpen, Brain, Cpu, Layers, LineChart, Network } from 'lucide-react'

const metrics = [
  { label: 'Held-out top-1 (internal)', value: '94.2%', note: 'Replace with your validation split.' },
  { label: 'Macro-F1 (balanced)', value: '0.91', note: 'Averaged across minority classes.' },
  { label: 'Calibration', value: 'ECE ↓ 0.04', note: 'Temperature scaling optional.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          Science stack
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
          Few-shot thinking, transfer-learned features
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          LeafGuard is designed around modern plant pathology ML: strong convolutional backbones, disciplined
          preprocessing, and pragmatic deployment on CPU/GPU hosts alike.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <Brain className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Few-Shot Learning</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Few-shot learning aims to generalize to new classes from a handful of examples by learning a metric or
            optimization procedure that adapts quickly. In production agronomy, that means you can extend disease
            coverage without retraining the entire corpus—ideal for regional outbreaks with limited imagery.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <Layers className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Transfer Learning</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Transfer learning reuses representations pretrained on large image datasets, then fine-tunes on crop
            leaves. MobileNetV2 offers a favorable accuracy-to-latency tradeoff for field uploads, while keeping
            inference deployable on modest servers.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <Network className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">MobileNetV2</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Inverted residuals and linear bottlenecks keep the network efficient while preserving multi-scale texture
            cues—useful for spotting sporulation, halos, and vein-limited lesions that separate look-alike stresses.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <Cpu className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">TensorFlow & Keras</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            TensorFlow provides a dependable graph/runtime for SavedModel and HDF5 exports, batching, and mixed
            precision if you choose to enable it. The Flask layer keeps IO and auth concerns separate from the graph.
          </p>
        </motion.article>
      </div>

      <section className="mt-14">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Project workflow</h2>
        </div>
        <div className="mt-6 glass-strong overflow-hidden rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-5 md:items-center">
            {['Ingest', 'Label', 'Train', 'Evaluate', 'Ship'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:flex-col md:text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-slate-950">
                  {i + 1}
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{step}</p>
                {i < 4 && (
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-emerald-400/0 md:block md:h-px md:w-full" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/40 p-4 text-sm text-slate-700 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200">
            <p className="font-semibold text-slate-900 dark:text-white">Diagram (textual)</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre rounded-xl bg-slate-950/80 p-4 text-xs text-emerald-100">
{`Farmers / Advisors
      │ upload JPEG/PNG
      ▼
┌───────────────────┐
│ React Console     │  resize 224² + multipart POST
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Flask /predict    │  Pillow decode → np.float32 / 255
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ TensorFlow .h5    │  softmax → label + confidence
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Metadata layer    │  prevention / cure copy
└───────────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <LineChart className="h-4 w-4 text-emerald-500" />
              Accuracy & quality
            </div>
            <p className="mt-3 font-display text-3xl font-semibold text-slate-900 dark:text-white">{m.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">{m.label}</p>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{m.note}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-14 glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Dataset philosophy</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          High-signal datasets blend lab-controlled captures with messy field photos: variable lighting, phone
          sensors, occluded leaves, and early-stage symptoms. We stratify splits by farm and date to reduce leakage,
          oversample tail classes, and audit confusion pairs (e.g., nutrient stress vs. fungal spots) with plant
          pathologists.
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Replace this section with your institutional dataset description, licensing, and any citizen-science
          contributions—transparency builds trust with growers and regulators.
        </p>
      </section>
    </div>
  )
}
