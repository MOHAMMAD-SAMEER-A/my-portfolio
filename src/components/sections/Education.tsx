"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  duration: string;
  location: string;
  details?: string;
}

export default function Education() {
  const educationList: EducationItem[] = [
    {
      institution: "V.S.B. Engineering College",
      degree: "Bachelor of Technology in Information Technology",
      grade: "8.19 CGPA (1st semester)",
      duration: "August 2025 - May 2029",
      location: "Karur, Tamil Nadu, India",
      details: "Focusing on core computer science subjects, algorithms, data structures, and database systems."
    },
    {
      institution: "The TVS School",
      degree: "Class XII (Standard), Computer Science Group",
      grade: "79.5%",
      duration: "June 2023 - March 2025",
      location: "Madurai, Tamil Nadu, India",
      details: "Curriculum focused on Mathematics, Physics, Chemistry, and Computer Science."
    },
    {
      institution: "Little Diamonds Matriculation High School",
      degree: "Class X (Standard)",
      grade: "85.4%",
      duration: "June 2022 - April 2023",
      location: "Madurai, Tamil Nadu, India",
      details: "General curriculum with high proficiency in Science, Mathematics, and Social Sciences."
    }
  ];

  return (
    <SectionWrapper id="education" className="bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3 h-3" /> Education
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Academic Background
          </h2>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-auto space-y-12">
          {educationList.map((item, idx) => (
            <div key={idx} className="relative">
              
              {/* Timeline Bullet */}
              <span className="absolute -left-[35px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 border-4 border-white dark:border-darkbg text-primary dark:bg-secondary/10 dark:text-secondary ring-2 ring-primary/20 dark:ring-secondary/20">
                <GraduationCap className="h-3.5 w-3.5" />
              </span>

              {/* Education Card */}
              <InteractiveCard className="glass-panel p-6 md:p-8 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:shadow-md transition-shadow">
                
                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                </div>

                {/* College & Degree Info */}
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-800 dark:text-white">
                  {item.institution}
                </h3>
                <div className="text-slate-600 dark:text-slate-300 font-semibold text-sm mt-1">
                  {item.degree}
                </div>

                {/* Grade Badge */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Performance:
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary text-xs font-bold">
                    {item.grade}
                  </span>
                </div>

                {/* Brief details description */}
                {item.details && (
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-bordercolor-light dark:border-bordercolor-dark pt-4">
                    {item.details}
                  </p>
                )}

              </InteractiveCard>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
