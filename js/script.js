document.addEventListener("DOMContentLoaded", () => {
    
    // --- LANGUAGE SWITCHER ---
    const btnEn = document.getElementById("btn-en");
    const btnEs = document.getElementById("btn-es");
    const btnEnMob = document.getElementById("btn-en-mob");
    const btnEsMob = document.getElementById("btn-es-mob");
    const body = document.body;

    function setLanguage(lang) {
        if (lang === 'es') {
            body.classList.remove('lang-en');
            body.classList.add('lang-es');
            btnEs.classList.add('active');
            btnEsMob.classList.add('active');
            btnEn.classList.remove('active');
            btnEnMob.classList.remove('active');
        } else {
            body.classList.remove('lang-es');
            body.classList.add('lang-en');
            btnEn.classList.add('active');
            btnEnMob.classList.add('active');
            btnEs.classList.remove('active');
            btnEsMob.classList.remove('active');
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
});
