"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO_SLIDES } from "@/lib/heroSlideshowData";

/* ==========================================================================
   SLIDESHOW TIMING & ANIMATION CONFIGURATION
   ========================================================================== */
export const SLIDESHOW_CONFIG = {
  // ⏱️ CONSTANT TIMER FOR ALL IMAGES ON SCREEN (in milliseconds)
  SLIDE_DURATION_MS: 1500, // 👈 Exact constant duration every image remains on screen (1.5s)
  TRANSITION_DURATION_S: 0.85, // 👈 Constant smooth cross-fade duration

  // 🌓 GRADUAL OPACITY (Current decreases, Next: 30% -> 100%)
  INCOMING_INITIAL_OPACITY: 0.3,
  INCOMING_TARGET_OPACITY: 1.0,

  // 🔍 PURE ZOOM-IN ONLY (Zero shifting, never zooms out)
  ZOOM_BASE_SCALE: 1.0,
  ZOOM_MAX_SCALE: 1.10,
  PARALLAX_MAX_PX: 20,
};

export default function HeroBackgroundSlideshow({ isVisible = true }: { isVisible?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);
  const burnOverlayRef = useRef<HTMLDivElement>(null);

  // Strictly ref-based state machine (prevents React re-renders from restarting timers/tweens)
  const activeLayerRef = useRef<0 | 1>(0); // 0 = Layer A is active, 1 = Layer B is active
  const slideIdxRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible || !HERO_SLIDES.length) return;

    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    const imgA = imgARef.current;
    const imgB = imgBRef.current;
    const burnOverlay = burnOverlayRef.current;

    if (!layerA || !layerB || !imgA || !imgB) return;

    // Preload helper
    const preload = (idx: number) => {
      const target = (idx + HERO_SLIDES.length) % HERO_SLIDES.length;
      const pre = new Image();
      pre.src = HERO_SLIDES[target].url;
    };

    // Calculate total animation duration for constant forward zoom
    const totalZoomDuration =
      SLIDESHOW_CONFIG.SLIDE_DURATION_MS / 1000 + SLIDESHOW_CONFIG.TRANSITION_DURATION_S;

    // Helper: start continuous forward zoom on an image (NEVER ZOOMS OUT)
    const startForwardZoom = (img: HTMLImageElement) => {
      gsap.killTweensOf(img);
      gsap.fromTo(
        img,
        { scale: SLIDESHOW_CONFIG.ZOOM_BASE_SCALE, x: 0, y: 0, transformOrigin: "center center" },
        {
          scale: SLIDESHOW_CONFIG.ZOOM_MAX_SCALE,
          x: 0,
          y: 0,
          duration: totalZoomDuration,
          ease: "linear",
        }
      );
    };

    // Initial setup: Layer A active with slide 0, Layer B hidden with slide 1
    activeLayerRef.current = 0;
    slideIdxRef.current = 0;
    isTransitioningRef.current = false;

    imgA.src = HERO_SLIDES[0].url;
    imgB.src = HERO_SLIDES[1 % HERO_SLIDES.length].url;

    gsap.set(layerA, { autoAlpha: 1, zIndex: 1 });
    gsap.set(layerB, { autoAlpha: 0, zIndex: 0 });
    if (burnOverlay) gsap.set(burnOverlay, { autoAlpha: 0 });

    startForwardZoom(imgA);
    preload(1);
    preload(2);

    // Step Transition: swaps between Layer A and Layer B without DOM rebuilds
    const stepTransition = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const isAActive = activeLayerRef.current === 0;
      const outgoingLayer = isAActive ? layerA : layerB;
      const incomingLayer = isAActive ? layerB : layerA;
      const outgoingImg = isAActive ? imgA : imgB;
      const incomingImg = isAActive ? imgB : imgA;

      const nextSlideIdx = (slideIdxRef.current + 1) % HERO_SLIDES.length;
      incomingImg.src = HERO_SLIDES[nextSlideIdx].url;
      preload((nextSlideIdx + 1) % HERO_SLIDES.length);

      // Layer stacking: incoming is on top so outgoing is visible underneath during fade
      incomingLayer.style.zIndex = "2";
      outgoingLayer.style.zIndex = "1";

      // Start incoming image zoom immediately from base scale 1.00 (monotonically zooming forward)
      startForwardZoom(incomingImg);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const onTransitionComplete = () => {
        // Toggle active layer pointer
        activeLayerRef.current = isAActive ? 1 : 0;
        slideIdxRef.current = nextSlideIdx;
        isTransitioningRef.current = false;

        // Reset outgoing layer
        gsap.set(outgoingLayer, { autoAlpha: 0, zIndex: 0 });
        gsap.killTweensOf(outgoingImg);

        // Schedule next image after the constant slide duration
        timerRef.current = setTimeout(stepTransition, SLIDESHOW_CONFIG.SLIDE_DURATION_MS);
      };

      if (prefersReducedMotion) {
        gsap.to(outgoingLayer, { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" });
        gsap.fromTo(
          incomingLayer,
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
          {
            autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY,
            duration: 0.8,
            ease: "power1.inOut",
            onComplete: onTransitionComplete,
          }
        );
        return;
      }

      // Synchronized Cross-Dissolve: Outgoing fades down, incoming rises 30% -> 100%
      const tl = gsap.timeline({ onComplete: onTransitionComplete });

      // Outgoing layer fades down smoothly
      tl.to(
        outgoingLayer,
        {
          autoAlpha: 0,
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power2.inOut",
        },
        0
      );

      // Incoming layer rises from 30% to 100% (No blackout: incoming is already at 30% when outgoing fades)
      tl.fromTo(
        incomingLayer,
        { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
        {
          autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY,
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power2.out",
        },
        0
      );
    };

    // Schedule first transition
    timerRef.current = setTimeout(stepTransition, SLIDESHOW_CONFIG.SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      gsap.killTweensOf(layerA);
      gsap.killTweensOf(layerB);
      gsap.killTweensOf(imgA);
      gsap.killTweensOf(imgB);
      if (burnOverlay) gsap.killTweensOf(burnOverlay);
    };
  }, [isVisible]);

  // Mouse Parallax Interaction (Translates subtly with cursor)
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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      {/* PARALLAX CONTAINER WRAPPER (Translates subtly with cursor) */}
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
            ref={imgARef}
            src={HERO_SLIDES[0]?.url || ""}
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
            ref={imgBRef}
            src={HERO_SLIDES[1]?.url || ""}
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter contrast-[112%] brightness-[86%] saturate-[108%] will-change-transform"
          />
        </div>
      </div>

      {/* FILM BURN / LIGHT LEAK OVERLAY */}
      <div
        ref={burnOverlayRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(255, 185, 80, 0.95) 0%, rgba(255, 90, 20, 0.7) 35%, rgba(180, 20, 40, 0.4) 60%, transparent 80%), radial-gradient(circle at 20% 80%, rgba(255, 220, 140, 0.8) 0%, rgba(255, 120, 40, 0.5) 40%, transparent 75%)",
        }}
      />

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
