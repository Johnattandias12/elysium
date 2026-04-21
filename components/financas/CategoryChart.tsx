'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface CategoryData { name: string; value: number; color: string }

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: CategoryData }> }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="font-medium" style={{ color: d.color }}>{d.name}</p>
      <p className="text-[#e8e8e8]">R$ {d.value.toLocaleString('pt-BR')}</p>
    </div>
  )
}

export default function CategoryChart({ data }: { data: CategoryData[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
      <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-4">Gastos por categoria</p>
      <div className="flex gap-4 items-center">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={55}
              dataKey="value" stroke="none">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} style={{ filter: `drop-shadow(0 0 4px ${entry.color}50)` }} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-[#888]">{d.name}</span>
              </div>
              <span className="text-xs text-[#555]">
                {total > 0 ? Math.round(d.value / total * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
