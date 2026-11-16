"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#B9ACF0]/20 bg-[#000000]/95 backdrop-blur-md py-12 px-4 sm:px-8 text-center z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="text-left">
          <p className="font-display text-2xl sm:text-3xl text-[#EDE8FF] tracking-wide uppercase">
            SANSKARAN &amp; SAHOTSAVA 2026
          </p>
          <p className="font-serif italic text-base text-[#B9ACF0] mt-0.5">Where Intellectual Heritage Meets Stadium Euphoria.</p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0C18] hover:bg-[#3A3F8E] border border-[#B9ACF0]/50 text-[#EDE8FF] font-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 text-[#DED5FF]" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}
