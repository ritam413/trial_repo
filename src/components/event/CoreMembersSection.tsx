"use client";

import React, { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ==========================================================================
   1. VECTOR ICONS (SELF-CONTAINED & CRISP)
   ========================================================================== */
const Icon = {
  RotateCw: ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Shuffle: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  ),
  Crown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  Layers: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

/* ==========================================================================
   2. CORE MEMBERS DATA ARCHITECTURE
   ========================================================================== */
export type DesignVariant = "crimson-vanguard" | "checkered-sovereign" | "cyber-horizon";

export interface CoreMember {
  id: string;
  name: string;
  role: string;
  vertical: string;
  designVariant: DesignVariant;
  archetype: string;
  quote: string;
  year: string;
}

export const CORE_MEMBERS: CoreMember[] = [
  {
    id: "cm-01",
    name: "KABIR VERMA",
    role: "FESTIVAL SECRETARY",
    vertical: "EXECUTIVE COUNCIL",
    designVariant: "crimson-vanguard",
    archetype: "THE CRIMSON VANGUARD",
    quote: "Every initiative we spearhead represents an unfiltered student voice ready to ignite the campus.",
    year: "FINAL YEAR // B.TECH",
  },
  {
    id: "cm-02",
    name: "MEERA SHARMA",
    role: "HEAD OF CURATION",
    vertical: "SANSKARAN CONCLAVE",
    designVariant: "checkered-sovereign",
    archetype: "SOVEREIGN OF CULTURE",
    quote: "Heritage is not static—it is a living court of ideas, art, and intellectual dialogue.",
    year: "THIRD YEAR // DESIGN",
  },
  {
    id: "cm-03",
    name: "ROHAN KAPOOR",
    role: "TECHNICAL & 3D LEAD",
    vertical: "DIGITAL ARCHITECTURE",
    designVariant: "cyber-horizon",
    archetype: "ARCHITECT OF THE HORIZON",
    quote: "Where Swiss typographic discipline collides with obsidian-and-amber spectacle.",
    year: "FINAL YEAR // CSE",
  },
  {
    id: "cm-04",
    name: "TARA MENON",
    role: "CREATIVE DIRECTOR",
    vertical: "SCENOGRAPHY & PRINT",
    designVariant: "crimson-vanguard",
    archetype: "KEEPER OF THE EMBERS",
    quote: "We transform open-air plazas into a surreal corridor of monumental installations and light.",
    year: "THIRD YEAR // ARCH",
  },
  {
    id: "cm-05",
    name: "DEVANSH NAIR",
    role: "EVENTS & PRODUCTION",
    vertical: "SAHOTSAVA ARENA",
    designVariant: "checkered-sovereign",
    archetype: "MASTER OF CEREMONIES",
    quote: "Forty-five events, seventy-two hours, one shared heartbeat across the entire university.",
    year: "FINAL YEAR // MECH",
  },
  {
    id: "cm-06",
    name: "ZOYA SIDDIQUI",
    role: "ALLIANCES & OUTREACH",
    vertical: "EXTERNAL RELATIONS",
    designVariant: "cyber-horizon",
    archetype: "CATALYST OF SYNERGY",
    quote: "Connecting student visionaries with artists, thinkers, and patrons across the country.",
    year: "THIRD YEAR // MGMT",
  },
];

/* ==========================================================================
   3. REFERENCE PLAYING CARD ARTWORKS (CRISP SCALABLE SVG)
   ========================================================================== */
function ReferenceCardArtwork({ variant }: { variant: DesignVariant }) {
  if (variant === "crimson-vanguard") {
    return (
      <svg viewBox="0 0 240 300" className="w-full h-full" aria-hidden="true">
        <rect width="240" height="300" fill="#FFF4E0" />
        {/* Geometric Corner Diamonds */}
        <polygon points="120,38 134,56 120,74 106,56" fill="#E65C19" />
        <polygon points="168,78 184,98 168,118 152,98" fill="#8B1E24" />
        <polygon points="62,118 76,136 62,154 48,136" fill="#E65C19" />
        <polygon points="178,150 190,166 178,182 166,166" fill="#FFAA24" />
        
        {/* Central Geometric Figure & Spearhead Motif */}
        <g transform="translate(22, 24)">
          <polygon
            points="44,195 72,135 124,122 156,82 176,94 162,132 146,168 172,216 154,224 130,182 94,186 68,228 50,220"
            fill="#8B1E24"
          />
          <polygon points="72,135 124,122 108,158 64,162" fill="#B8252E" />
          <polygon points="124,122 156,82 162,132 132,146" fill="#E65C19" />
          <polygon points="92,126 102,74 118,78 112,126" fill="#120E15" />
          <circle cx="109" cy="62" r="9" fill="#8B1E24" />
          <line x1="84" y1="52" x2="152" y2="232" stroke="#E65C19" strokeWidth="4" strokeLinecap="round" />
          <path d="M 66 226 Q 98 244 128 224 T 164 232" fill="none" stroke="#8B1E24" strokeWidth="3" />
        </g>
      </svg>
    );
  }

  if (variant === "checkered-sovereign") {
    return (
      <svg viewBox="0 0 240 300" className="w-full h-full" aria-hidden="true">
        <rect width="240" height="300" fill="#FFF4E0" />
        {/* Isometric Checkered Court Grid */}
        <g transform="translate(120, 150)">
          {[-3, -2, -1, 0, 1, 2].map((gx) =>
            [-3, -2, -1, 0, 1, 2].map((gy) => {
              const isCrimson = (gx + gy) % 2 === 0;
              const isoX = (gx - gy) * 28;
              const isoY = (gx + gy) * 16;
              return (
                <polygon
                  key={`${gx}-${gy}`}
                  points={`${isoX},${isoY - 16} ${isoX + 28},${isoY} ${isoX},${isoY + 16} ${isoX - 28},${isoY}`}
                  fill={isCrimson ? "#8B1E24" : "#FFF4E0"}
                  stroke="#8B1E24"
                  strokeWidth="0.8"
                />
              );
            })
          )}
        </g>
        {/* Sovereign Chess Queen / Royal Crown Silhouette */}
        <g transform="translate(52, 74)">
          <ellipse cx="18" cy="36" rx="11" ry="18" fill="#120E15" />
          <circle cx="18" cy="15" r="9" fill="#120E15" />
          <polygon points="10,10 13,1 17,9" fill="#120E15" />
          <polygon points="19,9 23,1 26,10" fill="#120E15" />
        </g>
        <g transform="translate(120, 148)">
          <ellipse cx="0" cy="46" rx="28" ry="10" fill="#120E15" />
          <path d="M -20,42 L -11,-28 L 11,-28 L 20,42 Z" fill="#120E15" stroke="#FFAA24" strokeWidth="2" />
          <rect x="-15" y="-34" width="30" height="7" rx="3" fill="#8B1E24" />
          <circle cx="0" cy="-46" r="11" fill="#120E15" stroke="#FFAA24" strokeWidth="2" />
          <polygon points="-6,-56 0,-68 6,-56" fill="#FFAA24" />
        </g>
        <polygon points="68,195 82,195 75,165" fill="#E65C19" />
        <polygon points="158,185 172,185 165,155" fill="#E65C19" />
      </svg>
    );
  }

  // cyber-horizon
  return (
    <svg viewBox="0 0 240 300" className="w-full h-full" aria-hidden="true">
      <rect x="0" y="0" width="240" height="150" fill="#FFF4E0" />
      <rect x="0" y="150" width="240" height="150" fill="#120E15" />
      <line x1="22" y1="24" x2="218" y2="24" stroke="#120E15" strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="276" x2="218" y2="276" stroke="#FFAA24" strokeWidth="1" opacity="0.45" />
      <line x1="0" y1="150" x2="240" y2="150" stroke="#E65C19" strokeWidth="2" />
      <defs>
        <radialGradient id="cyberHorizonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA24" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#E65C19" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8B1E24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="150" r="68" fill="url(#cyberHorizonGlow)" />
      <ellipse cx="120" cy="150" rx="74" ry="22" fill="none" stroke="#FFAA24" strokeWidth="3.5" />
      <ellipse cx="120" cy="150" rx="58" ry="15" fill="none" stroke="#FFF4E0" strokeWidth="1.5" />
      <circle cx="120" cy="150" r="28" fill="#120E15" stroke="#FFAA24" strokeWidth="2.5" />
      <g fill="#FFAA24" opacity="0.7">
        <rect x="172" y="182" width="4" height="4" />
        <rect x="180" y="182" width="4" height="4" />
        <rect x="188" y="182" width="4" height="4" />
        <rect x="172" y="190" width="4" height="4" />
        <rect x="188" y="190" width="4" height="4" />
        <rect x="180" y="198" width="4" height="4" />
      </g>
    </svg>
  );
}

/* ==========================================================================
   4. SYNTHESIZED TACTILE CARD AUDIO HELPER (ZERO EXTERNAL ASSETS)
   ========================================================================== */
function playCardTactileSound(type: "deal" | "flip" = "deal") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "deal") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch {
    // AudioContext blocked or not allowed by browser policy; silent fallback
  }
}

/* ==========================================================================
   5. INDIVIDUAL INTERACTIVE 3D PLAYING CARD COMPONENT
   ========================================================================== */
interface CardProps {
  member: CoreMember;
  index: number;
}

function CoreMemberCard({ member, index }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50 });
  const isCyber = member.designVariant === "cyber-horizon";
  const isOddFromLeft = index % 2 === 0;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1; // -1 to 1
    const ny = (y / rect.height) * 2 - 1; // -1 to 1

    setTilt({
      rx: -ny * 10, // Rotate X (deg)
      ry: nx * 10,  // Rotate Y (deg)
      px: Math.round((x / rect.width) * 100),
      py: Math.round((y / rect.height) * 100),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  const toggleFlip = () => {
    playCardTactileSound("flip");
    setFlipped((f) => !f);
  };

  return (
    <div
      data-card-index={index}
      data-side={isOddFromLeft ? "left" : "right"}
      className="core-card-wrapper [perspective:1200px] w-full"
    >
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={toggleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
        aria-label={`${member.name} — ${member.role}. Tap or press Enter to flip profile.`}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry + (flipped ? 180 : 0)}deg)`,
          transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative w-full aspect-[3/4.35] rounded-[24px] [transform-style:preserve-3d] cursor-pointer shadow-[0_22px_50px_rgba(0,0,0,0.85)] group select-none focus:outline-none focus:ring-2 focus:ring-[#B9ACF0]"
      >
        {/* Dynamic Specular Sheen Glare following Mouse */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(222,213,255,0.25) 0%, rgba(222,213,255,0) 65%)`,
          }}
          className="absolute inset-0 z-30 pointer-events-none rounded-[24px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />

        {/* ==============================================================
            FRONT FACE (IVORY FINE-CARDSTOCK WITH REFERENCE ARTWORK)
            ============================================================== */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[24px] overflow-hidden border-[2px] border-[#e3e3e2] group-hover:border-[#714cb6] transition-colors bg-[#ffffff]">
          {/* Reference Card Artwork SVG */}
          <div className="absolute inset-0">
            <ReferenceCardArtwork variant={member.designVariant} />
          </div>

          {/* Top-Left Profile Index */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start leading-none">
            <span className="font-mono text-xs font-bold text-[#ffffff] bg-[#421d24] px-2 py-0.5 rounded border border-[#421d24] shadow-sm">
              #{index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>

          {/* Top-Right Flip Button Indicator */}
          <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffffff] text-[#714cb6] font-tech text-[10px] font-bold tracking-wider uppercase border border-[#e3e3e2] shadow-md">
            <Icon.RotateCw className="w-3 h-3 text-[#714cb6] group-hover:rotate-180 transition-transform duration-500" />
            <span>FLIP</span>
          </div>

          {/* Bottom Information Plinth with Ink Charcoal Gradient */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-[#292827] via-[#292827]/95 to-transparent text-[#ffffff]">
            <p className="font-tech text-[10px] font-bold tracking-[0.18em] text-[#d4c7ff] uppercase">
              {member.role}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-[#ffffff] leading-tight">
              {member.name}
            </h3>
          </div>
        </div>

        {/* ==============================================================
            BACK FACE (MIDNIGHT WINE WITH ARCHETYPE & QUOTE)
            ============================================================== */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[24px] overflow-hidden border-[2px] border-[#714cb6] bg-gradient-to-br from-[#421d24] via-[#33151b] to-[#200c10] text-[#ffffff] p-6 flex flex-col justify-between shadow-[inset_0_0_40px_rgba(113,76,182,0.2)]">
          {/* Subtle Watermark Index */}
          <span
            aria-hidden="true"
            className="absolute -right-4 -bottom-6 font-display text-[9rem] font-black leading-none text-[#ffffff]/[0.05] select-none pointer-events-none"
          >
            0{index + 1}
          </span>

          <div className="relative z-10">
            {/* Header: Vertical badge and Curator Index */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-tech text-[10px] font-bold tracking-widest text-[#d4c7ff] uppercase">
                {member.vertical}
              </span>
              <span className="font-mono text-xs font-bold text-[#d4c7ff]">
                #{index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </div>

            {/* Archetype & Full Identity Details */}
            <p className="mt-4 font-tech text-xs font-bold tracking-widest text-[#d4c7ff] uppercase">
              {member.archetype}
            </p>
            <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#ffffff] leading-none">
              {member.name}
            </h3>
            <p className="mt-1 font-tech text-xs text-[#ffffff]/75">
              {member.role} • {member.year}
            </p>

            {/* Student Vision Statement / Quote */}
            <blockquote className="mt-5 font-serif italic text-lg sm:text-xl leading-relaxed text-[#ffffff] border-l-2 border-[#d4c7ff] pl-3.5">
              &ldquo;{member.quote}&rdquo;
            </blockquote>
          </div>

          {/* Footer Callout */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-tech text-[#d4c7ff]">
            <span className="tracking-wider">SANSKARAN &amp; SAHOTSAVA</span>
            <span className="inline-flex items-center gap-1 uppercase font-bold text-[#ffffff] hover:text-[#d4c7ff] transition-colors">
              <Icon.RotateCw className="w-3 h-3 text-[#d4c7ff]" /> Tap to return
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. MAIN CORE MEMBERS SECTION WITH GSAP SIDE ENTRANCE CHOREOGRAPHY
   ========================================================================== */
export default function CoreMembersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [dealCount, setDealCount] = useState<number>(1);

  // Filter Categories
  const categories = [
    { id: "all", label: "ALL ARCHITECTS (6)" },
    { id: "crimson-vanguard", label: "CRIMSON VANGUARD" },
    { id: "checkered-sovereign", label: "CHECKERED SOVEREIGN" },
    { id: "cyber-horizon", label: "CYBER HORIZON" },
  ];

  const filteredMembers = activeFilter === "all"
    ? CORE_MEMBERS
    : CORE_MEMBERS.filter((m) => m.designVariant === activeFilter);

  // GSAP SCROLLTRIGGER ANIMATION:
  // EACH CARD triggers its OWN side-entrance animation as it scrolls into view!
  // Even cards fly in from the left (-280px), odd cards fly in from the right (+280px)
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".core-card-wrapper");
      if (!cards.length) return;

      // 1. Header elements entrance
      gsap.from(".core-anim-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 28,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      // 2. Individual Card Side Entrance on Viewport Entry:
      // Every single card has its own ScrollTrigger so as you scroll down,
      // all cards (cards 0, 1, 2, 3, 4, 5) dramatically sweep in from the sides!
      cards.forEach((card, i) => {
        const isFromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: isFromLeft ? -300 : 300,
            y: 45,
            rotationZ: isFromLeft ? -16 : 16,
            rotationY: isFromLeft ? 28 : -28,
            scale: 0.8,
            autoAlpha: 0,
          },
          {
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [activeFilter] }
  );

  // INTERACTIVE RE-DEAL FUNCTIONALITY:
  // Allows user to re-trigger the side card dealing animation on demand
  const handleReDeal = useCallback(() => {
    playCardTactileSound("deal");
    setDealCount((c) => c + 1);

    const cards = gsap.utils.toArray<HTMLElement>(".core-card-wrapper");
    if (!cards.length) return;

    gsap.killTweensOf(cards);

    gsap.fromTo(
      cards,
      {
        x: (i) => (i % 2 === 0 ? -260 : 260),
        y: (i) => 50 + (i % 3) * 20,
        rotationZ: (i) => (i % 2 === 0 ? -18 : 18),
        rotationY: (i) => (i % 2 === 0 ? 30 : -30),
        scale: 0.78,
        autoAlpha: 0,
      },
      {
        x: 0,
        y: 0,
        rotationZ: 0,
        rotationY: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.9,
        stagger: {
          amount: 0.45,
          from: "start",
        },
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  }, []);

  return (
    <section
      id="core-members"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden z-10 bg-[#0c4243] text-[#ffffff] border-b border-[#0c4243]/40"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(#d4c7ff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Background Ambient Glow Plinth */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-r from-[#714cb6]/20 via-[#d4c7ff]/10 to-transparent blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

      {/* Section Header with Swiss Architectural Typography */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <h2 className="core-anim-header font-display text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-none uppercase tracking-tight">
            NEW CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#d4c7ff] to-[#714cb6]">MEMBERS</span>
          </h2>

          <p className="core-anim-header mt-3 font-tech text-xs sm:text-sm text-[#d4c7ff]/80 leading-relaxed">
            Six student stewards curating this year&rsquo;s edition. Dealt in from the sides with GSAP physics—tap any profile to flip and discover their editorial vision.
          </p>
        </div>
      </div>

      {/* Grid of Playing Cards with GSAP Side Entrance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {CORE_MEMBERS.map((member, idx) => (
          <CoreMemberCard key={member.id} member={member} index={idx} />
        ))}
      </div>
      </div>
    </section>
  );
}

