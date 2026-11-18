"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0d0d0e] text-[#ffffff] py-12 px-4 sm:px-8 text-center z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="text-left">
          <p className="font-display text-2xl sm:text-3xl text-[#ffffff] tracking-wide uppercase">
            SANSKARAN &amp; SAHOTSAVA 2026
          </p>
          <p className="font-serif italic text-base text-[#d4c7ff] mt-0.5">Where Intellectual Heritage Meets Stadium Euphoria.</p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#714cb6] border border-white/15 text-[#ffffff] font-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
        >
          <ArrowUp className="w-4 h-4 text-[#d4c7ff]" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}
