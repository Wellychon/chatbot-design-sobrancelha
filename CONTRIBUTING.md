# 🤝 Contribuindo para o Chatbot de Design de Sobrancelha

Obrigado por seu interesse em contribuir! Este documento contém diretrizes para contribuições ao projeto.

## 📋 Como Contribuir

### 🐛 Reportando Bugs

1. **Verifique se o bug já foi reportado** nas [Issues](https://github.com/seu-usuario/chatbot-sobrancelha/issues)
2. **Abra uma nova issue** se não encontrar uma similar
3. **Use o template de bug report** e forneça:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente (SO, navegador, etc.)

### ✨ Sugerindo Melhorias

1. **Abra uma issue** com tag `enhancement`
2. **Descreva detalhadamente** a melhoria sugerida
3. **Explique por que** seria útil para o projeto
4. **Considere diferentes casos de uso**

### 🔧 Desenvolvendo

#### Configuração do Ambiente

1. **Fork o repositório**
2. **Clone sua fork**:
```bash
git clone https://github.com/seu-usuario/chatbot-sobrancelha.git
cd chatbot-sobrancelha
```

3. **Instale dependências**:
```bash
cd backend
npm install
```

4. **Configure ambiente local**:
```bash
cp .env.example .env
# Adicione sua GEMINI_API_KEY
```

5. **Teste localmente**:
```bash
npm start
```

#### Padrões de Código

##### JavaScript/Node.js
- Use **ES6+ syntax** quando possível
- **Async/await** ao invés de callbacks
- **Comentários em português** para lógica complexa
- **Console.log** com emojis para melhor debugging:
```javascript
console.log('💬 Nova mensagem recebida:', message);
console.log('✅ Resposta gerada com sucesso');
console.error('❌ Erro ao processar:', error);
```

##### HTML/CSS
- **Semantic HTML5** elements
- **Mobile-first** responsive design
- **CSS custom properties** para temas
- **BEM methodology** para classes CSS quando aplicável

##### Commit Messages
Use commits em **português** com emojis:
```bash
✨ Adiciona nova funcionalidade de agendamento
🐛 Corrige erro de CORS na API
📝 Atualiza documentação da API
🎨 Melhora estilo do chat widget
♻️ Refatora código do servidor
```

#### Pull Requests

1. **Crie uma branch** para sua feature:
```bash
git checkout -b feature/nova-funcionalidade
```

2. **Faça commits pequenos** e descritivos
3. **Teste suas mudanças**:
```bash
# Backend
npm test

# Frontend
# Teste manualmente em diferentes dispositivos
```

4. **Atualize documentação** se necessário
5. **Abra o Pull Request** com:
   - Título claro e descritivo
   - Descrição detalhada das mudanças
   - Link para issues relacionadas
   - Screenshots (se mudanças visuais)

## 🏗️ Estrutura do Projeto

### Arquivos Importantes
```
chatbot-sobrancelha/
├── backend/
│   ├── server.js          # ⚡ Servidor principal
│   └── package.json       # 📦 Dependências
├── frontend/
│   ├── index.html         # 🌐 Landing page
│   ├── style.css          # 🎨 Estilos
│   └── script.js          # ⚡ Lógica frontend
├── docs/
│   ├── API.md            # 📖 Documentação da API
│   ├── DEPLOY.md         # 🚀 Guia de deploy
│   └── DIARIO_BORDO.md   # 📔 Histórico desenvolvimento
└── vercel.json           # ⚙️ Config deploy
```

### Áreas para Contribuição

#### 🤖 Backend/API
- Melhorias no prompt do Gemini AI
- Novos endpoints especializados
- Otimizações de performance
- Sistema de cache
- Rate limiting

#### 🎨 Frontend/UX
- Melhorias na interface do chat
- Animations e micro-interactions
- Acessibilidade (a11y)
- PWA features
- Dark mode

#### 📚 Conhecimento Base
- Expansão do conhecimento em sobrancelhas
- Informações sobre mercado local
- Técnicas específicas
- Cuidados e dicas

#### 🧪 Testes
- Testes unitários para API
- Testes de integração
- Testes E2E para frontend
- Testes de performance

## 📏 Diretrizes de Qualidade

### ✅ Checklist para PRs
- [ ] Código segue padrões estabelecidos
- [ ] Funcionalidade testada localmente
- [ ] Documentação atualizada
- [ ] Sem console.logs desnecessários
- [ ] Responsividade mantida
- [ ] Performance não impactada
- [ ] Acessibilidade considerada

### 🚨 O que NÃO fazer
- ❌ Commitar arquivos `.env`
- ❌ Incluir `node_modules/`
- ❌ Quebrar funcionalidades existentes
- ❌ Ignorar padrões de código
- ❌ PRs muito grandes (prefira PRs pequenos)

## 🎯 Prioridades Atuais

### 🔥 High Priority
- [ ] Testes automatizados
- [ ] Sistema de agendamento
- [ ] Integração WhatsApp
- [ ] Analytics básico

### 🟡 Medium Priority
- [ ] Painel administrativo
- [ ] Sistema de avaliações
- [ ] Galeria de trabalhos
- [ ] Modo escuro

### 🟢 Nice to Have
- [ ] App mobile (React Native)
- [ ] Integração Instagram
- [ ] Sistema de fidelidade
- [ ] Chat por voz

## 💬 Comunicação

### Canais de Comunicação
- **Issues**: Para bugs e features
- **Discussions**: Para ideias e dúvidas gerais
- **Email**: dev@projetosobrancelha.com

### Código de Conduta
- 🤝 Seja respeitoso e inclusivo
- 💡 Compartilhe conhecimento
- 🎯 Mantenha foco no objetivo do projeto
- 📚 Documente suas contribuições

## 🏆 Reconhecimento

Todos os contribuidores serão:
- 📝 Listados no README
- 🎉 Mencionados nos releases
- 🙏 Agradecidos publicamente

### Top Contribuidores Atuais
- **Welly Felix** - Criador e mantenedor principal

## 📚 Recursos Úteis

- [Google Gemini AI Docs](https://ai.google.dev/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Express.js Guide](https://expressjs.com/pt-br/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Obrigado por contribuir! 🚀💄✨**

*Juntos podemos tornar este chatbot ainda mais útil para profissionais de beleza!*