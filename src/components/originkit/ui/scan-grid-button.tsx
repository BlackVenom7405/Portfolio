"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ScanGridButtonProps {
  text?: string;
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  color?: string;
  gridColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ScanGridButton({
  text = "RESUME",
  href,
  download,
  target,
  rel,
  onClick,
  color = "#3b82f6",
  gridColor = "rgba(59, 130, 246, 0.15)",
  className = "",
  children,
}: ScanGridButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-mono text-xs uppercase tracking-[0.3em] font-bold text-blue-400 bg-white/[0.07] backdrop-blur-md border border-white/20 hover:border-blue-400/60 rounded-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group transition-all duration-300 ${className}`}
      style={{
        boxShadow: isHovered
          ? `0 0 25px ${color}60, inset 0 0 15px ${color}30, 0 8px 32px 0 rgba(0, 0, 0, 0.37)`
          : undefined,
      }}
    >
      {/* Glass Specular Reflection Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-blue-500/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Background Subtle Sci-Fi Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      />

      {/* Reticle Corner Brackets */}
      {/* Top Left */}
      <span
        className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-all duration-300"
        style={{
          borderColor: color,
          transform: isHovered ? "translate(-1px, -1px)" : "translate(1px, 1px)",
          boxShadow: isHovered ? `0 0 8px ${color}` : "none",
        }}
      />
      {/* Top Right */}
      <span
        className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-all duration-300"
        style={{
          borderColor: color,
          transform: isHovered ? "translate(1px, -1px)" : "translate(-1px, 1px)",
          boxShadow: isHovered ? `0 0 8px ${color}` : "none",
        }}
      />
      {/* Bottom Left */}
      <span
        className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-all duration-300"
        style={{
          borderColor: color,
          transform: isHovered ? "translate(-1px, 1px)" : "translate(1px, -1px)",
          boxShadow: isHovered ? `0 0 8px ${color}` : "none",
        }}
      />
      {/* Bottom Right */}
      <span
        className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-all duration-300"
        style={{
          borderColor: color,
          transform: isHovered ? "translate(1px, 1px)" : "translate(-1px, -1px)",
          boxShadow: isHovered ? `0 0 8px ${color}` : "none",
        }}
      />

      {/* Looping Vertical Scanline Band */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
        animate={
          isHovered
            ? {
                top: ["0%", "100%", "0%"],
              }
            : { top: "0%" }
        }
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "linear",
        }}
      />

      {/* Glitch & Illuminated Text */}
      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
        {children || text}
      </span>
    </Component>
  );
}
