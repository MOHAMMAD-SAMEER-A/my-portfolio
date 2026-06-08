"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { motion } from "framer-motion";
import { FolderGit2, Award, Briefcase, Github, ExternalLink, BarChart3 } from "lucide-react";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  {
    label: "Projects Built",
    value: 1,
    icon: <FolderGit2 className="w-6 h-6" />,
    desc: "Helpful-Hearts-AI",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    label: "Certifications",
    value: 3,
    icon: <Award className="w-6 h-6" />,
    desc: "NPTEL • Infosys • Google",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    label: "Internship Experience",
    value: 1,
    icon: <Briefcase className="w-6 h-6" />,
    desc: "AXCENTRA — Java Developer",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "GitHub Repositories",
    value: null,
    icon: <Github className="w-6 h-6" />,
    desc: "View All Repos",
    color: "text-[#38BDF8]",
    bg: "bg-[#38BDF8]/10",
    border: "border-[#38BDF8]/20",
    link: "https://github.com/MOHAMMAD-SAMEER-A?tab=repositories",
  },
];

export default function DeveloperStats() {
  return (
    <SectionWrapper id="developer-stats">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3 h-3" /> Developer Stats
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            By The Numbers
          </h2>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <InteractiveCard className={`glass-panel p-6 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:shadow-md transition-all relative overflow-hidden group h-full flex flex-col justify-between`}>
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl w-fit mb-5`}>
                    {stat.icon}
                  </div>

                  {stat.value !== null ? (
                    <div className="text-4xl font-extrabold font-display mb-1 text-slate-800 dark:text-white">
                      <AnimatedCounter end={stat.value} />
                    </div>
                  ) : (
                    <a
                      href={stat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-sm font-bold ${stat.color} hover:underline mb-1`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Repos
                    </a>
                  )}

                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>

                <div className="text-xs text-slate-400 dark:text-slate-500 mt-3 pt-3 border-t border-bordercolor-light dark:border-bordercolor-dark">
                  {stat.desc}
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
