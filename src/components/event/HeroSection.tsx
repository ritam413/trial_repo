"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   1. VECTOR ICONS
   ========================================================================== */
const Icon = {
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  Shuffle: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  ),
  Layers: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Compass: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Flame: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Zap: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

/* ==========================================================================
   2. DESTINY FORTUNES DATA
   ========================================================================== */
interface Fortune {
  rank: string;
  suit: string;
  title: string;
  house: string;
  prophecy: string;
}

const DESTINY_FORTUNES: Fortune[] = [
  {
    rank: "A",
    suit: "♠",
    title: "THE ARCHITECT OF ECHOES",
    house: "HOUSE OF SANSKARAN",
    prophecy: "Your creative voice commands the amphitheater. Step forward—an unexpected artistic alliance awaits before twilight.",
  },
  {
    rank: "K",
    suit: "♥",
    title: "SOVEREIGN OF RHYTHM",
    house: "HOUSE OF SAHOTSAVA",
    prophecy: "Momentum surges in your favor. Tonight the arena moves to your cadence; take the boldest cue without hesitation.",
  },
  {
    rank: "Q",
    suit: "♦",
    title: "ORACLE OF THE CHECKERED COURT",
    house: "HOUSE OF FINE ARTS & DESIGN",
    prophecy: "Every detail you craft carries hidden symmetry. Look closely at the margins—your signature masterpiece is ready.",
  },
  {
    rank: "10",
    suit: "♦",
    title: "VANGUARD OF IGNITED AMBER",
    house: "HOUSE OF STAGE & SPECTACLE",
    prophecy: "Ten sparks converge into one blaze. Lead your ensemble into uncharted territory and claim the spotlight.",
  },
  {
    rank: "A",
    suit: "♣",
    title: "CATALYST OF THE UNPREDICTABLE",
    house: "DECK OF DESTINIES // WILD CARD",
    prophecy: "Boundaries dissolve where you walk. Expect spontaneous street cyphers, secret sessions, and timeless memories.",
  },
];

const EASE_SWISS = [0.22, 1, 0.36, 1] as const;

/* ==========================================================================
   3. PROCEDURAL CANVAS TEXTURES
   ========================================================================== */
function createCardFaceTexture(rank: string, suit: string, stock: "ivory" | "obsidian"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = stock === "ivory" ? "#FFF4E0" : "#120E15";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1800; i++) {
    ctx.fillStyle = stock === "ivory" ? "rgba(18, 14, 21, 0.04)" : "rgba(255, 244, 224, 0.05)";
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
  }

  const primaryInk = stock === "ivory" ? (suit === "♦" || suit === "♥" ? "#8B1E24" : "#120E15") : "#FFAA24";
  const secondaryInk = stock === "ivory" ? "#E65C19" : "#FFF4E0";

  ctx.strokeStyle = primaryInk;
  ctx.lineWidth = 7;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  ctx.strokeStyle = secondaryInk;
  ctx.lineWidth = 2;
  ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76);

  ctx.fillStyle = primaryInk;
  ctx.font = 'bold 68px "Bebas Neue", Impact, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(rank, 80, 110);
  ctx.font = "48px serif";
  ctx.fillText(suit, 80, 160);

  ctx.save();
  ctx.translate(canvas.width - 80, canvas.height - 110);
  ctx.rotate(Math.PI);
  ctx.font = 'bold 68px "Bebas Neue", Impact, sans-serif';
  ctx.fillText(rank, 0, 0);
  ctx.font = "48px serif";
  ctx.fillText(suit, 0, 50);
  ctx.restore();

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  const radial = ctx.createRadialGradient(0, 0, 12, 0, 0, 175);
  radial.addColorStop(0, "rgba(255, 170, 36, 0.42)");
  radial.addColorStop(0.55, "rgba(230, 92, 25, 0.16)");
  radial.addColorStop(1, "rgba(18, 14, 21, 0)");
  ctx.fillStyle = radial;
  ctx.beginPath();
  ctx.arc(0, 0, 175, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = primaryInk;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 134, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = secondaryInk;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(-92, -92, 184, 184);
  ctx.restore();

  ctx.fillStyle = primaryInk;
  ctx.font = "156px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(suit, 0, 6);

  ctx.fillStyle = secondaryInk;
  ctx.font = "bold 15px monospace";
  ctx.fillText("DECK OF DESTINIES", 0, -184);
  ctx.fillText("SANSKARAN • SAHOTSAVA", 0, 188);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createCardBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#120E15";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#8B1E24";
  ctx.fillRect(26, 26, canvas.width - 52, canvas.height - 52);

  ctx.strokeStyle = "rgba(255, 170, 36, 0.34)";
  ctx.lineWidth = 1.5;
  for (let i = -400; i < 900; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, 26);
    ctx.lineTo(i + 400, canvas.height - 26);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + 400, 26);
    ctx.lineTo(i, canvas.height - 26);
    ctx.stroke();
  }

  ctx.strokeStyle = "#FFF4E0";
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  ctx.strokeStyle = "#FFAA24";
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "#120E15";
  ctx.beginPath();
  ctx.arc(0, 0, 114, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#FFAA24";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 114, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#FFF4E0";
  ctx.font = 'bold 34px "Bebas Neue", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("S & S", 0, 2);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ==========================================================================
   4. SPATIAL HUD COMPONENT
   ========================================================================== */
interface HUDProps {
  mode: "shuffle" | "corridor";
  shuffleCount: number;
  cardCount: number;
  webglActive: boolean;
  surgeActive: boolean;
  onModeChange: (mode: "shuffle" | "corridor") => void;
  onShuffleBurst: () => void;
  onDrawFortune: () => void;
  onTriggerSurge: () => void;
}

function ThreeUISpatialHUD({
  mode,
  shuffleCount,
  cardCount,
  webglActive,
  surgeActive,
  onModeChange,
  onShuffleBurst,
  onDrawFortune,
  onTriggerSurge,
}: HUDProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 px-3 py-1.5 rounded-lg bg-[#120E15]/85 backdrop-blur-md border border-[#FFF4E0]/15 text-[10px] sm:text-xs font-mono tracking-wider text-[#FFF4E0]/80">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              surgeActive
                ? "bg-cyan-400 animate-ping"
                : webglActive
                ? "bg-[#FFAA24] animate-pulse"
                : "bg-[#E65C19]"
            }`}
          />
          <span className="text-[#FFAA24] font-semibold">THREEUI // HUD</span>
          <span className="text-[#FFF4E0]/40">|</span>
          <span className={surgeActive ? "text-cyan-300 font-bold animate-pulse" : ""}>
            {surgeActive
              ? "⚡ WARP SURGE ACTIVE"
              : mode === "shuffle"
              ? "3D RIFFLE HELIX"
              : "MONOLITH CORRIDOR"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#FFF4E0]/70">
          <span>DECK: {cardCount}</span>
          <span>SHUFFLES: #{String(shuffleCount).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="sm:col-span-2 grid grid-cols-2 p-1 rounded-xl bg-[#120E15]/90 backdrop-blur-md border border-[#8B1E24] shadow-[0_10px_30px_rgba(0,0,0,0.65)]">
          <button
            type="button"
            onClick={() => onModeChange("shuffle")}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              mode === "shuffle"
                ? "bg-[#FFAA24] text-[#120E15] shadow-[0_0_20px_rgba(255,170,36,0.45)]"
                : "text-[#FFF4E0]/80 hover:text-[#FFF4E0]"
            }`}
          >
            <Icon.Layers className="w-3.5 h-3.5 shrink-0" />
            <span>3D Shuffle</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (mode === "corridor") {
                onTriggerSurge();
              } else {
                onModeChange("corridor");
              }
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              mode === "corridor"
                ? surgeActive
                  ? "bg-gradient-to-r from-[#FFAA24] to-cyan-400 text-[#120E15] shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                  : "bg-[#E65C19] text-[#FFF4E0] shadow-[0_0_20px_rgba(230,92,25,0.5)]"
                : "text-[#FFF4E0]/80 hover:text-[#FFF4E0]"
            }`}
          >
            <Icon.Compass className="w-3.5 h-3.5 shrink-0" />
            <span>{mode === "corridor" ? (surgeActive ? "Surging..." : "Surge Corridor") : "Monolith Corridor"}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onShuffleBurst}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#120E15]/90 hover:bg-[#8B1E24] text-[#FFF4E0] border border-[#FFAA24]/60 text-xs font-bold tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
          >
            <Icon.Shuffle className="w-3.5 h-3.5 text-[#FFAA24] shrink-0" />
            <span>Shuffle</span>
          </button>

          <button
            type="button"
            onClick={onDrawFortune}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#8B1E24] to-[#E65C19] hover:brightness-110 text-[#FFF4E0] border border-[#FFAA24] text-xs font-bold tracking-wider uppercase shadow-[0_0_24px_rgba(230,92,25,0.45)] transition-all active:scale-95 cursor-pointer"
          >
            <Icon.Sparkles className="w-3.5 h-3.5 text-[#FFAA24] shrink-0" />
            <span>Draw Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. MAIN HERO SECTION COMPONENT (With Scroll-Cascading Parallax & Cursor Following)
   ========================================================================== */
interface HeroSectionProps {
  onExploreGallery?: () => void;
}

export default function HeroSection({ onExploreGallery }: HeroSectionProps) {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const [heroMode, setHeroMode] = useState<"shuffle" | "corridor">("shuffle");
  const [shuffleCount, setShuffleCount] = useState(1);
  const [webglActive, setWebglActive] = useState(true);
  const [drawnFortune, setDrawnFortune] = useState<Fortune | null>(null);
  const [surgeActive, setSurgeActive] = useState(false);

  // GSAP animation & dynamic parallax state
  const animStateRef = useRef({
    introDeal: 0, // Starts at 0, cards fly in from side
    modeBlend: 0, // 0 = 3D Shuffle, 1 = Monolith Corridor
    corridorSurge: 0, // 0 to 1 on clicking monolith corridor
    scrollProgress: 0, // Continuous scroll progress
    heroInfluence: 1, // 1 when at top in hero, 0 when scrolled away
    spadeInfluence: 0, // 1 when viewing "What is Sanskaran" / Archetypes section
    clubInfluence: 0, // 1 when viewing "Gallery / Capabilities" section
    heartInfluence: 0, // 1 when viewing "Genesis Pass / Pre-register" section
    diamondInfluence: 0, // 1 when viewing "New Core Members" section
    shuffleImpulse: 0,
    pointerX: 0,
    pointerY: 0,
  });

  // Switch mode smoothly using GSAP
  const handleModeChange = useCallback((newMode: "shuffle" | "corridor") => {
    setHeroMode(newMode);
    const targetBlend = newMode === "corridor" ? 1 : 0;

    gsap.to(animStateRef.current, {
      modeBlend: targetBlend,
      duration: 1.4,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, []);

  // Corridor Warp & Surge Trigger
  const handleTriggerCorridorSurge = useCallback(() => {
    gsap.killTweensOf(animStateRef.current, "corridorSurge");
    setSurgeActive(true);

    gsap
      .timeline({
        onComplete: () => setSurgeActive(false),
      })
      .to(animStateRef.current, {
        corridorSurge: 1.0,
        duration: 0.85,
        ease: "power3.in",
      })
      .to(animStateRef.current, {
        corridorSurge: 0.0,
        duration: 1.4,
        ease: "power3.out",
      });
  }, []);

  const handleShuffleBurst = useCallback(() => {
    gsap.killTweensOf(animStateRef.current, "shuffleImpulse");
    animStateRef.current.shuffleImpulse = 1.0;
    gsap.to(animStateRef.current, {
      shuffleImpulse: 0,
      duration: 1.2,
      ease: "power2.out",
    });
    setShuffleCount((c) => c + 1);
  }, []);

  const handleDrawFortune = useCallback(() => {
    handleShuffleBurst();
    const pick = DESTINY_FORTUNES[Math.floor(Math.random() * DESTINY_FORTUNES.length)];
    setDrawnFortune(pick);
  }, [handleShuffleBurst]);

  const handleHeroClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) return;

    if (animStateRef.current.modeBlend > 0.4) {
      handleTriggerCorridorSurge();
    }
  };

  // INITIAL LOAD ANIMATION SEQUENCE:
  // 1. Cards fly in from the side into 3D shuffle
  // 2. Stay in 3D shuffle position for 1 second
  // 3. Converts to monolith corridor
  useEffect(() => {
    const introTl = gsap.timeline({ delay: 0.2 });

    introTl
      .to(animStateRef.current, {
        introDeal: 1.0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to({}, { duration: 1.0 }) // Stay in 3D shuffle for 1.0s
      .to(animStateRef.current, {
        modeBlend: 1.0,
        duration: 1.6,
        ease: "power2.inOut",
        onStart: () => setHeroMode("corridor"),
      });

    return () => {
      introTl.kill();
    };
  }, []);

  // Continuous Window Scroll Listener & Section Spotlight Coordinator
  useEffect(() => {
    const calcSectionInfluence = (elementId: string, windowH: number) => {
      const el = document.getElementById(elementId);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      // Target viewing center: when the section header is in the active reading area
      const headerCenter = rect.top + Math.min(rect.height, windowH) * 0.35;
      const viewCenter = windowH * 0.45;
      const dist = Math.abs(headerCenter - viewCenter) / (windowH * 0.65);
      const raw = THREE.MathUtils.clamp(1 - dist, 0, 1);
      return raw * raw * (3 - 2 * raw); // smoothstep
    };

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowH = window.innerHeight || 800;

      // 1. Hero influence: 1 at top, fades to 0 as user scrolls past hero
      const heroInf = THREE.MathUtils.clamp(1 - scrollY / (windowH * 0.72), 0, 1);
      animStateRef.current.heroInfluence = heroInf * heroInf * (3 - 2 * heroInf);

      // 2. Section "cards" (What is Sanskaran / Archetypes) -> Summons ONLY the Spade card!
      animStateRef.current.spadeInfluence = calcSectionInfluence("cards", windowH);

      // 3. Section "gallery" (Side-Flowing Gallery / Reels) -> Summons Club card
      animStateRef.current.clubInfluence = calcSectionInfluence("gallery", windowH) || calcSectionInfluence("about", windowH);

      // 4. Section "pre-register" (Genesis Pass Deck) -> Summons Heart card
      animStateRef.current.heartInfluence = calcSectionInfluence("pre-register", windowH);

      // 5. Section "core-members" (New Core Members / Diamond Court) -> Summons Diamond card
      animStateRef.current.diamondInfluence = calcSectionInfluence("core-members", windowH);

      animStateRef.current.scrollProgress = scrollY / windowH;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global Pointer/Mouse Tracking across the entire window
  useEffect(() => {
    const handleGlobalPointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      animStateRef.current.pointerX = nx;
      animStateRef.current.pointerY = ny;
    };

    window.addEventListener("mousemove", handleGlobalPointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalPointerMove);
  }, []);

  // ScrollTrigger to guarantee corridor mode is engaged when user scrolls down
  useEffect(() => {
    if (!heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroContainerRef.current,
        start: "top top",
        end: "+=80%",
        onLeave: () => {
          if (animStateRef.current.modeBlend < 1) {
            gsap.to(animStateRef.current, { modeBlend: 1.0, duration: 0.8, ease: "power2.out" });
            setHeroMode("corridor");
          }
        },
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let cardGeo: THREE.BoxGeometry | null = null;
    let floorGeo: THREE.PlaneGeometry | null = null;
    let particleGeo: THREE.BufferGeometry | null = null;
    let backTexture: THREE.CanvasTexture | null = null;
    let faceTextures: THREE.CanvasTexture[] = [];

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 640;

    const scene = new THREE.Scene();
    // Transparent scene background so ParallaxBackground shows through seamlessly
    const fog = new THREE.FogExp2("#140E17", 0.022);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(isMobile ? 56 : 44, width / height, 0.1, 100);
    camera.position.set(0, 0.3, isMobile ? 10.6 : 8.2);

    const handleResize = () => {
      if (!renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.fov = w < 640 ? 56 : 44;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
      setWebglActive(true);

      // Lighting
      const ambientLight = new THREE.AmbientLight("#FFF4E0", 0.65);
      scene.add(ambientLight);

      const solarFlareLight = new THREE.PointLight("#FFAA24", 5.0, 38);
      solarFlareLight.position.set(0, 3.6, 4.5);
      scene.add(solarFlareLight);

      const horizonBacklight = new THREE.PointLight("#FFAA24", 7.5, 48);
      horizonBacklight.position.set(0, 2.5, -16);
      scene.add(horizonBacklight);

      const amberFill = new THREE.PointLight("#E65C19", 4.0, 28);
      amberFill.position.set(-5, -1.5, 3);
      scene.add(amberFill);

      const crimsonRim = new THREE.PointLight("#8B1E24", 4.5, 28);
      crimsonRim.position.set(5, 2, -2);
      scene.add(crimsonRim);

      // Floor
      floorGeo = new THREE.PlaneGeometry(60, 80);
      const floorMat = new THREE.MeshStandardMaterial({
        color: "#0B0B0D",
        roughness: 0.35,
        metalness: 0.72,
        transparent: true,
        opacity: 0.28,
      });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.y = -3.8;
      scene.add(floorMesh);

      // Procedural Textures
      backTexture = createCardBackTexture();
      const specs: Array<{ rank: string; suit: string; stock: "ivory" | "obsidian" }> = [
        { rank: "A", suit: "♠", stock: "ivory" },
        { rank: "A", suit: "♣", stock: "ivory" },
        { rank: "K", suit: "♥", stock: "ivory" },
        { rank: "Q", suit: "♦", stock: "ivory" },
        { rank: "10", suit: "♦", stock: "ivory" },
        { rank: "A", suit: "♠", stock: "obsidian" },
      ];
      faceTextures = specs.map((s) => createCardFaceTexture(s.rank, s.suit, s.stock));

      const CARD_COUNT = 18;
      cardGeo = new THREE.BoxGeometry(1.65, 2.48, 0.028);

      const edgeMat = new THREE.MeshStandardMaterial({
        color: "#FFAA24",
        emissive: "#8B1E24",
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.8,
      });
      const backMat = new THREE.MeshStandardMaterial({
        map: backTexture,
        roughness: 0.35,
        metalness: 0.22,
      });

      const corridorSpots = [
        { x: -2.15, z: 2.1, rotY: 0.28, scale: 1.76 },
        { x: 2.15, z: 1.5, rotY: -0.32, scale: 1.82 },
        { x: -1.15, z: -1.4, rotY: 0.16, scale: 1.68 },
        { x: 2.75, z: -2.0, rotY: -0.25, scale: 1.72 },
        { x: -2.85, z: -3.4, rotY: 0.38, scale: 1.65 },
        { x: 0.85, z: -4.8, rotY: -0.14, scale: 1.6 },
        { x: -1.65, z: -6.5, rotY: 0.22, scale: 1.58 },
        { x: 1.95, z: -7.8, rotY: -0.2, scale: 1.62 },
        { x: -0.35, z: -9.5, rotY: 0.08, scale: 1.55 },
      ];

      const cards: Array<{
        mesh: THREE.Mesh;
        corridorPos: THREE.Vector3;
        corridorRotY: number;
        corridorScale: number;
        phase: number;
      }> = [];

      for (let i = 0; i < CARD_COUNT; i++) {
        const frontMat = new THREE.MeshStandardMaterial({
          map: faceTextures[i % faceTextures.length],
          roughness: 0.32,
          metalness: 0.18,
        });
        const mesh = new THREE.Mesh(cardGeo, [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat]);
        scene.add(mesh);

        const spot = corridorSpots[i % corridorSpots.length];
        const tier = Math.floor(i / corridorSpots.length);
        cards.push({
          mesh,
          corridorPos: new THREE.Vector3(
            spot.x * (tier === 0 ? 1 : 1.15),
            -0.45 + (spot.scale - 1.6) * 1.1,
            spot.z - tier * 10.5
          ),
          corridorRotY: spot.rotY,
          corridorScale: spot.scale,
          phase: (i / CARD_COUNT) * Math.PI * 2,
        });
      }

      // Embers
      const particleCount = 180;
      particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: "#FFAA24",
        size: 0.08,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const embers = new THREE.Points(particleGeo, particleMat);
      scene.add(embers);

      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();
      const targetPos = new THREE.Vector3();
      const targetScaleVec = new THREE.Vector3();

      const animateLoop = () => {
        animationFrameId = requestAnimationFrame(animateLoop);
        if (!renderer) return;

        const dt = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.getElapsedTime();

        const deal = animStateRef.current.introDeal; // 0 to 1
        const modeBlend = animStateRef.current.modeBlend; // 0 to 1
        const burst = animStateRef.current.shuffleImpulse;
        const surge = animStateRef.current.corridorSurge; // 0 to 1
        const scroll = animStateRef.current.scrollProgress; // 0 to 1+

        // Fog
        const shuffleFog = new THREE.Color("#140E17");
        const corridorFog = new THREE.Color(surge > 0.3 ? "#A84C0F" : "#8A420E");
        fog.color.lerpColors(shuffleFog, corridorFog, modeBlend);
        fog.density = THREE.MathUtils.lerp(0.032, 0.072 + surge * 0.02, modeBlend);

        floorMesh.position.y = THREE.MathUtils.lerp(-4.5, -3.2 - scroll * 5.0, modeBlend);

        // Camera Dynamics:
        const mobileNow = (window.innerWidth) < 640;
        const baseZ = THREE.MathUtils.lerp(mobileNow ? 10.6 : 8.1, mobileNow ? 7.8 : 6.4, modeBlend);
        const surgeZPlunge = surge * 7.5;

        // Camera smoothly follows mouse pointer with depth lerp & vertical scroll tracking
        const scrollCamY = -scroll * 0.8;
        const targetCamX = animStateRef.current.pointerX * (mobileNow ? 0.55 : 0.95);
        const targetCamY = THREE.MathUtils.lerp(0.35, -0.22, modeBlend) + scrollCamY + animStateRef.current.pointerY * 0.45;

        camera.position.x += (targetCamX - camera.position.x) * 0.06;
        camera.position.y += (targetCamY - camera.position.y) * 0.06;
        camera.position.z += (baseZ - surgeZPlunge - camera.position.z) * (surge > 0.1 ? 0.12 : 0.06);
        camera.lookAt(0, THREE.MathUtils.lerp(0.1, -0.3, modeBlend) + scrollCamY, THREE.MathUtils.lerp(0, -10, modeBlend));

        // Light Surges
        horizonBacklight.intensity = 7.5 + surge * 18.0;
        solarFlareLight.intensity = 5.0 + surge * 5.0;
        edgeMat.emissiveIntensity = 0.5 + surge * 2.5;

        // SECTION COORDINATION WEIGHTS:
        const heroInf = animStateRef.current.heroInfluence;   // 1 in hero, 0 outside
        const spadeInf = animStateRef.current.spadeInfluence; // 1 in Sanskaran Archetypes section
        const clubInf = animStateRef.current.clubInfluence;   // 1 in Gallery / Capabilities section
        const heartInf = animStateRef.current.heartInfluence; // 1 in Pre-register / Pass section
        const diamondInf = animStateRef.current.diamondInfluence; // 1 in Core Members section

        // Animate each card
        for (let i = 0; i < CARD_COUNT; i++) {
          const card = cards[i];
          const norm = (i - (CARD_COUNT - 1) / 2) / (CARD_COUNT / 2);

          const riffleWave = Math.sin(elapsed * 2.2 + card.phase);
          const burstSpread = burst * Math.sin(card.phase * 2.0) * 2.4;
          const fanAngle = norm * (0.95 + burst * 0.45) + Math.sin(elapsed * 0.8) * 0.15;
          const radius = (mobileNow ? 2.1 : 2.75) + Math.abs(norm) * 0.65 + burst * 1.1;

          // Staggered per-card side deal so EVERY card flies in from the side sequentially:
          const cardDealStagger = (i / CARD_COUNT) * 0.45;
          const cardDealRaw = THREE.MathUtils.clamp((deal - cardDealStagger) / (1 - 0.45), 0, 1);
          const cardDealEased = cardDealRaw * cardDealRaw * (3 - 2 * cardDealRaw);
          const sideFlyX = (i % 2 === 0 ? -26 : 26) * (1 - cardDealEased) + (i - 9) * 0.4 * (1 - cardDealEased);
          const sideFlyRotZ = (i % 2 === 0 ? -2.2 : 2.2) * (1 - cardDealEased);
          const sideFlyRotY = (i % 2 === 0 ? 2.8 : -2.8) * (1 - cardDealEased);

          // 3D Shuffle Position
          const shuffleX = Math.sin(fanAngle) * radius + Math.cos(elapsed * 1.6 + card.phase) * 0.32 + burstSpread * 0.5 + sideFlyX;
          const shuffleY =
            Math.cos(fanAngle) * 1.15 -
            0.35 +
            riffleWave * 0.35 +
            Math.sin(elapsed * 3.2 + i * 0.55) * (0.18 + burst * 0.5);
          const shuffleZ = -Math.abs(norm) * 1.85 + Math.sin(elapsed * 2.4 + card.phase) * 0.65 - burst * 0.8;

          const shuffleRotX = Math.sin(elapsed * 1.4 + card.phase) * 0.22 + burst * 0.5;
          const shuffleRotY = -fanAngle * 0.72 + Math.sin(elapsed * 1.9 + card.phase) * 0.38 + burst * Math.PI * 2 + sideFlyRotY;
          const shuffleRotZ = -fanAngle * 0.42 + riffleWave * 0.08 + sideFlyRotZ;

          // Base Monolith Corridor Position with Surge Plunge & Idle Wave
          const corridorSpreadSurge = 1 + surge * 0.22;
          const surgeWave = Math.sin(elapsed * 5.0 + i * 0.5) * surge * 0.75;
          const idleWaveY = Math.sin(elapsed * 1.5 + card.phase) * 0.08;
          const idleWaveRot = Math.sin(elapsed * 1.1 + card.phase) * 0.04;

          const heroCorridorX = card.corridorPos.x * corridorSpreadSurge;
          const heroCorridorY = card.corridorPos.y + idleWaveY + surgeWave;
          const heroCorridorZ = card.corridorPos.z;

          // In-Hero Position (interpolates between 3D Shuffle and Monolith Corridor)
          const inHeroX = THREE.MathUtils.lerp(shuffleX, heroCorridorX, modeBlend);
          const inHeroY = THREE.MathUtils.lerp(shuffleY, heroCorridorY, modeBlend);
          const inHeroZ = THREE.MathUtils.lerp(shuffleZ, heroCorridorZ, modeBlend);
          const inHeroRotX = THREE.MathUtils.lerp(shuffleRotX, 0, modeBlend);
          const inHeroRotY = THREE.MathUtils.lerp(shuffleRotY, card.corridorRotY + idleWaveRot, modeBlend);
          const inHeroRotZ = THREE.MathUtils.lerp(shuffleRotZ, 0, modeBlend);
          const inHeroScale = THREE.MathUtils.lerp(
            mobileNow ? 0.86 : 1.0,
            card.corridorScale * (1 + surge * 0.18),
            modeBlend
          );

          // CURSOR PARALLAX SPRING FACTOR
          const depthFactor = (1 - (card.corridorPos.z / -12)) * 0.75 + 0.35;
          const cursorFollowX = animStateRef.current.pointerX * (1.1 * depthFactor);
          const cursorFollowY = animStateRef.current.pointerY * (0.8 * depthFactor);
          const cursorTiltZ = animStateRef.current.pointerX * (-0.14 * depthFactor);
          const cursorTiltX = animStateRef.current.pointerY * (0.12 * depthFactor);
          const cursorTiltY = animStateRef.current.pointerX * (0.24 * depthFactor);

          // DEFAULT TARGET: in-hero position with cursor follow
          let destX = inHeroX + cursorFollowX * heroInf;
          let destY = inHeroY + cursorFollowY * heroInf;
          let destZ = inHeroZ;
          let destRotX = inHeroRotX + cursorTiltX * heroInf;
          let destRotY = inHeroRotY + cursorTiltY * heroInf;
          let destRotZ = inHeroRotZ + cursorTiltZ * heroInf;
          let destScale = inHeroScale;

          // CONTINUOUS MOVIE VERTICAL PARALLAX (HENRIETTA-INSPIRED):
          // Cards NEVER minimize to infinity! Full physical scale is maintained.
          // Cards glide continuously vertically past the camera with differential layer speeds,
          // flanking the left & right gutters as you scroll down the page like a continuous film.

          const isLeft = (i % 2 === 0);
          const colTier = i % 3; // 0, 1, 2

          // Horizontal placement: Flanks the left and right gutters to keep the central reading column clear
          const flankMarginX = isLeft
            ? (-3.1 - colTier * 0.7)
            : (3.1 + colTier * 0.7);
          const targetFlankX = mobileNow
            ? (isLeft ? -1.75 : 1.75)
            : flankMarginX;

          // Continuous vertical parallax velocity:
          // Staggered vertical base spacing so cards are distributed along the vertical travel axis
          const verticalBaseY = ((i % 6) - 2.5) * 2.4;
          // Differential parallax speed per card layer (2.2 to 4.5)
          const parallaxSpeed = 2.4 + ((i * 3) % 7) * 0.35;
          // Smooth continuous vertical drift upwards as user scrolls down:
          const verticalParallaxY = verticalBaseY + (scroll * parallaxSpeed * 2.2);

          // Natural 3D depth layering:
          // Cards remain clearly visible between Z = +1.8 and Z = -6.5, NEVER disappearing into fog or infinity
          const naturalLayerZ = -0.5 - colTier * 2.2 + (isLeft ? 0.8 : -0.8);

          // Full physical scale: preserved at full scale (with subtle perspective scaling based on layer)
          const fullMovieScale = (mobileNow ? 0.88 : 1.05) * (1 - colTier * 0.08);

          // Continuous Rotational Cinematic Sway:
          const movieSwayRotX = Math.sin(elapsed * 1.1 + card.phase) * 0.12 + cursorTiltX * 0.8;
          const movieSwayRotY = (isLeft ? 0.22 : -0.22) + Math.cos(elapsed * 0.85 + card.phase) * 0.08 + cursorTiltY * 0.8;
          const movieSwayRotZ = (isLeft ? -0.06 : 0.06) + Math.sin(elapsed * 1.4 + card.phase) * 0.05 + cursorTiltZ * 0.8;

          // When heroInf = 1 (Hero section), cards sit in their 3D Shuffle / Monolith Corridor.
          // As user scrolls down (heroInf -> 0), cards seamlessly transition into the continuous vertical movie!
          destX = THREE.MathUtils.lerp(targetFlankX + cursorFollowX, inHeroX + cursorFollowX * heroInf, heroInf);
          destY = THREE.MathUtils.lerp(verticalParallaxY + idleWaveY + cursorFollowY, inHeroY + cursorFollowY * heroInf, heroInf);
          destZ = THREE.MathUtils.lerp(naturalLayerZ, inHeroZ, heroInf);
          destScale = THREE.MathUtils.lerp(fullMovieScale, inHeroScale, heroInf);
          destRotX = THREE.MathUtils.lerp(movieSwayRotX, inHeroRotX + cursorTiltX * heroInf, heroInf);
          destRotY = THREE.MathUtils.lerp(movieSwayRotY, inHeroRotY + cursorTiltY * heroInf, heroInf);
          destRotZ = THREE.MathUtils.lerp(movieSwayRotZ, inHeroRotZ + cursorTiltZ * heroInf, heroInf);

          targetPos.set(destX, destY, destZ);
          card.mesh.position.lerp(targetPos, 0.12);

          card.mesh.rotation.x += (destRotX - card.mesh.rotation.x) * 0.12;
          card.mesh.rotation.y += (destRotY - card.mesh.rotation.y) * 0.12;
          card.mesh.rotation.z += (destRotZ - card.mesh.rotation.z) * 0.12;

          targetScaleVec.set(destScale, destScale, destScale);
          card.mesh.scale.lerp(targetScaleVec, 0.12);
        }

        // Particle Warp Stream during Surge
        embers.rotation.y = elapsed * 0.04;
        if (particleGeo) {
          const posAttr = particleGeo.getAttribute("position");
          for (let i = 0; i < particleCount; i++) {
            let py = posAttr.getY(i) + dt * (0.35 + (i % 5) * 0.08 + surge * 5.5);
            let pz = posAttr.getZ(i) + dt * (surge * 18.0);
            if (pz > 14) pz = -14;
            posAttr.setZ(i, pz);
            if (py > 6) py = -6;
            posAttr.setY(i, py);
          }
          posAttr.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };

      animateLoop();
    } catch {
      setWebglActive(false);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      cardGeo?.dispose();
      floorGeo?.dispose();
      particleGeo?.dispose();
      backTexture?.dispose();
      faceTextures.forEach((t) => t.dispose());
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    animStateRef.current.pointerX = nx;
    animStateRef.current.pointerY = ny;
  };

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      onClick={handleHeroClick}
      onPointerMove={handlePointerMove}
      className={`relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 sm:pt-24 sm:pb-12 ${
        heroMode === "corridor" ? "cursor-pointer" : ""
      }`}
    >
      {/* 3D WebGL Canvas Layer - Fixed so cards remain visible throughout page scroll */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        aria-hidden="true"
      />

      {/* Fallback 2D Stack if WebGL is disabled */}
      {!webglActive && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="relative w-64 h-80 flex items-center justify-center">
            {[-24, -12, 0, 12, 24].map((deg, idx) => (
              <div
                key={deg}
                style={{ transform: `rotate(${deg}deg) translateY(${Math.abs(deg) * 0.4}px)` }}
                className="absolute w-44 h-64 rounded-2xl bg-[#FFF4E0] border-2 border-[#8B1E24] shadow-[0_0_40px_rgba(255,170,36,0.3)] flex flex-col justify-between p-4 text-[#120E15]"
              >
                <span className="font-display text-2xl font-bold">{["10♦", "Q♦", "A♠", "K♥", "A♣"][idx]}</span>
                <span className="text-5xl self-center text-[#8B1E24]">{["♦", "♦", "♠", "♥", "♣"][idx]}</span>
                <span className="font-display text-2xl font-bold self-end rotate-180">{["10♦", "Q♦", "A♠", "K♥", "A♣"][idx]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtle Atmosphere Light Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,170,36,0.06) 0%, rgba(18,14,21,0.2) 65%, transparent 100%)",
        }}
      />

      {/* Top Banner Tag */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_SWISS }}
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#120E15]/80 backdrop-blur-md border border-[#8B1E24] text-[#FFF4E0]"
        >
          <Icon.Flame className="w-3.5 h-3.5 text-[#FFAA24]" />
          <span className="font-tech text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
            SANSKARAN &amp; SAHOTSAVA // ANNUAL EDITION
          </span>
        </motion.div>
      </div>

      {/* Main Hero Typography & HUD */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 mt-auto pt-36 sm:pt-44">
        <div className="border-l-2 border-[#FFAA24] pl-4 sm:pl-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE_SWISS }}
            className="font-serif italic text-lg sm:text-2xl text-[#FFAA24] mb-1"
          >
            Every Card Holds a Story.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE_SWISS }}
            className="font-display text-6xl sm:text-8xl lg:text-[7.25rem] leading-[0.88] tracking-tight text-[#FFF4E0] uppercase drop-shadow-[0_6px_30px_rgba(18,14,21,0.95)]"
          >
            DECK OF{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA24] via-[#E65C19] to-[#FFF4E0]">
              DESTINIES
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: EASE_SWISS }}
            className="mt-3 sm:mt-4 font-tech text-xs sm:text-base text-[#FFF4E0]/85 max-w-xl leading-relaxed"
          >
            Every card represents a different destiny, talent, culture and identity. Together, they create an unpredictable world of experiences.
          </motion.p>

          {/* Interactive Monolith Corridor Surge Prompt */}
          {heroMode === "corridor" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFAA24]/10 border border-[#FFAA24]/40 text-[#FFAA24] text-[11px] font-mono uppercase tracking-wider"
            >
              <Icon.Zap className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>Click anywhere on corridor to trigger Warp Surge</span>
            </motion.div>
          )}
        </div>

        {/* HUD Control Strip & Explore CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38, ease: EASE_SWISS }}
          className="mt-6 sm:mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4"
        >
          <ThreeUISpatialHUD
            mode={heroMode}
            shuffleCount={shuffleCount}
            cardCount={18}
            webglActive={webglActive}
            surgeActive={surgeActive}
            onModeChange={handleModeChange}
            onShuffleBurst={handleShuffleBurst}
            onDrawFortune={handleDrawFortune}
            onTriggerSurge={handleTriggerCorridorSurge}
          />

          <button
            type="button"
            onClick={onExploreGallery}
            className="self-start lg:self-end inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FFF4E0] hover:bg-[#FFAA24] text-[#120E15] font-tech text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
          >
            <span>Explore Festival</span>
            <Icon.ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Draw Fortune Modal */}
      <AnimatePresence>
        {drawnFortune && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawnFortune(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120E15]/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.84, rotateY: -25, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_SWISS }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-[#FFF4E0] text-[#120E15] p-6 sm:p-7 border-4 border-[#FFAA24] shadow-[0_0_70px_rgba(255,170,36,0.45)]"
            >
              <button
                type="button"
                onClick={() => setDrawnFortune(null)}
                aria-label="Close Destiny Card"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#120E15] text-[#FFF4E0] flex items-center justify-center hover:bg-[#8B1E24] transition-colors cursor-pointer"
              >
                <Icon.X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between border-b border-[#120E15]/15 pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl text-[#8B1E24]">{drawnFortune.rank}</span>
                  <span className="text-2xl text-[#8B1E24]">{drawnFortune.suit}</span>
                </div>
                <span className="font-tech text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-[#120E15] text-[#FFAA24]">
                  {drawnFortune.house}
                </span>
              </div>

              <div className="my-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#120E15] text-[#FFAA24] flex items-center justify-center text-5xl shadow-inner border border-[#8B1E24]">
                  {drawnFortune.suit}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl tracking-tight text-[#120E15]">{drawnFortune.title}</h3>
                <p className="mt-3 font-serif italic text-lg leading-relaxed text-[#120E15]/85">
                  &ldquo;{drawnFortune.prophecy}&rdquo;
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDrawFortune}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#E65C19] text-[#FFF4E0] font-tech text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Draw Another
                </button>
                <button
                  type="button"
                  onClick={() => setDrawnFortune(null)}
                  className="py-3 px-4 rounded-xl bg-[#120E15] text-[#FFF4E0] font-tech text-xs font-bold tracking-widest uppercase cursor-pointer"
                >
                  Keep Card
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
