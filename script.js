document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. MENÚ HAMBURGUESA (MÓVIL)
       ========================================= */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle){
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* =========================================
       2. EFECTO TYPEWRITER (ESCRITURA)
       ========================================= */
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Desarrollador Web", "Profe de Música", "Creador digital", "Entusiasta de la Tecnología"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Tiempo que espera antes de borrar
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Iniciar el efecto solo si existen los elementos en el HTML
    if(typedTextSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // Easter egg para desarrolladores curiosos
    console.log("%c¡Hola! Veo que estás inspeccionando el código. 👀", "color: #8a2be2; font-size: 16px; font-weight: bold;");
    console.log("Bienvenido a KianDev v1.0");
});