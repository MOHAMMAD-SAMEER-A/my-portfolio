"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { Terminal, Github, ExternalLink, Award, Code2 } from "lucide-react";

interface CodingProfile {
  platform: string;
  url: string;
  badge?: string;
  desc: string;
  icon: React.ReactNode;
}

export default function CodingProfiles() {
  const profiles: CodingProfile[] = [
    {
      platform: "GitHub",
      url: "https://github.com/MOHAMMAD-SAMEER-A",
      desc: "Source code repository host where I publish my full-stack projects, core scripts, and capstones.",
      icon: <Github className="w-6 h-6 text-slate-800 dark:text-white" />
    },
    {
      platform: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/profile/amdsa",
      desc: "Algorithm problem-solving platform where I practice programming challenges and DSA concepts.",
      icon: <Code2 className="w-6 h-6 text-green-600" />
    },
    {
      platform: "HackerRank",
      url: "https://www.hackerrank.com/profile/amdsameer92it",
      badge: "Bronze Badge in Python",
      desc: "Competitive programming platform where I resolve algorithm, scripting, and syntax challenges.",
      icon: <Terminal className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <SectionWrapper id="coding-profiles" className="bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code2 className="w-3 h-3" /> Coding Profiles
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Programming Practice
          </h2>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded" />
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, idx) => (
            <InteractiveCard
              as="a"
              key={idx}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-8 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:shadow-md hover:border-primary/20 dark:hover:border-secondary/20 transition-all relative overflow-hidden group flex flex-col justify-between cursor-pointer"
            >
              <div>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                    {profile.icon}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
                </div>

                {/* Platform Name */}
                <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-3">
                  {profile.platform}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {profile.desc}
                </p>

              </div>

              {/* Achievements Badge */}
              {profile.badge ? (
                <div className="mt-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/25 text-xs font-bold w-fit">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{profile.badge}</span>
                </div>
              ) : (
                <div className="mt-4 text-xs font-semibold text-primary dark:text-secondary group-hover:underline flex items-center gap-1">
                  View Public Profile &rarr;
                </div>
              )}

            </InteractiveCard>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
