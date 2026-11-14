"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function Navbar() {
  const scrollToWaitlist = () => {
    const el = document.getElementById("pre-register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl backdrop-blur-xl bg-slate-950/40 border-b border-slate-800/60 rounded-b-2xl mt-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20">
          <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-[10px]">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <span className="text-lg font-black tracking-wider text-white">
            SASKARAN <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">2026</span>
          </span>
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">Deck of Cards Event</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#about" className="hover:text-cyan-400 transition-colors">Experience</a>
        <a href="#cards" className="hover:text-cyan-400 transition-colors">The Deck</a>
        <a href="#pre-register" className="hover:text-cyan-400 transition-colors">Waitlist</a>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Prelaunch Stage
        </div>
        <Button onClick={scrollToWaitlist} variant="glow" size="sm">
          Get VIP Pass
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </header>
  );
}

