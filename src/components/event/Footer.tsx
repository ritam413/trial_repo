"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#8B1E24]/50 bg-[#120E15]/90 backdrop-blur-md py-12 px-4 sm:px-8 text-center z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="text-left">
          <p className="font-display text-2xl sm:text-3xl text-[#FFF4E0] tracking-wide uppercase">
            DECK OF DESTINIES // SANSKARAN &amp; SAHOTSAVA
          </p>
          <p className="font-serif italic text-base text-[#FFAA24] mt-0.5">Every Card Holds a Story.</p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18121D] hover:bg-[#8B1E24] border border-[#FFAA24]/60 text-[#FFF4E0] font-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 text-[#FFAA24]" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}
