"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
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
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [lightboxMuted, setLightboxMuted] = useState<boolean>(false);

  // Group items into 3 rows
  const rows = useMemo(() => {
    return [
      GALLERY_ITEMS.filter((i) => i.row === 0),
      GALLERY_ITEMS.filter((i) => i.row === 1),
      GALLERY_ITEMS.filter((i) => i.row === 2),
    ];
  }, []);

  // Duplicate items 4x per row so -50% translation provides a completely seamless, infinite loop
  const repeatedRow0 = useMemo(() => [...rows[0], ...rows[0], ...rows[0], ...rows[0]], [rows]);
  const repeatedRow1 = useMemo(() => [...rows[1], ...rows[1], ...rows[1], ...rows[1]], [rows]);
  const repeatedRow2 = useMemo(() => [...rows[2], ...rows[2], ...rows[2], ...rows[2]], [rows]);

  // CONTINUOUS AUTONOMOUS GSAP MARQUEE:
  // Completely independent of page scroll position!
  // Row 0 & 2 glide Left, Row 1 glides Right with independent speeds
  useGSAP(
    () => {
      // Clean up previous tweens before recreating
      tweensRef.current.forEach((t) => t.kill());
      tweensRef.current = [];

      if (!row0Ref.current || !row1Ref.current || !row2Ref.current) return;

      // Set initial starting positions
      gsap.set(row0Ref.current, { xPercent: 0 });
      gsap.set(row1Ref.current, { xPercent: -50 });
      gsap.set(row2Ref.current, { xPercent: 0 });

      // Row 0: Continuous flow Left
      const t0 = gsap.to(row0Ref.current, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });

      // Row 1: Continuous flow Right (contra-flow)
      const t1 = gsap.fromTo(
        row1Ref.current,
        { xPercent: -50 },
        { xPercent: 0, duration: 44, ease: "none", repeat: -1 }
      );

      // Row 2: Continuous flow Left
      const t2 = gsap.to(row2Ref.current, {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
      });

      tweensRef.current = [t0, t1, t2];

      return () => {
        t0.kill();
        t1.kill();
        t2.kill();
      };
    },
    { scope: containerRef }
  );

  // Soft hover velocity dampening so users can comfortably click cards
  const handleMouseEnter = useCallback(() => {
    tweensRef.current.forEach((t) => {
      gsap.to(t, { timeScale: 0.25, duration: 0.4 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    tweensRef.current.forEach((t) => {
      gsap.to(t, { timeScale: 1.0, duration: 0.4 });
    });
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden z-10 bg-[#120E15] border-b border-[#8B1E24]/40"
    >
      {/* 3D Ambient Studio Grid Background */}
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
        <div className="max-w-2xl">
         

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#FFF4E0] leading-none uppercase tracking-tight">
            GALLERY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA24] via-[#E65C19] to-[#FFF4E0]">
              SECTION
            </span>
          </h2>

          <p className="mt-3 font-tech text-xs sm:text-sm text-[#FFF4E0]/75 leading-relaxed">
            Experience the visual realm through 3 continuous spread rows flowing autonomously at independent speeds, completely free of scroll position.
          </p>
        </div>
      </div>

      {/* ====================================================================
          FULL-WIDTH EDGE-TO-EDGE SPREAD ROWS (100% SCREEN VIEWPORT)
          ==================================================================== */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden"
      >
        {/* Subtle Edge Vignettes to elegantly blend cards into screen edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#120E15] to-transparent z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#120E15] to-transparent z-20"
        />

        <div className="space-y-4 sm:space-y-6 overflow-hidden py-3">
          {/* ROW 0: Continuous Flow Left */}
          {rows[0].length > 0 && (
            <div className="w-full overflow-hidden">
              <div
                ref={row0Ref}
                className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
              >
                {repeatedRow0.map((item, idx) => (
                  <SpreadRowMediaTile
                    key={`r0-${item.id}-${idx}`}
                    item={item}
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ROW 1: Continuous Flow Right (Contra-Flow) */}
          {rows[1].length > 0 && (
            <div className="w-full overflow-hidden">
              <div
                ref={row1Ref}
                className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
              >
                {repeatedRow1.map((item, idx) => (
                  <SpreadRowMediaTile
                    key={`r1-${item.id}-${idx}`}
                    item={item}
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ROW 2: Continuous Flow Left */}
          {rows[2].length > 0 && (
            <div className="w-full overflow-hidden">
              <div
                ref={row2Ref}
                className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
              >
                {repeatedRow2.map((item, idx) => (
                  <SpreadRowMediaTile
                    key={`r2-${item.id}-${idx}`}
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
