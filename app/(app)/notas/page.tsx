'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Trash2, StickyNote, Edit2 } from 'lucide-react'

interface Nota {
  id: string
  titulo: string
  conteudo: string
  cor: string
  criadaEm: string
}

const CORES = ['#C9A84C','#4ade80','#60a5fa','#f87171','#a78bfa','#facc15','#38bdf8','#fb923c']

export default function NotasPage() {
  const [notas, setNotas]       = useState<Nota[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState<string | null>(null)
  const [titulo, setTitulo]     = useState('')
  const [conteudo, setConteudo] = useState('')
  const [cor, setCor]           = useState('#C9A84C')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_notas')
      if (saved) setNotas(JSON.parse(saved))
    } catch {}
  }, [])

  function save(list: Nota[]) {
    setNotas(list)
    localStorage.setItem('elysium_notas', JSON.stringify(list))
  }

  function openForm(nota?: Nota) {
    if (nota) {
      setEditId(nota.id); setTitulo(nota.titulo); setConteudo(nota.conteudo); setCor(nota.cor)
    } else {
      setEditId(null); setTitulo(''); setConteudo(''); setCor('#C9A84C')
    }
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false); setEditId(null); setTitulo(''); setConteudo('')
  }

  function saveNota() {
    if (!titulo.trim() && !conteudo.trim()) return
    if (editId) {
      save(notas.map(n => n.id === editId ? { ...n, titulo: titulo.trim() || 'Sem título', conteudo, cor } : n))
    } else {
      save([{ id: Date.now().toString(), titulo: titulo.trim() || 'Sem título', conteudo, cor, criadaEm: new Date().toISOString() }, ...notas])
    }
    closeForm()
  }

  return (
    <div className="space-y-5 page-enter">
      <div className="pt-1 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StickyNote size={18} className="text-[#C9A84C]" strokeWidth={1.5} />
            <h1 className="text-2xl font-semibold text-[#f0f0f0]">Notas</h1>
          </div>
          <p className="text-[#666] text-sm">{notas.length} nota{notas.length !== 1 ? 's' : ''} salva{notas.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => openForm()}
          className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
          style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)' }}>
          <Plus size={20} className="text-[#C9A84C]" />
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl p-5 space-y-4 animate-fade-slide-up"
          style={{ background:'rgba(255,255,255,0.025)', border:`1px solid ${cor}30` }}>
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider font-medium" style={{ color: cor }}>
              {editId ? 'Editar nota' : 'Nova nota'}
            </p>
            <button onClick={closeForm} className="text-[#555] hover:text-[#888] transition-colors">
              <X size={16} />
            </button>
          </div>
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}
            placeholder="Título (opcional)…"
            className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#444] outline-none"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px' }} />
          <textarea value={conteudo} onChange={e => setConteudo(e.target.value)}
            placeholder="Escreva sua nota aqui…"
            rows={5} className="w-full rounded-xl px-4 py-3 text-[#e0e0e0] placeholder-[#444] outline-none resize-none"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px' }} />
          <div className="flex gap-2 flex-wrap">
            {CORES.map(c => (
              <button key={c} onClick={() => setCor(c)}
                className="w-7 h-7 rounded-full transition-all active:scale-90"
                style={{ background: c, boxShadow: cor === c ? `0 0 0 2px #080808, 0 0 0 4px ${c}` : 'none' }} />
            ))}
          </div>
          <button onClick={saveNota}
            className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
            style={{ background: cor, color: '#080808' }}>
            {editId ? 'Salvar alterações' : 'Criar nota'}
          </button>
        </div>
      )}

      {notas.length === 0 && !showForm ? (
        <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #252525' }}>
          <StickyNote size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
          <p className="text-[#555] text-sm">Nenhuma nota ainda</p>
          <p className="text-[#3a3a3a] text-xs mt-1">Toque em + para escrever</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notas.map((nota, i) => (
            <div key={nota.id}
              className="rounded-2xl p-4 group animate-fade-slide-up relative"
              style={{
                background:'rgba(255,255,255,0.025)',
                borderTop: '1px solid #222',
                borderRight: '1px solid #222',
                borderBottom: '1px solid #222',
                borderLeft: `3px solid ${nota.cor}`,
                animationDelay:`${i * 40}ms`,
              }}>
              {nota.titulo && (
                <p className="font-semibold text-sm mb-2" style={{ color: nota.cor }}>{nota.titulo}</p>
              )}
              <p className="text-[#999] text-sm leading-relaxed whitespace-pre-wrap line-clamp-5">{nota.conteudo}</p>
              <p className="text-[#3a3a3a] text-[10px] mt-3">
                {new Date(nota.criadaEm).toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' })}
              </p>
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openForm(nota)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#555] hover:text-[#C9A84C] transition-colors"
                  style={{ background:'rgba(255,255,255,0.06)' }}>
                  <Edit2 size={12} />
                </button>
                <button onClick={() => save(notas.filter(n => n.id !== nota.id))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#555] hover:text-[#f87171] transition-colors"
                  style={{ background:'rgba(255,255,255,0.06)' }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
