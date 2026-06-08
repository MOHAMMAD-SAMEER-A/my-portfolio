"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Zap, Target, BookOpen, Rocket, Heart } from "lucide-react";

export default function DevModeEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for Ctrl+Shift+D / Cmd+Shift+D shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "D") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Floating Dev Mode Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="dev-mode-trigger"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-[168px] right-6 sm:right-8 z-50 h-12 px-4 flex items-center justify-center gap-2 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-2 border-white/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all group cursor-pointer font-mono"
            aria-label="Open Developer Console"
          >
            <Terminal className="w-4 h-4 group-hover:animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase">Dev Mode</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-lg font-mono"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-t-2xl">
                <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  Developer Mode — sameer@portfolio:~$
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal body */}
              <div className="bg-[#0a0f1a] border-x border-b border-slate-700 rounded-b-2xl p-6 space-y-5 text-sm max-h-[70vh] overflow-y-auto">
                <div className="text-green-400">
                  {">"} Developer mode activated. Welcome, recruiter. 🤝
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#38BDF8] font-bold mb-2">
                    <Target className="w-4 h-4" />
                    Career Goals
                  </div>
                  <ul className="text-slate-300 space-y-1.5 ml-6">
                    <li>• Full Stack Developer at a product-based company by 2029</li>
                    <li>• Build 5+ production-level applications before graduation</li>
                    <li>• Master System Design & DSA for placements</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                    <BookOpen className="w-4 h-4" />
                    Currently Learning
                  </div>
                  <ul className="text-slate-300 space-y-1.5 ml-6">
                    <li>• Next.js 15 & Server Components architecture</li>
                    <li>• Advanced TypeScript patterns & generics</li>
                    <li>• PostgreSQL optimization & Supabase edge functions</li>
                    <li>• Data Structures & Algorithms (daily practice)</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                    <Rocket className="w-4 h-4" />
                    Dream Companies
                  </div>
                  <ul className="text-slate-300 space-y-1.5 ml-6">
                    <li>• Google • Microsoft • Amazon • Atlassian</li>
                    <li>• Any product team building for millions of users</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                    <Heart className="w-4 h-4" />
                    Fun Facts
                  </div>
                  <ul className="text-slate-300 space-y-1.5 ml-6">
                    <li>• Codes best with coffee ☕ and lofi beats 🎧</li>
                    <li>• Believes consistency beats talent every single time</li>
                    <li>• Built this entire portfolio from scratch</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                    <Zap className="w-4 h-4" />
                    OS Info
                  </div>
                  <div className="text-slate-400 ml-6 space-y-1">
                    <div>SameerOS v1.0 • Built with Next.js 15, React 19, Framer Motion</div>
                    <div>Stack: TypeScript • Tailwind CSS • EmailJS • Lucide Icons</div>
                    <div className="text-[#38BDF8] mt-2">
                      shortcut: Ctrl+Shift+D (or ⌘+Shift+D on Mac)
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-slate-500 text-xs">
                  {">"} Type &quot;exit&quot; or press Escape to close.{" "}
                  <span className="w-2 h-3 bg-[#38BDF8] inline-block animate-pulse ml-1" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
