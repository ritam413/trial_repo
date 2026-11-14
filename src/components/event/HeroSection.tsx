"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { gsapScrollTo, SMOOTH_SCROLL_CONFIG } from "./Navbar";

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
  Play: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
};

/* ==========================================================================
   2. CARDISTRY CHOREOGRAPHY FORMATIONS (5 DISTINCT ANTI-SLOP FORMATIONS)
   ========================================================================== */
export interface CardistryFormation {
  id: string;
  name: string;
  shortName: string;
  tag: string;
}

export const CARDISTRY_FORMATIONS: CardistryFormation[] = [
  { id: "riffle", name: "01 // RIFFLE HELIX SHUFFLE", shortName: "3D Shuffle", tag: "Interlocking Cascade" },
  { id: "corridor", name: "02 // MONOLITH CORRIDOR", shortName: "Corridor", tag: "Infinite Runway" },
  { id: "orbital", name: "03 // CELESTIAL WHEEL", shortName: "Celestial Wheel", tag: "360° Gyroscopic Halo" },
  { id: "fan", name: "04 // MASTER DEALER FAN", shortName: "Dealer Fan", tag: "Croupier Panoramic Arc" },
  { id: "vortex", name: "05 // VORTEX HELIX SPIRE", shortName: "Vortex Spire", tag: "Double Helix Cyclone" },
];

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
   4. FORMATION MATH
   ========================================================================== */
interface CardTransform {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

function getFormationTransform(
  formIdx: number,
  i: number,
  elapsed: number,
  card: { corridorPos: THREE.Vector3; corridorRotY: number; corridorScale: number; phase: number },
  norm: number,
  mobileNow: boolean,
  burst: number,
  surge: number
): CardTransform {
  const cardCount = 18;
  switch (formIdx) {
    case 0: {
      // 0: RIFFLE HELIX SHUFFLE (Interlocking dual-helix waves)
      const fanAngle = norm * (0.95 + burst * 0.45) + Math.sin(elapsed * 0.8) * 0.15;
      const radius = (mobileNow ? 2.1 : 2.75) + Math.abs(norm) * 0.65 + burst * 1.1;
      const riffleWave = Math.sin(elapsed * 2.2 + card.phase);
      const burstSpread = burst * Math.sin(card.phase * 2.0) * 2.4;
      return {
        x: Math.sin(fanAngle) * radius + Math.cos(elapsed * 1.6 + card.phase) * 0.32 + burstSpread * 0.5,
        y: Math.cos(fanAngle) * 1.15 - 0.35 + riffleWave * 0.35 + Math.sin(elapsed * 3.2 + i * 0.55) * (0.18 + burst * 0.5),
        z: -Math.abs(norm) * 1.85 + Math.sin(elapsed * 2.4 + card.phase) * 0.65 - burst * 0.8,
        rotX: Math.sin(elapsed * 1.4 + card.phase) * 0.22 + burst * 0.5,
        rotY: -fanAngle * 0.72 + Math.sin(elapsed * 1.9 + card.phase) * 0.38 + burst * Math.PI * 2,
        rotZ: -fanAngle * 0.42 + riffleWave * 0.08,
        scale: mobileNow ? 0.86 : 1.0,
      };
    }
    case 1: {
      // 1: MONOLITH CORRIDOR (Two inward-facing avenue sentinels with click-to-surge warp plunge)
      const corridorSpreadSurge = 1 + surge * 0.22;
      const surgeWave = Math.sin(elapsed * 5.0 + i * 0.5) * surge * 0.75;
      const idleWaveY = Math.sin(elapsed * 1.5 + card.phase) * 0.08;
      const idleWaveRot = Math.sin(elapsed * 1.1 + card.phase) * 0.04;
      return {
        x: card.corridorPos.x * corridorSpreadSurge,
        y: card.corridorPos.y + idleWaveY + surgeWave,
        z: card.corridorPos.z,
        rotX: 0,
        rotY: card.corridorRotY + idleWaveRot,
        rotZ: 0,
        scale: card.corridorScale * (1 + surge * 0.18),
      };
    }
    case 2: {
      // 2: CELESTIAL SOLSTICE WHEEL (360° rotating gyroscopic halo ring)
      const angle = (i / cardCount) * Math.PI * 2 + elapsed * 0.4 + burst * 1.8;
      const wheelRadius = mobileNow ? 2.5 : 3.4;
      const tilt = 0.45;
      const floatY = Math.sin(elapsed * 1.4 + card.phase) * 0.12;
      return {
        x: Math.cos(angle) * wheelRadius,
        y: Math.sin(angle) * wheelRadius * Math.sin(tilt) + floatY - 0.1,
        z: Math.sin(angle) * wheelRadius * Math.cos(tilt) - 1.2,
        rotX: -tilt + Math.sin(elapsed * 1.2 + card.phase) * 0.08,
        rotY: -angle - Math.PI / 2 + Math.sin(elapsed * 1.6 + card.phase) * 0.06,
        rotZ: Math.sin(angle) * 0.2,
        scale: (mobileNow ? 0.82 : 0.96) * (1 + Math.sin(angle) * 0.1),
      };
    }
    case 3: {
      // 3: MASTER DEALER ARCANE FAN (Panoramic croupier spread across the viewing plane)
      const fanSpread = mobileNow ? 1.5 : 1.9;
      const spreadAngle = norm * fanSpread;
      const archRadius = mobileNow ? 3.8 : 4.9;
      const breathing = Math.sin(elapsed * 1.5 + card.phase) * 0.06;
      return {
        x: Math.sin(spreadAngle) * archRadius * 0.88 + Math.cos(elapsed * 1.2 + card.phase) * 0.06,
        y: (Math.cos(spreadAngle) - 1) * archRadius * 0.42 + 0.38 + breathing,
        z: (1 - Math.abs(norm)) * 0.85 - 0.6 - burst * 0.5,
        rotX: 0.26 + Math.abs(norm) * 0.12,
        rotY: -spreadAngle * 0.72 + Math.sin(elapsed * 1.1 + card.phase) * 0.04,
        rotZ: -spreadAngle * 0.88,
        scale: (mobileNow ? 0.9 : 1.06) * (1 - Math.abs(norm) * 0.08),
      };
    }
    case 4:
    default: {
      // 4: VORTEX CYCLONE SPIRE (Ascending double-helix cosmic spire)
      const helixAngle = (i / cardCount) * Math.PI * 4 + elapsed * 0.72 + burst * 1.2;
      const heightFrac = (i - (cardCount - 1) / 2) / (cardCount / 2);
      const helixRadius = (mobileNow ? 1.7 : 2.3) * (1.1 - Math.abs(heightFrac) * 0.25);
      return {
        x: Math.cos(helixAngle) * helixRadius,
        y: heightFrac * 2.6 + Math.sin(elapsed * 2.2 + i * 0.4) * 0.14,
        z: Math.sin(helixAngle) * helixRadius - 1.4,
        rotX: 0.18,
        rotY: -helixAngle + Math.PI / 2,
        rotZ: Math.sin(helixAngle) * 0.25,
        scale: (mobileNow ? 0.78 : 0.94) * (1 + (1 - Math.abs(heightFrac)) * 0.15),
      };
    }
  }
}

/* ==========================================================================
   5. MAIN HERO SECTION COMPONENT (With Scroll-Cascading Parallax & Cursor Following)
   ========================================================================== */
interface HeroSectionProps {
  onExploreGallery?: () => void;
}

/**
 * Helper to generate a random duration in seconds between min and max
 */
const getRandomDuration = (min = 1.0, max = 2.0): number => {
  return parseFloat((min + Math.random() * (max - min)).toFixed(2));
};

export default function HeroSection({ onExploreGallery }: HeroSectionProps) {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const [currentFormationIndex, setCurrentFormationIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [currentDuration, setCurrentDuration] = useState<number>(1.5);
  const [shuffleCount, setShuffleCount] = useState(1);
  const [webglActive, setWebglActive] = useState(true);
  const [drawnFortune, setDrawnFortune] = useState<Fortune | null>(null);
  const [surgeActive, setSurgeActive] = useState(false);

  // GSAP animation & dynamic parallax state
  const animStateRef = useRef({
    introDeal: 0, // Starts at 0, cards fly in from side
    fromFormation: 0,
    toFormation: 0,
    formationProgress: 1, // 0 to 1 transition between fromFormation and toFormation
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

  const isAutoCyclingRef = useRef(true);
  const scheduledCallRef = useRef<gsap.core.Tween | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);
  const scheduleNextStepRef = useRef<(() => void) | null>(null);

  // Transition between formations smoothly with random or specified duration
  const transitionToFormation = useCallback((targetIndex: number, duration?: number, resumeAutoCycle = true) => {
    const fromIdx = animStateRef.current.toFormation;
    if (fromIdx === targetIndex && animStateRef.current.formationProgress >= 1) {
      if (resumeAutoCycle && isAutoCyclingRef.current && !scheduledCallRef.current?.isActive() && !activeTweenRef.current?.isActive()) {
        scheduleNextStepRef.current?.();
      }
      return;
    }

    const chosenDuration = duration ?? getRandomDuration(1.0, 2.0);
    setCurrentDuration(chosenDuration);

    scheduledCallRef.current?.kill();
    activeTweenRef.current?.kill();
    gsap.killTweensOf(animStateRef.current, "formationProgress");

    animStateRef.current.fromFormation = fromIdx;
    animStateRef.current.toFormation = targetIndex;
    animStateRef.current.formationProgress = 0;
    setCurrentFormationIndex(targetIndex);

    activeTweenRef.current = gsap.to(animStateRef.current, {
      formationProgress: 1.0,
      duration: chosenDuration,
      ease: "power2.inOut",
      onComplete: () => {
        // Automatically continue the auto-cycle loop if enabled!
        if (resumeAutoCycle && isAutoCyclingRef.current) {
          scheduleNextStepRef.current?.();
        }
      },
    });
  }, []);

  // Function to smoothly restart or resume the landing hero animation loop
  const restartHeroLandingLoop = useCallback((redeal = false) => {
    setIsAutoCycling(true);
    isAutoCyclingRef.current = true;
    scheduledCallRef.current?.kill();
    activeTweenRef.current?.kill();
    gsap.killTweensOf(animStateRef.current, "formationProgress");
    gsap.killTweensOf(animStateRef.current, "introDeal");

    if (redeal) {
      // Replay the opening deal fly-in into Formation 0 (3D Shuffle)
      animStateRef.current.introDeal = 0;
      animStateRef.current.fromFormation = 0;
      animStateRef.current.toFormation = 0;
      animStateRef.current.formationProgress = 1;
      setCurrentFormationIndex(0);

      gsap.to(animStateRef.current, {
        introDeal: 1.0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          scheduleNextStepRef.current?.();
        },
      });
    } else {
      // Smoothly transition into the opening 3D Shuffle formation and continue the loop
      transitionToFormation(0, 1.2, true);
    }
  }, [transitionToFormation]);

  const handleSelectFormation = useCallback(
    (index: number) => {
      setIsAutoCycling(false);
      isAutoCyclingRef.current = false;
      scheduledCallRef.current?.kill();
      activeTweenRef.current?.kill();
      transitionToFormation(index, getRandomDuration(1.0, 2.0), false);
    },
    [transitionToFormation]
  );

  const handleToggleAutoCycle = useCallback(() => {
    setIsAutoCycling((prev) => {
      const next = !prev;
      isAutoCyclingRef.current = next;
      if (next) {
        scheduleNextStepRef.current?.();
      } else {
        scheduledCallRef.current?.kill();
        activeTweenRef.current?.pause();
      }
      return next;
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

    if (animStateRef.current.toFormation === 1 || animStateRef.current.fromFormation === 1) {
      handleTriggerCorridorSurge();
    }
  };

  // CONTINUOUS 5-STAGE CARDISTRY CHOREOGRAPHY WITH RANDOM 1.0 - 2.0s DURATION PER SHUFFLE:
  // Each hold and each morph transition is dynamically randomized between 1.0 and 2.0 seconds.
  useEffect(() => {
    let isCancelled = false;

    // Initial Side Fly-in deal into 01: 3D Shuffle (1.2s intro deal)
    gsap.to(animStateRef.current, {
      introDeal: 1.0,
      duration: 1.2,
      ease: "power3.out",
      onComplete: () => {
        if (isCancelled) return;
        scheduleNextStep();
      },
    });

    const scheduleNextStep = () => {
      if (isCancelled || !isAutoCyclingRef.current) return;

      // 1. Random hold duration between 1.0 and 2.0 seconds for the current formation
      const randomHold = getRandomDuration(1.0, 2.0);
      setCurrentDuration(randomHold);

      scheduledCallRef.current?.kill();
      scheduledCallRef.current = gsap.delayedCall(randomHold, () => {
        if (isCancelled || !isAutoCyclingRef.current) return;

        // 2. Advance to next formation in loop
        const currentIdx = animStateRef.current.toFormation;
        const nextIdx = (currentIdx + 1) % CARDISTRY_FORMATIONS.length;

        // 3. Random morph transition flight duration between 1.0 and 2.0 seconds
        const randomMorph = getRandomDuration(1.0, 2.0);
        setCurrentDuration(randomMorph);

        animStateRef.current.fromFormation = currentIdx;
        animStateRef.current.toFormation = nextIdx;
        animStateRef.current.formationProgress = 0;
        setCurrentFormationIndex(nextIdx);
        setShuffleCount((c) => c + 1);

        activeTweenRef.current?.kill();
        activeTweenRef.current = gsap.to(animStateRef.current, {
          formationProgress: 1.0,
          duration: randomMorph,
          ease: "power2.inOut",
          onComplete: () => {
            if (isCancelled) return;
            scheduleNextStep();
          },
        });
      });
    };

    scheduleNextStepRef.current = scheduleNextStep;

    return () => {
      isCancelled = true;
      scheduledCallRef.current?.kill();
      activeTweenRef.current?.kill();
    };
  }, []);

  // Continuous Window Scroll Listener & Hero Top Detection
  useEffect(() => {
    let wasAtTop = true;

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowH = window.innerHeight || 800;
      animStateRef.current.scrollProgress = scrollY / windowH;

      const isAtTopNow = scrollY <= 30;
      // If user scrolled back up to hero, immediately resume/restart the landing animation loop!
      if (isAtTopNow && !wasAtTop) {
        restartHeroLandingLoop(false);
      }
      wasAtTop = isAtTopNow;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [restartHeroLandingLoop]);

  // Listen for Navbar logo click or "Back to Top" navigation events
  useEffect(() => {
    const handleRestartEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ resetIntro?: boolean }>;
      const resetIntro = customEvent.detail?.resetIntro ?? false;
      restartHeroLandingLoop(resetIntro);
    };

    window.addEventListener("hero:restart-loop", handleRestartEvent);
    return () => window.removeEventListener("hero:restart-loop", handleRestartEvent);
  }, [restartHeroLandingLoop]);

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

  // ScrollTrigger to seamlessly coordinate Hero formation transitions & auto-cycle on re-entry
  useEffect(() => {
    if (!heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroContainerRef.current,
        start: "top top",
        end: "+=80%",
        onLeave: () => {
          if (animStateRef.current.toFormation !== 1) {
            transitionToFormation(1, 1.0, false);
          }
        },
        onEnterBack: () => {
          // When scrolling back up into hero section, restart the landing animation loop!
          restartHeroLandingLoop(false);
        },
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, [transitionToFormation, restartHeroLandingLoop]);

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

      let lastTime = performance.now();
      const startTime = performance.now();
      const targetPos = new THREE.Vector3();
      const targetScaleVec = new THREE.Vector3();

      const animateLoop = () => {
        animationFrameId = requestAnimationFrame(animateLoop);
        if (!renderer) return;

        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        const elapsed = (now - startTime) / 1000;

        const deal = animStateRef.current.introDeal; // 0 to 1
        const fromForm = animStateRef.current.fromFormation;
        const toForm = animStateRef.current.toFormation;
        const formProgress = animStateRef.current.formationProgress;
        const burst = animStateRef.current.shuffleImpulse;
        const surge = animStateRef.current.corridorSurge; // 0 to 1
        const scroll = animStateRef.current.scrollProgress; // 0 to 1+

        // Corridor blend for camera & fog interpolation
        const fromCorridorWeight = fromForm === 1 ? 1 : 0;
        const toCorridorWeight = toForm === 1 ? 1 : 0;
        const corridorBlend = THREE.MathUtils.lerp(fromCorridorWeight, toCorridorWeight, formProgress);

        // Fog
        const shuffleFog = new THREE.Color("#140E17");
        const corridorFog = new THREE.Color(surge > 0.3 ? "#A84C0F" : "#8A420E");
        fog.color.lerpColors(shuffleFog, corridorFog, corridorBlend);
        fog.density = THREE.MathUtils.lerp(0.032, 0.072 + surge * 0.02, corridorBlend);

        floorMesh.position.y = THREE.MathUtils.lerp(-4.5, -3.2 - scroll * 5.0, corridorBlend);

        // Camera Dynamics:
        const mobileNow = (window.innerWidth) < 640;
        const baseZ = THREE.MathUtils.lerp(mobileNow ? 10.6 : 8.1, mobileNow ? 7.8 : 6.4, corridorBlend);
        const surgeZPlunge = surge * 7.5;

        // Camera smoothly follows mouse pointer with depth lerp & vertical scroll tracking
        const scrollCamY = -scroll * 0.8;
        const targetCamX = animStateRef.current.pointerX * (mobileNow ? 0.55 : 0.95);
        const targetCamY = THREE.MathUtils.lerp(0.35, -0.22, corridorBlend) + scrollCamY + animStateRef.current.pointerY * 0.45;

        camera.position.x += (targetCamX - camera.position.x) * 0.06;
        camera.position.y += (targetCamY - camera.position.y) * 0.06;
        camera.position.z += (baseZ - surgeZPlunge - camera.position.z) * (surge > 0.1 ? 0.12 : 0.06);
        camera.lookAt(
          0,
          THREE.MathUtils.lerp(0.1, -0.3, corridorBlend) + scrollCamY,
          THREE.MathUtils.lerp(0, -10, corridorBlend)
        );

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

          // Staggered per-card side deal so EVERY card flies in from the side sequentially:
          const cardDealStagger = (i / CARD_COUNT) * 0.45;
          const cardDealRaw = THREE.MathUtils.clamp((deal - cardDealStagger) / (1 - 0.45), 0, 1);
          const cardDealEased = cardDealRaw * cardDealRaw * (3 - 2 * cardDealRaw);
          const sideFlyX = (i % 2 === 0 ? -26 : 26) * (1 - cardDealEased) + (i - 9) * 0.4 * (1 - cardDealEased);
          const sideFlyRotZ = (i % 2 === 0 ? -2.2 : 2.2) * (1 - cardDealEased);
          const sideFlyRotY = (i % 2 === 0 ? 2.8 : -2.8) * (1 - cardDealEased);

          // Cardistry Formation transforms:
          const tFrom = getFormationTransform(fromForm, i, elapsed, card, norm, mobileNow, burst, surge);
          const tTo = getFormationTransform(toForm, i, elapsed, card, norm, mobileNow, burst, surge);

          // Staggered ripple morphing delay per card:
          const morphStagger = (i / CARD_COUNT) * 0.22;
          const cardMorphRaw = THREE.MathUtils.clamp((formProgress - morphStagger) / (1 - 0.22), 0, 1);
          const cardMorphEased = cardMorphRaw * cardMorphRaw * (3 - 2 * cardMorphRaw);

          // Physical card lift arc & flight banking roll:
          const arcLift = Math.sin(cardMorphEased * Math.PI) * 0.55;
          const flightBank = Math.sin(cardMorphEased * Math.PI) * (i % 2 === 0 ? 0.35 : -0.35);

          const inHeroX = THREE.MathUtils.lerp(tFrom.x, tTo.x, cardMorphEased) + sideFlyX;
          const inHeroY = THREE.MathUtils.lerp(tFrom.y, tTo.y, cardMorphEased) + arcLift;
          const inHeroZ = THREE.MathUtils.lerp(tFrom.z, tTo.z, cardMorphEased);
          const inHeroRotX = THREE.MathUtils.lerp(tFrom.rotX, tTo.rotX, cardMorphEased);
          const inHeroRotY = THREE.MathUtils.lerp(tFrom.rotY, tTo.rotY, cardMorphEased) + flightBank + sideFlyRotY;
          const inHeroRotZ = THREE.MathUtils.lerp(tFrom.rotZ, tTo.rotZ, cardMorphEased) + sideFlyRotZ;
          const inHeroScale = THREE.MathUtils.lerp(tFrom.scale, tTo.scale, cardMorphEased);

          // CURSOR PARALLAX SPRING FACTOR
          const depthFactor = (1 - (card.corridorPos.z / -12)) * 0.75 + 0.35;
          const cursorFollowX = animStateRef.current.pointerX * (1.1 * depthFactor);
          const cursorFollowY = animStateRef.current.pointerY * (0.8 * depthFactor);
          const cursorTiltZ = animStateRef.current.pointerX * (-0.14 * depthFactor);
          const cursorTiltX = animStateRef.current.pointerY * (0.12 * depthFactor);
          const cursorTiltY = animStateRef.current.pointerX * (0.24 * depthFactor);

          // TARGET: in-hero position with interactive cursor follow
          const destX = inHeroX + cursorFollowX;
          const destY = inHeroY + cursorFollowY;
          const destZ = inHeroZ;
          const destScale = inHeroScale;
          const destRotX = inHeroRotX + cursorTiltX;
          const destRotY = inHeroRotY + cursorTiltY;
          const destRotZ = inHeroRotZ + cursorTiltZ;

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
      className={`relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 sm:pt-24 sm:pb-12 border-b border-[#8B1E24]/50 ${
        currentFormationIndex === 1 ? "cursor-pointer" : ""
      }`}
    >
      {/* 3D WebGL Canvas Layer - Strictly contained within the Hero Section */}
      <div
        ref={mountRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
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

   

      {/* Main Hero Typography */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 mt-auto pt-36 sm:pt-44">
        <div className="max-w-3xl">
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
        </div>

        {/* Explore Festival CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38, ease: EASE_SWISS }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-4 pb-2"
        >

          <button
            type="button"
            onClick={() => {
              if (onExploreGallery) {
                onExploreGallery();
              } else {
                gsapScrollTo("#about", SMOOTH_SCROLL_CONFIG.duration, SMOOTH_SCROLL_CONFIG.offset);
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFF4E0] hover:bg-[#FFAA24] text-[#120E15] font-tech text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-[0_4px_24px_rgba(255,244,224,0.18)] active:scale-95"
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
