"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface FounderProfile {
  id: string;
  badge: string;
  name: string;
  designation: string;
  monogram: string;
  suit: string;
  rank: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    id: "fnd-01",
    badge: "CO-FOUNDER",
    name: "AARAV JOSHI",
    designation: "FOUNDING PRESIDENT, SANSKARAN",
    monogram: "AJ",
    suit: "♣",
    rank: "J",
  },
  {
    id: "fnd-02",
    badge: "CO-FOUNDER",
    name: "ANANYA IYER",
    designation: "FOUNDING CREATIVE DIRECTOR",
    monogram: "AI",
    suit: "♥",
    rank: "Q",
  },
];

export default function FoundersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const header = el.querySelector(".founders-header-reveal");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = el.querySelectorAll(".founder-card-reveal");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.querySelector(".founders-grid"),
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
      id="founders"
      ref={containerRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#120E15] border-b border-[#8B1E24]/40 overflow-hidden z-10"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="founders-header-reveal mb-12 sm:mb-16 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#FFF4E0] leading-none uppercase tracking-tight">
            FOUNDERS OF SANSKARAN
          </h2>
          <p className="mt-2.5 font-tech text-xs sm:text-base text-[#FFF4E0]/75 max-w-2xl leading-relaxed">
            The visionary student founders and alumni stewards who established the initial charter of Sanskaran and expanded its creative momentum into Sahotsava.
          </p>
        </div>

        {/* Highlighted Founders Portrait Cards */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {FOUNDERS.map((person) => (
            <div key={person.id} className="founder-card-reveal flex">
              <CardSpotlight
                radius={360}
                color="rgba(230, 92, 25, 0.3)"
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#8B1E24] hover:border-[#E65C19] bg-gradient-to-b from-[#221016] via-[#180C11] to-[#10080B] shadow-[0_20px_50px_rgba(139,30,36,0.25)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full"
              >
                {/* Background Watermark Suit */}
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 font-serif text-[9rem] sm:text-[11rem] leading-none text-[#8B1E24]/15 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                >
                  {person.suit}
                </span>

                {/* Textured Cardstock Ambient Dot Grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#FFAA24 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative z-10 flex flex-col">
                  {/* Top Badge & Corner Suit */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-tech font-bold tracking-widest uppercase bg-[#8B1E24]/20 border border-[#8B1E24]/50 text-[#FFAA24]">
                      {person.badge}
                    </span>
                    <div className="flex items-center gap-1 font-tech text-xs">
                      <span className="font-bold text-[#FFF4E0]">{person.rank}</span>
                      <span className="font-serif text-base text-[#E65C19]">{person.suit}</span>
                    </div>
                  </div>

                  {/* HERO PORTRAIT / PHOTO CARD PLINTH */}
                  <div className="relative w-full aspect-[4/5] sm:h-72 rounded-xl sm:rounded-2xl border-2 border-[#E65C19]/70 bg-gradient-to-b from-[#33151D] via-[#240E15] to-[#15090C] overflow-hidden flex flex-col justify-between p-3.5 shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Top-Left Card Index Pip */}
                    <div className="flex flex-col items-center leading-none text-xs font-bold font-tech text-[#FFF4E0]/80">
                      <span>{person.rank}</span>
                      <span className="font-serif text-sm text-[#E65C19]">{person.suit}</span>
                    </div>

                    {/* Center Monogram / Portrait Artwork */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#E65C19]/20 blur-2xl pointer-events-none transition-all duration-300 group-hover:scale-125" />
                      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#FFF4E0]/10 pointer-events-none" />
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-dashed border-[#FFF4E0]/10 pointer-events-none" />

                      <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-wider leading-none select-none relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF4E0] via-[#E65C19] to-[#8B1E24]">
                        {person.monogram}
                      </span>
                    </div>

                    {/* Bottom-Right Inverted Card Index Pip */}
                    <div className="flex flex-col items-center leading-none text-xs font-bold font-tech text-[#FFF4E0]/80 rotate-180 self-end">
                      <span>{person.rank}</span>
                      <span className="font-serif text-sm text-[#E65C19]">{person.suit}</span>
                    </div>
                  </div>

                  {/* HIGHLIGHTED NAME & CLEAN ROLE */}
                  <div className="mt-5 text-center sm:text-left">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#FFF4E0] leading-none tracking-wide uppercase transition-colors duration-200 group-hover:text-[#E65C19]">
                      {person.name}
                    </h3>
                    <p className="font-tech text-xs font-bold tracking-widest uppercase mt-1.5 text-[#E65C19]">
                      {person.designation}
                    </p>
                  </div>
                </div>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
