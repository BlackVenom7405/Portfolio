import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import LabelSlideButton from "./originkit/ui/label-slide-button";

const projectData = [
  {
    image: "/projects/sentinel_honeypot.jpg",
    title: "Sentinel.X — Honeypot System",
    description: "A web-based honeypot system designed to attract, capture, monitor, and analyse attacker activities in a controlled environment.",
    tags: ["Python", "Flask", "Cybersecurity"],
    link: "https://github.com/BlackVenom7405/honeypot",
    github: "https://github.com/BlackVenom7405/honeypot",
  },
  {
    image: "/projects/metadata_cleaner_analyzer.jpg",
    title: "Metadata Cleaner & Analyzer",
    description: "A privacy-focused tool that analyzes hidden metadata and removes sensitive information from files.",
    tags: ["Python", "Flask", "Metadata", "Privacy"],
    link: "https://github.com/BlackVenom7405/Metadata-Analyzer-and-Cleaner",
    github: "https://github.com/BlackVenom7405/Metadata-Analyzer-and-Cleaner",
  },
  {
    image: "/projects/smart_grievance.jpg",
    title: "Smart Public Grievance System",
    description: "A smart public grievance platform that enables citizens to submit, track, and manage public complaints efficiently.",
    tags: ["JavaScript", "Python", "HTML", "CSS"],
    link: "https://github.com/BlackVenom7405/Public-Grievance-Tracker",
    github: "https://github.com/BlackVenom7405/Public-Grievance-Tracker",
  },
  {
    image: "/projects/metadata_cleaner.jpg",
    title: "Metadata Cleaner",
    description: "A privacy-focused tool that removes hidden metadata from digital files to help protect sensitive information.",
    tags: ["Python", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/BlackVenom7405/metadata-cleaner",
    github: "https://github.com/BlackVenom7405/metadata-cleaner",
  },
  {
    image: "/projects/metadata_analyzer.jpg",
    title: "Metadata Analyzer",
    description: "A metadata analysis tool that extracts and analyzes hidden metadata from files for security and privacy insights.",
    tags: ["Python", "HTML", "CSS", "Security"],
    link: "https://github.com/BlackVenom7405/Metadata-Analyzer",
    github: "https://github.com/BlackVenom7405/Metadata-Analyzer",
  },
  {
    image: "/projects/ai_code_explainer.jpg",
    title: "AI Code Explainer & Analyzer",
    description: "An AI-powered tool that analyzes source code and provides clear explanations, summaries, and insights to help users better understand code.",
    tags: ["Python", "AI", "Machine Learning"],
    link: "https://github.com/BlackVenom7405/AI-Code-Explainer-and-Analyzer",
    github: "https://github.com/BlackVenom7405/AI-Code-Explainer-and-Analyzer",
  },
];

const Portfolio = () => {
  return (
    <section id="projects" className="bg-[#020202] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter"
        >
          Selected Works<span className="text-blue-500">.</span>
        </motion.h2>
        <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
          Explore my security tools, honeypots, metadata analyzers, and AI applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projectData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden aspect-[16/10] rounded-[1.5rem] m-2">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-8 pb-4">
                <h3 className="text-xl font-black text-white mb-3 tracking-tight uppercase leading-snug">{project.title}</h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/10 text-blue-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 pt-0">
              <LabelSlideButton 
                text="Repository"
                href={project.github}
                className="w-full justify-center py-3"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
