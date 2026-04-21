'use client'
import { useState, useEffect } from 'react'
import { BookOpen, Plus, Clock, Trash2, X } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import StudyChart from '@/components/estudos/StudyChart'

interface Sessao {
  id: string
  materia: string
  horas: number
  data: string
  dayOfWeek: string
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const COLORS: Record<string, string> = {
  TypeScript: '#60a5fa', JavaScript: '#facc15', React: '#38bdf8', Next: '#f0f0f0',
  Python: '#4ade80', Design: '#f9a8d4', Inglês: '#a78bfa', Outro: '#888',
}

function getColor(name: string): string {
  for (const [k, v] of Object.entries(COLORS)) {
    if (name.toLowerCase().includes(k.toLowerCase())) return v
  }
  return '#C9A84C'
}

export default function EstudosPage() {
  const [sessoes, setSessoes]   = useState<Sessao[]>([])
  const [showForm, setShowForm] = useState(false)
  const [materia, setMateria]   = useState('')
  const [horas, setHoras]       = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_sessoes')
      if (saved) setSessoes(JSON.parse(saved))
    } catch {}
  }, [])

  function saveSessoes(list: Sessao[]) {
    setSessoes(list)
    localStorage.setItem('elysium_sessoes', JSON.stringify(list))
  }

  function addSessao() {
    const h = parseFloat(horas.replace(',', '.'))
    if (!materia.trim() || !h || h <= 0) return
    const now = new Date()
    const nova: Sessao = {
      id: Date.now().toString(),
      materia: materia.trim(),
      horas: h,
      data: now.toLocaleDateString('pt-BR'),
      dayOfWeek: DAYS[now.getDay()],
    }
    saveSessoes([nova, ...sessoes])
    setMateria('')
    setHoras('')
    setShowForm(false)
  }

  function removeSessao(id: string) {
    saveSessoes(sessoes.filter(s => s.id !== id))
  }

  const totalHoras    = sessoes.reduce((s, r) => s + r.horas, 0)
  const totalSemana   = sessoes.slice(0, 20).reduce((s, r) => s + r.horas, 0)

  // chart data: hours per day of week (last 7 sessions simplified)
  const chartData = DAYS.map(day => ({
    day,
    hours: sessoes.filter(s => s.dayOfWeek === day).reduce((a, b) => a + b.horas, 0),
  }))

  // subjects grouped
  const byMateria: Record<string, number> = {}
  sessoes.forEach(s => { byMateria[s.materia] = (byMateria[s.materia] || 0) + s.horas })
  const subjects = Object.entries(byMateria)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Estudos" subtitle="Registro de aprendizado" accent="#60a5fa"
        action={
          <button onClick={() => setShowForm(v => !v)}
            className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            {showForm ? <X size={20} className="text-[#60a5fa]" /> : <Plus size={20} className="text-[#60a5fa]" />}
          </button>
        }
      />

      {/* form */}
      {showForm && (
        <div className="rounded-2xl p-5 space-y-3 animate-fade-slide-up"
          style={{ background:'rgba(96,165,250,0.04)', border:'1px solid rgba(96,165,250,0.15)' }}>
          <p className="text-xs text-[#60a5fa] uppercase tracking-wider font-medium">Registrar sessão</p>
          <input
            type="text" value={materia}
            onChange={e => setMateria(e.target.value)}
            placeholder="O que você estudou? (ex: React, Inglês…)"
            className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
            onFocus={e => { e.currentTarget.style.border='1px solid rgba(96,165,250,0.4)' }}
            onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
          />
          <div className="relative">
            <Clock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#333]" />
            <input
              type="number" inputMode="decimal" value={horas}
              onChange={e => setHoras(e.target.value)}
              placeholder="Horas estudadas (ex: 1.5)"
              step="0.25" min="0.25"
              className="w-full h-11 rounded-xl pl-10 pr-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
              onFocus={e => { e.currentTarget.style.border='1px solid rgba(96,165,250,0.4)' }}
              onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <button onClick={addSessao}
            disabled={!materia || !horas}
            className="w-full h-11 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
            style={{
              background: (materia && horas) ? '#60a5fa' : 'rgba(255,255,255,0.04)',
              color: (materia && horas) ? '#080808' : '#333',
            }}>
            Registrar sessão
          </button>
        </div>
      )}

      {/* stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4"
          style={{ background:'rgba(96,165,250,0.04)', border:'1px solid rgba(96,165,250,0.1)' }}>
          <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Total geral</p>
          <p className="text-2xl font-semibold text-[#f0f0f0]">{totalHoras.toFixed(1)}h</p>
          <p className="text-xs text-[#333] mt-0.5">{sessoes.length} sessões</p>
        </div>
        <div className="rounded-2xl p-4"
          style={{ background:'rgba(96,165,250,0.04)', border:'1px solid rgba(96,165,250,0.1)' }}>
          <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Esta semana</p>
          <p className="text-2xl font-semibold text-[#f0f0f0]">{totalSemana.toFixed(1)}h</p>
          <p className="text-xs text-[#333] mt-0.5">últimas sessões</p>
        </div>
      </div>

      {/* chart */}
      {sessoes.length > 0 && <StudyChart data={chartData} />}

      {/* matérias */}
      {subjects.length > 0 && (
        <div>
          <p className="text-xs text-[#444] uppercase tracking-wider font-medium mb-3">Por matéria</p>
          <div className="space-y-2">
            {subjects.map(([name, h], i) => {
              const color = getColor(name)
              const max   = subjects[0][1]
              return (
                <div key={name} className="rounded-xl p-4 animate-fade-slide-up"
                  style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1a1a1a', animationDelay:`${i*50}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-[#e0e0e0] text-sm font-medium">{name}</span>
                    </div>
                    <span className="text-xs text-[#444]">{h.toFixed(1)}h</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width:`${(h/max)*100}%`, background:color, boxShadow:`0 0 6px ${color}60`, transition:'width 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* histórico */}
      <div>
        <p className="text-xs text-[#444] uppercase tracking-wider font-medium mb-3">Histórico de sessões</p>
        {sessoes.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #1e1e1e' }}>
            <BookOpen size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
            <p className="text-[#333] text-sm">Nenhuma sessão registrada</p>
            <p className="text-[#222] text-xs mt-1">Toque em + para começar</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sessoes.map((s, i) => (
              <div key={s.id}
                className="flex items-center gap-3 rounded-xl px-4 py-3 group animate-fade-slide-up"
                style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1a1a1a', animationDelay:`${i*30}ms` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-none"
                  style={{ background:`${getColor(s.materia)}15`, border:`1px solid ${getColor(s.materia)}20` }}>
                  <BookOpen size={15} style={{ color: getColor(s.materia) }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#e0e0e0] text-sm font-medium truncate">{s.materia}</p>
                  <p className="text-[#333] text-xs">{s.dayOfWeek} · {s.data}</p>
                </div>
                <div className="flex items-center gap-1 text-[#60a5fa] font-semibold text-sm flex-none">
                  <Clock size={12} strokeWidth={1.5} />
                  {s.horas}h
                </div>
                <button onClick={() => removeSessao(s.id)}
                  className="opacity-0 group-hover:opacity-100 text-[#333] hover:text-[#f87171] transition-all duration-200 ml-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-2" />
    </div>
  )
}
