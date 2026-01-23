// 1. CUSTOM CURSOR
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add delay for the outline to create a smooth trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 2. 3D HERO PARALLAX
document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.layer');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const xPos = x * speed;
        const yPos = y * speed;
        // Keep the initial rotation for the card and orbits
        if(layer.classList.contains('card-3d')){
            layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px) rotateY(-15deg) rotateX(10deg)`;
        } else if(layer.classList.contains('orbit-circle')) {
            layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px) rotateX(70deg)`;
        } else {
            layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px)`;
        }
    });
});

// 3. PROJECT CARD TILT EFFECT
const cards = document.querySelectorAll('.tilt-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position within card
        // Divided by 20 to control sensitivity
        const xRot = -1 * ((y - rect.height/2) / 20);
        const yRot = (x - rect.width/2) / 20;

        card.style.transform = `perspective(500px) rotateX(${xRot}deg) rotateY(${yRot}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
    });
});

// 4. SCROLL ANIMATION (SPIRAL REVEAL)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));