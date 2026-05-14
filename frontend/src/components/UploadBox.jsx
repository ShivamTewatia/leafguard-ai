import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ImagePlus, UploadCloud } from 'lucide-react'

export default function UploadBox({ file, onFile, disabled }) {
  const [dragOver, setDragOver] = useState(false)

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragOver(false)
      if (disabled) return
      const f = e.dataTransfer.files?.[0]
      if (f && f.type.startsWith('image/')) onFile?.(f)
    },
    [disabled, onFile],
  )

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={[
        'relative overflow-hidden rounded-2xl border border-dashed p-6 transition',
        dragOver
          ? 'border-emerald-400 bg-emerald-500/10'
          : 'border-white/40 bg-white/40 dark:border-white/10 dark:bg-slate-900/40',
        disabled ? 'opacity-60' : '',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10" />

      <div className="relative flex flex-col items-center justify-center gap-4 text-center">
        <motion.div
          animate={{ y: dragOver ? -4 : 0 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-slate-950 shadow-glow-sm"
        >
          <UploadCloud className="h-7 w-7" />
        </motion.div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Drag & drop a leaf image</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">PNG or JPG · auto-resized to 224×224</p>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-800 backdrop-blur-md hover:border-emerald-300/60 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100">
          <ImagePlus className="h-4 w-4" />
          Browse files
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={disabled}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onFile?.(f)
            }}
          />
        </label>

        {previewUrl && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="overflow-hidden rounded-2xl border border-white/25 bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40">
              <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 w-full object-contain" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
