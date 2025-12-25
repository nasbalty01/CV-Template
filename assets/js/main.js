// Main site JS: smooth scroll, reveal, skills animation, typewriter, nav active

// Typewriter for subtitle
(function() {
    const el = document.getElementById('hero-sub-type');
    if (!el) return;
    const words = ['Full Stack Web Developer', 'ASP.NET | Laravel | React', 'WordPress & WooCommerce', 'APIs • Microservices • DevOps'];
    let part = 0,
        partIndex = 0,
        intervalVal;

    function type() {
        const text = words[part].substring(0, partIndex + 1);
        el.textContent = text;
        partIndex++;
        if (text === words[part]) {
            setTimeout(() => { backspace(); }, 900);
        }
    }

    function backspace() {
        const text = words[part].substring(0, partIndex - 1);
        el.textContent = text;
        partIndex--;
        if (partIndex === 0) {
            part = (part + 1) % words.length;
            setTimeout(() => { type(); }, 300);
        } else {
            setTimeout(backspace, 60);
        }
    }
    // start
    type();
})();

// Smooth scroll for on-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href.startsWith('#')) {
            const el = document.querySelector(href);
            if (el) { e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }
    });
});

// Reveal on scroll & animate skill bars
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.bar > i').forEach(i => {
                const w = i.getAttribute('data-width') || '0%';
                i.style.width = w;
            });
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Highlight active nav link based on section in view
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
    });
}, { threshold: 0.35 });
sections.forEach(s => navObserver.observe(s));

// initial reveal animation staggers
window.addEventListener('load', () => {
    document.querySelectorAll('.reveal').forEach((r, i) => setTimeout(() => r.classList.add('visible'), 120 * i));
});

// small interactive: show contact alert on form submit (demo)
const contactForm = document.querySelector('form[data-contact]');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = contactForm.querySelector('input[type="email"]').value || 'someone';
        alert('Thanks, ' + email + ' — I will respond soon.');
        contactForm.reset();
    });
}