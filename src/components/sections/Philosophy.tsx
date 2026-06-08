"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { MessageSquareQuote } from "lucide-react";

export default function Philosophy() {
  return (
    <SectionWrapper id="philosophy" className="bg-slate-50/50 dark:bg-slate-900/10 py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 text-center relative">
        
        {/* Glow Spheres inside Quote Section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <InteractiveCard className="glass-panel p-8 md:p-14 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-md relative overflow-hidden group">
          
          {/* Quote icon banner */}
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary flex items-center justify-center mb-8">
            <MessageSquareQuote className="w-6 h-6" />
          </div>

          <p className="font-display font-extrabold italic text-xl md:text-2xl lg:text-3xl text-slate-800 dark:text-white leading-relaxed max-w-3xl mx-auto mb-8 relative z-10">
            &ldquo;Consistency compounds into excellence. Every project, every bug fixed, and every lesson learned contributes to becoming a better engineer.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-2 relative z-10">
            <div className="h-0.5 w-6 bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Developer Philosophy
            </span>
            <div className="h-0.5 w-6 bg-slate-300 dark:bg-slate-700" />
          </div>

        </InteractiveCard>

      </div>
    </SectionWrapper>
  );
}
