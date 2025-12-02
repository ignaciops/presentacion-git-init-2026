let currentSlide = 1;
// *** ACTUALIZADO: Debe ser 10 para coincidir con el total de diapositivas (1-10) ***
const totalSlides = 10;
document.getElementById('total-slides').textContent = totalSlides;

// Efecto de escritura
function typeCommand(elementId, text, callback) {
    const element = document.getElementById(elementId);
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
    }, 50); // Velocidad de escritura
}

function showOutput(outputId) {
    const output = document.getElementById(outputId);
    if (output) {
        output.style.display = 'block';
    }
}

// Animaciones por diapositiva
const slideAnimations = {
    // Slide 1: Título
    1: () => {
        typeCommand('cmd1', 'git init mi-proyecto-2026', () => showOutput('output1'));
    },
    // Slide 2: El Problema
    2: () => {
        typeCommand('cmd2', 'git status', () => showOutput('output2'));
    },
    // Slide 3: git init
    3: () => {
        typeCommand('cmd3', 'mkdir mi-proyecto-2026 && cd mi-proyecto-2026 && git init', () => showOutput('output3'));
    },
    // Las Slides 4 a 10 son layouts de texto o split-view sin animación de tipeo, por lo que no requieren una función aquí.
    // Si quisieras animar la Slide 4, necesitarías darle IDs a los comandos de ese Split View y definirlos aquí.
};

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    if (n > totalSlides) n = 1;
    if (n < 1) n = totalSlides;

    // Solo actualiza si hay un cambio de slide
    if (currentSlide !== n) {
        currentSlide = n;

        // Oculta todas las diapositivas y solo muestra la actual
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide - 1].classList.add('active');

        document.getElementById('current-slide').textContent = currentSlide;

        // Ejecuta la animación de la diapositiva actual si existe
        if (slideAnimations[currentSlide]) {
            setTimeout(() => slideAnimations[currentSlide](), 100);
        }
    }
}

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

// Navegación por clic (mitad derecha para avanzar, mitad izquierda para retroceder)
document.addEventListener('click', (e) => {
    const width = window.innerWidth;
    if (e.clientX > width / 2) {
        showSlide(currentSlide + 1);
    } else {
        showSlide(currentSlide - 1);
    }
});

// Inicializa la presentación
window.addEventListener('load', () => {
    // Muestra la primera diapositiva
    showSlide(1);
});