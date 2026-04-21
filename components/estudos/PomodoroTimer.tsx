'use client'
import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'

const MODES = {
  focus:  { label: 'Foco',       duration: 25 * 60, color: '#60a5fa' },
  short:  { label: 'Pausa curta',duration:  5 * 60, color: '#4ade80' },
  long:   { label: 'Pausa longa',duration: 15 * 60, color: '#a78bfa' },
}

type Mode = keyof typeof MODES

export default function PomodoroTimer() {
  const [mode, setMode]       = useState<Mode>('focus')
  const [seconds, setSeconds] = useState(MODES.focus.duration)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  const { color, duration } = MODES[mode]
  const progress = 1 - seconds / duration
  const circumference = 2 * Math.PI * 90
  const offset = circumference * (1 - progress)

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const reset = useCallback((m: Mode = mode) => {
    setRunning(false)
    setSeconds(MODES[m].duration)
  }, [mode])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false)
          if (mode === 'focus') setSessions(n => n + 1)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, mode])

  function switchMode(m: Mode) {
    setMode(m)
    reset(m)
    setSeconds(MODES[m].duration)
  }

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5"
      style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color}08 0%, #111 70%)` }}>

      {/* mode tabs */}
      <div className="flex bg-[#1a1a1a] rounded-xl p-0.5 gap-0.5 mb-6">
        {(Object.keys(MODES) as Mode[]).map(m => (
          <button key={m} onClick={() => switchMode(m)}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{ background: mode === m ? '#2a2a2a' : 'transparent', color: mode === m ? MODES[m].color : '#555' }}>
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* ring */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r="90" fill="none" stroke={`${color}15`} strokeWidth="8" />
            <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 8px ${color}60)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-thin text-[#e8e8e8] tracking-tight">{mm}:{ss}</span>
            <span className="text-xs text-[#555] mt-1">{MODES[mode].label}</span>
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center gap-4">
          <button onClick={() => reset()}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1a1a1a] text-[#555] active:scale-95 transition-transform">
            <RotateCcw size={18} />
          </button>
          <button onClick={() => setRunning(r => !r)}
            className="w-16 h-16 rounded-full flex items-center justify-center font-medium active:scale-95 transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}90)`, boxShadow: `0 4px 20px ${color}40` }}>
            {running ? <Pause size={24} className="text-[#0c0c0c]" /> : <Play size={24} className="text-[#0c0c0c] ml-0.5" />}
          </button>
          <button onClick={() => switchMode('short')}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1a1a1a] text-[#555] active:scale-95 transition-transform">
            <Coffee size={18} />
          </button>
        </div>

        {/* session dots */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i < sessions % 4 ? color : '#2a2a2a' }} />
          ))}
        </div>
        <p className="text-xs text-[#555]">{sessions} sessões hoje</p>
      </div>
    </div>
  )
}
