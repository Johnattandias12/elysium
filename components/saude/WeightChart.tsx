'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'

interface WeightData { date: string; weight: number }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-[#666]">{label}</p>
      <p className="text-[#f87171] font-semibold">{payload[0].value} kg</p>
    </div>
  )
}

export default function WeightChart({ data, goal }: { data: WeightData[]; goal?: number }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
      <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-4">Evolução do peso</p>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#1a1a1a" />
          <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={['auto', 'auto']} hide />
          {goal && <ReferenceLine y={goal} stroke="#4ade8040" strokeDasharray="4 4" />}
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="weight" stroke="#f87171" strokeWidth={2}
            dot={{ fill: '#f87171', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#f87171', stroke: '#0c0c0c', strokeWidth: 2 }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(248,113,113,0.4))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
