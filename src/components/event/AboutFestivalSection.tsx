"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ==========================================================================
   1. INLINE VECTOR ICONS
   ========================================================================== */
const Icon = {
  Flame: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Users: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Ticket: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  ArrowUpRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Layers: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const EASE_SWISS = [0.22, 1, 0.36, 1] as const;

/* ==========================================================================
   2. DATA & PILLARS FOR SANSKARAN AND SAHOTSAVA
   ========================================================================== */
interface DisciplineDetail {
  title: string;
  category: string;
  description: string;
  accent: string;
}

const SANSKARAN_DISCIPLINES: DisciplineDetail[] = [
 
];

const SAHOTSAVA_DISCIPLINES: DisciplineDetail[] = [
  
];

/* ==========================================================================
   3. 3D TACTILE CARD COMPONENT (WITH MOUSE PARALLAX & SPECULAR GLARE)
   ========================================================================== */
interface TactileRealmCardProps {
  realmId: "sanskaran" | "sahotsava";
  rank: string;
  suit: string;
  title: string;
  tagline: string;
  leadParagraph: string;

  theme: {
    bg: string;
    border: string;
    cornerColor: string;
    accentGlow: string;
    watermarkColor: string;
    buttonGradient: string;
  };
  onInspect: () => void;
}

function TactileRealmCard({
  rank,
  suit,
  title,
  tagline,
  leadParagraph,

  theme,
  onInspect,
}: TactileRealmCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    // Subtle 3D tilt (max 8 degrees for controlled elegance)
    setRotateX(-normY * 8);
    setRotateY(normX * 8);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handlePointerLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden rounded-3xl ${theme.bg} ${theme.border} p-6 sm:p-9 shadow-2xl transition-all duration-300 group`}
      >
        {/* Dynamic Specular Glare Layer */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 244, 224, ${glarePos.opacity}), transparent 75%)`,
            transition: "opacity 0.2s ease-out",
          }}
          className="absolute inset-0 z-30 pointer-events-none"
        />

        {/* Textured Playing Card Micro-Grid Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${theme.cornerColor} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Massive Translucent Playing Card Suit Watermark */}
        <span
          aria-hidden="true"
          style={{ transform: "translateZ(10px)" }}
          className={`absolute -right-4 -bottom-10 font-serif text-[12rem] sm:text-[14rem] leading-none ${theme.watermarkColor} select-none pointer-events-none transition-transform duration-500 group-hover:scale-105`}
        >
          {suit}
        </span>

        {/* Card Content in 3D Space */}
        <div style={{ transform: "translateZ(24px)" }} className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Top Corner Index */}
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-baseline gap-1 text-right">
                <span className={`font-display text-3xl sm:text-4xl leading-none ${theme.cornerColor}`}>
                  {rank}
                </span>
                <span className={`font-serif text-2xl sm:text-3xl leading-none ${theme.cornerColor}`}>
                  {suit}
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFF4E0] tracking-tight uppercase leading-none">
              {title}
            </h3>

            <p className="mt-2 font-serif italic text-xl sm:text-2xl text-[#FFAA24]">
              {tagline}
            </p>

            {/* Deep Grounded Narrative */}
            <p className="mt-4 font-tech text-sm sm:text-base text-[#FFF4E0]/85 leading-relaxed">
              {leadParagraph}
            </p>

          
          </div>

          {/* Action CTA */}
          <div className="mt-8 pt-5 border-t border-[#FFF4E0]/10 flex items-center justify-start">
            <button
              type="button"
              onClick={onInspect}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-tech text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer active:scale-95 ${theme.buttonGradient}`}
            >
              <span>Explore Disciplines</span>
              <Icon.ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. MAIN ABOUT FESTIVAL SECTION (SANSKARAN & SAHOTSAVA)
   ========================================================================== */
export default function AboutFestivalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inspectModal, setInspectModal] = useState<"sanskaran" | "sahotsava" | null>(null);

  // GSAP ScrollTrigger Stagger Animation for Realm Cards
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const cards = el.querySelectorAll(".realm-card-reveal");
      const grid = el.querySelector(".realm-cards-grid");

      // Subtle Fade-In Entrance for Sanskaran & Sahotsava Cards
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid || el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden z-10 bg-[#120E15] border-b border-[#8B1E24]/40"
    >
      {/* 3D Ambient Studio Grid Background (Same as Gallery Section) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#FFAA24 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
      

        {/* TWO REALMS DUALITY CARDS */}
        <div className="realm-cards-grid grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* CARD I: WHAT IS SANSKARAN */}
          <div className="realm-card-reveal lg:col-span-6 flex">
            <TactileRealmCard
              realmId="sanskaran"
              rank="A"
              suit="♠"
              title="WHAT IS SANSKARAN?"
              tagline="The Soul of Heritage, Thought & Artistic Mastery."
              leadParagraph="Sanskaran is our flagship intellectual and cultural conclave—a deliberate space where classical traditions, risograph ateliers, theatre, parliamentary debate, and visual arts converge. It is the sanctum of the thinker and the artisan, honoring the craft and discipline behind every student creator on campus."
            
              theme={{
                bg: "bg-[#18121D]",
                border: "border-2 border-[#8B1E24]",
                cornerColor: "text-[#FFF4E0]",
                accentGlow: "rgba(139, 30, 36, 0.45)",
                watermarkColor: "text-[#8B1E24]/20",
                buttonGradient: "bg-[#8B1E24] hover:bg-[#E65C19] text-[#FFF4E0]",
              }}
              onInspect={() => setInspectModal("sanskaran")}
            />
          </div>

          {/* CARD II: WHAT IS SAHOTSAVA */}
          <div className="realm-card-reveal lg:col-span-6 flex">
            <TactileRealmCard
              realmId="sahotsava"
              rank="K"
              suit="♦"
              title="WHAT IS SAHOTSAVA?"
              tagline="The Electric Pulse of Music, Spectacle & Euphoria."
              leadParagraph="Sahotsava is the high-voltage arena festival that transforms the university into a roaring nexus of sound, light, and shared jubilation. From headliner-fueled stadium pro-shows and subterranean street dance cyphers to avant-garde fashion runways and collegiate battle of the bands—Sahotsava unites thousands in unbridled momentum."
             
              theme={{
                bg: "bg-gradient-to-br from-[#241217] via-[#1A111C] to-[#120E15]",
                border: "border-2 border-[#FFAA24]/70 hover:border-[#FFAA24]",
                cornerColor: "text-[#FFAA24]",
                accentGlow: "rgba(230, 92, 25, 0.35)",
                watermarkColor: "text-[#FFAA24]/15",
                buttonGradient: "bg-gradient-to-r from-[#E65C19] to-[#FFAA24] text-[#120E15] font-black",
              }}
              onInspect={() => setInspectModal("sahotsava")}
            />
          </div>
        </div>
      </div>

      {/* DISCIPLINE INSPECTION MODAL */}
      <AnimatePresence>
        {inspectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120E15]/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.35, ease: EASE_SWISS }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#18121D] border-2 border-[#FFAA24] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.85)] text-[#FFF4E0]"
            >
              <button
                type="button"
                onClick={() => setInspectModal(null)}
                aria-label="Close Discipline Modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#120E15] text-[#FFF4E0] flex items-center justify-center hover:bg-[#8B1E24] transition-colors cursor-pointer"
              >
                <Icon.X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-4xl text-[#FFAA24]">
                  {inspectModal === "sanskaran" ? "♠" : "♦"}
                </span>
                <div>
                  <span className="font-tech text-[10px] font-bold tracking-widest text-[#FFAA24] uppercase">
                    {inspectModal === "sanskaran" ? "CULTURAL CONCLAVE GUILD" : "ARENA SPECTACLE DIRECTORY"}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#FFF4E0] leading-none uppercase">
                    {inspectModal === "sanskaran" ? "Sanskaran Disciplines" : "Sahotsava Lineup Pillars"}
                  </h3>
                </div>
              </div>

              <p className="font-tech text-xs sm:text-sm text-[#FFF4E0]/75 mb-6">
                {inspectModal === "sanskaran"
                  ? "Explore the master workshops, competitive conclaves, and exhibition halls anchored under Sanskaran."
                  : "Experience the high-voltage arena, star headliners, and night spectacles defining Sahotsava."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(inspectModal === "sanskaran" ? SANSKARAN_DISCIPLINES : SAHOTSAVA_DISCIPLINES).map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-[#120E15] border border-[#FFF4E0]/15 hover:border-[#FFAA24] transition-colors"
                  >
                    <span
                      style={{ color: item.accent }}
                      className="font-tech text-[10px] font-bold tracking-widest uppercase block mb-1"
                    >
                      {item.category}
                    </span>
                    <h4 className="font-display text-xl text-[#FFF4E0] leading-tight mb-1.5">
                      {item.title}
                    </h4>
                    <p className="font-tech text-xs text-[#FFF4E0]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#FFF4E0]/10 flex items-center justify-between">
                <span className="font-mono text-xs text-[#FFF4E0]/50">
                  CAMPUS REGION: [ PENDING ANNOUNCEMENT ]
                </span>
                <button
                  type="button"
                  onClick={() => setInspectModal(null)}
                  className="px-4 py-2 rounded-xl bg-[#FFAA24] text-[#120E15] font-tech text-xs font-bold tracking-widest uppercase cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
