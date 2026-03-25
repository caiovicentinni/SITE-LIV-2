// MOBILE MENU TOGGLE
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ACCORDION FAQ
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// FORM VALIDATION
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff3b30';
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(255,255,255,0.1)';
                }
            });

            if (isValid) {
                alert('Solicitação enviada! Entraremos em contato em breve.');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});

// CHATBOT FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    const chatbotLauncher = document.getElementById('chatbot-launcher');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotInput = document.querySelector('.chat-footer input');
    const chatbotSend = document.querySelector('.chat-footer button');

    if (chatbotLauncher && chatbotWindow) {
        // Toggle chatbot
        chatbotLauncher.addEventListener('click', function() {
            chatbotWindow.classList.toggle('active');
            document.querySelector('.launcher-badge')?.classList.add('hidden');
        });

        // Send message function
        function sendMessage() {
            const message = chatbotInput?.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            // Simulate bot response (replace with actual API call)
            setTimeout(() => {
                hideTypingIndicator();
                addMessage('Olá! Sou a assistente virtual da LIV IA. Como posso ajudar você hoje?', 'bot');
            }, 1500);
        }

        // Send on button click
        if (chatbotSend) {
            chatbotSend.addEventListener('click', sendMessage);
        }

        // Send on Enter key
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
});

function addMessage(text, type) {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;

    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
    typingDiv.id = 'typing-indicator';

    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// SESSION MANAGEMENT
function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('liv_ia_session');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('liv_ia_session', sessionId);
    }
    return sessionId;
}

// ANIMATIONS ON SCROLL
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.sol-card, .stat-card, .contact-form-container');

    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    document.querySelectorAll('.sol-card, .stat-card, .contact-form-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Check on load
});
