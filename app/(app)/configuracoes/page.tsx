'use client'
import { useEffect, useState } from 'react'
import { LogOut, User, Bell, Moon, Shield, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const SETTINGS = [
  { icon: User,   label: 'Perfil',          sub: 'Nome e informações pessoais', color: '#C9A84C' },
  { icon: Bell,   label: 'Notificações',     sub: 'Lembretes e alertas',         color: '#60a5fa' },
  { icon: Moon,   label: 'Aparência',        sub: 'Dark mode',                   color: '#a78bfa' },
  { icon: Shield, label: 'Privacidade',      sub: 'Dados e segurança',           color: '#4ade80' },
]

export default function ConfiguracoesPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setEmail(user.email)
    })
  }, [])

  async function handleLogout() {
    await createClient().auth.signOut()
    router.push('/login')
  }

  return (
    <div className="space-y-5 page-enter">
      <div className="pt-1">
        <h1 className="text-2xl font-semibold text-[#e8e8e8]">Configurações</h1>
      </div>

      {/* profile card */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.04) 0%, #111 70%)' }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
            {email.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[#e8e8e8] font-medium">{email.split('@')[0]}</p>
            <p className="text-[#555] text-sm">{email}</p>
          </div>
        </div>
      </div>

      {/* settings list */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl divide-y divide-[#1a1a1a]">
        {SETTINGS.map(({ icon: Icon, label, sub, color }) => (
          <button key={label}
            className="flex items-center gap-3 w-full px-4 py-4 active:bg-[#1a1a1a] transition-colors text-left">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-none"
              style={{ background: `${color}15` }}>
              <Icon size={18} style={{ color }} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[#e8e8e8] text-sm font-medium">{label}</p>
              <p className="text-[#555] text-xs">{sub}</p>
            </div>
            <ChevronRight size={16} className="text-[#333]" />
          </button>
        ))}
      </div>

      {/* logout */}
      <button onClick={handleLogout}
        className="w-full bg-[#111] border border-[#1e1e1e] rounded-2xl px-4 py-4 flex items-center gap-3 active:bg-[rgba(248,113,113,0.05)] transition-colors">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(248,113,113,0.1)]">
          <LogOut size={18} className="text-[#f87171]" strokeWidth={1.5} />
        </div>
        <span className="text-[#f87171] text-sm font-medium">Sair da conta</span>
      </button>

      {/* footer */}
      <div className="text-center py-4 space-y-1">
        <p style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 300,
          letterSpacing: '0.16em',
          color: '#333',
          fontSize: '10px',
          textTransform: 'uppercase',
        }}>
          Feito pela Beyonder · 2026
        </p>
        <p style={{ color: '#2a2a2a', fontSize: '10px', letterSpacing: '0.06em' }}>
          Tradição &amp; Confiança 🐊🤝✅
        </p>
        <p className="text-[#1e1e1e] text-[10px]">Elysium v0.1.0</p>
      </div>

      <div className="h-2" />
    </div>
  )
}
