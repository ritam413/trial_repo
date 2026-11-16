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
  {
    title: "Classical & Folk Arts",
    category: "Heritage Guild",
    description: "Honoring India's diverse folk and classical dances, ragas, and traditional craftsmanship.",
    accent: "#3A3F8E",
  },
  {
    title: "Thespian Drama & Street Play",
    category: "Theatre Syndicate",
    description: "Original stage productions, proscenium plays, and evocative Nukkad Natak addressing social narratives.",
    accent: "#FFAA24",
  },
  {
    title: "Parliamentary Debate Conclave",
    category: "Intellectual Sphere",
    description: "Asian Parliamentary & British Parliamentary debate circuits with adjudicators and policy delegates.",
    accent: "#4285F4",
  },
  {
    title: "Risograph & Fine Art Atelier",
    category: "Visual Arts",
    description: "Hands-on printmaking, live canvas painting, digital illustration showcases, and sculpting gallery.",
    accent: "#E8502A",
  },
  {
    title: "Kavyanjali & Literary Guild",
    category: "Literary Arts",
    description: "Poetry slams, creative writing workshops, bilingual mushairas, and storytelling symposiums.",
    accent: "#34A853",
  },
  {
    title: "Symphony & Instrumental Rhapsody",
    category: "Acoustic Harmony",
    description: "Orchestral fusions, solo instrumentals, sitar & sarod duets, and meditative raag explorations.",
    accent: "#B9ACF0",
  },
];

const SAHOTSAVA_DISCIPLINES: DisciplineDetail[] = [
  {
    title: "Celebrity Arena Pro-Nites",
    category: "Mainstage Spectacle",
    description: "Stadium-scale concerts featuring nationally acclaimed artists, playback singers, and headlining bands.",
    accent: "#EA4335",
  },
  {
    title: "Battle of the Bands",
    category: "Rock & Metal Arena",
    description: "Electrifying live band face-offs spanning progressive rock, metal, indie-pop, and fusion ensembles.",
    accent: "#FBBC04",
  },
  {
    title: "Street Dance & Cypher Battles",
    category: "Urban Rhythms",
    description: "High-intensity 1v1 popping, locking, breaking, and all-styles crew choreography showdowns.",
    accent: "#4285F4",
  },
  {
    title: "Haute Couture Fashion Runway",
    category: "Vogue & Design",
    description: "Avant-garde student designers showcasing theme-based collections on a 40-foot illuminated runway.",
    accent: "#34A853",
  },
  {
    title: "Sunset EDM & DJ Raves",
    category: "Electronic Nexus",
    description: "Sub-bass euphoria and dynamic laser light shows under the open twilight festival sky.",
    accent: "#B9ACF0",
  },
  {
    title: "Midnight Carnival & Street Food Walk",
    category: "Carnival & Street",
    description: "Festive flea markets, artisanal cuisine stalls, carnival games, and pop-up street performances.",
    accent: "#FFAA24",
  },
];

/* ==========================================================================
   3. DEVFEST KOLKATA STYLE REALM CARD COMPONENT
   ========================================================================== */
interface DecorItem {
  type: "frame" | "circle" | "line";
  color: string;
  dx?: number;
  dy?: number;
  at?: "tl" | "tr" | "bl" | "br" | "t" | "b";
}

const DECOR_POSITIONS = {
  tl: { top: "-10px", left: "-10px" },
  tr: { top: "-10px", right: "-10px" },
  bl: { bottom: "-10px", left: "-10px" },
  br: { bottom: "-10px", right: "-10px" },
};

function DevFestDecor({ items }: { items: DecorItem[] }) {
  return (
    <>
      {items.map((item, idx) => {
        if (item.type === "frame") {
          return (
            <div
              key={idx}
              aria-hidden="true"
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                border: `2px solid ${item.color}`,
                transform: `translate(${(item.dx || 0) * 8}px, ${(item.dy || 0) * 8}px)`,
                zIndex: 0,
              }}
            />
          );
        }
        if (item.type === "circle") {
          const pos = DECOR_POSITIONS[item.at as keyof typeof DECOR_POSITIONS] || DECOR_POSITIONS.tr;
          return (
            <div
              key={idx}
              aria-hidden="true"
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "24px",
                height: "24px",
                border: `2.5px solid ${item.color}`,
                zIndex: 20,
                ...pos,
              }}
            />
          );
        }
        if (item.type === "line") {
          return (
            <div
              key={idx}
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                width: "38px",
                height: "3px",
                backgroundColor: item.color,
                borderRadius: "999px",
                left: item.at === "t" ? "-8px" : "auto",
                right: item.at === "t" ? "auto" : "-8px",
                top: item.at === "t" ? "-6px" : "auto",
                bottom: item.at === "t" ? "auto" : "-6px",
                zIndex: 20,
              }}
            />
          );
        }
        return null;
      })}
    </>
  );
}

interface DevFestRealmCardProps {
  realmId: "sanskaran" | "sahotsava";
  numberBadge: string;
  categoryBadge: string;
  title: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  accentColor: string;
  coloredStory: { text: string; color?: string }[];
  disciplinesPills: string[];
  decorItems: DecorItem[];
  onInspect: () => void;
}

function DevFestRealmCard({
  numberBadge,
  categoryBadge,
  title,
  tagline,
  imageSrc,
  imageAlt,
  accentColor,
  coloredStory,
  disciplinesPills,
  decorItems,
  onInspect,
}: DevFestRealmCardProps) {
  return (
    <div className="w-full bg-[#ffffff] rounded-2xl sm:rounded-3xl border border-[#DADCE0] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Image Showcase with DevFest Geometric Offset Decors */}
        <div className="relative mb-6 sm:mb-8 pt-2 px-2">
          {/* Geometric Frames & Circles */}
          <DevFestDecor items={decorItems} />

          {/* Authentic Photograph */}
          <div className="relative z-10 w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.14)] bg-neutral-100">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Corner Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[11px] font-mono font-bold text-white shadow-sm flex items-center gap-1.5">
              <span style={{ backgroundColor: accentColor }} className="w-2 h-2 rounded-full" />
              <span>{numberBadge}</span>
            </div>
          </div>
        </div>

        {/* Category Pill Badge (DevFest Exact #F1F3F4 / #3C4043) */}
        <div className="flex items-center gap-2 mb-3">
          <span className="product_sans inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F1F3F4] text-[#3C4043] border border-[#E8EAED]">
            {categoryBadge}
          </span>
        </div>

        {/* Title in Google Sans */}
        <h3 className="product_sans text-2xl sm:text-3xl md:text-4xl font-bold text-[#202124] tracking-tight leading-tight">
          {title}
        </h3>

        {/* Tagline */}
        <p className="product_sans text-base sm:text-lg font-medium text-[#5F6368] mt-1.5 leading-snug">
          {tagline}
        </p>

        {/* Multi-Colored Keyword Narrative (DevFest Signature ax Token Styling) */}
        <div className="product_sans text-sm sm:text-base text-[#3C4043] mt-4 leading-relaxed font-normal">
          {coloredStory.map((token, i) => (
            <span
              key={i}
              style={{
                color: token.color || "inherit",
                fontWeight: token.color ? 600 : "inherit",
              }}
            >
              {token.text}
            </span>
          ))}
        </div>

        {/* Highlight Discipline Chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {disciplinesPills.map((pill) => (
            <span
              key={pill}
              className="product_sans text-xs font-medium px-2.5 py-1 rounded-md bg-[#F8F9FA] border border-[#E8EAED] text-[#5F6368]"
            >
              • {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA: Iconic DevFest Button with Google 4-Color Gradient Border */}
      <div className="mt-8 pt-5 border-t border-[#F1F3F4] flex items-center justify-between">
        <button
          type="button"
          onClick={onInspect}
          className="product_sans flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold text-[#202124] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
          style={{
            background:
              "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(98deg, #F63130 0%, #4787EA 35%, #34A853 72%, #FBBC04 100%) border-box",
            border: "2.5px solid transparent",
            borderRadius: "50px",
          }}
        >
          <span>Explore Disciplines</span>
          <Icon.ArrowUpRight className="w-4 h-4 text-[#4285F4]" />
        </button>

        <span className="product_sans text-xs font-medium text-[#80868B]">
          6 Major Guilds
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. MAIN ABOUT FESTIVAL SECTION (SANSKARAN & SAHOTSAVA)
   AUTHENTIC DEVFEST KOLKATA WEBSITE STYLE
   ========================================================================== */
export default function AboutFestivalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inspectModal, setInspectModal] = useState<"sanskaran" | "sahotsava" | null>(null);

  // GSAP ScrollTrigger Animation (Smooth Card-Up Overlay with Stationary Hero Video)
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      gsap.registerPlugin(ScrollTrigger);

      // Editorial Content Staggered Entrance
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      contentTl
        .from(".sheet-badge", {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".sheet-title",
          {
            y: 32,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          ".sheet-subtitle",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Dual Realm Cards Grid Animation
      const cards = el.querySelectorAll(".realm-card-reveal");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 40,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el.querySelector(".realm-cards-grid"),
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(el);

      return () => {
        resizeObserver.disconnect();
        contentTl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  // Colored Stories Matching DevFest Multi-Color Keyword Tokens
  const SANSKARAN_STORY = [
    { text: "Sanskaran is our flagship ", color: undefined },
    { text: "intellectual conclave", color: "#4285F4" },
    { text: " — a deliberate sanctuary where ", color: undefined },
    { text: "classical heritage", color: "#F63130" },
    { text: ", ", color: undefined },
    { text: "thespian drama", color: "#FBBC04" },
    { text: ", parliamentary debates, and ", color: undefined },
    { text: "visual arts", color: "#34A853" },
    { text: " converge to honor craft, discipline, and student creator mastery.", color: undefined },
  ];

  const SAHOTSAVA_STORY = [
    { text: "Sahotsava is the ", color: undefined },
    { text: "electric pulse", color: "#F63130" },
    { text: " of our festival — a roaring ", color: undefined },
    { text: "stadium arena", color: "#4285F4" },
    { text: " of live ", color: undefined },
    { text: "celebrity concerts", color: "#FBBC04" },
    { text: ", subterranean street dance cyphers, and ", color: undefined },
    { text: "haute couture runways", color: "#34A853" },
    { text: " uniting thousands in unbridled momentum.", color: undefined },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative z-20 w-full rounded-t-3xl sm:rounded-t-[40px] md:rounded-t-[48px] xl:rounded-t-[60px] overflow-hidden select-none bg-[#ffffff] text-[#202124] pb-20 sm:pb-28 will-change-transform"
      style={{
        boxShadow: "0 -28px 75px rgba(0, 0, 0, 0.48)",
      }}
    >
      {/* =========================================================================
          STICKY DOODLE ILLUSTRATION BACKDROP (Exact DevFest Kolkata /background.svg)
          ========================================================================= */}
      <div
        id="doodle-backdrop"
        className="pointer-events-none absolute inset-0 rounded-t-3xl sm:rounded-t-[40px] md:rounded-t-[48px] xl:rounded-t-[60px]"
        aria-hidden="true"
        style={{ overflow: "clip" }}
      >
        <div
          className="sticky top-0 h-screen supports-[height:100dvh]:h-dvh w-full opacity-[0.85]"
          style={{
            backgroundImage: "url(/background.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* =========================================================================
          SHEET EDITORIAL HEADER (DEVFEST TYPOGRAPHY & MOTTO)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 pt-8 pb-8 sm:pb-12 text-center">
        {/* Google 4-Color Pulse Badge */}
        <div className="sheet-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
          <span>THE TWO REALMS • GDG &amp; FESTIVAL EDITION</span>
        </div>

        {/* Headline */}
        <h2 className="sheet-title product_sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#202124] leading-tight">
          What is Sanskaran &amp; Sahotsava ?
        </h2>

        {/* Subtitle */}
        <p className="sheet-subtitle product_sans mt-3 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#5F6368] leading-relaxed">
          Two contrasting realms woven into one monumental cultural conclave — intellectual heritage meets roaring stadium euphoria.
        </p>

        {/* =====================================================================
            DEVFEST SIDE-BY-SIDE DUAL REALM CARDS GRID
            ===================================================================== */}
        <div className="realm-cards-grid mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch text-left">
          {/* CARD I: WHAT IS SANSKARAN */}
          <div className="realm-card-reveal lg:col-span-6 flex">
            <DevFestRealmCard
              realmId="sanskaran"
              numberBadge="01 // SANSKARAN"
              categoryBadge="Intellectual & Heritage Guild"
              title="What is Sanskaran ?"
              tagline="The Soul of Heritage, Thought & Artistic Mastery"
              imageSrc="/showcase/kolkata-1.webp"
              imageAlt="Heritage of Kolkata and Sanskaran Ateliers"
              accentColor="#4285F4"
              coloredStory={SANSKARAN_STORY}
              disciplinesPills={["Classical Arts", "Thespian Drama", "Debate Conclave", "Risograph Fine Art"]}
              decorItems={[
                { type: "frame", color: "#4285F4", dx: -1, dy: 1 },
                { type: "circle", color: "#34A853", at: "tr" },
                { type: "line", color: "#FBBC04", at: "b" },
              ]}
              onInspect={() => setInspectModal("sanskaran")}
            />
          </div>

          {/* CARD II: WHAT IS SAHOTSAVA */}
          <div className="realm-card-reveal lg:col-span-6 flex">
            <DevFestRealmCard
              realmId="sahotsava"
              numberBadge="02 // SAHOTSAVA"
              categoryBadge="Electric Arena & Pro-Nites"
              title="What is Sahotsava ?"
              tagline="The Electric Pulse of Music, Spectacle & Euphoria"
              imageSrc="/showcase/dl30.webp"
              imageAlt="High-voltage stage and concert pro-nites"
              accentColor="#F63130"
              coloredStory={SAHOTSAVA_STORY}
              disciplinesPills={["Stadium Concerts", "Band Battles", "Street Dance", "Haute Couture Runway"]}
              decorItems={[
                { type: "frame", color: "#F63130", dx: 1, dy: 1 },
                { type: "circle", color: "#FBBC04", at: "tl" },
                { type: "line", color: "#4285F4", at: "t" },
              ]}
              onInspect={() => setInspectModal("sahotsava")}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          DEVFEST STYLE DISCIPLINE INSPECTION MODAL DOSSIER
          ========================================================================= */}
      <AnimatePresence>
        {inspectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl md:rounded-3xl bg-[#ffffff] border border-[#DADCE0] p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] text-[#202124]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectModal(null)}
                aria-label="Close Discipline Modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F1F3F4] text-[#3C4043] flex items-center justify-center hover:bg-[#E8EAED] hover:text-black transition-colors cursor-pointer"
              >
                <Icon.X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-2">
                <span
                  style={{
                    backgroundColor:
                      inspectModal === "sanskaran" ? "#4285F4" : "#F63130",
                  }}
                  className="w-3.5 h-3.5 rounded-full inline-block"
                />
                <div>
                  <span className="product_sans text-[11px] font-bold tracking-widest text-[#5F6368] uppercase">
                    {inspectModal === "sanskaran"
                      ? "INTELLECTUAL & HERITAGE DOSSIER"
                      : "ARENA & SPECTACLE DIRECTORY"}
                  </span>
                  <h3 className="product_sans text-2xl sm:text-3xl font-bold text-[#202124] leading-tight">
                    {inspectModal === "sanskaran"
                      ? "Sanskaran Disciplines"
                      : "Sahotsava Lineup Pillars"}
                  </h3>
                </div>
              </div>

              <p className="product_sans text-sm text-[#5F6368] mb-6">
                {inspectModal === "sanskaran"
                  ? "Explore the master workshops, competitive conclaves, and exhibition halls anchored under Sanskaran."
                  : "Experience the high-voltage arena, star headliners, and night spectacles defining Sahotsava."}
              </p>

              {/* Disciplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(inspectModal === "sanskaran"
                  ? SANSKARAN_DISCIPLINES
                  : SAHOTSAVA_DISCIPLINES
                ).map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] hover:border-[#DADCE0] hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        style={{ backgroundColor: item.accent }}
                        className="w-2 h-2 rounded-full inline-block"
                      />
                      <span
                        style={{ color: item.accent }}
                        className="product_sans text-[10px] font-bold tracking-wider uppercase"
                      >
                        {item.category}
                      </span>
                    </div>
                    <h4 className="product_sans text-lg font-bold text-[#202124] leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="product_sans text-xs text-[#5F6368] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-[#E8EAED] flex items-center justify-between">
                <span className="product_sans text-xs font-medium text-[#80868B]">
                  DevFest &amp; Sanskaran Conclave 2026
                </span>
                <button
                  type="button"
                  onClick={() => setInspectModal(null)}
                  className="px-5 py-2 rounded-full bg-[#202124] hover:bg-black text-white product_sans text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors shadow-sm"
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
