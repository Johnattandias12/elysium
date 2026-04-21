'use client'
import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  accent?: string
  action?: ReactNode
}

export default function PageHeader({ title, subtitle, accent = '#C9A84C', action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 pt-1">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#e8e8e8]"
          style={{ textShadow: `0 0 30px ${accent}30` }}>
          {title}
        </h1>
        {subtitle && <p className="text-sm text-[#555] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  )
}
