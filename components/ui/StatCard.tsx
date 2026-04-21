import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | ReactNode
  icon?: LucideIcon
  color?: string
  delta?: { value: string; positive?: boolean }
  className?: string
}

export default function StatCard({ label, value, icon: Icon, color = '#C9A84C', delta, className = '' }: StatCardProps) {
  return (
    <div className={`bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-[#555] text-xs font-medium uppercase tracking-wider">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${color}15` }}>
            <Icon size={16} style={{ color }} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="text-[#e8e8e8] text-2xl font-semibold tracking-tight">{value}</div>
      {delta && (
        <div className={`text-xs mt-1.5 font-medium ${delta.positive ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
          {delta.positive ? '↑' : '↓'} {delta.value}
        </div>
      )}
    </div>
  )
}
