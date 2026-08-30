"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiDownload } from "react-icons/fi";

interface LiquidCarveButtonProps {
  text?: string;
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  color?: string;
  blobColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function LiquidCarveButton({
  text = "Download Resume",
  href = "/Bharath_Gowda_D_Resume.pdf",
  download = "Bharath_Gowda_D_Resume.pdf",
  target = "_blank",
  rel = "noopener noreferrer",
  onClick,
  color = "#2563eb",
  blobColor = "#3b82f6",
  className = "",
  children,
}: LiquidCarveButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for the liquid carving blob
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <div className="relative inline-block group">
      {/* SVG Gooey Filter Definition */}
      <svg className="hidden absolute width-0 height-0">
        <defs>
          <filter id="liquid-carve-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <Component
        ref={buttonRef}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative inline-flex items-center justify-center space-x-4 px-10 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden shadow-lg shadow-blue-900/30 border border-blue-400/30 transition-all duration-300 ${className}`}
        style={{
          filter: isHovered ? "url(#liquid-carve-goo)" : "none",
        }}
      >
        {/* Cursor tracking liquid carving blob */}
        <motion.div
          className="absolute rounded-full pointer-events-none mix-blend-screen"
          style={{
            x: springX,
            y: springY,
            width: isHovered ? 120 : 0,
            height: isHovered ? 120 : 0,
            marginLeft: -60,
            marginTop: -60,
            backgroundColor: blobColor,
            boxShadow: `0 0 30px ${blobColor}, 0 0 60px ${color}`,
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{ opacity: { duration: 0.2 } }}
        />

        {/* Liquid Tear/Wave Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundSize: "200% 200%",
          }}
          animate={
            isHovered
              ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
              : { backgroundPosition: "0% 50%" }
          }
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Label and Icon */}
        <span className="relative z-10 flex items-center space-x-3 text-white font-bold tracking-widest">
          <span>{children || text}</span>
          <FiDownload size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
        </span>
      </Component>
    </div>
  );
}
