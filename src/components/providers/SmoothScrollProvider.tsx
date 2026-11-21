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

  const { offset = 0, duration = 1.0, immediate = false, onComplete } = options;

  // 1. Detect if target is "Back to Top" (#hero, hero, 0, #top, top)
  const isBackToTop =
    target === "#hero" ||
    target === "hero" ||
    target === 0 ||
    target === "#top" ||
    target === "top";

  if (isBackToTop) {
    window.dispatchEvent(new CustomEvent("hero:restart-loop", { detail: { resetIntro: true } }));
  }

  // 2. Mathematically compute exact absolute target Y position
  let targetY = 0;
  if (isBackToTop) {
    targetY = 0;
  } else if (typeof target === "number") {
    targetY = target;
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const currentScroll =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      targetY = currentScroll + rect.top + offset;
    } else if (target === "#about" || target === "about" || target === "#festival-content") {
      targetY = window.innerHeight + offset;
    }
  }

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  targetY = Math.max(0, Math.min(targetY, maxScroll));

  // If immediate jump requested
  if (immediate) {
    if (globalLenis) {
      globalLenis.scrollTo(targetY, { immediate: true });
    } else {
      window.scrollTo(0, targetY);
    }
    onComplete?.();
    return;
  }

  // 3. Smooth 60 FPS GSAP Tween synchronized with Lenis
  const startY =
    window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const scrollObj = { y: startY };

  gsap.killTweensOf(scrollObj);
  gsap.to(scrollObj, {
    y: targetY,
    duration: duration || 1.0,
    ease: "power2.out",
    onUpdate: () => {
      if (globalLenis) {
        globalLenis.scrollTo(scrollObj.y, { immediate: true });
      } else {
        window.scrollTo(0, scrollObj.y);
      }
    },
    onComplete: () => {
      if (globalLenis) {
        globalLenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
      onComplete?.();
    },
  });
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
    // Initialize Lenis 60fps Inertia Engine with Technosahotsava's ultra-buttery configuration
    const lenis = new Lenis({
      duration: 2.5, // 2.5s cinematic deceleration tail (exact match with technosahotsava.in)
      lerp: 0.03, // Ultra-damped 3% per-frame inertia glide (exact match with technosahotsava.in)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
      autoRaf: false, // Driven explicitly by high-precision RAF loop
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // 1. Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // 2. High-precision 60-120 FPS requestAnimationFrame loop (identical to Technosahotsava)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 3. Disable lag smoothing in GSAP to prevent latency spikes during high-velocity scrolls
    gsap.ticker.lagSmoothing(0);

    // 4. Force initial ScrollTrigger refresh after setup
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
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
