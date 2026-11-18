const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

function createSvg(bgGrad, title, subtitle, badgeText, artworkSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    ${bgGrad}
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="500" fill="url(#bg)" />
  
  <!-- Subtle Grid Atmosphere -->
  <path d="M0,100 H800 M0,200 H800 M0,300 H800 M0,400 H800" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  <path d="M100,0 V500 M200,0 V500 M300,0 V500 M400,0 V500 M500,0 V500 M600,0 V500 M700,0 V500" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  
  <!-- Main Artwork -->
  <g filter="url(#shadow)">
    ${artworkSvg}
  </g>
  
  <!-- Overlay Vignette & Title Banner -->
  <rect y="400" width="800" height="100" fill="url(#bannerGrad)" />
  <defs>
    <linearGradient id="bannerGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0e14" stop-opacity="0" />
      <stop offset="60%" stop-color="#0a0e14" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0a0e14" stop-opacity="0.98" />
    </linearGradient>
  </defs>

  <!-- Badge -->
  <rect x="40" y="32" rx="6" width="130" height="28" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="105" y="51" fill="#55ff55" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">${badgeText}</text>
  
  <!-- Titles -->
  <text x="40" y="445" fill="#ffffff" font-family="'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" letter-spacing="0.5">${title}</text>
  <text x="40" y="472" fill="#aaaaaa" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500">${subtitle}</text>
</svg>`;
}

const builds = [
  {
    base: 'valengard_citadel',
    name: 'Valengard Royal Citadel',
    exterior: {
      badge: 'MEDIEVAL CASTLE',
      sub: 'Four Fortified Bastions & Grand Gatehouse',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f1926"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>`,
      art: `
        <!-- Castle Silhouette -->
        <rect x="250" y="160" width="300" height="220" fill="#334155" stroke="#475569" stroke-width="4"/>
        <rect x="180" y="120" width="110" height="260" fill="#1e293b" stroke="#334155" stroke-width="4"/>
        <rect x="510" y="120" width="110" height="260" fill="#1e293b" stroke="#334155" stroke-width="4"/>
        <!-- Conical Roofs -->
        <polygon points="170,120 235,50 300,120" fill="#451a03" stroke="#78350f" stroke-width="3"/>
        <polygon points="500,120 565,50 630,120" fill="#451a03" stroke="#78350f" stroke-width="3"/>
        <!-- Central Donjon Keep -->
        <rect x="330" y="90" width="140" height="150" fill="#1e293b" stroke="#475569" stroke-width="4"/>
        <polygon points="320,90 400,30 480,90" fill="#7f1d1d" stroke="#b91c1c" stroke-width="3"/>
        <!-- Gatehouse Arch & Portcullis -->
        <path d="M360,380 V300 Q400,270 440,300 V380 Z" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
        <line x1="380" y1="300" x2="380" y2="380" stroke="#94a3b8" stroke-width="3"/>
        <line x1="400" y1="285" x2="400" y2="380" stroke="#94a3b8" stroke-width="3"/>
        <line x1="420" y1="300" x2="420" y2="380" stroke="#94a3b8" stroke-width="3"/>
        <!-- Flags & Torches -->
        <line x1="400" y1="30" x2="400" y2="10" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="400,10 435,18 400,26" fill="#ef4444"/>
      `
    },
    interior: {
      badge: 'INTERIOR HALL',
      sub: 'Great Banquet Hall & King Throne Dais',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#18110b"/><stop offset="100%" stop-color="#2d1c10"/></linearGradient>`,
      art: `
        <!-- Banquet Room Walls -->
        <rect x="100" y="80" width="600" height="310" fill="#292524" stroke="#44403c" stroke-width="4"/>
        <!-- Pillars -->
        <rect x="160" y="80" width="40" height="310" fill="#1c1917"/>
        <rect x="600" y="80" width="40" height="310" fill="#1c1917"/>
        <!-- Hearth & Fire -->
        <rect x="340" y="180" width="120" height="130" fill="#7f1d1d" stroke="#991b1b" stroke-width="4"/>
        <path d="M370,300 Q400,230 430,300 Z" fill="#f59e0b" filter="url(#glow)"/>
        <!-- Throne Dais -->
        <rect x="360" y="270" width="80" height="70" fill="#78350f" stroke="#d97706" stroke-width="3"/>
        <rect x="375" y="230" width="50" height="60" fill="#dc2626" stroke="#fbbf24" stroke-width="2"/>
        <!-- Banquet Table -->
        <polygon points="200,380 240,320 560,320 600,380" fill="#451a03" stroke="#78350f" stroke-width="4"/>
        <rect x="220" y="325" width="360" height="15" fill="#b91c1c"/>
      `
    },
    detail: {
      badge: 'CASTLE DETAILS',
      sub: 'Terraced Automated Farms & Animal Courtyard',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a1f11"/><stop offset="100%" stop-color="#14341b"/></linearGradient>`,
      art: `
        <!-- Farmland Tiers -->
        <rect x="120" y="180" width="560" height="190" fill="#3f2e18" stroke="#5c4324" stroke-width="3"/>
        <!-- Crops -->
        <rect x="140" y="190" width="520" height="40" fill="#84cc16"/>
        <rect x="140" y="240" width="520" height="40" fill="#eab308"/>
        <rect x="140" y="290" width="520" height="40" fill="#22c55e"/>
        <!-- Water Canal -->
        <rect x="380" y="180" width="40" height="190" fill="#0284c7" filter="url(#glow)"/>
        <!-- Animal Barn Stalls -->
        <rect x="140" y="80" width="220" height="90" fill="#451a03" stroke="#78350f" stroke-width="3"/>
        <polygon points="130,80 250,30 370,80" fill="#1e293b"/>
      `
    }
  },
  {
    base: 'cherry_blossom_pagoda',
    name: 'Cherry Blossom Zen Pagoda',
    exterior: {
      badge: 'JAPANESE TEMPLE',
      sub: '4-Tiered Pagoda with Flared Dragon Eaves',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2d1223"/><stop offset="100%" stop-color="#4a1936"/></linearGradient>`,
      art: `
        <!-- Torii Gate -->
        <rect x="140" y="240" width="15" height="140" fill="#b91c1c"/>
        <rect x="220" y="240" width="15" height="140" fill="#b91c1c"/>
        <rect x="125" y="235" width="125" height="14" fill="#991b1b"/>
        <rect x="115" y="220" width="145" height="16" rx="4" fill="#7f1d1d"/>
        <!-- Pagoda Tiers -->
        <!-- Tier 1 -->
        <rect x="370" y="280" width="140" height="100" fill="#fdf4ff" stroke="#4c0519" stroke-width="3"/>
        <path d="M320,290 Q440,265 560,290 L530,265 Q440,250 350,265 Z" fill="#881337" stroke="#fb7185" stroke-width="2"/>
        <!-- Tier 2 -->
        <rect x="390" y="200" width="100" height="70" fill="#fdf4ff" stroke="#4c0519" stroke-width="3"/>
        <path d="M345,210 Q440,190 535,210 L510,185 Q440,175 370,185 Z" fill="#881337" stroke="#fb7185" stroke-width="2"/>
        <!-- Tier 3 -->
        <rect x="405" y="135" width="70" height="55" fill="#fdf4ff" stroke="#4c0519" stroke-width="3"/>
        <path d="M370,145 Q440,130 510,145 L490,125 Q440,115 390,125 Z" fill="#881337" stroke="#fb7185" stroke-width="2"/>
        <!-- Spire & Finial -->
        <line x1="440" y1="120" x2="440" y2="50" stroke="#f59e0b" stroke-width="5"/>
        <circle cx="440" cy="50" r="8" fill="#fbbf24"/>
        <!-- Cherry Leaves Cloud -->
        <circle cx="620" cy="200" r="70" fill="#f472b6" opacity="0.8"/>
        <circle cx="670" cy="230" r="50" fill="#f43f5e" opacity="0.7"/>
        <circle cx="200" cy="160" r="60" fill="#f472b6" opacity="0.6"/>
      `
    },
    interior: {
      badge: 'SACRED SHRINE',
      sub: 'Golden Buddha Altar & Tatami Mats',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1c120c"/><stop offset="100%" stop-color="#3d2212"/></linearGradient>`,
      art: `
        <!-- Shoji Wall Screens -->
        <rect x="120" y="80" width="560" height="300" fill="#fffbeb" stroke="#78350f" stroke-width="6"/>
        <line x1="120" y1="180" x2="680" y2="180" stroke="#78350f" stroke-width="3"/>
        <line x1="120" y1="280" x2="680" y2="280" stroke="#78350f" stroke-width="3"/>
        <!-- Golden Altar -->
        <rect x="340" y="180" width="120" height="140" fill="#d97706" stroke="#f59e0b" stroke-width="4"/>
        <circle cx="400" cy="220" r="30" fill="#fbbf24" filter="url(#glow)"/>
        <!-- Red Silk Runner -->
        <polygon points="350,380 380,320 420,320 450,380" fill="#dc2626"/>
      `
    },
    detail: {
      badge: 'ZEN GARDEN',
      sub: 'Raked Sand, Bamboo & Bell Pavilion',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#141c14"/><stop offset="100%" stop-color="#243424"/></linearGradient>`,
      art: `
        <!-- Temple Bell Pavilion -->
        <rect x="250" y="100" width="300" height="240" fill="none" stroke="#78350f" stroke-width="8"/>
        <path d="M220,110 Q400,70 580,110" stroke="#991b1b" stroke-width="12" fill="none"/>
        <!-- Bronze Bell -->
        <path d="M370,160 Q370,240 360,260 H440 Q430,240 430,160 Z" fill="#d97706" stroke="#b45309" stroke-width="4"/>
        <!-- Bamboo stalks -->
        <line x1="160" y1="360" x2="160" y2="140" stroke="#84cc16" stroke-width="8"/>
        <line x1="190" y1="360" x2="190" y2="110" stroke="#65a30d" stroke-width="10"/>
      `
    }
  },
  {
    base: 'viking_longhouse',
    name: "Jarl's Great Viking Longhouse",
    exterior: {
      badge: 'VIKING MEAD HALL',
      sub: 'Timber-Framed Inverted Keel & Dragon Gables',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c1724"/><stop offset="100%" stop-color="#1a2e40"/></linearGradient>`,
      art: `
        <!-- Longhouse Steep Curved Roof -->
        <path d="M120,380 Q400,100 680,380 L620,380 Q400,160 180,380 Z" fill="#36220f" stroke="#543618" stroke-width="4"/>
        <!-- Front Gable Trusses -->
        <polygon points="260,380 400,180 540,380" fill="#1c1917" stroke="#44403c" stroke-width="4"/>
        <!-- Carved Dragon Head on Roof Peak -->
        <path d="M400,180 Q390,120 430,100 Q440,130 420,150 Z" fill="#78350f" stroke="#b45309" stroke-width="3"/>
        <!-- Timber Arched Entrance -->
        <rect x="360" y="270" width="80" height="110" fill="#292524" stroke="#78350f" stroke-width="4"/>
        <!-- Shields hung on walls -->
        <circle cx="290" cy="340" r="18" fill="#dc2626" stroke="#f59e0b" stroke-width="3"/>
        <circle cx="330" cy="340" r="18" fill="#2563eb" stroke="#f8fafc" stroke-width="3"/>
        <circle cx="470" cy="340" r="18" fill="#16a34a" stroke="#f59e0b" stroke-width="3"/>
        <circle cx="510" cy="340" r="18" fill="#dc2626" stroke="#1c1917" stroke-width="3"/>
      `
    },
    interior: {
      badge: 'MEAD HALL',
      sub: 'Central Sunken Fire Pit & Chieftain Throne',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e1005"/><stop offset="100%" stop-color="#361a07"/></linearGradient>`,
      art: `
        <!-- Long Hearth Fire Trench -->
        <rect x="320" y="280" width="160" height="70" fill="#44403c"/>
        <polygon points="350,310 400,230 450,310" fill="#f97316" filter="url(#glow)"/>
        <!-- Feasting Tables -->
        <rect x="140" y="260" width="130" height="90" fill="#78350f"/>
        <rect x="530" y="260" width="130" height="90" fill="#78350f"/>
        <!-- Jarl High Throne at End -->
        <rect x="365" y="160" width="70" height="90" fill="#451a03" stroke="#b45309" stroke-width="3"/>
        <!-- Trophy Banner -->
        <polygon points="380,90 420,90 420,150 400,165 380,150" fill="#991b1b"/>
      `
    },
    detail: {
      badge: 'VIKING DETAILS',
      sub: 'Mead Barrel Racks & Sleeping Lofts',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#14181f"/><stop offset="100%" stop-color="#222933"/></linearGradient>`,
      art: `
        <!-- Oak Mead Barrels -->
        <ellipse cx="240" cy="280" rx="40" ry="60" fill="#78350f" stroke="#1c1917" stroke-width="4"/>
        <ellipse cx="320" cy="280" rx="40" ry="60" fill="#78350f" stroke="#1c1917" stroke-width="4"/>
        <ellipse cx="280" cy="200" rx="40" ry="60" fill="#92400e" stroke="#1c1917" stroke-width="4"/>
        <!-- Weapons Chest -->
        <rect x="450" y="240" width="180" height="110" fill="#451a03" stroke="#b45309" stroke-width="5"/>
        <circle cx="540" cy="280" r="12" fill="#fbbf24"/>
      `
    }
  },
  {
    base: 'cozy_farmhouse_windmill',
    name: 'Rustic Farmstead & Windmill',
    exterior: {
      badge: 'SURVIVAL FARM',
      sub: 'A-Frame Cottage, Windmill Sails & Crops',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f2114"/><stop offset="100%" stop-color="#1d3d25"/></linearGradient>`,
      art: `
        <!-- Farmhouse -->
        <rect x="120" y="240" width="180" height="140" fill="#334155" stroke="#1e293b" stroke-width="3"/>
        <polygon points="100,240 210,120 320,240" fill="#451a03" stroke="#78350f" stroke-width="4"/>
        <!-- Smoking Chimney -->
        <rect x="260" y="100" width="30" height="80" fill="#991b1b"/>
        <circle cx="275" cy="80" r="14" fill="#94a3b8" opacity="0.6"/>
        <!-- Windmill Tower -->
        <polygon points="460,380 490,160 570,160 600,380" fill="#475569" stroke="#334155" stroke-width="4"/>
        <polygon points="475,160 530,100 585,160" fill="#78350f"/>
        <!-- Windmill Giant Sails (Cross) -->
        <line x1="530" y1="50" x2="530" y2="290" stroke="#78350f" stroke-width="8"/>
        <line x1="410" y1="170" x2="650" y2="170" stroke="#78350f" stroke-width="8"/>
        <rect x="535" y="60" width="30" height="80" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="535" y="200" width="30" height="80" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="420" y="175" width="80" height="30" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="560" y="175" width="80" height="30" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      `
    },
    interior: {
      badge: 'FARMHOUSE COTTAGE',
      sub: 'Country Kitchen & Cozy Attic Bedroom',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1f140a"/><stop offset="100%" stop-color="#3b2614"/></linearGradient>`,
      art: `
        <!-- Kitchen Stove & Smoker -->
        <rect x="140" y="240" width="100" height="120" fill="#475569" stroke="#1e293b" stroke-width="4"/>
        <path d="M170,300 Q190,260 210,300 Z" fill="#f97316"/>
        <!-- Country Dining Table -->
        <rect x="300" y="280" width="220" height="80" fill="#78350f" stroke="#b45309" stroke-width="3"/>
        <!-- Attic Loft Bed -->
        <rect x="440" y="120" width="180" height="70" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
        <rect x="440" y="120" width="50" height="70" fill="#f8fafc"/>
      `
    },
    detail: {
      badge: 'AGRICULTURE',
      sub: 'Irrigated Crops, Haystacks & Beehives',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0e1f0e"/><stop offset="100%" stop-color="#193819"/></linearGradient>`,
      art: `
        <!-- Golden Wheat Field -->
        <rect x="100" y="240" width="600" height="140" fill="#a16207"/>
        <line x1="120" y1="240" x2="120" y2="180" stroke="#facc15" stroke-width="6"/>
        <line x1="160" y1="240" x2="160" y2="170" stroke="#facc15" stroke-width="6"/>
        <line x1="200" y1="240" x2="200" y2="185" stroke="#facc15" stroke-width="6"/>
        <!-- Giant Haystack -->
        <rect x="420" y="200" width="140" height="120" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
        <line x1="420" y1="240" x2="560" y2="240" stroke="#991b1b" stroke-width="4"/>
        <!-- Beehive -->
        <rect x="280" y="220" width="70" height="70" fill="#d97706" stroke="#92400e" stroke-width="3"/>
      `
    }
  },
  {
    base: 'dwarven_mountain_forge',
    name: 'Deepslate Dwarven Forge',
    exterior: {
      badge: 'MOUNTAIN STRONGHOLD',
      sub: 'Colossal Vault Pillars & Magma Crucible',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f1118"/><stop offset="100%" stop-color="#1e2230"/></linearGradient>`,
      art: `
        <!-- Dwarven Pillars -->
        <rect x="160" y="80" width="80" height="300" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
        <rect x="560" y="80" width="80" height="300" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
        <!-- Molten Lava Waterfall Center -->
        <rect x="360" y="60" width="80" height="240" fill="#ef4444" filter="url(#glow)"/>
        <rect x="375" y="60" width="50" height="240" fill="#f59e0b"/>
        <!-- Cooling Basin -->
        <rect x="280" y="300" width="240" height="80" fill="#0f172a" stroke="#475569" stroke-width="4"/>
        <!-- Giant Forge Master Anvil -->
        <path d="M360,280 H440 V300 H420 V330 H380 V300 H360 Z" fill="#64748b" stroke="#334155" stroke-width="3"/>
      `
    },
    interior: {
      badge: 'TREASURY VAULT',
      sub: 'Diamond Pedestals & Gilded Blackstone',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a1208"/><stop offset="100%" stop-color="#2e1f0e"/></linearGradient>`,
      art: `
        <!-- Vault Archway -->
        <path d="M220,380 V200 Q400,120 580,200 V380 Z" fill="#0f172a" stroke="#d97706" stroke-width="6"/>
        <!-- Gold Blocks Pile -->
        <rect x="300" y="270" width="80" height="80" fill="#f59e0b" stroke="#fbbf24" stroke-width="3"/>
        <rect x="420" y="270" width="80" height="80" fill="#f59e0b" stroke="#fbbf24" stroke-width="3"/>
        <rect x="360" y="210" width="80" height="80" fill="#fbbf24" stroke="#fef08a" stroke-width="3"/>
        <!-- Diamond Inset -->
        <polygon points="400,140 430,170 400,200 370,170" fill="#06b6d4" filter="url(#glow)"/>
      `
    },
    detail: {
      badge: 'FORGE MECHANICS',
      sub: 'Twin Blast Furnaces & Smithing Arrays',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#180e0c"/><stop offset="100%" stop-color="#2d1612"/></linearGradient>`,
      art: `
        <!-- Dual Blast Furnaces -->
        <rect x="200" y="180" width="160" height="180" fill="#334155" stroke="#1e293b" stroke-width="5"/>
        <rect x="440" y="180" width="160" height="180" fill="#334155" stroke="#1e293b" stroke-width="5"/>
        <rect x="240" y="280" width="80" height="60" fill="#f97316" filter="url(#glow)"/>
        <rect x="480" y="280" width="80" height="60" fill="#f97316" filter="url(#glow)"/>
      `
    }
  },
  {
    base: 'nether_bastion_outpost',
    name: 'Nether Bastion & Outpost',
    exterior: {
      badge: 'NETHER FORTRESS',
      sub: 'Polished Blackstone & Molten Lava Moat',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#240c0c"/><stop offset="100%" stop-color="#3d1414"/></linearGradient>`,
      art: `
        <!-- Bastion Towers -->
        <rect x="140" y="120" width="130" height="260" fill="#18181b" stroke="#27272a" stroke-width="4"/>
        <rect x="530" y="120" width="130" height="260" fill="#18181b" stroke="#27272a" stroke-width="4"/>
        <!-- Fortified Bridge over Lava -->
        <rect x="270" y="260" width="260" height="50" fill="#27272a" stroke="#3f3f46" stroke-width="3"/>
        <rect x="100" y="320" width="600" height="70" fill="#ea580c" filter="url(#glow)"/>
        <!-- Nether Portal in Center -->
        <rect x="360" y="140" width="80" height="120" fill="#a855f7" stroke="#3b0764" stroke-width="6" filter="url(#glow)"/>
      `
    },
    interior: {
      badge: 'PIGLIN ARENA',
      sub: 'Bartering Platform & Automated Hoppers',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1c1106"/><stop offset="100%" stop-color="#331f0a"/></linearGradient>`,
      art: `
        <!-- Gold Pedestal -->
        <rect x="320" y="240" width="160" height="110" fill="#eab308" stroke="#ca8a04" stroke-width="5"/>
        <!-- Soul Fire Braziers -->
        <rect x="200" y="260" width="60" height="90" fill="#27272a"/>
        <polygon points="210,260 230,200 250,260" fill="#06b6d4" filter="url(#glow)"/>
        <rect x="540" y="260" width="60" height="90" fill="#27272a"/>
        <polygon points="550,260 570,200 590,260" fill="#06b6d4" filter="url(#glow)"/>
      `
    },
    detail: {
      badge: 'NETHER WART',
      sub: 'Soul Sand Terraces & Crimson Stem',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#240c17"/><stop offset="100%" stop-color="#3d1428"/></linearGradient>`,
      art: `
        <!-- Soul Sand Beds -->
        <rect x="150" y="240" width="500" height="120" fill="#451a03"/>
        <!-- Nether Wart Clusters -->
        <circle cx="220" cy="220" r="25" fill="#dc2626"/>
        <circle cx="320" cy="220" r="28" fill="#b91c1c"/>
        <circle cx="420" cy="220" r="25" fill="#dc2626"/>
        <circle cx="520" cy="220" r="28" fill="#b91c1c"/>
      `
    }
  },
  {
    base: 'desert_oasis_palace',
    name: 'Desert Oasis Palace & Bazaar',
    exterior: {
      badge: 'ARABIAN PALACE',
      sub: 'Sandstone Dome, Minarets & Reflection Pool',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e180d"/><stop offset="100%" stop-color="#382d19"/></linearGradient>`,
      art: `
        <!-- Central Great Dome -->
        <ellipse cx="400" cy="190" rx="120" ry="100" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
        <circle cx="400" cy="90" r="10" fill="#facc15"/>
        <!-- Minaret Towers -->
        <rect x="140" y="100" width="40" height="280" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
        <polygon points="130,100 160,50 190,100" fill="#eab308"/>
        <rect x="620" y="100" width="40" height="280" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
        <polygon points="610,100 640,50 670,100" fill="#eab308"/>
        <!-- Horseshoe Arch Gate -->
        <path d="M330,380 V270 Q400,210 470,270 V380 Z" fill="#0284c7" stroke="#ca8a04" stroke-width="5"/>
      `
    },
    interior: {
      badge: 'SULTAN DIVAN',
      sub: 'Silk Cushions, Fountains & Mosaic Floors',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#141724"/><stop offset="100%" stop-color="#242a42"/></linearGradient>`,
      art: `
        <!-- Turquoise Reflection Pool -->
        <rect x="200" y="240" width="400" height="120" fill="#0284c7" stroke="#38bdf8" stroke-width="4" filter="url(#glow)"/>
        <!-- Sultan Silk Divan -->
        <rect x="300" y="160" width="200" height="70" fill="#dc2626" stroke="#fbbf24" stroke-width="3"/>
        <!-- Palm Plant -->
        <rect x="140" y="200" width="20" height="140" fill="#78350f"/>
        <circle cx="150" cy="180" r="45" fill="#15803d"/>
      `
    },
    detail: {
      badge: 'SPICE BAZAAR',
      sub: 'Striped Canopies & Vibrant Market Stalls',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#24170c"/><stop offset="100%" stop-color="#3d2815"/></linearGradient>`,
      art: `
        <!-- Market Stalls -->
        <rect x="160" y="250" width="180" height="110" fill="#78350f"/>
        <polygon points="140,250 250,190 360,250" fill="#dc2626"/>
        <line x1="200" y1="218" x2="200" y2="250" stroke="#f8fafc" stroke-width="12"/>
        <line x1="300" y1="218" x2="300" y2="250" stroke="#f8fafc" stroke-width="12"/>
        <rect x="460" y="250" width="180" height="110" fill="#78350f"/>
        <polygon points="440,250 550,190 660,250" fill="#2563eb"/>
      `
    }
  },
  {
    base: 'modern_luxury_villa',
    name: 'Modern Luxury Cliffside Villa',
    exterior: {
      badge: 'CONTEMPORARY',
      sub: 'Cantilevered Concrete & Infinity Pool',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c1724"/><stop offset="100%" stop-color="#16293f"/></linearGradient>`,
      art: `
        <!-- Geometric Modern Volumes -->
        <rect x="140" y="200" width="300" height="160" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
        <rect x="260" y="120" width="340" height="130" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
        <!-- Panoramic Tinted Glass -->
        <rect x="280" y="140" width="280" height="90" fill="#38bdf8" opacity="0.7"/>
        <!-- Cantilevered Infinity Pool -->
        <rect x="460" y="260" width="220" height="80" fill="#0ea5e9" stroke="#38bdf8" stroke-width="3" filter="url(#glow)"/>
      `
    },
    interior: {
      badge: 'OPEN CONCEPT',
      sub: 'Sunken Living Room & Quartz Kitchen Island',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#171717"/><stop offset="100%" stop-color="#262626"/></linearGradient>`,
      art: `
        <!-- Kitchen Island -->
        <rect x="180" y="250" width="200" height="90" fill="#f8fafc" stroke="#e2e8f0" stroke-width="3"/>
        <!-- Linear Modern Fireplace -->
        <rect x="440" y="240" width="220" height="60" fill="#0a0a0a" stroke="#262626" stroke-width="4"/>
        <rect x="480" y="260" width="140" height="20" fill="#f97316" filter="url(#glow)"/>
      `
    },
    detail: {
      badge: 'MASTER SUITE',
      sub: 'Floating Oak Stairs & Private Balcony',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#111827"/><stop offset="100%" stop-color="#1f2937"/></linearGradient>`,
      art: `
        <!-- King Bed -->
        <rect x="260" y="200" width="280" height="140" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
        <rect x="260" y="200" width="70" height="140" fill="#cbd5e1"/>
        <!-- Balcony Glass Railing -->
        <line x1="100" y1="340" x2="700" y2="340" stroke="#38bdf8" stroke-width="6"/>
      `
    }
  },
  {
    base: 'steampunk_airship',
    name: 'Steampunk Sky-Skiff Airship',
    exterior: {
      badge: 'FLYING VESSEL',
      sub: 'Galleon Hull, Zeppelin Balloon & Engines',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#18130e"/><stop offset="100%" stop-color="#332417"/></linearGradient>`,
      art: `
        <!-- Giant Zeppelin Balloon -->
        <ellipse cx="400" cy="150" rx="260" ry="85" fill="#fef08a" stroke="#ca8a04" stroke-width="6"/>
        <line x1="140" y1="150" x2="660" y2="150" stroke="#eab308" stroke-width="8"/>
        <!-- Galleon Hull Below -->
        <path d="M260,310 Q400,360 540,310 L520,270 H280 Z" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <!-- Rigging Chains -->
        <line x1="280" y1="270" x2="300" y2="200" stroke="#94a3b8" stroke-width="3"/>
        <line x1="360" y1="270" x2="370" y2="210" stroke="#94a3b8" stroke-width="3"/>
        <line x1="440" y1="270" x2="430" y2="210" stroke="#94a3b8" stroke-width="3"/>
        <line x1="520" y1="270" x2="500" y2="200" stroke="#94a3b8" stroke-width="3"/>
        <!-- Side Steam Propeller -->
        <circle cx="550" cy="310" r="28" fill="#b45309"/>
        <line x1="550" y1="270" x2="550" y2="350" stroke="#f59e0b" stroke-width="6"/>
      `
    },
    interior: {
      badge: 'FLIGHT DECK',
      sub: 'Steering Helm & Broadside Cannons',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a140f"/><stop offset="100%" stop-color="#2d2116"/></linearGradient>`,
      art: `
        <!-- Steering Helm Wheel -->
        <circle cx="400" cy="220" r="45" fill="none" stroke="#b45309" stroke-width="8"/>
        <line x1="400" y1="160" x2="400" y2="280" stroke="#b45309" stroke-width="6"/>
        <line x1="340" y1="220" x2="460" y2="220" stroke="#b45309" stroke-width="6"/>
        <!-- Broadside Cannons -->
        <rect x="180" y="280" width="100" height="40" fill="#1e293b"/>
        <rect x="520" y="280" width="100" height="40" fill="#1e293b"/>
      `
    },
    detail: {
      badge: 'STEAM BOILER',
      sub: 'Coal Furnaces & Copper Piping',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#24140a"/><stop offset="100%" stop-color="#3d2110"/></linearGradient>`,
      art: `
        <!-- Copper Boiler Tank -->
        <rect x="280" y="180" width="240" height="150" rx="30" fill="#ea580c" stroke="#c2410c" stroke-width="5"/>
        <!-- Glowing Furnace Mouth -->
        <rect x="360" y="250" width="80" height="60" fill="#facc15" filter="url(#glow)"/>
      `
    }
  },
  {
    base: 'redstone_survival_vault',
    name: 'Redstone Mega-Storage Vault',
    exterior: {
      badge: 'REDSTONE VAULT',
      sub: '32-Column Chest Sorter & Water Pipeline',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>`,
      art: `
        <!-- Sorting Hall Chest Walls -->
        <rect x="160" y="140" width="80" height="220" fill="#b45309" stroke="#78350f" stroke-width="3"/>
        <rect x="560" y="140" width="80" height="220" fill="#b45309" stroke="#78350f" stroke-width="3"/>
        <!-- Item Hopper Pipes -->
        <rect x="130" y="140" width="30" height="220" fill="#475569"/>
        <rect x="640" y="140" width="30" height="220" fill="#475569"/>
        <!-- Central Water Stream Pipeline -->
        <rect x="340" y="280" width="120" height="80" fill="#0284c7" stroke="#38bdf8" stroke-width="3" filter="url(#glow)"/>
      `
    },
    interior: {
      badge: 'SUPER SMELTER',
      sub: '16-Furnace Auto-Minecart Array',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1c1106"/><stop offset="100%" stop-color="#331f0a"/></linearGradient>`,
      art: `
        <!-- Blast Furnace Array -->
        <rect x="220" y="180" width="360" height="140" fill="#334155" stroke="#1e293b" stroke-width="4"/>
        <!-- Hopper Line -->
        <rect x="200" y="150" width="400" height="30" fill="#64748b"/>
        <!-- Flaming Furnace Fire -->
        <rect x="260" y="240" width="50" height="40" fill="#f97316" filter="url(#glow)"/>
        <rect x="340" y="240" width="50" height="40" fill="#f97316" filter="url(#glow)"/>
        <rect x="420" y="240" width="50" height="40" fill="#f97316" filter="url(#glow)"/>
        <rect x="500" y="240" width="50" height="40" fill="#f97316" filter="url(#glow)"/>
      `
    },
    detail: {
      badge: 'ENCHANTING HUB',
      sub: 'Piston-Retractable Bookshelf Alcove',
      grad: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#130d24"/><stop offset="100%" stop-color="#241742"/></linearGradient>`,
      art: `
        <!-- Bookshelf Ring -->
        <rect x="220" y="160" width="360" height="180" fill="none" stroke="#78350f" stroke-width="18"/>
        <!-- Enchanting Table with Floating Rune -->
        <rect x="360" y="260" width="80" height="60" fill="#7f1d1d" stroke="#991b1b" stroke-width="4"/>
        <polygon points="400,200 420,230 400,250 380,230" fill="#06b6d4" filter="url(#glow)"/>
      `
    }
  }
];

console.log('Generating 30 rich SVG gallery images (3 per build)...');
for (const b of builds) {
  fs.writeFileSync(path.join(imgDir, `${b.base}_exterior.svg`), createSvg(b.exterior.grad, b.name, b.exterior.sub, b.exterior.badge, b.exterior.art));
  fs.writeFileSync(path.join(imgDir, `${b.base}_interior.svg`), createSvg(b.interior.grad, b.name, b.interior.sub, b.interior.badge, b.interior.art));
  fs.writeFileSync(path.join(imgDir, `${b.base}_detail.svg`), createSvg(b.detail.grad, b.name, b.detail.sub, b.detail.badge, b.detail.art));
  console.log(`✓ ${b.name} (3 SVGs created)`);
}
console.log('\nAll SVG galleries created successfully in assets/images/!');
