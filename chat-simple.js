// Chat Bot Simplificado - Funcional
console.log('Carregando chatbot...');

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - Inicializando chatbot');
    
    // Verificar se todos os elementos existem
    const elements = {
        chatWidget: document.getElementById('chatWidget'),
        chatButton: document.getElementById('chatButton'),
        chatMessages: document.getElementById('chatMessages'),
        chatInput: document.getElementById('chatInput'),
        chatLoading: document.getElementById('chatLoading'),
        sendBtn: document.getElementById('sendBtn')
    };
    
    console.log('Elementos encontrados:', elements);
    
    // Configurar eventos
    if (elements.chatInput) {
        elements.chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    if (elements.sendBtn) {
        elements.sendBtn.addEventListener('click', sendMessage);
    }
});

// Base de conhecimento
const respostas = {
    localização: "🏪 **Nossa Localização:**\n\n📍 Jardim das Flores, Porto Alegre/RS\n\n• Região de fácil acesso\n• Próximo ao Shopping Flores\n\n📱 WhatsApp: (51) 99999-9999",
    preços: "💰 **Nossos Preços:**\n\n🎨 Design: R$ 45\n✨ Micropigmentação: R$ 280\n🌟 Laminação: R$ 85\n🍃 Henna: R$ 65\n\n*Consulte-nos para orçamento!*",
    horários: "🕐 **Horários:**\n\n📅 Segunda a Sexta: 8h às 18h\n📅 Sábado: 8h às 16h\n📅 Domingo: Fechado\n\n📱 (51) 99999-9999",
    serviços: "🎨 **Serviços:**\n\n✨ Design Personalizado\n💫 Micropigmentação\n🌟 Laminação\n🍃 Henna Natural\n\nTodos incluem consultoria personalizada!"
};

// Função para enviar sugestão
function sendSuggestion(message) {
    console.log('Enviando sugestão:', message);
    
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = message;
        sendMessage();
        
        // Esconder sugestões
        const suggestions = document.getElementById('chatSuggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }
}

// Função para enviar mensagem
function sendMessage() {
    console.log('Enviando mensagem...');
    
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) {
        console.error('Elementos não encontrados');
        return;
    }
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Mostrar loading
    showLoading();
    
    // Gerar resposta
    setTimeout(() => {
        hideLoading();
        const response = getResponse(message);
        addMessage(response, 'bot');
        
        // Mostrar sugestões novamente
        setTimeout(() => {
            const suggestions = document.getElementById('chatSuggestions');
            if (suggestions) {
                suggestions.style.display = 'flex';
            }
        }, 2000);
    }, 1500);
}

// Função para gerar resposta
function getResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('localização') || msg.includes('onde') || msg.includes('endereço')) {
        return respostas.localização;
    }
    if (msg.includes('preço') || msg.includes('valor') || msg.includes('quanto')) {
        return respostas.preços;
    }
    if (msg.includes('horário') || msg.includes('funcionamento') || msg.includes('abre')) {
        return respostas.horários;
    }
    if (msg.includes('serviço') || msg.includes('fazem') || msg.includes('oferecem')) {
        return respostas.serviços;
    }
    
    return "😊 Olá! Sou do Bela Olhar!\n\nUse os botões abaixo para perguntas rápidas ou entre em contato:\n\n📱 WhatsApp: (51) 99999-9999\n📍 Jardim das Flores, Porto Alegre\n\nComo posso ajudar? ✨";
}

// Função para adicionar mensagem
function addMessage(text, type) {
    console.log('Adicionando mensagem:', text, type);
    
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('chatMessages não encontrado');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${type === 'bot' ? 'fa-spa' : 'fa-user'}"></i>
        </div>
        <div class="message-content">
            <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Animação
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);
}

// Funções de loading
function showLoading() {
    const chatLoading = document.getElementById('chatLoading');
    if (chatLoading) {
        chatLoading.style.display = 'flex';
    }
}

function hideLoading() {
    const chatLoading = document.getElementById('chatLoading');
    if (chatLoading) {
        chatLoading.style.display = 'none';
    }
}

// Funções do chat
function openChat() {
    console.log('Abrindo chat');
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    
    if (chatWidget) chatWidget.style.display = 'flex';
    if (chatButton) chatButton.style.display = 'none';
    
    setTimeout(() => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) chatInput.focus();
    }, 100);
}

function closeChat() {
    console.log('Fechando chat');
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    
    if (chatWidget) chatWidget.style.display = 'none';
    if (chatButton) chatButton.style.display = 'flex';
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget && chatWidget.style.display === 'flex') {
        closeChat();
    } else {
        openChat();
    }
}

// Expor funções globais
window.sendSuggestion = sendSuggestion;
window.sendMessage = sendMessage;
window.openChat = openChat;
window.closeChat = closeChat;
window.toggleChat = toggleChat;

console.log('Chatbot configurado - funções expostas globalmente');