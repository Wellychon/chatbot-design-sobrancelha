// Configuração da API
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://projetomarcelo01-k6yxugosf-wellycont-6176s-projects.vercel.app/api';

// Estado do chat
let isChatOpen = false;
let isLoading = false;

// Elementos do DOM
const chatWidget = document.getElementById('chatWidget');
const chatButton = document.getElementById('chatButton');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatLoading = document.getElementById('chatLoading');
const sendBtn = document.getElementById('sendBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
    animateOnScroll();
});

// Configurar event listeners
function setupEventListeners() {
    // Chat input
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Scroll suave para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu mobile (implementação futura)
    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
}

// Inicializar chat
function initializeChat() {
    // Mostrar notificação no botão de chat
    setTimeout(() => {
        showChatNotification();
    }, 3000);
}

// Mostrar/ocultar chat
function toggleChat() {
    if (isChatOpen) {
        closeChat();
    } else {
        openChat();
    }
}

function openChat() {
    chatWidget.style.display = 'flex';
    chatButton.style.display = 'none';
    isChatOpen = true;
    
    // Focar no input
    setTimeout(() => {
        chatInput.focus();
    }, 100);
    
    // Remover notificação
    hideChatNotification();
}

function closeChat() {
    chatWidget.style.display = 'none';
    chatButton.style.display = 'flex';
    isChatOpen = false;
}

// Enviar mensagem
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message || isLoading) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Mostrar loading
    showLoading();
    
    try {
        // Enviar para API
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Adicionar resposta do bot
            setTimeout(() => {
                hideLoading();
                addMessage(data.response, 'bot');
            }, 1000); // Simular tempo de digitação
        } else {
            throw new Error(data.error || 'Erro na resposta');
        }
        
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        hideLoading();
        addMessage(
            'Desculpe, tive um problema técnico. Tente novamente em alguns instantes. 😅',
            'bot'
        );
    }
}

// Adicionar mensagem ao chat
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = type === 'bot' ? '<i class="fas fa-spa"></i>' : '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Se for mensagem do bot, renderizar como Markdown
    if (type === 'bot' && typeof marked !== 'undefined') {
        // Configurar marked para ser mais seguro
        marked.setOptions({
            breaks: true,
            gfm: true,
            sanitize: false
        });
        
        // Converter Markdown para HTML
        const htmlContent = marked.parse(text);
        contentDiv.innerHTML = htmlContent;
    } else {
        // Para mensagens do usuário, usar texto simples
        const messageP = document.createElement('p');
        messageP.textContent = text;
        contentDiv.appendChild(messageP);
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll para baixo
    scrollToBottom();
    
    // Animação
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);
}

// Mostrar/ocultar loading
function showLoading() {
    isLoading = true;
    chatLoading.style.display = 'flex';
    sendBtn.disabled = true;
    scrollToBottom();
}

function hideLoading() {
    isLoading = false;
    chatLoading.style.display = 'none';
    sendBtn.disabled = false;
}

// Scroll para o final das mensagens
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Notificação do chat
function showChatNotification() {
    const notification = document.querySelector('.chat-notification');
    if (notification) {
        notification.style.display = 'flex';
        notification.style.animation = 'bounce 1s ease infinite';
    }
}

function hideChatNotification() {
    const notification = document.querySelector('.chat-notification');
    if (notification) {
        notification.style.display = 'none';
        notification.style.animation = 'none';
    }
}

// Scroll para seção específica
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Menu mobile (implementação básica)
function toggleMobileMenu() {
    // Implementação futura do menu mobile
    console.log('Menu mobile clicado');
}

// Animações no scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observar elementos para animação
    document.querySelectorAll('.service-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Funções utilitárias para SEO e interação
function trackChatInteraction() {
    // Implementar analytics se necessário
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_opened', {
            'event_category': 'engagement',
            'event_label': 'chatbot_sobrancelha'
        });
    }
}

// Validação de formulário de contato (se existir)
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.phone || !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
        errors.push('Telefone deve estar no formato (XX) XXXXX-XXXX');
    }
    
    return errors;
}

// Formatação de telefone brasileiro
function formatPhoneNumber(value) {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}

// Lazy loading de imagens (se implementar)
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Feedback visual para botões
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        
        // Criar efeito ripple
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// CSS para animação ripple
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Detectar dispositivo móvel
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Otimizações para mobile
if (isMobileDevice()) {
    // Ajustar comportamento para dispositivos móveis
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Prevenir zoom no input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                document.querySelector('meta[name=viewport]').setAttribute(
                    'content',
                    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
                );
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth < 768) {
                document.querySelector('meta[name=viewport]').setAttribute(
                    'content',
                    'width=device-width, initial-scale=1'
                );
            }
        });
    });
}

// Performance: debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedScrollHandler = debounce(function() {
    // Handlers de scroll otimizados
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (scrolled > 100) {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-white)';
        header.style.backdropFilter = 'none';
    }
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Exportar funções globais necessárias
window.openChat = openChat;
window.closeChat = closeChat;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.scrollToSection = scrollToSection;