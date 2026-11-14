"use client";

import React from "react";
import Navbar, { gsapScrollTo, SMOOTH_SCROLL_CONFIG } from "@/components/event/Navbar";
import ParallaxBackground from "@/components/event/ParallaxBackground";
import HeroSection from "@/components/event/HeroSection";
import AboutFestivalSection from "@/components/event/AboutFestivalSection";
import GallerySection from "@/components/event/GallerySection";
import CoreMembersSection from "@/components/event/CoreMembersSection";
import DignitariesSection from "@/components/event/DignitariesSection";
import FoundersSection from "@/components/event/FoundersSection";
import Footer from "@/components/event/Footer";

export default function Home() {
  const handleExploreFestival = () => {
    gsapScrollTo("#about", SMOOTH_SCROLL_CONFIG.duration, SMOOTH_SCROLL_CONFIG.offset);
  };

  return (
    <main className="relative min-h-screen bg-[#120E15] text-[#FFF4E0] selection:bg-[#FFAA24] selection:text-[#120E15] overflow-x-hidden">
      {/* 1. Top Navbar with Real-Time Glowing Scroll Progress Bar */}
      <Navbar />

      {/* 2. Global Multi-Layer Parallax Background with Dynamic Orbs & Floating Embers */}
      <ParallaxBackground />

      {/* 3. Monolith Corridor & 3D Shuffle Hero Section with Cascading Card Scroll */}
      <HeroSection onExploreGallery={handleExploreFestival} />

      {/* 4. Interactive Festival & Card Experience Sections */}
      <div id="festival-content" className="relative z-10">
        <AboutFestivalSection />
        <GallerySection />
        <CoreMembersSection />
        <DignitariesSection />
        <FoundersSection />
        <Footer />
      </div>
    </main>
  );
}
