'use client'

interface HabitRingProps {
  label: string
  value: number
  total: number
  color: string
  size?: number
  strokeWidth?: number
}

export default function HabitRing({ label, value, total, color, size = 80, strokeWidth = 8 }: HabitRingProps) {
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? Math.min(value / total, 1) : 0
  const offset = circumference * (1 - progress)
  const cx = size / 2
  const cy = size / 2

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* track */}
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke={`${color}18`} strokeWidth={strokeWidth} />
          {/* progress */}
          <circle cx={cx} cy={cy} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)',
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        {/* center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold" style={{ color }}>{value}</span>
          <span className="text-[10px] text-[#555]">/{total}</span>
        </div>
      </div>
      <span className="text-[11px] text-[#666] text-center leading-tight">{label}</span>
    </div>
  )
}
