'use client'
import { Target, TrendingUp, BookOpen, Heart, CheckSquare } from 'lucide-react'

interface Goal {
  id: string
  title: string
  category: string
  current_value: number
  target_value: number
  unit: string
}

const ICONS: Record<string, React.ElementType> = {
  finance: TrendingUp,
  study: BookOpen,
  health: Heart,
  routine: CheckSquare,
  other: Target,
}

const COLORS: Record<string, string> = {
  finance: '#4ade80',
  study: '#60a5fa',
  health: '#f87171',
  routine: '#facc15',
  other: '#C9A84C',
}

export default function GoalCarousel({ goals }: { goals: Goal[] }) {
  if (goals.length === 0) return null

  return (
    <div>
      <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-3">Metas em andamento</p>
      <div className="flex gap-3 overflow-x-auto snap-x-mandatory pb-1 -mx-4 px-4">
        {goals.map((goal, i) => {
          const Icon = ICONS[goal.category] ?? Target
          const color = COLORS[goal.category] ?? '#C9A84C'
          const pct = Math.min(goal.current_value / goal.target_value, 1)
          const circumference = 2 * Math.PI * 30
          const offset = circumference * (1 - pct)

          return (
            <div key={goal.id}
              className="flex-none w-44 bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 snap-start animate-fade-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}18` }}>
                  <Icon size={16} style={{ color }} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold" style={{ color }}>
                  {Math.round(pct * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-center mb-3">
                <svg width="76" height="76" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="38" cy="38" r="30" fill="none" stroke={`${color}18`} strokeWidth="6" />
                  <circle cx="38" cy="38" r="30" fill="none" stroke={color} strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)', filter: `drop-shadow(0 0 4px ${color}60)` }}
                  />
                </svg>
              </div>

              <p className="text-[#e8e8e8] text-xs font-medium leading-tight line-clamp-2">{goal.title}</p>
              <p className="text-[#555] text-[10px] mt-1">
                {goal.current_value}/{goal.target_value} {goal.unit}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
