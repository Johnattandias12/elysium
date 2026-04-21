'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ElysiumLoginLogo } from '@/components/layout/ElysiumLogo'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6"
      style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, #0c0c0c 70%)',
      }}>

      {/* grid bg */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(#C9A84C 1px,transparent 1px),linear-gradient(90deg,#C9A84C 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative w-full max-w-sm animate-fade-slide-up">
        {/* logo */}
        <div className="flex justify-center mb-12">
          <ElysiumLoginLogo />
        </div>

        {!sent ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-light text-[#e8e8e8] tracking-wide">Entrar na sua conta</h2>
              <p className="text-sm text-[#555] mt-1">Enviamos um link mágico para seu e-mail</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full h-12 bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 text-[#e8e8e8] text-base placeholder-[#444] focus:border-[#C9A84C] focus:outline-none transition-colors"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {error && <p className="text-[#f87171] text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97]"
                style={{
                  background: loading ? '#1a1a1a' : 'linear-gradient(135deg, #C9A84C, #a8853a)',
                  color: loading ? '#555' : '#0c0c0c',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.3)',
                }}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#333] border-t-[#C9A84C] rounded-full animate-spin" />
                ) : (
                  <>Entrar <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-fade-slide-up">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <CheckCircle size={32} className="text-[#C9A84C]" />
            </div>
            <div>
              <h3 className="text-[#e8e8e8] font-medium">Link enviado!</h3>
              <p className="text-[#555] text-sm mt-1">Verifique seu e-mail <span className="text-[#888]">{email}</span></p>
            </div>
            <button onClick={() => setSent(false)}
              className="text-[#555] text-sm hover:text-[#888] transition-colors mt-4">
              Usar outro e-mail
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
