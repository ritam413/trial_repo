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
}

export const FOUNDERS: FounderProfile[] = [
  {
    id: "fnd-01",
    badge: "CO-FOUNDER",
    name: "AARAV JOSHI",
    designation: "FOUNDING PRESIDENT, SANSKARAN",
    monogram: "AJ",
  },
  {
    id: "fnd-02",
    badge: "CO-FOUNDER",
    name: "ANANYA IYER",
    designation: "FOUNDING CREATIVE DIRECTOR",
    monogram: "AI",
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
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0c4243] text-[#ffffff] border-b border-white/15 overflow-hidden z-10"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#d4c7ff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="founders-header-reveal mb-12 sm:mb-16 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-none uppercase tracking-tight">
            FOUNDERS OF SANSKARAN
          </h2>
          <p className="mt-2.5 font-tech text-xs sm:text-base text-[#d4c7ff]/85 max-w-2xl leading-relaxed">
            The visionary student founders and alumni stewards who established the initial charter of Sanskaran and expanded its creative momentum into Sahotsava.
          </p>
        </div>

        {/* Highlighted Founders Portrait Cards */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {FOUNDERS.map((person) => (
            <div key={person.id} className="founder-card-reveal flex">
              <CardSpotlight
                radius={360}
                color="rgba(113, 76, 182, 0.2)"
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/15 hover:border-[#d4c7ff] bg-[#ffffff]/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full"
              >
                {/* Background Watermark Monogram */}
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 font-display text-[9rem] sm:text-[11rem] font-black leading-none text-[#ffffff]/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                >
                  {person.monogram}
                </span>

                {/* Textured Cardstock Ambient Dot Grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#d4c7ff 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative z-10 flex flex-col">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-tech font-bold tracking-widest uppercase bg-[#ffffff]/15 border border-[#d4c7ff]/40 text-[#d4c7ff]">
                      {person.badge}
                    </span>
                    <span className="text-[#d4c7ff] font-tech text-xs">
                      ✦ FOUNDING STEWARD
                    </span>
                  </div>

                  {/* HERO PORTRAIT / PHOTO CARD PLINTH */}
                  <div className="relative w-full aspect-[4/5] sm:h-72 rounded-xl sm:rounded-2xl border border-white/15 bg-gradient-to-b from-[#082b2c] to-[#041c1d] overflow-hidden flex flex-col justify-center items-center p-3.5 shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Center Monogram / Portrait Artwork */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#d4c7ff]/20 blur-2xl pointer-events-none transition-all duration-300 group-hover:scale-125" />
                      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 pointer-events-none" />
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-dashed border-white/10 pointer-events-none" />

                      <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-wider leading-none select-none relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d4c7ff] to-[#714cb6]">
                        {person.monogram}
                      </span>
                    </div>
                  </div>

                  {/* HIGHLIGHTED NAME & CLEAN ROLE */}
                  <div className="mt-5 text-center sm:text-left">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#ffffff] leading-none tracking-wide uppercase transition-colors duration-200 group-hover:text-[#d4c7ff]">
                      {person.name}
                    </h3>
                    <p className="font-tech text-xs font-bold tracking-widest uppercase mt-1.5 text-[#d4c7ff]">
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
