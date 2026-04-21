# 01_PROMPT_INICIAL.md — Cole inteiro no Claude Code

> Pré-requisito: o arquivo CLAUDE.md já está na pasta do projeto.
> Cole TODO o conteúdo abaixo no Claude Code de uma vez.

---

Leia o arquivo CLAUDE.md desta pasta — ele contém as regras completas do projeto. Siga-as estritamente.

Construa o sistema de organização pessoal completo conforme especificado. Vou detalhar o que precisa ser feito em cada etapa:

---

## ETAPA 1 — Setup do projeto

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
npx shadcn@latest init -d
npm install @supabase/supabase-js @supabase/ssr recharts lucide-react date-fns react-hook-form zod @hookform/resolvers
```

No `tailwind.config.ts`, adicionar as variáveis CSS como custom colors:
```typescript
extend: {
  colors: {
    base: 'var(--bg-base)',
    surface: 'var(--bg-surface)',
    elevated: 'var(--bg-elevated)',
    finance: 'var(--finance)',
    study: 'var(--study)',
    health: 'var(--health)',
    routine: 'var(--routine)',
  }
}
```

---

## ETAPA 2 — globals.css e variáveis

Adicionar ao `app/globals.css`:

```css
:root {
  --bg-base: #0a0a0a;
  --bg-surface: #111111;
  --bg-elevated: #1a1a1a;
  --border: #222222;
  --border-strong: #333333;
  --text-primary: #e8e8e8;
  --text-secondary: #888888;
  --text-muted: #555555;
  --finance: #4ade80;
  --study: #60a5fa;
  --health: #f87171;
  --routine: #facc15;
}

* {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  background: var(--bg-base);
  color: var(--text-primary);
  overscroll-behavior: none;
}

input, select, textarea {
  font-size: 16px !important;
}

/* Skeleton shimmer */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}

/* Entrada de cards */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeUp 200ms ease-out both; }

/* Scroll sem scrollbar */
.scroll-hidden { scrollbar-width: none; }
.scroll-hidden::-webkit-scrollbar { display: none; }
```

---

## ETAPA 3 — app/layout.tsx

```typescript
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pessoal',
  description: 'Seu organizador pessoal',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Pessoal',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={GeistSans.className}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## ETAPA 4 — lib/types.ts (interfaces completas)

Criar `lib/types.ts` com todas as interfaces TypeScript para as entidades do banco:
- `Profile`, `Activity`, `Transaction`, `Routine`, `ChecklistItem`
- Tipos auxiliares: `Domain`, `ActivityType`, `TransactionType`, `Frequency`

---

## ETAPA 5 — lib/supabase/

Criar `lib/supabase/client.ts` (singleton para browser) e `lib/supabase/server.ts` (para Server Components).
Criar `middleware.ts` na raiz protegendo todas as rotas `(app)/`.

---

## ETAPA 6 — lib/utils/formatters.ts

```typescript
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}min`
  const h = Math.floor(minutes / 60), m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

export const formatDate = (d: Date | string) =>
  format(new Date(d), "d 'de' MMMM", { locale: ptBR })

export const formatDateShort = (d: Date | string) =>
  format(new Date(d), 'dd/MM', { locale: ptBR })

export const formatRelative = (d: Date | string) =>
  formatDistanceToNow(new Date(d), { addSuffix: true, locale: ptBR })

export const formatMonth = (d: Date | string) =>
  format(new Date(d), 'MMM/yy', { locale: ptBR })
```

---

## ETAPA 7 — Layout principal: BottomNav + Sidebar

### BottomNav (mobile — aparece em telas < 768px)

```typescript
// components/layout/BottomNav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, BookOpen, Heart, CheckSquare } from 'lucide-react'

const tabs = [
  { href: '/',         icon: LayoutDashboard, label: 'Início',   color: '#e8e8e8' },
  { href: '/financas', icon: TrendingUp,      label: 'Finanças', color: '#4ade80' },
  { href: '/estudos',  icon: BookOpen,        label: 'Estudos',  color: '#60a5fa' },
  { href: '/saude',    icon: Heart,           label: 'Saúde',    color: '#f87171' },
  { href: '/rotina',   icon: CheckSquare,     label: 'Rotina',   color: '#facc15' },
]

export function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
         style={{ background: '#111111', borderTop: '1px solid #222', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around h-14">
        {tabs.map(({ href, icon: Icon, label, color }) => {
          const active = path === href
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[44px] min-h-[44px] justify-center"
              style={{ color: active ? color : '#555' }}>
              <Icon size={22} />
              <span className="text-[10px] font-medium">{label}</span>
              {active && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: color }} />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

### Layout do app (app/(app)/layout.tsx)

Inclui BottomNav no mobile, Sidebar no desktop, e `padding-bottom` adequado para o BottomNav não cobrir conteúdo.

---

## ETAPA 8 — Página de login

`app/(auth)/login/page.tsx` — formulário com campo de email e botão "Entrar com link mágico".
Após envio: mostrar mensagem "Verifique seu email" sem redirecionar.
Design centralizado, logo "Pessoal" no topo, fundo `#0a0a0a`.

---

## ETAPA 9 — Dashboard

Layout mobile:
1. Header: saudação dinâmica (Bom dia/tarde/noite + nome) + data em pt-BR
2. Stats cards em scroll horizontal com snap: Saldo do mês | Horas de estudo | Treinos | Checklist
3. Checklist de hoje (top 5 + link "ver tudo")
4. Gráfico de atividades dos últimos 7 dias (AreaChart Recharts)
5. Transações recentes (3 itens)

Cards de stats: `min-w-[160px]`, número grande (28px/600), label muted (11px), barra de progresso fina (2px).

---

## ETAPA 10 — Módulo Finanças

- Resumo no topo: 3 cards (Entradas / Saídas / Saldo)
- Filtros em chips horizontais: 7d | 15d | 30d | 3m | Tudo
- Lista de transações com scroll infinito (20 por vez)
- FAB (+) abre Sheet bottom para nova transação
- Formulário da Sheet: valor (`inputMode="decimal"`), tipo (2 botões grandes), categoria (grid de chips), descrição, data
- Gráfico de barras mensais abaixo do fold
- Swipe-to-delete nos itens

---

## ETAPA 11 — Checklist + Rotinas

**Checklist:**
- Progress ring SVG no topo
- Lista com animação de conclusão (risca + opacity)
- Concluídos vão para baixo automaticamente
- Reset automático: checar se `date !== today` no mount

**Rotinas:**
- CRUD de tarefas recorrentes
- Toggle ativo/inativo
- Frequências: diária, dias úteis, fins de semana, semanal

---

## ETAPA 12 — Módulo Estudos

- Timer Pomodoro com anel SVG animado (25min/5min, configurável)
- Heatmap calendário dos últimos 90 dias (células 12px no mobile)
- Meta semanal com progress ring
- Sheet para registrar sessão: matéria, duração, qualidade (5 estrelas touch), notas

---

## ETAPA 13 — Módulo Saúde

- Streak counter no topo ("🔥 5 dias seguidos")
- Cards: treinos na semana | progresso
- Sheet de treino: tipo (grid de 4 botões), duração, intensidade (3 botões Leve/Moderado/Intenso)
- Registro alimentar: refeição + avaliação em 3 emojis grandes

---

## ETAPA 14 — Calendário

- Visualização mensal
- Dots coloridos por domínio em cada dia
- Tap no dia → Sheet com atividades do dia
- Swipe horizontal para trocar mês

---

## ETAPA 15 — Configurações

- Perfil: nome + foto
- Metas: horas de estudo, meta de economia
- WhatsApp: número + templates + botão testar
- Botão "Adicionar à tela inicial" (instruções para iOS)

---

## ETAPA 16 — PWA manifest

Criar `public/manifest.json`:
```json
{
  "name": "Pessoal",
  "short_name": "Pessoal",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

Criar ícones SVG simples em `public/icons/` e convertê-los para PNG.

---

## ETAPA 17 — Conectar Supabase real

Substituir todos os dados mockados pelas queries reais usando os hooks de `lib/hooks/`.

---

## ETAPA 18 — Polimento final

- Skeleton em todos os estados de loading
- EmptyState component para listas vazias
- Error boundaries
- `npm run build` deve passar sem erros

---

Construa cada etapa completamente antes de passar para a próxima. Ao finalizar cada etapa, faça um commit com mensagem descritiva. Me avise quando chegar na Etapa 17 para eu fornecer as chaves do Supabase.
