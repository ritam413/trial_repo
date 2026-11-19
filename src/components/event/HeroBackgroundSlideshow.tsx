"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { HERO_SLIDES, HeroSlide } from "@/lib/heroSlideshowData";

/* ==========================================================================
   SLIDESHOW TIMING & ANIMATION CONFIGURATION
   (Constant timer for all images & constant zoom animation speed)
   ========================================================================== */
export const SLIDESHOW_CONFIG = {
  // ⏱️ CONSTANT TIMER FOR ALL IMAGES ON SCREEN (in milliseconds)
  // Every single image stays on screen for this exact constant duration:
  SLIDE_DURATION_MS: 1500, // 👈 CONSTANT TIMER: 1.5s (Change to 1000 for 1s, 2000 for 2s, etc.)
  FIXED_DURATION_MS: 1500 as number | null,
  MIN_DURATION_MS: 1200,
  MAX_DURATION_MS: 1800,
  TRANSITION_DURATION_S: 0.8, // 👈 Constant transition duration for fluid cross-fade

  // 🌓 GRADUAL OPACITY TRANSITION PARAMETERS (Current decreases, Next: 30% -> 100%)
  INCOMING_INITIAL_OPACITY: 0.3, // 👈 Starts gradually from 30% (0.3)
  INCOMING_TARGET_OPACITY: 1.0,  // 👈 Ramps up smoothly to 100% (1.0)

  // 🔍 ZOOM CONFIGURATION (Zero shift, pure forward zoom-in, never zooms out)
  ZOOM_BASE_SCALE: 1.0,   // Base scale when image appears
  ZOOM_MAX_SCALE: 1.10,   // Maximum scale reached during its constant screen time
  PARALLAX_MAX_PX: 20,    // Max pixel shift following cursor movement
};

export type TransitionType = "dissolve" | "burn" | "fade" | "zoom-dissolve";
const TRANSITIONS: TransitionType[] = ["dissolve", "burn", "fade", "zoom-dissolve"];

interface SlideState {
  currentIdx: number;
  nextIdx: number;
}

export default function HeroBackgroundSlideshow({ isVisible = true }: { isVisible?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const burnOverlayRef = useRef<HTMLDivElement>(null);

  // Active layer tracker: 0 = Layer A is front, 1 = Layer B is front
  const activeLayerRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [slideState, setSlideState] = useState<SlideState>({
    currentIdx: 0,
    nextIdx: 1,
  });

  // Preload upcoming slides into memory
  const preloadSlide = useCallback((idx: number) => {
    if (typeof window === "undefined" || !HERO_SLIDES.length) return;
    const targetIdx = (idx + HERO_SLIDES.length) % HERO_SLIDES.length;
    const img = new Image();
    img.src = HERO_SLIDES[targetIdx].url;
  }, []);

  // Pick a random transition effect
  const getRandomTransition = useCallback((): TransitionType => {
    const r = Math.floor(Math.random() * TRANSITIONS.length);
    return TRANSITIONS[r];
  }, []);

  // Execute pure monotonic forward zoom on active image (Constant speed, Zero shifting, Never zooms out)
  const startKenBurnsZoom = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    const img = element.querySelector("img");
    if (!img) return;

    const startScale = SLIDESHOW_CONFIG.ZOOM_BASE_SCALE; // 1.0
    const targetScale = SLIDESHOW_CONFIG.ZOOM_MAX_SCALE;  // 1.10
    // Constant animation duration matching the exact constant slide duration
    const constantAnimDuration =
      SLIDESHOW_CONFIG.SLIDE_DURATION_MS / 1000 + SLIDESHOW_CONFIG.TRANSITION_DURATION_S;

    gsap.killTweensOf(img);
    gsap.fromTo(
      img,
      { scale: startScale, x: "0%", y: "0%", transformOrigin: "center center" },
      {
        scale: targetScale,
        x: "0%",
        y: "0%",
        duration: constantAnimDuration,
        ease: "sine.out",
      }
    );
  }, []);

  // Execute transition from active layer to incoming layer
  const executeTransition = useCallback(() => {
    if (isTransitioningRef.current || !isVisible) return;
    isTransitioningRef.current = true;

    const currentLayer = activeLayerRef.current === 0 ? layerARef.current : layerBRef.current;
    const incomingLayer = activeLayerRef.current === 0 ? layerBRef.current : layerARef.current;
    const burnOverlay = burnOverlayRef.current;

    if (!currentLayer || !incomingLayer) {
      isTransitioningRef.current = false;
      return;
    }

    const nextSlideIdx = (slideState.currentIdx + 1) % HERO_SLIDES.length;
    preloadSlide(nextSlideIdx + 1);

    const transition = getRandomTransition();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bring incoming layer on top
    incomingLayer.style.zIndex = "2";
    currentLayer.style.zIndex = "1";

    const onCompleteTransition = () => {
      // Swap layer pointer
      activeLayerRef.current = activeLayerRef.current === 0 ? 1 : 0;
      isTransitioningRef.current = false;

      // Update state for next cycle
      setSlideState({
        currentIdx: nextSlideIdx,
        nextIdx: (nextSlideIdx + 1) % HERO_SLIDES.length,
      });

      // ⏱️ CONSTANT TIMER FOR ALL IMAGES: schedule next image after exact constant duration
      timerRef.current = setTimeout(executeTransition, SLIDESHOW_CONFIG.SLIDE_DURATION_MS);
    };

    // Trigger pure monotonic zoom-in on incoming layer with constant animation speed (never zooms out)
    if (!prefersReducedMotion) {
      startKenBurnsZoom(incomingLayer);
    }

    if (prefersReducedMotion) {
      // Accessible crossfade: current fades to 0, incoming ramps 30% -> 100%
      gsap.fromTo(
        incomingLayer,
        { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
        { autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY, duration: 1.2, ease: "power1.inOut" }
      );
      gsap.to(currentLayer, {
        autoAlpha: 0,
        duration: 1.2,
        ease: "power1.inOut",
        onComplete: onCompleteTransition,
      });
      return;
    }

    switch (transition) {
      case "burn": {
        // Film Burn / Light Leak Exposure Bloom with 30% -> 100% incoming sweep
        const tl = gsap.timeline({ onComplete: onCompleteTransition });

        if (burnOverlay) {
          tl.to(burnOverlay, {
            autoAlpha: 0.92,
            duration: 0.35,
            ease: "power2.in",
          });
        }

        // Mid-flare switch: current layer decreases, incoming starts at 30% and blooms to 100%
        tl.fromTo(
          incomingLayer,
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY, duration: 0.65, ease: "power2.out" },
          "-=0.12"
        ).to(currentLayer, { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, "<");

        if (burnOverlay) {
          tl.to(burnOverlay, {
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
          });
        }
        break;
      }

      case "fade": {
        // Dark Shutter Cinematic Dip: Current fades out, incoming rises from 30% -> 100%
        const tl = gsap.timeline({ onComplete: onCompleteTransition });
        tl.to(currentLayer, {
          autoAlpha: 0,
          duration: 0.75,
          ease: "power2.in",
        });
        tl.fromTo(
          incomingLayer,
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY, duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S, ease: "power2.out" },
          "-=0.2"
        );
        break;
      }

      case "zoom-dissolve": {
        // Optical Zoom Rack Push with 30% -> 100% incoming ramp
        const tl = gsap.timeline({ onComplete: onCompleteTransition });
        tl.to(currentLayer, {
          autoAlpha: 0,
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power2.inOut",
        });
        tl.fromTo(
          incomingLayer,
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY, duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S, ease: "power2.out" },
          "<"
        );
        break;
      }

      case "dissolve":
      default: {
        // Velvety Soft Cross-Dissolve: Current decreases, incoming ramps from 30% to 100%
        const tl = gsap.timeline({ onComplete: onCompleteTransition });
        tl.to(currentLayer, {
          autoAlpha: 0,
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power2.inOut",
        });
        tl.fromTo(
          incomingLayer,
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY, duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S, ease: "power2.out" },
          "<"
        );
        break;
      }
    }
  }, [getRandomTransition, isVisible, preloadSlide, slideState.currentIdx, startKenBurnsZoom]);

  // Initial mount & kick-off
  useEffect(() => {
    if (!isVisible || !HERO_SLIDES.length) return;

    if (layerARef.current) {
      gsap.set(layerARef.current, { autoAlpha: 1, zIndex: 1 });
      startKenBurnsZoom(layerARef.current);
    }
    if (layerBRef.current) {
      gsap.set(layerBRef.current, { autoAlpha: 0, zIndex: 0 });
    }
    if (burnOverlayRef.current) {
      gsap.set(burnOverlayRef.current, { autoAlpha: 0 });
    }

    preloadSlide(1);
    preloadSlide(2);

    // Initial delay before first transition (strictly constant timer for every image)
    timerRef.current = setTimeout(executeTransition, SLIDESHOW_CONFIG.SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [executeTransition, isVisible, preloadSlide, startKenBurnsZoom]);

  // Mouse Parallax Interaction
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!parallaxRef.current) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

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
