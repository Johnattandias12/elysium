'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PiggyBank, BookOpen, Heart, CheckSquare, Target, CalendarDays, StickyNote } from 'lucide-react'

const NAV = [
  { href: '/',         icon: LayoutDashboard, label: 'Início',   color: '#C9A84C' },
  { href: '/financas', icon: PiggyBank,       label: 'Caixa',    color: '#4ade80' },
  { href: '/estudos',  icon: BookOpen,        label: 'Estudos',  color: '#60a5fa' },
  { href: '/saude',    icon: Heart,           label: 'Saúde',    color: '#f87171' },
  { href: '/rotina',     icon: CheckSquare,     label: 'Rotina',   color: '#facc15' },
  { href: '/metas',      icon: Target,          label: 'Metas',    color: '#a78bfa' },
  { href: '/calendario', icon: CalendarDays,    label: 'Agenda',   color: '#C9A84C' },
  { href: '/notas',      icon: StickyNote,      label: 'Notas',    color: '#38bdf8' },
]

export default function BottomNav() {
  const path = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(18,18,18,0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
      <div className="flex items-center justify-around h-[60px] px-1">
        {NAV.map(({ href, icon: Icon, label, color }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link key={href} href={href}
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-1 transition-all duration-200 active:scale-90"
              style={{ color: active ? color : '#3a3a3a' }}>
              <Icon size={21} strokeWidth={active ? 2 : 1.5}
                style={{ filter: active ? `drop-shadow(0 0 8px ${color}70)` : 'none', transition: 'all 0.2s' }} />
              <span className="text-[9px] font-medium tracking-wide" style={{ opacity: active ? 1 : 0.5 }}>
                {label}
              </span>
              {active && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
