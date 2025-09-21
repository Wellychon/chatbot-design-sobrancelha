# 📖 Documentação Técnica da API

## Visão Geral

A API do Chatbot de Design de Sobrancelha é construída com Node.js/Express e integrada com Google Gemini AI para fornecer respostas inteligentes e especializadas.

## 🔧 Configuração Técnica

### Dependências Principais

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "axios": "^1.6.2",
  "dotenv": "^16.3.1"
}
```

### Variáveis de Ambiente

| Variável | Descrição | Exemplo | Obrigatória |
|----------|-----------|---------|-------------|
| `GEMINI_API_KEY` | Chave da API do Google Gemini | `AIza...` | ✅ Sim |
| `NODE_ENV` | Ambiente de execução | `development/production` | ❌ Não |
| `PORT` | Porta do servidor | `3001` | ❌ Não |

## 🚀 Endpoints da API

### Base URL
- **Produção**: `https://projetomarcelo01.vercel.app/api`
- **Desenvolvimento**: `http://localhost:3001/api`

---

### `POST /api/chat`

Endpoint principal para interação com o chatbot.

#### Request
```http
POST /api/chat
Content-Type: application/json

{
  "message": "string" // Mensagem do usuário (obrigatório)
}
```

#### Response Success (200)
```json
{
  "response": "string",     // Resposta do chatbot em Markdown
  "success": true,          // Status da operação
  "timestamp": "string"     // ISO timestamp da resposta
}
```

#### Response Error (400)
```json
{
  "error": "string",        // Descrição do erro
  "success": false,
  "timestamp": "string"
}
```

#### Response Error (500)
```json
{
  "error": "Erro interno do servidor",
  "success": false,
  "timestamp": "string"
}
```

#### Exemplo de Uso

**Request:**
```bash
curl -X POST "https://projetomarcelo01.vercel.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Qual o melhor formato de sobrancelha para rosto oval?"}'
```

**Response:**
```json
{
  "response": "## 🎯 Sobrancelha para Rosto Oval\n\nPara rostos ovais, você tem muita flexibilidade! O formato oval é considerado ideal, então quase todos os formatos de sobrancelha ficam harmoniosos...",
  "success": true,
  "timestamp": "2025-09-21T18:31:52.533Z"
}
```

---

### `GET /api/health`

Endpoint para verificação de saúde do servidor.

#### Response Success (200)
```json
{
  "status": "OK",
  "message": "Chatbot de Design de Sobrancelha - API funcionando!",
  "timestamp": "string",
  "environment": "string"   // development/production
}
```

#### Exemplo de Uso
```bash
curl "https://projetomarcelo01.vercel.app/api/health"
```

---

### `GET /api/info`

Informações sobre o salão e serviços (endpoint adicional).

#### Response Success (200)
```json
{
  "salon": {
    "name": "Design de Sobrancelha Jardim das Flores",
    "location": "Porto Alegre, RS - Jardim das Flores",
    "services": [
      "Design personalizado de sobrancelhas",
      "Micropigmentação",
      "Laminação",
      "Henna",
      "Consultoria"
    ]
  },
  "success": true,
  "timestamp": "string"
}
```

## 🎯 Base de Conhecimento

### Estrutura do Conhecimento

O chatbot utiliza uma base de conhecimento estruturada que inclui:

```javascript
const knowledgeBase = `
### Especialização Principal
- Design de sobrancelhas personalizado
- Análise facial e formato de rosto
- Técnicas: pinça, linha, cera, micropigmentação
- Colorimetria e harmonização
- Simetria e proporções

### Conhecimento Comercial
- Precificação de serviços
- Atendimento ao cliente
- Cuidados pós-procedimento
- Marketing e divulgação
- Agendamento e organização

### Localização Específica
- Porto Alegre, Rio Grande do Sul
- Bairro Jardim das Flores
- Características do público local
- Concorrência e mercado regional
`;
```

### Personalização da Base

Para personalizar o conhecimento:

1. **Localize** a variável `knowledgeBase` no arquivo `backend/server.js`
2. **Modifique** o conteúdo com suas informações específicas
3. **Mantenha** a formatação Markdown para melhor apresentação
4. **Teste** localmente antes de fazer deploy

## 🔒 Segurança e Middlewares

### Helmet.js
Configuração de segurança para headers HTTP:
```javascript
app.use(helmet());
```

### CORS
Configuração para permitir requisições cross-origin:
```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://projetomarcelo01.vercel.app'] 
        : ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true
}));
```

### Validação de Input
- Verificação de campo `message` obrigatório
- Sanitização básica de entrada
- Rate limiting (recomendado para produção)

## 🔄 Tratamento de Erros

### Middleware Global de Erro
```javascript
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    success: false,
    timestamp: new Date().toISOString()
  });
});
```

### Errors Handlers Específicos
- **400**: Dados de entrada inválidos
- **500**: Erro na API do Gemini ou servidor interno
- **404**: Rota não encontrada

## 🚀 Integração com Gemini AI

### Configuração
```javascript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent';

const response = await axios.post(
  `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [{
      parts: [{ text: promptCompleto }]
    }]
  },
  {
    headers: { 'Content-Type': 'application/json' }
  }
);
```

### Prompt Engineering
O prompt é construído dinamicamente:
```javascript
const promptCompleto = `${knowledgeBase}\n\n${systemPrompt}\n\nUsuário: ${message}`;
```

## 📊 Logging e Monitoramento

### Logs Implementados
- Requisições recebidas
- Respostas da API Gemini
- Erros de sistema
- Status de saúde

### Logs de Exemplo
```javascript
console.log(`💬 Nova mensagem recebida: "${message}"`);
console.log(`✅ Resposta gerada com sucesso`);
console.error('❌ Erro ao processar mensagem:', error);
```

## 🔧 Performance e Otimizações

### Middleware de Compressão (Recomendado)
```javascript
const compression = require('compression');
app.use(compression());
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

## 🧪 Testes

### Teste Manual da API
```bash
# Health Check
curl "http://localhost:3001/api/health"

# Chat Test
curl -X POST "http://localhost:3001/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Teste de funcionamento"}'
```

### Testes Automatizados (Sugerido)
```javascript
// Usando Jest + Supertest
const request = require('supertest');
const app = require('./server');

describe('API Tests', () => {
  test('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});
```

## 📦 Build e Deploy

### Scripts NPM
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

### Deploy no Vercel
A configuração está no arquivo `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    }
  ]
}
```

## 🔍 Debugging

### Debug Local
```bash
# Com logs detalhados
DEBUG=* npm start

# Ou usando nodemon para desenvolvimento
npm run dev
```

### Debug Produção
```bash
# Verificar logs no Vercel
vercel logs

# Ou acessar o dashboard do Vercel
https://vercel.com/dashboard
```

## 📈 Métricas e Analytics

### Métricas Básicas
- Número de conversas por dia
- Tempo de resposta médio
- Taxa de erro
- Uso da API Gemini

### Implementação Sugerida
```javascript
// Middleware para contar requisições
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  console.log(`Total de requisições: ${requestCount}`);
  next();
});
```

---

## 🤝 Suporte Técnico

Para questões técnicas:
- 📧 Email: dev@projetosobrancelha.com
- 🐛 Issues: [GitHub Issues](https://github.com/usuario/chatbot-sobrancelha/issues)
- 📚 Docs: [Documentação Completa](./README.md)