'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface MonthData { month: string; income: number; expense: number }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs shadow-lg space-y-1">
      <p className="text-[#666] font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name === 'income' ? 'Receita' : 'Despesa'}: R$ {p.value.toLocaleString('pt-BR')}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyChart({ data }: { data: MonthData[] }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
      <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-4">Receitas × Despesas</p>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barGap={4} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#1a1a1a" />
          <XAxis dataKey="month" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" fill="#4ade80" radius={[6,6,0,0]}
            style={{ filter: 'drop-shadow(0 0 4px rgba(74,222,128,0.4))' }} />
          <Bar dataKey="expense" fill="#f87171" radius={[6,6,0,0]}
            style={{ filter: 'drop-shadow(0 0 4px rgba(248,113,113,0.4))' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
