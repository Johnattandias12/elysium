'use client'
import Link from 'next/link'
import { LucideIcon, ChevronRight } from 'lucide-react'

interface ModuleCardProps {
  href: string
  title: string
  subtitle: string
  value: string
  icon: LucideIcon
  color: string
  progress?: number
}

export default function ModuleCard({ href, title, subtitle, value, icon: Icon, color, progress }: ModuleCardProps) {
  return (
    <Link href={href}
      className="block bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 active:scale-[0.97] transition-all duration-200"
      style={{ '--accent': color } as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18` }}>
          <Icon size={20} style={{ color }} strokeWidth={1.5} />
        </div>
        <ChevronRight size={16} className="text-[#333] mt-1" />
      </div>
      <div className="text-[#e8e8e8] text-xl font-semibold mb-0.5">{value}</div>
      <div className="text-[#e8e8e8] text-sm font-medium">{title}</div>
      <div className="text-[#555] text-xs mt-0.5">{subtitle}</div>
      {progress !== undefined && (
        <div className="mt-3 h-0.5 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(progress, 100)}%`, background: color }} />
        </div>
      )}
    </Link>
  )
}
