'use client'
import { ExternalLink, Rocket } from 'lucide-react'

const APPS = [
  {
    name: 'Mamon',
    desc: 'Solução focada em gestão financeira e controle de dados.',
    url: 'https://mamon-azure.vercel.app/',
    emoji: '💰',
    color: '#C9A84C',
    tag: 'Financeiro',
    destaque: true,
  },
  {
    name: 'Conectar+ Ferramentas',
    desc: 'Ecossistema de ferramentas práticas e produtividade.',
    url: 'https://conectarferramentas.vercel.app/',
    emoji: '🔗',
    color: '#60a5fa',
    tag: 'Produtividade',
  },
  {
    name: 'Atrium',
    desc: 'Sistema moderno de gestão e organização de fluxos.',
    url: 'https://atrium-three.vercel.app/',
    emoji: '⚡',
    color: '#a78bfa',
    tag: 'Gestão',
  },
  {
    name: 'Filgueira Imobiliária',
    desc: 'Plataforma para marca d'água imobiliária.',
    url: 'https://filgueiraimob.vercel.app/',
    emoji: '🏠',
    color: '#4ade80',
    tag: 'Imobiliário',
  },
]

export default function ProjetosPage() {
  return (
    <div className="space-y-6 page-enter">
      <div className="pt-1">
        <div className="flex items-center gap-2 mb-1">
          <Rocket size={18} className="text-[#C9A84C]" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-[#f0f0f0]">Meus Projetos</h1>
        </div>
        <p className="text-[#444] text-sm">Ecossistema Beyonder — todos os seus sistemas</p>
      </div>

      {/* destaque — Mamon */}
      {APPS.filter(a => a.destaque).map(app => (
        <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
          className="block rounded-2xl p-6 transition-all duration-300 active:scale-[0.98] group"
          style={{
            background:'linear-gradient(135deg,rgba(201,168,76,0.08) 0%,rgba(201,168,76,0.03) 100%)',
            border:'1px solid rgba(201,168,76,0.2)',
            boxShadow:'0 0 40px rgba(201,168,76,0.04)',
          }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-none"
              style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)' }}>
              {app.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[#C9A84C] font-semibold text-lg">{app.name}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background:'rgba(201,168,76,0.1)', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.2)' }}>
                  {app.tag}
                </span>
              </div>
              <p className="text-[#555] text-sm leading-relaxed">{app.desc}</p>
            </div>
            <ExternalLink size={16} className="text-[#333] group-hover:text-[#C9A84C] transition-colors flex-none mt-1" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#C9A84C]">
            <span>Abrir Mamon</span>
            <ExternalLink size={11} />
          </div>
        </a>
      ))}

      {/* outros apps */}
      <div>
        <p className="text-xs text-[#444] uppercase tracking-wider font-medium mb-3">Outros sistemas</p>
        <div className="space-y-3">
          {APPS.filter(a => !a.destaque).map((app, i) => (
            <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 active:scale-[0.98] group animate-fade-slide-up"
              style={{
                background:'rgba(255,255,255,0.02)',
                border:'1px solid #1a1a1a',
                animationDelay:`${i*60}ms`,
              }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-none"
                style={{ background:`${app.color}10`, border:`1px solid ${app.color}20` }}>
                {app.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[#e0e0e0] font-medium text-sm">{app.name}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{ background:`${app.color}12`, color: app.color, border:`1px solid ${app.color}20` }}>
                    {app.tag}
                  </span>
                </div>
                <p className="text-[#333] text-xs truncate">{app.desc}</p>
              </div>
              <ExternalLink size={14} className="text-[#2a2a2a] group-hover:text-[#888] transition-colors flex-none" />
            </a>
          ))}
        </div>
      </div>

      {/* footer beyonder */}
      <div className="rounded-2xl p-5 text-center"
        style={{ background:'rgba(255,255,255,0.015)', border:'1px solid #1a1a1a' }}>
        <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, letterSpacing:'0.2em', color:'#2a2a2a', fontSize:'10px', textTransform:'uppercase' }}>
          Ecossistema Beyonder · 2026
        </p>
        <p style={{ color:'#1e1e1e', fontSize:'11px', marginTop:'4px' }}>
          Tradição &amp; Confiança 🐊🤝✅
        </p>
      </div>

      <div className="h-2" />
    </div>
  )
}
