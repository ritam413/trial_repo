"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track window scroll and mouse pointer
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x: nx, y: ny });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  // Ambient floating particle embers on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 45;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? "#FFAA24" : "#E65C19",
    }));

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Reset if off top
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Compute parallax offsets
  const orb1Y = scrollY * 0.18 + pointer.y * 30;
  const orb1X = pointer.x * 25;

  const orb2Y = -scrollY * 0.12 - pointer.y * 25;
  const orb2X = -pointer.x * 35;

  const orb3Y = scrollY * 0.25 + pointer.y * 20;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#120E15]"
    >
      {/* Dynamic Parallax Glow Orb 1 (Solar Flare Amber) */}
      <div
        style={{
          transform: `translate3d(${orb1X}px, ${orb1Y}px, 0)`,
          transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="absolute -top-[10%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#FFAA24]/16 via-[#E65C19]/10 to-transparent blur-[140px]"
      />

      {/* Dynamic Parallax Glow Orb 2 (Crimson Wire) */}
      <div
        style={{
          transform: `translate3d(${orb2X}px, ${orb2Y}px, 0)`,
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="absolute top-[40%] -right-[15%] w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-[#8B1E24]/20 via-[#E65C19]/8 to-transparent blur-[160px]"
      />

      {/* Dynamic Parallax Glow Orb 3 (Deep Obsidian & Golden Ember Horizon) */}
      <div
        style={{
          transform: `translate3d(0, ${orb3Y}px, 0)`,
          transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="absolute -bottom-[20%] left-[10%] w-[900px] h-[700px] rounded-full bg-gradient-to-tr from-[#FFAA24]/12 via-[#8B1E24]/15 to-transparent blur-[180px]"
      />

      {/* Floating Canvas Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* 4-Column Swiss Architectural Vertical Grid Lines */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-4 pointer-events-none">
        <div className="border-l border-[#FFF4E0]/[0.035] h-full" />
        <div className="border-l border-[#FFF4E0]/[0.035] h-full" />
        <div className="border-l border-[#FFF4E0]/[0.035] h-full" />
        <div className="border-x border-[#FFF4E0]/[0.035] h-full" />
      </div>

      {/* Risograph Noise Film Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

