import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const memoryDir = path.join(rootDir, ".agentmemory");
const memoryFile = path.join(memoryDir, "memory.json");

if (!fs.existsSync(memoryDir)) {
  fs.mkdirSync(memoryDir, { recursive: true });
}

// Initial memory structure
const initialMemory = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  domain_invariants: {
    "webgl-ssr-boundary": {
      rule: "Three.js and WebGL Canvas components MUST be imported with next/dynamic and { ssr: false }",
      rationale: "Three.js relies on window, document, and WebGL contexts which don't exist in Node server environment.",
      files: ["src/components/event/Hero.tsx", "src/components/3d/EventScene.tsx"],
    },
    "gpu-memory-disposal": {
      rule: "All WebGL geometries, materials, textures, and renderer instances MUST be explicitly disposed on unmount.",
      rationale: "WebGL does not garbage-collect GPU VRAM automatically; failing to dispose leads to progressive browser tab memory leaks.",
      files: ["src/components/3d/EventScene.tsx"],
    },
    "dpr-performance-cap": {
      rule: "Renderer pixel ratio MUST be capped at Math.min(window.devicePixelRatio, 2).",
      rationale: "Prevents GPU fill-rate collapse on high-DPI/Retina screens while preserving visual sharpness.",
      files: ["src/components/3d/EventScene.tsx"],
    },
    "design-token-architecture": {
      rule: "Use three-layer token architecture: Primitives -> Semantic -> Component variables.",
      rationale: "Enables instant re-theming, contrast compliance, and dark-mode switching without touching component JSX.",
      files: ["src/app/globals.css"],
    },
    "static-frontend-first": {
      rule: "The project is strictly client/frontend-first with no mandatory backend server; capable of static export.",
      rationale: "Zero-maintenance edge deployment with lightning-fast FCP.",
      files: ["next.config.ts"],
    },
  },
  component_contracts: {
    EventScene: {
      location: "src/components/3d/EventScene.tsx#L11",
      props: "{ className?: string }",
      purpose: "Interactive 3D WebGL card fan, particle nebula, mouse parallax, and PBR lighting.",
    },
    Hero: {
      location: "src/components/event/Hero.tsx#L19",
      props: "{}",
      purpose: "Prelaunch event hero banner with dynamic 3D WebGL background and live countdown timer.",
    },
    Countdown: {
      location: "src/components/event/Countdown.tsx#L13",
      props: "{}",
      purpose: "Real-time tick-based countdown timer to October 2026 event date.",
    },
    CardShowcase: {
      location: "src/components/event/CardShowcase.tsx#L55",
      props: "{}",
      purpose: "Interactive 3D card tilt gallery powered by Framer Motion / Motion.",
    },
    FeaturesGrid: {
      location: "src/components/event/FeaturesGrid.tsx#L51",
      props: "{}",
      purpose: "Aceternity UI CardSpotlight grid showcasing 6 event pillars with mouse-tracking radial glow.",
    },
    WaitlistSection: {
      location: "src/components/event/WaitlistSection.tsx#L9",
      props: "{}",
      purpose: "Early access email reservation form with celebratory canvas-confetti trigger.",
    },
    CardSpotlight: {
      location: "src/components/ui/card-spotlight.tsx#L11",
      props: "{ children: React.ReactNode, radius?: number, color?: string, className?: string }",
      purpose: "Aceternity UI component rendering dynamic radial gradient on mouse hover.",
    },
    Button: {
      location: "src/components/ui/button.tsx#L38",
      props: "ButtonProps & VariantProps (default, glow, outline, secondary, ghost, link)",
      purpose: "Radix UI Slot-based button with custom cyan/blue glow variant.",
    },
    cn: {
      location: "src/lib/utils.ts#L4",
      props: "(...inputs: ClassValue[]) => string",
      purpose: "Standard Tailwind class merger using clsx + twMerge.",
    },
  },
  debugging_traces: {
    "nextjs-16-scaffolding": {
      issue: "create-next-app rejected folder name 'Saskaran deck of cards 2026 static site' due to spaces and capitals.",
      resolution: "Scaffolded in valid subpackage 'saskaran-app' and moved files cleanly to workspace root.",
      verified: true,
    },
    "react-19-motion-support": {
      issue: "Legacy framer-motion v11 had React 19 peer dependency warnings in some environments.",
      resolution: "Installed official modern 'motion' package alongside 'framer-motion' with full React 19 compatibility.",
      verified: true,
    },
  },
};

export function getMemory(category, key) {
  const mem = loadMemory();
  if (!category) return mem;
  if (!key) return mem[category];
  return mem[category]?.[key];
}

export function loadMemory() {
  if (fs.existsSync(memoryFile)) {
    return JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
  }
  saveMemory(initialMemory);
  return initialMemory;
}

export function saveMemory(data) {
  fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2), "utf-8");
}

// CLI handler
const action = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if (action === "query" || action === "get") {
  const mem = loadMemory();
  if (!arg1) {
    console.log("[AgentMemory] Available categories:", Object.keys(mem));
  } else if (mem[arg1] && !arg2) {
    console.log(`[AgentMemory] Category: ${arg1}`);
    console.log(JSON.stringify(mem[arg1], null, 2));
  } else if (mem[arg1] && mem[arg1][arg2]) {
    console.log(`[AgentMemory] ${arg1} -> ${arg2}:`);
    console.log(JSON.stringify(mem[arg1][arg2], null, 2));
  } else {
    // Search across all text
    const term = arg1.toLowerCase();
    const hits = [];
    for (const [cat, items] of Object.entries(mem)) {
      if (typeof items === "object") {
        for (const [k, v] of Object.entries(items)) {
          const str = JSON.stringify(v).toLowerCase();
          if (k.toLowerCase().includes(term) || str.includes(term)) {
            hits.push({ category: cat, key: k, value: v });
          }
        }
      }
    }
    console.log(`[AgentMemory Search Hits for "${arg1}"] (${hits.length} found):`);
    hits.forEach((h) => console.log(` • [${h.category}] ${h.key}`));
  }
} else if (action === "init") {
  saveMemory(initialMemory);
  console.log(`[AgentMemory] Initialized store at ${memoryFile}`);
} else {
  // Save memory if not exists
  if (!fs.existsSync(memoryFile)) {
    saveMemory(initialMemory);
  }
}

