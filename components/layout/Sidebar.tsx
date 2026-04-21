'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, PiggyBank, BookOpen, Heart, CheckSquare,
  Target, FolderOpen, Settings, LogOut, CalendarDays, StickyNote
} from 'lucide-react'
import { ElysiumSymbol } from './ElysiumLogo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/',           icon: LayoutDashboard, label: 'Dashboard',  color: '#C9A84C' },
  { href: '/financas',   icon: PiggyBank,       label: 'Caixa',      color: '#4ade80' },
  { href: '/estudos',    icon: BookOpen,        label: 'Estudos',    color: '#60a5fa' },
  { href: '/saude',      icon: Heart,           label: 'Saúde',      color: '#f87171' },
  { href: '/rotina',     icon: CheckSquare,     label: 'Rotina',     color: '#facc15' },
  { href: '/metas',      icon: Target,          label: 'Metas',      color: '#a78bfa' },
  { href: '/calendario', icon: CalendarDays,    label: 'Calendário', color: '#C9A84C' },
  { href: '/notas',      icon: StickyNote,      label: 'Notas',      color: '#38bdf8' },
  { href: '/projetos',   icon: FolderOpen,      label: 'Projetos',   color: '#fb923c' },
]

export default function Sidebar() {
  const path   = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await createClient().auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-60 flex-col z-40"
      style={{ background: '#0a0a0a', borderRight: '1px solid #1e1e1e' }}>

      {/* logo — clicável → home */}
      <Link href="/" className="flex items-center gap-3 px-5 py-6 border-b border-[#1a1a1a] hover:bg-[#111] transition-colors">
        <ElysiumSymbol size={34} />
        <div>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.3em',
            color: '#C9A84C',
            fontSize: '15px',
            display: 'block',
            lineHeight: 1,
          }}>ELYSIUM</span>
          <span style={{ fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginTop: '3px', display: 'block' }}>
            BEYONDER · 2026
          </span>
        </div>
      </Link>

      {/* nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label, color }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: active ? `${color}10` : 'transparent',
                color: active ? color : '#555',
              }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-none"
                style={{ background: active ? `${color}15` : 'transparent' }}>
                <Icon size={16} strokeWidth={active ? 2 : 1.5}
                  style={{ filter: active ? `drop-shadow(0 0 4px ${color}80)` : 'none' }} />
              </div>
              <span className="text-sm font-medium">{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
            </Link>
          )
        })}
      </nav>

      {/* bottom */}
      <div className="px-3 pb-6 space-y-0.5 border-t border-[#1a1a1a] pt-4">
        <Link href="/configuracoes"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#444] hover:text-[#888] hover:bg-[#111] transition-all duration-200">
          <Settings size={16} strokeWidth={1.5} />
          <span className="text-sm">Configurações</span>
        </Link>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#444] hover:text-[#f87171] hover:bg-[rgba(248,113,113,0.05)] transition-all duration-200 w-full">
          <LogOut size={16} strokeWidth={1.5} />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </aside>
  )
}
