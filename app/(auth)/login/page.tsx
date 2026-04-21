'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, ArrowRight, CheckCircle, Sparkles, UserPlus, LogIn, Eye, EyeOff, Lock } from 'lucide-react'

type Mode = 'login' | 'signup' | 'magic'

export default function LoginPage() {
  const [mode, setMode]         = useState<Mode>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [sent, setSent]         = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (error) {
        setError(error.message === 'Invalid login credentials'
          ? 'E-mail ou senha incorretos.'
          : error.message)
        return
      }
      window.location.href = '/'
      return
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      })
      setLoading(false)
      if (error) { setError(error.message); return }
      setSent(true)
      return
    }

    // magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  const needsPassword = mode === 'login' || mode === 'signup'

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: '#070707' }}>

      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.6) 1px,transparent 1px)',
            backgroundSize: '52px 52px',
          }} />
        <div className="absolute top-[12%] left-[8%] w-48 h-48 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle,#C9A84C,transparent)', filter: 'blur(40px)', animation: 'floatA 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] right-[6%] w-64 h-64 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle,#C9A84C,transparent)', filter: 'blur(60px)', animation: 'floatB 10s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-14px) translateX(8px)} 66%{transform:translateY(8px) translateX(-6px)} }
        @keyframes shimmerGold { 0%{background-position:-300% center} 100%{background-position:300% center} }
      `}</style>

      <div className="relative w-full max-w-sm animate-fade-slide-up">

        {/* ── LOGO ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-[20px] blur-xl opacity-40" style={{ background: '#C9A84C', transform: 'scale(1.3)' }} />
            <div className="relative rounded-[20px] p-0.5"
              style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.6),rgba(201,168,76,0.15),rgba(201,168,76,0.4))' }}>
              <div className="rounded-[18px] bg-[#0c0c0c] p-1">
                <svg width="64" height="64" viewBox="0 0 512 512" fill="none">
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
          <h1 style={{
            fontFamily:"'Helvetica Neue',Arial,sans-serif",fontWeight:200,letterSpacing:'0.5em',fontSize:'28px',
            background:'linear-gradient(90deg,#a87a2a 0%,#C9A84C 30%,#e8cc80 50%,#C9A84C 70%,#a87a2a 100%)',
            backgroundSize:'300% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
            backgroundClip:'text',animation:'shimmerGold 4s linear infinite',paddingRight:'0.5em',
          }}>ELYSIUM</h1>
          <p style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif",fontWeight:300,letterSpacing:'0.18em',color:'#2a2a2a',fontSize:'9px',textTransform:'uppercase',marginTop:'5px' }}>
            Beyonder · 2026 &nbsp;|&nbsp; Tradição &amp; Confiança
          </p>
        </div>

        {!sent ? (
          <>
            {/* ── TABS ── */}
            <div className="flex mb-5 rounded-2xl p-1 gap-1"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
              {([
                { key: 'login',  label: 'Entrar',       icon: LogIn },
                { key: 'signup', label: 'Criar conta',  icon: UserPlus },
                { key: 'magic',  label: 'Link mágico',  icon: Sparkles },
              ] as { key: Mode; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => { setMode(key); setError('') }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300"
                  style={{
                    background: mode === key ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: mode === key ? '#C9A84C' : '#3a3a3a',
                    borderBottom: mode === key ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
                  }}>
                  <Icon size={13} strokeWidth={1.5} />
                  {label}
                </button>
              ))}
            </div>

            {/* ── CARD ── */}
            <div className="rounded-3xl p-6 space-y-4"
              style={{
                background:'linear-gradient(160deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)',
                border:'1px solid rgba(255,255,255,0.06)',
                boxShadow:'0 24px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.04)',
              }}>

              <div className="text-center">
                <h2 className="text-[#e8e8e8] font-light text-base tracking-wide">
                  {mode === 'login'  ? 'Bem-vindo de volta'   :
                   mode === 'signup' ? 'Crie sua conta'       : 'Acesso via e-mail'}
                </h2>
                <p className="text-[#3a3a3a] text-xs mt-1">
                  {mode === 'login'  ? 'Entre com seu e-mail e senha'        :
                   mode === 'signup' ? 'Sem burocracia, só preencha abaixo' : 'Enviaremos um link seguro'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* email */}
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3a3a]" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com" required
                    className="w-full h-12 rounded-xl pl-11 pr-4 text-[#e8e8e8] placeholder-[#333] outline-none transition-all duration-200"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
                    onFocus={e => { e.currentTarget.style.border='1px solid rgba(201,168,76,0.4)'; e.currentTarget.style.background='rgba(201,168,76,0.04)' }}
                    onBlur={e  => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}
                  />
                </div>

                {/* password */}
                {needsPassword && (
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3a3a]" />
                    <input
                      type={showPw ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? 'Crie uma senha forte' : 'Sua senha'}
                      required minLength={6}
                      className="w-full h-12 rounded-xl pl-11 pr-12 text-[#e8e8e8] placeholder-[#333] outline-none transition-all duration-200"
                      style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:'16px' }}
                      onFocus={e => { e.currentTarget.style.border='1px solid rgba(201,168,76,0.4)'; e.currentTarget.style.background='rgba(201,168,76,0.04)' }}
                      onBlur={e  => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:text-[#666] transition-colors">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                )}

                {error && (
                  <p className="text-[#f87171] text-xs text-center bg-[rgba(248,113,113,0.08)] rounded-xl py-2 px-3">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading || !email || (needsPassword && !password)}
                  className="relative w-full h-12 rounded-xl font-medium flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 active:scale-[0.97]"
                  style={{
                    background: loading || !email ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg,#C9A84C 0%,#a87a2a 50%,#C9A84C 100%)',
                    backgroundSize: '200% auto',
                    color: loading || !email ? '#333' : '#0c0c0c',
                    boxShadow: loading || !email ? 'none' : '0 4px 24px rgba(201,168,76,0.35)',
                    border: '1px solid',
                    borderColor: loading || !email ? 'rgba(255,255,255,0.06)' : 'rgba(201,168,76,0.5)',
                  }}>
                  {loading
                    ? <span className="w-4 h-4 border-2 border-[#333] border-t-[#C9A84C] rounded-full animate-spin" />
                    : <>
                        {mode === 'login' ? <LogIn size={15}/> : mode === 'signup' ? <Sparkles size={15}/> : <Mail size={15}/>}
                        {mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar minha conta' : 'Enviar link mágico'}
                        <ArrowRight size={14}/>
                      </>
                  }
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center space-y-5 animate-fade-slide-up">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background:'#C9A84C' }} />
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.3)' }}>
                <CheckCircle size={36} style={{ color:'#C9A84C' }} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h3 className="text-[#e8e8e8] font-medium text-lg">
                {mode === 'signup' ? 'Conta criada!' : 'Link enviado!'}
              </h3>
              <p className="text-[#444] text-sm mt-1">Verifique seu e-mail</p>
              <p className="text-[#C9A84C] text-sm font-medium mt-0.5">{email}</p>
            </div>
            <button onClick={() => { setSent(false); setEmail(''); setPassword('') }}
              className="text-[#333] text-sm hover:text-[#555] transition-colors underline underline-offset-2">
              Voltar ao login
            </button>
          </div>
        )}

        <p className="text-center mt-6" style={{ fontSize:'9px', letterSpacing:'0.1em', color:'#1a1a1a' }}>
          Tradição &amp; Confiança 🐊🤝✅
        </p>
      </div>
    </div>
  )
}
