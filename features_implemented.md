# Features Implemented

## Current Status Overview
All foundational libraries, responsive layout engines, and the streamlined **DevFest Showcase HeroSection** with locked widescreen video and hollow outline typography have been cleaned up and verified. The color system has been updated to the editorial **Superhuman** design system palette (`warm-parchment`, `midnight-wine`, `royal-violet`, `lilac-mist`, `deep-lagoon`, `soft-mist`, `ink-charcoal`, `paper-white`), replacing the legacy twilight palette while preserving all animations, responsive grids, and interactive features.

### 1. Sanskaran & Sahotsava Cultural Conclave Platform Architecture
- **Status**: Implemented
- **Description**: Production festival portal engineered with Next.js 16 (Turbopack), Tailwind CSS v4, GSAP ScrollTrigger, and Framer Motion:
  - **Superhuman Editorial Color System & Alternating Section Cadence (`globals.css`)**:
    - **Alternating Visual Rhythm**:
      1. Showcase Hero: Black (`#000000`) opening canvas.
      2. Sanskaran: Carbon Obsidian (`#0d0d0e`) ground with crisp white headline, lilac sub-tagline, and ambient grid.
      3. Sahotsava: Green / Deep Lagoon (`#0c4243`) ground with glowing SVG soundwave watermark and white text.
      4. Cultural Gallery: Carbon Obsidian (`#0d0d0e`) ground with borderless full-width expandable club slit cards.
      5. Core Members: Green / Deep Lagoon (`#0c4243`) ground with Lilac Mist ambient grid and 3D card physics.
      6. Dignitaries: Carbon Obsidian (`#0d0d0e`) ground with `#141416` spotlight patron cards and luminous monograms.
      7. Founders: Green / Deep Lagoon (`#0c4243`) ground with glowing emerald monograms.
      8. Footer: Carbon Obsidian (`#0d0d0e`) ground with Lilac Mist typography and elevated `#18181b` back-to-top control.
    - Surface Level 0: Carbon Obsidian (`#0d0d0e`) base canvas replacing legacy white/parchment.
    - Surface Level 1: Elevated Carbon Surface (`#141416`) elevated card surfaces.
    - Surface Level 2: Lilac Mist (`#d4c7ff`) secondary fills and badges.
    - Surface Level 3: Deep Lagoon (`#0c4243`) dark band feature storytelling section in Sahotsava & Founders.
    - Surface Level 4: Carbon Obsidian (`#0d0d0e`) footer ground and primary action buttons.
    - Royal Violet (`#714cb6`) text and border accents; Ink Charcoal (`#292827`) body text; Soft Mist (`#e3e3e2`) hairline dividers.
  - **Dedicated Sanskaran & Sahotsava Storytelling Sections (`AboutFestivalSection.tsx`)**:
    - Split into two standalone full-width sections replacing the side-by-side single row.
    - **Sanskaran Section (`#about` / `#sanskaran`)**: Warm Parchment editorial canvas with definition on the left and staggered fading-in heritage images on the right (clean borderless photo tiles with soft backdrop shadow) driven by GSAP ScrollTrigger.
    - **Sahotsava Section (`#sahotsava`)**: Deep Lagoon arena canvas with vector Sahotsava Logo Watermark backdrop, concert definition on the left, and cascading stadium images on the right (clean borderless photo tiles with soft backdrop shadow) with GSAP ScrollTrigger.
    - Interactive inspection modal dossier for exploring guild disciplines and arena lineup pillars.
    - Opening showcase pre-scatter canvas updated to pure black (`#000000`) for seamless contrast with the 9 diamond mosaic imagery.
    - Direct integration of `ShowcaseHeroSection` with zero floating switcher overlays or unneeded mode toggles.
    - **Solid Condensed Bebas Neue Display Typography Lockup**: Solid, high-contrast, non-hollow condensed display typography in **Bebas Neue** (`font-display`, `var(--font-bebas-neue)`) matching the Gallery Section headline, with a width-locked `2026` yearmark that spans the exact same width as `SANSKARAN`:
      - `SANSKARAN`: Solid crisp white (`text-white`) condensed Bebas Neue title with fluid scale ramp (`text-[44px]` mobile up to `188px` desktop) and cinematic atmospheric drop shadow (`drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]`).
      - `2026`: Solid crisp white (`text-white`), width-locked via `flex justify-between w-full` directly under `SANSKARAN`, guaranteeing identical width down to the pixel across all viewports.
      - `#COMEJOINTHEHAPPINESS`: Space Grotesk tech grotesque subtitle with `tracking-[0.24em]` uppercase styling.
      - `Explore`: Glassmorphic pill button with subtle backdrop blur and border luminance.
    - Deleted obsolete components: `src/components/originkit`, `src/components/event/HeroSection.tsx`, `src/components/event/Hero.tsx`, and `src/components/3d`.
    - Auto-starting stage video playback with `videoRef` triggering `.play()` as soon as the dark website is active.
  - **Permanent DevFest Dual Realm Showcase (`AboutFestivalSection.tsx`)**:
    - Removed `cardLayout` state and deleted the `View: [ ⊞ DevFest Grid | 🂠 Card Stack ]` switcher.
    - Locked layout to the side-by-side DevFest Grid realm cards with Google 4-color accent tokens, vector doodle backdrop, and interactive discipline inspection modal dossiers.
  - **Pure Vertical Slit Gallery with 14 Student Societies & Creative Wings (`GallerySection.tsx` & `clubsData.ts`)**:
    - **Dark Silvering Green Silk Cord & Suspension Rod Rig (/impeccable)**:
      - Validated and permanently implemented the **Silk Cord & Suspension Rod** system across all 14 society slit blocks, retiring the temporary `/emil-prototype` variant switcher (`Floating Zero-G`, `Tension Wire`, `35mm Filmstrip`):
        - **Suspension Cords & Rods**: 2.5px braided cords and interconnecting rods rendered in dark silvering green (`#16382e` deep pine, `#2a5245` forest green, `#9bbab0` / `#a3c2b5` silver luster sheen) with specular light highlights (`rgba(255,255,255,0.4)`).
        - **Mounting Eyelets**: Precision dark burnished silver-green arched eyelet rings (`border-[#9bbab0]/80` over `#1a382e`) riveted seamlessly into the top and bottom borders of every block.
        - **Overhead Gantry**: Slim `h-1.5` dark silvering green overhead suspension rail with twin vertical drops connecting to the first slit block (`ARITRAM`).
        - **Bottom Terminal Rig**: Symmetrical weighted silver-green teardrop plumb cord terminals anchoring below the final block (`BEAT BUSTER`).
    - Completely removed card suits and ranks (`club.suit`, `club.cardRank`).
    - Configured all 14 official festival student societies and wings: `ARITRAM`, `CHITRAKA DESIGNING & EDITING`, `CHITRAKA PHOTOGRAPHY`, `CHITRAKA ART AND CRAFT`, `CHITRAKATHA`, `CHECKMATE`, `DHRUBOTARA`, `NRITAKSHA`, `PAPERBACK SOCIETY`, `PHOENIX`, `SWARAKRITI`, `STEP ALPHA`, `DESI GROOVER`, and `BEAT BUSTER`.
    - Applied distinct atmospheric dark gradients, borders, and ambient halos for each of the 14 societies upon expansion.
    - **Downward Curtain Unfolding Motion**: Outer container expands height (`0` to `"auto"`, `0.5s`, `cubic-bezier(0.16, 1, 0.3, 1)`) while inner content translates downward (`y: -30px` to `0`, `0.48s`), creating a seamless physical downward curtain reveal.
    - **Smooth Retracting Motion**: On close / `(X)` click, outer container shrinks height (`"auto"` to `0`, `0.4s`, `cubic-bezier(0.32, 0.72, 0, 1)`) while inner content glides upward (`y: 0` to `-24px`, `0.25s`) with clean fade-out.
    - Consistent dark theme background across collapsed and expanded states eliminating white flash artifacts.
    - Centered editorial header lockup, thin separator rule, and 6-photo grid with lightbox inspection modal (using clean regular weight `font-sans font-normal` for photo titles).
    - **100% Mathematically & Visually Centered Slit Typography**: Pinned society titles using absolute inset positioning (`absolute inset-0 flex items-center justify-center`) with bold condensed display typography (**Bebas Neue** / `font-display font-slit-editorial tracking-wider uppercase`) ensuring all 14 society titles align down a single true vertical center axis.
    - **Responsive Mobile Typography**: Adjusted slit titles to `text-[13px] sm:text-xl md:text-2xl lg:text-3xl` and hid the left category on `< 640px` (`hidden sm:flex`) to eliminate overlapping text collisions on mobile viewports. Expanded poster titles scale smoothly from `text-2xl` on mobile to `text-7xl` on desktop.
  - **Complete Elimination of Playing Card Metaphor Across All Sections**:
    - `Navbar.tsx`: Replaced playing card suit logo `♠` with glowing festival star `✦`, changed subtitle to `CULTURAL CONCLAVE`, updated CTA to `Explore Festival`.
    - `Footer.tsx`: Updated branding to `SANSKARAN & SAHOTSAVA 2026` with tagline `"Where Intellectual Heritage Meets Stadium Euphoria"`.
    - `layout.tsx`: Updated global metadata title to `"Sanskaran & Sahotsava 2026"` and description.
    - `clubsData.ts`: Removed `suit` and `cardRank` from `ClubItem` and all 7 societies; updated anthology description.
    - `DignitariesSection.tsx` & `FoundersSection.tsx`: Removed `suit`, `rank`, watermark suits, and corner card index pips.
    - `CoreMembersSection.tsx`: Removed `suit` and `rank`, replaced corner pips with clean architect sequence identifiers (`#01`, `#02`, etc.), and updated quotes to remove card/deck metaphors.
  - **Exact 9-Image Diamond Mosaic Spatial Layout**:
    - Image 1 (Far Left): `left: 7.85%`, `top: 38.9%`, `w: 19.86%`, `h: 27.9%` (`dx: -18, dy: -18, rot: -12`).
    - Images 2 & 3 (Mid-Left Col): `left: 27.7%`, `top: 30%` & `top: 52.05%`, `w: 15.97%`, `h: ~22%` (`dx: 0, dy: -24, rot: 8` and `dx: -24, dy: 4, rot: -8`).
    - Images 4, 5, 6 (Center Col): `left: 43.68%`, `top: 17.38%`, `38.38%`, `58.79%`, `w: ~14.3%`, `h: ~21%` (`dx: 18, dy: -18`, `dx: 26, dy: -2`, `dx: -16, dy: 22`).
    - Images 7 & 8 (Mid-Right Col): `left: 57.92%` / `57.85%`, `top: 30%` & `52.44%`, `w: ~15%`, `h: ~22%` (`dx: 10, dy: -26`, `dx: 22, dy: 24`).
    - Image 9 (Far Right): `left: 72.78%`, `top: 41.31%`, `w: 19.31%`, `h: 28.42%` (`dx: 28, dy: 14, rot: -14`).
  - **Sequential Left-to-Right Entry Animation (1s to 2s duration)**:
    - Images enter from left to right with staggered timing (`delay = index * staggerDelay`).
    - Configurable duration modes: Snappy 1s (`stagger = 110ms`) and Cinematic 2s (`stagger = 190ms`).
    - Each image fades in smoothly with `opacity: 1`, `transition: opacity 400ms ease`.
  - **Kinetic Scatter and Fade Phase**:
    - Upon holding the full mosaic, images scatter outward across the screen along their exact velocity vectors:
      `transform: translate(dx vw, dy vh) rotate(rot deg) scale(0.7)`, `opacity: 0`.
    - Eased with explosive deceleration curve: `cubic-bezier(.5, 0, .75, .4)` over 900ms.
  - **Authentic Hollow Outline Typography (DevFest Spec & Google Outline Fonts)**:
    - **DevFest Inverted SVG Mask (`cB` Architecture)**:
      - Recreated DevFest Kolkata's SVG inverted cutout mask: `<mask id="..."><rect fill="#fff" /><text fill="#000" stroke="none">{text}</text></mask>` paired with `<text mask="url(#...)" fill="none" stroke="currentColor" strokeLinejoin="round">`.
      - Eliminates 100% of inner body fill while generating smooth, rounded 8px outer contours (`Google Sans`).
    - **Native Hollow Fonts & Interactive Switcher**:
      - Integrated Google Fonts hollow outline families (`Londrina Outline`, `Bungee Outline`) with zero fill.
      - Provided a live hollow font selector (`Google Sans (DevFest)`, `Londrina Outline`, `Bungee Outline`) in the floating hero controls bar.
    - **DevFest**: Thick, bold hollow white outline (`color: #ffffff`) with drop-shadow.
    - **Kolkata’26**: Thick, bold hollow blue outline (`color: #4285F4`) with glow drop-shadow.
    - **Bengali Motto**: *"কলকাতার ছন্দে, DevFest-এর আনন্দে !"* in clean, crisp white text.
    - **Get Tickets CTA**: White pill button with Google 4-color gradient border (`#F63130`, `#4787EA`, `#34A853`, `#FBC02D`) and scroll-down bouncing chevron.
  - **Video Zoom & Scale Controller**:
    - Centralized `VIDEO_ZOOM_SCALE = 1.22` (22% zoom) in `ShowcaseHeroSection.tsx` applied via `transform: scale(VIDEO_ZOOM_SCALE)` on the `<video>` element, bringing the stage and performers closer into view.
  - **Official Sanskaran / Sahotsava Aftermovie Background Video (180° Inverted Widescreen)**:
    - Transcoded and inverted 180° with `ffmpeg` (`-vf "hflip,vflip"`) into 1280x720 16:9 widescreen landscape (`public/videos/hero-background.mp4`).
    - Rendered via a native HTML5 `<video>` element (`autoPlay`, `loop`, `muted`, `playsInline`, `absolute inset-0 w-full h-full object-cover`) taking up 100% of the screen with zero black bars.
  - **Logo Migration**:
    - Central logo transitions seamlessly to top-left header position with `cubic-bezier(.33, 0, .2, 1)` as the experience activates.
  - **Website Hero Reveal**:
    - Canvas switches to Obsidian Void (`#000000`).
    - Embeds cinematic video/ambient backdrop with multi-stage gradient overlay.
    - SVG outline masked headline typography ("DevFest", "Kolkata’26"), Bengali cultural motto ("কলকাতার ছন্দে, DevFest-এর আনন্দে !"), and secondary festival edition line.
    - Interactive "Explore Festival ↓" button linking to `#about` via GSAP smooth scroll.
    - Dedicated "↺ Replay Showcase" button and 1s/2s speed switcher.
- **Key Files**:
  - `src/components/event/ShowcaseHeroSection.tsx`
  - `src/app/globals.css`
  - `src/app/page.tsx`
  - `public/showcase/*` (9 authentic webp images)
  - `public/hero-tram/*`
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 1. Unified 3-Layer Design System & Site-Wide Theme Overhaul (`/design-system`, `/impeccable`)
- **Status**: Implemented
- **Description**: Authored the full project design system in [DESIGN.md](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site%20-%20Copy/DESIGN.md) and overhauled the colour theme across the entire application:
  - **3-Layer Token Architecture**:
    - **Layer 1 (Primitives)**: `--color-obsidian-void: #000000;`, `--color-sky-zenith: #3A3F8E;`, `--color-sky-mid: #4A5290;`, `--color-sky-horizon: #62649A;`, `--color-lavender-glint: #B9ACF0;`, `--color-lavender-bright: #DED5FF;`, `--color-pale-frost: #EDE8FF;`, `--color-starlight-coral: #E8502A;`, `--color-solar-amber: #FFAA24;`.
    - **Layer 2 (Semantics)**: `--canvas-base`, `--canvas-surface`, `--canvas-card`, `--brand-primary`, `--brand-secondary`, `--brand-accent`, `--brand-highlight`, `--border-subtle`, `--border-strong`.
    - **Layer 3 (Components)**: `--hero-scene-bg`, `--hero-sky-top`, `--hero-sky-horizon`, `--nav-bg`, `--card-bg`, etc.
  - **Site-Wide Surface Transition**:
    - Replaced legacy brownish-crimson backgrounds (`#120E15`, `#1C1622`, `#8B1E24`) with pure Obsidian Void (`#000000`), deep twilight navy surfaces (`#0D0C18`, `#131224`), and soft lavender border strokes (`#B9ACF0`/20).
    - Updated `ParallaxBackground.tsx` ambient glow orbs to deep zenith blue (`#3A3F8E`), horizon haze (`#62649A`), and lavender particles (`#B9ACF0`, `#DED5FF`).
    - Updated `Navbar.tsx`, `AboutFestivalSection.tsx`, `GallerySection.tsx`, `CoreMembersSection.tsx`, `DignitariesSection.tsx`, `FoundersSection.tsx`, and `Footer.tsx` with cohesive twilight glow treatments and frosted cardstock.
    - Updated UI primitives (`button.tsx`, `card.tsx`, `card-spotlight.tsx`).
- **Key Files**:
  - `DESIGN.md`
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/components/event/*`
  - `src/components/ui/*`
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 2. Hero 59: Glimmer Vale 3D Heightfield Shader (`/impeccable`, `/design-system`, `/threejs-webgl`)
- **Status**: Implemented
- **Description**: Integrated using the authentic Originkit CLI (`npx originkit@latest add hero-59 --prompt`) and enhanced with the required design system tokens:
  - **Aesthetic Principles**:
    - **Perspective camera over heightfield**: Camera positioned over a heightfield solved back from traced screen crest lines so the composition reads as consistent frame fractions across all aspect ratios.
    - **Dark terrain mesh depth occlusion**: Dark terrain mesh writes to the depth buffer so near ridges occlude background glitter rows and hillside flowers folding behind them.
    - **Iridescent glitter crests**: Glitter strung in rows at fixed offsets from crest lines, shifting iridescently from warm peach on lit shoulders to magenta and violet down the face.
    - **Six-level bloom chain HDR pass**: 6-level downsample/upsample bloom chain allowing crests, flower cores, and glints to bleed softly into the sky while maintaining vivid hues.
    - **Defocusing daisy sprites**: Foreground daisy sprites whose petal notches fill in as they defocus, featuring magenta rim fringing, orange-ringed dark cores, and warm specks on backlit tips.
    - **Seamless wave loop**: Harmonic wave term that begins and returns to zero at cycle boundaries for a completely seamless loop.
  - **Three-Layer Design System Color Integration**:
    - `background`: `#000000` (Flat colour behind the whole scene, seen through the sky and dark floor at front).
    - `skyTop`: `#3A3F8E` (Colour at the top of the frame, deepest sky above ridges).
    - `skyHorizon`: `#62649A` (Colour the sky washes to right where it meets the hills, setting the warm glow behind crests).
  - **Hero Typography & Humanized Teaser Copy (`/anti-ai-slop`, `/humanizer`)**:
    - **H1 Title**: Prominently set to `Sanskaran` on the left-hand side.
    - **Teaser Caption**: Grounded, anti-ai-slop humanized copy introducing Sanskaran as the cultural side of the festival (live theatre, debates, fine arts, musical showcases) and leading visitors into photographs from past Sahotsava arena nights, concerts, and stages with zero buzzwords or forced triads.
  - **Tactical View Switcher**: A floating HUD badge on the hero section allowing visitors to switch between `✦ Glimmer Vale (Hero 59)` and `🂠 Cardistry Deck`.
- **Key Files**:
  - `src/components/originkit/hero-59.tsx`
  - `src/components/originkit/ui/hero-59/glimmer-vale.tsx`
  - `src/components/originkit/ui/hero-59/section-hero.tsx`
  - `src/components/originkit/ui/hero-59/hero-59-content.tsx`
  - `src/components/originkit/hero-59.css`
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 2. Monolith Corridor & Multi-Formation Cardistry Hero (`/react-three-fiber`, `/gsap-animation`, `/threejs-webgl`, `/design-taste-frontend`, `/taste-skill`)
- **Status**: Implemented
- **Description**: Recreated from the user's reference media and cardistry choreography specifications:
  - **Hero Re-Entry Animation Loop Auto-Revival**: Scrolling back to the top of the page (or clicking Back to Top / `#hero`) immediately revives and smoothly restarts the continuous 5-stage cardistry animation loop, transitioning seamlessly back into Formation 0 (3D Shuffle) or replaying the opening sequence.
  - **Continuous Looping 5-Stage 3D Cardistry Formations**:
    1. **Formation 0: 3D Riffle Helix Shuffle**: Interlocking dual-helix cascade fanning and weaving with dynamic harmonic waves and kinetic spread bursts.
    2. **Formation 1: Monolith Corridor**: Infinite two-column avenue sentinels extending into the deep fog with interactive click-to-surge warp plunge.
    3. **Formation 2: Celestial Solstice Wheel**: 360° rotating gyroscopic halo ring floating and precessing gracefully in 3D space.
    4. **Formation 3: Master Dealer Arcane Fan**: Expansive panoramic croupier spread across the viewing plane with natural card banking and breath oscillation.
    5. **Formation 4: Vortex Cyclone Spire**: Ascending double-helix cosmic spire winding upward in 3D coordinates.
  - **Non-AI-Slop Kinetic Choreography**:
    - Automatic GSAP infinite loop timeline smoothly transitioning through all 5 formations (`0 -> 1 -> 2 -> 3 -> 4 -> 0`).
    - Staggered per-card ripple timing (`(i / 18) * 0.22`), dynamic parabolic arc lift during flight (`Math.sin(cardMorphEased * Math.PI) * 0.55`), and natural banking roll twist.
    - Seamless camera perspective interpolation: wide cardistry view ($Z = 8.1$, lookAt $Y = 0.1$) seamlessly adapts to deep corridor view ($Z = 6.4$, lookAt $Y = -0.3, Z = -10$) via continuous `corridorBlend`.
  - **Autonomous Execution without Clutter**:
    - Removed bottom HUD control panel overlay and yellow vertical accent lines as requested.
    - Clean, modern layout pairing the typography directly with the "Explore Festival" CTA button while cards continuously cycle autonomously with dynamic random 1.0–2.0s timing.
  - **Timed Entrance Sequence**: Initial page load deals all 18 cards sequentially from off-screen margins with staggered 3D tilt before settling into the choreography loop.
  - **Clickable Monolith Corridor Warp Surge**: Clicking anywhere on the corridor or HUD button triggers an intense 3D warp (camera plunge, solar flare, warp embers).
  - **Persistent Viewport Stacking & Transparent Canvas**: Canvas mounted with `fixed inset-0 pointer-events-none z-[1]` and `alpha: true`, allowing cards to persist across the page.
  - **Continuous Movie Vertical Parallax (Henrietta-Style)**: Cards maintain full physical scale and continuously float upward past the viewport margins during vertical scroll.
  - **Interactive Destiny Modal**: "Draw Card" button triggers an impulse burst and draws destiny cards with 3D flip inspection.
- **Key Files**: [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx)
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 2. New Core Members Section ("The Court Architects") (`/gsap-animation`)
- **Status**: Implemented
- **Description**: Recreated from the festival data and card design references:
  - **Official Student Stewards & Architects (13 Core Members)**:
    - High-resolution real portrait imagery served via Cloudinary edge CDN (`f_auto,q_auto:good,w_800,c_limit`) with native `loading="lazy"` and `decoding="async"`:
      1. Archisha (Curation & Heritage, Executive Council, `crimson-vanguard`)
      2. Arnab (Technical & Systems Lead, Digital Architecture, `cyber-horizon`)
      3. Ayan (Festival Secretary, Student Governance, `checkered-sovereign`)
      4. Bhumi (Creative & Scenography Lead, Visual Identity, `crimson-vanguard`)
      5. Chadni (Cultural Conclave Lead, Performing Arts, `checkered-sovereign`)
      6. Debarun (Logistics & Operations, Central Command, `cyber-horizon`)
      7. Jagrit (Media & Broadcast Head, Public Engagement, `crimson-vanguard`)
      8. Nayan (Events & Production Director, Sahotsava Arena, `checkered-sovereign`)
      9. Preetisha (Public Relations & Alliances, External Relations, `cyber-horizon`)
      10. Sagnik (Finance & Sponsorships, Treasury & Corporate, `crimson-vanguard`)
      11. Shoaib (Hospitality & Delegations, Campus Welfare, `checkered-sovereign`)
      12. Sukanta (Strategic Advisor, Alumni & Advisory, `cyber-horizon`)
      13. Shounak (Operations & Logistics Lead, Executive Council, `crimson-vanguard`)
  - **Reference SVG Vector Artworks**:
    - `crimson-vanguard`: Dynamic crimson/ignited amber polygonal shields and spears.
    - `checkered-sovereign`: Isometric checkered playing court with royal chess sovereign silhouette.
    - `cyber-horizon`: Dual-tone daytime/obsidian horizon with glowing orbital concentric rings.
  - **GSAP ScrollTrigger Per-Card Side Entrance Deal**:
    - Each card in the court layout has its own individual `ScrollTrigger` bound to `top 88%` of the viewport:
      - As the user scrolls down, **every single card** (Card 0 through Card 5) sweeps in from the side as it enters the viewport (even cards from $X = -300\text{px}$, odd cards from $X = +300\text{px}$, with 3D $Y$-tilt and $Z$-rotation), settling into place with `ease: "power3.out"`.
      - Reversing scroll smoothly reverses the cards back out to the sides.
    - Dedicated interactive button `[RE-DEAL (#01)]` allows visitors to re-trigger the dealing animation for all cards with staggered delay.
  - **3D Hero Staggered Sequential Deal**:
    - In `HeroSection.tsx`, updated the 3D scene so that each of the 18 cards has its own staggered deal progress (`cardDealStagger = (i / 18) * 0.45`), dealing in all 18 cards from the sides one by one rather than as a single static block.
  - **Archetype Showcase Side Entrance**:
    - In `CardShowcase.tsx`, added alternating side entrance animations (`x: -120` / `+120`, rotate `±8°`) so all 4 archetype cards also fly in from the sides on scroll.
  - **Interactive 3D Card Flip**:
    - Tap or click (and keyboard Enter/Space) smoothly flips each card 180° (`preserve-3d`, `backface-visibility: hidden`), revealing back face with member vertical, archetype, year, and detailed vision quote.
  - **Mouse Cursor 3D Tilt & Specular Sheen**:
    - Real-time tracking applies subtle 3D rotational tilt on hover along with an interactive glare sheen that follows pointer movement.
  - **House Category Filtering**:
    - Filter tabs ("ALL ARCHITECTS", "CRIMSON VANGUARD", "CHECKERED SOVEREIGN", "CYBER HORIZON") that seamlessly re-deal and filter visible cards.
  - **Synthesized Audio Tactile Feedback**:
    - Low-latency synthesized Web Audio card click/deal sounds without external audio assets.
  - **3D Background Sentinel Synchronization**:
    - Connected `diamondInfluence` in `HeroSection.tsx`, summoning the 3D Queen of Diamonds ♦ card as an ambient background sentinel when browsing this section.
- **Key Files**: [src/components/event/CoreMembersSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/CoreMembersSection.tsx), [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx), [src/components/event/HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx)
- **Verification**: Verified via `npm run build` with 0 compilation or static page generation errors.

### 3. Skiper UI 7-Club ExpandOnHover Gallery Section (`/implement`, `/emil-prototype`, `/impeccable`, `/design-taste-frontend`, `@skiper-ui/skiper52`, `skiper53`)
- **Status**: Implemented
- **Description**: Rebuilt based on Skiper UI's `ExpandOnHover` (`skiper52` horizontal accordion and `skiper53` vertical slit stack) and user-provided visual references (`media_1794858120650_f35d2634.jpg` and `media_1794858125198_b479f74e.jpg`):
  - **100% Full-Width Edge-to-Edge Canvas**:
    - Eliminated boxed `max-w-7xl` constraints; slits now span the full width of the screen (`w-full px-2 sm:px-4 md:px-6`).
    - Removed all border outlines and divider lines (`border-0 border-none ring-0 outline-none`).
  - **Ultra-Tight Minimal Slit Spacing (~4px)**:
    - Stacked slit gap reduced to `gap-1 sm:gap-1.5` (~4px to 6px) replicating physical stacked card/paper slips.
  - **No Truncation / Fluid Slit Typography**:
    - Removed text truncation ellipsis (`...`).
    - Bold italic calligraphic editorial typography (`.font-slit-editorial`) bleeds smoothly across the slit with center spotlight artwork slice and corner metadata (`# 23`, `01`, `♠`).
  - **Dramatic Poster Expansion (ROSE THOR.N Style)**:
    - When expanded, the card morphs into a tall graphic festival poster (`h-64 sm:h-80 md:h-96`) with giant center typography (`text-4xl sm:text-6xl md:text-8xl`), quote motto, and `# 23` badge.
    - Sits flush atop the 6-image exhibition grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 p-2 sm:p-3 bg-black/70`) with zero borders.
  - **7 Sanskaran Cultural Societies / Guilds**:
    1. **01 // Theatre of Shadows** (Dramatics Guild, Ace of Spades ♠, Crimson `#E8502A`)
    2. **02 // Nocturne Symphony** (Music Society, King of Diamonds ♦, Solar Amber `#FFAA24`)
    3. **03 // Crimson Cypher** (Dance Troupe, Queen of Hearts ♥, Starlight Coral `#F43F5E`)
    4. **04 // Risograph Pavilion** (Fine Arts Atelier, Jack of Clubs ♣, Lavender Glint `#B9ACF0`)
    5. **05 // Spoken Word Arena** (Debate & Literature Conclave, 10 of Diamonds ♦, Amber `#F59E0B`)
    6. **06 // Avant-Garde Runway** (Haute Couture Guild, Queen of Diamonds ♦, Pale Frost `#EDE8FF`)
    7. **07 // Midnight Lens** (Cinematography & Media Collective, ♠ King of Spades, Electric Blue `#3B82F6`)
  - **High-Definition Lightbox Modal Inspector**:
    - Clicking any photo in the 6-image grid opens an immersive full-screen modal inspector.
    - Shows high-resolution image, title, club designation, and narrative description.
    - Sequential navigation (`← PREV` / `NEXT →`) cycling through that club's 6 images.
    - Keyboard controls: `Escape` to close, `ArrowLeft` for previous photo, `ArrowRight` for next photo.
  - **Emil Prototype Visual Mode Switcher (`/emil-prototype`)**:
    - Clean, borderless mode switcher allowing live flipping between:
      1. `Skiper 53 (Vertical Stack)`: Full-width stacked horizontal slits on all screens (default matching reference screenshot).
      2. `Dual Adaptive`: Automatic responsive layout (Skiper 52 horizontal on desktop, Skiper 53 vertical stack on mobile/tablet).
      3. `Skiper 52 (Horizontal)`: Side-by-side panoramic expanding columns.
- **Key Files**:
  - `src/components/event/GallerySection.tsx`
  - `src/lib/clubsData.ts`
  - `src/components/v1/skiper52.tsx`
  - `src/components/v1/skiper53.tsx`
  - `src/components/ui/skiper-ui/skiper52.tsx`
  - `src/app/globals.css`
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 4. Navbar & Real-Time Glowing Scroll Progress Bar (`/gsap-animation`)
- **Status**: Implemented
- **Description**:
  - **Fixed Glassmorphic Obsidian Navbar**: Mounted fixed at `top-0 left-0 right-0 z-50` with `backdrop-blur-xl`, adaptive scroll transparency, and gold ambient rim.
  - **Real-Time Glowing Scroll Progress Bar**:
    - Embedded on the bottom edge of the navbar spanning `0%` to `100%` width dynamically based on page scroll depth.
    - Rendered in a gradient from Crimson (`#8B1E24`) to Burnt Gold (`#E65C19`) to Signal Amber (`#FFAA24`) with an active drop-shadow photon flare and leading micro-dot.
  - **GSAP Smooth Scrolling (`gsapScrollTo`)**:
    - Replaces native browser `scrollIntoView` and jumpy snapping with a weighted GSAP `power3.inOut` camera glide.
    - Clicking "Explore Festival" or navigation anchor links (`01 // GALLERY`, `02 // ARCHITECTS`, `03 // BRAND`) smoothly glides to the target offset over 1.5–1.6 seconds without snapping.
- **Key Files**: [src/components/event/Navbar.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/Navbar.tsx), [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx), [src/components/event/HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx)
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 5. What is Sanskaran & What is Sahotsava Section ("01 // THE DUALITY OF THE DECK") (`/taste-skill`, `/design-taste-frontend`, `/ui-styling`, `/ui-ux-pro-max`, `/gsap-animation`, `/3d-web-experience`)
- **Status**: Implemented
- **Description**: Recreated and enhanced from the user's reference HTML with anti-AI-slop design taste:
  - **Duality Architecture (Two Realms. One Destiny.)**:
    - **Card I: What is Sanskaran? (A ♠)**: Conclave of Thought, Craft & Expression — detailed cultural narrative highlighting fine arts risograph atelier, proscenium black box theatre, parliamentary debates, classical/folk recitals, literary spoken word, and architectural scenography.
    - **Card II: What is Sahotsava? (K ♦)**: Arena of Kinetic Energy, Sound & Euphoria — high-voltage narrative featuring star stadium pro-shows, street dance cyphers, avant-garde couture runways, collegiate battle of the bands, laser synthesis lab, and campus-wide street spectacle.
  - **Tactile 3D Cards with Mouse Parallax & Specular Glare**:
    - Physics-based mouse tilt with euler angle calculation (`transform-style: preserve-3d`).
    - Dynamic specular glare highlight that follows cursor position simulating hot-stamped foil on textured cardstock.
    - Elevated 3D content layers and playing card corner indices (`A ♠`, `K ♦`).
  - **Subtle ScrollTrigger Fade-In Entrance**:
    - Smooth GSAP ScrollTrigger entrance for both What is Sanskaran and What is Sahotsava cards.
    - Animate from `{ autoAlpha: 0, y: 28 }` to `{ autoAlpha: 1, y: 0 }` with 0.85s duration, `power2.out` easing, and 0.18s stagger when triggered at viewport `top 85%`.
    - Completely decoupled outer entrance wrapper from internal mouse 3D tilt node, preventing CSS transform conflicts.
  - **Minimalist Clean Card Layout**:
    - Removed extraneous tag pills, zone specifier boxes, and bottom edition labels for an uncluttered luxury feel.
    - Preserved authentic playing card corner indices (`A ♠`, `K ♦`), titles, taglines, narrative prose, discipline pills, and "Explore Disciplines" dossier modal.
    - Removed bottom telemetry strip as requested, keeping the focus squarely on the two primary realm cards.
- **Key Files**: [src/components/event/AboutFestivalSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/AboutFestivalSection.tsx), [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx), [src/components/event/Navbar.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/Navbar.tsx), [src/components/event/HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx)
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 6. Mobile Ergonomic Navigation Bar & Real-Time Fluid Scroll Progress (`/implement`, `/anti-ai-slop`, `/emil-design-eng`)
- **Status**: Implemented
- **Description**: High-polish responsive mobile navigation bar conforming to Emil Kowalski's design engineering principles:
  - **Zero Text Wrapping & Collision Prevention**: Fixed the horizontal squeeze between the `SANSKARAN 2026` title and the `EXPLORE DECK ↓` CTA button on mobile viewports (< 420px). Added `whitespace-nowrap` and responsive label toggling (`Explore` on mobile, `Explore Deck` on `sm:`).
  - **Refined Typography & Subtitle Lockup**: Responsive brand sizing (`text-xl sm:text-2xl md:text-3xl`) with `truncate` safety. Positioned the year seamlessly into the mobile subtitle (`’26 • DECK OF DESTINIES`) while retaining the badge on `sm:` screens.
  - **Micro-Interactions & Touch Ergonomics**: Tuned touch targets to 40px+ (`h-9 sm:h-11`), applied tactile `active:scale-[0.97]` click state, and replaced generic `transition-all` with explicit CSS property transitions.
  - **Real-Time 120fps Scroll Progress Tracking**:
    - Eliminated React `setState` lag during continuous scrolling by manipulating the DOM element reference (`progressBarRef.current.style.width`) directly.
    - Replaced sluggish `transition-[width] duration-75` with a smooth requestAnimationFrame physical lerp damping (`currentProgress += (target - current) * 0.35`), ensuring the glowing photon bar tracks the user's scroll position instantaneously in real time without waiting for scrolling to stop.
- **Key Files**: [src/components/event/Navbar.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/Navbar.tsx)
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 7. GSAP Warning Suppression & Three.js Deprecation Fixes
- **Status**: Implemented
- **Description**:
  - Removed unmounted `.about-header-reveal` selector call in `AboutFestivalSection.tsx` and scoped element queries with existence guards (`cards.length > 0`) for `.realm-card-reveal` and `.realm-cards-grid`.
  - Replaced deprecated `THREE.Clock` in `HeroSection.tsx` and `EventScene.tsx` with high-precision `performance.now()` delta timing (`dt` and `elapsed`), eliminating runtime console warnings and preventing frame jumps on tab visibility switches.
- **Key Files**: [AboutFestivalSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/AboutFestivalSection.tsx), [HeroSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/HeroSection.tsx), [EventScene.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/3d/EventScene.tsx)
- **Verification**: Verified via `npm run build` (0 TypeScript errors, code 0).

### 8. Dignitaries Section ("DIGNITARIES & COUNCIL")
- **Status**: Implemented
- **Description**: Independent, dedicated section for the institution's leadership council powered by Cloudinary edge CDN:
  - **Patrons**:
    - Prof. Dr. Sujoy Biswas (Director & CEO, Techno India Group, Chief Patron, Monogram SB)
    - Prof. Dr. Rina Paladhi (Director – Academics, Techno India, Patron & Academic Head, Monogram RP)
    - Prof. Ishan Ghosh (Head of Administration & Convenor, Faculty Convenor, Monogram IG)
  - **Card Architecture**:
    - High-resolution real portrait imagery served via Cloudinary edge CDN (`f_auto,q_auto:good,w_800,c_limit`) with native `loading="lazy"` and `decoding="async"`.
    - Responsive 3-column card grid (`grid-cols-1 md:grid-cols-3 max-w-6xl`) with Aceternity UI `CardSpotlight` hover luminescence and ambient dot grid.
    - Prominently highlighted name and clean role typography.
- **Key Files**: [DignitariesSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/DignitariesSection.tsx), [cloudinaryAssets.json](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/lib/cloudinaryAssets.json)

### 9. Founders Section ("FOUNDERS OF SANSKARAN")
- **Status**: Implemented
- **Description**: Independent, dedicated section for the festival's founding student stewards powered by Cloudinary edge CDN:
  - **Founders**:
    - Partha Sarathi Pal (Founding Steward, Sanskaran, Monogram PP)
    - Sayan Chakraborty (Founding Steward, Sanskaran, Monogram SC)
  - **Card Architecture**:
    - High-resolution real portrait imagery served via Cloudinary edge CDN (`f_auto,q_auto:good,w_800,c_limit`) with native `loading="lazy"` and `decoding="async"`.
    - Aceternity UI `CardSpotlight` with glowing emerald card plinths and ambient dot grid.
- **Key Files**: [FoundersSection.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/components/event/FoundersSection.tsx), [cloudinaryAssets.json](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/lib/cloudinaryAssets.json)

### 11. Hero Section Cinematic Slideshow (`/gsap-animation`, `/animate`, `/impeccable`)
- **Status**: Implemented
- **Description**: Replaced the static looping video in `ShowcaseHeroSection.tsx` with a dynamic 35mm documentary slideshow engine:
  - **Cloudinary Asset Upload (`src/lib/heroSlideshowAssets.json` & `heroSlideshowData.ts`)**:
    - Uploaded all 32 high-resolution festival photographs from `Core Mem/Dignitaroies/New folder` to Cloudinary (`lsyjstbv/hero_slideshow`).
    - Configured with `f_auto,q_auto:good,w_1920,c_limit` for sub-5ms edge CDN delivery.
  - **Non-AI Slop Transition Engine (`HeroBackgroundSlideshow.tsx`)**:
    - **Four Handcrafted Transitions**:
      1. `dissolve`: Smooth optical crossfade with continuous Ken Burns drift.
      2. `burn`: 35mm film burn / amber light leak bloom using `mix-blend-screen` and warm golden radial gradients.
      3. `fade`: Dark shutter black dip and soft settle.
      4. `zoom-dissolve`: Focal rack push with subtle forward acceleration.
    - **Variable Organic Timing**:
      - Randomized display duration per slide between 3.5s and 6.0s (`3500ms + Math.random() * 2500ms`).
      - Organic transition switching so transitions never repeat mechanically.
    - **Double-Buffered Composite Rendering**:
      - Two alternating memory layers (Layer A & Layer B) with GPU-accelerated transforms (`autoAlpha`, `scale`).
      - Zero layout shifts and zero frame drops under load.
    - **Analog Film Aesthetics & Accessibility**:
      - Subtle 35mm film grain overlay and seamless dark vignette ensuring headline readability.
      - Full `prefers-reduced-motion` compliance.

### 12. 60 FPS Buttery-Smooth Inertia Scroll Engine & GSAP ScrollTrigger Integration (`/gsap-animation`, `/context7-mcp`)
- **Status**: Implemented
- **Description**:
  - Integrated official GSAP & Lenis smooth scrolling engine calibrated to match `https://www.technosahotsava.in/`:
    - **Ultra-Damped Inertia Momentum (`lerp: 0.03`, `duration: 2.5`)**: Direct mathematical replication of Technosahotsava's production physics. Each frame interpolates 3% of the remaining distance with a 2.5-second cinematic deceleration tail, creating a continuous, buttery glide on wheel and trackpad.
    - **Dedicated RAF Engine**: Tied `lenis.raf(time)` directly into a continuous `requestAnimationFrame` loop, driving 60/120 FPS high-refresh monitors seamlessly.
    - **Zero-Latency ScrollTrigger Sync**: Connected `lenis.on('scroll', ScrollTrigger.update)` and disabled lag smoothing via `gsap.ticker.lagSmoothing(0)`, completely eliminating trigger desync and position drift.
    - **Scrollbar Jitter Suppression**: Injected `-ms-overflow-style: none; scrollbar-width: none; html::-webkit-scrollbar { display: none; }` and `overflow-x: hidden` to eliminate chunky OS scrollbars and horizontal jitter.
    - **Hybrid GSAP-Driven Programmatic Camera Glide (`lenisScrollTo`)**:
      - Programmatic smooth scrolling (Navbar links, Explore CTA, Back-to-Top) is driven by GSAP tweens (`power2.out`, 1.1s duration) that update Lenis immediately on each frame (`globalLenis.scrollTo(scrollObj.y, { immediate: true })`).
      - Computes exact absolute target coordinates: `targetY = currentScroll + rect.top + offset`, clamped between `0` and `maxScroll`.
      - Bypasses `#hero` sticky element bounding box traps: `#hero`, `#top`, and `0` explicitly resolve to `targetY = 0` and emit `hero:restart-loop`.
    - **Navbar Clearance Offsets**:
      - Calibrated 70px top clearance (`offset: -70`) for `#sahotsava`, `#gallery`, `#core-members`, `#dignitaries`, and `#founders` so headings are never cut off by the fixed navigation bar.
      - Aligned `#about` and `#hero` to `offset: 0` for seamless 100vh hero roll-up.
    - **Global Root Provider**: Packaged in `<SmoothScrollProvider>` in `src/app/layout.tsx` with `lenis/dist/lenis.css`.
- **Key Files**:
  - `src/components/providers/SmoothScrollProvider.tsx`
  - `src/app/layout.tsx`
  - `src/components/event/Navbar.tsx`
  - `src/components/event/ShowcaseHeroSection.tsx`
  - `src/components/event/Footer.tsx`
- **Verification**: Verified via `npm run build` compilation (0 errors, code 0) and static page generation.

### 6. Framework & Core Architecture
- **Status**: Implemented
- **Description**: Next.js 16 App Router with React 19, TypeScript, Turbopack, Tailwind CSS v4, Bebas Neue, Cormorant Garamond, and Space Grotesk fonts.
- **Key Files**: [src/app/layout.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/layout.tsx), [src/app/globals.css](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/globals.css), [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx)

### 5. Removed Legacy Sections
- **Status**: Removed
- **Description**:
  - `CardShowcase.tsx` ("THE ARCHETYPES OF SANSKARAN"): Removed completely from page and disk as requested.
  - `FeaturesGrid.tsx` ("ENGINEERED FOR TOTAL IMMERSION"): Removed completely from page and disk as requested.
  - [src/app/page.tsx](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/src/app/page.tsx) updated with streamlined layout.

### 6. O(1) Discovery & Memory Pipeline (`/repomix`, `/serena`, `/agentmemory`)
- **Status**: Implemented
- **Description**:
  - `npm run repomix`: Full packed repository snapshot [repomix-output.xml](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/repomix-output.xml).
  - `npm run serena:find <symbol>`: O(1) symbol lookup in [.serena/symbols.json](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/.serena/symbols.json).
  - `npm run memory query <category>`: Persistent domain invariants in [.agentmemory/memory.json](file:///f:/C++/codes/Hackathons/Saskaran%20deck%20of%20cards%202026%20static%20site/.agentmemory/memory.json).
