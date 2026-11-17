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
}

export const DIGNITARIES: DignitaryProfile[] = [
  {
    id: "dig-01",
    badge: "CHIEF PATRON",
    name: "DR. RAGHAVENDRA KULKARNI",
    designation: "PRINCIPAL & INSTITUTIONAL HEAD",
    monogram: "RK",
  },
  {
    id: "dig-02",
    badge: "FACULTY CONVENOR",
    name: "PROF. MEENAKSHI DESHMUKH",
    designation: "DEAN OF STUDENT AFFAIRS",
    monogram: "MD",
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
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#f2f0eb] border-b border-[#e3e3e2] overflow-hidden z-10"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#714cb6 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="dignitaries-header-reveal mb-12 sm:mb-16 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#292827] leading-none uppercase tracking-tight">
            DIGNITARIES &amp; COUNCIL
          </h2>
          <p className="mt-2.5 font-tech text-xs sm:text-base text-[#666666] max-w-2xl leading-relaxed">
            The institutional leadership, academic heads, and faculty deans providing official stewardship, governance, and enduring patronage for Sanskaran &amp; Sahotsava 2026.
          </p>
        </div>

        {/* Highlighted Dignitaries Portrait Cards */}
        <div className="dignitaries-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {DIGNITARIES.map((person) => (
            <div key={person.id} className="dignitary-card-reveal flex">
              <CardSpotlight
                radius={360}
                color="rgba(113, 76, 182, 0.15)"
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#e3e3e2] hover:border-[#714cb6] bg-[#ffffff] shadow-[0_20px_50px_rgba(41,40,39,0.06)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full"
              >
                {/* Background Watermark Monogram */}
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 font-display text-[9rem] sm:text-[11rem] font-black leading-none text-[#714cb6]/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                >
                  {person.monogram}
                </span>

                {/* Textured Cardstock Ambient Dot Grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#714cb6 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative z-10 flex flex-col">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-tech font-bold tracking-widest uppercase bg-[#d4c7ff]/40 border border-[#714cb6]/30 text-[#714cb6]">
                      {person.badge}
                    </span>
                    <span className="text-[#421d24] font-tech text-xs">
                      ✦ OFFICIAL PATRON
                    </span>
                  </div>

                  {/* HERO PORTRAIT / PHOTO CARD PLINTH */}
                  <div className="relative w-full aspect-[4/5] sm:h-72 rounded-xl sm:rounded-2xl border border-[#e3e3e2] bg-gradient-to-b from-[#f2f0eb] to-[#e3e3e2] overflow-hidden flex flex-col justify-center items-center p-3.5 shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Center Monogram / Portrait Artwork */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#d4c7ff]/30 blur-2xl pointer-events-none transition-all duration-300 group-hover:scale-125" />
                      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#292827]/10 pointer-events-none" />
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-dashed border-[#292827]/10 pointer-events-none" />

                      <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-wider leading-none select-none relative z-10 drop-shadow-[0_10px_20px_rgba(41,40,39,0.15)] text-transparent bg-clip-text bg-gradient-to-b from-[#421d24] via-[#714cb6] to-[#421d24]">
                        {person.monogram}
                      </span>
                    </div>
                  </div>

                  {/* HIGHLIGHTED NAME & CLEAN ROLE */}
                  <div className="mt-5 text-center sm:text-left">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#292827] leading-none tracking-wide uppercase transition-colors duration-200 group-hover:text-[#714cb6]">
                      {person.name}
                    </h3>
                    <p className="font-tech text-xs font-bold tracking-widest uppercase mt-1.5 text-[#714cb6]">
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
