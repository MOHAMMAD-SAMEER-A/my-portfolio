"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CODE_CHARS = "{}[]();:=<>+-*/&|!?.#@$%^~01";
const NAME = "MOHAMMAD SAMEER A";

export default function CodeRainName() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const fontSize = Math.max(12, Math.min(16, W / 30));
    const cols = Math.floor(W / (fontSize * 0.7));
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -50);
    const speeds: number[] = Array(cols).fill(0).map(() => 0.5 + Math.random() * 1.5);

    let frame = 0;
    const RAIN_FRAMES = 120; // ~2 seconds at 60fps
    const FADE_FRAMES = 60;

    const draw = () => {
      frame++;

      if (frame < RAIN_FRAMES) {
        // Rain phase
        ctx.fillStyle = "rgba(3, 7, 18, 0.12)";
        ctx.fillRect(0, 0, W, H);
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < cols; i++) {
          const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          const x = i * (fontSize * 0.7);
          const y = drops[i] * fontSize;

          // Gradient color from primary to secondary
          const brightness = Math.random();
          if (brightness > 0.95) {
            ctx.fillStyle = "#ffffff";
          } else if (brightness > 0.7) {
            ctx.fillStyle = "#38BDF8";
          } else {
            ctx.fillStyle = `rgba(56, 189, 248, ${0.3 + Math.random() * 0.4})`;
          }

          ctx.fillText(char, x, y);
          drops[i] += speeds[i];

          if (drops[i] * fontSize > H && Math.random() > 0.97) {
            drops[i] = Math.random() * -10;
          }
        }
      } else if (frame === RAIN_FRAMES) {
        // Reveal name
        setRevealed(true);
        ctx.clearRect(0, 0, W, H);
      } else if (frame < RAIN_FRAMES + FADE_FRAMES) {
        // Fade canvas to transparent
        const alpha = 1 - (frame - RAIN_FRAMES) / FADE_FRAMES;
        ctx.globalAlpha = alpha;
      } else {
        ctx.clearRect(0, 0, W, H);
        cancelAnimationFrame(animFrameRef.current);
        return;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#030712]">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="relative h-[200px] md:h-[250px] flex items-center justify-center">
          {/* Canvas for code rain */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Name reveal */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 text-center"
            >
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#7DD3FC] select-none">
                {NAME}
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-slate-500 text-sm md:text-base mt-3 font-mono tracking-wide"
              >
                {"<"} Software Engineer {"/>"}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
