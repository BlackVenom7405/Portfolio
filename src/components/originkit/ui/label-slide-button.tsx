"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

interface LabelSlideButtonProps {
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  hoverIcon?: React.ReactNode;
  className?: string;
}

export default function LabelSlideButton({
  text = "Repository",
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  onClick,
  icon = <FiGithub size={15} />,
  hoverIcon = <FiArrowUpRight size={15} />,
  className = "",
}: LabelSlideButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10 rounded-full overflow-hidden text-xs font-mono font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-all duration-300 shadow-md group ${className}`}
    >
      {/* Icon Badge Container */}
      <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 overflow-hidden shrink-0">
        {/* Default Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={
            isHovered
              ? { x: 16, y: -16, opacity: 0 }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>

        {/* Hover Icon (slides in from bottom-left) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={
            isHovered
              ? { x: 0, y: 0, opacity: 1 }
              : { x: -16, y: 16, opacity: 0 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {hoverIcon}
        </motion.div>
      </div>

      {/* Rolling Label Text */}
      <div className="relative overflow-hidden h-4 flex flex-col justify-start">
        {/* Primary Text (rolls up) */}
        <motion.span
          className="block whitespace-nowrap"
          animate={isHovered ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {text}
        </motion.span>

        {/* Secondary Duplicate Text (rolls up from below) */}
        <motion.span
          className="block whitespace-nowrap text-blue-400 font-bold"
          animate={isHovered ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </div>
    </Component>
  );
}
