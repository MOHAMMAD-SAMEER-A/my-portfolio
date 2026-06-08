"use client";

import React, { useRef, useState, useEffect } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the line height to 100%
          setLineHeight(100);
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      role: "Software Engineer Intern",
      company: "YugaYatra Retail (OPC) Private Ltd",
      date: "June 2026 – Present",
      location: "Remote / Bengaluru, India",
      points: [
        "Engaging in full-cycle Software Development to design and build modular, responsive web applications leveraging Cursor AI and Firebase Studio.",
        "Executing robust Frontend Development UI adjustments using Canva assets and driving Team Collaboration via Google Workspace systems.",
        "Managing continuous application improvement by implementing thorough local Testing protocols and system Debugging.",
        "Strengthening technical Problem Solving, agile task ownership, and live e-commerce portal workflow operations."
      ],
      skills: [
        "Software Development",
        "Cursor AI",
        "Firebase Studio",
        "Frontend Development",
        "Testing & Debugging",
        "Team Collaboration",
        "Problem Solving"
      ]
    },
    {
      role: "Java Developer Intern",
      company: "AXCENTRA",
      date: "April 2026 – May 2026",
      location: "Remote / Kolkata, India",
      points: [
        "Mastered core Java syntax and fundamental structural components under robust Object Oriented Programming (OOP) guidelines.",
        "Handled comprehensive backend Debugging and structured unit Testing parameters for multiple foundational standalone programs.",
        "Engineered localized data persistence logic utilizing relational principles for optimal Database Management across multi-class records applications.",
        "Gained initial production exposure into standard software modularity, clean code documentation, and active repository management via Git."
      ],
      skills: [
        "Java",
        "OOP",
        "Database Management",
        "Debugging",
        "Git",
        "Testing & Documentation"
      ]
    }
  ];

  return (
    <SectionWrapper id="experience" className="bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3 h-3" /> Experience
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Professional Experience
          </h2>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded" />
        </div>

        {/* Timeline Layout */}
        <div
          ref={timelineRef}
          className="max-w-4xl mx-auto relative pl-6 ml-4 md:ml-auto"
        >
          {/* Static border line (background) */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800" />
          
          {/* Animated gradient line overlay */}
          <div
            className="timeline-line-animated"
            style={{
              height: `${lineHeight}%`,
              transition: "height 1.5s ease-out",
            }}
          />
          
          {/* Render experiences array */}
          <div className="space-y-12">
            {experiences.map((exp, expIdx) => (
              <div key={expIdx} className="relative">
                
                {/* Timeline Bullet */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                  className="absolute -left-[35px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 border-4 border-white dark:border-darkbg text-primary dark:bg-secondary/10 dark:text-secondary ring-2 ring-primary/20 dark:ring-secondary/20 z-10"
                >
                  <Briefcase className="h-3 w-3" />
                </motion.span>
                
                {/* Experience Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <InteractiveCard className="glass-panel p-6 md:p-8 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:shadow-md transition-shadow relative">
                  
                  {/* Header Details */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white">
                        {exp.role}
                      </h3>
                      <div className="text-primary dark:text-secondary font-semibold text-sm mt-1">
                        {exp.company}
                      </div>
                    </div>
                    
                    {/* Meta details */}
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.date}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Work bullet points */}
                  <ul className="space-y-4 mb-8 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                    {exp.points.map((pt, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary dark:text-secondary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies tag group */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Skills & Competencies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((tag, tIdx) => (
                        <motion.span
                          key={tIdx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + tIdx * 0.05 }}
                          className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/40 hover:border-primary/20 dark:hover:border-secondary/20 transition-colors"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  </InteractiveCard>
                </motion.div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
