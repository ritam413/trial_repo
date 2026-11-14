# Project Architecture & Context — 3D Prelaunch Showcase Website

## Project Purpose
High-impact, immersive 3D prelaunch showcase website for an upcoming event ("Saskaran / Deck of Cards 2026"). The site features interactive 3D WebGL scenes, smooth page transitions, interactive canvas shaders, particle systems, dynamic countdown, and waitlist/prelaunch registration UI.

## Architecture
- **Framework**: Next.js 16 (React 19) App Router
- **3D & Graphics Engine**: Three.js, WebGL shaders, PerspectiveCamera, PBR lighting, custom particle nebula (`/threejs-webgl`)
- **Animation Suite**: GSAP, Motion / Framer Motion
- **UI & Design System**: Tailwind CSS v4, Radix UI primitives, shadcn/ui components, Aceternity UI effects (`/design`, `/design-system`)
- **Fast Discovery & Memory Architecture**:
  - `/repomix`: Full repository context packed into [repomix-output.xml](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/repomix-output.xml).
  - `/serena`: O(1) symbol lookup and semantic keyword indexing in `.serena/symbols.json` via `node scripts/serena-lookup.mjs <query>`.
  - `/agentmemory`: Persistent episodic and domain invariant vector/KV store in `.agentmemory/memory.json` via `node scripts/agentmemory.mjs query <term>`.
- **Type Safety**: TypeScript strict mode
- **Deployment & Hosting Strategy**: Static export ready (`output: 'export'`) or Vercel / Netlify edge deployment for zero-cold-start landing performance.

## Key Directories
- `src/app`: App Router pages, layout, and global CSS tokens.
- `src/components/3d`: Three.js WebGL canvas scenes, particle systems, camera rigs, and interactive 3D elements.
- `src/components/ui`: Reusable UI primitives (shadcn/ui + Radix UI + Aceternity UI components).
- `src/components/event`: Event-specific showcase sections (hero, countdown, cards/lore, schedule, pre-registration).
- `src/lib`: Utility functions (`cn` helper, event constants, 3D math helpers).
- `scripts/`: Tooling for repomix, serena semantic symbol indexing, and agentmemory queries.
- `.serena/`: O(1) codebase symbols index (`symbols.json`).
- `.agentmemory/`: Domain invariants, component contracts, and debugging history (`memory.json`).

## Core Invariants
1. **WebGL SSR Boundary**: All 3D canvas modules must be loaded with dynamic import `{ ssr: false }`.
2. **GPU Memory Disposal**: Every geometry, material, texture, and WebGLRenderer must be explicitly disposed on unmount.
3. **DPR Cap**: Maximum device pixel ratio capped at 2 (`Math.min(window.devicePixelRatio, 2)`).
4. **Three-Layer Tokens**: CSS custom properties organized into Primitive -> Semantic -> Component variables.
