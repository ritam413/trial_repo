"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLUBS_DATA, ClubItem, ClubPhoto } from "@/lib/clubsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   INLINE VECTOR ICONS
   ========================================================================== */
const Icon = {
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronLeft: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
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
  Layers: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Rows: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  Columns: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
};

/* ==========================================================================
   INDIVIDUAL CLUB EXPANDED THEMES (Distinct Background Color per Club)
   ========================================================================== */
interface ClubExpandedTheme {
  bg: string;
  gradient: string;
  border: string;
  glow: string;
  ambient: string;
  badgeBg: string;
}

const CLUB_EXPANDED_THEMES: Record<string, ClubExpandedTheme> = {
  // 01: ARITRAM (Dramatics & Theatre - Crimson Wine Noir)
  aritram: {
    bg: "#150607",
    gradient: "linear-gradient(180deg, #2A090D 0%, #170507 45%, #0B0203 100%)",
    border: "rgba(232, 80, 42, 0.45)",
    glow: "rgba(232, 80, 42, 0.35)",
    ambient: "#E8502A",
    badgeBg: "rgba(232, 80, 42, 0.2)",
  },
  dramatics: {
    bg: "#150607",
    gradient: "linear-gradient(180deg, #2A090D 0%, #170507 45%, #0B0203 100%)",
    border: "rgba(232, 80, 42, 0.45)",
    glow: "rgba(232, 80, 42, 0.35)",
    ambient: "#E8502A",
    badgeBg: "rgba(232, 80, 42, 0.2)",
  },
  // 02: CHITRAKATHA DESIGNING & EDITING (Digital Design & VFX - Cyber Cyan Navy)
  "chitrakatha-design": {
    bg: "#04121F",
    gradient: "linear-gradient(180deg, #07223D 0%, #04121F 45%, #02070F 100%)",
    border: "rgba(56, 189, 248, 0.45)",
    glow: "rgba(56, 189, 248, 0.35)",
    ambient: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.2)",
  },
  "chitraka-design": {
    bg: "#04121F",
    gradient: "linear-gradient(180deg, #07223D 0%, #04121F 45%, #02070F 100%)",
    border: "rgba(56, 189, 248, 0.45)",
    glow: "rgba(56, 189, 248, 0.35)",
    ambient: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.2)",
  },
  // 03: CHITRAKATHA PHOTOGRAPHY (Photography & Media - Darkroom Amber Gold)
  "chitrakatha-photography": {
    bg: "#180D03",
    gradient: "linear-gradient(180deg, #2B1804 0%, #180D03 45%, #0A0501 100%)",
    border: "rgba(245, 158, 11, 0.45)",
    glow: "rgba(245, 158, 11, 0.35)",
    ambient: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.2)",
  },
  "chitraka-photography": {
    bg: "#180D03",
    gradient: "linear-gradient(180deg, #2B1804 0%, #180D03 45%, #0A0501 100%)",
    border: "rgba(245, 158, 11, 0.45)",
    glow: "rgba(245, 158, 11, 0.35)",
    ambient: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.2)",
  },
  // 04: CHITRAKATHA ART AND CRAFT (Fine Arts & Sculpture - Twilight Lavender)
  "chitrakatha-art": {
    bg: "#0E0A1E",
    gradient: "linear-gradient(180deg, #1C123B 0%, #0D081B 45%, #06040F 100%)",
    border: "rgba(185, 172, 240, 0.45)",
    glow: "rgba(185, 172, 240, 0.35)",
    ambient: "#B9ACF0",
    badgeBg: "rgba(185, 172, 240, 0.2)",
  },
  "chitraka-art": {
    bg: "#0E0A1E",
    gradient: "linear-gradient(180deg, #1C123B 0%, #0D081B 45%, #06040F 100%)",
    border: "rgba(185, 172, 240, 0.45)",
    glow: "rgba(185, 172, 240, 0.35)",
    ambient: "#B9ACF0",
    badgeBg: "rgba(185, 172, 240, 0.2)",
  },
  "fine-arts": {
    bg: "#0E0A1E",
    gradient: "linear-gradient(180deg, #1C123B 0%, #0D081B 45%, #06040F 100%)",
    border: "rgba(185, 172, 240, 0.45)",
    glow: "rgba(185, 172, 240, 0.35)",
    ambient: "#B9ACF0",
    badgeBg: "rgba(185, 172, 240, 0.2)",
  },
  // 05: CHITRAKATHA (Creative Arts Atelier - Midnight Fuchsia Velvet)
  chitrakatha: {
    bg: "#190514",
    gradient: "linear-gradient(180deg, #2E0724 0%, #190514 45%, #0C020A 100%)",
    border: "rgba(236, 72, 153, 0.45)",
    glow: "rgba(236, 72, 153, 0.35)",
    ambient: "#EC4899",
    badgeBg: "rgba(236, 72, 153, 0.2)",
  },
  chitraka: {
    bg: "#190514",
    gradient: "linear-gradient(180deg, #2E0724 0%, #190514 45%, #0C020A 100%)",
    border: "rgba(236, 72, 153, 0.45)",
    glow: "rgba(236, 72, 153, 0.35)",
    ambient: "#EC4899",
    badgeBg: "rgba(236, 72, 153, 0.2)",
  },
  // 06: CHECKMATE (Chess & Strategy - Platinum Slate Noir)
  checkmate: {
    bg: "#0B0F15",
    gradient: "linear-gradient(180deg, #161D26 0%, #0B0F15 45%, #05070B 100%)",
    border: "rgba(148, 163, 184, 0.45)",
    glow: "rgba(148, 163, 184, 0.35)",
    ambient: "#94A3B8",
    badgeBg: "rgba(148, 163, 184, 0.2)",
  },
  // 07: DHRUBOTARA (Astronomy & Science - Cosmic Deep Indigo)
  dhrubotara: {
    bg: "#07081B",
    gradient: "linear-gradient(180deg, #12143B 0%, #07081B 45%, #03040E 100%)",
    border: "rgba(129, 140, 248, 0.45)",
    glow: "rgba(129, 140, 248, 0.35)",
    ambient: "#818CF8",
    badgeBg: "rgba(129, 140, 248, 0.2)",
  },
  // 08: NRITAKSHA (Dance Troupe - Midnight Ruby Velvet)
  nritaksha: {
    bg: "#1A0512",
    gradient: "linear-gradient(180deg, #2E0720 0%, #170410 45%, #0B0207 100%)",
    border: "rgba(244, 63, 94, 0.45)",
    glow: "rgba(244, 63, 94, 0.35)",
    ambient: "#F43F5E",
    badgeBg: "rgba(244, 63, 94, 0.2)",
  },
  dance: {
    bg: "#1A0512",
    gradient: "linear-gradient(180deg, #2E0720 0%, #170410 45%, #0B0207 100%)",
    border: "rgba(244, 63, 94, 0.45)",
    glow: "rgba(244, 63, 94, 0.35)",
    ambient: "#F43F5E",
    badgeBg: "rgba(244, 63, 94, 0.2)",
  },
  // 09: PAPERBACK SOCIETY (Literature & Debate - Vintage Sepia Ochre)
  "paperback-society": {
    bg: "#1A0F03",
    gradient: "linear-gradient(180deg, #2E1905 0%, #170D02 45%, #0C0601 100%)",
    border: "rgba(251, 191, 36, 0.45)",
    glow: "rgba(251, 191, 36, 0.35)",
    ambient: "#FBBF24",
    badgeBg: "rgba(251, 191, 36, 0.2)",
  },
  literary: {
    bg: "#1A0F03",
    gradient: "linear-gradient(180deg, #2E1905 0%, #170D02 45%, #0C0601 100%)",
    border: "rgba(245, 158, 11, 0.45)",
    glow: "rgba(245, 158, 11, 0.35)",
    ambient: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.2)",
  },
  // 10: PHOENIX (Tech & Gaming - Cyber Flame Neon)
  phoenix: {
    bg: "#180603",
    gradient: "linear-gradient(180deg, #300C06 0%, #180603 45%, #0A0201 100%)",
    border: "rgba(255, 87, 34, 0.45)",
    glow: "rgba(255, 87, 34, 0.35)",
    ambient: "#FF5722",
    badgeBg: "rgba(255, 87, 34, 0.2)",
  },
  pheonix: {
    bg: "#180603",
    gradient: "linear-gradient(180deg, #300C06 0%, #180603 45%, #0A0201 100%)",
    border: "rgba(255, 87, 34, 0.45)",
    glow: "rgba(255, 87, 34, 0.35)",
    ambient: "#FF5722",
    badgeBg: "rgba(255, 87, 34, 0.2)",
  },
  // 11: SWARAKRITI (Music Society - Solar Amber Gold)
  swarakriti: {
    bg: "#160E03",
    gradient: "linear-gradient(180deg, #2A1804 0%, #150C02 45%, #0A0601 100%)",
    border: "rgba(234, 179, 8, 0.45)",
    glow: "rgba(234, 179, 8, 0.35)",
    ambient: "#EAB308",
    badgeBg: "rgba(234, 179, 8, 0.2)",
  },
  music: {
    bg: "#160E03",
    gradient: "linear-gradient(180deg, #2A1804 0%, #150C02 45%, #0A0601 100%)",
    border: "rgba(255, 170, 36, 0.45)",
    glow: "rgba(255, 170, 36, 0.35)",
    ambient: "#FFAA24",
    badgeBg: "rgba(255, 170, 36, 0.2)",
  },
  // 12: STEP ALPHA (Urban Hip-Hop & Street - Emerald Street Jade)
  "step-alpha": {
    bg: "#03170E",
    gradient: "linear-gradient(180deg, #062B1A 0%, #03170E 45%, #010B07 100%)",
    border: "rgba(16, 185, 129, 0.45)",
    glow: "rgba(16, 185, 129, 0.35)",
    ambient: "#10B981",
    badgeBg: "rgba(16, 185, 129, 0.2)",
  },
  // 13: DESI GROOVER (Bollywood & Folk Dance - Saffron Tangerine Noir)
  "desi-groover": {
    bg: "#1A0B03",
    gradient: "linear-gradient(180deg, #2E1405 0%, #1A0B03 45%, #0C0501 100%)",
    border: "rgba(249, 115, 22, 0.45)",
    glow: "rgba(249, 115, 22, 0.35)",
    ambient: "#F97316",
    badgeBg: "rgba(249, 115, 22, 0.2)",
  },
  // 14: BEAT BUSTER (Beatbox, Rap & Acoustic - Electric Cyan Teal)
  "beat-buster": {
    bg: "#031418",
    gradient: "linear-gradient(180deg, #05272F 0%, #031418 45%, #010A0C 100%)",
    border: "rgba(6, 182, 212, 0.45)",
    glow: "rgba(6, 182, 212, 0.35)",
    ambient: "#06B6D4",
    badgeBg: "rgba(6, 182, 212, 0.2)",
  },
  fashion: {
    bg: "#041611",
    gradient: "linear-gradient(180deg, #072B21 0%, #041611 45%, #020A08 100%)",
    border: "rgba(52, 211, 153, 0.45)",
    glow: "rgba(52, 211, 153, 0.35)",
    ambient: "#34D399",
    badgeBg: "rgba(52, 211, 153, 0.2)",
  },
  cinematography: {
    bg: "#040F1F",
    gradient: "linear-gradient(180deg, #071E3D 0%, #040E1E 45%, #02060F 100%)",
    border: "rgba(59, 130, 246, 0.45)",
    glow: "rgba(59, 130, 246, 0.35)",
    ambient: "#3B82F6",
    badgeBg: "rgba(59, 130, 246, 0.2)",
  },
};

const DEFAULT_EXPANDED_THEME: ClubExpandedTheme = {
  bg: "#090812",
  gradient: "linear-gradient(180deg, #151322 0%, #090812 50%, #040308 100%)",
  border: "rgba(255, 255, 255, 0.15)",
  glow: "rgba(185, 172, 240, 0.25)",
  ambient: "#B9ACF0",
  badgeBg: "rgba(255, 255, 255, 0.1)",
};

/* =============================================================================
   INDUSTRIAL FORGED STEEL CHAIN HARDWARE & SUSPENSION RIG (/impeccable)
   ============================================================================= */

function VerticalChainSegment({
  links = 3,
  className = "",
}: {
  links?: number;
  className?: string;
}) {
  const height = links === 4 ? 38 : links === 2 ? 18 : 26;
  const viewBoxHeight = height;

  return (
    <svg
      width="18"
      height={height}
      viewBox={`0 0 18 ${viewBoxHeight}`}
      fill="none"
      className={`overflow-visible filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Steel Link Gradient (Front-facing oval link) */}
        <linearGradient id="forgedSteelFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="25%" stopColor="#475569" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Side-Profile Interlocking Link Gradient */}
        <linearGradient id="forgedSteelSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="30%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="75%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Specular Highlight */}
        <linearGradient id="linkGleam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {links === 4 ? (
        <>
          {/* Link 1 (Front oval) */}
          <rect x="3.5" y="1" width="11" height="12" rx="4.5" stroke="url(#forgedSteelFront)" strokeWidth="3" />
          <rect x="5.5" y="2.5" width="2" height="4" rx="1" fill="url(#linkGleam)" opacity="0.7" />

          {/* Link 2 (Side profile) */}
          <rect x="7.5" y="8" width="3" height="10" rx="1.5" fill="url(#forgedSteelSide)" stroke="#0f172a" strokeWidth="0.8" />

          {/* Link 3 (Front oval) */}
          <rect x="3.5" y="14" width="11" height="12" rx="4.5" stroke="url(#forgedSteelFront)" strokeWidth="3" />
          <rect x="5.5" y="15.5" width="2" height="4" rx="1" fill="url(#linkGleam)" opacity="0.7" />

          {/* Link 4 (Side profile) */}
          <rect x="7.5" y="21" width="3" height="10" rx="1.5" fill="url(#forgedSteelSide)" stroke="#0f172a" strokeWidth="0.8" />

          {/* Link 5 (Front oval bottom hook) */}
          <rect x="3.5" y="26" width="11" height="11" rx="4.5" stroke="url(#forgedSteelFront)" strokeWidth="3" />
        </>
      ) : links === 2 ? (
        <>
          {/* Link 1 (Front oval) */}
          <rect x="3.5" y="1" width="11" height="11" rx="4.5" stroke="url(#forgedSteelFront)" strokeWidth="3" />
          {/* Link 2 (Side profile) */}
          <rect x="7.5" y="7" width="3" height="9" rx="1.5" fill="url(#forgedSteelSide)" stroke="#0f172a" strokeWidth="0.8" />
        </>
      ) : (
        <>
          {/* Link 1 (Front oval - top) */}
          <rect x="3.5" y="1" width="11" height="12" rx="4.5" stroke="url(#forgedSteelFront)" strokeWidth="3" />
          <rect x="5.5" y="2.5" width="2" height="3" rx="1" fill="url(#linkGleam)" opacity="0.7" />

          {/* Link 2 (Side profile - middle interlock) */}
          <rect x="7.5" y="8" width="3" height="10" rx="1.5" fill="url(#forgedSteelSide)" stroke="#0f172a" strokeWidth="0.8" />

          {/* Link 3 (Front oval - bottom) */}
          <rect x="3.5" y="14" width="11" height="12" rx="4.5" stroke="url(#forgedSteelFront)" strokeWidth="3" />
          <rect x="5.5" y="15.5" width="2" height="3" rx="1" fill="url(#linkGleam)" opacity="0.7" />
        </>
      )}
    </svg>
  );
}

function CardShackle({ position }: { position: "top" | "bottom" }) {
  const isTop = position === "top";
  return (
    <div className="flex flex-col items-center pointer-events-none select-none" aria-hidden="true">
      {isTop ? (
        <>
          {/* Metal D-Ring / Arch looping upward out of the card */}
          <div className="w-4 h-3.5 -mb-0.5 rounded-t-full border-2 border-[#94a3b8] bg-gradient-to-b from-[#64748b] to-[#1e293b] shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-t-full bg-black/70" />
          </div>
          {/* Mounting Base Plate riveted into the card face */}
          <div className="w-4.5 h-2.5 rounded-xs bg-gradient-to-b from-[#334155] to-[#0f172a] border border-[#64748b]/70 shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#cbd5e1] shadow-inner" />
          </div>
        </>
      ) : (
        <>
          {/* Mounting Base Plate riveted into the card face */}
          <div className="w-4.5 h-2.5 rounded-xs bg-gradient-to-b from-[#0f172a] to-[#334155] border border-[#64748b]/70 shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#cbd5e1] shadow-inner" />
          </div>
          {/* Metal D-Ring / Arch looping downward out of the card */}
          <div className="w-4 h-3.5 -mt-0.5 rounded-b-full border-2 border-[#94a3b8] bg-gradient-to-t from-[#64748b] to-[#1e293b] shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-b-full bg-black/70" />
          </div>
        </>
      )}
    </div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeClubIndex, setActiveClubIndex] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    photo: ClubPhoto;
    club: ClubItem;
    photoIndex: number;
  } | null>(null);

  // GSAP Entrance & Physics ScrollTrigger (/gsap-animation)
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Overhead Gantry Reveal
      gsap.fromTo(
        ".overhead-gantry",
        { y: -25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Hanging Slit Blocks Dropping into Chain Tension Stagger
      gsap.fromTo(
        ".chain-card-wrapper",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.035,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation for modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft") {
        const currentClub = selectedPhoto.club;
        const prevIdx =
          (selectedPhoto.photoIndex - 1 + currentClub.images.length) %
          currentClub.images.length;
        setSelectedPhoto({
          photo: currentClub.images[prevIdx],
          club: currentClub,
          photoIndex: prevIdx,
        });
      } else if (e.key === "ArrowRight") {
        const currentClub = selectedPhoto.club;
        const nextIdx = (selectedPhoto.photoIndex + 1) % currentClub.images.length;
        setSelectedPhoto({
          photo: currentClub.images[nextIdx],
          club: currentClub,
          photoIndex: nextIdx,
        });
      }
    },
    [selectedPhoto]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Refresh ScrollTrigger smoothly when an accordion slit opens or closes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 520);
    return () => clearTimeout(timer);
  }, [activeClubIndex]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 bg-[#0d0d0e] border-b border-white/10 overflow-hidden select-none"
    >
      {/* 100% Full-Width Edge-to-Edge Container */}
      <div className="w-full px-2 sm:px-4 md:px-6">
        {/* ====================================================================
            HEADER LOCKUP
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 px-1 sm:px-2">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#EDE8FF] leading-none uppercase tracking-tight">
              GALLERY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDE8FF] via-[#d4c7ff] to-[#714cb6]">
                SECTION
              </span>
            </h2>
          </div>
        </div>

        {/* ====================================================================
            OVERHEAD INDUSTRIAL SUSPENSION GANTRY (CEILING BEAM & TOP CHAINS)
            ==================================================================== */}
        <div className="overhead-gantry relative w-full mb-1 flex flex-col items-center pointer-events-none select-none">
          {/* Overhead Heavy Iron Truss / Gantry Beam */}
          <div className="relative w-full h-3.5 rounded bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 border-y border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.95)] flex items-center justify-between px-6 sm:px-12 md:px-20">
            {/* Structural Rivet Pattern */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none opacity-40">
              <div className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
              </div>
              <div className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
              </div>
            </div>

            {/* Left Ceiling Flange & Shackle */}
            <div className="relative -translate-x-1/2 -bottom-2 z-10 flex flex-col items-center">
              <div className="w-5 h-3 rounded-t bg-gradient-to-b from-zinc-500 to-zinc-800 border border-white/20 shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-inner" />
              </div>
              <div className="w-4 h-3.5 rounded-b-full border-2 border-zinc-400 bg-zinc-900" />
            </div>

            {/* Right Ceiling Flange & Shackle */}
            <div className="relative translate-x-1/2 -bottom-2 z-10 flex flex-col items-center">
              <div className="w-5 h-3 rounded-t bg-gradient-to-b from-zinc-500 to-zinc-800 border border-white/20 shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-inner" />
              </div>
              <div className="w-4 h-3.5 rounded-b-full border-2 border-zinc-400 bg-zinc-900" />
            </div>
          </div>

          {/* Top Hanging Chains (Dropping from Gantry to Card 0) */}
          <div className="relative w-full h-8 sm:h-9">
            <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -top-0.5">
              <VerticalChainSegment links={4} />
            </div>
            <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -top-0.5">
              <VerticalChainSegment links={4} />
            </div>
          </div>
        </div>

        {/* ====================================================================
            FULL-WIDTH VERTICAL STACK SLITS (Suspended by Inter-Block Chains)
            ==================================================================== */}
        <div className="w-full flex flex-col">
          {CLUBS_DATA.map((club, index) => {
            const isExpanded = activeClubIndex === index;
            const theme = CLUB_EXPANDED_THEMES[club.id] || DEFAULT_EXPANDED_THEME;

            return (
              <React.Fragment key={club.id}>
                {/* Connecting Chains from card above to this card */}
                {index > 0 && (
                  <div className="relative w-full h-5 sm:h-6 flex items-center justify-between pointer-events-none select-none z-20 my-[-2px]">
                    <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -top-1">
                      <VerticalChainSegment links={3} />
                    </div>
                    <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -top-1">
                      <VerticalChainSegment links={3} />
                    </div>
                  </div>
                )}

                {/* Card Outer Container with Shackles and Hover Sway */}
                <div
                  className="chain-card-wrapper group relative w-full select-none transform-gpu origin-top transition-transform duration-300"
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      gsap.to(e.currentTarget, {
                        rotation: index % 2 === 0 ? 0.35 : -0.35,
                        y: -2,
                        duration: 0.25,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut",
                        transformOrigin: "center -20px",
                      });
                    }
                  }}
                >
                  {/* Top Shackles */}
                  <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -top-2.5 z-30 pointer-events-none">
                    <CardShackle position="top" />
                  </div>
                  <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -top-2.5 z-30 pointer-events-none">
                    <CardShackle position="top" />
                  </div>

                  {/* The Slit & Accordion Card */}
                  <div
                    className={`relative w-full overflow-hidden rounded-lg sm:rounded-lg border transition-[border-color,box-shadow,transform] duration-300 ${
                      isExpanded ? "cursor-default" : "cursor-pointer hover:border-[#714cb6]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                    }`}
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: isExpanded ? theme.border : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isExpanded
                        ? `0 24px 60px rgba(0,0,0,0.85), 0 0 35px ${theme.glow}`
                        : "0 4px 14px rgba(0,0,0,0.35)",
                    }}
                  >
                {/* -------------------------------------------------------------
                    TOP SLIT BAR HEADER (Always visible as trigger & control)
                    ------------------------------------------------------------- */}
                <div
                  onClick={() => setActiveClubIndex(isExpanded ? null : index)}
                  className={`relative z-10 w-full h-12 sm:h-14 md:h-16 px-4 sm:px-6 flex items-center justify-between select-none cursor-pointer transition-colors duration-200 ${
                    isExpanded ? "border-b border-white/10" : ""
                  }`}
                >
                  {/* Atmospheric Backdrop Slice (Visible when collapsed) */}
                  {!isExpanded && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={club.coverImage}
                        alt={club.name}
                        className="size-full object-cover transition-transform duration-700 opacity-40 group-hover:opacity-60 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/90" />
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 50% 50%, ${club.accentColor} 0%, transparent 75%)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Left: Category Only (Hidden on mobile to eliminate overlap with centered title) */}
                  <div className="hidden sm:flex relative z-10 items-center shrink-0">
                    <span className="font-tech text-[10px] sm:text-xs tracking-widest text-[#B9ACF0]/90 uppercase font-semibold">
                      {club.category}
                    </span>
                  </div>

                  {/* Center: Absolute 100% True-Centered Display Title (Proportional & responsive text sizing in Bebas Neue) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-3 sm:px-16">
                    <p
                      className={`font-display font-slit-editorial text-[13px] sm:text-xl md:text-2xl lg:text-3xl text-[#FFF4E0] tracking-wider uppercase whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                        isExpanded ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      }`}
                    >
                      {club.name}
                    </p>
                  </div>

                  {/* Right: Close Cross Button (When Expanded) - Archives badge removed */}
                  <div className="relative z-10 flex items-center justify-end shrink-0 min-w-[32px] sm:min-w-[40px]">
                    {isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveClubIndex(null);
                        }}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20 shadow-md"
                        aria-label="Close slit"
                      >
                        <Icon.X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    EXPANDED FULL-WIDTH POSTER (Opens downward, closes smoothly)
                    ------------------------------------------------------------- */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`expanded-${club.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                          opacity: { duration: 0.2, ease: "easeIn" },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.35, ease: "easeOut" },
                          },
                        }}
                        exit={{
                          y: -24,
                          opacity: 0,
                          transition: {
                            y: { duration: 0.25, ease: "easeIn" },
                            opacity: { duration: 0.2, ease: "easeIn" },
                          },
                        }}
                        className="relative z-10 w-full flex flex-col p-5 sm:p-8 md:p-10 overflow-hidden"
                        style={{
                          background: theme.gradient,
                        }}
                      >
                        {/* Ambient Backlight Glow matching club accent color */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] rounded-full blur-[110px] opacity-40 transition-colors duration-500"
                          style={{
                            backgroundColor: theme.ambient,
                          }}
                        />

                        {/* Header Lockup (Centered Showcase Title) */}
                        <div className="w-full flex flex-col items-center justify-center text-center">
                          <p className="font-tech text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-[#B9ACF0] mb-1.5 sm:mb-2">
                            {club.category}
                          </p>

                          <h3
                            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-none uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                            style={{ color: club.accentColor }}
                          >
                            {club.name}
                          </h3>

                          <p className="mt-2 sm:mt-2.5 font-serif italic text-xs sm:text-base md:text-lg text-[#FFF4E0]/90 max-w-2xl mx-auto">
                            &ldquo;{club.motto}&rdquo;
                          </p>
                        </div>

                        {/* Thin Divider Line Across Full Width */}
                        <div className="w-full border-t border-white/10 my-6 sm:my-8" />

                        {/* 6 Photo Cards Grid */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                          {club.images.map((photo, photoIdx) => (
                            <div
                              key={photo.id}
                              onClick={() =>
                                setSelectedPhoto({
                                  photo,
                                  club,
                                  photoIndex: photoIdx,
                                })
                              }
                              className="group/img relative aspect-[16/10] rounded-2xl overflow-hidden border-0 border-none bg-[#111019] text-center cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.7)] focus:outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] will-change-transform"
                            >
                              <img
                                src={photo.src}
                                alt={photo.title}
                                loading="lazy"
                                className="size-full object-cover transition-transform duration-500 group-hover/img:scale-106 will-change-transform"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-90 group-hover/img:opacity-95 transition-opacity" />

                              <div className="absolute top-3.5 right-3.5 z-10">
                                <span className="font-mono text-[11px] sm:text-xs font-bold text-white bg-black/80 px-2.5 py-1 rounded-md shadow-md border border-white/10">
                                  {photo.code}
                                </span>
                              </div>

                              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col items-center justify-center text-center">
                                <p className="font-tech text-[10px] sm:text-[11px] font-normal tracking-wider text-[#B9ACF0] uppercase truncate drop-shadow-sm max-w-full">
                                  {photo.tag}
                                </p>
                                <h4 className="font-sans text-xs sm:text-sm md:text-base text-[#FFF4E0] font-normal leading-tight mt-1 tracking-normal truncate drop-shadow-md max-w-full">
                                  {photo.title}
                                </h4>
                              </div>

                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40">
                                <Icon.Maximize2 className="w-6 h-6 text-[#FFAA24] drop-shadow-md" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Mounting Shackles */}
              <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -bottom-2.5 z-30 pointer-events-none">
                <CardShackle position="bottom" />
              </div>
              <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -bottom-2.5 z-30 pointer-events-none">
                <CardShackle position="bottom" />
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>

    {/* ====================================================================
        BOTTOM TERMINAL COUNTERWEIGHT RIG (DANGLING END CHAINS & ANCHORS)
        ==================================================================== */}
    <div className="relative w-full h-8 mt-1 pointer-events-none select-none">
      <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 top-0 flex flex-col items-center">
        <VerticalChainSegment links={2} />
        <div className="w-3.5 h-5 -mt-0.5 rounded-b-full bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.9)] flex items-center justify-center">
          <div className="w-1.5 h-2 rounded-full bg-zinc-400/40" />
        </div>
      </div>

      <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 top-0 flex flex-col items-center">
        <VerticalChainSegment links={2} />
        <div className="w-3.5 h-5 -mt-0.5 rounded-b-full bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.9)] flex items-center justify-center">
          <div className="w-1.5 h-2 rounded-full bg-zinc-400/40" />
        </div>
      </div>
    </div>
  </div>

      {/* ====================================================================
          HD LIGHTBOX MODAL WITH FULL PHOTOGRAPH INSPECTOR
          ==================================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0914] border-0 border-none shadow-[0_24px_80px_rgba(0,0,0,0.95)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#05040A]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[#FFAA24]">
                    <Icon.Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="font-tech text-[10px] font-medium tracking-widest text-[#B9ACF0] uppercase">
                      {selectedPhoto.club.category} // {selectedPhoto.photo.code}
                    </span>
                    <h3 className="font-sans text-base sm:text-xl text-[#FFF4E0] font-normal leading-snug mt-0.5">
                      {selectedPhoto.photo.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-white/60 bg-black/60 px-2.5 py-1 rounded-md hidden sm:inline-block">
                    IMAGE {selectedPhoto.photoIndex + 1} OF{" "}
                    {selectedPhoto.club.images.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    aria-label="Close modal"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#EDE8FF] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Icon.X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Photo Canvas */}
              <div className="relative aspect-[16/10] sm:aspect-video w-full bg-[#050508] flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.photo.src}
                  alt={selectedPhoto.photo.title}
                  className="w-full h-full object-contain select-none"
                />

                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    const currentClub = selectedPhoto.club;
                    const prevIdx =
                      (selectedPhoto.photoIndex - 1 + currentClub.images.length) %
                      currentClub.images.length;
                    setSelectedPhoto({
                      photo: currentClub.images[prevIdx],
                      club: currentClub,
                      photoIndex: prevIdx,
                    });
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#FFAA24] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-sm"
                >
                  <Icon.ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    const currentClub = selectedPhoto.club;
                    const nextIdx =
                      (selectedPhoto.photoIndex + 1) % currentClub.images.length;
                    setSelectedPhoto({
                      photo: currentClub.images[nextIdx],
                      club: currentClub,
                      photoIndex: nextIdx,
                    });
                  }}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#FFAA24] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-sm"
                >
                  <Icon.ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Footer Narrative */}
              <div className="p-4 sm:p-5 bg-[#06050C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="max-w-xl">
                  <p className="font-tech text-xs text-[#B9ACF0] uppercase font-bold tracking-wider">
                    {selectedPhoto.photo.tag}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#EDE8FF]/80 leading-relaxed font-tech">
                    {selectedPhoto.photo.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const currentClub = selectedPhoto.club;
                      const prevIdx =
                        (selectedPhoto.photoIndex - 1 + currentClub.images.length) %
                        currentClub.images.length;
                      setSelectedPhoto({
                        photo: currentClub.images[prevIdx],
                        club: currentClub,
                        photoIndex: prevIdx,
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#141220] hover:bg-[#FFAA24] hover:text-black text-white font-mono text-xs transition-colors cursor-pointer"
                  >
                    ← PREV
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const currentClub = selectedPhoto.club;
                      const nextIdx =
                        (selectedPhoto.photoIndex + 1) % currentClub.images.length;
                      setSelectedPhoto({
                        photo: currentClub.images[nextIdx],
                        club: currentClub,
                        photoIndex: nextIdx,
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#141220] hover:bg-[#FFAA24] hover:text-black text-white font-mono text-xs transition-colors cursor-pointer"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
