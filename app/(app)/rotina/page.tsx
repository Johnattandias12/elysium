'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Trash2, CheckSquare, Dumbbell } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'

// ──────────────────────────── HÁBITOS ────────────────────────────
interface Habit {
  id: string
  nome: string
  icon: string
  cor: string
  done: boolean
  streak: number
}

// ──────────────────────────── TREINO ────────────────────────────
interface TreinoDay {
  dia: string
  treino: string
}

const TREINO_INICIAL: TreinoDay[] = [
  { dia: 'Segunda',  treino: '' },
  { dia: 'Terça',    treino: '' },
  { dia: 'Quarta',   treino: '' },
  { dia: 'Quinta',   treino: '' },
  { dia: 'Sexta',    treino: '' },
  { dia: 'Sábado',   treino: '' },
  { dia: 'Domingo',  treino: '' },
]

const ICONS = ['🧘','💪','📚','🥗','🌙','🏃','💧','🧹','💰','✍️']
const COLORS = ['#facc15','#f87171','#60a5fa','#4ade80','#a78bfa','#38bdf8','#fb923c','#f9a8d4']

export default function RotinaPage() {
  const [tab, setTab]             = useState<'habitos' | 'tarefas' | 'treino'>('habitos')
  const [habits, setHabits]       = useState<Habit[]>([])
  const [treino, setTreino]       = useState<TreinoDay[]>(TREINO_INICIAL)
  const [showForm, setShowForm]   = useState(false)
  const [nome, setNome]           = useState('')
  const [icon, setIcon]           = useState('💪')
  const [cor, setCor]             = useState('#facc15')
  const [editIdx, setEditIdx]     = useState<number | null>(null)

  useEffect(() => {
    try {
      const h = localStorage.getItem('elysium_habits')
      const t = localStorage.getItem('elysium_treino')
      if (h) setHabits(JSON.parse(h))
      if (t) setTreino(JSON.parse(t))
    } catch {}
  }, [])

  function saveHabits(list: Habit[]) {
    setHabits(list)
    localStorage.setItem('elysium_habits', JSON.stringify(list))
  }

  function addHabit() {
    if (!nome.trim()) return
    const novo: Habit = { id: Date.now().toString(), nome: nome.trim(), icon, cor, done: false, streak: 0 }
    saveHabits([...habits, novo])
    setNome(''); setIcon('💪'); setCor('#facc15'); setShowForm(false)
  }

  function toggleHabit(id: string) {
    saveHabits(habits.map(h => h.id === id ? { ...h, done: !h.done, streak: !h.done ? h.streak + 1 : Math.max(0, h.streak - 1) } : h))
  }

  function removeHabit(id: string) {
    saveHabits(habits.filter(h => h.id !== id))
  }

  function updateTreino(idx: number, value: string) {
    const updated = treino.map((t, i) => i === idx ? { ...t, treino: value } : t)
    setTreino(updated)
    localStorage.setItem('elysium_treino', JSON.stringify(updated))
  }

  const doneCount = habits.filter(h => h.done).length
  const todayDay  = new Date().getDay() // 0=Dom
  const todayIdx  = todayDay === 0 ? 6 : todayDay - 1 // map to Mon=0

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Rotina" subtitle="Hábitos & treinos" accent="#facc15"
        action={
          tab === 'habitos' ? (
            <button onClick={() => setShowForm(v => !v)}
              className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
              style={{ background:'rgba(250,204,21,0.1)', border:'1px solid rgba(250,204,21,0.2)' }}>
              {showForm ? <X size={20} className="text-[#facc15]" /> : <Plus size={20} className="text-[#facc15]" />}
            </button>
          ) : null
        }
      />

      {/* tabs */}
      <div className="flex bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-1 gap-1">
        {(['habitos', 'tarefas', 'treino'] as const).map(t => {
          const labels: Record<typeof t, string> = { habitos:'Hábitos', tarefas:'Checklist', treino:'Treino' }
          return (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
              style={{
                background: tab === t ? 'rgba(250,204,21,0.08)' : 'transparent',
                color: tab === t ? '#facc15' : '#333',
                borderBottom: tab === t ? '1px solid rgba(250,204,21,0.2)' : '1px solid transparent',
              }}>
              {labels[t]}{t === 'habitos' && habits.length > 0 ? ` (${doneCount}/${habits.length})` : ''}
            </button>
          )
        })}
      </div>

      {/* ── HÁBITOS ── */}
      {tab === 'habitos' && (
        <>
          {showForm && (
            <div className="rounded-2xl p-5 space-y-3 animate-fade-slide-up"
              style={{ background:'rgba(250,204,21,0.04)', border:'1px solid rgba(250,204,21,0.15)' }}>
              <p className="text-xs text-[#facc15] uppercase tracking-wider font-medium">Novo hábito</p>
              <div className="flex gap-2 flex-wrap">
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setIcon(ic)}
                    className="w-9 h-9 rounded-xl text-lg transition-all"
                    style={{ background: icon === ic ? 'rgba(250,204,21,0.2)' : 'rgba(255,255,255,0.03)', border: icon === ic ? '1px solid rgba(250,204,21,0.4)' : '1px solid transparent' }}>
                    {ic}
                  </button>
                ))}
              </div>
              <input
                type="text" value={nome} onChange={e => setNome(e.target.value)}
                placeholder="Nome do hábito…"
                className="w-full h-11 rounded-xl px-4 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
                onFocus={e => { e.currentTarget.style.border='1px solid rgba(250,204,21,0.4)' }}
                onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
              />
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setCor(c)}
                    className="w-7 h-7 rounded-full transition-all"
                    style={{ background: c, boxShadow: cor === c ? `0 0 0 2px #080808, 0 0 0 4px ${c}` : 'none' }} />
                ))}
              </div>
              <button onClick={addHabit} disabled={!nome.trim()}
                className="w-full h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.97]"
                style={{ background: nome.trim() ? '#facc15' : 'rgba(255,255,255,0.04)', color: nome.trim() ? '#080808' : '#333' }}>
                Adicionar hábito
              </button>
            </div>
          )}

          {habits.length === 0 ? (
            <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #1e1e1e' }}>
              <CheckSquare size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
              <p className="text-[#333] text-sm">Nenhum hábito cadastrado</p>
              <p className="text-[#222] text-xs mt-1">Toque em + para adicionar</p>
            </div>
          ) : (
            <>
              {/* progress */}
              {habits.length > 0 && (
                <div className="rounded-2xl p-4"
                  style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1e1e1e' }}>
                  <div className="flex justify-between mb-2">
                    <p className="text-xs text-[#444] uppercase tracking-wider">Hoje</p>
                    <span className="text-sm font-semibold text-[#facc15]">{doneCount}/{habits.length}</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width:`${habits.length ? doneCount/habits.length*100 : 0}%`, background:'linear-gradient(90deg,#facc15,#f97316)', boxShadow:'0 0 10px rgba(250,204,21,0.4)' }} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {habits.map((h, i) => (
                  <div key={h.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 group animate-fade-slide-up cursor-pointer transition-all"
                    style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${h.done ? h.cor + '20' : '#1a1a1a'}`, animationDelay:`${i*40}ms` }}
                    onClick={() => toggleHabit(h.id)}>
                    <div className="text-xl flex-none">{h.icon}</div>
                    <div className="flex-1">
                      <p className="text-[#e0e0e0] text-sm font-medium"
                        style={{ textDecoration: h.done ? 'line-through' : 'none', opacity: h.done ? 0.5 : 1 }}>
                        {h.nome}
                      </p>
                      {h.streak > 0 && (
                        <p className="text-xs mt-0.5" style={{ color: h.cor }}>🔥 {h.streak} dia{h.streak !== 1 ? 's' : ''}</p>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none transition-all"
                      style={{
                        borderColor: h.done ? h.cor : '#2a2a2a',
                        background: h.done ? h.cor : 'transparent',
                      }}>
                      {h.done && <span className="text-[10px] text-[#080808] font-bold">✓</span>}
                    </div>
                    <button onClick={e => { e.stopPropagation(); removeHabit(h.id) }}
                      className="opacity-0 group-hover:opacity-100 text-[#333] hover:text-[#f87171] transition-all ml-1">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* ── CHECKLIST ── */}
      {tab === 'tarefas' && (
        <SimpleChecklist />
      )}

      {/* ── TREINO ── */}
      {tab === 'treino' && (
        <div className="space-y-3">
          <p className="text-xs text-[#555] uppercase tracking-wider font-medium">
            Plano semanal
          </p>
          {treino.map((t, i) => {
            const isToday = i === todayIdx
            return (
              <div key={t.dia}
                className="rounded-xl overflow-hidden transition-all"
                style={{
                  border: isToday ? '1px solid rgba(250,204,21,0.25)' : '1px solid #222',
                  background: isToday ? 'rgba(250,204,21,0.03)' : 'rgba(255,255,255,0.025)',
                }}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-20 flex-none">
                    <p className="text-sm font-medium" style={{ color: isToday ? '#facc15' : '#e0e0e0' }}>
                      {t.dia}
                    </p>
                    {isToday && <p className="text-[10px] text-[#facc15] opacity-60">Hoje</p>}
                  </div>
                  {editIdx === i ? (
                    <input autoFocus
                      type="text" value={t.treino}
                      onChange={e => updateTreino(i, e.target.value)}
                      onBlur={() => setEditIdx(null)}
                      onKeyDown={e => e.key === 'Enter' && setEditIdx(null)}
                      placeholder="Ex: Peito + Tríceps, Descanso…"
                      className="flex-1 h-9 rounded-lg px-3 text-[#e0e0e0] placeholder-[#444] outline-none text-sm"
                      style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(250,204,21,0.3)', fontSize:'16px' }}
                    />
                  ) : (
                    <button onClick={() => setEditIdx(i)}
                      className="flex-1 text-left text-sm transition-colors"
                      style={{ color: t.treino ? '#e0e0e0' : '#333' }}>
                      {t.treino || 'Tocar para definir…'}
                    </button>
                  )}
                  <Dumbbell size={14} style={{ color: t.treino ? '#facc15' : '#333', flexShrink:0 }} strokeWidth={1.5} />
                </div>
              </div>
            )
          })}

          {/* checklist de exercícios de hoje */}
          <div className="mt-2">
            <p className="text-xs text-[#555] uppercase tracking-wider font-medium mb-2">Exercícios de hoje</p>
            <ExerciciosChecklist />
          </div>
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}

// ──────────────────────────── CHECKLIST EXERCÍCIOS ────────────────────────────
interface Exercicio { id: string; nome: string; done: boolean }

function ExerciciosChecklist() {
  const todayKey = `elysium_exercicios_${new Date().toISOString().slice(0,10)}`
  const [items, setItems]     = useState<Exercicio[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [input, setInput]     = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(todayKey)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [todayKey])

  function save(list: Exercicio[]) {
    setItems(list)
    localStorage.setItem(todayKey, JSON.stringify(list))
  }

  function add() {
    if (!input.trim()) return
    save([...items, { id: Date.now().toString(), nome: input.trim(), done: false }])
    setInput('')
  }

  const done = items.filter(i => i.done).length

  return (
    <div className="rounded-xl p-3 space-y-2" style={{ background:'rgba(250,204,21,0.03)', border:'1px solid rgba(250,204,21,0.12)' }}>
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#facc15] font-medium">
          {done}/{items.length} exercícios
        </p>
        <button onClick={() => setShowAdd(v => !v)}
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background:'rgba(250,204,21,0.1)', border:'1px solid rgba(250,204,21,0.2)' }}>
          {showAdd ? <X size={12} className="text-[#facc15]" /> : <Plus size={12} className="text-[#facc15]" />}
        </button>
      </div>

      {showAdd && (
        <div className="flex gap-2">
          <input autoFocus type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Ex: Supino, Agachamento…"
            className="flex-1 h-9 rounded-lg px-3 text-[#e0e0e0] placeholder-[#444] outline-none text-sm"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid #2a2a2a', fontSize:'16px' }} />
          <button onClick={add}
            className="px-3 h-9 rounded-lg text-xs font-semibold"
            style={{ background:'rgba(250,204,21,0.12)', color:'#facc15' }}>OK</button>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-[#333] text-xs text-center py-1">Nenhum exercício — toque em + para adicionar</p>
      ) : (
        <div className="space-y-1.5">
          {items.map(ex => (
            <div key={ex.id} className="flex items-center gap-2 group cursor-pointer"
              onClick={() => save(items.map(x => x.id === ex.id ? { ...x, done: !x.done } : x))}>
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-none transition-all"
                style={{ borderColor: ex.done ? '#facc15' : '#333', background: ex.done ? '#facc15' : 'transparent' }}>
                {ex.done && <span className="text-[8px] text-[#080808] font-bold">✓</span>}
              </div>
              <span className="flex-1 text-sm" style={{ color: ex.done ? '#444' : '#e0e0e0', textDecoration: ex.done ? 'line-through' : 'none' }}>
                {ex.nome}
              </span>
              <button onClick={e => { e.stopPropagation(); save(items.filter(x => x.id !== ex.id)) }}
                className="opacity-0 group-hover:opacity-100 text-[#333] hover:text-[#f87171] transition-all">
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────── CHECKLIST SIMPLES ────────────────────────────
interface Task {
  id: string
  title: string
  done: boolean
}

function SimpleChecklist() {
  const [tasks, setTasks]     = useState<Task[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle]     = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_checklist')
      if (saved) setTasks(JSON.parse(saved))
    } catch {}
  }, [])

  function save(list: Task[]) {
    setTasks(list)
    localStorage.setItem('elysium_checklist', JSON.stringify(list))
  }

  function add() {
    if (!title.trim()) return
    save([...tasks, { id: Date.now().toString(), title: title.trim(), done: false }])
    setTitle(''); setShowAdd(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#444] uppercase tracking-wider font-medium">
          Tarefas ({tasks.filter(t => t.done).length}/{tasks.length})
        </p>
        <button onClick={() => setShowAdd(v => !v)}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background:'rgba(250,204,21,0.08)', border:'1px solid rgba(250,204,21,0.15)' }}>
          {showAdd ? <X size={14} className="text-[#facc15]" /> : <Plus size={14} className="text-[#facc15]" />}
        </button>
      </div>

      {showAdd && (
        <div className="flex gap-2 animate-fade-slide-up">
          <input
            autoFocus type="text" value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Nova tarefa…"
            className="flex-1 h-10 rounded-xl px-3 text-[#e0e0e0] placeholder-[#2a2a2a] outline-none text-sm"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
            onFocus={e => { e.currentTarget.style.border='1px solid rgba(250,204,21,0.4)' }}
            onBlur={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)' }}
          />
          <button onClick={add}
            className="px-4 h-10 rounded-xl text-xs font-semibold"
            style={{ background:'rgba(250,204,21,0.12)', color:'#facc15', border:'1px solid rgba(250,204,21,0.2)' }}>
            OK
          </button>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="rounded-2xl p-8 text-center" style={{ border:'1px dashed #1e1e1e' }}>
          <CheckSquare size={32} className="mx-auto mb-3 text-[#2a2a2a]" strokeWidth={1} />
          <p className="text-[#333] text-sm">Nenhuma tarefa</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t, i) => (
            <div key={t.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3 group transition-all cursor-pointer animate-fade-slide-up"
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1a1a1a', animationDelay:`${i*30}ms` }}
              onClick={() => save(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-none transition-all"
                style={{ borderColor: t.done ? '#facc15' : '#2a2a2a', background: t.done ? '#facc15' : 'transparent' }}>
                {t.done && <span className="text-[8px] text-[#080808] font-bold">✓</span>}
              </div>
              <span className="flex-1 text-sm" style={{ color: t.done ? '#333' : '#e0e0e0', textDecoration: t.done ? 'line-through' : 'none' }}>
                {t.title}
              </span>
              <button onClick={e => { e.stopPropagation(); save(tasks.filter(x => x.id !== t.id)) }}
                className="opacity-0 group-hover:opacity-100 text-[#333] hover:text-[#f87171] transition-all">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          {tasks.some(t => t.done) && (
            <button onClick={() => save(tasks.filter(t => !t.done))}
              className="text-xs text-[#2a2a2a] hover:text-[#444] transition-colors w-full text-center py-2">
              Limpar concluídas
            </button>
          )}
        </div>
      )}
    </div>
  )
}
