'use client'
import { useEffect, useRef, useState } from 'react'
import { LogOut, User, Camera, ExternalLink, ChevronRight, FolderOpen, Mail, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ConfiguracoesPage() {
  const [email, setEmail]         = useState('')
  const [photo, setPhoto]         = useState<string | null>(null)
  const [nome, setNome]           = useState('')
  const [editNome, setEditNome]   = useState(false)
  const [nomeInput, setNomeInput] = useState('')
  const [showConta, setShowConta] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const router  = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setEmail(user.email)
    })
    try {
      const savedPhoto = localStorage.getItem('elysium_photo')
      const savedNome  = localStorage.getItem('elysium_nome')
      if (savedPhoto) setPhoto(savedPhoto)
      if (savedNome)  setNome(savedNome)
    } catch {}
  }, [])

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX    = 300
        const ratio  = Math.min(MAX / img.width, MAX / img.height, 1)
        canvas.width  = img.width  * ratio
        canvas.height = img.height * ratio
        canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressed = canvas.toDataURL('image/jpeg', 0.75)
        setPhoto(compressed)
        localStorage.setItem('elysium_photo', compressed)
        window.dispatchEvent(new CustomEvent('elysium_profile_update', { detail: { photo: compressed } }))
      }
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  function saveNome() {
    const n = nomeInput.trim()
    if (!n) return
    setNome(n)
    localStorage.setItem('elysium_nome', n)
    setEditNome(false)
    window.dispatchEvent(new CustomEvent('elysium_profile_update', { detail: { nome: n } }))
  }

  async function handleLogout() {
    await createClient().auth.signOut()
    router.push('/login')
  }

  const displayName = nome || email.split('@')[0]
  const initials    = displayName.slice(0, 2).toUpperCase()

  return (
    <div className="space-y-5 page-enter">
      <div className="pt-1">
        <h1 className="text-2xl font-semibold text-[#f0f0f0]">Configurações</h1>
      </div>

      {/* perfil */}
      <div className="rounded-2xl p-5"
        style={{ background:'linear-gradient(160deg,rgba(201,168,76,0.05) 0%,rgba(255,255,255,0.01) 100%)', border:'1px solid #222' }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center text-2xl font-semibold"
              style={{ background: photo ? 'transparent' : 'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', color:'#C9A84C' }}>
              {photo ? <img src={photo} alt="foto" className="w-full h-full object-cover" /> : initials}
            </div>
            <button onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background:'#C9A84C', border:'2px solid #0a0a0a' }}>
              <Camera size={11} className="text-[#080808]" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>

          <div className="flex-1 min-w-0">
            {editNome ? (
              <div className="flex gap-2">
                <input autoFocus type="text" value={nomeInput}
                  onChange={e => setNomeInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveNome()}
                  placeholder="Seu nome…"
                  className="flex-1 h-9 rounded-lg px-3 text-[#e0e0e0] placeholder-[#333] outline-none"
                  style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(201,168,76,0.3)', fontSize:'16px' }}
                />
                <button onClick={saveNome}
                  className="px-3 h-9 rounded-lg text-xs font-semibold"
                  style={{ background:'rgba(201,168,76,0.15)', color:'#C9A84C' }}>OK</button>
                <button onClick={() => setEditNome(false)}
                  className="px-2 h-9 rounded-lg text-[#444]">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => { setEditNome(true); setNomeInput(nome) }}
                className="text-left group w-full">
                <p className="text-[#e0e0e0] font-semibold flex items-center gap-1.5">
                  {displayName}
                  <span className="text-[10px] text-[#333] group-hover:text-[#666] transition-colors">✏️</span>
                </p>
              </button>
            )}
            <p className="text-[#444] text-xs mt-0.5 truncate">{email}</p>
          </div>
        </div>
      </div>

      {/* acesso rápido Mamon */}
      <a href="https://mamon-azure.vercel.app/" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-200 active:scale-[0.98] group"
        style={{ background:'rgba(201,168,76,0.04)', border:'1px solid rgba(201,168,76,0.15)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)' }}>💰</div>
        <div className="flex-1">
          <p className="text-[#C9A84C] font-medium text-sm">Acessar Mamon</p>
          <p className="text-[#444] text-xs">Gestão financeira avançada</p>
        </div>
        <ExternalLink size={15} className="text-[#C9A84C] opacity-50 group-hover:opacity-100 transition-opacity" />
      </a>

      {/* projetos */}
      <Link href="/projetos"
        className="flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-200 active:scale-[0.98]"
        style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #222' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background:'rgba(56,189,248,0.1)', border:'1px solid rgba(56,189,248,0.2)' }}>
          <FolderOpen size={18} className="text-[#38bdf8]" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <p className="text-[#e0e0e0] font-medium text-sm">Meus Projetos</p>
          <p className="text-[#444] text-xs">Ver todos os sistemas Beyonder</p>
        </div>
        <ChevronRight size={15} className="text-[#333]" />
      </Link>

      {/* conta / auth */}
      <div className="rounded-2xl divide-y divide-[#1a1a1a]"
        style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #222' }}>
        <button onClick={() => setShowConta(v => !v)}
          className="flex items-center gap-3 w-full px-4 py-4 active:bg-[#111] transition-colors text-left">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'rgba(201,168,76,0.1)' }}>
            <User size={16} style={{ color:'#C9A84C' }} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-[#e0e0e0] text-sm font-medium">Conta</p>
            <p className="text-[#444] text-xs">Dados e autenticação</p>
          </div>
          <ChevronRight size={14} className="text-[#333] transition-transform" style={{ transform: showConta ? 'rotate(90deg)' : 'none' }} />
        </button>

        {showConta && (
          <div className="px-4 py-4 space-y-3 animate-fade-slide-up">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid #1e1e1e' }}>
              <Mail size={14} className="text-[#555] flex-none" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#444] uppercase tracking-wider mb-0.5">E-mail</p>
                <p className="text-[#e0e0e0] text-sm truncate">{email || '–'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid #1e1e1e' }}>
              <User size={14} className="text-[#555] flex-none" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[10px] text-[#444] uppercase tracking-wider mb-0.5">Nome exibido</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#e0e0e0] text-sm">{displayName}</p>
                  <button onClick={() => { setEditNome(true); setNomeInput(nome); setShowConta(false) }}
                    className="text-[10px] text-[#C9A84C] hover:underline">Editar</button>
                </div>
              </div>
            </div>
            <p className="text-[#333] text-[10px] text-center">
              Autenticação via Supabase Auth · Magic Link / Email
            </p>
          </div>
        )}
      </div>

      {/* logout */}
      <button onClick={handleLogout}
        className="w-full rounded-2xl px-4 py-4 flex items-center gap-3 active:bg-[rgba(248,113,113,0.05)] transition-colors"
        style={{ background:'rgba(255,255,255,0.02)', border:'1px solid #222' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(248,113,113,0.08)]">
          <LogOut size={16} className="text-[#f87171]" strokeWidth={1.5} />
        </div>
        <span className="text-[#f87171] text-sm font-medium">Sair da conta</span>
      </button>

      <div className="h-2" />
    </div>
  )
}
