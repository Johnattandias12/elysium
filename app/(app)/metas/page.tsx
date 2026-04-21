'use client'
import { useState, useEffect } from 'react'
import { Target, Plus, X, Trash2, CheckCircle } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'

interface Meta {
  id: string
  titulo: string
  descricao: string
  valorAtual: number
  valorMeta: number
  unidade: string
  cor: string
  concluida: boolean
}

const CORES = [
  { label: 'Ouro',    value: '#C9A84C' },
  { label: 'Verde',   value: '#4ade80' },
  { label: 'Azul',    value: '#60a5fa' },
  { label: 'Roxo',    value: '#a78bfa' },
  { label: 'Laranja', value: '#fb923c' },
  { label: 'Rosa',    value: '#f87171' },
]

const EXEMPLOS = [
  'Peso ideal (kg)', 'Dias na academia por semana', 'Dinheiro guardado (R$)',
  'Livros lidos', 'Horas de estudo', 'km corridos',
]

export default function MetasPage() {
  const [metas, setMetas]       = useState<Meta[]>([])
  const [showForm, setShowForm] = useState(false)
  const [titulo, setTitulo]     = useState('')
  const [descricao, setDescricao] = useState('')
  const [valorMeta, setValorMeta] = useState('')
  const [valorAtual, setValorAtual] = useState('')
  const [unidade, setUnidade]   = useState('')
  const [cor, setCor]           = useState('#C9A84C')
  const [editId, setEditId]     = useState<string | null>(null)
  const [editVal, setEditVal]   = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_metas')
      if (saved) setMetas(JSON.parse(saved))
    } catch {}
  }, [])

  function saveMetas(list: Meta[]) {
    setMetas(list)
    localStorage.setItem('elysium_metas', JSON.stringify(list))
  }

  function addMeta() {
    if (!titulo.trim() || !valorMeta) return
    const nova: Meta = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      valorAtual: parseFloat(valorAtual.replace(',', '.')) || 0,
      valorMeta: parseFloat(valorMeta.replace(',', '.')) || 1,
      unidade: unidade.trim(),
      cor,
      concluida: false,
    }
    saveMetas([...metas, nova])
    setTitulo(''); setDescricao(''); setValorMeta(''); setValorAtual(''); setUnidade(''); setCor('#C9A84C')
    setShowForm(false)
  }

  function updateProgress(id: string, newVal: number) {
    saveMetas(metas.map(m => {
      if (m.id !== id) return m
      const concluida = newVal >= m.valorMeta
      return { ...m, valorAtual: newVal, concluida }
    }))
    setEditId(null)
    setEditVal('')
  }

  function removeMeta(id: string) {
    saveMetas(metas.filter(m => m.id !== id))
  }

  const ativas    = metas.filter(m => !m.concluida)
  const concluidas = metas.filter(m => m.concluida)

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Metas" subtitle="Seus objetivos pessoais" accent="#a78bfa"
        action={
          <button onClick={() => setShowForm(v => !v)}
            className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background:'rgba(167,139,250,0.1)', border:'1px solid rgba(167,139,250,0.2)' }}>
            {showForm ? <X size={20} className="text-[#a78bfa]" /> : <Plus size={20} className="text-[#a78bfa]" />}
          </button>
        }
      />

      {/* form */}
      {showForm && (
        <div className="rounded-2xl p-5 space-y-3 animate-fade-slide-up"
          style={{ background:'rgba(167,139,250,0.04)', border:'1px solid rgba(167,139,250,0.15)' }}>
          <p className="text-xs text-[#a78bfa] uppercase tracking-wider font-medium">Nova meta</p>

          <input
            type="text" value={titulo} onChange={e => setTitulo(e.target.value)}
            placeholder="Ex: Peso ideal, Dinheiro guardado…"
            list="exemplos-metas"
            className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
            onFocus={e => { e.currentTarget.style.border='1px solid rgba(167,139,250,0.4)' }}
            onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
          />
          <datalist id="exemplos-metas">
            {EXEMPLOS.map(ex => <option key={ex} value={ex} />)}
          </datalist>

          <input
            type="text" value={descricao} onChange={e => setDescricao(e.target.value)}
            placeholder="Descrição (opcional)"
            className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
            onFocus={e => { e.currentTarget.style.border='1px solid rgba(167,139,250,0.4)' }}
            onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              type="number" inputMode="decimal" value={valorAtual} onChange={e => setValorAtual(e.target.value)}
              placeholder="Atual"
              className="h-11 rounded-xl px-3 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none text-sm"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
              onFocus={e => { e.currentTarget.style.border='1px solid rgba(167,139,250,0.4)' }}
              onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
            />
            <input
              type="number" inputMode="decimal" value={valorMeta} onChange={e => setValorMeta(e.target.value)}
              placeholder="Meta"
              className="h-11 rounded-xl px-3 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none text-sm"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
              onFocus={e => { e.currentTarget.style.border='1px solid rgba(167,139,250,0.4)' }}
              onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
            />
            <input
              type="text" value={unidade} onChange={e => setUnidade(e.target.value)}
              placeholder="Unidade"
              className="h-11 rounded-xl px-3 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none text-sm"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
              onFocus={e => { e.currentTarget.style.border='1px solid rgba(167,139,250,0.4)' }}
              onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
            />
          </div>

          {/* cores */}
          <div>
            <p className="text-xs text-[#333] mb-2">Cor</p>
            <div className="flex gap-2">
              {CORES.map(c => (
                <button key={c.value} onClick={() => setCor(c.value)}
                  className="w-7 h-7 rounded-full transition-all"
                  style={{ background: c.value, boxShadow: cor === c.value ? `0 0 0 2px #080808, 0 0 0 4px ${c.value}` : 'none' }} />
              ))}
            </div>
          </div>

          <button onClick={addMeta} disabled={!titulo.trim() || !valorMeta}
            className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
            style={{
              background: (titulo.trim() && valorMeta) ? '#a78bfa' : 'rgba(255,255,255,0.04)',
              color: (titulo.trim() && valorMeta) ? '#080808' : '#333',
            }}>
            Criar meta
          </button>
        </div>
      )}

      {/* stats */}
      {metas.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl p-3 text-center" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1e1e1e' }}>
            <p className="text-2xl font-semibold text-[#f0f0f0]">{metas.length}</p>
            <p className="text-[10px] text-[#333] uppercase tracking-wider mt-0.5">Total</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1e1e1e' }}>
            <p className="text-2xl font-semibold text-[#f0f0f0]">{ativas.length}</p>
            <p className="text-[10px] text-[#333] uppercase tracking-wider mt-0.5">Ativas</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1e1e1e' }}>
            <p className="text-2xl font-semibold text-[#4ade80]">{concluidas.length}</p>
            <p className="text-[10px] text-[#333] uppercase tracking-wider mt-0.5">Concluídas</p>
          </div>
        </div>
      )}

      {/* lista de metas ativas */}
      {ativas.length === 0 && metas.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ border:'1px dashed #1e1e1e' }}>
          <Target size={36} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
          <p className="text-[#333] text-sm">Nenhuma meta cadastrada</p>
          <p className="text-[#222] text-xs mt-1">Toque em + para definir seus objetivos</p>
        </div>
      ) : (
        <>
          {ativas.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-[#444] uppercase tracking-wider font-medium">Em andamento</p>
              {ativas.map((m, i) => {
                const pct = Math.min(m.valorAtual / m.valorMeta * 100, 100)
                return (
                  <div key={m.id} className="rounded-2xl p-5 animate-fade-slide-up"
                    style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${m.cor}18`, animationDelay:`${i*50}ms` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="w-2 h-2 rounded-full flex-none" style={{ background: m.cor }} />
                          <p className="text-[#e0e0e0] font-medium text-sm">{m.titulo}</p>
                        </div>
                        {m.descricao && <p className="text-xs text-[#333] pl-4">{m.descricao}</p>}
                      </div>
                      <button onClick={() => removeMeta(m.id)}
                        className="text-[#2a2a2a] hover:text-[#f87171] transition-colors ml-2">
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* progress */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-semibold" style={{ color: m.cor }}>
                        {m.valorAtual}{m.unidade && <span className="text-sm font-normal text-[#444] ml-1">{m.unidade}</span>}
                      </span>
                      <span className="text-xs text-[#333]">meta: {m.valorMeta}{m.unidade}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden mb-3">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width:`${pct}%`, background: m.cor, boxShadow:`0 0 8px ${m.cor}60` }} />
                    </div>
                    <div className="flex items-center gap-2">
                      {editId === m.id ? (
                        <>
                          <input
                            autoFocus type="number" inputMode="decimal" value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && updateProgress(m.id, parseFloat(editVal.replace(',', '.')) || m.valorAtual)}
                            placeholder="Novo valor…"
                            className="flex-1 h-9 rounded-xl px-3 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none text-sm"
                            style={{ background:'rgba(255,255,255,0.06)', border:`1px solid ${m.cor}40`, fontSize:'16px' }}
                          />
                          <button onClick={() => updateProgress(m.id, parseFloat(editVal.replace(',', '.')) || m.valorAtual)}
                            className="px-4 h-9 rounded-xl text-xs font-semibold"
                            style={{ background:`${m.cor}20`, color: m.cor, border:`1px solid ${m.cor}30` }}>
                            OK
                          </button>
                          <button onClick={() => { setEditId(null); setEditVal('') }}
                            className="px-3 h-9 rounded-xl text-xs text-[#333]">
                            ✕
                          </button>
                        </>
                      ) : (
                        <button onClick={() => { setEditId(m.id); setEditVal(String(m.valorAtual)) }}
                          className="text-xs transition-colors"
                          style={{ color:`${m.cor}80` }}>
                          ✏️ Atualizar progresso
                        </button>
                      )}
                      <span className="ml-auto text-xs font-semibold" style={{ color: m.cor }}>
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {concluidas.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-[#444] uppercase tracking-wider font-medium">Conquistadas 🏆</p>
              {concluidas.map(m => (
                <div key={m.id}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 group"
                  style={{ background:'rgba(74,222,128,0.03)', border:'1px solid rgba(74,222,128,0.12)' }}>
                  <CheckCircle size={18} className="text-[#4ade80] flex-none" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-[#888] text-sm line-through">{m.titulo}</p>
                    <p className="text-xs text-[#4ade80]">{m.valorMeta}{m.unidade} alcançado!</p>
                  </div>
                  <button onClick={() => removeMeta(m.id)}
                    className="opacity-0 group-hover:opacity-100 text-[#333] hover:text-[#f87171] transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="h-2" />
    </div>
  )
}
