# 🚀 Guia Completo de Deploy - Chatbot Sobrancelha

Este guia contém instruções detalhadas para fazer deploy do chatbot em diferentes plataformas e ambientes.

---

## 📋 Pré-requisitos

### 🛠️ Ferramentas Necessárias
- **Node.js** (v16 ou superior)
- **NPM** ou **Yarn**
- **Git** para controle de versão
- **Conta no Vercel** (gratuita)
- **Google AI Studio** para API key

### 🔑 Credenciais Necessárias
- **GEMINI_API_KEY**: Chave da API do Google Gemini
- **Conta Vercel**: Para deploy em produção

---

## 🌐 Deploy no Vercel (Recomendado)

### Método 1: Deploy via CLI (Mais Rápido)

#### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login no Vercel
```bash
vercel login
```
Siga as instruções no navegador para autenticar.

#### 3. Deploy do Projeto
```bash
# Na pasta raiz do projeto
cd "/caminho/para/chatbot-sobrancelha"
vercel --prod
```

#### 4. Configurar Variáveis de Ambiente
```bash
vercel env add GEMINI_API_KEY
# Cole sua chave da API Gemini quando solicitado
```

#### 5. Redeploy (se necessário)
```bash
vercel --prod
```

### Método 2: Deploy via GitHub Integration

#### 1. Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte sua conta GitHub
4. Selecione o repositório do chatbot

#### 2. Configurar Build Settings
- **Framework Preset**: Other
- **Build Command**: (deixe em branco)
- **Output Directory**: `public` (se aplicável)
- **Install Command**: `npm install`

#### 3. Adicionar Variáveis de Ambiente
No dashboard do Vercel:
1. Vá em Settings → Environment Variables
2. Adicione: `GEMINI_API_KEY` = `sua_chave_aqui`
3. Selecione todos os ambientes (Production, Preview, Development)

#### 4. Deploy Automático
O deploy será automático a cada push na branch principal.

---

## ⚙️ Configuração de Arquivos

### `vercel.json` - Configuração Principal
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    },
    {
      "src": "*.css",
      "use": "@vercel/static"
    },
    {
      "src": "script.js",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### `.gitignore` - Arquivos a Ignorar
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
.next/
out/
build/
dist/

# Vercel
.vercel

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed

# Coverage directory used by tools like istanbul
coverage

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Backup files
*.backup
*.bak
```

---

## 🔧 Configuração Local para Desenvolvimento

### 1. Clone do Repositório
```bash
git clone https://github.com/seu-usuario/chatbot-sobrancelha.git
cd chatbot-sobrancelha
```

### 2. Instalação das Dependências
```bash
cd backend
npm install
```

### 3. Configuração do Ambiente Local
Crie `.env` na pasta `backend`:
```env
GEMINI_API_KEY=sua_chave_da_api_gemini_aqui
NODE_ENV=development
PORT=3001
```

### 4. Obter Chave da API Gemini
1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Clique em "Create API Key"
3. Copie a chave gerada
4. Adicione no arquivo `.env`

### 5. Executar Localmente
```bash
# Iniciar backend
cd backend
npm start

# Em outro terminal, iniciar frontend
cd ../frontend
python3 -m http.server 8080
# ou
npx http-server -p 8080
```

### 6. Testar Localmente
- **Frontend**: http://localhost:8080
- **API**: http://localhost:3001/api/health

---

## 🐛 Troubleshooting Comum

### Problema: API não responde
**Sintomas**: Erro 500 ou timeout na API

**Soluções**:
1. Verificar se `GEMINI_API_KEY` está configurada:
```bash
vercel env ls
```

2. Verificar logs do Vercel:
```bash
vercel logs
```

3. Testar API key manualmente:
```bash
curl -X POST "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent?key=SUA_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Problema: Erro de Build no Vercel
**Sintomas**: Build fails durante deploy

**Soluções**:
1. Verificar `package.json` na pasta backend:
```json
{
  "name": "chatbot-sobrancelha-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}
```

2. Verificar estrutura de arquivos:
```
projeto/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (local apenas)
├── index.html
├── style.css
├── script.js
└── vercel.json
```

### Problema: CORS Error no Frontend
**Sintomas**: Erro de CORS no console do navegador

**Soluções**:
1. Verificar configuração CORS no `server.js`:
```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://seu-projeto.vercel.app'] 
        : ['http://localhost:8080'],
    credentials: true
}));
```

2. Atualizar URL da API no `script.js`:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : '/api'; // Use rota relativa em produção
```

### Problema: 404 Not Found
**Sintomas**: Rota não encontrada

**Soluções**:
1. Verificar `vercel.json` routes:
```json
"routes": [
  {
    "src": "/api/(.*)",
    "dest": "/backend/server.js"
  },
  {
    "src": "/(.*)",
    "dest": "/$1"
  }
]
```

2. Verificar se arquivos estão na estrutura correta

---

## 🔄 CI/CD e Deploy Automático

### GitHub Actions (Opcional)
Criar `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Vercel
      uses: vercel/action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Configurar Secrets no GitHub
1. Vá em Settings → Secrets → Actions
2. Adicione:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

---

## 🎯 Deploy em Outras Plataformas

### Heroku (Alternativo)
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create chatbot-sobrancelha

# Configurar variáveis
heroku config:set GEMINI_API_KEY=sua_chave

# Deploy
git push heroku main
```

### Netlify (Apenas Frontend)
Para deploy apenas do frontend:
1. Arraste a pasta `frontend` para netlify.com
2. Configure redirects para SPA se necessário

---

## 📊 Monitoramento Pós-Deploy

### Verificações Essenciais
```bash
# Health check
curl https://seu-projeto.vercel.app/api/health

# Teste do chat
curl -X POST "https://seu-projeto.vercel.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "teste"}'

# Verificar logs
vercel logs --follow
```

### Métricas a Acompanhar
- **Response Time**: Tempo de resposta da API
- **Error Rate**: Taxa de erros 4xx/5xx
- **Usage**: Número de requisições por dia
- **Gemini API Usage**: Uso da cota da API

---

## 🔒 Segurança em Produção

### Headers de Segurança
Implementados via Helmet.js no `server.js`:
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"]
    }
  }
}));
```

### Rate Limiting (Recomendado)
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requisições por IP
});
app.use('/api/', limiter);
```

### HTTPS Obrigatório
O Vercel fornece HTTPS automático, mas sempre verifique:
- URLs devem usar `https://`
- Redirects automáticos de HTTP para HTTPS
- Certificados SSL válidos

---

## 📞 Suporte e Manutenção

### Comandos Úteis
```bash
# Verificar status do projeto
vercel ls

# Ver logs em tempo real
vercel logs --follow

# Listar variáveis de ambiente
vercel env ls

# Remover deployment antigo
vercel rm deployment-url
```

### Contatos de Suporte
- **Vercel Support**: https://vercel.com/help
- **Google AI Support**: https://developers.generativeai.google/support
- **Projeto**: GitHub Issues

---

## ✅ Checklist Final de Deploy

- [ ] ✅ Código commitado no GitHub
- [ ] ✅ `.env` adicionado ao `.gitignore`
- [ ] ✅ `vercel.json` configurado corretamente
- [ ] ✅ API key do Gemini configurada
- [ ] ✅ Deploy realizado com sucesso
- [ ] ✅ Health check funcionando
- [ ] ✅ Chat respondendo corretamente
- [ ] ✅ Frontend carregando sem erros
- [ ] ✅ Responsividade testada
- [ ] ✅ HTTPS funcionando
- [ ] ✅ Logs sem erros críticos
- [ ] ✅ Performance aceitável
- [ ] ✅ Documentação atualizada

---

**🎉 Parabéns! Seu chatbot está no ar!**

**URL Final**: https://projetomarcelo01.vercel.app