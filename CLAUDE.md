# CLAUDE.md — Diretivas do Projeto

> Este arquivo é lido automaticamente pelo Claude Code ao entrar na pasta.
> Ele define regras, contexto e comportamento esperado para TODO o projeto.

---

## IDENTIDADE DO PROJETO

**Nome:** Elysium
**Criado por:** Beyonder · 2026
**Tipo:** Progressive Web App (PWA) mobile-first
**Foco principal:** iPhone — toda decisão de UI/UX prioriza iOS Safari
**Idioma:** Português brasileiro em toda a interface
**Visual:** Dark mode elegante, inspirado no Mamon (https://mamon-azure.vercel.app/)

### Branding
- Logo: três barras horizontais douradas alinhadas à esquerda — símbolo "E" geométrico minimalista, dourado (#C9A84C) sobre fundo preto
- Wordmark: "ELYSIUM" em Helvetica Neue / Arial, weight 200, letter-spacing generoso, cor #C9A84C
- Assinatura institucional: "Feito pela Beyonder · 2026" — exibir abaixo da logo na tela de login e no rodapé de Configurações, em #555 (text-muted)
- Sem tagline na logo principal — apenas símbolo + nome
- Cor de destaque da marca: `--brand-gold: #C9A84C`
- Arquivos de logo: `assets/elysium-logo.svg` (logo completa 680×280) e `assets/elysium-favicon.svg` (ícone 512×512)
- Na página de login: exibir ElysiumLoginLogo centralizado sobre fundo #0c0c0c, com a assinatura "Feito pela Beyonder · 2026" 24px abaixo
- No manifest PWA: usar `assets/elysium-favicon.svg` como base dos ícones

---

## STACK (não questionar, não sugerir alternativas)

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14+ com App Router |
| Linguagem | TypeScript strict |
| Estilo | Tailwind CSS |
| Componentes | shadcn/ui |
| Ícones | Lucide React |
| Gráficos | Recharts |
| Banco | Supabase (PostgreSQL + Auth + RLS) |
| Deploy | Vercel |
| Formulários | React Hook Form + Zod |
| Datas | date-fns com locale pt-BR |

---

## ARQUITETURA OBRIGATÓRIA

```
app/
├── layout.tsx
├── (auth)/login/page.tsx       ← magic link, exibir ElysiumLoginLogo centralizado + assinatura Beyonder
├── (app)/
│   ├── layout.tsx              ← BottomNav (mobile) + Sidebar (desktop ≥768px)
│   ├── page.tsx                ← Dashboard
│   ├── financas/page.tsx
│   ├── estudos/page.tsx
│   ├── saude/page.tsx
│   ├── rotina/page.tsx
│   └── calendario/page.tsx
components/layout/
├── BottomNav.tsx
├── Sidebar.tsx                 ← exibir ElysiumSymbol no topo
├── ElysiumLogo.tsx             ← SVG da logo inline (ver abaixo)
└── PageHeader.tsx
lib/
├── supabase/client.ts
├── supabase/server.ts
├── hooks/
└── utils/formatters.ts
public/
├── manifest.json
└── icons/
    ├── icon-192.png
    └── icon-512.png
assets/
├── elysium-logo.svg
└── elysium-favicon.svg
```

---

## COMPONENTE ElysiumLogo.tsx

```tsx
// components/layout/ElysiumLogo.tsx

export function ElysiumSymbol({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#0c0c0c" rx="5"/>
      <g transform="translate(16,16)">
        <rect x="-9" y="-9.5" width="18" height="2.8" rx="1" fill="#C9A84C"/>
        <rect x="-9" y="-1.4" width="12" height="2.8" rx="1" fill="#C9A84C"/>
        <rect x="-9" y="6.7"  width="18" height="2.8" rx="1" fill="#C9A84C"/>
      </g>
    </svg>
  )
}

export function ElysiumLogoFull({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ''}`}>
      <ElysiumSymbol size={44} />
      <span style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 200,
        letterSpacing: '0.35em',
        color: '#C9A84C',
        fontSize: '22px',
        lineHeight: 1,
      }}>
        ELYSIUM
      </span>
    </div>
  )
}

export function ElysiumLoginLogo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <svg width="72" height="72" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#0c0c0c" rx="80"/>
        <g transform="translate(256,256)">
          <rect x="-144" y="-152" width="288" height="44" rx="12" fill="#C9A84C"/>
          <rect x="-144" y="-22"  width="192" height="44" rx="12" fill="#C9A84C"/>
          <rect x="-144" y="108"  width="288" height="44" rx="12" fill="#C9A84C"/>
        </g>
      </svg>
      <span style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 200,
        letterSpacing: '0.4em',
        color: '#C9A84C',
        fontSize: '26px',
      }}>
        ELYSIUM
      </span>
      <span style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 300,
        letterSpacing: '0.18em',
        color: '#555555',
        fontSize: '11px',
        marginTop: '4px',
        textTransform: 'uppercase',
      }}>
        Feito pela Beyonder · 2026
      </span>
    </div>
  )
}
```

---

## PALETA DE CORES (usar apenas estas)

```css
--bg-base:       #0c0c0c
--bg-surface:    #111111
--bg-elevated:   #1a1a1a
--border:        #222222
--border-strong: #333333
--text-primary:  #e8e8e8
--text-secondary:#888888
--text-muted:    #555555
--brand-gold:    #C9A84C
--finance:       #4ade80
--study:         #60a5fa
--health:        #f87171
--routine:       #facc15
```

---

## REGRAS DE CÓDIGO

### TypeScript
- `strict: true` no tsconfig
- Sem `any` em tipos de domínio
- Interfaces em `lib/types.ts`
- Sem `// @ts-ignore`

### React / Next.js
- Server Components por padrão — `'use client'` apenas quando necessário
- `loading.tsx` em todas as rotas com skeleton screens
- `error.tsx` global com botão de retry

### Supabase
- Jamais hardcodar user_id — sempre via RLS ou `supabase.auth.getUser()`
- Singleton: `createClient()` de `lib/supabase/client.ts`
- RLS ativo em todas as tabelas

### Formulários
- React Hook Form + Zod
- Erro inline abaixo do campo
- Toast apenas para sucesso (2s)
- Sem modais — usar shadcn Sheet com `side="bottom"`

---

## REGRAS MOBILE-FIRST (CRÍTICAS)

```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0c0c0c',
}
```

1. Touch targets mínimos: 44×44px
2. Inputs com font-size: 16px (evita zoom no Safari)
3. `h-[100dvh]` no lugar de `h-screen`
4. `padding-bottom: env(safe-area-inset-bottom)` em `fixed bottom-0`
5. Sem `backdrop-filter: blur()` animado
6. `active:` em todo elemento com `hover:`
7. `inputMode="decimal"` em campos de valor
8. `touch-action: manipulation` globalmente
9. `-webkit-overflow-scrolling: touch` em listas com scroll
10. `scroll-snap-type: x mandatory` em carrosséis

### Nunca usar
- `filter: blur()` em elementos animados
- `overflow: hidden` no `<body>`
- `position: fixed` sem safe-area padding
- `100vh` (usar `100dvh`)
- Modais full-screen
- Spinners (usar skeleton)

---

## ANIMAÇÕES PADRÃO

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeSlideUp 200ms ease-out both; }

@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}
```

---

## COMPONENTES PADRÃO

```tsx
<div className="bg-[#111111] border border-[#222222] rounded-xl p-4">

<SheetContent side="bottom" className="h-[90dvh] bg-[#111111] border-t border-[#222222] rounded-t-2xl px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
  <div className="w-10 h-1 bg-[#333] rounded-full mx-auto mt-3 mb-6" />

<input className="h-11 w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 text-[#e8e8e8] text-base focus:border-[#555] outline-none transition-colors" />

<button className="h-12 w-full bg-[#e8e8e8] text-[#0c0c0c] font-medium rounded-xl active:scale-[0.97] transition-transform">
```

---

## PWA MANIFEST

```json
{
  "name": "Elysium",
  "short_name": "Elysium",
  "description": "Organize sua vida com Elysium — um produto Beyonder",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0c0c0c",
  "theme_color": "#0c0c0c",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

---

## BANCO DE DADOS

Schema em `03_SUPABASE_SETUP.sql`. Tabelas: `profiles`, `activities`, `transactions`, `routines`, `checklist_items`. RLS ativo em todas.

---

## GIT E DEPLOY

- Conventional Commits: `feat:` `fix:` `style:` `refactor:` `chore:`
- `main` → produção | `dev` → desenvolvimento
- Nunca commitar `.env.local`

---

## ORDEM DE DESENVOLVIMENTO

```
[ ] 1.  next-app + tailwind + shadcn + dependências
[ ] 2.  globals.css com variáveis CSS + animações + reset mobile
[ ] 3.  Copiar assets/ para public/icons/ e converter SVG → PNG
[ ] 4.  Criar components/layout/ElysiumLogo.tsx (código acima)
[ ] 5.  app/layout.tsx — viewport PWA, meta tags Apple, Geist, manifest
[ ] 6.  BottomNav + Sidebar (ElysiumSymbol no topo) + PageHeader
[ ] 7.  Middleware auth + login (ElysiumLoginLogo + assinatura Beyonder centralizadas)
[ ] 8.  lib/supabase/ + lib/types.ts + lib/utils/formatters.ts
[ ] 9.  Dashboard com dados mockados
[ ] 10. Módulo Finanças
[ ] 11. Checklist + Rotinas
[ ] 12. Módulo Estudos + Pomodoro
[ ] 13. Módulo Saúde
[ ] 14. Calendário
[ ] 15. Configurações (incluir rodapé "Feito pela Beyonder · 2026") + PWA manifest
[ ] 16. Substituir mocks por Supabase real
[ ] 17. Skeleton + EmptyState + Error boundaries
[ ] 18. Build limpo + teste iPhone
```

---

## COMPORTAMENTO ESPERADO DO CLAUDE CODE

- Não perguntar sobre decisões técnicas deste arquivo
- Perguntar apenas sobre ambiguidades de regra de negócio
- Sempre criar `loading.tsx` junto com cada `page.tsx`
- Sempre usar Sheet para formulários (não Dialog/Modal)
- Sempre testar mentalmente em viewport 375px
- Sempre checar safe-area em elementos fixos
- Nunca criar componente sem loading e empty state
- Nunca hardcodar cores — usar variáveis CSS
- Nunca chamar o app de "Organizador Pessoal", "Pessoal" ou "Amenti" — o nome é **Elysium**, criado pela **Beyonder** em **2026**
