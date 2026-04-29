
// ==========================================
// CONFIGURACIÓN - Cambia aquí tus URLs
// ==========================================
let matchedPairs = 0;
const CONFIG = {
    // URL de tu logo - Deja vacío \"\" para mostrar placeholder
    logoURL: "",
    
    // URL de tu imagen de banner - Deja vacío \"\" para mostrar placeholder
    //bannerURL: "banner.png",
    
    // Nombres de las secciones del header
    sectionNames: {
        section1: "Sobre nosotros",
        section2: "Nuestra campaña",
        section3: "Más información",
        section4: "Juego de cartas"
    }
};

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
menuToggle.classList.toggle("active");
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ==========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', function () {


    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.card');
            if (!card) return;

            const extra = card.querySelector('.extra-content');
            if (!extra) return;

            if (extra.style.display === 'block') {
                extra.style.display = 'none';
                this.textContent = 'Leer más';
            } else {
                extra.style.display = 'block';
                this.textContent = 'Leer menos';
            }
        });
    });

    initializePage();
    setupSmoothScroll();
    setupButtonAnimations();
    setupCardAnimations();

    initMemoryGame();
});

// ==========================================
// CARGAR IMÁGENES (LOGO Y BANNER)
// ==========================================
function initializePage() {
    // Cargar logo si está configurado
    const logoImg = document.getElementById('logoImg');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    
    if (CONFIG.logoURL && CONFIG.logoURL.trim() !== "") {
        logoImg.src = CONFIG.logoURL;
        logoImg.style.display = 'block';
        logoPlaceholder.style.display = 'none';
    }
    
    // Cargar banner si está configurado
    const bannerImg = document.getElementById('bannerImg');
    const bannerPlaceholder = document.getElementById('bannerPlaceholder');
    
    if (CONFIG.bannerURL && CONFIG.bannerURL.trim() !== "") {
        bannerImg.src = CONFIG.bannerURL;
        bannerImg.style.display = 'block';
        bannerPlaceholder.style.display = 'none';
    }
    
    console.log('✅ Página inicializada correctamente');
}

// ==========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ==========================================
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^=\"#\"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// ANIMACIONES DE BOTONES
// ==========================================
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Aquí puedes agregar la funcionalidad de tus botones
            console.log('Botón clickeado:', this.textContent);
        });
    });
}

// ==========================================
// ANIMACIONES DE CARDS AL HACER SCROLL
// ==========================================
function setupCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
// FUNCIÓN PARA CAMBIAR IMÁGENES DINÁMICAMENTE
// ==========================================
function setLogo(url) {
    const logoImg = document.getElementById('logoImg');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    
    if (url && url.trim() !== "") {
        logoImg.src = url;
        logoImg.style.display = 'block';
        logoPlaceholder.style.display = 'none';
        console.log('✅ Logo actualizado');
    }
}

function setBanner(url) {
    const bannerImg = document.getElementById('bannerImg');
    const bannerPlaceholder = document.getElementById('bannerPlaceholder');
    
    if (url && url.trim() !== "") {
        bannerImg.src = url;
        bannerImg.style.display = 'block';
        bannerPlaceholder.style.display = 'none';
        console.log('✅ Banner actualizado');
    }
}

// ==========================================
// HEADER BACKGROUND AL HACER SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.style.background = 'linear-gradient(135deg, rgba(222, 217, 226, 0.95), rgba(117, 201, 200, 0.95))';
        header.style.boxShadow = '0 4px 20px rgba(128, 161, 212, 0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, rgba(222, 217, 226, 0.85), rgba(117, 201, 200, 0.85))';
        header.style.boxShadow = 'none';
    }
});

// ==========================================
// FUNCIÓN PARA EL ÁREA DE JUEGO DE CARTAS
// ==========================================
function initializeCardGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '<p style=\"color: white;\">Tu juego de cartas irá aquí</p>';
    
    // Aquí puedes agregar tu lógica del juego de cartas
    console.log('🎮 Área de juego inicializada');
    
    // Ejemplo: agregar cartas
    // createCard('card1');
    // createCard('card2');
}

function createCard(cardId) {
    const gameArea = document.getElementById('gameArea');
    const card = document.createElement('div');
    card.id = cardId;
    card.className = 'game-card-element';
    card.style.cssText = `
        width: 100px;
        height: 150px;
        background: white;
        border-radius: 8px;
        margin: 10px;
        display: inline-block;
        cursor: pointer;
        transition: transform 0.3s ease;
    `;
    
    card.addEventListener('click', function() {
        this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
    
    gameArea.appendChild(card);
}

// ==========================================
// UTILIDADES DE CONSOLA
// ==========================================
console.log(`
╔════════════════════════════════════════╗
║   Página Web de Campaña Publicitaria  ║
╚════════════════════════════════════════╝

📝 Para personalizar:
   - Edita el objeto CONFIG en script.js
   - Cambia CONFIG.logoURL y CONFIG.bannerURL
   - Modifica los textos directamente en index.html

🎮 Para el juego de cartas:
   - Usa initializeCardGame() en la consola
   - O agrega tu código en la función initializeCardGame()

💡 Funciones disponibles:
   - setLogo(\"tu-url-aqui\")
   - setBanner(\"tu-url-aqui\")
   - initializeCardGame()
`);

const cardsData = [
    { value: "👕", message: "Incluso en verano, las mangas largas pueden ocultar batallas que no se ven a simple vista." },
    { value: "👕", message: "Incluso en verano, las mangas largas pueden ocultar batallas que no se ven a simple vista." },

    { value: "🩹", message: "Pequeñas señales físicas pueden esconder grandes emociones internas." },
    { value: "🩹", message: "Pequeñas señales físicas pueden esconder grandes emociones internas." },

    { value: "😶", message: "El silencio prolongado también puede ser una forma de pedir ayuda." },
    { value: "😶", message: "El silencio prolongado también puede ser una forma de pedir ayuda." },

    { value: "🌧️", message: "Los cambios de ánimo bruscos pueden ser una señal de que algo no va bien." },
    { value: "🌧️", message: "Los cambios de ánimo bruscos pueden ser una señal de que algo no va bien." }
];

let currentMessage = "";
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let gameInitialized = false;

function initMemoryGame() {
    if (gameInitialized) return;
    gameInitialized = true;
    
    const board = document.getElementById("memoryBoard");
    board.innerHTML = "";
    // mezclar cartas
    cardsData.sort(() => 0.5 - Math.random());

    cardsData.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("memory-card");

        card.innerHTML = `
            <div class="memory-inner">
                <div class="memory-front">
                    <img src="logotipo.png" alt="Logo" class="card-logo">
                </div>
                <div class="memory-back">${item.value}</div>
            </div>
        `;

        card.dataset.value = item.value;

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    const messageBox = document.getElementById("gameMessage");

    if (firstCard.dataset.value === secondCard.dataset.value) {

        const matchedIcon = firstCard.dataset.value;
        const cardInfo = cardsData.find(c => c.value === matchedIcon);

        messageBox.textContent = cardInfo.message;

        matchedPairs++;

        resetTurn();

        checkWin();

    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    const messageBox = document.getElementById("gameMessage");

    if (matchedPairs === cardsData.length / 2) {
        messageBox.innerHTML = `
            <h2 style="margin-bottom:10px;
                        color: rgba(78, 74, 161, 0.884);
            ">¡Misión Cumplida!</h2>
            <p style="font-size:14px; color: rgba(78, 74, 161, 0.884);">
                Has aprendido que un simple objeto puede contar una historia difícil.  
                Ser un buen amigo empieza por <strong>ver más allá de lo evidente</strong>.
            </p>
        `;
    }
}

// inicializar al cargar
document.addEventListener("DOMContentLoaded", initMemoryGame);