"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

const INTRO_TEXT =
  "Hello, I'm Mohammad Sameer A. A Software Developer, B.Tech IT Student, and Future Full Stack Engineer. I build practical software solutions through continuous learning, real-world projects, and modern technologies.";

type SpeechState = "idle" | "speaking" | "paused";

const WAVE_DURATIONS = [1.1, 0.9, 1.3, 0.8, 1.2, 1.0, 1.4, 0.9, 1.1, 1.3, 0.8, 1.2];
const WAVE_SCALES = [0.4, 0.6, 0.5, 0.7, 0.3, 0.5, 0.6, 0.4, 0.5, 0.7, 0.3, 0.5];

export default function VoiceIntro() {
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);



  const getMaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    // Priority order for male voices
    const maleNames = [
      "Google UK English Male",
      "Microsoft David",
      "Google US English",
      "Daniel",
      "Alex",
      "Fred",
      "Thomas",
    ];

    for (const name of maleNames) {
      const found = voices.find((v) => v.name.includes(name));
      if (found) return found;
    }

    // Fallback: find any English male voice
    const englishVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("male") ||
          v.name.includes("David") ||
          v.name.includes("James") ||
          v.name.includes("Mark"))
    );
    if (englishVoice) return englishVoice;

    // Final fallback: first English voice
    return voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
  }, []);

  const speak = useCallback(() => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(INTRO_TEXT);
    utterance.rate = 0.9;
    utterance.pitch = 0.95;
    utterance.volume = isMuted ? 0 : 1;

    const voice = getMaleVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => setSpeechState("idle");
    utterance.onerror = () => setSpeechState("idle");

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeechState("speaking");
  }, [isMuted, getMaleVoice]);

  useEffect(() => {
    if (mounted && isSupported && speak) {
      const hasPlayed = sessionStorage.getItem("voice_intro_played") === "true";
      if (!hasPlayed) {
        sessionStorage.setItem("voice_intro_played", "true");
        const playTimer = setTimeout(() => {
          if (window.speechSynthesis) {
            if (window.speechSynthesis.getVoices().length === 0) {
              window.speechSynthesis.onvoiceschanged = () => {
                speak();
              };
            } else {
              speak();
            }
          }
        }, 1500);
        return () => clearTimeout(playTimer);
      }
    }
  }, [mounted, isSupported, speak]);

  const handlePlay = useCallback(() => {
    if (speechState === "idle") {
      // Load voices first (some browsers need this)
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => speak();
      } else {
        speak();
      }
    } else if (speechState === "paused") {
      window.speechSynthesis.resume();
      setSpeechState("speaking");
    }
  }, [speechState, speak]);

  const handlePause = useCallback(() => {
    if (speechState === "speaking") {
      window.speechSynthesis.pause();
      setSpeechState("paused");
    }
  }, [speechState]);

  const handleReplay = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeechState("idle");
    // Small delay to ensure cancel completes
    setTimeout(() => speak(), 100);
  }, [speak]);

  const handleMuteToggle = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (utteranceRef.current) {
        utteranceRef.current.volume = next ? 0 : 1;
      }
      return next;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!mounted || !isSupported) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="mb-8"
    >
      <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-bordercolor-light dark:border-bordercolor-dark shadow-sm">
        {/* Play / Pause */}
        {speechState === "speaking" ? (
          <button
            onClick={handlePause}
            className="p-2 rounded-xl bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary hover:bg-primary/20 dark:hover:bg-secondary/25 transition-colors"
            aria-label="Pause Introduction"
          >
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="p-2 rounded-xl bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary hover:bg-primary/20 dark:hover:bg-secondary/25 transition-colors"
            aria-label="Play Introduction"
          >
            <Play className="w-4 h-4" />
          </button>
        )}

        {/* Waveform Visualizer */}
        <div className="flex items-end gap-[3px] h-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="voice-wave-bar"
              style={{
                height: "16px",
                animationName: speechState === "speaking" ? "waveBar" : "none",
                animationDuration: `${WAVE_DURATIONS[i % WAVE_DURATIONS.length]}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${i * 0.08}s`,
                transform:
                  speechState === "speaking"
                    ? undefined
                    : speechState === "paused"
                    ? `scaleY(${WAVE_SCALES[i % WAVE_SCALES.length]})`
                    : "scaleY(0.2)",
                opacity: speechState === "idle" ? 0.3 : 0.8,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Label */}
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
          {speechState === "idle"
            ? "Play Introduction"
            : speechState === "speaking"
            ? "Speaking..."
            : "Paused"}
        </span>

        {/* Replay */}
        <AnimatePresence>
          {speechState !== "idle" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleReplay}
              className="p-1.5 rounded-lg text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
              aria-label="Replay Introduction"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mute */}
        <button
          onClick={handleMuteToggle}
          className="p-1.5 rounded-lg text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
