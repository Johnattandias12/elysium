export function SkeletonCard({ h = 'h-24' }: { h?: string }) {
  return <div className={`skeleton ${h} rounded-2xl`} />
}

export function SkeletonText({ w = 'w-full' }: { w?: string }) {
  return <div className={`skeleton h-4 ${w} rounded`} />
}

export function SkeletonCircle({ size = 48 }: { size?: number }) {
  return (
    <div className="skeleton rounded-full" style={{ width: size, height: size }} />
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <SkeletonText w="w-40" />
      <SkeletonCard h="h-40" />
      <div className="grid grid-cols-2 gap-3">
        <SkeletonCard h="h-28" />
        <SkeletonCard h="h-28" />
      </div>
      <SkeletonCard h="h-56" />
    </div>
  )
}
