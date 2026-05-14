export function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-slate-200/70 dark:bg-slate-800/70 ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="mt-4 h-4 w-2/3" />
      <Skeleton className="mt-2 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
    </div>
  )
}
