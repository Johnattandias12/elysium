'use client'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { MONTHS_SHORT } from '@/lib/utils/formatters'

interface StudyData { day: string; hours: number }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-[#666]">{label}</p>
      <p className="text-[#60a5fa] font-semibold">{payload[0].value}h estudadas</p>
    </div>
  )
}

export default function StudyChart({ data }: { data: StudyData[] }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
      <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-4">Horas estudadas</p>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="study-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#1a1a1a" />
          <XAxis dataKey="day" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="hours" stroke="#60a5fa" strokeWidth={2}
            fill="url(#study-grad)"
            dot={{ fill: '#60a5fa', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: '#60a5fa', strokeWidth: 2, stroke: '#0c0c0c' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
