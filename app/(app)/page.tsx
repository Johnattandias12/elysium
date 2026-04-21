'use client'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TrendingUp, BookOpen, Heart, CheckSquare, Target, FolderOpen, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const MODULES = [
  { href: '/financas',  label: 'Caixa',    icon: TrendingUp,  color: '#4ade80', desc: 'Poupança acumulada' },
  { href: '/estudos',   label: 'Estudos',  icon: BookOpen,    color: '#60a5fa', desc: 'Registro de aprendizado' },
  { href: '/saude',     label: 'Saúde',    icon: Heart,       color: '#f87171', desc: 'Corpo e bem-estar' },
  { href: '/rotina',    label: 'Rotina',   icon: CheckSquare, color: '#facc15', desc: 'Hábitos e treinos' },
  { href: '/metas',     label: 'Metas',    icon: Target,      color: '#a78bfa', desc: 'Seus objetivos' },
  { href: '/projetos',  label: 'Projetos', icon: FolderOpen,  color: '#38bdf8', desc: 'Ecossistema Beyonder' },
]

const INSIGHTS = [
  { icon: '💡', title: 'Consistência é tudo', body: 'Pequenas ações diárias somadas geram grandes transformações. Foque no processo, não só no resultado.' },
  { icon: '💰', title: 'Guardar é um hábito', body: 'Separe ao menos 10% de toda entrada para o seu caixa. O futuro você vai agradecer.' },
  { icon: '📚', title: 'Uma hora por dia', body: 'Estudando 1h/dia por um ano, você acumula mais de 365 horas de conhecimento em uma área.' },
  { icon: '💪', title: 'Treino sem desculpas', body: 'Defina seu plano semanal e comprometa-se com ele. Disciplina supera motivação todo dia.' },
  { icon: '🎯', title: 'Metas com números', body: 'Metas vagas ficam no papel. Coloque um valor e prazo: "R$ 10.000 em 6 meses" é acionável.' },
  { icon: '🌙', title: 'Sono é produtividade', body: '7-8 horas de sono melhoram memória, foco e disposição para o dia seguinte.' },
]

export default function DashboardPage() {
  const [userName, setUserName]   = useState('')
  const [photo, setPhoto]         = useState<string | null>(null)
  const [insightIdx, setInsightIdx] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const today       = new Date()
  const greeting    = today.getHours() < 12 ? 'Bom dia' : today.getHours() < 18 ? 'Boa tarde' : 'Boa noite'
  const dateStr     = format(today, "EEEE, d 'de' MMMM", { locale: ptBR })

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setUserName(user.email.split('@')[0])
    })
    try {
      const savedPhoto = localStorage.getItem('elysium_photo')
      const savedNome  = localStorage.getItem('elysium_nome')
      if (savedPhoto) setPhoto(savedPhoto)
      if (savedNome)  setUserName(savedNome)
    } catch {}

    // auto-advance insights
    const t = setInterval(() => {
      setInsightIdx(i => (i + 1) % INSIGHTS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  function prevInsight() { setInsightIdx(i => (i - 1 + INSIGHTS.length) % INSIGHTS.length) }
  function nextInsight() { setInsightIdx(i => (i + 1) % INSIGHTS.length) }

  const ins = INSIGHTS[insightIdx]

  return (
    <div className="space-y-6 page-enter">

      {/* header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[#333] text-xs capitalize tracking-wide">{dateStr}</p>
          <h1 className="text-2xl font-semibold text-[#f0f0f0] mt-0.5">
            {greeting}{userName ? `, ${userName.split(' ')[0]}` : ''}
          </h1>
        </div>
        <Link href="/configuracoes">
          <div className="w-11 h-11 rounded-2xl overflow-hidden flex items-center justify-center font-semibold text-[#C9A84C] text-sm transition-all active:scale-90"
            style={{ background: photo ? 'transparent' : 'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)' }}>
            {photo
              ? <img src={photo} alt="foto" className="w-full h-full object-cover" />
              : (userName || '?').slice(0, 2).toUpperCase()}
          </div>
        </Link>
      </div>

      {/* carrossel de insights */}
      <div className="relative rounded-2xl p-5 overflow-hidden"
        style={{ background:'linear-gradient(135deg,rgba(201,168,76,0.06) 0%,rgba(201,168,76,0.02) 100%)', border:'1px solid rgba(201,168,76,0.12)' }}>
        {/* dots bg */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:'radial-gradient(circle,#C9A84C 1px,transparent 1px)', backgroundSize:'20px 20px' }} />

        <div className="relative flex items-start gap-4">
          <span className="text-3xl flex-none">{ins.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb size={12} className="text-[#C9A84C]" strokeWidth={1.5} />
              <p className="text-xs text-[#C9A84C] uppercase tracking-wider font-medium">Insight</p>
            </div>
            <p className="text-[#e0e0e0] font-semibold text-sm mb-1">{ins.title}</p>
            <p className="text-[#444] text-xs leading-relaxed">{ins.body}</p>
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {INSIGHTS.map((_, i) => (
              <button key={i} onClick={() => setInsightIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === insightIdx ? '16px' : '6px', height:'6px', background: i === insightIdx ? '#C9A84C' : '#2a2a2a' }} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prevInsight}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid #1e1e1e' }}>
              <ChevronLeft size={14} className="text-[#555]" />
            </button>
            <button onClick={nextInsight}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid #1e1e1e' }}>
              <ChevronRight size={14} className="text-[#555]" />
            </button>
          </div>
        </div>
      </div>

      {/* módulos grid */}
      <div>
        <p className="text-xs text-[#333] uppercase tracking-wider font-medium mb-3">Acessar módulos</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {MODULES.map(({ href, label, icon: Icon, color, desc }, i) => (
            <Link key={href} href={href}
              className="group rounded-2xl p-4 transition-all duration-200 active:scale-[0.97] animate-fade-slide-up"
              style={{
                background:'rgba(255,255,255,0.02)',
                border:'1px solid #1a1a1a',
                animationDelay:`${i*50}ms`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background:`${color}12`, border:`1px solid ${color}20` }}>
                <Icon size={18} style={{ color }} strokeWidth={1.5} />
              </div>
              <p className="text-[#e0e0e0] font-semibold text-sm">{label}</p>
              <p className="text-[#333] text-xs mt-0.5">{desc}</p>
              <div className="mt-3 h-[1px]" style={{ background:`linear-gradient(90deg,${color}30,transparent)` }} />
            </Link>
          ))}
        </div>
      </div>

      {/* quick stats — lidos do localStorage */}
      <QuickStats />

      <div className="h-2" />
    </div>
  )
}

function QuickStats() {
  const [caixa, setCaixa]     = useState(0)
  const [sessoes, setSessoes] = useState(0)
  const [metas, setMetas]     = useState(0)
  const [habits, setHabits]   = useState(0)

  useEffect(() => {
    try {
      const dep = JSON.parse(localStorage.getItem('elysium_depositos') || '[]')
      const ses = JSON.parse(localStorage.getItem('elysium_sessoes') || '[]')
      const met = JSON.parse(localStorage.getItem('elysium_metas') || '[]')
      const hab = JSON.parse(localStorage.getItem('elysium_habits') || '[]')
      setCaixa(dep.reduce((a: number, d: { valor: number }) => a + d.valor, 0))
      setSessoes(ses.length)
      setMetas(met.filter((m: { concluida: boolean }) => !m.concluida).length)
      setHabits(hab.filter((h: { done: boolean }) => h.done).length)
    } catch {}
  }, [])

  const stats = [
    { label: 'Em caixa',    value: caixa > 0 ? caixa.toLocaleString('pt-BR', { style:'currency', currency:'BRL', maximumFractionDigits:0 }) : '–', color:'#4ade80' },
    { label: 'Sessões',     value: sessoes > 0 ? `${sessoes} aula${sessoes !== 1 ? 's' : ''}` : '–', color:'#60a5fa' },
    { label: 'Metas ativas', value: metas > 0 ? `${metas} meta${metas !== 1 ? 's' : ''}` : '–', color:'#a78bfa' },
    { label: 'Hábitos ok',  value: habits > 0 ? `${habits} hoje` : '–', color:'#facc15' },
  ]

  return (
    <div>
      <p className="text-xs text-[#333] uppercase tracking-wider font-medium mb-3">Resumo</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-4"
            style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #1a1a1a' }}>
            <p className="text-[10px] text-[#333] uppercase tracking-wider mb-1">{label}</p>
            <p className="font-semibold text-[#f0f0f0] text-base">{value}</p>
            <div className="mt-2 h-[1px]" style={{ background:`linear-gradient(90deg,${color}40,transparent)` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
