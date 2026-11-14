"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface DignitaryProfile {
  id: string;
  badge: string;
  name: string;
  designation: string;
  monogram: string;
  suit: string;
  rank: string;
}

export const DIGNITARIES: DignitaryProfile[] = [
  {
    id: "dig-01",
    badge: "CHIEF PATRON",
    name: "DR. RAGHAVENDRA KULKARNI",
    designation: "PRINCIPAL & INSTITUTIONAL HEAD",
    monogram: "RK",
    suit: "♠",
    rank: "A",
  },
  {
    id: "dig-02",
    badge: "FACULTY CONVENOR",
    name: "PROF. MEENAKSHI DESHMUKH",
    designation: "DEAN OF STUDENT AFFAIRS",
    monogram: "MD",
    suit: "♦",
    rank: "K",
  },
];

export default function DignitariesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const header = el.querySelector(".dignitaries-header-reveal");
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

      const cards = el.querySelectorAll(".dignitary-card-reveal");
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
              trigger: el.querySelector(".dignitaries-grid"),
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
      id="dignitaries"
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
        <div className="dignitaries-header-reveal mb-12 sm:mb-16 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#FFF4E0] leading-none uppercase tracking-tight">
            DIGNITARIES & COUNCIL
          </h2>
          <p className="mt-2.5 font-tech text-xs sm:text-base text-[#FFF4E0]/75 max-w-2xl leading-relaxed">
            The institutional leadership, academic heads, and faculty deans providing official stewardship, governance, and enduring patronage for the Deck of Destinies.
          </p>
        </div>

        {/* Highlighted Dignitaries Portrait Cards */}
        <div className="dignitaries-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {DIGNITARIES.map((person) => (
            <div key={person.id} className="dignitary-card-reveal flex">
              <CardSpotlight
                radius={360}
                color="rgba(255, 170, 36, 0.28)"
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#FFAA24]/60 hover:border-[#FFAA24] bg-gradient-to-b from-[#1C1523] via-[#15101C] to-[#100C14] shadow-[0_20px_50px_rgba(255,170,36,0.14)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full"
              >
                {/* Background Watermark Suit */}
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 font-serif text-[9rem] sm:text-[11rem] leading-none text-[#FFAA24]/10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-tech font-bold tracking-widest uppercase bg-[#FFAA24]/10 border border-[#FFAA24]/40 text-[#FFAA24]">
                      {person.badge}
                    </span>
                    <div className="flex items-center gap-1 font-tech text-xs">
                      <span className="font-bold text-[#FFF4E0]">{person.rank}</span>
                      <span className="font-serif text-base text-[#FFAA24]">{person.suit}</span>
                    </div>
                  </div>

                  {/* HERO PORTRAIT / PHOTO CARD PLINTH */}
                  <div className="relative w-full aspect-[4/5] sm:h-72 rounded-xl sm:rounded-2xl border-2 border-[#FFAA24]/70 bg-gradient-to-b from-[#2A1E35] via-[#1E1527] to-[#140E1B] overflow-hidden flex flex-col justify-between p-3.5 shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Top-Left Card Index Pip */}
                    <div className="flex flex-col items-center leading-none text-xs font-bold font-tech text-[#FFF4E0]/80">
                      <span>{person.rank}</span>
                      <span className="font-serif text-sm text-[#FFAA24]">{person.suit}</span>
                    </div>

                    {/* Center Monogram / Portrait Artwork */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FFAA24]/20 blur-2xl pointer-events-none transition-all duration-300 group-hover:scale-125" />
                      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#FFF4E0]/10 pointer-events-none" />
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-dashed border-[#FFF4E0]/10 pointer-events-none" />

                      <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-wider leading-none select-none relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF4E0] via-[#FFAA24] to-[#E65C19]">
                        {person.monogram}
                      </span>
                    </div>

                    {/* Bottom-Right Inverted Card Index Pip */}
                    <div className="flex flex-col items-center leading-none text-xs font-bold font-tech text-[#FFF4E0]/80 rotate-180 self-end">
                      <span>{person.rank}</span>
                      <span className="font-serif text-sm text-[#FFAA24]">{person.suit}</span>
                    </div>
                  </div>

                  {/* HIGHLIGHTED NAME & CLEAN ROLE */}
                  <div className="mt-5 text-center sm:text-left">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#FFF4E0] leading-none tracking-wide uppercase transition-colors duration-200 group-hover:text-[#FFAA24]">
                      {person.name}
                    </h3>
                    <p className="font-tech text-xs font-bold tracking-widest uppercase mt-1.5 text-[#FFAA24]">
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
