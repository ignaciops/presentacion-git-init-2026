let currentSlide = 1;
        const totalSlides = document.querySelectorAll('.slide').length;
        document.getElementById('total-slides').textContent = totalSlides;

        // Typing effect
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
            }, 50);
        }

        function showOutput(outputId) {
            document.getElementById(outputId).style.display = 'block';
        }

        // Slide animations
        const slideAnimations = {
            1: () => {
                typeCommand('cmd1', 'git init mi-proyecto-2026', () => showOutput('output1'));
            },
            2: () => {
                typeCommand('cmd2', 'git status', () => showOutput('output2'));
            },
            3: () => {
                typeCommand('cmd3', 'mkdir mi-proyecto-2026 && cd mi-proyecto-2026 && git init', () => showOutput('output3'));
            }
        };

        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            
            if (n > totalSlides) n = 1;
            if (n < 1) n = totalSlides;
            
            currentSlide = n;
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide - 1].classList.add('active');
            
            document.getElementById('current-slide').textContent = currentSlide;
            
            // Run animation for current slide
            if (slideAnimations[currentSlide]) {
                setTimeout(() => slideAnimations[currentSlide](), 100);
            }
        }

        // Keyboard navigation
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

        // Click navigation
        document.addEventListener('click', (e) => {
            const width = window.innerWidth;
            if (e.clientX > width / 2) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(currentSlide - 1);
            }
        });

        // Initialize first slide animation
        window.addEventListener('load', () => {
            slideAnimations[1]();
        });