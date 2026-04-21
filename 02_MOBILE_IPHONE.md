# PROMPT MOBILE/IPHONE — Cole no Claude Code após o projeto estar funcionando

> Use este prompt quando o app já estiver rodando localmente. Ele faz uma varredura completa e corrige tudo para iPhone.

---

Faça uma auditoria completa do projeto e aplique todas as otimizações abaixo para que o app funcione perfeitamente no iPhone. Verifique arquivo por arquivo e corrija cada ponto.

## 1. VIEWPORT E META TAGS

No `app/layout.tsx`, garantir que o viewport seja:

```typescript
import { type Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
}
```

E no `<head>` do layout raiz:
```tsx
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Pessoal" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
<link rel="manifest" href="/manifest.json" />
```

## 2. SAFE AREAS (NOTCH / DYNAMIC ISLAND / HOME INDICATOR)

Em `globals.css`, adicionar:
```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

O BottomNav precisa de padding extra embaixo:
```css
.bottom-nav {
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  height: calc(56px + env(safe-area-inset-bottom));
}
```

Todo conteúdo com `fixed bottom-0` precisa de `pb-[env(safe-area-inset-bottom)]`.

## 3. TOUCH TARGETS

Varrer todos os elementos interativos. Regra: **mínimo 44x44px**. Aplicar:

```css
button, a, [role="button"], input[type="checkbox"], input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
}
```

## 4. FORMULÁRIOS — PREVENIR ZOOM

Todo input, select e textarea DEVE ter font-size: 16px ou maior.

```css
input, select, textarea {
  font-size: 16px !important;
  -webkit-text-size-adjust: 100%;
}
```

## 5. SCROLL NATIVO

```css
.scroll-container {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
}

.stats-scroll {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  scrollbar-width: none;
}
.stats-scroll::-webkit-scrollbar { display: none; }

.stats-card {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

## 6. ELIMINAR BLUR E GLASSMORPHISM

Varrer todos os arquivos e remover qualquer `backdrop-blur`, `blur-*`, `backdrop-filter` animado.
Substituir por: `background: rgba(17, 17, 17, 0.95);`

## 7. PERFORMANCE: GPU ACCELERATION

```css
.list-container { transform: translateZ(0); will-change: scroll-position; }
.animated-element { will-change: transform, opacity; }
```

## 8. SHEETS E DRAWERS

```tsx
<SheetContent
  side="bottom"
  className="bg-[#111111] border-t border-[#222222] rounded-t-2xl h-[90dvh] px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
>
  <div className="w-10 h-1 bg-[#333] rounded-full mx-auto mt-3 mb-6" />
</SheetContent>
```

## 9. TECLADO NUMÉRICO NOS INPUTS

```tsx
<input type="text" inputMode="decimal" pattern="[0-9]*" placeholder="0,00" />
<input type="text" inputMode="numeric" pattern="[0-9]*" />
```

## 10. ACTIVE STATES

```tsx
// Todo elemento com hover: deve ter active: correspondente
<button className="hover:bg-[#1a1a1a] active:bg-[#222] active:scale-[0.97] transition-all duration-100">
```

## 11. HEIGHT DINAMICO (dvh)

Substituir todos os `h-screen`, `min-h-screen`, `100vh` por `h-[100dvh]` e `min-h-[100dvh]`.

## 12. PREVENIR DOUBLE TAP ZOOM

```css
* { touch-action: manipulation; }
```

## 13. TEXTO NAO SELECIONAVEL

```css
button, nav, .bottom-nav, .stat-card { -webkit-user-select: none; user-select: none; }
```

## 14. FEEDBACK HAPTICO

```typescript
// lib/utils/haptics.ts
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light') {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    const patterns = { light: 10, medium: 25, heavy: 50 }
    navigator.vibrate(patterns[type])
  }
}
```

## 15. VERIFICACAO FINAL

- [ ] App abre sem erros no Safari mobile
- [ ] Barra de status nao sobrepoe o conteudo
- [ ] Home indicator nao sobrepoe o BottomNav
- [ ] Nenhum input da zoom ao focar
- [ ] Todos os botoes tem area de toque de 44px+
- [ ] Scroll funciona suave sem travamento
- [ ] Sheets abrem e fecham com swipe down
- [ ] Cards de stats sao roleveis horizontalmente com snap
- [ ] Teclado numerico abre nos campos de valor
- [ ] App pode ser adicionado a tela inicial (PWA)
- [ ] Funciona em iPhone SE (375px) sem scroll horizontal

Aplique todas as correcoes e informe quais arquivos foram modificados.
