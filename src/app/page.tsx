"use client";

import React, { useRef } from "react";
import ParallaxBackground from "@/components/event/ParallaxBackground";
import HeroSection from "@/components/event/HeroSection";
import GallerySection from "@/components/event/GallerySection";
import CoreMembersSection from "@/components/event/CoreMembersSection";
import WaitlistSection from "@/components/event/WaitlistSection";
import Footer from "@/components/event/Footer";

export default function Home() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const handleExploreFestival = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#120E15] text-[#FFF4E0] selection:bg-[#FFAA24] selection:text-[#120E15] overflow-x-hidden">
      {/* 1. Global Multi-Layer Parallax Background with Dynamic Orbs & Floating Embers */}
      <ParallaxBackground />

      {/* 2. Monolith Corridor & 3D Shuffle Hero Section with Cascading Card Scroll */}
      <HeroSection onExploreGallery={handleExploreFestival} />

      {/* 3. Interactive Festival & Card Experience Sections */}
      <div ref={scrollTargetRef} className="relative z-10">
        <GallerySection />
        <CoreMembersSection />
        <WaitlistSection />
        <Footer />
      </div>
    </main>
  );
}
