/**
 * NOVO SORRISO ODONTOLOGIA VILA ALBERTINA - MASTER JAVASCRIPT
 * ES2023 Vanilla JS, Acessibilidade WCAG 2.2 AA, Scroll Observer e CRO.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. HEADER STICKY & MOBILE NAV TOGGLE --- */
    const header = document.getElementById('header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
        body.classList.toggle('no-scroll', isOpen);
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* --- 2. HIGHLIGHT NAV ON SCROLL --- */
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(highlightNavOnScroll);
    }, { passive: true });

    /* --- 3. ACCORDION FAQ (Acessível) --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(headerBtn => {
        headerBtn.addEventListener('click', () => {
            const accordionItem = headerBtn.parentElement;
            const isOpen = accordionItem.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.accordion-header');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                accordionItem.classList.add('active');
                headerBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* --- 4. SCROLL REVEAL (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- 5. BACK TO TOP BUTTON --- */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- 6. ENVIO DE FORMULÁRIO DE AGENDAMENTO VIA WHATSAPP --- */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const rawPhone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            const sanitizedPhone = rawPhone.replace(/\D/g, '');

            const formattedMessage = `Olá! Gostaria de agendar uma consulta na Novo Sorriso Odontologia Vila Albertina.%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Telefone:* ${sanitizedPhone}%0A*Tratamento:* ${encodeURIComponent(service)}%0A*Mensagem:* ${encodeURIComponent(message)}`;

            window.open(`https://wa.me/5511999999999?text=${formattedMessage}`, '_blank', 'noopener,noreferrer');
            contactForm.reset();
        });
    }
});