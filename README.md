# 💄 Bela Olhar - Design de Sobrancelha

![Status](https://img.shields.io/badge/Status-Pronto%20para%20Deploy-success)
![Version](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

Landing page profissional com chatbot inteligente para o salão **Bela Olhar**, especializado em design de sobrancelha no Jardim das Flores, Porto Alegre. Sistema completo com respostas automáticas e interface moderna.

## 🌟 Demo ao Vivo

🔗 **[Acesse a Landing Page](https://bela-olhar-sobrancelha.vercel.app/)**

## 🚀 Características

- **API Inteligente**: Integrada com Google Gemini AI
- **Landing Page Responsiva**: Design mobile-first e otimizada
- **SEO Local**: Otimizada para "design de sobrancelha Porto Alegre"
- **Interface Moderna**: Chat widget elegante e funcional
- **Base de Conhecimento**: Especializada em design de sobrancelhas

## 📁 Estrutura do Projeto

```
chatbot-sobrancelha/
├── backend/
│   ├── server.js          # Servidor Express + API Gemini
│   ├── package.json       # Dependências Node.js
│   └── .env              # Configurações (API Key)
└── frontend/
    ├── index.html        # Landing page principal
    ├── style.css         # Estilos responsivos
    └── script.js         # JavaScript do chat
```

## 🛠️ Instalação e Execução

### Backend (API)

1. **Instalar dependências:**
```bash
cd backend
npm install
```

2. **Configurar variáveis de ambiente:**
   - A chave da API Gemini já está configurada em `.env`
   - Porta padrão: 3001

3. **Executar servidor:**
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

### Frontend (Landing Page)

1. **Abrir o arquivo HTML:**
   - Navegue até a pasta `frontend`
   - Abra `index.html` em um navegador
   - Ou use um servidor local (recomendado)

2. **Servidor local simples:**
```bash
cd frontend
python -m http.server 8000
# ou
npx serve .
```

## 🌐 Endpoints da API

### POST `/api/chat`
Enviar mensagem para o chatbot
```json
{
  "message": "Olá, gostaria de saber sobre design de sobrancelha"
}
```

### GET `/api/health`
Verificar status do servidor

### GET `/api/info`
Informações sobre o salão e serviços

## 💄 Especialização do Chatbot

O chatbot é especializado em:

- **Design de Sobrancelha Personalizado**
- **Micropigmentação** (Shadow/Fio a Fio)
- **Laminação de Sobrancelhas**
- **Henna para Sobrancelhas**
- **Consultoria em Cuidados**

### Localização
- 📍 **Jardim das Flores, Porto Alegre/RS**
- 🎯 **SEO otimizado** para buscas locais
- 📱 **Mobile-first** para máxima acessibilidade

## 🎨 Design e UX

### Cores
- **Primária**: Rosa (#e91e63)
- **Accent**: Rosa claro (#ff6b9d)
- **Secundária**: Amarelo (#ffc107)

### Tipografia
- **Font**: Poppins (Google Fonts)
- **Peso**: 300-700 conforme hierarquia

### Responsividade
- Breakpoint mobile: 768px
- Design mobile-first
- Interface de chat otimizada para touch

## 🔧 Personalização

### Modificar Base de Conhecimento
Edite a variável `knowledgeBase` em `backend/server.js`

### Alterar Estilo Visual
Modifique as variáveis CSS em `frontend/style.css`:
```css
:root {
    --primary-color: #e91e63;
    --accent-color: #ff6b9d;
    /* ... outras variáveis */
}
```

### Adicionar Funcionalidades
O JavaScript modular em `frontend/script.js` permite fácil extensão

## 📈 SEO e Marketing

### Palavras-chave Principais
- "design de sobrancelha porto alegre"
- "sobrancelha jardim das flores"
- "micropigmentação porto alegre"
- "laminação sobrancelha"

### Meta Tags Implementadas
- Title otimizado com localização
- Description rica em palavras-chave
- Open Graph para redes sociais
- Schema markup estruturado

## 🚀 Deploy e Produção

### Backend
```bash
# Instalar PM2 para produção
npm install -g pm2

# Executar em produção
pm2 start server.js --name "chatbot-sobrancelha"
```

### Frontend
- Deploy estático em qualquer servidor web
- CDN recomendado para assets
- Configurar HTTPS obrigatório

### Variáveis de Ambiente (Produção)
```env
NODE_ENV=production
PORT=3001
GEMINI_API_KEY=sua_chave_aqui
```

## 📊 Monitoramento

O servidor inclui:
- Logs de erro detalhados
- Endpoint de health check
- Rate limiting (implementar se necessário)

## 🔒 Segurança

- Helmet.js para headers de segurança
- CORS configurado adequadamente
- Validação de entrada nos endpoints
- API Key protegida em variáveis de ambiente

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Dispositivos
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🤝 Contribuição

Para melhorar o projeto:
1. Faça fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Faça push da branch
5. Abra um Pull Request

## 📄 Licença

MIT License - veja arquivo LICENSE para detalhes.

## 📞 Suporte

Para dúvidas sobre implementação ou personalização:
- Email: suporte@designsobrancelha.com.br
- WhatsApp: (51) 99999-9999

---

**Desenvolvido com ❤️ para especialistas em Design de Sobrancelha**
