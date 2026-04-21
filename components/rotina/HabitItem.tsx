'use client'
import { Check, Flame } from 'lucide-react'

interface HabitItemProps {
  name: string
  icon: string
  streak: number
  color: string
  done: boolean
  onToggle: () => void
  weekProgress: boolean[]
}

const DAY_LABELS = ['S','T','Q','Q','S','S','D']

export default function HabitItem({ name, icon, streak, color, done, onToggle, weekProgress }: HabitItemProps) {
  return (
    <div className={`bg-[#111] border rounded-2xl p-4 transition-all duration-300 ${done ? '' : 'border-[#1e1e1e]'}`}
      style={{ borderColor: done ? `${color}40` : '#1e1e1e', background: done ? `${color}06` : '#111' }}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-[#e8e8e8] text-sm font-medium">{name}</p>
          {streak > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Flame size={12} className="text-[#f97316]" />
              <span className="text-xs text-[#f97316]">{streak} dias</span>
            </div>
          )}
        </div>
        <button onClick={onToggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90"
          style={{
            background: done ? color : '#1e1e1e',
            border: done ? 'none' : `2px solid #333`,
            boxShadow: done ? `0 0 12px ${color}40` : 'none',
          }}>
          {done && <Check size={16} className="text-[#0c0c0c]" strokeWidth={3} />}
        </button>
      </div>

      {/* week dots */}
      <div className="flex gap-1.5">
        {weekProgress.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
              style={{ background: d ? `${color}25` : '#1a1a1a', border: d ? `1px solid ${color}50` : '1px solid #1e1e1e' }}>
              {d && <Check size={10} style={{ color }} strokeWidth={3} />}
            </div>
            <span className="text-[9px] text-[#444]">{DAY_LABELS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
