import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiShield, 
  FiCode, 
  FiCpu, 
  FiLock, 
  FiBriefcase, 
  FiArrowRight 
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);

  const mainServices = [
    {
      icon: <FiShield size={24} />,
      title: "Cybersecurity & Security Analysis",
      p: "Conducting basic security assessments, vulnerability analysis, network scanning, and exploring secure system practices.",
    },
    {
      icon: <FiCode size={24} />,
      title: "Web Development",
      p: "Building responsive, modern, and user-friendly websites and web applications using HTML, CSS, JavaScript, React, Node.js, and related technologies.",
    },
    {
      icon: <FiCpu size={24} />,
      title: "AI-Powered Applications",
      p: "Developing AI-integrated tools and applications that automate tasks, analyze information, and provide intelligent insights.",
    },
    {
      icon: <FiLock size={24} />,
      title: "Privacy & Security Tools",
      p: "Creating security and privacy-focused applications such as metadata analysis, metadata cleaning, and honeypot-based monitoring systems.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Header Animation
      tl.fromTo(headerRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: "none", stagger: 0.1 }
      );

      // 2. Main Services Grid Stagger
      tl.fromTo(".service-card", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.3, ease: "none", stagger: 0.1 },
        "-=0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#000] text-white overflow-hidden scroll-mt-24"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <div className="inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-sm mb-4">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em]">SERVICES MODULE</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
          My Services<span className="text-blue-500">.</span>
        </h2>
        <div className="w-24 h-[1px] bg-blue-500/40 mx-auto mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-400 font-light text-sm md:text-base leading-relaxed">
          Building secure systems, web applications, AI tools, and privacy-focused software solutions tailored to modern engineering standards.
        </p>
      </div>

      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {mainServices.map((service) => (
          <div
            key={service.title}
            className="service-card group p-8 bg-[#0a0a0a] border border-white/[0.05] hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 rounded-xl cursor-default flex flex-col justify-between"
          >
            <div>
              <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg w-fit text-gray-300 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight uppercase leading-snug">{service.title}</h3>
              <p className="text-gray-400 font-light text-xs leading-relaxed mb-8">
                {service.p}
              </p>
            </div>
            <a href="#contact" className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 hover:text-white group/btn transition-colors mt-auto">
              <span>Inquire Now</span> 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03] z-10"></div>
      <div className="absolute top-0 right-1/2 w-[1px] h-full bg-white/[0.03] z-10"></div>
    </section>
  );
}
