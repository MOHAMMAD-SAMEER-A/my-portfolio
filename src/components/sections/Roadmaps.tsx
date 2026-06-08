"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { Compass, BookOpen, Clock, CheckCircle2 } from "lucide-react";

interface Milestone {
  topic: string;
  status: "completed" | "in-progress" | "planned";
  desc: string;
}

export default function Roadmaps() {
  const milestones: Milestone[] = [
    {
      topic: "Next.js 15 & App Router",
      status: "in-progress",
      desc: "Mastering server-side rendering, layouts, static regeneration, and server actions for high-performance apps.",
    },
    {
      topic: "TypeScript Type Safety",
      status: "in-progress",
      desc: "Implementing rigorous type guards, interfaces, generics, and compiler configurations in large codebases.",
    },
    {
      topic: "Full Stack Development",
      status: "in-progress",
      desc: "Exploring database schemas, API architecture, middleware routing, and secure authentication flows.",
    },
    {
      topic: "Data Structures & Algorithms (DSA)",
      status: "in-progress",
      desc: "Practicing algorithm optimization, arrays, strings, stack/queue operations, and runtime complexity parsing.",
    },
    {
      topic: "Software Engineering Practices",
      status: "planned",
      desc: "Planning test-driven development (TDD), automation scripts, git branch protocols, and architectural patterns.",
    }
  ];

  return (
    <SectionWrapper id="current-learning">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3 h-3" /> Current Learning
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            My Learning Roadmap
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            A strategic roadmap outlining the technologies, architectures, and paradigms I am actively studying.
          </p>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded mt-4" />
        </div>

        {/* Roadmap milestones grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {milestones.map((milestone, idx) => (
            <InteractiveCard
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group hover:border-primary/25 dark:hover:border-secondary/25 transition-colors"
            >
              
              {/* Badge for status */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {milestone.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  ) : milestone.status === "in-progress" ? (
                    <div className="relative flex h-5 w-5 shrink-0 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/30 dark:bg-secondary/30 opacity-75"></span>
                      <Clock className="relative inline-flex w-5 h-5 text-primary dark:text-secondary" />
                    </div>
                  ) : (
                    <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-display font-bold text-base md:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    {milestone.topic}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-normal">
                    {milestone.desc}
                  </p>
                </div>
              </div>

              {/* Status Label */}
              <div>
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 w-fit block text-center ${
                    milestone.status === "completed"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : milestone.status === "in-progress"
                      ? "bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {milestone.status === "in-progress" ? "In Progress" : milestone.status === "completed" ? "Done" : "Planned"}
                </span>
              </div>

            </InteractiveCard>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
