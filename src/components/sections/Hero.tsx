"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import InteractiveCard from "@/components/InteractiveCard";
import { OrbitRings, FloatingTechBadges } from "@/components/AnimatedBackground";

const VoiceIntro = dynamic(() => import("@/components/VoiceIntro"), { ssr: false });

const ROLES = ["Java Developer", "Python Programmer", "React Developer", "Software Engineer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeRole = ROLES[roleIndex];

    if (!isDeleting && currentText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      setTypingSpeed(100);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? activeRole.substring(0, prev.length - 1)
            : activeRole.substring(0, prev.length + 1)
        );
        setTypingSpeed(isDeleting ? 50 : 120);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background Radial Glow Spheres */}
      <div className="glow-effect w-[400px] h-[400px] bg-primary/20 top-1/4 left-1/10 animate-glow" />
      <div className="glow-effect w-[500px] h-[500px] bg-secondary/15 bottom-1/4 right-1/10 animate-glow" style={{ animationDelay: "-3s" }} />

      {/* Orbit Rings (behind content) */}
      <OrbitRings />

      {/* Floating Technology Badges */}
      <FloatingTechBadges />

      {/* Section transition at bottom */}
      <div className="section-transition-bottom" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-green-500/25 bg-green-500/5 text-green-600 dark:text-green-400 text-xs font-semibold tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for Internships & Collaborations
          </motion.div>

          {/* Name Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none mb-4"
          >
            Mohammad Sameer A
          </motion.h1>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-semibold text-primary dark:text-secondary mb-6 font-display"
          >
            Software Developer | B.Tech IT Student | Future Full Stack Engineer
          </motion.h2>

          {/* Typing Roles Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-10 text-xl md:text-2xl font-bold font-display text-slate-700 dark:text-slate-200 mb-6 flex items-center"
          >
            <span>I am a&nbsp;</span>
            <span className="text-primary dark:text-secondary underline decoration-wavy decoration-primary/30">
              {currentText}
            </span>
            <span className="w-1 h-6 bg-primary dark:bg-secondary ml-1 animate-pulse" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mb-6 leading-relaxed"
          >
            Building practical software solutions through continuous learning, real-world projects, and modern technologies.
          </motion.p>

          {/* Voice Introduction */}
          <VoiceIntro />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="magnetic-btn flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white hover:bg-primary-dark rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all text-sm group"
            >
              View Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="magnetic-btn flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 border border-bordercolor-light dark:border-bordercolor-dark hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-xl font-semibold transition-colors text-sm"
            >
              Contact Me
            </button>
            <a
              href="/resume.pdf"
              download="Mohammad_Sameer_A_Resume.pdf"
              className="magnetic-btn w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 border border-bordercolor-light dark:border-bordercolor-dark bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/80 rounded-xl font-semibold transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center space-x-5"
          >
            <a
              href="https://github.com/MOHAMMAD-SAMEER-A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-sameer-a-653b30379/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:amdsameer92it@gmail.com"
              className="text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
              aria-label="Send Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>

        </div>

        {/* Hero Right Image */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] animate-float"
          >
            {/* Background floating blur */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-primary to-secondary opacity-20 blur-2xl -z-10" />

            {/* Profile Photo Frame */}
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-primary/20 dark:border-secondary/20 shadow-2xl relative">
              <Image
                src="/profile.jpg"
                alt="Mohammad Sameer A Profile Photo"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 350px"
              />
            </div>
            
            {/* Floating elements */}
            <InteractiveCard className="absolute -bottom-4 -left-4 glass-panel px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border">
              <span className="flex h-3.5 w-3.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">B.Tech IT</span>
            </InteractiveCard>

            <InteractiveCard className="absolute -top-4 -right-4 glass-panel px-4.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border">
              <span className="text-base">☕</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Java & React</span>
            </InteractiveCard>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
