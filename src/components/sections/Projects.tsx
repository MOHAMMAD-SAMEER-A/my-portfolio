"use client";

import React, { useRef, useCallback } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { FolderGit2, Github, ExternalLink, ShieldCheck, Database, Layout, Sparkles } from "lucide-react";

export default function Projects() {
  const cardRef = useRef<HTMLDivElement>(null);

  const techStack = [
    "React",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PLpgSQL",
    "shadcn/ui",
  ];

  const highlights = [
    {
      title: "Responsive Interface",
      desc: "Component-driven layout leveraging Tailwind CSS and shadcn/ui for multi-device compatibility.",
      icon: <Layout className="w-5 h-5 text-primary dark:text-secondary" />
    },
    {
      title: "Real-time Supabase Backend",
      desc: "Robust integration with secure relational database schemas and automated data updates.",
      icon: <Database className="w-5 h-5 text-primary dark:text-secondary" />
    },
    {
      title: "Type Safety & Linters",
      desc: "Enforced strict compilation filters using TypeScript and ESLint to minimize runtime bugs.",
      icon: <ShieldCheck className="w-5 h-5 text-primary dark:text-secondary" />
    }
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight position
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);

    // Tilt effect (subtle)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3 h-3" /> Projects
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            A demonstration of technical proficiency, architecture planning, and clean implementation practices.
          </p>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded mt-4" />
        </div>

        {/* Feature Project Card - Premium layout with spotlight + tilt */}
        <InteractiveCard
          as="div"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="spotlight-card glass-panel rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-lg overflow-hidden relative group transition-transform duration-200 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Decorative background glow inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Project Details Panel (Left Column) */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between relative z-10">
              <div>
                
                {/* Featured Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary text-xs font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Project
                </div>

                {/* Project Title */}
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-white mb-4">
                  Helpful-Hearts-AI
                </h3>

                {/* Project Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base mb-8">
                  Smart Community Help Hub designed to connect people and facilitate peer-to-peer assistance through a modern, real-time digital platform. Built independently to learn and apply industry-standard full-stack web technologies outside the academic curriculum.
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://github.com/MOHAMMAD-SAMEER-A/Helpful-Hearts-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 rounded-xl font-semibold shadow-md text-sm transition-all"
                >
                  <Github className="h-4 w-4" />
                  View GitHub Source
                </a>
                <a
                  href="https://github.com/MOHAMMAD-SAMEER-A/Helpful-Hearts-AI#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn flex items-center gap-2 px-6 py-3 border border-bordercolor-light dark:border-bordercolor-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-semibold text-sm transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Project Details
                </a>
              </div>

            </div>

            {/* Architecture Highlights Panel (Right Column) */}
            <div className="lg:col-span-5 bg-slate-50/50 dark:bg-slate-900/40 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-bordercolor-light dark:border-bordercolor-dark flex flex-col justify-center relative z-10">
              
              <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-6">
                Technical Highlights
              </h4>

              <div className="space-y-6">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="p-3 bg-white dark:bg-slate-900 border border-bordercolor-light dark:border-bordercolor-dark rounded-2xl shrink-0 shadow-sm h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-1">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PLpgSQL Code Snippet Representation */}
              <div className="mt-8 p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                <div className="flex justify-between items-center text-slate-400 dark:text-slate-500 mb-2 font-sans font-bold text-[9px] uppercase tracking-wider">
                  <span>Supabase Schema Functions</span>
                  <span className="text-green-500">PL/pgSQL</span>
                </div>
                <p className="text-primary dark:text-secondary">CREATE OR REPLACE FUNCTION</p>
                <p>  get_community_help_requests()</p>
                <p>  RETURNS SETOF requests AS $$</p>
                <p>  BEGIN</p>
                <p>    RETURN QUERY SELECT * FROM requests ORDER BY created_at DESC;</p>
                <p>  END; $$ LANGUAGE plpgsql SECURITY DEFINER;</p>
              </div>

            </div>

          </div>

        </InteractiveCard>

      </div>
    </SectionWrapper>
  );
}

