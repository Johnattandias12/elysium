'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Trash2, Heart, Droplets, Moon, Scale } from 'lucide-react'

interface PesoEntry { id: string; data: string; peso: number }
interface SonoEntry { id: string; data: string; horas: number }

export default function SaudePage() {
  const [tab, setTab]             = useState<'peso' | 'agua' | 'sono'>('peso')
  const [pesos, setPesos]         = useState<PesoEntry[]>([])
  const [sonos, setSonos]         = useState<SonoEntry[]>([])
  const [agua, setAgua]           = useState(0)
  const [showForm, setShowForm]   = useState(false)
  const [pesoInput, setPesoInput] = useState('')
  const [pesoData, setPesoData]   = useState('')
  const [sonoInput, setSonoInput] = useState('')
  const [sonoData, setSonoData]   = useState('')

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    setPesoData(today)
    setSonoData(today)
    try {
      const p    = localStorage.getItem('elysium_pesos')
      const s    = localStorage.getItem('elysium_sonos')
      const aVal = localStorage.getItem('elysium_agua_valor')
      const aDay = localStorage.getItem('elysium_agua_data')
      if (p) setPesos(JSON.parse(p))
      if (s) setSonos(JSON.parse(s))
      if (aDay === today && aVal) setAgua(parseInt(aVal))
    } catch {}
  }, [today])

  function savePesos(list: PesoEntry[]) {
    setPesos(list)
    localStorage.setItem('elysium_pesos', JSON.stringify(list))
  }
  function saveSonos(list: SonoEntry[]) {
    setSonos(list)
    localStorage.setItem('elysium_sonos', JSON.stringify(list))
  }
  function saveAgua(val: number) {
    setAgua(val)
    localStorage.setItem('elysium_agua_valor', String(val))
    localStorage.setItem('elysium_agua_data', today)
  }

  function addPeso() {
    const v = parseFloat(pesoInput.replace(',', '.'))
    if (!pesoInput || isNaN(v)) return
    savePesos([...pesos, { id: Date.now().toString(), data: pesoData, peso: v }].sort((a, b) => a.data.localeCompare(b.data)))
    setPesoInput('')
    setShowForm(false)
  }
  function addSono() {
    const v = parseFloat(sonoInput.replace(',', '.'))
    if (!sonoInput || isNaN(v)) return
    saveSonos([...sonos, { id: Date.now().toString(), data: sonoData, horas: v }].sort((a, b) => a.data.localeCompare(b.data)))
    setSonoInput('')
    setShowForm(false)
  }

  const ultimoPeso = pesos[pesos.length - 1]
  const ultimoSono = sonos[sonos.length - 1]

  function limparTudo() {
    if (!confirm('Deseja realmente apagar todos os dados de saúde?')) return
    savePesos([])
    saveSonos([])
    saveAgua(0)
  }

  return (
    <div className="space-y-5 page-enter">
      <div className="pt-1">
        <div className="flex items-center gap-2 mb-1">
          <Heart size={18} className="text-[#f87171]" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-[#f0f0f0]">Saúde</h1>
        </div>
        <p className="text-[#666] text-sm">Monitore seu corpo e bem-estar</p>
      </div>
      <div className="flex justify-end mt-[-30px] mb-2 relative z-10">
         <button onClick={limparTudo} className="text-xs text-[#f87171] opacity-70 hover:opacity-100 transition-opacity px-2 py-1 bg-[rgba(248,113,113,0.1)] rounded-lg">Limpar tudo</button>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 text-center" style={{ background:'rgba(248,113,113,0.06)', border:'1px solid rgba(248,113,113,0.18)' }}>
          <Scale size={16} className="mx-auto mb-1 text-[#f87171]" strokeWidth={1.5} />
          <p className="text-[#f0f0f0] font-semibold text-lg leading-tight">{ultimoPeso ? `${ultimoPeso.peso}kg` : '–'}</p>
          <p className="text-[#666] text-[10px] mt-0.5">Peso atual</p>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ background:'rgba(96,165,250,0.06)', border:'1px solid rgba(96,165,250,0.18)' }}>
          <Droplets size={16} className="mx-auto mb-1 text-[#60a5fa]" strokeWidth={1.5} />
          <p className="text-[#f0f0f0] font-semibold text-lg leading-tight">{agua * 250}ml</p>
          <p className="text-[#666] text-[10px] mt-0.5">Água hoje</p>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ background:'rgba(167,139,250,0.06)', border:'1px solid rgba(167,139,250,0.18)' }}>
          <Moon size={16} className="mx-auto mb-1 text-[#a78bfa]" strokeWidth={1.5} />
          <p className="text-[#f0f0f0] font-semibold text-lg leading-tight">{ultimoSono ? `${ultimoSono.horas}h` : '–'}</p>
          <p className="text-[#666] text-[10px] mt-0.5">Último sono</p>
        </div>
      </div>

      {/* tabs */}
      <div className="flex bg-[#111] border border-[#222] rounded-2xl p-1 gap-1">
        {(['peso', 'agua', 'sono'] as const).map(t => {
          const labels = { peso: '⚖️ Peso', agua: '💧 Água', sono: '🌙 Sono' }
          const colors = { peso: '#f87171', agua: '#60a5fa', sono: '#a78bfa' }
          const active  = tab === t
          return (
            <button key={t} onClick={() => { setTab(t); setShowForm(false) }}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
              style={{
                background: active ? `${colors[t]}12` : 'transparent',
                color: active ? colors[t] : '#555',
                border: active ? `1px solid ${colors[t]}25` : '1px solid transparent',
              }}>
              {labels[t]}
            </button>
          )
        })}
      </div>

      {/* ── PESO ── */}
      {tab === 'peso' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#555] uppercase tracking-wider font-medium">Histórico de peso</p>
            <button onClick={() => setShowForm(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{ background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.18)' }}>
              {showForm ? <X size={14} className="text-[#f87171]" /> : <Plus size={14} className="text-[#f87171]" />}
            </button>
          </div>

          {showForm && (
            <div className="rounded-2xl p-4 space-y-3 animate-fade-slide-up"
              style={{ background:'rgba(248,113,113,0.04)', border:'1px solid rgba(248,113,113,0.18)' }}>
              <div className="flex gap-3">
                <input type="date" value={pesoData} onChange={e => setPesoData(e.target.value)}
                  className="flex-1 h-11 rounded-xl px-3 text-[#e0e0e0] outline-none"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px', colorScheme:'dark' }} />
                <input type="text" value={pesoInput} onChange={e => setPesoInput(e.target.value.replace(/[^0-9.,]/g, ''))}
                  placeholder="kg" inputMode="decimal" onKeyDown={e => e.key === 'Enter' && addPeso()}
                  className="w-24 h-11 rounded-xl px-3 text-[#e0e0e0] placeholder-[#444] outline-none"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px' }} />
              </div>
              <button onClick={addPeso} disabled={!pesoInput}
                className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
                style={{ background: pesoInput ? '#f87171' : 'rgba(255,255,255,0.05)', color: pesoInput ? '#080808' : '#444' }}>
                Registrar peso
              </button>
            </div>
          )}

          {pesos.length === 0 ? (
            <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #252525' }}>
              <Scale size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
              <p className="text-[#555] text-sm">Nenhum registro ainda</p>
              <p className="text-[#3a3a3a] text-xs mt-1">Toque em + para registrar</p>
            </div>
          ) : (
            <div className="space-y-2">
              {[...pesos].reverse().map((p, i, arr) => {
                const prev = arr[i + 1]
                const diff = prev ? +(p.peso - prev.peso).toFixed(1) : null
                return (
                  <div key={p.id} className="flex items-center gap-3 rounded-xl px-4 py-3 group"
                    style={{ background:'rgba(255,255,255,0.025)', border:'1px solid #222' }}>
                    <div className="flex-1">
                      <p className="text-[#e8e8e8] font-semibold">{p.peso} kg</p>
                      <p className="text-[#555] text-xs">{new Date(p.data + 'T12:00:00').toLocaleDateString('pt-BR')}</p>
                    </div>
                    {diff !== null && diff !== 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: diff < 0 ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: diff < 0 ? '#4ade80' : '#f87171' }}>
                        {diff > 0 ? '+' : ''}{diff} kg
                      </span>
                    )}
                    <button onClick={() => savePesos(pesos.filter(x => x.id !== p.id))}
                      className="opacity-0 group-hover:opacity-100 text-[#444] hover:text-[#f87171] transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── ÁGUA ── */}
      {tab === 'agua' && (
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background:'rgba(96,165,250,0.05)', border:'1px solid rgba(96,165,250,0.18)' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[#e8e8e8] font-bold text-3xl">
                  {agua * 250}<span className="text-base font-normal text-[#666] ml-1">ml</span>
                </p>
                <p className="text-[#555] text-xs mt-0.5">meta: 2.000ml diários</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => saveAgua(Math.max(agua - 1, 0))}
                  className="w-11 h-11 rounded-xl font-bold text-xl text-[#60a5fa] transition-all active:scale-90"
                  style={{ background:'rgba(96,165,250,0.1)', border:'1px solid rgba(96,165,250,0.2)' }}>–</button>
                <button onClick={() => saveAgua(Math.min(agua + 1, 8))}
                  className="w-11 h-11 rounded-xl font-bold text-xl text-[#60a5fa] transition-all active:scale-90"
                  style={{ background:'rgba(96,165,250,0.1)', border:'1px solid rgba(96,165,250,0.2)' }}>+</button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <button key={i} onClick={() => saveAgua(i < agua ? i : Math.min(i + 1, 8))}
                  className="text-2xl transition-all duration-200 active:scale-90"
                  style={{ opacity: i < agua ? 1 : 0.18 }}>💧</button>
              ))}
            </div>
            <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width:`${agua / 8 * 100}%`, background:'linear-gradient(90deg,#60a5fa,#38bdf8)', boxShadow:'0 0 10px rgba(96,165,250,0.4)' }} />
            </div>
          </div>
          <p className="text-[#444] text-xs text-center">Cada 💧 = 250ml · Reseta todo dia</p>
        </div>
      )}

      {/* ── SONO ── */}
      {tab === 'sono' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#555] uppercase tracking-wider font-medium">Histórico de sono</p>
            <button onClick={() => setShowForm(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{ background:'rgba(167,139,250,0.08)', border:'1px solid rgba(167,139,250,0.18)' }}>
              {showForm ? <X size={14} className="text-[#a78bfa]" /> : <Plus size={14} className="text-[#a78bfa]" />}
            </button>
          </div>

          {showForm && (
            <div className="rounded-2xl p-4 space-y-3 animate-fade-slide-up"
              style={{ background:'rgba(167,139,250,0.04)', border:'1px solid rgba(167,139,250,0.18)' }}>
              <div className="flex gap-3">
                <input type="date" value={sonoData} onChange={e => setSonoData(e.target.value)}
                  className="flex-1 h-11 rounded-xl px-3 text-[#e0e0e0] outline-none"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px', colorScheme:'dark' }} />
                <input type="text" value={sonoInput} onChange={e => setSonoInput(e.target.value.replace(/[^0-9.,]/g, ''))}
                  placeholder="horas" inputMode="decimal"
                  onKeyDown={e => e.key === 'Enter' && addSono()}
                  className="w-24 h-11 rounded-xl px-3 text-[#e0e0e0] placeholder-[#444] outline-none"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px' }} />
              </div>
              <button onClick={addSono} disabled={!sonoInput}
                className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
                style={{ background: sonoInput ? '#a78bfa' : 'rgba(255,255,255,0.05)', color: sonoInput ? '#080808' : '#444' }}>
                Registrar sono
              </button>
            </div>
          )}

          {sonos.length === 0 ? (
            <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #252525' }}>
              <Moon size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
              <p className="text-[#555] text-sm">Nenhum registro ainda</p>
              <p className="text-[#3a3a3a] text-xs mt-1">Toque em + para registrar</p>
            </div>
          ) : (
            <div className="space-y-2">
              {[...sonos].reverse().map(s => (
                <div key={s.id} className="flex items-center gap-3 rounded-xl px-4 py-3 group"
                  style={{ background:'rgba(255,255,255,0.025)', border:'1px solid #222' }}>
                  <Moon size={16} className="text-[#a78bfa] flex-none" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-[#e8e8e8] font-semibold">{s.horas}h de sono</p>
                    <p className="text-[#555] text-xs">{new Date(s.data + 'T12:00:00').toLocaleDateString('pt-BR')}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: s.horas >= 7 ? 'rgba(74,222,128,0.1)' : s.horas >= 5 ? 'rgba(250,204,21,0.1)' : 'rgba(248,113,113,0.1)',
                      color: s.horas >= 7 ? '#4ade80' : s.horas >= 5 ? '#facc15' : '#f87171',
                    }}>
                    {s.horas >= 7 ? 'Bom' : s.horas >= 5 ? 'Ok' : 'Pouco'}
                  </span>
                  <button onClick={() => saveSonos(sonos.filter(x => x.id !== s.id))}
                    className="opacity-0 group-hover:opacity-100 text-[#444] hover:text-[#f87171] transition-all">
                    <Trash2 size={13} />
                  </button>
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
