# 📱 GUIA DO LEIGO — Passo a passo completo

> Leia este arquivo antes de qualquer coisa. Tudo está na ordem certa.

---

## O QUE VOCÊ VAI CONSTRUIR

Um app web pessoal que funciona **instalado no iPhone como app nativo** para organizar:

| Módulo | O que faz |
|---|---|
| 💰 Finanças | Entradas, saídas, metas de economia, gráficos |
| 📚 Estudos | Sessões, timer Pomodoro, horas na semana |
| 🏋️ Saúde | Treinos, alimentação, streak de dias |
| ✅ Rotina | Checklist diário com reset automático à meia-noite |

Visual escuro, moderno, rápido no toque — igual ao estilo do Mamon.

---

## MAPA DOS ARQUIVOS DESTA PASTA

```
organizador-pessoal/
├── SETUP.sh                  ← rode PRIMEIRO (instala tudo automaticamente)
├── CLAUDE.md                 ← arquivo mágico: o Claude Code lê isso sozinho
├── 00_LEIA_PRIMEIRO.md       ← este arquivo
├── 01_PROMPT_INICIAL.md      ← cole no Claude Code para construir o app
├── 02_MOBILE_IPHONE.md       ← cole depois para otimizar o iPhone
├── 03_SUPABASE_SETUP.sql     ← cole no Supabase para criar o banco
├── 04_PROMPTS_EXTRAS.md      ← melhorias e ajustes pontuais
└── 05_DEPLOY_COMMANDS.md     ← comandos para subir no GitHub e Vercel
```

---

## ETAPA 0 — Setup no Windows (PowerShell como Administrador)

Abra o PowerShell como Administrador (botão direito no menu Iniciar → "Windows PowerShell (Admin)") e rode:

```powershell
# Permitir scripts
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Instalar ferramentas
npm install -g vercel
winget install GitHub.cli

# Fazer login
gh auth login
vercel login
```

---

## ETAPA 1 — Criar o banco de dados no Supabase

1. Acesse https://supabase.com → faça login
2. Clique **"New Project"** → nome: `organizador-pessoal` → crie uma senha forte → clique **Create**
3. Aguarde ~2 minutos
4. Menu lateral → **SQL Editor** → **New query**
5. Abra o arquivo `03_SUPABASE_SETUP.sql`, copie tudo, cole, clique **Run**
6. Deve aparecer: `Migration aplicada com sucesso! ✅`

**Guardar as chaves (você vai precisar):**
1. Menu lateral → **Project Settings** → **API**
2. Copie: **Project URL** (começa com `https://`)
3. Copie: **anon public** (texto longo)

---

## ETAPA 2 — Criar a pasta do projeto e iniciar o Claude Code

Abra o PowerShell e rode:

```powershell
# Criar pasta do projeto na área de trabalho
mkdir $env:USERPROFILE\Desktop\meu-organizador
cd $env:USERPROFILE\Desktop\meu-organizador

# Copiar o CLAUDE.md para dentro do projeto
copy $env:USERPROFILE\Desktop\organizador-pessoal\CLAUDE.md .

# Iniciar o Claude Code
claude
```

> **Por que copiar o CLAUDE.md?** O Claude Code lê este arquivo automaticamente ao entrar na pasta. Ele já vai saber todas as regras, cores, componentes — sem você precisar explicar nada.

---

## ETAPA 3 — Construir o app

Com o Claude Code aberto, cole o conteúdo do arquivo `01_PROMPT_INICIAL.md`.

O Claude Code vai criar tudo automaticamente. Pode demorar 15–30 minutos. Quando parar e mostrar `>`, está pronto.

---

## ETAPA 4 — Configurar as chaves do Supabase

Dentro do Claude Code, escreva:

```
Crie o arquivo .env.local com:
NEXT_PUBLIC_SUPABASE_URL=COLE_AQUI_O_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=COLE_AQUI_A_ANON_KEY
```

(substitua pelos valores que você copiou no passo da Etapa 1)

---

## ETAPA 5 — Ver o app rodando

```powershell
npm run dev
```

Abra no navegador: **http://localhost:3000**

Para testar no iPhone (mesma rede Wi-Fi):
1. No PowerShell: `ipconfig` → procure "Endereço IPv4"
2. No iPhone: acesse `http://[SEU-IP]:3000`

---

## ETAPA 6 — Otimizar para iPhone

Com o app rodando, volte ao Claude Code e cole o conteúdo de `02_MOBILE_IPHONE.md`.

---

## ETAPA 7 — Subir para o GitHub e publicar na Vercel

Siga o arquivo `05_DEPLOY_COMMANDS.md` — são 5 comandos no terminal.

---

## ETAPA 8 — Instalar no iPhone como app

Depois de publicado na Vercel:
1. Abra o link no **Safari** do iPhone (não Chrome)
2. Toque no ícone de compartilhar (quadrado com seta para cima)
3. Role para baixo → **"Adicionar à Tela de Início"**
4. Toque **Adicionar**

O app aparece na tela inicial com ícone próprio, sem barra do browser. ✅

---

## SE ALGO DER ERRADO

**Erro no terminal:** copie a mensagem e cole no Claude Code:
> "Ocorreu este erro: [cole aqui]. Como resolver?"

**Claude Code travado:** pressione `Ctrl+C`, espere 5 segundos, rode `claude` novamente

*O Claude Code entende português. Descreva o que está vendo que ele resolve.*
