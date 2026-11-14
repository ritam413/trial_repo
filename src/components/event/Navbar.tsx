"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

/* ==========================================================================
   SMOOTH SCROLL CONFIGURATION
   >>> THIS SECTION CONTROLS THE SPEED OF SMOOTH SCROLL! <<<
   - duration: Time in seconds to complete the smooth scroll
     (e.g., 0.85 = snappy & responsive, 1.4 = slower cinematic glide)
   - ease: GSAP easing curve for deceleration
   - offset: Pixel clearance offset from the top
   ========================================================================== */
export const SMOOTH_SCROLL_CONFIG = {
  duration: 0.85, // <-- EXACT SPEED CONTROLLER (IN SECONDS)
  ease: "power2.out", // Snappy, responsive deceleration curve
  offset: -40, // Top navigation bar clearance
};

/**
 * Smoothly scrolls the window to a given anchor or element using GSAP
 * Speed is governed by SMOOTH_SCROLL_CONFIG.duration
 */
export function gsapScrollTo(
  target: string | HTMLElement | number,
  duration = SMOOTH_SCROLL_CONFIG.duration,
  offset = SMOOTH_SCROLL_CONFIG.offset
) {
  if (typeof window === "undefined") return;

  let targetY = 0;
  if (typeof target === "number") {
    targetY = target;
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    targetY = window.scrollY + rect.top + offset;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetY = Math.max(0, Math.min(targetY, maxScroll));

  // If scrolling back to top (#hero), notify HeroSection to replay opening cycle
  if (target === "#hero" || targetY <= 20) {
    window.dispatchEvent(new CustomEvent("hero:restart-loop", { detail: { resetIntro: true } }));
  }

  const scrollObj = { y: window.scrollY };
  gsap.killTweensOf(scrollObj);
  gsap.to(scrollObj, {
    y: targetY,
    duration,
    ease: SMOOTH_SCROLL_CONFIG.ease,
    onUpdate: () => {
      window.scrollTo(0, scrollObj.y);
    },
  });
}

export default function Navbar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number;

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      const scrolled = scrollY > 24;
      setHasScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    // Continuous 120 FPS hardware-accelerated ticker
    // Updates continuously on every single scroll tick without waiting for sections!
    const tick = () => {
      // Fluid physical interpolation for real-time tracking
      currentProgress += (targetProgress - currentProgress) * 0.4;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      if (progressBarRef.current) {
        // Hardware accelerated GPU scaleX transform: zero layout reflows, instant response
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${Math.round(currentProgress * 100)}%`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics, { passive: true });

    // Initial sync
    updateScrollMetrics();
    currentProgress = targetProgress;
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { label: "DUALITY", target: "#about" },
    { label: "GALLERY", target: "#gallery" },
    { label: "ARCHITECTS", target: "#core-members" },
    { label: "PATRONS", target: "#dignitaries" },
    { label: "FOUNDERS", target: "#founders" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    gsapScrollTo(target, SMOOTH_SCROLL_CONFIG.duration, SMOOTH_SCROLL_CONFIG.offset);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        hasScrolled
          ? "bg-[#120E15]/90 backdrop-blur-xl border-b border-[#FFF4E0]/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
          : "bg-gradient-to-b from-[#120E15]/80 via-[#120E15]/40 to-transparent backdrop-blur-sm border-b border-[#FFF4E0]/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#1C1622] border border-[#FFAA24]/60 flex items-center justify-center text-base sm:text-lg text-[#FFAA24] shadow-[0_0_16px_rgba(255,170,36,0.25)] shrink-0 group-hover:border-[#FFAA24] group-hover:scale-105 transition-transform duration-200">
            ♠
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider text-[#FFF4E0] group-hover:text-[#FFAA24] transition-colors uppercase leading-none truncate">
                SANSKARAN
              </span>
              <span className="hidden sm:inline-flex font-tech text-[10px] font-bold tracking-widest text-[#FFAA24] px-1.5 py-0.5 rounded bg-[#FFAA24]/10 border border-[#FFAA24]/30 shrink-0">
                2026
              </span>
            </div>
            <span className="font-tech text-[8.5px] sm:text-[10px] text-[#FFF4E0]/50 tracking-[0.16em] sm:tracking-[0.22em] uppercase truncate">
              <span className="sm:hidden text-[#FFAA24]/90 font-bold mr-1">’26 •</span>
              DECK OF DESTINIES
            </span>
          </div>
        </a>

        {/* Center Navigation Links with GSAP Smooth Scrolling */}
        <nav className="hidden md:flex items-center gap-8 font-tech text-xs font-semibold tracking-[0.2em] text-[#FFF4E0]/70 uppercase">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="hover:text-[#FFAA24] transition-colors relative py-1 group/link cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFAA24] group-hover/link:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Live Scroll Progress Metric */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span
            ref={percentTextRef}
            className="font-mono text-[10px] font-bold text-[#FFAA24] px-2 py-0.5 rounded-full bg-[#1C1622] border border-[#FFAA24]/30 hidden sm:inline-block tabular-nums shadow-[0_0_10px_rgba(255,170,36,0.15)]"
          >
            0%
          </span>

          <button
            type="button"
            onClick={() => gsapScrollTo("#about", SMOOTH_SCROLL_CONFIG.duration, SMOOTH_SCROLL_CONFIG.offset)}
            className="group/btn inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-11 px-3 sm:px-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B1E24] to-[#E65C19] hover:brightness-110 text-[#FFF4E0] font-tech text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#FFAA24]/60 shadow-[0_0_20px_rgba(230,92,25,0.35)] active:scale-[0.97] transition-all duration-150 cursor-pointer whitespace-nowrap"
          >
            <span className="sm:hidden">Explore</span>
            <span className="hidden sm:inline">Explore Deck</span>
            <span className="text-[#FFAA24] text-xs sm:text-sm leading-none transition-transform duration-200 group-hover/btn:translate-y-0.5">↓</span>
          </button>
        </div>
      </div>

      {/* Real-Time Glowing GPU-Accelerated Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FFF4E0]/10 overflow-hidden pointer-events-none">
        <div
          ref={progressBarRef}
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          className="h-full w-full bg-gradient-to-r from-[#8B1E24] via-[#E65C19] to-[#FFAA24] shadow-[0_0_12px_rgba(255,170,36,0.9)] will-change-transform relative"
        >
          {/* Leading Photon Dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFF4E0] shadow-[0_0_8px_#FFAA24]" />
        </div>
      </div>
    </header>
  );
}
