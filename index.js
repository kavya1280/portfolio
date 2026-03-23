/* ============================================
   KAVYA NAIR PORTFOLIO — index.js
   Premium interactions: custom cursor, particles,
   directional scroll reveals, magnetic hover
   ============================================ */

// ============================================
// 1. CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
let ringRAF;

document.addEventListener('mousemove', (e) => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
});

function animateRing() {
    ringX += (dotX - ringX) * 0.13;
    ringY += (dotY - ringY) * 0.13;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    ringRAF = requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring on hoverable elements
const hoverTargets = 'a, button, .skill-tag, .project-card, .activity-card, .contact-card, .education-card, .social-btn';
document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ============================================
// 2. PARTICLE CANVAS
// ============================================
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 70;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * canvas.width;
            this.y = init ? Math.random() * canvas.height : canvas.height + 10;
            this.r = Math.random() * 1.5 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = -(Math.random() * 0.4 + 0.15);
            this.alpha = Math.random() * 0.5 + 0.15;
            this.life = Math.random();
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            this.life -= 0.0018;
            if (this.life <= 0 || this.y < -10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(160, 84%, 60%, ${this.alpha * this.life})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(160, 84%, 60%, ${0.06 * (1 - d / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(loop);
    }
    loop();
})();

// ============================================
// 3. TYPEWRITER ANIMATION
// ============================================
const texts = ['Data Associate', 'Software Tester', 'QA Automation Engineer', 'Power BI Analyst', 'MCA Graduate'];
let textIndex = 0, charIndex = 0, isDeleting = false;
const T_TYPE = 90, T_DELETE = 45, T_PAUSE = 2200;

const target1 = document.getElementById('typingText');
const target2 = document.getElementById('typingText2');

function type() {
    const cur = texts[textIndex];
    const slice = cur.slice(0, isDeleting ? charIndex - 1 : charIndex + 1);
    if (target1) target1.textContent = slice;
    if (target2) target2.textContent = slice;
    isDeleting ? charIndex-- : charIndex++;
    if (!isDeleting && charIndex === cur.length) {
        setTimeout(() => { isDeleting = true; type(); }, T_PAUSE);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? T_DELETE : T_TYPE);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 800));

// ============================================
// 4. DIRECTIONAL SCROLL REVEAL
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // slight extra delay for items already in DOM
            setTimeout(() => {
                entry.target.classList.add('in-view');
            }, 0);
            observer.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ============================================
// 5. MOBILE NAV
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ============================================
// 6. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
    });
});

// ============================================
// 7. NAVBAR SCROLL BEHAVIOUR
// ============================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    if (window.pageYOffset > 60) {
        nav.style.background = 'hsla(222,47%,7%,0.92)';
        nav.style.backdropFilter = 'blur(28px)';
    } else {
        nav.style.background = '';
        nav.style.backdropFilter = '';
    }
});

// ============================================
// 8. PARALLAX ORBS
// ============================================
let orbTicking = false;
window.addEventListener('scroll', () => {
    if (!orbTicking) {
        requestAnimationFrame(() => {
            const s = window.pageYOffset;
            document.querySelectorAll('.orb').forEach((orb, i) => {
                orb.style.transform = `translateY(${s * (i + 1) * 0.04}px)`;
            });
            orbTicking = false;
        });
        orbTicking = true;
    }
});

// ============================================
// 9. MAGNETIC HOVER on buttons & cards
// ============================================
function magneticEffect(el, strength = 0.35) {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
        setTimeout(() => el.style.transition = '', 500);
    });
}

document.querySelectorAll('.btn').forEach(el => magneticEffect(el, 0.3));
document.querySelectorAll('.social-btn').forEach(el => magneticEffect(el, 0.4));

// ============================================
// 10. SKILL TAG RIPPLE
// ============================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        ripple.style.cssText = `
            position:absolute;left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;
            width:0;height:0;border-radius:50%;
            background:hsla(160,84%,39%,0.35);
            transform:translate(-50%,-50%);
            animation:rippleOut 0.55s ease-out forwards;
            pointer-events:none;
        `;
        if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Inject ripple keyframes
const style = document.createElement('style');
style.textContent = `@keyframes rippleOut{to{width:120px;height:120px;opacity:0}}`;
document.head.appendChild(style);

// ============================================
// 11. SECTION ACTIVE NAV HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinkEls.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--primary)';
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ============================================
// 12. CONSOLE EASTER EGG
// ============================================
console.log('%c✦ Kavya Nair', 'font-size:22px;font-weight:bold;color:#10b981;font-family:serif');
console.log('%cData Associate · QA Engineer · MCA Graduate', 'font-size:13px;color:#64748b');
console.log('%c📬 knair1280@gmail.com', 'font-size:12px;color:#60a5fa');