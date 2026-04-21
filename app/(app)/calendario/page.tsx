'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, Trash2, CalendarDays } from 'lucide-react'

interface CalEvent {
  id: string
  titulo: string
  data: string
  hora?: string
  cor: string
  prioridade: 'baixa' | 'media' | 'alta'
}

const MESES       = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const CORES       = ['#C9A84C','#4ade80','#60a5fa','#f87171','#a78bfa','#facc15','#38bdf8']

export default function CalendarioPage() {
  const now   = new Date()
  const [viewDate, setViewDate]         = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [events, setEvents]             = useState<CalEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showForm, setShowForm]         = useState(false)
  const [titulo, setTitulo]             = useState('')
  const [hora, setHora]                 = useState('')
  const [cor, setCor]                   = useState('#C9A84C')
  const [prioridade, setPrioridade]     = useState<'baixa' | 'media' | 'alta'>('media')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_eventos')
      if (saved) setEvents(JSON.parse(saved))
    } catch {}
  }, [])

  function saveEvents(list: CalEvent[]) {
    setEvents(list)
    localStorage.setItem('elysium_eventos', JSON.stringify(list))
  }

  function addEvent() {
    if (!titulo.trim() || !selectedDate) return
    saveEvents([...events, {
      id: Date.now().toString(), titulo: titulo.trim(), data: selectedDate,
      hora: hora || undefined, cor, prioridade,
    }].sort((a, b) => a.data.localeCompare(b.data) || (a.hora ?? '').localeCompare(b.hora ?? '')))
    setTitulo(''); setHora(''); setShowForm(false)
    if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission()
  }

  const year        = viewDate.getFullYear()
  const month       = viewDate.getMonth()
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr    = now.toISOString().slice(0, 10)

  function dayStr(d: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }

  const selectedEvents = selectedDate ? events.filter(e => e.data === selectedDate) : []
  const upcomingEvents = events.filter(e => e.data >= todayStr).slice(0, 8)

  const prioColor = { alta:'#f87171', media:'#facc15', baixa:'#4ade80' }
  const prioBg    = { alta:'rgba(248,113,113,0.1)', media:'rgba(250,204,21,0.1)', baixa:'rgba(74,222,128,0.1)' }

  return (
    <div className="space-y-5 page-enter">
      <div className="pt-1">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays size={18} className="text-[#C9A84C]" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-[#f0f0f0]">Calendário</h1>
        </div>
        <p className="text-[#666] text-sm">Suas demandas e prazos</p>
      </div>

      {/* calendar */}
      <div className="rounded-2xl p-4" style={{ background:'rgba(255,255,255,0.025)', border:'1px solid #252525' }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #252525' }}>
            <ChevronLeft size={16} className="text-[#888]" />
          </button>
          <p className="text-[#e0e0e0] font-semibold">{MESES[month]} {year}</p>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #252525' }}>
            <ChevronRight size={16} className="text-[#888]" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DIAS_SEMANA.map(d => (
            <div key={d} className="text-center text-[10px] text-[#444] font-medium py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d  = i + 1
            const ds = dayStr(d)
            const isToday    = ds === todayStr
            const isSelected = ds === selectedDate
            const evs = events.filter(e => e.data === ds)
            return (
              <button key={d} onClick={() => { setSelectedDate(ds === selectedDate ? null : ds); setShowForm(false) }}
                className="relative flex flex-col items-center py-1.5 rounded-xl transition-all active:scale-90 min-h-[44px] justify-center"
                style={{
                  background: isSelected ? 'rgba(201,168,76,0.15)' : isToday ? 'rgba(201,168,76,0.06)' : 'transparent',
                  border: isSelected ? '1px solid rgba(201,168,76,0.4)' : isToday ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
                }}>
                <span className="text-sm font-medium" style={{ color: isSelected || isToday ? '#C9A84C' : '#bbb' }}>{d}</span>
                {evs.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                    {evs.slice(0, 3).map(e => <div key={e.id} className="w-1 h-1 rounded-full" style={{ background: e.cor }} />)}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* selected day panel */}
      {selectedDate && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#666] capitalize">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' })}
            </p>
            <button onClick={() => setShowForm(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{ background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.2)' }}>
              {showForm ? <X size={14} className="text-[#C9A84C]" /> : <Plus size={14} className="text-[#C9A84C]" />}
            </button>
          </div>

          {showForm && (
            <div className="rounded-2xl p-4 space-y-3 animate-fade-slide-up"
              style={{ background:'rgba(201,168,76,0.04)', border:'1px solid rgba(201,168,76,0.18)' }}>
              <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}
                placeholder="Título da demanda…" onKeyDown={e => e.key === 'Enter' && addEvent()}
                className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#444] outline-none"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px' }} />
              <input type="time" value={hora} onChange={e => setHora(e.target.value)}
                className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] outline-none"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px', colorScheme:'dark' }} />
              <div className="flex gap-2">
                {(['baixa','media','alta'] as const).map(p => (
                  <button key={p} onClick={() => setPrioridade(p)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all"
                    style={{
                      background: prioridade === p ? prioBg[p] : 'rgba(255,255,255,0.03)',
                      color: prioridade === p ? prioColor[p] : '#555',
                      border: prioridade === p ? `1px solid ${prioColor[p]}40` : '1px solid transparent',
                    }}>
                    {p === 'baixa' ? '↓ Baixa' : p === 'media' ? '→ Média' : '↑ Alta'}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {CORES.map(c => (
                  <button key={c} onClick={() => setCor(c)}
                    className="w-6 h-6 rounded-full transition-all active:scale-90"
                    style={{ background: c, boxShadow: cor === c ? `0 0 0 2px #080808, 0 0 0 4px ${c}` : 'none' }} />
                ))}
              </div>
              <button onClick={addEvent} disabled={!titulo.trim()}
                className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
                style={{ background: titulo.trim() ? '#C9A84C' : 'rgba(255,255,255,0.05)', color: titulo.trim() ? '#080808' : '#444' }}>
                Adicionar ao calendário
              </button>
            </div>
          )}

          {selectedEvents.length === 0 && !showForm ? (
            <div className="rounded-2xl p-6 text-center" style={{ border:'1px dashed #252525' }}>
              <p className="text-[#555] text-sm">Nenhuma demanda neste dia</p>
              <p className="text-[#3a3a3a] text-xs mt-1">Toque em + para adicionar</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map(e => (
                <div key={e.id} className="flex items-center gap-3 rounded-xl px-4 py-3 group"
                  style={{ background:'rgba(255,255,255,0.025)', borderTop:'1px solid #222', borderRight:'1px solid #222', borderBottom:'1px solid #222', borderLeft:`3px solid ${e.cor}` }}>
                  <div className="flex-1">
                    <p className="text-[#e8e8e8] font-medium text-sm">{e.titulo}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {e.hora && <span className="text-[#555] text-xs">{e.hora}</span>}
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: prioBg[e.prioridade], color: prioColor[e.prioridade] }}>
                        {e.prioridade}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => saveEvents(events.filter(x => x.id !== e.id))}
                    className="opacity-0 group-hover:opacity-100 text-[#444] hover:text-[#f87171] transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* upcoming */}
      {!selectedDate && (
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-3">Próximas demandas</p>
          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl p-6 text-center" style={{ border:'1px dashed #252525' }}>
              <CalendarDays size={28} className="mx-auto mb-2 text-[#2a2a2a]" strokeWidth={1} />
              <p className="text-[#555] text-sm">Selecione um dia no calendário para adicionar demandas</p>
            </div>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map(e => (
                <div key={e.id} className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background:'rgba(255,255,255,0.025)', borderTop:'1px solid #222', borderRight:'1px solid #222', borderBottom:'1px solid #222', borderLeft:`3px solid ${e.cor}` }}>
                  <div className="flex-1">
                    <p className="text-[#e8e8e8] font-medium text-sm">{e.titulo}</p>
                    <p className="text-[#555] text-xs">
                      {new Date(e.data + 'T12:00:00').toLocaleDateString('pt-BR', { day:'2-digit', month:'short' })}
                      {e.hora ? ` · ${e.hora}` : ''}
                    </p>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: prioBg[e.prioridade], color: prioColor[e.prioridade] }}>
                    {e.prioridade}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
