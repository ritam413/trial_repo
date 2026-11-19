"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Global singleton reference for programmatic access
let globalLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenis;
}

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

/**
 * 60 FPS GSAP-synchronized smooth scroll to any selector, element, or pixel offset
 */
export function lenisScrollTo(
  target: string | HTMLElement | number,
  options: ScrollToOptions = {}
) {
  if (typeof window === "undefined") return;

  const { offset = 0, duration = 1.2, immediate = false, lock = false, onComplete } = options;

  // If scrolling back to top (#hero), notify HeroSection to replay opening cycle
  if (target === "#hero" || target === 0) {
    window.dispatchEvent(new CustomEvent("hero:restart-loop", { detail: { resetIntro: true } }));
  }

  if (globalLenis) {
    globalLenis.scrollTo(target, {
      offset,
      duration,
      immediate,
      lock,
      onComplete,
    });
  } else {
    // Fallback if Lenis hasn't mounted
    let targetY = 0;
    if (typeof target === "number") {
      targetY = target;
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        const rect = (el as HTMLElement).getBoundingClientRect();
        targetY = window.scrollY + rect.top + offset;
      }
    }
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: immediate ? "auto" : "smooth",
    });
    if (onComplete) {
      setTimeout(onComplete, (duration || 1) * 1000);
    }
  }
}

const LenisContext = createContext<Lenis | null>(null);

export function useLenisContext() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis 60fps Inertia Engine
    const lenis = new Lenis({
      duration: 1.2, // Smooth duration in seconds for catch-up lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential 60fps deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // 1. Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    // Every frame Lenis moves the viewport, ScrollTrigger recalculates its markers & tweens
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Add Lenis's requestAnimationFrame (raf) directly to GSAP's 60fps ticker
    // This locks Lenis to GSAP's master clock, eliminating frame desync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // 3. Disable lag smoothing in GSAP to prevent latency spikes during high-velocity scrolls
    gsap.ticker.lagSmoothing(0);

    // 4. Force initial ScrollTrigger refresh after setup
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
