"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { HERO_SLIDES, HeroSlide } from "@/lib/heroSlideshowData";

/* ==========================================================================
   1. SEQUENCE CHOREOGRAPHY & TIMING CONFIGURATION
   ========================================================================== */
export interface SequenceStep {
  name: string;
  shiftX: number;       // Horizontal displacement delta (%)
  shiftY: number;       // Vertical displacement delta (%)
  zoomDirection: "in" | "out";
  zoomDelta: number;    // Scale delta (e.g. +0.06 or -0.06)
  initialOpacity: number; // Starting fade-in opacity (e.g. 0.10 for 10%, 0.20 for 20%)
}

export const SLIDESHOW_CONFIG = {
  // ⏱️ EXACT TIME PER IMAGE (in milliseconds)
  STEP_DURATION_MS: 1000,      // 👈 1 second per image as requested
  TRANSITION_DURATION_S: 0.95, // 👈 0.95s continuous fluid transition

  // Safe bounds for continuous zoom and shift tracking
  MIN_SCALE: 1.0,
  MAX_SCALE: 1.24,
  MAX_SHIFT_X: 6.0,  // Max horizontal shift clamp (%)
  MAX_SHIFT_Y: 6.0,  // Max vertical shift clamp (%)

  // Cursor Parallax displacement
  PARALLAX_MAX_PX: 20,
};

// 🎬 The exact sequence requested by the user:
// 1-2: right shift + fade in (opacity 10%) + zoom in
// 2-3: right shift + fade in (opacity 20%) + zoom out
// 3-4: down shift + fade in (opacity 10%) + zoom in
// 4-5: down shift + fade in (opacity 20%) + zoom out
// 5-6: left shift + fade in (opacity 10%) + zoom in
// 6-7: left shift + fade in (opacity 20%) + zoom out
// 7-8: up shift + fade in (opacity 10%) + zoom in
// 8-9: up shift + fade in (opacity 20%) + zoom out
export const CHOREOGRAPHY_SEQUENCE: SequenceStep[] = [
  {
    name: "1-2: Right Shift + FadeIn (10%) + Zoom In",
    shiftX: 3.5,
    shiftY: 0,
    zoomDirection: "in",
    zoomDelta: 0.06,
    initialOpacity: 0.10, // 👈 Opacity 10%
  },
  {
    name: "2-3: Right Shift + FadeIn (20%) + Zoom Out",
    shiftX: 3.5,
    shiftY: 0,
    zoomDirection: "out",
    zoomDelta: -0.06,
    initialOpacity: 0.20, // 👈 Opacity 20%
  },
  {
    name: "3-4: Down Shift + FadeIn (10%) + Zoom In",
    shiftX: 0,
    shiftY: 3.5,
    zoomDirection: "in",
    zoomDelta: 0.06,
    initialOpacity: 0.10, // 👈 Opacity 10%
  },
  {
    name: "4-5: Down Shift + FadeIn (20%) + Zoom Out",
    shiftX: 0,
    shiftY: 3.5,
    zoomDirection: "out",
    zoomDelta: -0.06,
    initialOpacity: 0.20, // 👈 Opacity 20%
  },
  {
    name: "5-6: Left Shift + FadeIn (10%) + Zoom In",
    shiftX: -3.5,
    shiftY: 0,
    zoomDirection: "in",
    zoomDelta: 0.06,
    initialOpacity: 0.10, // 👈 Opacity 10%
  },
  {
    name: "6-7: Left Shift + FadeIn (20%) + Zoom Out",
    shiftX: -3.5,
    shiftY: 0,
    zoomDirection: "out",
    zoomDelta: -0.06,
    initialOpacity: 0.20, // 👈 Opacity 20%
  },
  {
    name: "7-8: Up Shift + FadeIn (10%) + Zoom In",
    shiftX: 0,
    shiftY: -3.5,
    zoomDirection: "in",
    zoomDelta: 0.06,
    initialOpacity: 0.10, // 👈 Opacity 10%
  },
  {
    name: "8-9: Up Shift + FadeIn (20%) + Zoom Out",
    shiftX: 0,
    shiftY: -3.5,
    zoomDirection: "out",
    zoomDelta: -0.06,
    initialOpacity: 0.20, // 👈 Opacity 20%
  },
];

/* ==========================================================================
   2. OBSERVER STATE DATA STRUCTURE
   ========================================================================== */
export interface TransformObserver {
  imageIndex: number;
  imageFile: string;
  currentScale: number;
  currentX: number;
  currentY: number;
  activeAction: string;
  stepIndex: number;
}

interface SlideState {
  currentIdx: number;
  nextIdx: number;
}

export default function HeroBackgroundSlideshow({ isVisible = true }: { isVisible?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);

  // Active layer pointer: 0 = Layer A is front, 1 = Layer B is front
  const activeLayerRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 👁️ OBSERVER: Tracks the EXACT live pixel transform and active action
  const observerRef = useRef<TransformObserver>({
    imageIndex: 0,
    imageFile: HERO_SLIDES[0]?.url || "",
    currentScale: 1.0,
    currentX: 0,
    currentY: 0,
    activeAction: "Initializing",
    stepIndex: 0,
  });

  const [slideState, setSlideState] = useState<SlideState>({
    currentIdx: 0,
    nextIdx: 1,
  });

  // Preload upcoming slides
  const preloadSlide = useCallback((idx: number) => {
    if (typeof window === "undefined" || !HERO_SLIDES.length) return;
    const targetIdx = (idx + HERO_SLIDES.length) % HERO_SLIDES.length;
    const img = new Image();
    img.src = HERO_SLIDES[targetIdx].url;
  }, []);

  /* ========================================================================
     🎬 OBSERVER & CONTINUOUS MOMENTUM SEQUENCE CONTROLLER
     ======================================================================== */
  const executeSequenceStep = useCallback(() => {
    if (isTransitioningRef.current || !isVisible) return;
    isTransitioningRef.current = true;

    const currentLayer = activeLayerRef.current === 0 ? layerARef.current : layerBRef.current;
    const incomingLayer = activeLayerRef.current === 0 ? layerBRef.current : layerARef.current;

    if (!currentLayer || !incomingLayer) {
      isTransitioningRef.current = false;
      return;
    }

    const currentImg = currentLayer.querySelector("img");
    const incomingImg = incomingLayer.querySelector("img");

    if (!currentImg || !incomingImg) {
      isTransitioningRef.current = false;
      return;
    }

    // 👁️ OBSERVE EXACT LIVE TRANSFORM VALUES OF THE OUTGOING IMAGE
    const exactScale = (gsap.getProperty(currentImg, "scale") as number) || observerRef.current.currentScale || 1.0;
    const exactX = (gsap.getProperty(currentImg, "x") as number) || observerRef.current.currentX || 0;
    const exactY = (gsap.getProperty(currentImg, "y") as number) || observerRef.current.currentY || 0;

    // Get current choreographed step in sequence
    const step = CHOREOGRAPHY_SEQUENCE[observerRef.current.stepIndex % CHOREOGRAPHY_SEQUENCE.length];
    const nextSlideIdx = (slideState.currentIdx + 1) % HERO_SLIDES.length;
    preloadSlide(nextSlideIdx + 1);

    // Calculate CONTINUOUS target values from the EXACT pixel coordinates observed
    let targetScale = exactScale + step.zoomDelta;
    if (targetScale > SLIDESHOW_CONFIG.MAX_SCALE) targetScale = SLIDESHOW_CONFIG.MAX_SCALE;
    if (targetScale < SLIDESHOW_CONFIG.MIN_SCALE) targetScale = SLIDESHOW_CONFIG.MIN_SCALE;

    let targetX = exactX + step.shiftX;
    if (Math.abs(targetX) > SLIDESHOW_CONFIG.MAX_SHIFT_X) {
      targetX = -targetX * 0.4; // Soft rebound when boundary reached
    }

    let targetY = exactY + step.shiftY;
    if (Math.abs(targetY) > SLIDESHOW_CONFIG.MAX_SHIFT_Y) {
      targetY = -targetY * 0.4; // Soft rebound when boundary reached
    }

    // 👁️ UPDATE OBSERVER RECORD
    observerRef.current = {
      imageIndex: nextSlideIdx,
      imageFile: HERO_SLIDES[nextSlideIdx]?.url || "",
      currentScale: targetScale,
      currentX: targetX,
      currentY: targetY,
      activeAction: step.name,
      stepIndex: observerRef.current.stepIndex + 1,
    };

    // Bring incoming layer on top
    incomingLayer.style.zIndex = "2";
    currentLayer.style.zIndex = "1";

    // 🎯 INITIALIZE INCOMING IMAGE AT THE EXACT SCALE & PIXEL OF CURRENT IMAGE
    // (Resumes zooming and shifting from that EXACT pixel rather than resetting)
    gsap.set(incomingImg, {
      scale: exactScale,
      x: `${exactX}%`,
      y: `${exactY}%`,
      transformOrigin: "center center",
    });

    const duration = SLIDESHOW_CONFIG.TRANSITION_DURATION_S;

    const tl = gsap.timeline({
      onComplete: () => {
        // Swap active layer pointer
        activeLayerRef.current = activeLayerRef.current === 0 ? 1 : 0;
        isTransitioningRef.current = false;

        // Advance state for next cycle
        setSlideState({
          currentIdx: nextSlideIdx,
          nextIdx: (nextSlideIdx + 1) % HERO_SLIDES.length,
        });

        // ⏱️ EXACT 1-SECOND CADENCE TO NEXT IMAGE
        timerRef.current = setTimeout(executeSequenceStep, SLIDESHOW_CONFIG.STEP_DURATION_MS);
      },
    });

    // 1. Current Image decreases opacity to 0 while continuing its motion
    tl.to(currentLayer, {
      autoAlpha: 0,
      duration: duration,
      ease: "power1.inOut",
    }, 0);

    tl.to(currentImg, {
      scale: targetScale,
      x: `${targetX}%`,
      y: `${targetY}%`,
      duration: duration,
      ease: "power1.out",
    }, 0);

    // 2. Incoming Image starts from specified sequence opacity (e.g. 10% or 20%) and ramps to 100%
    tl.fromTo(
      incomingLayer,
      { autoAlpha: step.initialOpacity }, // 👈 Starts at 10% or 20% as defined in step
      { autoAlpha: 1.0, duration: duration, ease: "power2.out" },
      0
    );

    // 3. Incoming Image continues zooming & shifting from the EXACT pixel coordinate
    tl.to(incomingImg, {
      scale: targetScale,
      x: `${targetX}%`,
      y: `${targetY}%`,
      duration: duration,
      ease: "power1.out",
    }, 0);

  }, [isVisible, preloadSlide, slideState.currentIdx]);

  // Initial Mount: Start Sequence
  useEffect(() => {
    if (!isVisible || !HERO_SLIDES.length) return;

    if (layerARef.current) {
      gsap.set(layerARef.current, { autoAlpha: 1, zIndex: 1 });
      const firstImg = layerARef.current.querySelector("img");
      if (firstImg) {
        gsap.set(firstImg, { scale: 1.0, x: "0%", y: "0%" });
        gsap.to(firstImg, {
          scale: 1.06,
          x: "2%",
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power1.out",
        });
      }
    }
    if (layerBRef.current) {
      gsap.set(layerBRef.current, { autoAlpha: 0, zIndex: 0 });
    }

    preloadSlide(1);
    preloadSlide(2);

    // ⏱️ Schedule first sequence transition after 1 second
    timerRef.current = setTimeout(executeSequenceStep, SLIDESHOW_CONFIG.STEP_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [executeSequenceStep, isVisible, preloadSlide]);

  // 🌌 Mouse Parallax Interaction (Translates subtly with cursor)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!parallaxRef.current) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(parallaxRef.current, {
        x: nx * SLIDESHOW_CONFIG.PARALLAX_MAX_PX,
        y: ny * SLIDESHOW_CONFIG.PARALLAX_MAX_PX,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  if (!HERO_SLIDES.length) return null;

  const currentSlide = HERO_SLIDES[slideState.currentIdx];
  const nextSlide = HERO_SLIDES[slideState.nextIdx];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      {/* PARALLAX CONTAINER WRAPPER (Translates with cursor) */}
      <div
        ref={parallaxRef}
        className="absolute -inset-[32px] w-[calc(100%+64px)] h-[calc(100%+64px)] will-change-transform"
      >
        {/* LAYER A: First Buffer */}
        <div
          ref={layerARef}
          className="absolute inset-0 w-full h-full will-change-transform will-change-opacity overflow-hidden"
        >
          <img
            src={activeLayerRef.current === 0 ? currentSlide.url : nextSlide.url}
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter contrast-[112%] brightness-[86%] saturate-[108%] will-change-transform"
          />
        </div>

        {/* LAYER B: Second Buffer */}
        <div
          ref={layerBRef}
          className="absolute inset-0 w-full h-full will-change-transform will-change-opacity overflow-hidden"
        >
          <img
            src={activeLayerRef.current === 1 ? currentSlide.url : nextSlide.url}
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter contrast-[112%] brightness-[86%] saturate-[108%] will-change-transform"
          />
        </div>
      </div>

      {/* AUTHENTIC 35MM ANALOG FILM GRAIN OVERLAY */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "4px 4px, 3px 3px",
        }}
      />

      {/* SEAMLESS CINEMATIC DARK GRADIENT VIGNETTE LAYER */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
