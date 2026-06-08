"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  details?: string;
  credentialUrl?: string;
}

export default function Certifications() {
  const certs: CertificationItem[] = [
    {
      title: "Fundamentals of Object Oriented Programming",
      issuer: "NPTEL",
      date: "Jan - Apr 2026 (12 Weeks Course)",
      details: "Comprehensive academic coursework covering OOP principles, Java syntax, memory management, inheritance, and design models.",
    },
    {
      title: "Python Foundation Certification",
      issuer: "Infosys Springboard",
      date: "March 2026",
      details: "Foundational scripting credentials verifying core syntax, control flow structure, functional designs, and pandas/numpy application.",
    },
    {
      title: "Gemini Certified Student",
      issuer: "Google for Education",
      date: "January 2026",
      details: "Certified credentials validating technical integration of LLM architectures, structured outputs, security, and generative AI features.",
    }
  ];

  return (
    <SectionWrapper id="certifications">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3 h-3" /> Certifications
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Technical Certifications
          </h2>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certs.map((cert, idx) => (
            <InteractiveCard
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                
                {/* Certification Icon & Issuer */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-2xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2 leading-snug">
                  {cert.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {cert.date}
                </div>

                {/* Details */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cert.details}
                </p>

              </div>

              {/* Verified Badge */}
              <div className="mt-6 pt-4 border-t border-bordercolor-light dark:border-bordercolor-dark flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1 text-green-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Verified Credential
                </span>
              </div>

            </InteractiveCard>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
