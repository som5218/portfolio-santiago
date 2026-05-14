document.addEventListener("DOMContentLoaded", () => {
    
    // --- LANGUAGE SWITCHER ---
    const btnEn = document.getElementById("btn-en");
    const btnEs = document.getElementById("btn-es");
    const btnEnMob = document.getElementById("btn-en-mob");
    const btnEsMob = document.getElementById("btn-es-mob");
    const body = document.body;
    const cvLink = document.getElementById("cv-link");

    function setLanguage(lang) {
        if (lang === 'es') {
            body.classList.remove('lang-en');
            body.classList.add('lang-es');
            btnEs.classList.add('active');
            btnEsMob.classList.add('active');
            btnEn.classList.remove('active');
            btnEnMob.classList.remove('active');
            if (cvLink) cvLink.href = "cv/santiago-ortega-cv-es.pdf";
        } else {
            body.classList.remove('lang-es');
            body.classList.add('lang-en');
            btnEn.classList.add('active');
            btnEnMob.classList.add('active');
            btnEs.classList.remove('active');
            btnEsMob.classList.remove('active');
            if (cvLink) cvLink.href = "cv/santiago-ortega-cv-en.pdf";
        }
    }

    [btnEn, btnEnMob].forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => setLanguage('en'));
        }
    });

    [btnEs, btnEsMob].forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => setLanguage('es'));
        }
    });


    // --- MOBILE MENU TOGGLE ---
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileSidebar = document.querySelector(".mobile-sidebar");
    const mobLinks = document.querySelectorAll(".mob-link");

    if (mobileToggle && mobileSidebar) {
        mobileToggle.addEventListener('click', () => {
            mobileSidebar.classList.toggle('open');
        });

        // Close sidebar when a link is clicked
        mobLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileSidebar.classList.remove('open');
            });
        });
    }

    // --- INTERSECTION OBSERVER FOR FADE IN ANIMATIONS ---
    const revealSections = document.querySelectorAll('.section-reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it has been revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealSections.forEach(section => {
        revealOnScroll.observe(section);
    });

    // Trigger hero visibility on load
    const hero = document.getElementById('hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('is-visible');
        }, 100);
    }

    // --- 3D TILT EFFECT FOR CARD ---
    const cardContainer = document.querySelector('.animated-card-container');
    const card = document.querySelector('.animated-card');
    const cardGlow = document.querySelector('.card-glow');

    if (cardContainer && card) {
        cardContainer.addEventListener('mousemove', (e) => {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            // Calculate rotation (max 15 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Apply transform using requestAnimationFrame for smoothness
            requestAnimationFrame(() => {
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                
                // Move glow effect based on mouse position
                if (cardGlow) {
                    cardGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
                }
            });
        });

        // Reset rotation when mouse leaves
        cardContainer.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
                card.style.transition = `transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)`;
                if (cardGlow) {
                    cardGlow.style.opacity = '0';
                }
            });
        });

        // Remove transition during hover for instant mouse follow
        cardContainer.addEventListener('mouseenter', () => {
            card.style.transition = `none`;
            if (cardGlow) {
                cardGlow.style.opacity = '1';
            }
        });
    }
});
