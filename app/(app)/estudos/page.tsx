'use client'
import { BookOpen, Plus, Clock, Target } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import StatCard from '@/components/ui/StatCard'
import PomodoroTimer from '@/components/estudos/PomodoroTimer'
import StudyChart from '@/components/estudos/StudyChart'
import { formatMinutes } from '@/lib/utils/formatters'

const STUDY_DATA = [
  { day: 'Seg', hours: 2.5 }, { day: 'Ter', hours: 1.5 }, { day: 'Qua', hours: 3 },
  { day: 'Qui', hours: 2 },   { day: 'Sex', hours: 4 },   { day: 'Sáb', hours: 1 },
  { day: 'Dom', hours: 0.5 },
]

const SUBJECTS = [
  { name: 'TypeScript', hours: 34, color: '#60a5fa', goal: 100 },
  { name: 'Next.js',    hours: 22, color: '#a78bfa', goal: 60  },
  { name: 'Design',     hours: 15, color: '#f9a8d4', goal: 40  },
  { name: 'Inglês',     hours: 28, color: '#4ade80', goal: 80  },
]

export default function EstudosPage() {
  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Estudos" subtitle="Seu progresso de aprendizado" accent="#60a5fa"
        action={
          <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            <Plus size={20} className="text-[#60a5fa]" />
          </button>
        }
      />

      {/* stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Esta semana" value={formatMinutes(870)} icon={Clock} color="#60a5fa"
          delta={{ value: '2h a mais', positive: true }} />
        <StatCard label="Total do mês" value="34h 20min" icon={Target} color="#a78bfa" />
      </div>

      <PomodoroTimer />

      <StudyChart data={STUDY_DATA} />

      {/* subjects */}
      <div>
        <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-3">Matérias</p>
        <div className="space-y-3">
          {SUBJECTS.map((s, i) => (
            <div key={s.name} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 animate-fade-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-[#e8e8e8] text-sm font-medium">{s.name}</span>
                </div>
                <span className="text-xs text-[#555]">{s.hours}h / {s.goal}h</span>
              </div>
              <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(s.hours / s.goal * 100, 100)}%`,
                    background: s.color,
                    boxShadow: `0 0 8px ${s.color}60`,
                  }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}
