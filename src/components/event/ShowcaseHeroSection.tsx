"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsapScrollTo, SMOOTH_SCROLL_CONFIG } from "@/components/event/Navbar";

export interface ShowcaseItem {
  id: string;
  src: string;
  left: number; // in percentage of screen
  top: number; // in percentage of screen
  w: number; // in percentage of screen
  h: number; // in percentage of screen
  dx: number; // scatter translation in vw
  dy: number; // scatter translation in vh
  rot: number; // scatter rotation in degrees
  title: string;
}

// Exact 9-image diamond mosaic layout and scatter vectors from DevFest Kolkata
export const DEVFEST_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "showcase-1",
    src: "/showcase/kolkata-1.webp",
    left: 7.85,
    top: 38.9,
    w: 19.86,
    h: 27.9,
    dx: -18,
    dy: -18,
    rot: -12,
    title: "Howrah & Heritage",
  },
  {
    id: "showcase-2",
    src: "/showcase/interior.webp",
    left: 27.7,
    top: 30,
    w: 15.97,
    h: 22.07,
    dx: 0,
    dy: -24,
    rot: 8,
    title: "Atelier & Architecture",
  },
  {
    id: "showcase-3",
    src: "/showcase/kalighat.webp",
    left: 27.7,
    top: 52.05,
    w: 15.97,
    h: 22.46,
    dx: -24,
    dy: 4,
    rot: -8,
    title: "Spiritual Rhythms",
  },
  {
    id: "showcase-4",
    src: "/showcase/dl29.webp",
    left: 43.68,
    top: 17.38,
    w: 14.24,
    h: 21.48,
    dx: 18,
    dy: -18,
    rot: 14,
    title: "Neon Synthesis",
  },
  {
    id: "showcase-5",
    src: "/showcase/victoria.webp",
    left: 43.68,
    top: 38.38,
    w: 14.44,
    h: 20.8,
    dx: 26,
    dy: -2,
    rot: -10,
    title: "Victoria Memorial Grandeur",
  },
  {
    id: "showcase-6",
    src: "/showcase/dl30.webp",
    left: 43.68,
    top: 58.79,
    w: 14.24,
    h: 23.83,
    dx: -16,
    dy: 22,
    rot: 10,
    title: "Arena Pulse",
  },
  {
    id: "showcase-7",
    src: "/showcase/stpauls.webp",
    left: 57.92,
    top: 30,
    w: 14.86,
    h: 22.56,
    dx: 10,
    dy: -26,
    rot: -6,
    title: "Gothic Spire Acoustics",
  },
  {
    id: "showcase-8",
    src: "/showcase/indian-museum.webp",
    left: 57.85,
    top: 52.44,
    w: 15.0,
    h: 21.97,
    dx: 22,
    dy: 24,
    rot: 12,
    title: "Living Archive",
  },
  {
    id: "showcase-9",
    src: "/showcase/calcutta.webp",
    left: 72.78,
    top: 41.31,
    w: 19.31,
    h: 28.42,
    dx: 28,
    dy: 14,
    rot: -14,
    title: "Timeless Cityscape",
  },
];

interface ShowcaseHeroSectionProps {
  onExplore?: () => void;
  speedMode?: "1s" | "2s";
}

/* ==========================================================================
   >>> EXACT POINT OF CODE CONTROLLING VIDEO ZOOM & SCALE <<<
   Increase to zoom in further (e.g., 1.15 = 15% zoom, 1.25 = 25% zoom, 1.35 = 35% zoom)
   ========================================================================== */
export const VIDEO_ZOOM_SCALE = 1.33;

interface OutlineTextProps {
  text: string;
  maskId: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  fontMode?: "syne" | "anton" | "bebas" | "googlesans" | "londrina" | "bungee";
}

/**
 * Authentic Hollow Outline Text Renderer.
 * DevFest Kolkata uses an inverted SVG mask:
 * - White mask rect passes outer stroke through
 * - Black mask text completely removes inside body fill
 * - Rounded line joins give it smooth contours with zero letter-clipping or interior artifacts
 */
export function OutlineText({
  text,
  maskId,
  className = "",
  style,
  color = "#ffffff",
  fontMode = "bebas",
}: OutlineTextProps) {
  if (fontMode === "londrina") {
    return (
      <div
        className={`font-londrina-outline select-none whitespace-nowrap text-center ${className}`}
        style={{
          color,
          lineHeight: 1,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  if (fontMode === "bungee") {
    return (
      <div
        className={`font-bungee-outline select-none whitespace-nowrap text-center ${className}`}
        style={{
          color,
          lineHeight: 1,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  const fontFamily =
    fontMode === "bebas"
      ? "var(--font-bebas-neue), Impact, sans-serif"
      : fontMode === "anton"
      ? "var(--font-anton), Impact, sans-serif"
      : fontMode === "googlesans"
      ? '"Google Sans", system-ui, sans-serif'
      : "var(--font-syne), sans-serif";

  // Authentic DevFest Inverted SVG Mask (100% hollow with round outer stroke & zero interior artifacts)
  return (
    <div
      className={`relative select-none d4-outline whitespace-nowrap text-center inline-block ${className}`}
      style={{
        color,
        lineHeight: 1,
        fontFamily,
        ...style,
      }}
    >
      {/* Invisible spacer text ensuring exact box dimensions and natural wrap */}
      <span style={{ color: "transparent", fontFamily }}>{text}</span>

      {/* SVG Outline with Inverted Cutout Mask */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            {/* White allows all outer stroke through */}
            <rect x="-20%" y="-20%" width="140%" height="140%" fill="#ffffff" />
            {/* Black completely cuts away the inside fill so it is 100% hollow */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontFamily,
                fontWeight: fontMode === "bebas" ? 400 : (style?.fontWeight ?? 800),
                letterSpacing: style?.letterSpacing || "normal",
              }}
            >
              {text}
            </text>
          </mask>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          mask={`url(#${maskId})`}
          style={{
            fontFamily,
            fontWeight: fontMode === "bebas" ? 400 : (style?.fontWeight ?? 800),
            letterSpacing: style?.letterSpacing || "normal",
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}

export default function ShowcaseHeroSection({
  onExplore,
  speedMode = "1s",
}: ShowcaseHeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animation state machine mirrors DevFest Kolkata sequence
  const [initialReady, setInitialReady] = useState(false);
  const [experienceActive, setExperienceActive] = useState(false);
  const [imagesVisible, setImagesVisible] = useState(false);
  const [isScattering, setIsScattering] = useState(false);
  const [isDarkWebsite, setIsDarkWebsite] = useState(false);
  const [heroContentRevealed, setHeroContentRevealed] = useState(false);
  const [animationDuration, setAnimationDuration] = useState<"1s" | "2s">(speedMode);
  const [fontMode, setFontMode] = useState<"bebas" | "syne" | "anton" | "googlesans" | "londrina" | "bungee">("bebas");

  useEffect(() => {
    if (isDarkWebsite && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isDarkWebsite]);

  // Time multipliers:
  // 1s mode: stagger delay 110ms * 9 = ~1.0s entrance, hold 600ms, scatter 850ms
  // 2s mode: stagger delay 180ms * 9 = ~1.6s entrance, hold 900ms, scatter 950ms
  const staggerDelay = animationDuration === "1s" ? 110 : 180;
  const holdDuration = animationDuration === "1s" ? 1600 : 2600;

  // Initial mount trigger
  useEffect(() => {
    const t = setTimeout(() => {
      setInitialReady(true);
      // Automatically trigger the experience sequence
      setExperienceActive(true);
    }, 350);

    return () => clearTimeout(t);
  }, []);

  // When experience starts, trigger images appearance on next RAF
  useEffect(() => {
    if (!experienceActive) return;
    const raf = requestAnimationFrame(() => setImagesVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [experienceActive]);

  // After all images appear left-to-right and hold, trigger scatter
  useEffect(() => {
    if (!imagesVisible) return;
    const timer = setTimeout(() => {
      setIsScattering(true);
    }, holdDuration);
    return () => clearTimeout(timer);
  }, [imagesVisible, holdDuration]);

  // Once scattering begins, wait for scatter animation to complete, then switch canvas to dark website
  useEffect(() => {
    if (!isScattering) return;
    const scatterTime = animationDuration === "1s" ? 850 : 950;
    const timer = setTimeout(() => {
      setIsDarkWebsite(true);
    }, scatterTime);
    return () => clearTimeout(timer);
  }, [isScattering, animationDuration]);

  // When dark website is active, reveal hero content with smooth fade
  useEffect(() => {
    if (!isDarkWebsite) return;
    const raf = requestAnimationFrame(() => {
      setHeroContentRevealed(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [isDarkWebsite]);

  // Keyboard shortcut: Space or Enter toggles / restarts experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        if (!experienceActive) {
          e.preventDefault();
          setExperienceActive(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [experienceActive]);

  // Reset and replay the entire sequence
  const handleReplay = (mode?: "1s" | "2s") => {
    if (mode) setAnimationDuration(mode);
    setImagesVisible(false);
    setIsScattering(false);
    setIsDarkWebsite(false);
    setHeroContentRevealed(false);
    setExperienceActive(false);

    setTimeout(() => {
      setExperienceActive(true);
    }, 120);
  };

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      gsapScrollTo("#about", SMOOTH_SCROLL_CONFIG.duration, SMOOTH_SCROLL_CONFIG.offset);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Viewport Canvas (100vh / 100dvh) */}
      <div
        id="hero-canvas-inner"
        className="relative z-10 h-full w-full overflow-hidden select-none transition-colors duration-1000 will-change-transform origin-center"
        style={{
          backgroundColor: "#000000",
          overflowX: "hidden",
        }}
      >
        {/* =========================================================================
            STAGE 1: PRE-SCATTER BLACK SHOWCASE CANVAS (Images - LOGO & TRAM REMOVED)
            ========================================================================= */}
        {!isDarkWebsite && (
          <>
            {/* THE EXACT 9-IMAGE SHOWCASE (Left to Right Sequential Entrance -> Scatter & Fade) */}
            {experienceActive &&
              DEVFEST_SHOWCASE_ITEMS.map((item, index) => {
                // Stagger delay from left to right: index 0 to 8
                const delayMs = index * staggerDelay;

                return (
                  <div
                    key={item.id}
                    className="absolute pointer-events-none will-change-transform shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/10 rounded-sm overflow-hidden"
                    style={{
                      left: `${item.left}%`,
                      top: `${item.top}%`,
                      width: `${item.w}%`,
                      height: `${item.h}%`,
                      transform: isScattering
                        ? `translate(${item.dx}vw, ${item.dy}vh) rotate(${item.rot}deg) scale(0.7)`
                        : "none",
                      opacity: isScattering ? 0 : imagesVisible ? 1 : 0,
                      transition: isScattering
                        ? "transform 900ms cubic-bezier(.5,0,.75,.4), opacity 900ms cubic-bezier(.5,0,.75,.4)"
                        : `opacity 400ms ease ${delayMs}ms`,
                      zIndex: 3,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.title}
                      draggable={false}
                      className="block w-full h-full object-cover"
                    />
                  </div>
                );
              })}

            {/* "Start the experience" CTA Button (if experience hasn't activated) */}
            <button
              type="button"
              onClick={() => setExperienceActive(true)}
              className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full transition-all duration-500 ease-out group ${
                experienceActive
                  ? "opacity-0 -translate-y-3 pointer-events-none"
                  : initialReady
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                top: "64%",
                transitionDelay: initialReady && !experienceActive ? "180ms" : "0ms",
                zIndex: 10,
              }}
            >
              <span className="font-medium text-white whitespace-nowrap text-sm tracking-wide">
                Start the experience
              </span>
              <svg
                viewBox="0 0 49 25"
                className="h-auto w-4 text-white transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 12.5C0 12.1317 0.184363 11.7785 0.51253 11.518C0.840698 11.2576 1.28579 11.1113 1.74989 11.1113H43.0228L32.009 2.37364C31.6804 2.11288 31.4958 1.75922 31.4958 1.39045C31.4958 1.02168 31.6804 0.668012 32.009 0.407253C32.3375 0.146493 32.7832 0 33.2479 0C33.7126 0 34.1582 0.146493 34.4868 0.407253L48.4859 11.5168C48.6489 11.6458 48.7782 11.799 48.8664 11.9678C48.9546 12.1365 49 12.3173 49 12.5C49 12.6827 48.9546 12.8635 48.8664 13.0322C48.7782 13.201 48.6489 13.3542 48.4859 13.4832L34.4868 24.5927C34.1582 24.8535 33.7126 25 33.2479 25C32.7832 25 32.3375 24.8535 32.009 24.5927C31.6804 24.332 31.4958 23.9783 31.4958 23.6096C31.4958 23.2408 31.6804 22.8871 32.009 22.6264L43.0228 13.8887H1.74989C1.28579 13.8887 0.840698 13.7424 0.51253 13.482C0.184363 13.2215 0 12.8683 0 12.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </>
        )}

        {/* =========================================================================
            STAGE 2: POST-SCATTER WEBSITE HERO CANVAS (Revealed as Scatter Completes)
            ========================================================================= */}
        {(isScattering || isDarkWebsite) && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            style={{
              backgroundColor: "#000000",
              opacity: heroContentRevealed ? 1 : 0,
              transition: "opacity 900ms ease",
              zIndex: 1,
            }}
          >
            {/* Background Video from Instagram aftermovie (Techno Chitraka / Sanskaran & Sahotsava) */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none will-change-transform"
              style={{
                filter: "contrast(115%) brightness(88%)",
                transform: `scale(${VIDEO_ZOOM_SCALE})`,
                transformOrigin: "center center",
              }}
            >
              <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>

            {/* Seamless Dark Vignette Layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </div>
        )}

        {/* =========================================================================
            STAGE 3: HERO CONTENT LOCKUP (TRUE CENTERED & IMPECCABLE TYPOGRAPHY)
            ========================================================================= */}
        {isDarkWebsite && (
          <>
            {/* Center Hero Content Container (Guaranteed 100% Horizontal & Vertical Centering) */}
            <div className="pointer-events-none absolute inset-0 z-20 w-full max-w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center mx-auto">
              {/* Unified Typographic Block (SANSKARAN + 2026 Locked to Exact Same Width) */}
              <div className="inline-flex flex-col items-stretch text-center max-w-[94vw]">
                {/* Primary Festival Title (Hollow White Outline - Bebas Neue Display matching Gallery Section) */}
                <OutlineText
                  text="SANSKARAN"
                  maskId="d4-outline-devfest"
                  fontMode={fontMode}
                  color="#ffffff"
                  className="text-[38px] min-[360px]:text-[46px] min-[400px]:text-[54px] min-[520px]:text-[68px] sm:text-[92px] md:text-[112px] lg:text-[132px] xl:text-[150px] 2xl:text-[164px]"
                  style={{
                    fontWeight: fontMode === "bebas" ? 400 : 800,
                    letterSpacing: "0.03em",
                    filter: "drop-shadow(0 2px 20px rgba(255,255,255,0.22)) drop-shadow(0 4px 32px rgba(0,0,0,0.95))",
                    opacity: heroContentRevealed ? 1 : 0,
                    transition: "opacity 900ms ease 120ms",
                  }}
                />

                {/* 2026: Spans the EXACT SAME WIDTH as SANSKARAN via flex justify-between */}
                <div
                  className="w-full flex items-center justify-between mt-1 sm:mt-2.5 select-none"
                  style={{
                    opacity: heroContentRevealed ? 1 : 0,
                    transition: "opacity 900ms ease 260ms",
                  }}
                >
                  {["2", "0", "2", "6"].map((digit, i) => (
                    <OutlineText
                      key={`year-digit-${i}`}
                      text={digit}
                      maskId={`d4-outline-digit-${i}`}
                      fontMode={fontMode}
                      color="#a78bfa"
                      className="text-[32px] min-[360px]:text-[38px] min-[400px]:text-[46px] min-[520px]:text-[58px] sm:text-[80px] md:text-[96px] lg:text-[114px] xl:text-[130px] 2xl:text-[142px]"
                      style={{
                        fontWeight: fontMode === "bebas" ? 400 : 800,
                        filter: "drop-shadow(0 2px 18px rgba(167,139,250,0.65)) drop-shadow(0 4px 24px rgba(0,0,0,0.85))",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Anthem Tagline - Impeccable Tech Grotesque styling */}
              <div
                className="mt-4 sm:mt-6 max-w-[92vw] font-tech text-[10.5px] min-[360px]:text-[12px] min-[400px]:text-[13px] sm:text-[16px] md:text-[17px] font-semibold text-[#FFF4E0] tracking-[0.24em] sm:tracking-[0.3em] uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)] whitespace-nowrap text-center"
                style={{
                  opacity: heroContentRevealed ? 1 : 0,
                  transition: "opacity 900ms ease 400ms",
                }}
              >
                #COMEJOINTHEHAPPINESS
              </div>

              {/* Interactive Action Buttons & Chevron */}
              <div
                className="pointer-events-auto mt-6 sm:mt-8 flex flex-col items-center gap-4 text-center"
                style={{
                  opacity: heroContentRevealed ? 1 : 0,
                  transition: "opacity 900ms ease 540ms",
                }}
              >
                {/* Impeccable Glassmorphism Action Button */}
                <button
                  type="button"
                  onClick={handleExploreClick}
                  className="flex h-11 sm:h-12 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full px-8 sm:px-9 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.12)]"
                >
                  Explore
                </button>

                {/* Animated Scroll Down Chevron */}
                <button
                  type="button"
                  onClick={handleExploreClick}
                  aria-label="Scroll to content"
                  className="mt-1 p-2 text-white/70 hover:text-white cursor-pointer transition-transform duration-300 hover:translate-y-1 animate-bounce"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
