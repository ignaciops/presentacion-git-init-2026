let currentSlide = 1;
const totalSlides = 12; // ACTUALIZADO de 10 a 11
document.getElementById('total-slides').textContent = totalSlides;

// Variable global para controlar el timer
let timerInterval = null;

// Efecto de escritura mejorado
function typeCommand(elementId, text, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let i = 0;
    element.textContent = '';

    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
            if (callback) setTimeout(callback, 300);
        }
    }, 50);
}

function showOutput(outputId, delay = 300) {
    setTimeout(() => {
        const output = document.getElementById(outputId);
        if (output) {
            output.style.display = 'block';
            output.style.animation = 'fadeIn 0.3s ease-in';
        }
    }, delay);
}

// Función para el timer de la actividad
function startActivityTimer() {
    // Limpiar timer anterior si existe
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    let timeLeft = 90;
    timerElement.textContent = timeLeft;
    timerElement.style.color = '#4ec9b0';
    timerElement.classList.remove('timer-warning');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        // Cambiar a rojo y animar en los últimos 10 segundos
        if (timeLeft <= 10 && timeLeft > 0) {
            timerElement.style.color = '#ff5f56';
            timerElement.classList.add('timer-warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = '¡Tiempo!';
            timerElement.style.color = '#ff5f56';
        }
    }, 1000);
}

// Animaciones por diapositiva
const slideAnimations = {
    1: () => {
        typeCommand('cmd1', 'git init mi-proyecto-2026', () => showOutput('output1'));
    },
    2: () => {
        typeCommand('cmd2', 'git status', () => showOutput('output2'));
    },
    3: () => {
        typeCommand('cmd3', 'mkdir mi-proyecto-2026 && cd mi-proyecto-2026 && git init', () => showOutput('output3'));
    },
    // Slide 4: Roadmap visual - no necesita animación
    5: () => {
        // Slide 5: Actividad - iniciar timer
        startActivityTimer();
    }
    // Slides 6-11: No requieren animación específica (son text-only)
};

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    if (n > totalSlides) n = 1;
    if (n < 1) n = totalSlides;

    if (currentSlide !== n) {
        // Limpiar timer al cambiar de slide
        if (timerInterval && n !== 5) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        currentSlide = n;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide - 1].classList.add('active');

        document.getElementById('current-slide').textContent = currentSlide;

        // Actualizar barra de progreso
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progressPercent = (currentSlide / totalSlides) * 100;
            progressFill.style.width = progressPercent + '%';
        }

        // Ejecutar animación de la diapositiva actual si existe
        if (slideAnimations[currentSlide]) {
            setTimeout(() => slideAnimations[currentSlide](), 100);
        }
    }
}

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showSlide(currentSlide - 1);
    } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        showSlide(1);
    } else if (e.key === 'End') {
        e.preventDefault();
        showSlide(totalSlides);
    }
});

// Navegación por clic
document.addEventListener('click', (e) => {
    // Ignorar clics en elementos interactivos
    if (e.target.closest('.terminal') || e.target.closest('.navigation')) {
        return;
    }

    const width = window.innerWidth;
    if (e.clientX > width / 2) {
        showSlide(currentSlide + 1);
    } else {
        showSlide(currentSlide - 1);
    }
});

// Inicializar presentación
window.addEventListener('load', () => {
    showSlide(1);
    // Ejecutar animación del slide inicial
    if (slideAnimations[1]) {
        setTimeout(() => slideAnimations[1](), 100);
    }
});

// Limpiar timer al cerrar/recargar página
window.addEventListener('beforeunload', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});