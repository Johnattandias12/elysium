'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, ArrowRight, CheckCircle, Sparkles, UserPlus, LogIn } from 'lucide-react'

type Mode = 'login' | 'signup'

export default function LoginPage() {
  const [mode, setMode]     = useState<Mode>('login')
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

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
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: '#070707' }}>

      {/* background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* central radial glow */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 70%)' }} />
        {/* top vignette */}
        <div className="absolute top-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.04), transparent)' }} />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }} />
        {/* floating orbs */}
        <div className="absolute top-[12%] left-[8%] w-48 h-48 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #C9A84C, transparent)', filter: 'blur(40px)', animation: 'floatA 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] right-[6%] w-64 h-64 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #C9A84C, transparent)', filter: 'blur(60px)', animation: 'floatB 10s ease-in-out infinite' }} />
        <div className="absolute top-[55%] left-[60%] w-32 h-32 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #ffffff, transparent)', filter: 'blur(30px)', animation: 'floatA 12s ease-in-out infinite reverse' }} />
      </div>

      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-14px) translateX(8px); }
          66% { transform: translateY(8px) translateX(-6px); }
        }
        @keyframes shimmerGold {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
      `}</style>

      <div className="relative w-full max-w-sm animate-fade-slide-up">

        {/* ── LOGO ── */}
        <div className="flex flex-col items-center mb-10">
          {/* icon */}
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-[20px] blur-xl opacity-40"
              style={{ background: '#C9A84C', transform: 'scale(1.3)' }} />
            <div className="relative rounded-[20px] p-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.6), rgba(201,168,76,0.15), rgba(201,168,76,0.4))' }}>
              <div className="rounded-[18px] bg-[#0c0c0c] p-1">
                <svg width="68" height="68" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="512" height="512" fill="#0a0a0a" rx="80"/>
                  <g transform="translate(256,256)">
                    <rect x="-144" y="-152" width="288" height="44" rx="12" fill="#C9A84C"/>
                    <rect x="-144" y="-22"  width="192" height="44" rx="12" fill="#C9A84C"/>
                    <rect x="-144" y="108"  width="288" height="44" rx="12" fill="#C9A84C"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* wordmark */}
          <div className="text-center">
            <h1 style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 200,
              letterSpacing: '0.5em',
              fontSize: '30px',
              background: 'linear-gradient(90deg, #a87a2a 0%, #C9A84C 30%, #e8cc80 50%, #C9A84C 70%, #a87a2a 100%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmerGold 4s linear infinite',
              paddingRight: '0.5em',
            }}>
              ELYSIUM
            </h1>
            <p style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 300,
              letterSpacing: '0.22em',
              color: '#3a3a3a',
              fontSize: '9px',
              textTransform: 'uppercase',
              marginTop: '6px',
            }}>
              Beyonder · 2026 &nbsp;|&nbsp; Tradição &amp; Confiança
            </p>
          </div>
        </div>

        {!sent ? (
          <>
            {/* ── TABS ── */}
            <div className="flex mb-6 rounded-2xl p-1 gap-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => setMode('login')}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: mode === 'login' ? 'rgba(201,168,76,0.1)' : 'transparent',
                  color: mode === 'login' ? '#C9A84C' : '#444',
                  borderBottom: mode === 'login' ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
                  boxShadow: mode === 'login' ? 'inset 0 1px 0 rgba(201,168,76,0.1)' : 'none',
                }}>
                <LogIn size={15} strokeWidth={1.5} />
                Entrar
              </button>
              <button
                onClick={() => setMode('signup')}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: mode === 'signup' ? 'rgba(201,168,76,0.1)' : 'transparent',
                  color: mode === 'signup' ? '#C9A84C' : '#444',
                  borderBottom: mode === 'signup' ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
                  boxShadow: mode === 'signup' ? 'inset 0 1px 0 rgba(201,168,76,0.1)' : 'none',
                }}>
                <UserPlus size={15} strokeWidth={1.5} />
                Criar conta
              </button>
            </div>

            {/* ── CARD ── */}
            <div className="rounded-3xl p-6 space-y-5"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}>

              <div className="text-center">
                <h2 className="text-[#e8e8e8] font-light text-base tracking-wide">
                  {mode === 'login' ? 'Bem-vindo de volta' : 'Comece sua jornada'}
                </h2>
                <p className="text-[#444] text-xs mt-1">
                  {mode === 'login'
                    ? 'Enviaremos um link mágico para o seu e-mail'
                    : 'Crie sua conta em segundos, sem senha'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                    style={{ color: '#444' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full h-12 rounded-xl pl-11 pr-4 text-[#e8e8e8] placeholder-[#333] transition-all duration-300 outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontSize: '16px',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.border = '1px solid rgba(201,168,76,0.4)'
                      e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  />
                </div>

                {error && (
                  <p className="text-[#f87171] text-xs text-center bg-[rgba(248,113,113,0.08)] rounded-xl py-2 px-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="relative w-full h-12 rounded-xl font-medium flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 active:scale-[0.97]"
                  style={{
                    background: loading || !email
                      ? 'rgba(255,255,255,0.05)'
                      : 'linear-gradient(135deg, #C9A84C 0%, #a87a2a 50%, #C9A84C 100%)',
                    backgroundSize: '200% auto',
                    color: loading || !email ? '#333' : '#0c0c0c',
                    boxShadow: loading || !email ? 'none' : '0 4px 24px rgba(201,168,76,0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
                    border: '1px solid',
                    borderColor: loading || !email ? 'rgba(255,255,255,0.06)' : 'rgba(201,168,76,0.5)',
                  }}>
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-[#333] border-t-[#C9A84C] rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? <LogIn size={16} /> : <Sparkles size={16} />}
                      {mode === 'login' ? 'Entrar com link mágico' : 'Criar minha conta'}
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[#333] text-[11px] leading-relaxed">
                {mode === 'login'
                  ? <>Não tem conta? <button onClick={() => setMode('signup')} className="text-[#C9A84C] underline underline-offset-2">Criar agora</button></>
                  : <>Já tem conta? <button onClick={() => setMode('login')} className="text-[#C9A84C] underline underline-offset-2">Entrar</button></>
                }
              </p>
            </div>
          </>
        ) : (
          /* ── SUCCESS STATE ── */
          <div className="text-center space-y-5 animate-fade-slide-up">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: '#C9A84C' }} />
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
                <CheckCircle size={36} style={{ color: '#C9A84C' }} strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <h3 className="text-[#e8e8e8] font-medium text-lg">Link enviado!</h3>
              <p className="text-[#444] text-sm mt-1">Verifique seu e-mail</p>
              <p className="text-[#C9A84C] text-sm font-medium mt-0.5">{email}</p>
            </div>

            <p className="text-[#2a2a2a] text-xs">
              {mode === 'login' ? 'Clique no link para acessar o Elysium' : 'Clique no link para ativar sua conta'}
            </p>

            <button onClick={() => { setSent(false); setEmail('') }}
              className="text-[#333] text-sm hover:text-[#555] transition-colors underline underline-offset-2 mt-2">
              Usar outro e-mail
            </button>
          </div>
        )}

        {/* bottom attribution */}
        <p className="text-center mt-8" style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: '9px',
          letterSpacing: '0.1em',
          color: '#1e1e1e',
        }}>
          Tradição &amp; Confiança 🐊🤝✅
        </p>
      </div>
    </div>
  )
}
