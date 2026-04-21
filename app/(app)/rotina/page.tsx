'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import HabitItem from '@/components/rotina/HabitItem'
import ChecklistItem from '@/components/rotina/ChecklistItem'
import WeeklyChart from '@/components/dashboard/WeeklyChart'

const HABITS_INIT = [
  { id: 1, name: 'Meditação',    icon: '🧘', streak: 12, color: '#a78bfa', done: true,  week: [true,true,true,false,true,true,true] },
  { id: 2, name: 'Exercício',    icon: '💪', streak: 5,  color: '#f87171', done: false, week: [true,false,true,true,false,true,false] },
  { id: 3, name: 'Leitura 30min',icon: '📚', streak: 8,  color: '#60a5fa', done: true,  week: [true,true,false,true,true,false,true] },
  { id: 4, name: 'Sem açúcar',   icon: '🥗', streak: 3,  color: '#4ade80', done: false, week: [false,true,true,true,false,false,false] },
  { id: 5, name: 'Dormir às 23h',icon: '🌙', streak: 7,  color: '#facc15', done: true,  week: [true,true,true,true,false,true,true] },
]

const CHECKLIST_INIT = [
  { id: 1, title: 'Revisar e-mails',         time: '08:00', done: true },
  { id: 2, title: 'Planejamento do dia',      time: '08:30', done: true },
  { id: 3, title: 'Sessão Pomodoro — foco',   time: '09:00', done: false },
  { id: 4, title: 'Almoço saudável',          time: '12:00', done: false },
  { id: 5, title: 'Caminhada 30min',          time: '13:00', done: false },
  { id: 6, title: 'Revisão de estudos',       time: '20:00', done: false },
  { id: 7, title: 'Gratidão no diário',       time: '22:00', done: false },
]

const WEEK_DATA = [
  { day: 'Seg', value: 80 }, { day: 'Ter', value: 60 }, { day: 'Qua', value: 75 },
  { day: 'Qui', value: 90 }, { day: 'Sex', value: 55 }, { day: 'Sáb', value: 70 },
  { day: 'Dom', value: 85 },
]

export default function RotinaPage() {
  const [habits, setHabits] = useState(HABITS_INIT)
  const [checklist, setChecklist] = useState(CHECKLIST_INIT)
  const [tab, setTab] = useState<'habits' | 'checklist'>('habits')

  const doneTasks = checklist.filter(c => c.done).length
  const totalTasks = checklist.length
  const doneHabits = habits.filter(h => h.done).length

  function toggleHabit(id: number) {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h))
  }

  function toggleCheck(id: number) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c))
  }

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Rotina" subtitle="Hábitos que transformam" accent="#facc15"
        action={
          <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)' }}>
            <Plus size={20} className="text-[#facc15]" />
          </button>
        }
      />

      {/* progress bar */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-[#555] uppercase tracking-wider">Hoje</p>
          <span className="text-sm font-semibold text-[#facc15]">{doneHabits}/{habits.length} hábitos</span>
        </div>
        <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${doneHabits / habits.length * 100}%`, background: 'linear-gradient(90deg, #facc15, #f97316)', boxShadow: '0 0 10px rgba(250,204,21,0.4)' }} />
        </div>
      </div>

      {/* tabs */}
      <div className="flex bg-[#111] border border-[#1e1e1e] rounded-2xl p-1 gap-1">
        {(['habits', 'checklist'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ background: tab === t ? '#facc1515' : 'transparent', color: tab === t ? '#facc15' : '#555', borderBottom: tab === t ? '1px solid #facc1530' : 'none' }}>
            {t === 'habits' ? `Hábitos (${doneHabits}/${habits.length})` : `Tarefas (${doneTasks}/${totalTasks})`}
          </button>
        ))}
      </div>

      {tab === 'habits' && (
        <div className="space-y-3">
          {habits.map((h, i) => (
            <div key={h.id} className="animate-fade-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <HabitItem {...h} onToggle={() => toggleHabit(h.id)} weekProgress={h.week} />
            </div>
          ))}
        </div>
      )}

      {tab === 'checklist' && (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl px-4 py-1">
          {checklist.map(c => (
            <ChecklistItem key={c.id} title={c.title} time={c.time} done={c.done} onToggle={() => toggleCheck(c.id)} />
          ))}
        </div>
      )}

      <WeeklyChart data={WEEK_DATA} color="#facc15" label="Consistência da semana" />

      <div className="h-2" />
    </div>
  )
}
