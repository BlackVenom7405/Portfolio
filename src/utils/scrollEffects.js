/* SCROLL ANIMATION JS */
export const initScrollEffects = () => {
    // 1. Reveal on Scroll (Intersection Observer)
    const overlayElements = document.querySelectorAll('h1, h2, h3, p, .card, section > div, .animate-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Optional: keep observing if you want it to repeat
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    overlayElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 2. Parallax & Smooth Zoom Logic (RAF)
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollEffects = () => {
        const scrollY = window.scrollY;
        
        // Hero Zoom (Subtle 1.0 -> 1.1)
        const heroContainer = document.querySelector('#hero-container') || document.querySelector('section:first-of-type');
        if (heroContainer) {
            const scrollFactor = Math.min(scrollY / 1000, 1);
            const scale = 1 + (scrollFactor * 0.1);
            heroContainer.style.transform = `scale(${scale})`;
        }

        // Layered Parallax for Backgrounds
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        parallaxBgs.forEach(bg => {
            const speed = bg.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            bg.style.transform = `translateY(${yPos}px) translateZ(0)`;
        });

        lastScrollY = scrollY;
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // 3. Subtle Mouse Parallax (Desktop Only)
    if (window.innerWidth > 1024) {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            
            const mouseParallaxElements = document.querySelectorAll('.mouse-parallax');
            mouseParallaxElements.forEach(el => {
                const intensity = el.dataset.intensity || 1;
                el.style.transform = `translate3d(${xPos * intensity}px, ${yPos * intensity}px, 0)`;
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
    }
};
