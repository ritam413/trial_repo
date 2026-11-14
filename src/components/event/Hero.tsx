"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Countdown from "./Countdown";
import { Sparkles, ArrowRight, Play, Disc } from "lucide-react";

// Dynamically import the Three.js WebGL Scene with SSR disabled
const EventScene = dynamic(() => import("@/components/3d/EventScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const scrollToWaitlist = () => {
    const el = document.getElementById("pre-register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* 3D WebGL Canvas Background */}
      <EventScene className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none sm:pointer-events-auto" />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-slate-950/80 backdrop-blur-md text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Disc className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          The World’s Premier 3D Card Showcase
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
          DECK OF CARDS <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            GLOBAL EVENT 2026
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-slate-300 text-base sm:text-xl max-w-2xl font-normal leading-relaxed">
          Step into Saskaran’s interactive WebGL realm. 52 cards, real-time tactical arenas, and spatial physics unveiled for the next era of web gaming.
        </p>

        {/* Countdown */}
        <Countdown />

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Button onClick={scrollToWaitlist} variant="glow" size="lg" className="w-full sm:w-auto">
            Reserve Early Pass
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Play className="w-4 h-4 mr-1 text-cyan-400" />
            Explore Experience
          </Button>
        </div>

        {/* Micro stats banner */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 pt-8 border-t border-slate-800/80 text-center">
          <div>
            <div className="text-xl sm:text-3xl font-extrabold text-white font-mono">52</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Unique 3D Cards</div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-extrabold text-cyan-400 font-mono">10,000+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">VIP Pre-Registered</div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-extrabold text-indigo-400 font-mono">OCT 2026</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Global Reveal</div>
          </div>
        </div>
      </div>
    </section>
  );
}

