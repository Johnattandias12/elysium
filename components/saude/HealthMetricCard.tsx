'use client'

interface HealthMetricCardProps {
  label: string
  value: string | number
  unit: string
  icon: string
  color: string
  progress?: number
  target?: string
}

export default function HealthMetricCard({ label, value, unit, icon, color, progress, target }: HealthMetricCardProps) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {target && <span className="text-xs text-[#555]">meta: {target}</span>}
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-semibold text-[#e8e8e8]">{value}</span>
        <span className="text-xs text-[#555]">{unit}</span>
      </div>
      <p className="text-xs text-[#666] mb-2">{label}</p>
      {progress !== undefined && (
        <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(progress, 100)}%`, background: color, boxShadow: `0 0 6px ${color}60` }} />
        </div>
      )}
    </div>
  )
}
