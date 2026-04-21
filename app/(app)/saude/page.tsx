'use client'
import { useState } from 'react'
import { Plus, Heart } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import HealthMetricCard from '@/components/saude/HealthMetricCard'
import WeightChart from '@/components/saude/WeightChart'
import WeeklyChart from '@/components/dashboard/WeeklyChart'

const WEIGHT_DATA = [
  { date: '01/04', weight: 78.5 }, { date: '05/04', weight: 78.1 },
  { date: '10/04', weight: 77.8 }, { date: '15/04', weight: 77.2 },
  { date: '18/04', weight: 76.9 }, { date: '21/04', weight: 76.5 },
]

const STEPS_WEEK = [
  { day: 'Seg', value: 82 }, { day: 'Ter', value: 91 }, { day: 'Qua', value: 67 },
  { day: 'Qui', value: 78 }, { day: 'Sex', value: 95 }, { day: 'Sáb', value: 45 },
  { day: 'Dom', value: 74 },
]

const WATER_SLOTS = 8
const WATER_DONE = 6

export default function SaudePage() {
  const [waterDone, setWaterDone] = useState(WATER_DONE)

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Saúde" subtitle="Cuide do seu corpo e mente" accent="#f87171"
        action={
          <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <Plus size={20} className="text-[#f87171]" />
          </button>
        }
      />

      {/* metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        <HealthMetricCard label="Passos hoje" value="7.432" unit="passos" icon="👟" color="#f87171"
          progress={74} target="10.000" />
        <HealthMetricCard label="Sono esta noite" value={7.5} unit="h" icon="🌙" color="#a78bfa"
          progress={94} target="8h" />
        <HealthMetricCard label="Peso atual" value={76.5} unit="kg" icon="⚖️" color="#60a5fa"
          target="72kg" />
        <HealthMetricCard label="Calorias" value="1.840" unit="kcal" icon="🔥" color="#facc15"
          progress={82} target="2.200" />
      </div>

      {/* water tracker */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#555] uppercase tracking-wider font-medium">Água hoje</p>
          <span className="text-sm text-[#60a5fa] font-semibold">{waterDone * 250}ml / 2.000ml</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: WATER_SLOTS }).map((_, i) => (
            <button key={i}
              onClick={() => setWaterDone(i < waterDone ? i : Math.min(i + 1, WATER_SLOTS))}
              className="text-xl transition-all duration-200 active:scale-90"
              style={{ opacity: i < waterDone ? 1 : 0.2, filter: i < waterDone ? 'drop-shadow(0 0 4px rgba(96,165,250,0.6))' : 'none' }}>
              💧
            </button>
          ))}
        </div>
        <div className="mt-3 h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${waterDone / WATER_SLOTS * 100}%`, background: '#60a5fa', boxShadow: '0 0 8px rgba(96,165,250,0.5)' }} />
        </div>
      </div>

      <WeightChart data={WEIGHT_DATA} goal={72} />
      <WeeklyChart data={STEPS_WEEK} color="#f87171" label="Atividade física (% da meta)" />

      <div className="h-2" />
    </div>
  )
}
