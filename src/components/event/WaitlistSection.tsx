"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CheckCircle2, Mail, Sparkles, Send } from "lucide-react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Celebratory golden ember confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#FFAA24", "#E65C19", "#8B1E24", "#FFF4E0"],
        });
      } catch {
        // Fallback gracefully
      }
    }, 600);
  };

  return (
    <section id="pre-register" className="relative py-24 px-4 sm:px-8 max-w-4xl mx-auto z-10">
      <CardSpotlight
        color="rgba(255, 170, 36, 0.22)"
        className="p-8 sm:p-14 text-center border-[#FFAA24]/60 bg-gradient-to-b from-[#1C1622] via-[#151019] to-[#120E15] shadow-[0_20px_60px_rgba(255,170,36,0.12)]"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B1E24] bg-[#120E15]/80 text-[#FFAA24] text-xs font-mono uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FFAA24]" /> 04 // EARLY ACCESS PASS
        </div>

        <h2 className="font-display text-4xl sm:text-6xl text-[#FFF4E0] uppercase tracking-tight mb-3">
          CLAIM YOUR SEAT AT THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA24] to-[#E65C19]">TABLE</span>
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-[#FFAA24] mb-2">
          Every Card Holds a Story.
        </p>
        <p className="font-tech text-xs sm:text-sm text-[#FFF4E0]/75 max-w-xl mx-auto mb-10 leading-relaxed">
          Be the first to step inside the Deck of Destinies 3D arena. VIP attendees receive instant priority invites and exclusive holographic card skins.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#120E15] border border-[#FFAA24]/60 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-[#18121D] flex items-center justify-center text-[#FFAA24] mb-4 border border-[#FFAA24]/50 shadow-[0_0_25px_rgba(255,170,36,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl text-[#FFF4E0] mb-2 uppercase">You&apos;re on the VIP List!</h3>
            <p className="font-tech text-xs sm:text-sm text-[#FFF4E0]/80 max-w-md">
              We&apos;ve reserved your queue number. Keep an eye on <span className="text-[#FFAA24] font-mono">{email}</span> for your early access pass key.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFF4E0]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student / personal email..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#120E15] border border-[#FFF4E0]/20 text-[#FFF4E0] placeholder-[#FFF4E0]/40 font-tech text-xs sm:text-sm focus:outline-none focus:border-[#FFAA24] focus:ring-2 focus:ring-[#FFAA24]/30 transition-all"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 shrink-0 bg-gradient-to-r from-[#8B1E24] to-[#E65C19] hover:brightness-110 text-[#FFF4E0] border border-[#FFAA24] font-tech text-xs font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(230,92,25,0.45)] px-6"
            >
              {loading ? (
                "Securing..."
              ) : (
                <>
                  Pre-Register
                  <Send className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#FFF4E0]/50 font-mono">
          <span>✓ NO SPAM GUARANTEE</span>
          <span>✓ PRIORITY ACCESS BADGE</span>
          <span>✓ GENESIS CARD DROP</span>
        </div>
      </CardSpotlight>
    </section>
  );
}
