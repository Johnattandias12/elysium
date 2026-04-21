'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, BookOpen, Heart, CheckSquare, Calendar, Settings, LogOut } from 'lucide-react'
import { ElysiumSymbol } from './ElysiumLogo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/',          icon: LayoutDashboard, label: 'Dashboard', color: '#C9A84C' },
  { href: '/financas',  icon: TrendingUp,      label: 'Finanças',  color: '#4ade80' },
  { href: '/estudos',   icon: BookOpen,        label: 'Estudos',   color: '#60a5fa' },
  { href: '/saude',     icon: Heart,           label: 'Saúde',     color: '#f87171' },
  { href: '/rotina',    icon: CheckSquare,     label: 'Rotina',    color: '#facc15' },
  { href: '/calendario',icon: Calendar,        label: 'Agenda',    color: '#a78bfa' },
]

export default function Sidebar() {
  const path = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col z-40"
      style={{ background: '#0a0a0a', borderRight: '1px solid #1a1a1a' }}
    >
      {/* logo */}
      <div className="flex items-center gap-3 px-6 py-7 border-b border-[#1a1a1a]">
        <ElysiumSymbol size={36} />
        <span style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 200,
          letterSpacing: '0.35em',
          color: '#C9A84C',
          fontSize: '16px',
        }}>
          ELYSIUM
        </span>
      </div>

      {/* nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label, color }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
              style={{
                background: active ? `${color}12` : 'transparent',
                color: active ? color : '#666',
              }}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5}
                className="transition-all duration-200"
                style={{ filter: active ? `drop-shadow(0 0 4px ${color}60)` : 'none' }}
              />
              <span className="text-sm font-medium">{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
            </Link>
          )
        })}
      </nav>

      {/* bottom */}
      <div className="px-3 pb-6 space-y-0.5 border-t border-[#1a1a1a] pt-4">
        <Link href="/configuracoes"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#555] hover:text-[#888] transition-colors">
          <Settings size={18} strokeWidth={1.5} />
          <span className="text-sm">Configurações</span>
        </Link>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#555] hover:text-[#f87171] transition-colors w-full">
          <LogOut size={18} strokeWidth={1.5} />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </aside>
  )
}
