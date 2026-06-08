"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { Cpu, Code, Database, Terminal, Settings } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

// Single animated progress bar component
function SkillProgressBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(level), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level]);

  return (
    <div className="space-y-2" ref={barRef}>
      <div className="flex justify-between items-center text-sm font-semibold">
        <span className="text-slate-700 dark:text-slate-200">{name}</span>
        <span className="text-slate-400 dark:text-slate-400 text-xs">{level}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code className="w-5 h-5" />,
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "MySQL / SQL", level: 78 },
        { name: "C", level: 75 },
        { name: "HTML / CSS", level: 90 },
      ],
    },
    {
      title: "Frameworks & Web Tech",
      icon: <Cpu className="w-5 h-5" />,
      skills: [
        { name: "React", level: 85 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Node.js", level: 70 },
        { name: "Flask", level: 75 },
        { name: "PLpgSQL", level: 75 },
        { name: "Responsive Design", level: 85 },
      ],
    },
    {
      title: "Libraries",
      icon: <Database className="w-5 h-5" />,
      skills: [
        { name: "Pandas", level: 80 },
        { name: "NumPy", level: 80 },
        { name: "Matplotlib", level: 75 },
      ],
    },
    {
      title: "Tools & Clouds",
      icon: <Settings className="w-5 h-5" />,
      skills: [
        { name: "Git & GitHub", level: 88 },
        { name: "Cursor AI", level: 90 },
        { name: "Firebase Studio", level: 80 },
        { name: "Google Cloud Platform", level: 70 },
        { name: "VS Code", level: 90 },
      ],
    },
  ];

  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Terminal className="w-3 h-3" /> Technical Skills
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Areas of Expertise
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            A comprehensive overview of my programming languages, libraries, frameworks, and developer environments.
          </p>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <InteractiveCard
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-8 border-b border-bordercolor-light dark:border-bordercolor-dark pb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Progress bars */}
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <SkillProgressBar key={sIdx} name={skill.name} level={skill.level} />
                ))}
              </div>
            </InteractiveCard>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
