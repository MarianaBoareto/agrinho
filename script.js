// Menu Mobile Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Botão "Saiba Mais"
const btnSaibaMais = document.getElementById('btnSaibaMais');
if (btnSaibaMais) {
    btnSaibaMais.addEventListener('click', () => {
        document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
    });
}

// Animação Fade-in ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ========== ATALHO DE TECLADO: Alt + L + O ==========
let keySequence = [];
let altLPressed = false;

document.addEventListener('keydown', (event) => {
    // Verificar se Alt + L foi pressionado
    if (event.altKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        altLPressed = true;
        
        // Reset após 2 segundos se O não foi pressionado
        setTimeout(() => {
            altLPressed = false;
        }, 2000);
        
        return;
    }
    
    // Se Alt + L foi pressionado e agora pressiona O
    if (altLPressed && event.key.toLowerCase() === 'o') {
        event.preventDefault();
        altLPressed = false;
        activarEntrada();
    }
});

// Função para ativar entrada especial
function activarEntrada() {
    // Criar overlay de entrada
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, #00a8ff, #0080d0);
        z-index: 9999;
        animation: entradaEfeito 0.8s ease-out forwards;
    `;
    
    // Adicionar estilos de animação
    if (!document.getElementById('entrada-styles')) {
        const style = document.createElement('style');
        style.id = 'entrada-styles';
        style.textContent = `
            @keyframes entradaEfeito {
                0% {
                    opacity: 1;
                    transform: scale(0);
                    border-radius: 50%;
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    opacity: 0;
                    transform: scale(1);
                    border-radius: 0%;
                }
            }
            
            @keyframes pulse {
                0%, 100% { 
                    transform: scale(1);
                    text-shadow: 0 0 10px rgba(0, 168, 255, 0.5);
                }
                50% { 
                    transform: scale(1.08);
                    text-shadow: 0 0 30px rgba(0, 168, 255, 0.8);
                }
            }
            
            @keyframes aparecer {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            @keyframes desaparecer {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
            }
            
            .entrada-ativa {
                animation: pulse 0.6s ease-in-out !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(overlay);
    
    // Efeito no título
    const hero = document.querySelector('.hero-title');
    if (hero) {
        hero.classList.add('entrada-ativa');
    }
    
    // Remover overlay após animação
    setTimeout(() => {
        overlay.remove();
    }, 800);
    
    // Mostrar mensagem de sucesso
    mostrarMensagem('✨ Bem-vindo ao AgroÁguas! ✨');
    
    // Adicionar confete
    criarConfete();
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para mostrar mensagem
function mostrarMensagem(texto) {
    const mensagem = document.createElement('div');
    mensagem.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 168, 255, 0.95);
        color: white;
        padding: 30px 50px;
        border-radius: 15px;
        font-size: 20px;
        font-weight: bold;
        z-index: 10000;
        animation: aparecer 0.5s ease-out forwards;
        box-shadow: 0 15px 50px rgba(0, 168, 255, 0.4);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.animation = 'desaparecer 0.5s ease-out forwards';
        setTimeout(() => mensagem.remove(), 500);
    }, 2500);
}

// Função para criar confete
function criarConfete() {
    const confetePieces = 50;
    
    for (let i = 0; i < confetePieces; i++) {
        const confete = document.createElement('div');
        confete.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${aleatoriosCorConfete()};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 1;
            z-index: 9998;
            border-radius: 50%;
            pointer-events: none;
            animation: cair ${2 + Math.random() * 1}s linear forwards;
        `;
        document.body.appendChild(confete);
        
        setTimeout(() => {
            confete.remove();
        }, 3000);
    }
    
    // Adicionar keyframe da animação se não existir
    if (!document.getElementById('confete-animation')) {
        const style = document.createElement('style');
        style.id = 'confete-animation';
        style.textContent = `
            @keyframes cair {
                to {
                    top: 100vh;
                    opacity: 0;
                    transform: translateX(${(Math.random() - 0.5) * 200}px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Função para gerar cores aleatórias para confete
function aleatoriosCorConfete() {
    const cores = ['#00a8ff', '#0080d0', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c'];
    return cores[Math.floor(Math.random() * cores.length)];
}

// Efeito de Brilho nas cards ao hover
document.querySelectorAll('.solucao-card, .desafio-card, .tech-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const shine = document.createElement('div');
        shine.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: translate(-50%, -50%);
            animation: brilho 0.6s ease-out forwards;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(shine);
        
        setTimeout(() => shine.remove(), 600);
    });
});

// Adicionar animação de brilho
if (!document.getElementById('brilho-animation')) {
    const style = document.createElement('style');
    style.id = 'brilho-animation';
    style.textContent = `
        @keyframes brilho {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Log para debug
console.log('🌊 AgroÁguas carregado com sucesso!');
console.log('💡 Dica: Pressione Alt + L e depois O para ativar efeito especial!');
