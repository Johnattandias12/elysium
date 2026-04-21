'use client'
import { useState, useEffect } from 'react'
import { Plus, PiggyBank, TrendingUp, Trash2, Target, X } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'

interface Deposito {
  id: string
  valor: number
  descricao: string
  data: string
}

const DEFAULT_META = 10000

export default function FinancasPage() {
  const [depositos, setDepositos]   = useState<Deposito[]>([])
  const [meta, setMeta]             = useState(DEFAULT_META)
  const [showForm, setShowForm]     = useState(false)
  const [showMetaForm, setShowMetaForm] = useState(false)
  const [valor, setValor]           = useState('')
  const [descricao, setDescricao]   = useState('')
  const [novaMeta, setNovaMeta]     = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_depositos')
      const savedMeta = localStorage.getItem('elysium_meta_caixa')
      if (saved) setDepositos(JSON.parse(saved))
      if (savedMeta) setMeta(Number(savedMeta))
    } catch {}
  }, [])

  function saveDepositos(list: Deposito[]) {
    setDepositos(list)
    localStorage.setItem('elysium_depositos', JSON.stringify(list))
  }

  function addDeposito() {
    const v = parseFloat(valor.replace(',', '.'))
    if (!v || v <= 0) return
    const novo: Deposito = {
      id: Date.now().toString(),
      valor: v,
      descricao: descricao || 'Depósito',
      data: new Date().toLocaleDateString('pt-BR'),
    }
    saveDepositos([novo, ...depositos])
    setValor('')
    setDescricao('')
    setShowForm(false)
  }

  function removeDeposito(id: string) {
    saveDepositos(depositos.filter(d => d.id !== id))
  }

  function saveMeta() {
    const v = parseFloat(novaMeta.replace(',', '.'))
    if (!v || v <= 0) return
    setMeta(v)
    localStorage.setItem('elysium_meta_caixa', String(v))
    setNovaMeta('')
    setShowMetaForm(false)
  }

  const total = depositos.reduce((s, d) => s + d.valor, 0)
  const pct   = Math.min(total / meta * 100, 100)

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Meu Caixa" subtitle="Poupança acumulada" accent="#4ade80"
        action={
          <button onClick={() => setShowForm(v => !v)}
            className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            {showForm ? <X size={20} className="text-[#4ade80]" /> : <Plus size={20} className="text-[#4ade80]" />}
          </button>
        }
      />

      {/* form de depósito */}
      {showForm && (
        <div className="rounded-2xl p-5 space-y-3 animate-fade-slide-up"
          style={{ background:'rgba(74,222,128,0.04)', border:'1px solid rgba(74,222,128,0.15)' }}>
          <p className="text-xs text-[#4ade80] uppercase tracking-wider font-medium">Novo depósito</p>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4ade80] text-sm font-semibold">R$</span>
            <input
              type="number" inputMode="decimal" value={valor}
              onChange={e => setValor(e.target.value)}
              placeholder="0,00" step="0.01" min="0.01"
              className="w-full h-11 rounded-xl pl-10 pr-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none transition-all duration-200"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
              onFocus={e => { e.currentTarget.style.border='1px solid rgba(74,222,128,0.4)' }}
              onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <input
            type="text" value={descricao}
            onChange={e => setDescricao(e.target.value)}
            placeholder="Descrição (ex: salário, freelance…)"
            className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none transition-all duration-200"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
            onFocus={e => { e.currentTarget.style.border='1px solid rgba(74,222,128,0.4)' }}
            onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
          />
          <button onClick={addDeposito}
            disabled={!valor}
            className="w-full h-11 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
            style={{
              background: valor ? '#4ade80' : 'rgba(255,255,255,0.04)',
              color: valor ? '#080808' : '#333',
            }}>
            Confirmar depósito
          </button>
        </div>
      )}

      {/* card principal — saldo */}
      <div className="rounded-2xl p-6 text-center relative overflow-hidden"
        style={{
          background:'linear-gradient(160deg,rgba(74,222,128,0.07) 0%,rgba(74,222,128,0.02) 100%)',
          border:'1px solid rgba(74,222,128,0.12)',
        }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:'radial-gradient(circle,#4ade80 1px,transparent 1px)',
            backgroundSize:'24px 24px',
          }} />
        <PiggyBank size={28} className="mx-auto mb-3" style={{ color:'#4ade80', opacity:0.6 }} strokeWidth={1.5} />
        <p className="text-xs text-[#444] uppercase tracking-widest mb-1">Total em caixa</p>
        <p className="text-5xl font-semibold text-[#f0f0f0] mb-1">
          {total.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}
        </p>
        <p className="text-xs text-[#4ade80]">
          {pct.toFixed(1)}% da meta de {meta.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}
        </p>

        {/* barra de progresso */}
        <div className="mt-4 h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg,#22c55e,#4ade80)',
              boxShadow: '0 0 10px rgba(74,222,128,0.5)',
            }} />
        </div>

        {/* alterar meta */}
        <button onClick={() => setShowMetaForm(v => !v)}
          className="mt-3 flex items-center gap-1.5 mx-auto text-xs text-[#333] hover:text-[#4ade80] transition-colors">
          <Target size={12} />
          Alterar meta ({meta.toLocaleString('pt-BR', { style:'currency', currency:'BRL', maximumFractionDigits:0 })})
        </button>

        {showMetaForm && (
          <div className="mt-3 flex gap-2 animate-fade-slide-up">
            <input
              type="number" inputMode="decimal" value={novaMeta}
              onChange={e => setNovaMeta(e.target.value)}
              placeholder="Nova meta em R$"
              className="flex-1 h-9 rounded-xl px-3 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none text-sm"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(74,222,128,0.3)', fontSize:'16px' }}
            />
            <button onClick={saveMeta}
              className="px-4 h-9 rounded-xl text-xs font-semibold"
              style={{ background:'rgba(74,222,128,0.15)', color:'#4ade80', border:'1px solid rgba(74,222,128,0.25)' }}>
              OK
            </button>
          </div>
        )}
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4"
          style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1e1e1e' }}>
          <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Depósitos</p>
          <p className="text-2xl font-semibold text-[#f0f0f0]">{depositos.length}</p>
          <p className="text-xs text-[#333] mt-0.5">registros</p>
        </div>
        <div className="rounded-2xl p-4"
          style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1e1e1e' }}>
          <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Falta guardar</p>
          <p className="text-2xl font-semibold text-[#f0f0f0]">
            {Math.max(0, meta - total).toLocaleString('pt-BR', { style:'currency', currency:'BRL', maximumFractionDigits:0 })}
          </p>
          <p className="text-xs text-[#333] mt-0.5">para a meta</p>
        </div>
      </div>

      {/* histórico */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#444] uppercase tracking-wider font-medium">Histórico</p>
          {depositos.length > 0 && (
            <span className="text-xs text-[#333]">{depositos.length} depósito{depositos.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {depositos.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #1e1e1e' }}>
            <PiggyBank size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
            <p className="text-[#333] text-sm">Nenhum depósito ainda</p>
            <p className="text-[#222] text-xs mt-1">Toque em + para registrar o primeiro</p>
          </div>
        ) : (
          <div className="space-y-2">
            {depositos.map((d, i) => (
              <div key={d.id}
                className="flex items-center gap-3 rounded-xl px-4 py-3 animate-fade-slide-up group"
                style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1a1a1a', animationDelay:`${i*40}ms` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-none"
                  style={{ background:'rgba(74,222,128,0.08)', border:'1px solid rgba(74,222,128,0.1)' }}>
                  <TrendingUp size={15} className="text-[#4ade80]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#e0e0e0] text-sm font-medium truncate">{d.descricao}</p>
                  <p className="text-[#333] text-xs">{d.data}</p>
                </div>
                <p className="text-[#4ade80] font-semibold text-sm flex-none">
                  +{d.valor.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}
                </p>
                <button onClick={() => removeDeposito(d.id)}
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
