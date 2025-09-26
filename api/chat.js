// API endpoint para chatbot com Gemini AI
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // Chave da API Gemini
    const API_KEY = 'AIzaSyDPiIe-Su8AvNA9T6KmwDbj0Ki8MCfWoI4';
    
    // Prompt especializado para o salão de beleza
    const systemPrompt = `Você é uma assistente virtual especializada do salão "Bela Olhar", localizado no Jardim das Flores, Porto Alegre/RS. 

INFORMAÇÕES DO SALÃO:
- Nome: Bela Olhar
- Especialidade: Design de sobrancelha
- Localização: Jardim das Flores, Porto Alegre/RS
- Horários: Segunda a Sexta (8h às 18h), Sábado (8h às 16h), Domingo fechado
- Contato: (51) 99999-9999
- Email: contato@beloolhar.com.br

SERVIÇOS E PREÇOS:
1. Design Personalizado - A partir de R$ 45 (45 min)
   - Análise facial completa
   - Formato perfeito para seu rosto

2. Micropigmentação - A partir de R$ 280 (2h 30min)
   - Técnica shadow e fio a fio
   - Resultado natural e duradouro

3. Laminação de Sobrancelhas - A partir de R$ 85 (1h 15min)
   - Alinhamento e disciplina dos fios
   - Efeito impecável

4. Henna Natural - A partir de R$ 65 (50 min)
   - Coloração 100% vegetal
   - Nutre e define o formato

INSTRUÇÕES:
- Seja sempre calorosa e profissional
- Use emojis moderadamente (máximo 3 por resposta)
- Mantenha respostas concisas (máximo 150 palavras)
- Incentive agendamentos pelo WhatsApp
- Foque na beleza natural e autoestima
- Se não souber algo, ofereça contato direto

Responda como uma especialista em sobrancelhas que conhece bem o salão e os serviços.`;

    // Preparar payload para o Gemini
    const payload = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nCliente pergunta: ${message}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      }
    };

    // Chamar API do Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erro na API Gemini: ${response.status}`);
    }

    const data = await response.json();
    
    // Extrair resposta
    let botResponse = 'Desculpe, tive um problema técnico. Entre em contato pelo WhatsApp: (51) 99999-9999';
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      botResponse = data.candidates[0].content.parts[0].text;
    }

    // Retornar resposta
    res.status(200).json({
      success: true,
      response: botResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro na API:', error);
    
    // Fallback para respostas locais em caso de erro
    const fallbackResponse = getFallbackResponse(req.body.message || '');
    
    res.status(200).json({
      success: true,
      response: fallbackResponse,
      fallback: true,
      timestamp: new Date().toISOString()
    });
  }
}

// Função de fallback local
function getFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('localização') || msg.includes('onde') || msg.includes('endereço')) {
    return '📍 Estamos no Jardim das Flores, Porto Alegre/RS! Região de fácil acesso, próximo ao Shopping Flores. WhatsApp: (51) 99999-9999';
  }
  
  if (msg.includes('preço') || msg.includes('valor') || msg.includes('quanto')) {
    return '💰 Nossos preços: Design R$ 45+, Micropigmentação R$ 280+, Laminação R$ 85+, Henna R$ 65+. Consulte valores atualizados: (51) 99999-9999';
  }
  
  if (msg.includes('horário') || msg.includes('funcionamento')) {
    return '🕐 Funcionamos de Segunda a Sexta (8h às 18h) e Sábado (8h às 16h). Domingo fechado. Agende pelo WhatsApp: (51) 99999-9999';
  }
  
  if (msg.includes('serviço') || msg.includes('fazem')) {
    return '🎨 Oferecemos: Design Personalizado, Micropigmentação, Laminação e Henna Natural. Todos com consultoria especializada! WhatsApp: (51) 99999-9999';
  }
  
  return '😊 Olá! Sou da Bela Olhar, especialista em design de sobrancelha no Jardim das Flores, Porto Alegre. Como posso ajudar você hoje? WhatsApp: (51) 99999-9999';
}