"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Activity, Check, ScanLine, Code, Briefcase, FolderGit2, Mail, Download } from "lucide-react";

interface SameerOSBootProps {
  onComplete: () => void;
}

export default function SameerOSBoot({ onComplete }: SameerOSBootProps) {
  const [stage, setStage] = useState<"booting" | "dashboard" | "scanner" | "completed">("booting");
  const [logs, setLogs] = useState<string[]>([]);
  const [isSkipped, setIsSkipped] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanItems, setScanItems] = useState<string[]>([]);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("sameer_os_visited");
    if (hasVisited === "true") {
      setIsSkipped(true);
      onComplete();
      return;
    }

    const bootSequence = [
      { text: "Booting SameerOS v1.0...", delay: 200 },
      { text: "Loading Skills... [ OK ]", delay: 500 },
      { text: "Loading Projects... [ OK ]", delay: 800 },
      { text: "Loading Experience... [ OK ]", delay: 1100 },
      { text: "Access Granted.", delay: 1400 },
    ];

    const timers: NodeJS.Timeout[] = [];

    bootSequence.forEach((item) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
      }, item.delay);
      timers.push(t);
    });

    // Go to dashboard stage
    timers.push(setTimeout(() => setStage("dashboard"), 1800));

    // Go to scanner stage
    timers.push(setTimeout(() => setStage("scanner"), 3600));

    // Scanner items appear sequentially
    const scannerItems = [
      "Role detected: Software Engineer",
      "Skills: Java • Python • React • TypeScript",
      "Project: Helpful-Hearts-AI (Full Stack)",
      "Internship: AXCENTRA — Java Developer",
      "Certs: NPTEL • Infosys • Google",
    ];
    scannerItems.forEach((item, idx) => {
      timers.push(setTimeout(() => {
        setScanItems((prev) => [...prev, item]);
        setScanProgress((idx + 1) / scannerItems.length * 100);
      }, 3900 + idx * 400));
    });

    // Complete transition
    timers.push(setTimeout(() => {
      sessionStorage.setItem("sameer_os_visited", "true");
      setStage("completed");
      onComplete();
    }, 6200));

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onComplete]);

  if (isSkipped || stage === "completed") return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center font-mono select-none overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <AnimatePresence mode="wait">
        {/* STAGE 1: Terminal Boot */}
        {stage === "booting" && (
          <motion.div
            key="booting"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg px-6 relative z-10"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border border-slate-800 rounded-t-xl text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>SameerOS Terminal</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>
            <div className="bg-slate-950 border-x border-b border-slate-800 p-6 rounded-b-xl min-h-[200px] text-[#38BDF8] flex flex-col justify-start gap-2 text-sm md:text-base leading-relaxed relative">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(18,24,38,0)_50%,rgba(3,7,18,0.2)_100%)] opacity-80" />
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-500">{">"}</span>
                  <span className={log.includes("Access") ? "text-green-400 font-bold" : ""}>
                    {log}
                  </span>
                  {idx === logs.length - 1 && idx < 4 && (
                    <span className="w-2 h-4 bg-[#38BDF8] animate-pulse ml-0.5" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Mission Control Dashboard */}
        {stage === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center px-6 relative z-10"
          >
            <div className="relative p-10 md:p-14 rounded-[2.5rem] bg-slate-950/80 border border-[#38BDF8]/20 shadow-2xl backdrop-blur-md max-w-xl mx-auto overflow-hidden">
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#38BDF8]/40" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#38BDF8]/40" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#38BDF8]/40" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#38BDF8]/40" />

              <div className="relative mx-auto w-20 h-20 rounded-full bg-[#38BDF8]/10 flex items-center justify-center mb-8 border border-[#38BDF8]/30">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-2 rounded-full border border-[#38BDF8]/25 border-dashed"
                />
                <Cpu className="w-9 h-9 text-[#38BDF8] animate-pulse" />
              </div>

              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-wide uppercase mb-6">
                Welcome to SameerOS
              </h2>

              <div className="space-y-4 max-w-xs mx-auto text-left border-y border-slate-800 py-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">MISSION:</span>
                  <span className="text-[#38BDF8] font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Software Engineer
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">SYSTEM STATUS:</span>
                  <span className="text-green-400 font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">SECURITY BYPASS:</span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Granted
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <div className="text-[10px] text-slate-500 tracking-widest uppercase">
                  Initializing Scanner
                </div>
                <div className="w-48 h-1 bg-slate-900 rounded-full mx-auto overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Recruiter Scanner */}
        {stage === "scanner" && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md px-6 relative z-10"
          >
            <div className="relative bg-slate-950/90 border border-[#38BDF8]/20 rounded-3xl p-8 backdrop-blur-md overflow-hidden">
              {/* Animated scan line */}
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent z-20 pointer-events-none"
              />

              <div className="flex items-center gap-3 mb-6">
                <ScanLine className="w-5 h-5 text-[#38BDF8] animate-pulse" />
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                  Profile Scanner
                </h3>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                />
              </div>

              {/* Scan results */}
              <div className="space-y-3 mb-6">
                {scanItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    {idx === 0 && <Briefcase className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />}
                    {idx === 1 && <Code className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />}
                    {idx === 2 && <FolderGit2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />}
                    {idx === 3 && <Briefcase className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                    {idx === 4 && <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    <span className="text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Quick actions bar */}
              {scanItems.length >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 pt-4 border-t border-slate-800"
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-[#38BDF8] font-bold">
                    <Mail className="w-3 h-3" />
                    Contact
                  </div>
                  <div className="w-px h-3 bg-slate-700" />
                  <div className="flex items-center gap-1.5 text-[11px] text-[#38BDF8] font-bold">
                    <Download className="w-3 h-3" />
                    Resume
                  </div>
                  <div className="flex-1" />
                  <div className="text-[10px] text-green-400 font-mono animate-pulse">
                    SCAN COMPLETE
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
