interface ComponentCardSkeletonProps {
  count?: number
}

export function ComponentCardSkeleton({ count = 1 }: ComponentCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden animate-pulse"
        >
          {/* Preview area skeleton */}
          <div className="aspect-[4/3] relative bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 flex items-center justify-center">
            {/* Center icon placeholder */}
            <div className="w-16 h-16 rounded-xl bg-white/5" />

            {/* Optional interactive badge placeholder */}
            {index % 3 === 0 && (
              <div className="absolute top-3 right-3 w-20 h-5 rounded-full bg-white/5" />
            )}
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-4 bg-white/10 rounded w-3/4" />

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3 bg-white/5 rounded w-full" />
              <div className="h-3 bg-white/5 rounded w-2/3" />
            </div>

            {/* Zone badge */}
            <div className="h-5 bg-white/5 rounded-full w-20" />
          </div>
        </div>
      ))}
    </>
  )
}

// Grid wrapper for skeletons
export function ComponentCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ComponentCardSkeleton count={count} />
    </div>
  )
}
