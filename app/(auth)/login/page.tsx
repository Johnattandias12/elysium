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
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 overflow-hidden"
      style={{ background: '#080808' }}>

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse,#C9A84C,transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse,#C9A84C,transparent)', filter: 'blur(60px)', animation: 'floatB 10s ease-in-out infinite' }} />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.8) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
      </div>

      <style>{`
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes shimmerGold { 0%{background-position:-300% center} 100%{background-position:300% center} }
      `}</style>

      <div className="relative w-full max-w-[380px]">

        {/* ── LOGO ── */}
        <div className="flex flex-col items-center mb-10">
          {/* icon */}
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-[22px] blur-2xl opacity-30" style={{ background: '#C9A84C', transform: 'scale(1.4)' }} />
            <div className="relative rounded-[22px] p-[1.5px]"
              style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.7),rgba(201,168,76,0.15),rgba(201,168,76,0.5))' }}>
              <div className="rounded-[20px] bg-[#0c0c0c] p-1.5">
                <svg width="60" height="60" viewBox="0 0 512 512" fill="none">
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
          <h1 style={{
            fontFamily:"'Inter',sans-serif", fontWeight:300, letterSpacing:'0.45em', fontSize:'26px',
            background:'linear-gradient(90deg,#a87a2a 0%,#C9A84C 30%,#e8cc80 50%,#C9A84C 70%,#a87a2a 100%)',
            backgroundSize:'300% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text', animation:'shimmerGold 4s linear infinite', paddingRight:'0.45em',
          }}>ELYSIUM</h1>

          {/* welcome */}
          <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, color:'#888', fontSize:'13px', marginTop:'8px', letterSpacing:'0.02em' }}>
            Bem-vindo de volta 👋
          </p>
          <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, letterSpacing:'0.14em', color:'#2a2a2a', fontSize:'9px', textTransform:'uppercase', marginTop:'4px' }}>
            Beyonder · 2026
          </p>
        </div>

        {!sent ? (
          <>
            {/* ── TABS ── */}
            <div className="flex mb-4 rounded-2xl p-1 gap-1"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.04)' }}>
              {([
                { key: 'login',  label: 'Entrar',      icon: LogIn },
                { key: 'signup', label: 'Cadastrar',   icon: UserPlus },
                { key: 'magic',  label: 'Link mágico', icon: Sparkles },
              ] as { key: Mode; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => { setMode(key); setError('') }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300"
                  style={{
                    background: mode === key ? 'rgba(201,168,76,0.08)' : 'transparent',
                    color: mode === key ? '#C9A84C' : '#333',
                    borderBottom: mode === key ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
                  }}>
                  <Icon size={12} strokeWidth={1.5} />
                  {label}
                </button>
              ))}
            </div>

            {/* ── CARD ── */}
            <div className="rounded-2xl p-6 space-y-4"
              style={{
                background:'rgba(255,255,255,0.025)',
                border:'1px solid rgba(255,255,255,0.05)',
                boxShadow:'0 32px 80px rgba(0,0,0,0.6)',
              }}>

              <div className="text-center mb-1">
                <h2 className="text-[#e0e0e0] font-medium text-[15px] tracking-wide">
                  {mode === 'login'  ? 'Acesse sua conta'    :
                   mode === 'signup' ? 'Crie sua conta'      : 'Acesso via e-mail'}
                </h2>
                <p className="text-[#333] text-xs mt-1">
                  {mode === 'login'  ? 'Entre com e-mail e senha'         :
                   mode === 'signup' ? 'Preencha os dados abaixo'         : 'Enviaremos um link seguro'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#333]" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com" required
                    className="w-full h-11 rounded-xl pl-10 pr-4 text-[#e0e0e0] placeholder-[#2e2e2e] outline-none transition-all duration-200"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', fontSize:'16px', fontFamily:'Inter,sans-serif' }}
                    onFocus={e => { e.currentTarget.style.border='1px solid rgba(201,168,76,0.35)'; e.currentTarget.style.background='rgba(201,168,76,0.04)' }}
                    onBlur={e  => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}
                  />
                </div>

                {needsPassword && (
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#333]" />
                    <input
                      type={showPw ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? 'Crie uma senha forte' : 'Sua senha'}
                      required minLength={6}
                      className="w-full h-11 rounded-xl pl-10 pr-11 text-[#e0e0e0] placeholder-[#2e2e2e] outline-none transition-all duration-200"
                      style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', fontSize:'16px', fontFamily:'Inter,sans-serif' }}
                      onFocus={e => { e.currentTarget.style.border='1px solid rgba(201,168,76,0.35)'; e.currentTarget.style.background='rgba(201,168,76,0.04)' }}
                      onBlur={e  => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#333] hover:text-[#555] transition-colors">
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                )}

                {error && (
                  <p className="text-[#f87171] text-xs text-center bg-[rgba(248,113,113,0.07)] rounded-xl py-2 px-3">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading || !email || (needsPassword && !password)}
                  className="relative w-full h-11 rounded-xl font-medium flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 active:scale-[0.97]"
                  style={{
                    background: (loading || !email || (needsPassword && !password))
                      ? 'rgba(255,255,255,0.04)'
                      : 'linear-gradient(135deg,#b8933e 0%,#C9A84C 40%,#dbbf6a 100%)',
                    color: (loading || !email || (needsPassword && !password)) ? '#333' : '#080808',
                    boxShadow: (loading || !email || (needsPassword && !password)) ? 'none' : '0 4px 20px rgba(201,168,76,0.3)',
                    border: '1px solid',
                    borderColor: (loading || !email || (needsPassword && !password)) ? 'rgba(255,255,255,0.05)' : 'rgba(201,168,76,0.4)',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}>
                  {loading
                    ? <span className="w-4 h-4 border-2 border-[#333] border-t-[#C9A84C] rounded-full animate-spin" />
                    : <>
                        {mode === 'login' ? <LogIn size={14}/> : mode === 'signup' ? <Sparkles size={14}/> : <Mail size={14}/>}
                        {mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Enviar link'}
                        <ArrowRight size={13}/>
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
                style={{ background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.25)' }}>
                <CheckCircle size={34} style={{ color:'#C9A84C' }} strokeWidth={1.5} />
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

        <p className="text-center mt-8" style={{ fontSize:'9px', letterSpacing:'0.1em', color:'#1e1e1e' }}>
          Tradição &amp; Confiança 🐊🤝✅
        </p>
      </div>
    </div>
  )
}
