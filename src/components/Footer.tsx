"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-bordercolor-light dark:border-bordercolor-dark bg-white dark:bg-darkbg py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo / Brand Name */}
        <button
          onClick={handleScrollToTop}
          className="font-display font-extrabold text-lg tracking-tight text-primary dark:text-secondary hover:opacity-90 transition-opacity"
        >
          Sameer<span className="text-slate-800 dark:text-white">.A</span>
        </button>

        {/* Copy Message */}
        <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <span>&copy; {new Date().getFullYear()} Mohammad Sameer A. All rights reserved.</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <button
            onClick={() => document.getElementById("dev-mode-trigger")?.click()}
            className="text-xs text-primary dark:text-secondary opacity-70 hover:opacity-100 hover:underline transition-opacity flex items-center gap-1"
          >
            <span>[Dev Mode]</span>
          </button>
        </div>

        {/* Mini Social Icons */}
        <div className="flex items-center space-x-5">
          <a
            href="https://github.com/MOHAMMAD-SAMEER-A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammad-sameer-a-653b30379/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:amdsameer92it@gmail.com"
            className="text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
