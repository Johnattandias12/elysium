# 05_DEPLOY_COMMANDS.md — GitHub + Vercel

> Use este arquivo quando o app estiver funcionando localmente.
> Sao 5 comandos no terminal — copie e cole um por vez.

---

## PRE-REQUISITO

Voce esta autenticado no GitHub (`gh auth login`) e na Vercel (`vercel login`).
O app roda sem erros em `npm run dev`.

---

## PASSO 1 — Pedir ao Claude Code para preparar o repositorio

Cole no Claude Code:
```
Prepare o projeto para o GitHub:
1. Verifique se o .gitignore esta correto (deve incluir: .env.local, .env, node_modules/, .next/, .vercel/)
2. Crie o README.md com: descricao do projeto, como rodar localmente, variaveis de ambiente necessarias e tecnologias usadas
3. Faca o commit inicial: git init && git add . && git commit -m "feat: initial project setup"
Me avise quando terminar.
```

---

## PASSO 2 — Criar repositorio no GitHub e subir o codigo

No PowerShell, dentro da pasta do projeto (meu-organizador):

```powershell
gh repo create organizador-pessoal --private --source=. --remote=origin --push
```

Isso cria o repositorio privado no GitHub e ja sobe todo o codigo. Uma linha.

Verifique em: https://github.com

---

## PASSO 3 — Fazer o deploy na Vercel

```powershell
vercel
```

A Vercel vai perguntar:
- Set up and deploy? → y
- Which scope? → selecione sua conta pessoal
- Link to existing project? → N
- What's your project's name? → organizador-pessoal (Enter)
- In which directory is your code located? → ./ (Enter)
- Want to modify these settings? → N

Aguarde. Vai aparecer uma URL como: https://organizador-pessoal.vercel.app

---

## PASSO 4 — Adicionar as variaveis de ambiente na Vercel

```powershell
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Cole o Project URL quando pedir
# Escolha: Production, Preview, Development → Enter

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Cole a Anon Key quando pedir
# Escolha: Production, Preview, Development → Enter
```

---

## PASSO 5 — Deploy de producao com as variaveis

```powershell
vercel --prod
```

Apos terminar, a URL de producao estara ativa. Abra no iPhone para testar. ✅

---

## DEPLOY AUTOMATICO (todo push = novo deploy)

A partir de agora, qualquer push faz deploy automatico:

```powershell
git add .
git commit -m "feat: nova funcionalidade"
git push
```

A Vercel detecta e faz o deploy sozinha em ~2 minutos.

---

## COMANDOS UTEIS

```powershell
vercel ls           # ver todos os deploys
vercel open         # abrir o app no browser
vercel logs         # ver logs
```

---

## SE A VERCEL MOSTRAR ERRO DE BUILD

Cole no Claude Code:
```
O deploy na Vercel falhou com este erro: [cole o erro aqui]
Corrija todos os erros de TypeScript e build. Rode npm run build localmente,
corrija tudo ate passar sem erros, e faca um novo commit.
```

---

## RESUMO RAPIDO

```powershell
# 1. Claude Code prepara o git (ver Passo 1)

# 2. Subir para GitHub
gh repo create organizador-pessoal --private --source=. --remote=origin --push

# 3. Primeiro deploy
vercel

# 4. Variaveis
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# 5. Producao
vercel --prod

# Deploys futuros
git add . && git commit -m "mensagem" && git push
```
