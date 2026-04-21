# PROMPTS EXTRAS — Melhorias e Ajustes

> Use estes prompts prontos para pedir ao Claude Code melhorias especificas.
> Cole o prompt inteiro no Claude Code. Sem precisar explicar nada.

---

## VISUAL E DESIGN

### Melhorar visual geral

```
Faca uma revisao completa do visual do app e aplique estas melhorias:
1. Adicionar micro-animacoes de entrada em todos os cards (fade + slide up de 8px, stagger de 50ms entre cards)
2. Garantir que todos os numeros grandes facam counter animation (de 0 ate o valor em 600ms) no primeiro carregamento
3. Adicionar estado de hover mais pronunciado nos itens de lista (background #1a1a1a + borda esquerda 2px colorida por dominio)
4. Revisar todos os skeleton screens — devem ter exatamente a mesma geometria que o conteudo real
5. Garantir que a fonte Geist esta sendo usada em 100% dos textos do app
```

### Polimento do dark mode

```
Revise o dark mode do app inteiro e corrija:
1. Qualquer texto escuro em fundo escuro (usar #e8e8e8 para texto primario, #888 para secundario, #555 para muted)
2. Inputs que ficam com fundo branco ao focar no Safari iOS — forcar background #1a1a1a com !important
3. Scrollbar visivel no desktop — aplicar scrollbar-width: none no Firefox e ::-webkit-scrollbar { display: none } no Chrome/Safari
4. Garantir que o tema e aplicado via CSS variables, nao hardcodado em cada componente
```

### Melhorar os graficos

```
Melhore todos os graficos Recharts do app:
1. Tooltip customizado em todos: fundo #1a1a1a, borda #333, fonte Geist 13px
2. Remover linhas de grade verticais (apenas horizontais, com opacidade 0.1)
3. Eixos sem linha axisLine={false} tickLine={false}
4. Cores dos graficos usando as variaveis de dominio (finance=#4ade80, study=#60a5fa, health=#f87171)
5. Graficos de area com gradiente sutil (opacidade 20% para 0%)
6. ResponsiveContainer height={160} no mobile, height={220} no desktop
7. Animacao de entrada dos graficos (isAnimationActive={true} animationDuration={800})
```

---

## MOBILE E IPHONE

### Testar e corrigir iPhone SE (375px)

```
O app precisa funcionar perfeitamente em iPhone SE com tela de 375px de largura. Faca:
1. Verificar se algum elemento ultrapassa os 375px horizontalmente
2. Reduzir padding/margin onde necessario para telas pequenas usando classes sm: do Tailwind
3. Garantir que os cards de stats no dashboard tem min-width adequado e nao quebram
4. Verificar se o BottomNav cabe com 5 itens sem comprimir demais (usar font-size 10px nos labels se necessario)
5. Testar em viewport 375x667px e corrigir qualquer overflow
```

### Melhorar gestos e interacoes touch

```
Adicione interacoes touch nativas para iPhone:
1. Swipe para deletar nas listas de transacoes e atividades (deslizar para esquerda revela botao vermelho de deletar)
2. Long-press nos itens do checklist para reordenar
3. Pull-to-refresh em todas as listas principais (puxar para baixo recarrega os dados)
4. Tap feedback em todos os botoes: active:scale-[0.96] active:opacity-80 transition-all duration-75
5. Implementar usando React refs + eventos touch nativos (touchstart/touchmove/touchend), sem bibliotecas extras
```

### Velocidade no iPhone

```
Otimize a performance do app especificamente para iPhone:
1. Adicionar loading="lazy" em todas as imagens
2. Usar React.memo nos componentes de lista que renderizam muitos itens (TransactionItem, ChecklistItem, ActivityItem)
3. Usar useMemo nas computacoes de totais e agregacoes nos hooks
4. Implementar virtualizacao com react-window na lista de transacoes se tiver mais de 50 itens
5. Remover qualquer filter: blur() animado
6. Adicionar preload dos dados criticos do dashboard via Next.js prefetch
```

---

## FUNCIONALIDADES

### Melhorar modulo de financas

```
Melhore o modulo de Financas com:
1. Campo de valor com formatacao automatica enquanto digita (R$ 1.234,56)
2. Categorias com icones coloridos (nao apenas texto)
3. Ao deslizar item de transacao para esquerda: revelar botao "Deletar" vermelho
4. Total do periodo em destaque no topo com delta comparado ao periodo anterior (+12% vs mes passado)
5. Grafico de pizza de categorias clicavel — ao tocar numa fatia, filtrar a lista por aquela categoria
6. Exportar transacoes como CSV via botao em Configuracoes
```

### Melhorar o timer Pomodoro

```
Melhore o timer Pomodoro no modulo de Estudos:
1. Anel de progresso SVG animado que vai reduzindo a medida que o tempo passa
2. Som de notificacao ao finalizar (usar AudioContext para nao precisar de arquivo externo)
3. Vibracao haptica ao completar uma sessao (navigator.vibrate)
4. Contador de sessoes completadas no dia (3 tomates = 3 sessoes)
5. Configuravel: tempo de foco (25min padrao) e tempo de pausa (5min padrao) editaveis
6. Estado persistido no localStorage — se fechar o app e abrir, o timer continua de onde parou
7. Notificacao do sistema quando o timer termina (Web Notifications API, com permissao)
```

### Melhorar o checklist

```
Melhore o modulo de Checklist/Rotina:
1. Animacao de conclusao: ao marcar item, linha risca com transicao de 300ms + opacidade cai para 40%
2. Itens concluidos vao automaticamente para o final da lista com animacao de movimento
3. Progress ring no topo (SVG) mostrando X/Y completados com animacao de preenchimento
4. Ao concluir todos os itens: confetti animation simples (20 particulas coloridas caindo)
5. Swipe para a direita em item pendente = marcar como concluido (com haptic feedback)
6. Reordenacao com long-press usando @dnd-kit/sortable
```

### Melhorar o calendario

```
Melhore o Calendario:
1. Swipe horizontal para navegar entre meses (gesture nativo, nao botoes apenas)
2. Dots coloridos por dominio em cada dia com atividade (ate 3 dots, depois mostra numero)
3. Ao tocar num dia: Sheet abre pelo bottom com as atividades daquele dia agrupadas por dominio
4. Hoje destacado com circulo na cor de destaque
5. Dias com streak de treino com fundo levemente colorido (#f87171 com 10% opacidade)
```

---

## CONFIGURACOES E POLISH

### Configurar notificacoes WhatsApp

```
Implemente o sistema de notificacoes WhatsApp:
1. Pagina de configuracoes com campo de numero (formatacao automatica +55 XX 9XXXX-XXXX)
2. 4 templates configuravéis: Resumo diario | Lembrete de estudo | Alerta financeiro | Streak de treino
3. Para cada template: toggle ativo/inativo + botao "Testar agora" que abre wa.me com a mensagem
4. As mensagens devem ser geradas dinamicamente com dados reais do usuario
5. Botao "Compartilhar resumo da semana" que gera link WhatsApp com resumo formatado
```

### Configurar como PWA

```
Configure o app como PWA completo para iPhone:
1. Criar public/manifest.json com nome "Pessoal", tema escuro, display standalone
2. Criar icones SVG em /public/icons/ nos tamanhos 192x192 e 512x512 (letra P estilizada em fundo #0a0a0a)
3. Adicionar todas as meta tags apple-mobile-web-app-* no layout raiz
4. Criar botao "Adicionar a tela inicial" visivel apenas no Safari mobile com instrucoes
5. Verificar que o app funciona offline para leitura de dados ja carregados (cache basico)
```

### Otimizacoes de deploy

```
Prepare o projeto para deploy na Vercel:
1. Verificar se todas as variaveis de ambiente estao documentadas em .env.example
2. Configurar next.config.js com otimizacoes: imagens otimizadas, compressao, headers de cache
3. Adicionar loading.tsx em todas as rotas para melhorar percepcao de velocidade
4. Adicionar error.tsx global com botao de retry
5. Verificar build sem erros: rodar npm run build e corrigir qualquer erro de TypeScript ou lint
6. Garantir que o dominio do Supabase Storage esta na allowlist de imagens do Next.js
```

---

## DEBUGGING

### Corrigir erros

```
O app esta com este erro: [COLE O ERRO AQUI]

Diagnostique a causa, explique em portugues simples o que esta errado e corrija.
```

### App lento no iPhone

```
O app esta travando/lento no iPhone. Faca um diagnostico completo:
1. Identificar re-renders desnecessarios
2. Verificar se ha useEffect sem cleanup que causa memory leak
3. Verificar se algum componente esta buscando dados repetidamente sem cache
4. Verificar se ha animacoes CSS usando propriedades que nao sao GPU-accelerated (usar apenas transform e opacity)
5. Listar os 3 principais problemas encontrados e corrigir todos
```

### Layout quebrado no iPhone

```
O layout esta com problemas visuais no iPhone. Corrija:
1. Qualquer elemento com posicao fixa que esta sendo coberto pela barra de navegacao ou home indicator
2. Texto ou botao cortado nas bordas da tela
3. Scroll horizontal indesejado
4. Elemento que ultrapassa os limites da tela
Teste simulando viewport de 375x667 (iPhone SE) e 390x844 (iPhone 14).
```
