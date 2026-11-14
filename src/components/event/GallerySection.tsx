"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ==========================================================================
   1. INLINE VECTOR ICONS
   ========================================================================== */
const Icon = {
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  Play: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Volume2: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  VolumeX: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ImageIcon: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Sliders: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Maximize2: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

/* ==========================================================================
   2. GALLERY DATA (12 SLOTS ACROSS 3 SPREAD ROWS)
   ========================================================================== */
export interface GalleryItem {
  id: string;
  row: number; // 0, 1, 2
  type: "image" | "video";
  title: string;
  tag: string;
  code: string;
  src: string;
  poster?: string;
  fallbackGradient: string;
  overlayTop: string;
  suitWatermark: string;
  isTypography?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ROW 0
  {
    id: "gal-01",
    row: 0,
    type: "image",
    title: "OPENING CONCLAVE // OVERTURE",
    tag: "SANSKARAN DAY 01",
    code: "0034",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #8B1E24 0%, #120E15 100%)",
    overlayTop: "DAY 01",
    suitWatermark: "♠",
  },
  {
    id: "gal-02",
    row: 0,
    type: "video",
    title: "SOLAR FLARE STAGE & CROWD ROAR",
    tag: "SAHOTSAVA LIVE",
    code: "12K",
    src: "https://assets.mixkit.co/videos/preview/mixkit-crowd-cheering-at-a-concert-14050-large.mp4",
    poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #E65C19 0%, #120E15 100%)",
    overlayTop: "LIVE REEL",
    suitWatermark: "♦",
  },
  {
    id: "gal-03",
    row: 0,
    type: "image",
    title: "RISOGRAPH & FINE ARTS PAVILION",
    tag: "EXHIBITION HALL",
    code: "2026",
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #FFAA24 0%, #8B1E24 100%)",
    overlayTop: "2026 NOV",
    suitWatermark: "♣",
  },
  {
    id: "gal-04",
    row: 0,
    type: "image",
    title: "NOCTURNE SYMPHONY ORCHESTRA",
    tag: "CULTURAL NIGHT",
    code: "0095",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #120E15 0%, #8B1E24 100%)",
    overlayTop: "THU",
    suitWatermark: "♥",
  },
  // ROW 1
  {
    id: "gal-05",
    row: 1,
    type: "video",
    title: "CRIMSON CYPHER // NEON STREET DANCE",
    tag: "BATTLE OF HOUSES",
    code: "ACE",
    src: "https://assets.mixkit.co/videos/preview/mixkit-dancer-performing-with-neon-lights-34549-large.mp4",
    poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #8B1E24 0%, #E65C19 100%)",
    overlayTop: "CYPHER",
    suitWatermark: "♠",
  },
  {
    id: "gal-06",
    row: 1,
    type: "image",
    title: "THEATRE OF SHADOWS & MONOLOGUES",
    tag: "DRAMATICS GUILD",
    code: "ACT II",
    src: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #2A1208 0%, #FFAA24 100%)",
    overlayTop: "STAGE",
    suitWatermark: "♦",
  },
  {
    id: "gal-07",
    row: 1,
    type: "video",
    title: "IGNITED AMBER ACOUSTIC SESSIONS",
    tag: "SANSKARAN UNPLUGGED",
    code: "0042",
    src: "https://assets.mixkit.co/videos/preview/mixkit-guitarist-playing-on-stage-with-dramatic-lighting-42874-large.mp4",
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #E65C19 0%, #120E15 100%)",
    overlayTop: "0034 - 0095",
    suitWatermark: "♣",
  },
  {
    id: "gal-08",
    row: 1,
    type: "image",
    title: "AVANT-GARDE COUTURE RUNWAY",
    tag: "PANACHE SHOWCASE",
    code: "Q♦",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #8B1E24 0%, #120E15 100%)",
    overlayTop: "RUNWAY",
    suitWatermark: "♥",
  },
  // ROW 2
  {
    id: "gal-09",
    row: 2,
    type: "image",
    title: "MIDNIGHT LASER & SYNTHESIS LAB",
    tag: "PRO-SHOW FINALE",
    code: "A♠",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #120E15 0%, #E65C19 100%)",
    overlayTop: "MADRID // BARCELONA",
    suitWatermark: "♠",
  },
  {
    id: "gal-10",
    row: 2,
    type: "video",
    title: "GOLDEN EMBER FESTIVAL EUPHORIA",
    tag: "SAHOTSAVA AFTERMOVIE",
    code: "4K",
    src: "https://assets.mixkit.co/videos/preview/mixkit-hands-in-the-air-at-a-music-concert-14052-large.mp4",
    poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #FFAA24 0%, #120E15 100%)",
    overlayTop: "0316 AVE",
    suitWatermark: "♦",
  },
  {
    id: "gal-11",
    row: 2,
    type: "image",
    title: "SPOKEN WORD & DIALOGUE ARENA",
    tag: "LITERARY CONCLAVE",
    code: "10♦",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #8B1E24 0%, #2B090C 100%)",
    overlayTop: "SEVILLA",
    suitWatermark: "♣",
  },
  {
    id: "gal-12",
    row: 2,
    type: "image",
    title: "DECK OF DESTINIES CORONATION",
    tag: "CLOSING CEREMONY",
    code: "K♥",
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
    fallbackGradient: "linear-gradient(135deg, #E65C19 0%, #8B1E24 100%)",
    overlayTop: "DESTINY",
    suitWatermark: "♥",
  },
];

/* ==========================================================================
   3. SPREAD ROW MEDIA TILE WITH 3D HOVER TILT
   ========================================================================== */
interface TileProps {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
}

function SpreadRowMediaTile({ item, onOpen }: TileProps) {
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ rx: -ny * 8, ry: nx * 8 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        background: item.fallbackGradient,
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="relative w-[210px] h-[160px] sm:w-[280px] sm:h-[210px] lg:w-[335px] lg:h-[245px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#FFF4E0]/20 hover:border-[#FFAA24] bg-[#0B0B0D] text-left group shadow-[0_14px_34px_rgba(0,0,0,0.65)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
    >
      {/* Media Layer (Video or High-Res Image) */}
      {item.type === "video" && !videoError ? (
        <video
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          autoPlay
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      ) : !imgError ? (
        <img
          src={item.type === "video" ? item.poster || item.src : item.src}
          alt={item.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl text-[#FFF4E0]/20">{item.suitWatermark}</span>
        </div>
      )}

      {/* Atmospheric Ink Gradient Plinth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120E15] via-[#120E15]/30 to-transparent" />

      {/* Top Overlay Badge & Type indicator */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
        <span className="font-display text-lg sm:text-xl tracking-wide text-[#FFF4E0] drop-shadow">
          {item.overlayTop}
        </span>

        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-tech font-bold uppercase tracking-wider ${
            item.type === "video"
              ? "bg-[#E65C19] text-[#FFF4E0]"
              : "bg-[#120E15]/80 text-[#FFAA24] border border-[#FFAA24]/40"
          }`}
        >
          {item.type === "video" ? (
            <>
              <Icon.Play className="w-2.5 h-2.5" />
              <span>VIDEO</span>
            </>
          ) : (
            <>
              <Icon.ImageIcon className="w-2.5 h-2.5" />
              <span>PHOTO</span>
            </>
          )}
        </span>
      </div>

      {/* Bottom Title & Tag */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-3 sm:p-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="font-tech text-[10px] font-bold tracking-widest text-[#FFAA24] uppercase truncate">
            {item.tag}
          </p>
          <h4 className="font-display text-lg sm:text-xl text-[#FFF4E0] leading-tight truncate">
            {item.title}
          </h4>
        </div>
        <span className="font-mono text-xs font-bold text-[#FFF4E0]/75 shrink-0">
          {item.code}
        </span>
      </div>
    </button>
  );
}

/* ==========================================================================
   4. MAIN GALLERY SECTION (GSAP SCROLLTRIGGER SPREAD ROWS + ANIMOS TIMELINE)
   ========================================================================== */
export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [mediaFilter, setMediaFilter] = useState<string>("all");
  const [frameMode, setFrameMode] = useState<"3:4" | "full" | "16:9">("3:4");
  const [scrubberSeconds, setScrubberSeconds] = useState<number>(3.4);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [showKeyframeDetails, setShowKeyframeDetails] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [lightboxMuted, setLightboxMuted] = useState<boolean>(false);

  // Auto-play timeline simulation (smoothly increments scrubber from 0.0s to 8.0s)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = window.setInterval(() => {
      setScrubberSeconds((prev) => {
        const next = prev + 0.05;
        return next > 8.0 ? 0.0 : Number(next.toFixed(2));
      });
    }, 50);
    return () => window.clearInterval(interval);
  }, [isAutoPlaying]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (mediaFilter === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.type === mediaFilter);
  }, [mediaFilter]);

  const rows = useMemo(() => {
    return [
      filteredItems.filter((i) => i.row === 0),
      filteredItems.filter((i) => i.row === 1),
      filteredItems.filter((i) => i.row === 2),
    ];
  }, [filteredItems]);

  // GSAP SCROLLTRIGGER CONTINUOUS SIDE FLOW:
  // Row 0 & 2 slide Left, Row 1 slides Right with scrub: 1
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      if (row0Ref.current) {
        tl.to(row0Ref.current, { x: -380, ease: "none" }, 0);
      }
      if (row1Ref.current) {
        tl.to(row1Ref.current, { x: 380, ease: "none" }, 0);
      }
      if (row2Ref.current) {
        tl.to(row2Ref.current, { x: -380, ease: "none" }, 0);
      }
    },
    { scope: containerRef, dependencies: [filteredItems, frameMode] }
  );

  // Combine timeline scrubber offset with scroll
  const timelineShift = ((scrubberSeconds - 4.0) / 4.0) * 120; // -120px to +120px

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden border-b border-[#8B1E24]/40 z-10 bg-[#120E15]"
    >
      {/* 3D Ambient Studio Grid Background (Inspired by animos.app screenshot) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#FFAA24 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="border-l-2 border-[#FFAA24] pl-4 sm:pl-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B1E24] bg-[#120E15]/80 backdrop-blur-md text-[#FFAA24] font-tech text-xs font-bold tracking-[0.22em] uppercase mb-3">
              <Icon.Sparkles className="w-3.5 h-3.5 text-[#FFAA24]" />
              <span>02 // ARCHIVE &amp; MOTION REELS</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#FFF4E0] leading-none uppercase tracking-tight">
              SIDE-FLOWING{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA24] via-[#E65C19] to-[#FFF4E0]">
                GALLERY
              </span>
            </h2>

            <p className="mt-3 font-tech text-xs sm:text-sm text-[#FFF4E0]/75 leading-relaxed">
              Experience the visual realm through 3 continuous spread rows. Rows flow in counter-directions with GSAP ScrollTrigger physics and live keyframe scrubbing.
            </p>
          </div>

          {/* Action HUD: Frame Aspect Selector & Media Filters */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            {/* Frame Aspect Presets (from Animos screenshot) */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-[#18121D] border border-[#8B1E24]">
              <span className="px-2 text-[10px] font-mono font-bold text-[#FFAA24] uppercase">FRAME:</span>
              {(["3:4", "full", "16:9"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFrameMode(mode)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    frameMode === mode
                      ? "bg-[#FFAA24] text-[#120E15] shadow-[0_0_12px_rgba(255,170,36,0.4)]"
                      : "text-[#FFF4E0]/70 hover:text-[#FFF4E0]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-[#18121D] border border-[#8B1E24]">
              {[
                { id: "all", label: "ALL (12)" },
                { id: "image", label: "PHOTOS (8)" },
                { id: "video", label: "REELS (4)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMediaFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-tech text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    mediaFilter === tab.id
                      ? "bg-[#FFAA24] text-[#120E15] shadow-[0_0_12px_rgba(255,170,36,0.4)]"
                      : "text-[#FFF4E0]/70 hover:text-[#FFF4E0]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          3D PERSPECTIVE SHOWCASE FRAME (EMBEDDED 3:4 OR EXPANSIVE VIEW)
          ==================================================================== */}
      <div
        className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          frameMode === "3:4"
            ? "max-w-5xl rounded-[36px] bg-[#15101A]/90 p-4 sm:p-7 border-2 border-[#8B1E24] shadow-[0_25px_80px_rgba(0,0,0,0.85)] [perspective:1400px]"
            : frameMode === "16:9"
            ? "max-w-6xl rounded-3xl bg-[#15101A]/70 p-4 border border-[#8B1E24]"
            : "w-full px-0"
        }`}
      >
        <div className="space-y-4 sm:space-y-5 overflow-hidden py-3">
          {/* ROW 0: Flows Left */}
          {rows[0].length > 0 && (
            <div className="w-full overflow-hidden">
              <div
                ref={row0Ref}
                style={{
                  transform: `translate3d(${-timelineShift}px, 0, 0)`,
                  transition: "transform 0.12s linear",
                }}
                className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
              >
                {[...rows[0], ...rows[0]].map((item, idx) => (
                  <SpreadRowMediaTile
                    key={`${item.id}-${idx}`}
                    item={item}
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ROW 1: Flows Right (Opposite Contra-Flow Direction) */}
          {rows[1].length > 0 && (
            <div className="w-full overflow-hidden">
              <div
                ref={row1Ref}
                style={{
                  transform: `translate3d(${timelineShift}px, 0, 0)`,
                  transition: "transform 0.12s linear",
                }}
                className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
              >
                {[...rows[1], ...rows[1]].map((item, idx) => (
                  <SpreadRowMediaTile
                    key={`${item.id}-${idx}`}
                    item={item}
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ROW 2: Flows Left */}
          {rows[2].length > 0 && (
            <div className="w-full overflow-hidden">
              <div
                ref={row2Ref}
                style={{
                  transform: `translate3d(${-timelineShift * 0.9}px, 0, 0)`,
                  transition: "transform 0.12s linear",
                }}
                className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
              >
                {[...rows[2], ...rows[2]].map((item, idx) => (
                  <SpreadRowMediaTile
                    key={`${item.id}-${idx}`}
                    item={item}
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====================================================================
          ANIMOS-INSPIRED KEYFRAME TIMELINE SCRUBBER
          ==================================================================== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 mt-10">
        <div className="rounded-2xl bg-[#18121D]/95 backdrop-blur-md border border-[#FFF4E0]/15 p-3.5 sm:p-4 shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between gap-2 mb-2.5 text-xs font-mono text-[#FFF4E0]/80">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowKeyframeDetails((d) => !d)}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#120E15] border border-[#FFAA24]/40 text-[#FFAA24] font-bold tracking-wider uppercase text-[10px] hover:border-[#FFAA24] cursor-pointer"
              >
                <Icon.Sliders className="w-3 h-3" />
                <span>KEYFRAMES {showKeyframeDetails ? "▾" : "▴"}</span>
              </button>
              <span className="text-[#FFF4E0]/30 hidden sm:inline">|</span>
              <span className="text-[#FFAA24] font-semibold hidden sm:inline">
                GSAP // 3D SPREAD MOTION
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#FFAA24]">{scrubberSeconds.toFixed(1)}s</span>
              <span className="text-[#FFF4E0]/40">/</span>
              <span>8.0s</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying((p) => !p)}
              aria-label={isAutoPlaying ? "Pause timeline" : "Play timeline"}
              className="w-9 h-9 rounded-xl bg-[#8B1E24] hover:bg-[#E65C19] text-[#FFF4E0] flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-md"
            >
              {isAutoPlaying ? (
                <Icon.Pause className="w-4 h-4" />
              ) : (
                <Icon.Play className="w-4 h-4" />
              )}
            </button>

            {/* Range Scrubber Bar */}
            <input
              type="range"
              min={0}
              max={8}
              step={0.05}
              value={scrubberSeconds}
              onChange={(e) => {
                setIsAutoPlaying(false);
                setScrubberSeconds(parseFloat(e.target.value));
              }}
              aria-label="Gallery spread rows timeline scrubber"
              className="w-full h-2 bg-[#120E15] rounded-lg cursor-pointer accent-[#FFAA24]"
            />
          </div>

          {/* Collapsible Keyframe Info Panel */}
          {showKeyframeDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-[#FFF4E0]/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-[#FFF4E0]/70"
            >
              <div>KF 01: 0.0s [CONCLAVE]</div>
              <div>KF 02: 2.4s [SAHOTSAVA]</div>
              <div>KF 03: 5.2s [CYPHER]</div>
              <div>KF 04: 8.0s [CORONATION]</div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ====================================================================
          HD LIGHTBOX MODAL WITH FULL VIDEO / PHOTO INSPECTOR
          ==================================================================== */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#120E15]/90 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#18121D] border-2 border-[#FFAA24] shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#120E15] border-b border-[#FFF4E0]/10">
                <div>
                  <span className="font-tech text-[10px] font-bold tracking-widest text-[#FFAA24] uppercase">
                    {selectedMedia.tag} // SLOT {selectedMedia.code}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#FFF4E0] leading-none">
                    {selectedMedia.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {selectedMedia.type === "video" && (
                    <button
                      type="button"
                      onClick={() => setLightboxMuted((m) => !m)}
                      aria-label={lightboxMuted ? "Unmute video" : "Mute video"}
                      className="w-10 h-10 rounded-xl bg-[#18121D] border border-[#FFF4E0]/20 text-[#FFF4E0] flex items-center justify-center hover:border-[#FFAA24] cursor-pointer"
                    >
                      {lightboxMuted ? (
                        <Icon.VolumeX className="w-4 h-4 text-[#E65C19]" />
                      ) : (
                        <Icon.Volume2 className="w-4 h-4 text-[#FFAA24]" />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedMedia(null)}
                    aria-label="Close lightbox"
                    className="w-10 h-10 rounded-xl bg-[#8B1E24] hover:bg-[#E65C19] text-[#FFF4E0] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Icon.X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Media Canvas */}
              <div
                style={{ background: selectedMedia.fallbackGradient }}
                className="relative aspect-video w-full bg-[#0B0B0D] flex items-center justify-center"
              >
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.src}
                    poster={selectedMedia.poster}
                    controls
                    autoPlay
                    loop
                    muted={lightboxMuted}
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
