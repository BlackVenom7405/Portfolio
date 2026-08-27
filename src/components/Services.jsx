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

      // 3. Experience Sidebar Slide
      tl.fromTo(sidebarRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: "none" },
        "-=0.3"
      );

      // UI corner lines animation for sidebar
      tl.fromTo(".corner-line",
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "none", stagger: 0.05 },
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
      <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <div className="inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-sm mb-4">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em]">SERVICES MODULE</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
          My Services<span className="text-blue-500">.</span>
        </h2>
        <div className="w-24 h-[1px] bg-blue-500/40 mx-auto mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-500 font-light text-base leading-relaxed">
          Leveraging my experience from production-level applications and real-time startup incubation projects to build scalable digital solutions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* Main Services Grid */}
        <div ref={gridRef} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainServices.map((service) => (
            <div
              key={service.title}
              className="service-card group p-10 bg-[#0a0a0a] border border-white/[0.05] hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all duration-300 rounded-sm cursor-default flex flex-col items-start"
            >
              <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-sm text-gray-300 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase">{service.title}</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-10">
                {service.p}
              </p>
              <button className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 hover:text-white group/btn transition-colors">
                <span>View Details</span> 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Featured Experience Card (Sidebar) */}
        <div ref={sidebarRef} className="lg:col-span-4 h-full relative">
          <div className="sticky top-32 p-10 bg-[#0c0c0c] border border-white/[0.08] rounded-sm group overflow-hidden">
            
            {/* HUD Corner Lines */}
            <div className="corner-line absolute top-2 left-2 w-4 h-4 border-t border-l border-blue-500/50"></div>
            <div className="corner-line absolute top-2 right-2 w-4 h-4 border-t border-r border-blue-500/50"></div>
            <div className="corner-line absolute bottom-2 left-2 w-4 h-4 border-b border-l border-blue-500/50"></div>
            <div className="corner-line absolute bottom-2 right-2 w-4 h-4 border-b border-r border-blue-500/50"></div>

            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-1000" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-sm text-blue-400">
                  <FiBriefcase size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-widest uppercase">Experience</h3>
                  <span className="text-[8px] font-mono text-gray-600 block tracking-[0.4em] mt-1">MODULE ACTIVE</span>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <div className="h-10 px-3 bg-white flex items-center justify-center rounded-sm">
                   <span className="text-black font-black text-[10px] tracking-tighter">AGROGANAM</span>
                </div>
                <div className="h-10 px-3 border border-white/20 flex items-center justify-center rounded-sm">
                   <span className="text-white font-bold text-[10px] tracking-widest">INCUBATION</span>
                </div>
              </div>

              <p className="text-gray-400 font-light text-sm leading-relaxed mb-12">
                Completed a 6-month internship at <span className="text-white font-medium">Agroganam Technologies</span>, 
                delivering production-level apps and collaborating on real-time incubation center projects.
              </p>

              <div className="mt-auto space-y-6">
                <div className="relative overflow-hidden rounded-sm group/img h-40">
                  <div className="absolute inset-0 bg-blue-500/5 z-10 mix-blend-overlay"></div>
                  <img 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" 
                    alt="Work Showcase" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 font-mono text-[8px] text-gray-500 tracking-widest">SYSTEM_IMAGE_01</div>
                </div>
                
                <button 
                  className="w-full py-4 border border-white/10 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                >
                  View Case Study
                </button>
              </div>
            </div>
          </div>

          {/* Micro HUD Footer */}
          <div className="mt-6 flex justify-between items-center font-mono text-[9px] text-gray-700 tracking-[0.2em] px-2 opacity-50">
            <span>&gt; SYSTEM DATA LOADED</span>
            <span>0x034FB</span>
          </div>
        </div>

      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03] z-10"></div>
      <div className="absolute top-0 right-1/2 w-[1px] h-full bg-white/[0.03] z-10"></div>
    </section>
  );
}
