'use client'
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'

interface WeeklyChartProps {
  data: { day: string; value: number }[]
  color?: string
  label?: string
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-[#666] mb-0.5">{label}</p>
      <p className="text-[#e8e8e8] font-semibold">{payload[0].value}%</p>
    </div>
  )
}

export default function WeeklyChart({ data, color = '#C9A84C', label = 'Conclusão' }: WeeklyChartProps) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4">
      <p className="text-xs text-[#555] mb-4 uppercase tracking-wider font-medium">{label} — 7 dias</p>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#1a1a1a" />
          <XAxis dataKey="day" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#grad-${color.replace('#','')})`}
            dot={{ fill: color, strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: color, strokeWidth: 2, stroke: '#0c0c0c' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
