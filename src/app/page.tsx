"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import Skills from "@/components/sections/Skills";
import Roadmaps from "@/components/sections/Roadmaps";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import CodingProfiles from "@/components/sections/CodingProfiles";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingStatusBadge from "@/components/FloatingStatusBadge";
import SameerOSBoot from "@/components/SameerOSBoot";
import JarvisAssistant from "@/components/JarvisAssistant";
import CodeRainName from "@/components/CodeRainName";
import DeveloperStats from "@/components/sections/DeveloperStats";
import FutureVision2029 from "@/components/sections/FutureVision2029";
import ResumeAnalyzer from "@/components/sections/ResumeAnalyzer";
import DevModeEasterEgg from "@/components/DevModeEasterEgg";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasVisited = sessionStorage.getItem("sameer_os_visited") === "true";
    if (hasVisited) {
      setIsBooted(true);
    }
  }, []);

  // Avoid initial server-side hydration flash by rendering black background first
  if (!mounted) {
    return <div className="min-h-screen bg-[#030712]" />;
  }

  return (
    <>
      {/* Developer OS Boot Sequence & Mission Control */}
      {!isBooted && (
        <SameerOSBoot onComplete={() => setIsBooted(true)} />
      )}

      {/* Main Portfolio Content */}
      <AnimatePresence>
        {isBooted && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen overflow-x-hidden bg-white dark:bg-darkbg text-slate-900 dark:text-white transition-colors duration-300"
          >
            
            {/* Premium Animated Background */}
            <AnimatedBackground />

            {/* Scroll Progress Indicator */}
            <ScrollProgress />

            {/* Floating Navigation */}
            <Navbar />

            {/* Main Content Scroll container */}
            <main className="relative">
              
              {/* Sections sequence */}
              <Hero />
              <CodeRainName />
              <About />
              <Philosophy />
              <DeveloperStats />
              <Skills />
              <Roadmaps />
              <Experience />
              <FutureVision2029 />
              <Projects />
              <Education />
              <Certifications />
              <ResumeAnalyzer />
              <CodingProfiles />
              <Contact />

            </main>

            {/* Site Footer */}
            <Footer />

            {/* Floating Helpers */}
            <BackToTop />
            <FloatingStatusBadge />
            <JarvisAssistant />
            <DevModeEasterEgg />

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
