'use client'
import { Flame } from 'lucide-react'

export default function StreakBadge({ days }: { days: number }) {
  const isHot = days >= 3
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
      style={{
        background: isHot ? 'rgba(249,115,22,0.1)' : 'rgba(85,85,85,0.1)',
        borderColor: isHot ? 'rgba(249,115,22,0.3)' : 'rgba(85,85,85,0.2)',
      }}>
      <Flame size={14} style={{ color: isHot ? '#f97316' : '#555' }} className={isHot ? 'animate-pulse-gold' : ''} />
      <span className="text-sm font-semibold" style={{ color: isHot ? '#f97316' : '#555' }}>{days}</span>
      <span className="text-xs" style={{ color: isHot ? '#f9731680' : '#444' }}>dias seguidos</span>
    </div>
  )
}
