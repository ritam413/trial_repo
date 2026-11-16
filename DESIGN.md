# DESIGN.md — Saskaran & Sanskaran 2026 Design System

## 1. Design Philosophy & Aesthetic Identity

**Sanskaran 2026** is an ethereal, nocturnal prelaunch showcase blending high-precision cardistry, sacred geometry, and cinematic WebGL shaders. 
The visual language transitions from the earthly fires into **Glimmer Vale**: an infinite twilight horizon where deep void floors meet luminescent lavender mountain ridges and iridescent starlight.

- **Atmosphere**: Nocturnal, celestial, tactile, cinematic.
- **Lighting**: Six-level bloom chain HDR pass, soft horizon glow, specular glints, iridescent crests.
- **Surface Elevation**: Deep obsidian glass, dark indigo chambers, subtle lavender border lines (`rgba(185, 172, 240, 0.2)`).

---

## 2. Three-Layer Token Architecture

Per the `/design-system` specification:

```
Primitive Tokens (Raw Hex / HSL)
       ↓
Semantic Tokens (Purpose & Theming Aliases)
       ↓
Component Tokens (Element-Specific Variables)
```

### Layer 1: Primitive Tokens (Raw Palette)
```css
/* Canvas & Void */
--color-obsidian-void: #000000;
--color-night-abyss: #07060D;
--color-surface-deep: #0D0C18;
--color-surface-card: #131224;
--color-surface-glass: rgba(13, 12, 24, 0.75);

/* Sky & Horizon */
--color-sky-zenith: #3A3F8E;       /* Deepest twilight blue at the top */
--color-sky-mid: #4A5290;          /* Mid-gradient sky */
--color-sky-horizon: #62649A;      /* Warm horizon haze where hills meet sky */
--color-horizon-glow: #F6E8E2;     /* Subtle warm sunrise/sunset peach glow */

/* Iridescent Accents & Flora */
--color-lavender-glint: #B9ACF0;   /* Light violet crest line and interactive hover */
--color-lavender-bright: #DED5FF;  /* Pale luminous violet highlights */
--color-pale-frost: #EDE8FF;       /* Soft frost text */
--color-starlight-coral: #E8502A;  /* Flower core & warm spectrum accent */
--color-solar-amber: #FFAA24;      /* Gold starlight & badge highlight */

/* Text & Contrast */
--color-text-primary: #FFFFFF;
--color-text-secondary: #EDE8FF;
--color-text-muted: rgba(237, 232, 255, 0.65);
--color-text-dim: rgba(237, 232, 255, 0.40);
```

### Layer 2: Semantic Tokens (System Purpose)
```css
--canvas-base: var(--color-obsidian-void);
--canvas-card: var(--color-surface-card);
--canvas-surface: var(--color-surface-deep);
--canvas-glass: var(--color-surface-glass);

--brand-primary: var(--color-sky-zenith);
--brand-secondary: var(--color-sky-horizon);
--brand-accent: var(--color-lavender-glint);
--brand-highlight: var(--color-lavender-bright);
--brand-warmth: var(--color-solar-amber);

--border-subtle: rgba(185, 172, 240, 0.15);
--border-strong: rgba(185, 172, 240, 0.35);
--border-glow: rgba(222, 213, 255, 0.60);

--glow-primary: rgba(58, 63, 142, 0.45);
--glow-horizon: rgba(98, 100, 154, 0.35);
--glow-lavender: rgba(185, 172, 240, 0.30);
--glow-amber: rgba(255, 170, 36, 0.35);
```

### Layer 3: Component Tokens (Component-Specific Wiring)
```css
--hero-scene-bg: var(--canvas-base);
--hero-sky-top: var(--color-sky-zenith);
--hero-sky-horizon: var(--color-sky-horizon);

--nav-bg: rgba(0, 0, 0, 0.85);
--nav-border: var(--border-subtle);
--nav-active: var(--brand-accent);

--card-bg: var(--canvas-card);
--card-border: var(--border-subtle);
--card-border-hover: var(--border-strong);
--card-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.8);

--button-primary-bg: linear-gradient(135deg, #DED5FF 0%, #B9ACF0 100%);
--button-primary-text: #07060D;
--button-secondary-bg: rgba(98, 100, 154, 0.2);
--button-secondary-border: var(--border-strong);
```

---

## 3. Typography Hierarchy

| Style Role | Font Family | Default Weight | Tracking | Usage |
|---|---|---|---|---|
| **Display Heading (Hero)** | `"Instrument Serif", Georgia, serif` | 400 | `-0.01em` | Hero title ("Sanskaran"), major section titles |
| **Architectural Deck / Impact** | `"Bebas Neue", Impact, sans-serif` | 400 | `0.02em` | Card indexes, stats, numbers, countdown |
| **Classical Editorial** | `"Cormorant Garamond", Georgia, serif` | 400 / 600 Italic | `0em` | Subtitles, festival quotes, philosophical lore |
| **Technical Data / Badges** | `"DM Mono", "Geist Mono", monospace` | 400 / 500 | `0.05em` | Metadata, coordinates, dates, discipline tags |
| **Body & UI** | `"Inter", "Instrument Sans", sans-serif` | 400 / 500 | `-0.01em` | Paragraphs, navigation links, buttons |

---

## 4. UI Geometry & Radii

- **Badges / Tags**: `9999px` (Pill / Capsule)
- **Buttons**: `12px` / `9999px` (Soft rounded corner or pill for hero CTA)
- **Cards**: `20px` to `24px` (`rounded-2xl` / `rounded-3xl`)
- **Modals & Drawers**: `28px` to `32px` (`rounded-3xl`)

---

## 5. Shadows, Scrims & Glows

- **Nocturnal Scrim**: Multi-stop radial gradients starting at `rgba(0, 0, 0, 0.65)` and fading out to `0%` over 72%.
- **Ambient Orb 1 (Zenith)**: `radial-gradient(from #3A3F8E/25 to transparent blur-[160px])`
- **Ambient Orb 2 (Horizon)**: `radial-gradient(from #62649A/20 to transparent blur-[180px])`
- **Ambient Orb 3 (Starlight)**: `radial-gradient(from #B9ACF0/15 via #FFAA24/10 to transparent blur-[180px])`
- **Elevation Shadow**: `0 20px 50px -15px rgba(0, 0, 0, 0.9)`

