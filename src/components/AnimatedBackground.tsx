"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";

// ─── Particle Constellation Canvas ────────────────────────────────────────────
function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; size: number; opacity: number;
  }>>([]);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 25000), 60);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = () => document.documentElement.classList.contains("dark");

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();
      const particles = particlesRef.current;
      const connectionDistance = 120;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(56, 189, 248, ${p.opacity})`
          : `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = dark
              ? `rgba(56, 189, 248, ${opacity})`
              : `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ─── Cursor-Reactive Glow ─────────────────────────────────────────────────────
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -500, y: -500 });
  const posRef = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.08;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${posRef.current.x}px`;
        glowRef.current.style.top = `${posRef.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow hidden md:block" />;
}

// ─── Orbit Rings ──────────────────────────────────────────────────────────────
function OrbitRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Ring 1 */}
      <div
        className="orbit-ring animate-orbit"
        style={{
          width: "500px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-primary/20 dark:bg-secondary/20" />
      </div>

      {/* Ring 2 */}
      <div
        className="orbit-ring animate-orbit-reverse"
        style={{
          width: "700px",
          height: "700px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="absolute -bottom-1 right-1/4 w-1.5 h-1.5 rounded-full bg-secondary/25 dark:bg-primary/25" />
      </div>

      {/* Ring 3 */}
      <div
        className="orbit-ring animate-orbit-slow"
        style={{
          width: "900px",
          height: "900px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="absolute top-1/4 -right-1 w-1 h-1 rounded-full bg-primary/15 dark:bg-secondary/15" />
      </div>
    </div>
  );
}

// ─── Floating Technology Badges ───────────────────────────────────────────────
function FloatingTechBadges() {
  const badges = [
    { label: "React", top: "15%", left: "8%", delay: "0s" },
    { label: "Java", top: "25%", right: "10%", delay: "1.5s" },
    { label: "TypeScript", bottom: "30%", left: "5%", delay: "3s" },
    { label: "Python", top: "60%", right: "6%", delay: "4.5s" },
    { label: "Next.js", bottom: "15%", right: "15%", delay: "2s" },
    { label: "Node.js", top: "40%", left: "12%", delay: "5.5s" },
  ];

  return (
    <>
      {badges.map((badge, idx) => (
        <div
          key={idx}
          className="floating-tech-badge animate-float-badge hidden lg:block"
          style={{
            top: badge.top,
            left: badge.left,
            right: badge.right,
            bottom: badge.bottom,
            animationDelay: badge.delay,
          }}
        >
          {badge.label}
        </div>
      ))}
    </>
  );
}

// ─── Ambient Gradient Blobs ───────────────────────────────────────────────────
function AmbientBlobs() {
  return (
    <>
      <div
        className="ambient-blob bg-primary/30 dark:bg-secondary/20"
        style={{
          width: "500px",
          height: "500px",
          top: "10%",
          left: "-5%",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        className="ambient-blob bg-secondary/20 dark:bg-primary/15"
        style={{
          width: "400px",
          height: "400px",
          bottom: "20%",
          right: "-5%",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="ambient-blob bg-violet-500/10 dark:bg-violet-400/10"
        style={{
          width: "300px",
          height: "300px",
          top: "50%",
          left: "30%",
          animation: "float 30s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />
    </>
  );
}

// ─── Main AnimatedBackground Component ────────────────────────────────────────
export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <ParticleConstellation />
      <CursorGlow />
      <AmbientBlobs />
    </div>
  );
}

// Export sub-components for use in specific sections
export { OrbitRings, FloatingTechBadges };
