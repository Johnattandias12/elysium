'use client'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TrendingUp, BookOpen, Heart, CheckSquare } from 'lucide-react'
import HabitRing from '@/components/dashboard/HabitRing'
import WeeklyChart from '@/components/dashboard/WeeklyChart'
import ModuleCard from '@/components/dashboard/ModuleCard'
import StreakBadge from '@/components/dashboard/StreakBadge'
import GoalCarousel from '@/components/dashboard/GoalCarousel'
import { PageSkeleton } from '@/components/ui/SkeletonCard'
import { createClient } from '@/lib/supabase/client'

const MOCK_WEEK = [
  { day: 'Seg', value: 60 }, { day: 'Ter', value: 80 }, { day: 'Qua', value: 45 },
  { day: 'Qui', value: 90 }, { day: 'Sex', value: 70 }, { day: 'Sáb', value: 55 },
  { day: 'Dom', value: 85 },
]

const MOCK_GOALS = [
  { id: '1', title: 'Economizar R$5.000', category: 'finance', current_value: 2300, target_value: 5000, unit: 'R$' },
  { id: '2', title: 'Estudar 100h de TypeScript', category: 'study', current_value: 34, target_value: 100, unit: 'h' },
  { id: '3', title: 'Correr 100km este mês', category: 'health', current_value: 42, target_value: 100, unit: 'km' },
  { id: '4', title: '30 dias sem falhar rotina', category: 'routine', current_value: 12, target_value: 30, unit: 'dias' },
]

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const today = new Date()
  const greeting = today.getHours() < 12 ? 'Bom dia' : today.getHours() < 18 ? 'Boa tarde' : 'Boa noite'
  const dateStr = format(today, "EEEE, d 'de' MMMM", { locale: ptBR })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserName(user.email.split('@')[0])
      }
      setTimeout(() => setLoading(false), 400)
    })
  }, [])

  if (loading) return <PageSkeleton />

  return (
    <div className="space-y-6 page-enter">
      {/* header */}
      <div>
        <p className="text-[#555] text-sm capitalize">{dateStr}</p>
        <h1 className="text-2xl font-semibold text-[#e8e8e8] mt-0.5">
          {greeting}{userName ? `, ${userName}` : ''}
        </h1>
        <div className="mt-2">
          <StreakBadge days={12} />
        </div>
      </div>

      {/* habit rings */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
        <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-4">Hoje</p>
        <div className="flex items-center justify-around">
          <HabitRing label="Finanças" value={3} total={5} color="#4ade80" size={76} />
          <HabitRing label="Estudos" value={2} total={3} color="#60a5fa" size={76} />
          <HabitRing label="Saúde" value={4} total={5} color="#f87171" size={76} />
          <HabitRing label="Rotina" value={7} total={10} color="#facc15" size={76} />
        </div>
      </div>

      {/* weekly trend */}
      <WeeklyChart data={MOCK_WEEK} color="#C9A84C" label="Performance geral" />

      {/* goals */}
      <GoalCarousel goals={MOCK_GOALS} />

      {/* module cards */}
      <div>
        <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-3">Módulos</p>
        <div className="grid grid-cols-2 gap-3">
          <ModuleCard href="/financas" title="Finanças" subtitle="Saldo do mês"
            value="R$ 3.240" icon={TrendingUp} color="#4ade80" progress={64} />
          <ModuleCard href="/estudos" title="Estudos" subtitle="Esta semana"
            value="8h 30min" icon={BookOpen} color="#60a5fa" progress={72} />
          <ModuleCard href="/saude" title="Saúde" subtitle="Passos hoje"
            value="7.432" icon={Heart} color="#f87171" progress={74} />
          <ModuleCard href="/rotina" title="Rotina" subtitle="Concluídas hoje"
            value="7/10" icon={CheckSquare} color="#facc15" progress={70} />
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}
