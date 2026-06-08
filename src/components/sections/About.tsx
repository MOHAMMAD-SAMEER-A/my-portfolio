"use client";

import React, { useEffect, useState, useRef } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { User, Award, GraduationCap, Briefcase } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";

// CountUp component to animate stats
function CountUp({ end, duration = 2000, suffix = "", decimals = 0 }: { end: number; duration?: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
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
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const val = progress * end;
      setCount(val);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3 h-3" /> About Me
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Professional Profile & Passion
          </h2>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded" />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Biography Card */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-display font-bold text-2xl mb-5 text-slate-800 dark:text-white">
              Who is Mohammad Sameer A?
            </h3>
            <div className="space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              <p>
                I am a dedicated <strong>Information Technology</strong> student currently pursuing my Bachelor of Technology (B.Tech) degree at <strong>V.S.B. Engineering College</strong>. My journey into software development is driven by a passion for solving real-world challenges through clean, high-performance code and practical engineering design.
              </p>
              <p>
                Having worked as a <strong>Software Engineer Intern at YugaYatra Retail</strong> and a <strong>Java Developer Intern at AXCENTRA</strong>, I have solidified my frontend and backend engineering foundations, object-oriented concepts, and project structure methodologies. Outside my academic coursework, I actively explore full-stack development, database schema optimization, and AI tool integration.
              </p>
              <p>
                I possess a strong growth mindset and believe that consistency compounds into excellence. My coding philosophy revolves around building scalable, type-safe, and highly accessible user interfaces, continuously writing tests, and documenting software behaviors to ensure maintainable software lifecycles.
              </p>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Stat 1: CGPA */}
            <InteractiveCard className="glass-panel p-6 rounded-3xl border flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-primary/30 dark:hover:border-secondary/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-2xl w-fit mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold font-display mb-1 text-slate-800 dark:text-white">
                  <CountUp end={8.19} decimals={2} />
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  B.Tech CGPA
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  1st Semester Progress
                </div>
              </div>
            </InteractiveCard>

            {/* Stat 2: Internship */}
            <InteractiveCard className="glass-panel p-6 rounded-3xl border flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-primary/30 dark:hover:border-secondary/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-2xl w-fit mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold font-display mb-1 text-slate-800 dark:text-white">
                  <CountUp end={2} />
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Internships Completed
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  YugaYatra Retail & AXCENTRA
                </div>
              </div>
            </InteractiveCard>

            {/* Stat 3: Certifications */}
            <InteractiveCard className="glass-panel p-6 rounded-3xl border flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-primary/30 dark:hover:border-secondary/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-2xl w-fit mb-5">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold font-display mb-1 text-slate-800 dark:text-white">
                  <CountUp end={3} />
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Technical Certs
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  NPTEL, Google & Infosys
                </div>
              </div>
            </InteractiveCard>

            {/* Stat 4: Graduation */}
            <InteractiveCard className="glass-panel p-6 rounded-3xl border flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-primary/30 dark:hover:border-secondary/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-2xl w-fit mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold font-display mb-1 text-slate-800 dark:text-white">
                  2029
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Graduation Year
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  B.Tech IT program
                </div>
              </div>
            </InteractiveCard>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
