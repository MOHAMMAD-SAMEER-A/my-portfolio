"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Rocket, GraduationCap, Briefcase, Code, Package, Award } from "lucide-react";

const MILESTONES = [
  {
    year: "2025",
    title: "Started Engineering Journey",
    desc: "Began B.Tech in Information Technology at V.S.B. Engineering College with 8.19 CGPA.",
    icon: <GraduationCap className="w-5 h-5" />,
    status: "completed" as const,
  },
  {
    year: "2026",
    title: "Internships & Core Skills",
    desc: "Currently working as an Software Engineer Intern YugaYatra Retail (OPC) Private Ltd (Remote / Bengaluru, India) - June 2026 - Present. Finished Java Developer Intern at Axcentra. (April 2026 - May 2026), Remote - Kolkata, West Bengal, India).",
    icon: <Briefcase className="w-5 h-5" />,
    status: "active" as const,
  },
  {
    year: "2027",
    title: "Full Stack Implementations",
    desc: "Master Next.js, TypeScript, cloud architecture. Build production-grade applications.",
    icon: <Code className="w-5 h-5" />,
    status: "upcoming" as const,
  },
  {
    year: "2028",
    title: "Building Product-Level Projects",
    desc: "Ship real-world products. Contribute to open-source. Build a strong portfolio of live apps.",
    icon: <Package className="w-5 h-5" />,
    status: "upcoming" as const,
  },
  {
    year: "2029",
    title: "Dream Product-Based Placement",
    desc: "Secure a role at a top product-based company. Graduate and launch professional career.",
    icon: <Award className="w-5 h-5" />,
    status: "upcoming" as const,
  },
];

export default function FutureVision2029() {
  return (
    <SectionWrapper id="future-vision" className="bg-[#030712] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/5 text-[#38BDF8] text-xs font-semibold uppercase tracking-wider mb-3">
            <Rocket className="w-3 h-3" /> Future Vision
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Road To 2029
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            A strategic vision mapping my engineering journey from foundation to placement.
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] mx-auto rounded mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-[#2563EB]/20" />

          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    m.status === "completed"
                      ? "bg-green-500/15 border-green-500/40 text-green-400"
                      : m.status === "active"
                      ? "bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#38BDF8]"
                      : "bg-slate-800/50 border-slate-700 text-slate-500"
                  }`}>
                    {m.icon}
                    {m.status === "active" && (
                      <span className="absolute inset-0 rounded-full border-2 border-[#38BDF8]/30 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                  idx % 2 === 0 ? "md:pr-4 md:text-right" : "md:pl-4 md:text-left"
                }`}>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm hover:border-[#38BDF8]/20 transition-colors">
                    <div className={`flex items-center gap-3 mb-2 ${
                      idx % 2 === 0 ? "md:justify-end" : ""
                    }`}>
                      <span className={`font-mono text-sm font-bold ${
                        m.status === "completed" ? "text-green-400"
                        : m.status === "active" ? "text-[#38BDF8]"
                        : "text-slate-500"
                      }`}>
                        {m.year}
                      </span>
                      {m.status === "active" && (
                        <span className="px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-[10px] font-bold uppercase tracking-wider">
                          Current
                        </span>
                      )}
                      {m.status === "completed" && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                          Done
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base md:text-lg text-white mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
