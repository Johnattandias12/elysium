'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const EVENTS = [
  { date: '2026-04-21', title: 'Consulta médica', color: '#f87171' },
  { date: '2026-04-22', title: 'Reunião projeto',  color: '#60a5fa' },
  { date: '2026-04-25', title: 'Academia',         color: '#4ade80' },
  { date: '2026-04-28', title: 'Revisão mensal',   color: '#C9A84C' },
  { date: '2026-04-30', title: 'Lançar projeto',   color: '#a78bfa' },
]

const HABITS_DONE: Record<string, number> = {
  '2026-04-18': 5, '2026-04-19': 4, '2026-04-20': 5, '2026-04-21': 3,
}

export default function CalendarioPage() {
  const [month, setMonth] = useState(new Date())
  const [selected, setSelected] = useState(new Date())

  const start = startOfMonth(month)
  const end = endOfMonth(month)
  const days = eachDayOfInterval({ start, end })
  const startPad = getDay(start)

  const dayEvents = EVENTS.filter(e => isSameDay(new Date(e.date), selected))

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Agenda" subtitle="Planeje sua semana" accent="#a78bfa" />

      {/* calendar */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
        {/* nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMonth(m => subMonths(m, 1))}
            className="w-9 h-9 rounded-xl bg-[#1a1a1a] flex items-center justify-center active:scale-95 transition-transform">
            <ChevronLeft size={18} className="text-[#666]" />
          </button>
          <h2 className="text-[#e8e8e8] font-medium capitalize">
            {format(month, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <button onClick={() => setMonth(m => addMonths(m, 1))}
            className="w-9 h-9 rounded-xl bg-[#1a1a1a] flex items-center justify-center active:scale-95 transition-transform">
            <ChevronRight size={18} className="text-[#666]" />
          </button>
        </div>

        {/* weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {['D','S','T','Q','Q','S','S'].map((d, i) => (
            <div key={i} className="text-center text-[#444] text-xs py-1">{d}</div>
          ))}
        </div>

        {/* days grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
          {days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const event = EVENTS.find(e => isSameDay(new Date(e.date), day))
            const habitsDone = HABITS_DONE[dateStr]
            const isSelected = isSameDay(day, selected)
            const todayDate = isToday(day)

            return (
              <button key={dateStr} onClick={() => setSelected(day)}
                className="flex flex-col items-center py-1 rounded-xl transition-all duration-200 active:scale-90 relative"
                style={{ background: isSelected ? '#C9A84C' : 'transparent' }}>
                <span className={`text-sm leading-none w-7 h-7 flex items-center justify-center rounded-lg font-medium transition-all
                  ${todayDate && !isSelected ? 'text-[#C9A84C]' : ''}
                  ${isSelected ? 'text-[#0c0c0c]' : 'text-[#888]'}
                `}>
                  {format(day, 'd')}
                </span>
                {/* dot indicators */}
                <div className="flex gap-0.5 mt-0.5 h-1">
                  {event && <span className="w-1 h-1 rounded-full" style={{ background: isSelected ? '#0c0c0c' : event.color }} />}
                  {habitsDone && <span className="w-1 h-1 rounded-full" style={{ background: isSelected ? '#0c0c0c' : '#4ade80' }} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* selected day */}
      <div>
        <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-3">
          {format(selected, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>
        {dayEvents.length === 0 ? (
          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 text-center">
            <p className="text-[#444] text-sm">Nenhum evento neste dia</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayEvents.map((ev, i) => (
              <div key={i} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 flex items-center gap-3 animate-fade-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}>
                <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: ev.color, boxShadow: `0 0 6px ${ev.color}60` }} />
                <span className="text-[#e8e8e8] text-sm">{ev.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-2" />
    </div>
  )
}
