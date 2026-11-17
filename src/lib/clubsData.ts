export interface ClubPhoto {
  id: string;
  code: string;
  title: string;
  tag: string;
  description: string;
  src: string;
}

export interface ClubItem {
  id: string;
  number: string;
  name: string;
  category: string;
  accentColor: string;
  gradient: string;
  coverImage: string;
  motto: string;
  description: string;
  images: ClubPhoto[];
}

export const CLUBS_DATA: ClubItem[] = [
  {
    "id": "aritram",
    "number": "01",
    "name": "ARITRAM",
    "category": "DRAMATICS & THEATRE",
    "accentColor": "#E8502A",
    "gradient": "from-[#E8502A] to-[#8B1E24]",
    "coverImage": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    "motto": "The Stage is a Crucible of Human Truth",
    "description": "Proscenium one-act plays, street theatre (Nukkad Natak), raw mono-acts, and dark psychological scenography exploring human emotion.",
    "images": [
      {
        "id": "ar-01",
        "code": "# 01",
        "title": "The Solitary Soliloquy",
        "tag": "PROSCENIUM MAIN STAGE",
        "description": "A dramatic monologue performed under warm tungsten spotlights during the Annual One-Act Play finals.",
        "src": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ar-02",
        "code": "# 02",
        "title": "Aawaz \u2014 Nukkad Natak",
        "tag": "AMPHITHEATRE CYPHER",
        "description": "Electrifying street play circle engaging over 1,200 spectators with raw dholak rhythms and social satire.",
        "src": "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ar-03",
        "code": "# 03",
        "title": "Wings of Anticipation",
        "tag": "BACKSTAGE SHADOWS",
        "description": "Lead actors in period costumes rehearsing lines in the shadows seconds before the curtain rises.",
        "src": "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ar-04",
        "code": "# 04",
        "title": "The Final Curtain Call",
        "tag": "STANDING OVATION",
        "description": "The cast receiving a thunderous standing ovation in the illuminated main auditorium.",
        "src": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ar-05",
        "code": "# 05",
        "title": "Atmospheric Rigging",
        "tag": "SCENOGRAPHY & LIGHTS",
        "description": "High-angle spotlight grids creating steep chiaroscuro contrast across the minimalist wooden stage floor.",
        "src": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ar-06",
        "code": "# 06",
        "title": "Silent Resonance",
        "tag": "MIME THEATRE",
        "description": "Monochrome physical mime performance telling an evocative tale of industrial time without speaking a word.",
        "src": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "chitraka-design",
    "number": "02",
    "name": "CHITRAKA DESIGNING & EDITING",
    "category": "DIGITAL DESIGN & VFX",
    "accentColor": "#38BDF8",
    "gradient": "from-[#38BDF8] to-[#0284C7]",
    "coverImage": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    "motto": "Synthesizing Vectors, Crafting Virtual Realities",
    "description": "Motion design, 3D blender animation, festival visual identity branding, UI/UX prototyping, and aftermovie post-production.",
    "images": [
      {
        "id": "cd-01",
        "code": "# 01",
        "title": "Cyber Kinetic Rig",
        "tag": "3D MOTION GRAPHICS",
        "description": "Procedural neon geometry animation modeled for the Sahotsava mainstage LED backdrop wall.",
        "src": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cd-02",
        "code": "# 02",
        "title": "Vector Glyph Atelier",
        "tag": "BRAND IDENTITY",
        "description": "Vector typographic glyph exploration for the 2026 festival identity handbook.",
        "src": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cd-03",
        "code": "# 03",
        "title": "Post-Production Grade",
        "tag": "DAVINCI RESOLVE SUITE",
        "description": "High-fidelity color correction suite grading festival concert recap reels in 4K DCI.",
        "src": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cd-04",
        "code": "# 04",
        "title": "Poster Architecture",
        "tag": "EXPERIMENTAL LAYOUT",
        "description": "Brutalist Swiss typography and riso-gradient festival banners printed for campus display.",
        "src": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cd-05",
        "code": "# 05",
        "title": "Visual Synthesis",
        "tag": "TOUCHDESIGNER LIVE",
        "description": "Real-time audio-reactive generative visual synthesizer synchronized to live DJ sets.",
        "src": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cd-06",
        "code": "# 06",
        "title": "Digital Blueprint",
        "tag": "CREATIVE DIRECTION",
        "description": "Interface architecture and interactive motion assets designed for the Sanskaran web platform.",
        "src": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "chitraka-photography",
    "number": "03",
    "name": "CHITRAKA PHOTOGRAPHY",
    "category": "PHOTOGRAPHY & MEDIA",
    "accentColor": "#F59E0B",
    "gradient": "from-[#F59E0B] to-[#B45309]",
    "coverImage": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    "motto": "Preserving Ephemeral Light in 24fps",
    "description": "35mm film photography, official concert photojournalism, aerial drone captures, and street documentary framing campus life.",
    "images": [
      {
        "id": "cp-01",
        "code": "# 01",
        "title": "The 24fps Eye",
        "tag": "CINEMA CAMERA RIG",
        "description": "Cinematographer wielding a gimbal-mounted anamorphic cinema camera tracking performers in low light.",
        "src": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cp-02",
        "code": "# 02",
        "title": "Silver Halide",
        "tag": "DARKROOM LAB",
        "description": "Freshly developed 35mm black and white film negatives hung to dry under crimson darkroom lamps.",
        "src": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cp-03",
        "code": "# 03",
        "title": "Campus from Above",
        "tag": "DRONE PERSPECTIVE",
        "description": "Aerial night perspective of the illuminated central lawn buzzing with 15,000 festival participants.",
        "src": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cp-04",
        "code": "# 04",
        "title": "Freeze Frame Stride",
        "tag": "STAGE ACTION",
        "description": "High shutter speed capturing flying dust and spotlight reflections during the dance clash.",
        "src": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cp-05",
        "code": "# 05",
        "title": "Portraits in Amber",
        "tag": "GOLDEN HOUR",
        "description": "Intimate natural light portraits of festival performers during twilight backstage preparations.",
        "src": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cp-06",
        "code": "# 06",
        "title": "The Gallery Colonnade",
        "tag": "PHOTO EXHIBIT",
        "description": "Framed documentary festival prints mounted along the open-air colonnade under warm downlights.",
        "src": "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "chitraka-art",
    "number": "04",
    "name": "CHITRAKA ART AND CRAFT",
    "category": "FINE ARTS & SCULPTURE",
    "accentColor": "#B9ACF0",
    "gradient": "from-[#B9ACF0] to-[#6D28D9]",
    "coverImage": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    "motto": "Pigment, Paper, and Tactile Memory",
    "description": "Live collaborative murals, terracotta pottery, charcoal sketching, origami installations, and hand-crafted festival decor.",
    "images": [
      {
        "id": "ca-01",
        "code": "# 01",
        "title": "Monochrome Genesis",
        "tag": "LIVE CHARCOAL MURAL",
        "description": "Artists collaborating on a 24-foot canvas depicting mythological guardians with dense charcoal sticks.",
        "src": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ca-02",
        "code": "# 02",
        "title": "Dual-Drum Impression",
        "tag": "RISOGRAPH ATELIER",
        "description": "Hand-printed multi-color festival posters drying on wooden racks with tactile soy-based inks.",
        "src": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ca-03",
        "code": "# 03",
        "title": "Origami Monolith",
        "tag": "PAPER SCULPTURE",
        "description": "Modular tessellated paper sculpture suspended from the glass atrium dome catching daylight rays.",
        "src": "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ca-04",
        "code": "# 04",
        "title": "Pigment Bleed",
        "tag": "WATERCOLOR WORKSHOP",
        "description": "Wet-on-wet watercolor study capturing autumnal blossoms on handmade cotton deckle-edge paper.",
        "src": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ca-05",
        "code": "# 05",
        "title": "Earthen Form",
        "tag": "POTTERY & CERAMICS",
        "description": "Centering raw terracotta clay on a manual potter's wheel under open afternoon sun.",
        "src": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ca-06",
        "code": "# 06",
        "title": "Calligraphic Flourish",
        "tag": "INK & SCRIPTO",
        "description": "Broad-edge bamboo reed calligraphy exploring Sanskrit and Devanagari architectural letters.",
        "src": "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "chitraka",
    "number": "05",
    "name": "CHITRAKA",
    "category": "CREATIVE ARTS ATELIER",
    "accentColor": "#EC4899",
    "gradient": "from-[#EC4899] to-[#9D174D]",
    "coverImage": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    "motto": "The Epicenter of Visual Aesthetics & Imagination",
    "description": "Parent creative club uniting painters, digital illustrators, photographers, sculptors, and designers into a unified visual guild.",
    "images": [
      {
        "id": "chk-01",
        "code": "# 01",
        "title": "Palette & Prism",
        "tag": "FLAGSHIP EXHIBITION",
        "description": "The centerpiece gallery hall showcasing the annual juried artwork across painting, craft, and film.",
        "src": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "chk-02",
        "code": "# 02",
        "title": "Living Canvas",
        "tag": "INSTALLATION ART",
        "description": "Interactive light-and-fabric portal welcoming attendees at the festival entrance gate.",
        "src": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "chk-03",
        "code": "# 03",
        "title": "Street Chalk Symphony",
        "tag": "MAD-ABOUT-ART",
        "description": "Intricate Rangoli and geometric floor art drafted with colored powder and chalk on campus avenues.",
        "src": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "chk-04",
        "code": "# 04",
        "title": "Sculpting the Ephemeral",
        "tag": "CLAY MODELING",
        "description": "Artists modeling character maquettes in air-dry clay during the 3-hour speed sculpture sprint.",
        "src": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "chk-05",
        "code": "# 05",
        "title": "Graffiti Rebirth",
        "tag": "OUTDOOR WALL ART",
        "description": "Large-format spray paint graffiti mural celebrating the confluence of technology and cultural heritage.",
        "src": "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "chk-06",
        "code": "# 06",
        "title": "Master's Showcase",
        "tag": "CURATOR'S FORUM",
        "description": "Guest artists reviewing student sketchbooks and providing professional industry feedback.",
        "src": "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "checkmate",
    "number": "06",
    "name": "CHECKMATE",
    "category": "CHESS & STRATEGY",
    "accentColor": "#94A3B8",
    "gradient": "from-[#94A3B8] to-[#334155]",
    "coverImage": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
    "motto": "Every Move a Masterpiece of Mind",
    "description": "Blitz tournaments, grandmaster analysis sessions, blindfold simuls, and tactical masterclasses on the checkered board.",
    "images": [
      {
        "id": "cm-01",
        "code": "# 01",
        "title": "The Sicilian Defense",
        "tag": "BLITZ SHOWDOWN",
        "description": "Players trading rapid moves with five seconds on the digital chess clock in the grand finals.",
        "src": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cm-02",
        "code": "# 02",
        "title": "Knight's Gambit",
        "tag": "SIMUL ARENA",
        "description": "Grandmaster simultaneous display taking on twenty collegiate challengers at the same time.",
        "src": "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cm-03",
        "code": "# 03",
        "title": "Wooden Majesty",
        "tag": "CHAMPIONSHIP SET",
        "description": "Hand-carved Staunton tournament pieces resting on a solid walnut board under focused warm lighting.",
        "src": "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cm-04",
        "code": "# 04",
        "title": "Pondering the End Game",
        "tag": "DEEP CALCULATION",
        "description": "Finalist analyzing rook-and-pawn endgame permutations with deep intellectual focus.",
        "src": "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cm-05",
        "code": "# 05",
        "title": "Blindfold Duel",
        "tag": "COGNITIVE MASTERY",
        "description": "Exhibition blindfold game with moves dictated aloud via algebraic notation to an amazed crowd.",
        "src": "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "cm-06",
        "code": "# 06",
        "title": "Checkmate Decided",
        "tag": "THE CORONATION",
        "description": "The fateful queen sacrifice delivering checkmate amidst applause from spectators.",
        "src": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "dhrubotara",
    "number": "07",
    "name": "DHRUBOTARA",
    "category": "ASTRONOMY & SCIENCE",
    "accentColor": "#818CF8",
    "gradient": "from-[#818CF8] to-[#312E81]",
    "coverImage": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    "motto": "Guiding Stars Across the Intellectual Horizon",
    "description": "Telescope stargazing soirees, astrophotography workshops, scientific symposia, quiz conclaves, and cosmic wonder.",
    "images": [
      {
        "id": "dt-01",
        "code": "# 01",
        "title": "The Rings of Saturn",
        "tag": "ROOFTOP OBSERVATORY",
        "description": "High-powered motorized Dobsonian telescope pointed toward Saturn under clear winter skies.",
        "src": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dt-02",
        "code": "# 02",
        "title": "Milky Way Arch",
        "tag": "ASTROPHOTOGRAPHY",
        "description": "Long-exposure night sky panorama capturing cosmic nebula dust above the campus belltower.",
        "src": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dt-03",
        "code": "# 03",
        "title": "Cosmic Symposium",
        "tag": "SCIENCE FORUM",
        "description": "Keynote lecture on gravitational waves and quantum astrophysics in the packed central auditorium.",
        "src": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dt-04",
        "code": "# 04",
        "title": "Lunar Details",
        "tag": "MOON CRATER STUDY",
        "description": "High-resolution lunar surface photograph capturing Tycho and Copernicus craters in crisp detail.",
        "src": "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dt-05",
        "code": "# 05",
        "title": "Optics Lab",
        "tag": "SPECTROSCOPY EXPERIMENT",
        "description": "Students splitting light spectra with prisms to measure stellar emission fingerprints.",
        "src": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dt-06",
        "code": "# 06",
        "title": "Night Sky Watchers",
        "tag": "MIDNIGHT EXPEDITION",
        "description": "Student astronomers bundled in jackets charting meteor showers until dawn.",
        "src": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "nritaksha",
    "number": "08",
    "name": "NRITAKSHA",
    "category": "DANCE TROUPE",
    "accentColor": "#F43F5E",
    "gradient": "from-[#F43F5E] to-[#9F1239]",
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    "motto": "Kinetic Geometry in Pure Motion",
    "description": "Classical Kathak & Bharatnatyam pirouettes, street dance clashes, contemporary lyrical flow, and folk choreography.",
    "images": [
      {
        "id": "nr-01",
        "code": "# 01",
        "title": "Ghunghroo Swirl",
        "tag": "KATHAK CLASSICAL",
        "description": "High-speed spins (chakkars) with resonant brass bells and flowing red silk costumes.",
        "src": "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "nr-02",
        "code": "# 02",
        "title": "Floor Power Move",
        "tag": "ALL-STYLES CYPHER",
        "description": "One-handed windmill freeze captured during the inter-collegiate hip-hop throwdown.",
        "src": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "nr-03",
        "code": "# 03",
        "title": "Echoes of Gravity",
        "tag": "CONTEMPORARY DUET",
        "description": "Weightless lift amid haze and low-lying ground fog in the experimental movement showcase.",
        "src": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "nr-04",
        "code": "# 04",
        "title": "Lock & Pop Lockdown",
        "tag": "CREW SYNCHRONIZATION",
        "description": "A 16-member mega-crew executing mechanical isolation moves with laser precision.",
        "src": "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "nr-05",
        "code": "# 05",
        "title": "Midnight Circle",
        "tag": "UV FREESTYLE",
        "description": "Freestyle cypher illuminated strictly by ultraviolet glow sticks and neon face paint.",
        "src": "https://images.unsplash.com/photo-1545224144-b38cd309ef69?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "nr-06",
        "code": "# 06",
        "title": "Dhol & Daman",
        "tag": "FOLK BHANGRA FUSION",
        "description": "High-jumping celebratory Bhangra routine stirring the entire outdoor courtyard into celebration.",
        "src": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "paperback-society",
    "number": "09",
    "name": "PAPERBACK SOCIETY",
    "category": "LITERATURE & DEBATE",
    "accentColor": "#FBBF24",
    "gradient": "from-[#FBBF24] to-[#78350F]",
    "coverImage": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    "motto": "Words That Shatter and Reconstruct",
    "description": "Parliamentary debate conclaves, slam poetry showdowns, spontaneous typewriter prose corners, and anthology launches.",
    "images": [
      {
        "id": "pb-01",
        "code": "# 01",
        "title": "The Spoken Cadence",
        "tag": "POETRY SLAM FINALS",
        "description": "A poet delivering an unfiltered, passionate stanza under an incandescent bulb in the amphitheatre.",
        "src": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "pb-02",
        "code": "# 02",
        "title": "Rebuttal Point",
        "tag": "PARLIAMENTARY DEBATE",
        "description": "The Leader of Opposition offering a sharp point of information during the motions of state debate.",
        "src": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "pb-03",
        "code": "# 03",
        "title": "Ink & Ribbon",
        "tag": "TYPEWRITER POETRY",
        "description": "A vintage typewriter inviting attendees to tap out haikus and impromptu letters on kraft paper.",
        "src": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "pb-04",
        "code": "# 04",
        "title": "Tension at the Buzzer",
        "tag": "ANNUAL GENERAL QUIZ",
        "description": "Finalist teams locked in deliberation as the 10-second buzzer counts down in the audio-visual round.",
        "src": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "pb-05",
        "code": "# 05",
        "title": "Tales in the Dark",
        "tag": "MIDNIGHT STORY CIRCLE",
        "description": "Intimate late-night folklore and urban legend storytelling around an acoustic courtyard lantern.",
        "src": "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "pb-06",
        "code": "# 06",
        "title": "The Anthology",
        "tag": "LITERARY JOURNAL LAUNCH",
        "description": "Unveiling the collector's foil-embossed edition of 'Sanskaran Literary Anthology 2026'.",
        "src": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "phoenix",
    "number": "10",
    "name": "PHOENIX",
    "category": "TECH & GAMING",
    "accentColor": "#FF5722",
    "gradient": "from-[#FF5722] to-[#B91C1C]",
    "coverImage": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    "motto": "Rising From Pixels, Engineering The Future",
    "description": "Competitive esports tournaments (Valorant, FIFA, BGMI), robotics battles, hackathon sprints, and indie game demos.",
    "images": [
      {
        "id": "ph-01",
        "code": "# 01",
        "title": "The Grand Finals",
        "tag": "ESPORTS STADIUM",
        "description": "Pro-tier gaming arena with RGB lighting towers and commentary casting desk during the championship.",
        "src": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ph-02",
        "code": "# 02",
        "title": "Robowars Clash",
        "tag": "COMBAT ROBOTICS",
        "description": "Heavyweight combat robots throwing sparks in the reinforced Lexan arena pit.",
        "src": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ph-03",
        "code": "# 03",
        "title": "Overclocked Sprints",
        "tag": "24-HOUR HACKATHON",
        "description": "Teams huddled around dual-screen laptops and breadboards building IoT prototypes overnight.",
        "src": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ph-04",
        "code": "# 04",
        "title": "Mechanical Precision",
        "tag": "DRONE OBSTACLE RACE",
        "description": "FPV racing drones zooming through illuminated gates with telemetry streaming to pilot goggles.",
        "src": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ph-05",
        "code": "# 05",
        "title": "VR Immersion",
        "tag": "XR METAVERSE LAB",
        "description": "Attendees interacting with student-built virtual reality simulations on wireless headsets.",
        "src": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "ph-06",
        "code": "# 06",
        "title": "Victory Trophy",
        "tag": "CHAMPIONSHIP STAGE",
        "description": "Winning collegiate esports squad hoisting the gold chalice under pulsing crimson strobes.",
        "src": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "swarakriti",
    "number": "11",
    "name": "SWARAKRITI",
    "category": "MUSIC SOCIETY",
    "accentColor": "#EAB308",
    "gradient": "from-[#EAB308] to-[#CA8A04]",
    "coverImage": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    "motto": "Harmonics That Pierce The Midnight Void",
    "description": "Inter-collegiate battle of the bands, classical Hindustani ragas, acoustic courtyard jamming, and symphonic vocals.",
    "images": [
      {
        "id": "sw-01",
        "code": "# 01",
        "title": "Overdrive Crescendo",
        "tag": "BATTLE OF BANDS",
        "description": "Lead guitarist hitting a soaring harmonic solo amid blinding amber pyrotechnics and stadium bass.",
        "src": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sw-02",
        "code": "# 02",
        "title": "Raga Bhairav Jugalbandi",
        "tag": "CLASSICAL ACOUSTICS",
        "description": "Sitar and tabla jugalbandi in the morning courtyard echoing intricate rhythmic cycles (Teen Taal).",
        "src": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sw-03",
        "code": "# 03",
        "title": "Percussion Pulse",
        "tag": "DRUM ARENA",
        "description": "High-octane drum kit solo captured in high shutter speed as sweat catches the stage side fills.",
        "src": "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sw-04",
        "code": "# 04",
        "title": "Choral Polyphony",
        "tag": "WESTERN VOCAL ENSEMBLE",
        "description": "Twelve-part vocal harmony blending with Steinway grand piano in the resonant acoustics of the hall.",
        "src": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sw-05",
        "code": "# 05",
        "title": "Modular Voltage",
        "tag": "SYNTHESIS LAB",
        "description": "Analog synthesizer patches and sequencer manipulation during the midnight electronic showcase.",
        "src": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sw-06",
        "code": "# 06",
        "title": "Constellation of Sound",
        "tag": "SAHOTSAVA CONCERT NIGHT",
        "description": "A sea of 10,000 glowing smartphones swaying in unison to the headliner's acoustic encore.",
        "src": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "step-alpha",
    "number": "12",
    "name": "STEP ALPHA",
    "category": "URBAN HIP-HOP & STREET",
    "accentColor": "#10B981",
    "gradient": "from-[#10B981] to-[#047857]",
    "coverImage": "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=80",
    "motto": "Precision Isolations, Heavy Beats",
    "description": "Street style krump, popping, locking, breaking, and underground hip-hop choreographies dominating urban battles.",
    "images": [
      {
        "id": "sa-01",
        "code": "# 01",
        "title": "Synchronized Pop",
        "tag": "STREET CYPHER",
        "description": "Heavy 808 bass drops hitting as the crew delivers a robotic isolation wave in unison.",
        "src": "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sa-02",
        "code": "# 02",
        "title": "Breaking the Concrete",
        "tag": "POWER MOVE BATTLE",
        "description": "B-boy spinning into an inverted headspin on the linoleum battle floor.",
        "src": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sa-03",
        "code": "# 03",
        "title": "Krump Fury",
        "tag": "EXPRESSIVE MOVEMENT",
        "description": "High-intensity chest pop and raw theatrical expression during the 1v1 battle finals.",
        "src": "https://images.unsplash.com/photo-1545224144-b38cd309ef69?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sa-04",
        "code": "# 04",
        "title": "Streetwear Aesthetics",
        "tag": "CREW IDENTITY",
        "description": "Oversized jerseys, bucket hats, and high-top sneakers commanding the proscenium stage.",
        "src": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sa-05",
        "code": "# 05",
        "title": "Underground Haze",
        "tag": "NIGHT ARENA",
        "description": "Backlit silhouettes carving sharp angles through dense theatrical smoke.",
        "src": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "sa-06",
        "code": "# 06",
        "title": "The Championship Pose",
        "tag": "VICTORY CYPHER",
        "description": "The crew locked in their signature alpha freeze as the judges raise the 10-point banners.",
        "src": "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "desi-groover",
    "number": "13",
    "name": "DESI GROOVER",
    "category": "BOLLYWOOD & FOLK DANCE",
    "accentColor": "#F97316",
    "gradient": "from-[#F97316] to-[#C2410C]",
    "coverImage": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    "motto": "Euphoric Rhythms, Celebration of Roots",
    "description": "High-octane Bollywood extravaganzas, Rajasthani Ghoomar, Punjabi Bhangra, and festive Garba circles.",
    "images": [
      {
        "id": "dg-01",
        "code": "# 01",
        "title": "Dholak Thunder",
        "tag": "PUNJABI BHANGRA",
        "description": "Energetic jumps with colorful saap props creating thunderous claps across the open arena.",
        "src": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dg-02",
        "code": "# 02",
        "title": "Ghoomar Swirls",
        "tag": "FOLK EXTRAVAGANZA",
        "description": "Mirrored lehengas flaring out in kaleidoscopic spirals to traditional desert folk instruments.",
        "src": "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dg-03",
        "code": "# 03",
        "title": "Dandiya Raas Night",
        "tag": "FESTIVAL CIRCLE",
        "description": "Rhythmic wooden sticks clacking in intricate synchrony under glowing paper lantern canopies.",
        "src": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dg-04",
        "code": "# 04",
        "title": "Bollywood Blockbuster",
        "tag": "THEATRICAL FUSION",
        "description": "A 25-dancer synchronized routine celebrating 90s cinema romance and electrifying modern beats.",
        "src": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dg-05",
        "code": "# 05",
        "title": "Gulal Explosion",
        "tag": "HOLI COLOR DANCE",
        "description": "Vibrant plumes of saffron and magenta powder erupting during the climactic stage finale.",
        "src": "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "dg-06",
        "code": "# 06",
        "title": "The Grand Ensemble",
        "tag": "STANDING APPLAUSE",
        "description": "All performers bowing in opulent ethnic attire as celebratory confetti rains across the stage.",
        "src": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    "id": "beat-buster",
    "number": "14",
    "name": "BEAT BUSTER",
    "category": "BEATBOX, RAP & ACOUSTIC",
    "accentColor": "#06B6D4",
    "gradient": "from-[#06B6D4] to-[#0E7490]",
    "coverImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    "motto": "Vocal Synthesis, Raw Mic Energy",
    "description": "Vocal percussion, underground rap ciphers, throat bass drops, loop station artistry, and impromptu acoustic jams.",
    "images": [
      {
        "id": "bb-01",
        "code": "# 01",
        "title": "Throat Bass Vibration",
        "tag": "BEATBOX BATTLE",
        "description": "Vocalist dropping sub-bass frequencies and snare rimshots directly on the dynamic microphone.",
        "src": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "bb-02",
        "code": "# 02",
        "title": "Loopstation Layering",
        "tag": "LIVE ELECTRONICA",
        "description": "Building a full polyphonic track live using only voice, RC-505 loopstation, and vocal delays.",
        "src": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "bb-03",
        "code": "# 03",
        "title": "Desi Hip-Hop Cypher",
        "tag": "RAP ARENA",
        "description": "Rappers trading rapid multilingual rhymes in Bengali, Hindi, and English over raw boombap beats.",
        "src": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "bb-04",
        "code": "# 04",
        "title": "Acoustic Harmonizer",
        "tag": "UNPLUGGED SESSIONS",
        "description": "Beatboxer backing an acoustic guitar soloist under the amphitheatre banyan tree.",
        "src": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "bb-05",
        "code": "# 05",
        "title": "Crowd Hypnosis",
        "tag": "CROWD INTERACTION",
        "description": "Leading a 3,000-strong call-and-response vocal beatbox routine at the festival side stage.",
        "src": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80"
      },
      {
        "id": "bb-06",
        "code": "# 06",
        "title": "The Golden Mic",
        "tag": "AWARD CEREMONY",
        "description": "Champion beatboxer raising the engraved vintage microphone trophy amid thunderous cheers.",
        "src": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80"
      }
    ]
  }
];
