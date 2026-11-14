# Agent Handoff Log — tracker.md

## 2026-11-14 — Setup & Architecture Validation of 3D Prelaunch Website
(Completed foundational Next.js 16 + React 19 + Three.js + Tailwind v4 + GSAP + Motion setup).

## 2026-11-14 — Implementation of /repomix, /serena, and /agentmemory O(1) Tooling
(Completed repomix packaging, serena AST indexing, and agentmemory store).

## 2026-11-14 — Recreating Monolith Corridor & 3D Shuffle HeroSection with GSAP Transition
(Completed base 18-card corridor and shuffle scene with ThreeUI HUD and Destiny modal).

---

## 2026-11-14 — Side Card Entrance, 1s Hold, and Interactive Monolith Corridor Warp Surge

### Objective
Enhance [src/components/event/HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx) so the website loads with cards sweeping in from the sides into the 3D Shuffle position, holds for exactly 1.0 second, and then automatically converts into the Monolith Corridor. In the Monolith Corridor view, clicking anywhere triggers an exhilarating 3D Corridor Warp Surge animation.

### Changes Made
- Added timed entrance sequence via GSAP timeline:
  - Cards fly in from off-screen left and right (`(1 - deal) * 20` offset with staggered 3D tilt).
  - Cards settle and hold in 3D Shuffle (Riffle Helix) position for 1.0s.
  - Cards then smoothly morph into the Monolith Corridor formation via GSAP `power2.inOut` tween.
- Built interactive Monolith Corridor Warp Surge:
  - Added click listener on the hero container and a dedicated HUD action button (`Surge Corridor`).
  - When in Monolith Corridor mode, clicking triggers:
    1. Camera zoom plunge: Swoops forward along Z by 7.5 units deep into the card avenue towards the horizon.
    2. Kinetic wave & emissive pulse: Cards ripple vertically and flare with golden solar glow (`#FFAA24`).
    3. Horizon backlight surges from 7.0 to 25.0 intensity.
    4. Ember warp trails accelerate by 6x.
    5. Camera smoothly decelerates back to scenic corridor viewpoint.
  - Added cyber HUD status indicator (`⚡ WARP SURGE ACTIVE`).
- Verified build and static export with `npm run build` (0 errors).
- Refreshed Serena symbol index and Repomix snapshot.

### Files Changed
- `src/components/event/HeroSection.tsx`
- `features_implemented.md`
- `tracker.md`
- `.serena/symbols.json`
- `repomix-output.xml`

### Verification
- `npm run build` finished with code 0.
- `npm run serena:find HeroSection` verified.

### Next Agent Instructions
1. Inspect [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx) to adjust timing delays or camera dive speed if requested.
2. Proceed to next user-requested sections (e.g., About Festival, Spread Rows Gallery, Core Members playing cards).

---

## 2026-11-14 — Persistent Fixed 3D Viewport, Visible Sequential Cascade, and Global Cursor Parallax

### Objective
Resolve user issue where 3D cards disappeared upon scrolling down into "THE ARCHETYPES OF SANSKARAN" ("where are the cards ?"). Ensure cards remain prominently visible, cascade down one-by-one as user scrolls down, rise back up one-by-one on scroll up, and track the mouse cursor across the entire screen.

### Root Cause Analysis
1. **Container Scrolled Out of View**: The WebGL container `<div ref={mountRef}>` was styled with `absolute inset-0` inside the `<section id="hero">`. When the user scrolled past the hero section, the entire container scrolled off-screen.
2. **Excessive Vertical Drop Formula**: `cascadeDropY` was set to `dropEased * 10.5`. In Three.js units with camera at $Z \approx 7.8$, a drop of 10.5 plunged the cards completely below the camera's bottom frustum boundary ($Y \approx -3.2$).
3. **Local Mouse Tracking Scope**: Pointer move listener was attached to `#hero`, preventing cursor updates once scrolled into other sections.
4. **Opaque Scene Background & Atmospheric Overlay**: Three.js had solid black `scene.background = new THREE.Color("#120E15")` and an 88% dark bottom gradient blocking visibility.

### Changes Made
- **Fixed Persistent Canvas**: Changed `<div ref={mountRef}>` to `fixed inset-0 pointer-events-none z-[1] overflow-hidden` so the 3D scene stays pinned to the viewport across all sections.
- **Transparent WebGL Layer**: Removed `scene.background`, added `renderer.setClearColor(0x000000, 0)`, and enabled `alpha: true` so the global multi-layer `ParallaxBackground` shines through.
- **Tuned Sequential Cascade**:
  - `cardCascadeStagger = (i / CARD_COUNT) * 0.45`
  - `rawDrop = THREE.MathUtils.clamp((scroll - cardCascadeStagger) * 1.8, 0, 1)`
  - `cascadeDropY = dropEased * 1.9` (keeps cards comfortably in view on screen)
  - `flankSpreadX = (i % 2 === 0 ? -1.65 : 1.65) * dropEased` (cards shift outward to the left and right margins, framing "The Archetypes of Sanskaran" like monolith sentinels)
  - Smooth reverse ascent when scrolling up.
- **Global Window Cursor Tracking**: Added `window.addEventListener("mousemove", ...)` tracking normalized $-1$ to $+1$ coordinates anywhere on the page for real-time card tilt and spring follow.
- **Atmospheric Cleanup**: Removed opaque bottom gradient and softened ambient vignette.

### Files Changed
- `src/components/event/HeroSection.tsx`
- `features_implemented.md`
- `tracker.md`

### Verification
- Ran `npm run build`: Compiled with 0 errors, Turbopack and TypeScript checks passed.
- Ran `npm run serena:index`: Re-indexed all symbols.
- Ran `npm run repomix`: Full context repacked.

### Next Agent Instructions
1. Inspect [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx) if fine-tuning horizontal flanking spacing or drop speed is requested.
2. Continue building next event sections (e.g. Schedule, Interactive Ticket Deck, FAQ, Artist Grid).

---

## 2026-11-14 — Section-by-Section Single Card Spotlight Choreography

### Objective
Update the scroll animation choreography so that the entire card bundle does NOT drop down together. Instead, as the user scrolls away from the Hero:
- The full card deck recedes backwards into the distant ambient fog.
- For the **"What is Sanskaran" / Archetypes (`#cards`)** section, **ONLY the Ace of Spades ♠** descends down to spotlight the section.
- For the **Gallery / Capabilities (`#about`)** section, **ONLY the Ace of Clubs ♣** descends down to spotlight the gallery.
- For the **Genesis Pass / Pre-register (`#pre-register`)** section, **ONLY the King of Hearts ♥** descends down.
- As the user scrolls between sections, the previous card smoothly recedes and the next card glides in.
- Scrolling back up reverses the animation and seamlessly restores the full 18-card Monolith Corridor at the Hero section.

### Implementation Details
1. **Dynamic Section Influence Measurement**:
   - In `HeroSection.tsx`, added `calcSectionInfluence(elementId, windowH)` using smoothstep-weighted viewport proximity to `#cards`, `#about`, and `#pre-register`.
   - `heroInfluence` smoothly drops from 1 to 0 past the hero.
2. **Per-Card Targeted Motion in `animateLoop`**:
   - `Card 0 (Ace of Spades ♠)`:
     - Blends between its in-hero position and its spotlight position ($X = 2.4$, $Y = 0.35$, $Z = 3.8$, scaled to 1.95 on desktop) based on `spadeInfluence`.
     - When `spadeInfluence = 0` and scrolled past hero, recedes backwards into fog.
   - `Card 1 (Ace of Clubs ♣)`:
     - Blends between in-hero position and its gallery spotlight position based on `clubInfluence`.
   - `Card 2 (King of Hearts ♥)`:
     - Blends into its pass spotlight position based on `heartInfluence`.
   - `Cards 3..17 (Background bundle)`:
     - When `heroInfluence < 1`, smoothly recede into the distance ($Z \to -16$, $Y \to +3$, scale $\to 0.001$), eliminating visual clutter.
3. **Cursor Parallax Integration**:
   - Each spotlighted card dynamically tilts and tracks the user's cursor (`pointerX`, `pointerY`) with depth-spring lag.

### Verification
- `npm run build`: Compiled with 0 errors, static pages generated.
- `npm run serena:index` & `npm run repomix`: Refreshed.

### Current State
Hero loads with 18-card shuffle -> 1.0s hold -> Monolith Corridor. Scrolling down smoothly recedes background cards and summons ONLY the Ace of Spades for Sanskaran, ONLY the Ace of Clubs for the Gallery, and ONLY the King of Hearts for Genesis Pass. Cursor parallax is active across all sections.

### Next Agent Instructions
1. Inspect [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx) to adjust coordinates or tilt angles if requested.
2. Proceed to next user features.

---

## 2026-11-14 — New Core Members Section with GSAP Side Entrance Deal & 3D Interactive Flip

### Objective
Build the "NEW CORE MEMBERS" ("The Court Architects") section using the provided reference festival data and 3 reference card artworks (`crimson-vanguard`, `checkered-sovereign`, `cyber-horizon`). Animate the cards flying in smoothly from alternating sides using `/gsap-animation` with ScrollTrigger, support on-demand re-dealing, 3D flip inspection, real-time mouse tilt, category filters, and 3D background sentinel synchronization.

### Changes Made
- Created [src/components/event/CoreMembersSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/CoreMembersSection.tsx):
  - Structured data for 6 Core Members:
    1. Kabir Verma (Festival Secretary, Executive Council, 10♦, `crimson-vanguard`)
    2. Meera Sharma (Head of Curation, Sanskaran Conclave, Q♦, `checkered-sovereign`)
    3. Rohan Kapoor (Technical & 3D Lead, Digital Architecture, A♠, `cyber-horizon`)
    4. Tara Menon (Creative Director, Scenography & Print, 10♦, `crimson-vanguard`)
    5. Devansh Nair (Events & Production, Sahotsava Arena, Q♦, `checkered-sovereign`)
    6. Zoya Siddiqui (Alliances & Outreach, External Relations, A♠, `cyber-horizon`)
  - Scalable vector reference artworks (`ReferenceCardArtwork`) for the 3 distinct design variants.
  - GSAP ScrollTrigger side entrance sequence:
    - Even cards fly in from the left ($X = -240\text{px}$, rotation $-14^\circ$, scale $0.82$, opacity $0$).
    - Odd cards fly in from the right ($X = +240\text{px}$, rotation $+14^\circ$, scale $0.82$, opacity $0$).
    - Staggered dealing physics with `ease: "power3.out"` and automatic transform cleanup.
  - Interactive Action Controls:
    - Filter pills ("ALL ARCHITECTS", "CRIMSON VANGUARD", "CHECKERED SOVEREIGN", "CYBER HORIZON") that dynamically filter and re-deal cards.
    - `[RE-DEAL (#01)]` action button enabling visitors to re-trigger the side entrance deal anytime on demand.
  - Interactive 3D Card Flip & Mouse Tilt:
    - Card flip with `[transform-style:preserve-3d]` and `[backface-visibility:hidden]`.
    - Clicking, tapping, or pressing Enter/Space smoothly rotates the card 180° to read full vision statements, vertical, degree, and archetype.
    - Hover tracking creates 3D `rotateX`/`rotateY` tilt and moves a specular glare sheen across the surface.
    - Synthesized Web Audio click/deal audio without external assets.
- Integrated into [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx) directly following the Archetypes section.
- Synchronized with [src/components/event/HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx):
  - Added `diamondInfluence` calculated against `#core-members`.
  - When scrolling into `#core-members`, Card 3 (Queen of Diamonds Q♦) descends as an ambient 3D sentinel.

### Files Changed
- `src/components/event/CoreMembersSection.tsx` (created)
- `src/app/page.tsx` (modified)
- `src/components/event/HeroSection.tsx` (modified)
- `features_implemented.md` (updated)
- `tracker.md` (updated)

### Verification
- `npm run build` executed successfully (exit code 0):
  - Turbopack optimized production build generated.
  - TypeScript strict type checks passed.
  - Static pages prerendered without errors.

### Current State
New Core Members section is fully live and styled in the Swiss typographic, Obsidian, Crimson Wire, and Ignited Amber design language. Cards deal in dynamically from the sides via GSAP ScrollTrigger, flip in 3D to reveal student quotes and archetypes, tilt in response to mouse cursor, and support filter categories and interactive re-dealing.

### Next Agent Instructions
1. Inspect [CoreMembersSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/CoreMembersSection.tsx) if adjusting member quotes, photos, or card dimensions is requested.
2. Proceed to next sections such as Dignitaries & Founders or Spread Rows Gallery if requested.

---

## 2026-11-14 — Individual Per-Card Side Entrance Animations Across All Cards

### Objective
Ensure that **all cards** have the dynamic "came in from side" animation as they scroll into view, rather than only the first card.

### Root Cause Analysis
In `CoreMembersSection.tsx`, ScrollTrigger was previously bound to the entire container (`containerRef.current`). When the top of the container hit 78% of the viewport, all cards immediately triggered their animation at the same time. Because cards 1, 2, 3, 4, and 5 were below the fold, they finished animating while offscreen. When the user scrolled down, only the first card appeared to have had the side entrance animation.

### Changes Made
1. **Per-Card ScrollTrigger in `CoreMembersSection.tsx`**:
   - Replaced container-level trigger with individual `ScrollTrigger` instances on each `.core-card-wrapper`:
     - Even cards ($0, 2, 4$) fly in from the left ($X = -300\text{px}$, rotation $-16^\circ$, rotation $Y = 28^\circ$, scale $0.80$, opacity $0$).
     - Odd cards ($1, 3, 5$) fly in from the right ($X = +300\text{px}$, rotation $+16^\circ$, rotation $Y = -28^\circ$, scale $0.80$, opacity $0$).
     - Triggered at `start: "top 88%"`, so each card visibly swooshes in from the side the exact moment it enters the viewport.
     - `toggleActions: "play none none reverse"` smoothly animates them back to the sides on reverse scroll and deals them in again when scrolling down.
2. **Sequential Deal in 3D Hero (`HeroSection.tsx`)**:
   - Updated `sideFlyX`, `sideFlyRotZ`, and `sideFlyRotY` to use individual per-card deal stagger (`cardDealStagger = (i / CARD_COUNT) * 0.45`).
   - All 18 cards in the 3D scene now fly in sequentially from alternating sides rather than sliding together as a uniform block.
3. **Archetype Side Entrance in `CardShowcase.tsx`**:
   - Added alternating side entrances (`x: -120` / `+120`, rotate $\pm 8^\circ$) to all 4 archetype cards.

### Files Changed
- `src/components/event/CoreMembersSection.tsx`
- `src/components/event/HeroSection.tsx`
- `src/components/event/CardShowcase.tsx`
- `features_implemented.md`
- `tracker.md`

### Verification
- `npm run build` executed and passed with exit code 0 (`✓ Compiled successfully in 2.5s`, static pages prerendered).

### Current State
Every single card across the entire website (in Core Members, Hero, and Archetypes) now triggers its own dynamic side-entrance animation as the user scrolls into its view.

### Next Agent Instructions
1. Inspect [CoreMembersSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/CoreMembersSection.tsx) to adjust side offsets or easing if required.
2. Continue building next sections requested by user.

---

## 2026-11-14 — Complete Removal of Archetypes and Engineered for Total Immersion Sections

### Objective
Completely remove "THE ARCHETYPES OF SANSKARAN" (`CardShowcase.tsx`) and "ENGINEERED FOR TOTAL IMMERSION" (`FeaturesGrid.tsx`) sections as requested by the user.

### Changes Made
- Updated [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx):
  - Removed `<CardShowcase />` and `<FeaturesGrid />` from imports and JSX layout.
  - Page now cleanly streams from `HeroSection` directly into `CoreMembersSection`, `WaitlistSection`, and `Footer`.
- Deleted files:
  - `src/components/event/CardShowcase.tsx`
  - `src/components/event/FeaturesGrid.tsx`
- Updated `features_implemented.md` and `tracker.md`.

### Verification
- `npm run build` executed successfully (exit code 0):
  - Turbopack compilation: `✓ Compiled successfully in 4.3s`.
  - TypeScript checking passed in 3.3s with zero errors.
  - All static pages prerendered smoothly.

### Current State
Both legacy sections have been completely removed. The page flow is streamlined: 3D Shuffle/Corridor Hero -> New Core Members ("The Court Architects" with side-entrance deal and 3D card flip) -> VIP Pass / Waitlist -> Footer.

### Next Agent Instructions
1. Inspect [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx) to add next desired sections (e.g., Dignitaries & Founders or Gallery Spread Rows) if requested.
2. Maintain persistent handoff tracking across all future tasks.

---

## 2026-11-14 — Continuous Vertical Parallax Movie Architecture (Henrietta-Style)

### Objective
Replace the previous "minimize into infinity" mechanic ($scale \to 0.001$, $Z \to -16$) with a smooth, continuous vertical 3D parallax scroll animation inspired by [Henrietta (Tattoo Digital)](https://henrietta.wearetattoodigital.com/), preserving full card scale and establishing an unbroken filmic flow as the user scrolls vertically.

### Changes Made
1. **Eliminated Scale & Depth Collapse**:
   - Removed `destScale = 0.001` and $Z \to -16$ recession code completely across all cards in [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx).
   - Preserved full physical scale ($1.05\times$ scale) on all 18 procedural cards throughout the entire scroll journey.
2. **Continuous Vertical Parallax Formula**:
   - Each card $i$ is assigned a staggered vertical base ($Y = ((i \% 6) - 2.5) \times 2.4$) and a differential layer speed ($2.4$ to $4.5\times$).
   - As $scroll$ progresses, cards drift smoothly upward along $Y$ (`verticalParallaxY = verticalBaseY + scroll * parallaxSpeed * 2.2`), creating a continuous cinematic tracking motion.
3. **Gutter Flanking**:
   - Cards smoothly fan out to flank the left ($X \approx -3.1$ to $-4.5$) and right ($X \approx +3.1$ to $+4.5$) gutters as the user scrolls away from the hero, keeping the central reading column completely clear for content.
4. **Cinematic Rotational Sway & Depth**:
   - Layered $Z$-depths ($Z \approx +1.8$ to $-6.5$) with natural perspective.
   - Rotational roll ($Z$) and pitch ($X$) sway with phase offsets, plus global mouse cursor parallax tracking.
5. **Vertical Camera Tracking**:
   - Added subtle vertical camera descent and lookAt tracking ($scrollCamY = -scroll \times 0.8$), deepening the filmic perspective.

### Files Changed
- `src/components/event/HeroSection.tsx`
- `features_implemented.md`
- `tracker.md`

### Verification
- `npm run build` executed successfully (code 0):
  - Turbopack compilation: `✓ Compiled successfully in 2.7s`.
  - TypeScript checking passed in 4.9s with zero errors.
  - Static pages prerendered.

### Current State
Cards remain at full physical scale and glide continuously along the vertical axis with differential parallax speeds like an unbroken movie shot as the user scrolls, seamlessly framing the New Core Members section and beyond.

### Next Agent Instructions
1. Inspect [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx) if adjusting vertical drift speed or horizontal gutter spacing is requested.
2. Proceed to next user features.
