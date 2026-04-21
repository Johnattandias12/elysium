import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  color?: string
}

export default function EmptyState({ icon: Icon, title, description, action, color = '#C9A84C' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
        <Icon size={28} style={{ color }} strokeWidth={1.5} />
      </div>
      <h3 className="text-[#888] font-medium mb-1">{title}</h3>
      {description && <p className="text-[#555] text-sm mb-4">{description}</p>}
      {action}
    </div>
  )
}
