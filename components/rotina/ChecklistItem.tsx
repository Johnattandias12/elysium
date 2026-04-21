'use client'
import { Check } from 'lucide-react'

interface ChecklistItemProps {
  title: string
  time?: string
  done: boolean
  onToggle: () => void
}

export default function ChecklistItem({ title, time, done, onToggle }: ChecklistItemProps) {
  return (
    <button onClick={onToggle}
      className="flex items-center gap-3 w-full py-3 border-b border-[#1a1a1a] last:border-0 active:bg-[#1a1a1a] -mx-4 px-4 transition-colors rounded-xl text-left">
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-none transition-all duration-300 ${done ? '' : 'border-2 border-[#333]'}`}
        style={{ background: done ? '#C9A84C' : 'transparent', boxShadow: done ? '0 0 8px rgba(201,168,76,0.4)' : 'none' }}>
        {done && <Check size={12} className="text-[#0c0c0c]" strokeWidth={3} />}
      </div>
      <div className="flex-1">
        <span className={`text-sm transition-all ${done ? 'line-through text-[#444]' : 'text-[#e8e8e8]'}`}>
          {title}
        </span>
        {time && <p className="text-xs text-[#555] mt-0.5">{time}</p>}
      </div>
    </button>
  )
}
