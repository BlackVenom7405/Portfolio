import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  
  const textContainerRef = useRef(null);
  const roleWrapperRef = useRef(null);
  const subtitleWrapperRef = useRef(null);
  const highlightWrapperRef = useRef(null);

  const frameCount = 240;
  const currentFrame = (index) => `/images/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;
  
  const imagesRef = useRef([]);
  // We use an object to track the frame so GSAP can animate the value smoothly
  const seqRef = useRef({ frame: 0 });

  useEffect(() => {
    // Preload sequence
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) setLoaded(true);
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) setLoaded(true);
        };
        imagesRef.current.push(img);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      render();
    };

    const render = () => {
        if (!canvasRef.current || !imagesRef.current.length) return;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Clamp frame just in case
        let frameIdx = Math.round(seqRef.current.frame);
        if (frameIdx >= frameCount) frameIdx = frameCount - 1;
        
        const img = imagesRef.current[frameIdx];
        if (img && img.complete && img.naturalHeight !== 0) {
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }

        // Update state only if threshold is crossed to minimize re-renders
        setCurrentFrameIdx(frameIdx);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Draw initial frame & setup dimensions

    // --- 1. SYSTEM BOOT OPENING EXPERIENCE (Runs on Mount) ---
    const bootTl = gsap.timeline({ delay: 0.5 });

    // Boot visuals
    bootTl.fromTo('.noise-overlay', { opacity: 0 }, { opacity: 0.15, duration: 1, ease: "none" }, 0);
    bootTl.fromTo('.center-glow', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power1.inOut" }, 0.2);
    
    // Navbar slide in
    bootTl.fromTo('nav', { y: -50, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0)', duration: 1, ease: "power2.out" }, 0.5);

    // Initial Face Reveal
    bootTl.fromTo(canvas, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0.8);
    // Slowly play initial frames immediately
    bootTl.to(seqRef.current, { frame: 10, snap: "frame", duration: 1.5, ease: "power1.inOut", onUpdate: render }, 0.8);

    // HUD Elements sequence
    bootTl.fromTo('.hud-element', { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.1, ease: "none" }, 1.2);

    // Robotic Text Sequence
    if (textContainerRef.current) {
        // LEESHARK chars glitch/stagger in
        bootTl.to('.title-char', { opacity: 1, x: 0, duration: 0.05, stagger: 0.05, ease: "none" }, 1.5);
        
        // Full Stack Developer
        bootTl.fromTo(roleWrapperRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 2.0);
        bootTl.fromTo('.role-underline', { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.3, ease: "none" }, 2.2);

        // Right Content
        bootTl.fromTo(subtitleWrapperRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3, ease: "none" }, 2.4);
        bootTl.fromTo(highlightWrapperRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.2, ease: "none" }, 2.6);

        // Social Icons Bottom Left
        bootTl.fromTo('.social-icon', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.1, ease: "none" }, 2.8);
    }

    // --- 2. MAIN SCROLL CONTINUATION ---
    // User scroll takes over from whatever frame bootTl left off at, up to 239.
    const tlScroll = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1
        }
    });

    tlScroll.to(seqRef.current, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1, 
        onUpdate: render
    });

    // Content stays fixed. No aggressive re-animations. 
    // Just a clean sharp fade out at the very end of the scroll.
    tlScroll.fromTo('.portfolio-ui', 
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(5px)", duration: 0.1, ease: "none" }, 
        0.9
    );
    
    tlScroll.fromTo(canvas, 
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(10px)", duration: 0.1, ease: "none" }, 
        0.9
    );

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded]);

  const titleText = "BHARATH GOWDA D";

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide">
        
        {/* Loading State */}
        {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020202]">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">&gt; INITIALIZING_CORE_SYSTEM</div>
                <div className="w-64 h-[1px] bg-white/10 overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${loadingProgress}%` }}></div>
                </div>
            </div>
        )}

        {/* --- BACKGROUND EFFECTS --- */}
        {/* Subtle grid lines */}
        <div className="portfolio-ui absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* Static noise grain */}
        <div className="portfolio-ui noise-overlay absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        {/* Center Subdued Blue Glow */}
        <div className="portfolio-ui center-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-0 mix-blend-screen z-[1]"></div>

        {/* --- HUD ELEMENTS --- */}
        <div className="portfolio-ui absolute top-28 left-8 md:top-32 md:left-12 z-[60] font-mono text-[10px] text-blue-400 tracking-widest flex flex-col space-y-1.5 pointer-events-none">
            <span className="hud-element opacity-0">&gt; SYSTEM ONLINE</span>
            <span className="hud-element opacity-0">&gt; CYBERSECURITY & DEV PORTFOLIO</span>
            <span className="hud-element opacity-0">&gt; SECURE PROTOCOL ESTABLISHED</span>
        </div>
        <div className="portfolio-ui absolute bottom-12 right-8 md:bottom-12 md:right-12 z-[60] font-mono text-[10px] text-gray-600 tracking-widest text-right flex flex-col space-y-1.5 pointer-events-none">
            <span className="hud-element opacity-0">IDENT: BHARATH_GOWDA_D</span>
            <span className="hud-element opacity-0">SYS: REACT_GSAP_CYBER</span>
        </div>

        {/* --- SOCIAL LINKS --- */}
        <div className="portfolio-ui absolute bottom-12 left-8 md:left-12 z-[60] flex flex-col space-y-5">
            <a href="https://github.com/BlackVenom7405" target="_blank" rel="noreferrer" title="GitHub" className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {/* GitHub */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/bharath-gowda-d-9779081ab/" target="_blank" rel="noreferrer" title="LinkedIn" className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {/* LinkedIn */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/BharathGow83675" target="_blank" rel="noreferrer" title="Twitter/X" className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {/* Twitter / X */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/_bharu__xo_/" target="_blank" rel="noreferrer" title="Instagram" className="social-icon opacity-0 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {/* Instagram */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
        </div>

        {/* --- CANVAS --- */}
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-0 scale-95"
        />

        {/* --- PORTFOLIO TEXT OVERLAY --- */}
        <AnimatePresence>
            {loaded && (
                <div className="portfolio-ui absolute inset-0 z-[50] pointer-events-none flex flex-col md:flex-row justify-between items-center md:items-center px-8 md:px-[15%] lg:px-[18%] pt-32 pb-16 md:pt-0 pb-0">
                    
                    {/* LEFT SIDE: Name and Role */}
                    <div className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left">
                        {currentFrameIdx >= 100 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="mb-4"
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-[0.08em] uppercase leading-tight" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                                    {titleText}
                                </h1>
                            </motion.div>
                        )}
                        
                        {currentFrameIdx >= 150 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="relative inline-block"
                            >
                                <h2 className="text-xs md:text-sm font-mono text-blue-400 tracking-[0.2em] uppercase pb-2">
                                    Cybersecurity Analyst | Full-Stack Developer
                                </h2>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500/60"></div>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT SIDE: Description and Button */}
                    <div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left mt-12 md:mt-0 md:pl-6">
                        {currentFrameIdx >= 200 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="mb-8"
                            >
                                <p className="text-gray-300 text-xs md:text-sm font-light tracking-wide leading-relaxed">
                                    Building secure, innovative digital solutions while exploring the worlds of cybersecurity and software development.
                                </p>
                            </motion.div>
                        )}

                        {currentFrameIdx >= 240 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="pointer-events-auto flex items-center space-x-4"
                            >
                                <a href="#projects" className="inline-flex items-center px-8 py-3 border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer rounded-sm backdrop-blur-md group shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                                    <span className="text-gray-200 font-mono tracking-widest uppercase text-xs group-hover:text-white transition-colors">Explore Work</span>
                                </a>
                                <a href="/Bharath_Gowda_D_Resume.pdf" download="Bharath_Gowda_D_Resume.pdf" className="inline-flex items-center px-6 py-3 border border-white/20 bg-black/50 hover:bg-white hover:text-black transition-all cursor-pointer rounded-sm backdrop-blur-md group">
                                    <span className="font-mono tracking-widest uppercase text-xs text-gray-300 group-hover:text-black transition-colors">Resume</span>
                                </a>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
}
