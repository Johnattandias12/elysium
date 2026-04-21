'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, BookOpen, Heart, CheckSquare, Calendar } from 'lucide-react'

const NAV = [
  { href: '/',          icon: LayoutDashboard, label: 'Início',    color: '#C9A84C' },
  { href: '/financas',  icon: TrendingUp,      label: 'Finanças',  color: '#4ade80' },
  { href: '/estudos',   icon: BookOpen,        label: 'Estudos',   color: '#60a5fa' },
  { href: '/saude',     icon: Heart,           label: 'Saúde',     color: '#f87171' },
  { href: '/rotina',    icon: CheckSquare,     label: 'Rotina',    color: '#facc15' },
  { href: '/calendario',icon: Calendar,        label: 'Agenda',    color: '#a78bfa' },
]

export default function BottomNav() {
  const path = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #1e1e1e',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {NAV.map(({ href, icon: Icon, label, color }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-1 transition-all duration-200 active:scale-90"
              style={{ color: active ? color : '#555' }}
            >
              <Icon size={22} strokeWidth={active ? 2 : 1.5}
                className="transition-all duration-200"
                style={{ filter: active ? `drop-shadow(0 0 6px ${color}60)` : 'none' }}
              />
              <span className="text-[9px] font-medium tracking-wide transition-all duration-200"
                style={{ opacity: active ? 1 : 0.5 }}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-[env(safe-area-inset-bottom)] w-1 h-0.5 rounded-full"
                  style={{ background: color, bottom: 'calc(env(safe-area-inset-bottom) + 2px)' }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
