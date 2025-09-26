// Chatbot com IA Gemini - Versão Produção
console.log('🤖 Carregando Chatbot com IA Gemini...');

// Configuração
const API_CONFIG = {
    BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api'
        : '/api',
    ENDPOINTS: {
        CHAT: '/chat'
    }
};

// Estado global
let chatState = {
    isOpen: false,
    isLoading: false,
    messageHistory: [],
    retryCount: 0
};

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM carregado - Inicializando chatbot IA');
    initializeAIChat();
});

// Inicializar chatbot
function initializeAIChat() {
    // Verificar elementos
    const elements = getElements();
    if (!elements.chatInput || !elements.chatMessages) {
        console.error('❌ Elementos do chat não encontrados');
        return;
    }
    
    // Configurar eventos
    setupChatEvents();
    
    // Mensagem inicial
    setTimeout(() => {
        addMessage(
            '🌟 Olá! Sou a assistente inteligente da Bela Olhar! Especialista em design de sobrancelha no Jardim das Flores. Como posso realçar sua beleza hoje?',
            'bot'
        );
    }, 1000);
    
    console.log('✅ Chatbot IA inicializado com sucesso');
}

// Buscar elementos DOM
function getElements() {
    return {
        chatWidget: document.getElementById('chatWidget'),
        chatButton: document.getElementById('chatButton'),
        chatMessages: document.getElementById('chatMessages'),
        chatInput: document.getElementById('chatInput'),
        chatLoading: document.getElementById('chatLoading'),
        sendBtn: document.getElementById('sendBtn'),
        suggestions: document.getElementById('chatSuggestions')
    };
}

// Configurar eventos do chat
function setupChatEvents() {
    const elements = getElements();
    
    // Enter para enviar
    if (elements.chatInput) {
        elements.chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAIMessage();
            }
        });
    }
    
    // Botão enviar
    if (elements.sendBtn) {
        elements.sendBtn.addEventListener('click', sendAIMessage);
    }
}

// Função principal para enviar mensagem à IA
async function sendAIMessage() {
    const elements = getElements();
    
    if (!elements.chatInput || chatState.isLoading) {
        return;
    }
    
    const message = elements.chatInput.value.trim();
    if (!message) return;
    
    console.log('🚀 Enviando mensagem para IA:', message);
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    elements.chatInput.value = '';
    
    // Salvar no histórico
    chatState.messageHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
    });
    
    // Esconder sugestões
    if (elements.suggestions) {
        elements.suggestions.style.display = 'none';
    }
    
    // Mostrar loading
    showAILoading();
    
    try {
        // Chamar API
        const response = await callGeminiAPI(message);
        
        hideAILoading();
        
        if (response.success) {
            addMessage(response.response, 'bot');
            
            // Salvar resposta no histórico
            chatState.messageHistory.push({
                role: 'assistant', 
                content: response.response,
                timestamp: new Date()
            });
            
            chatState.retryCount = 0; // Reset contador de erro
        } else {
            throw new Error(response.error || 'Erro na resposta da IA');
        }
        
    } catch (error) {
        console.error('❌ Erro ao comunicar com IA:', error);
        hideAILoading();
        
        // Tentar novamente se for primeiro erro
        if (chatState.retryCount < 2) {
            chatState.retryCount++;
            console.log(`🔄 Tentativa ${chatState.retryCount}/2`);
            
            setTimeout(() => {
                addMessage(
                    '⚠️ Conexão instável... Tentando novamente...',
                    'bot'
                );
            }, 500);
            
            // Retry após 2 segundos
            setTimeout(() => sendAIMessage(), 2000);
        } else {
            // Fallback após múltiplos erros
            addMessage(
                '😅 Estou com dificuldades técnicas no momento. Para atendimento imediato, entre em contato pelo WhatsApp: (51) 99999-9999 ou visite-nos no Jardim das Flores!',
                'bot'
            );
            chatState.retryCount = 0;
        }
    }
    
    // Mostrar sugestões novamente após um tempo
    setTimeout(() => {
        if (elements.suggestions) {
            elements.suggestions.style.display = 'flex';
        }
    }, 3000);
}

// Chamar API do Gemini
async function callGeminiAPI(message) {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT}`;
    
    console.log('📡 Chamando API:', url);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            message: message,
            history: chatState.messageHistory.slice(-5) // Últimas 5 mensagens para contexto
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
}

// Função para sugestões (compatibilidade)
function sendSuggestion(message) {
    console.log('💡 Sugestão selecionada:', message);
    
    const elements = getElements();
    if (elements.chatInput) {
        elements.chatInput.value = message;
        sendAIMessage();
    }
}

// Adicionar mensagem ao chat
function addMessage(text, type) {
    console.log(`📝 Adicionando mensagem [${type}]:`, text);
    
    const elements = getElements();
    if (!elements.chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    // Criar estrutura da mensagem
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${type === 'bot' ? 'fa-spa' : 'fa-user'}"></i>
        </div>
        <div class="message-content">
            <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    
    elements.chatMessages.appendChild(messageDiv);
    
    // Auto-scroll
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    
    // Animação de entrada
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.4s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Loading da IA
function showAILoading() {
    chatState.isLoading = true;
    const elements = getElements();
    
    if (elements.chatLoading) {
        elements.chatLoading.style.display = 'flex';
    }
    
    if (elements.sendBtn) {
        elements.sendBtn.disabled = true;
        elements.sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
    
    // Auto-scroll
    if (elements.chatMessages) {
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }
}

function hideAILoading() {
    chatState.isLoading = false;
    const elements = getElements();
    
    if (elements.chatLoading) {
        elements.chatLoading.style.display = 'none';
    }
    
    if (elements.sendBtn) {
        elements.sendBtn.disabled = false;
        elements.sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
}

// Funções de controle do chat (compatibilidade)
function openChat() {
    console.log('📂 Abrindo chat');
    chatState.isOpen = true;
    
    const elements = getElements();
    if (elements.chatWidget) elements.chatWidget.style.display = 'flex';
    if (elements.chatButton) elements.chatButton.style.display = 'none';
    
    setTimeout(() => {
        if (elements.chatInput) elements.chatInput.focus();
    }, 300);
}

function closeChat() {
    console.log('📁 Fechando chat');
    chatState.isOpen = false;
    
    const elements = getElements();
    if (elements.chatWidget) elements.chatWidget.style.display = 'none';
    if (elements.chatButton) elements.chatButton.style.display = 'flex';
}

function toggleChat() {
    if (chatState.isOpen) {
        closeChat();
    } else {
        openChat();
    }
}

// Função legada para compatibilidade
function sendMessage() {
    sendAIMessage();
}

// Expor funções globais
window.sendSuggestion = sendSuggestion;
window.sendMessage = sendAIMessage;
window.openChat = openChat;
window.closeChat = closeChat;
window.toggleChat = toggleChat;

// Analytics (opcional)
function trackChatInteraction(action, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'chatbot_ai',
            event_label: 'bela_olhar_gemini',
            ...data
        });
    }
}

// Detectar erros de conexão
window.addEventListener('online', () => {
    console.log('🌐 Conexão restaurada');
    if (chatState.isOpen) {
        addMessage('🌐 Conexão restaurada! Como posso ajudar?', 'bot');
    }
});

window.addEventListener('offline', () => {
    console.log('📵 Conexão perdida');
    if (chatState.isOpen) {
        addMessage('📵 Sem conexão. Assim que voltar, estarei aqui!', 'bot');
    }
});

console.log('✅ Chatbot IA Gemini carregado com sucesso!');