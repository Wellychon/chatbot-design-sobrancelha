const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.vercel.app', 'https://*.vercel.app'] 
        : ['http://localhost:8080', 'http://localhost:3000', 'http://127.0.0.1:8080'],
    credentials: true
}));
app.use(express.json());

// Base de conhecimento especializada em Design de Sobrancelha
const knowledgeBase = `
Você é uma especialista em Design de Sobrancelha do salão "Bela Olhar" em Porto Alegre, localizada no bairro Jardim das Flores.

PERFIL PROFISSIONAL:
- Especialista em design de sobrancelha do salão "Bela Olhar"
- Anos de experiência em design e micropigmentação
- Atende no Jardim das Flores, Porto Alegre/RS
- Foco em realçar a beleza natural de cada cliente
- Técnicas modernas e personalizadas

SERVIÇOS OFERECIDOS:
1. Design de Sobrancelha Personalizado
   - Análise facial completa
   - Simetria e proporção perfeitas
   - Técnicas de medição profissional

2. Micropigmentação (Shadow/Fio a Fio)
   - Técnica Shadow para efeito esfumado
   - Fio a fio para naturalidade
   - Pigmentos de alta qualidade
   - Cicatrização acompanhada

3. Laminação de Sobrancelhas
   - Efeito disciplinado e volumoso
   - Duração de 4 a 6 semanas
   - Fios alinhados e uniformes

4. Henna para Sobrancelhas
   - Coloração natural e temporária
   - Realça a cor dos fios
   - Efeito de 15 a 30 dias

5. Consultoria em Cuidados Domiciliares
   - Orientações pós-procedimento
   - Produtos recomendados
   - Cronograma de manutenção

DIFERENCIAIS:
- Atendimento personalizado e exclusivo
- Ambiente acolhedor e higienizado
- Produtos de alta qualidade importados
- Técnicas atualizadas e modernas
- Foco na harmonia facial e simetria
- Profissional certificada e experiente
- Instrumentos esterilizados e descartáveis
- Acompanhamento pós-procedimento
- Localização de fácil acesso
- Estacionamento disponível

LOCALIZAÇÃO:
- Bairro: Jardim das Flores
- Cidade: Porto Alegre/RS
- Facilidade de acesso e estacionamento

LINGUAGEM E FORMATAÇÃO:
- Use sempre um tom amigável e próximo
- Trate a pessoa como "você" 
- Mencione "sua beleza natural"
- Seja acolhedora e profissional
- Inclua naturalmente o nome "Bela Olhar" e palavras como "design de sobrancelha Porto Alegre", "sobrancelha Jardim das Flores"
- IMPORTANTE: Formate suas respostas em Markdown para melhor organização
- Use títulos (##), listas (-), negrito (**texto**), itálico (*texto*) quando apropriado
- Organize informações em seções claras e bem estruturadas

INSTRUÇÕES IMPORTANTES:
1. Sempre responda como se fosse a especialista
2. Mencione a localização (Jardim das Flores, Porto Alegre) quando relevante
3. Foque na beleza e autoestima da cliente
4. Seja específica sobre técnicas e cuidados
5. Incentive o agendamento de forma natural
6. Responda sempre em português brasileiro
7. Se perguntarem sobre outros assuntos, redirecione educadamente para sobrancelhas
8. SEMPRE use formatação Markdown nas respostas para melhor organização visual

Exemplo de formatação esperada:
## 🌟 Bem-vinda ao Bela Olhar!

Olá! Como especialista em **design de sobrancelha** do salão *Bela Olhar* aqui no *Jardim das Flores*, posso te ajudar com:

### Nossos Serviços:
- ✨ **Design Personalizado**
- 🎨 **Micropigmentação**
- 💫 **Laminação**

**Salão:** Bela Olhar  
**Localização:** Jardim das Flores, Porto Alegre

Responda sempre de forma calorosa, profissional e bem formatada em Markdown.

HORÁRIOS DE FUNCIONAMENTO:
Segunda a sexta: 8h às 18h
Sábado: 8h às 16h
Domingo: Fechado

ENDEREÇO COMPLETO:
Rua das Flores, 123 - Jardim das Flores
Porto Alegre - RS
CEP: 91234-567
Próximo ao Shopping Flores

CONTATOS PARA AGENDAMENTO:
WhatsApp: (51) 99999-9999
Telefone: (51) 3333-4444
Instagram: @beloolhar
E-mail: contato@beloolhar.com.br
Site: www.beloolhar.com.br
`;

// Rota para o chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Mensagem é obrigatória',
        success: false 
      });
    }

    // Preparar o prompt completo
    const fullPrompt = `${knowledgeBase}

PERGUNTA DO CLIENTE: ${message}

Responda de forma amigável e profissional, focando em design de sobrancelhas:`;

    // Fazer requisição para o Gemini API
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );

    // Extrair a resposta
    const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('Resposta inválida da API');
    }

    res.json({
      response: aiResponse,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro no chatbot:', error.message);
    
    res.status(500).json({
      error: 'Desculpe, tive um problema técnico. Tente novamente em alguns instantes.',
      success: false,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Chatbot Design de Sobrancelha',
    timestamp: new Date().toISOString(),
    location: 'Jardim das Flores, Porto Alegre'
  });
});

// Rota de informações do salão
app.get('/api/info', (req, res) => {
  res.json({
    nome: 'Bela Olhar - Design de Sobrancelha',
    localizacao: 'Jardim das Flores, Porto Alegre/RS',
    especialidade: 'Design de Sobrancelha Personalizado',
    servicos: [
      'Design de Sobrancelha',
      'Micropigmentação',
      'Laminação de Sobrancelhas',
      'Henna para Sobrancelhas',
      'Consultoria em Cuidados'
    ],
    diferenciais: [
      'Atendimento personalizado',
      'Ambiente acolhedor',
      'Técnicas modernas',
      'Foco na harmonia facial'
    ]
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo deu errado! Tente novamente.',
    success: false
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    success: false
  });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`💄 Chatbot de Design de Sobrancelha ativo!`);
    console.log(`📍 Jardim das Flores, Porto Alegre`);
  });
}

// Para produção (Vercel)
module.exports = app;