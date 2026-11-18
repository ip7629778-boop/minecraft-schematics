const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'assets', 'images', 'builds', 'build2');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function templateSvg(badge, title, subtitle, art, bgGrad) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    ${bgGrad}
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.6"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <linearGradient id="bannerGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#070a10" stop-opacity="0" />
      <stop offset="60%" stop-color="#070a10" stop-opacity="0.88" />
      <stop offset="100%" stop-color="#070a10" stop-opacity="0.98" />
    </linearGradient>
  </defs>
  
  <!-- Atmosphere Background -->
  <rect width="800" height="500" fill="url(#bg)" />
  
  <!-- Subtle Blueprint Architectural Grid -->
  <path d="M0,80 H800 M0,160 H800 M0,240 H800 M0,320 H800 M0,400 H800" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
  <path d="M80,0 V500 M160,0 V500 M240,0 V500 M320,0 V500 M400,0 V500 M480,0 V500 M560,0 V500 M640,0 V500 M720,0 V500" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
  
  <!-- Main Architectural Illustration -->
  <g filter="url(#shadow)">
    ${art}
  </g>
  
  <!-- Lower Information Vignette -->
  <rect y="380" width="800" height="120" fill="url(#bannerGrad)" />
  
  <!-- Category Badge -->
  <rect x="40" y="32" rx="6" width="165" height="28" fill="rgba(0,0,0,0.65)" stroke="#10b981" stroke-width="1.2"/>
  <text x="122" y="51" fill="#34d399" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="1">${badge}</text>
  
  <!-- Titles -->
  <text x="40" y="438" fill="#ffffff" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="0.5">${title}</text>
  <text x="40" y="466" fill="#94a3b8" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="500">${subtitle}</text>
</svg>`;
}

// 1. Exterior Front View
const exteriorSvg = templateSvg(
  'MEDIEVAL &amp; NORSE',
  'Medieval Village Blacksmith &amp; Armoury',
  'Open-Air Lava Crucible, Chimney Smoke &amp; Dual-Pitched Timber Gable',
  `
    <!-- Ground & Foundation Steps -->
    <polygon points="120,400 680,400 720,420 80,420" fill="#1e293b"/>
    <polygon points="100,390 700,390 680,400 120,400" fill="#334155"/>
    
    <!-- West Wing: Open Forge Pavilion (Left side) -->
    <!-- Forge Foundation -->
    <rect x="160" y="270" width="220" height="120" fill="#1f2937" stroke="#374151" stroke-width="3"/>
    
    <!-- Glowing Lava Crucible -->
    <rect x="220" y="320" width="80" height="40" rx="4" fill="#ff5722" filter="url(#glow)"/>
    <ellipse cx="260" cy="340" rx="36" ry="14" fill="#ffb74d" opacity="0.9"/>
    
    <!-- Iron Bars Gate in front of Lava -->
    <line x1="235" y1="315" x2="235" y2="365" stroke="#94a3b8" stroke-width="4"/>
    <line x1="250" y1="315" x2="250" y2="365" stroke="#94a3b8" stroke-width="4"/>
    <line x1="265" y1="315" x2="265" y2="365" stroke="#94a3b8" stroke-width="4"/>
    <line x1="280" y1="315" x2="280" y2="365" stroke="#94a3b8" stroke-width="4"/>
    <line x1="220" y1="340" x2="300" y2="340" stroke="#64748b" stroke-width="3"/>

    <!-- Blast Furnaces -->
    <rect x="180" y="310" width="35" height="45" fill="#374151" stroke="#4b5563" stroke-width="2"/>
    <circle cx="197" cy="335" r="8" fill="#f97316"/>
    <rect x="305" y="310" width="35" height="45" fill="#374151" stroke="#4b5563" stroke-width="2"/>
    <circle cx="322" cy="335" r="8" fill="#f97316"/>

    <!-- Anvil & Grindstone -->
    <polygon points="245,365 275,365 270,378 280,378 280,388 240,388 240,378 250,378" fill="#475569" stroke="#64748b" stroke-width="2"/>
    <rect x="345" y="355" width="25" height="30" rx="3" fill="#64748b"/>

    <!-- Heavy Stone Chimney rising from forge -->
    <rect x="235" y="100" width="55" height="190" fill="#334155" stroke="#475569" stroke-width="4"/>
    <rect x="230" y="90" width="65" height="15" fill="#1e293b"/>
    <!-- Chimney Smoke Column -->
    <ellipse cx="262" cy="70" rx="14" ry="10" fill="#94a3b8" opacity="0.6" filter="url(#glow)"/>
    <ellipse cx="270" cy="45" rx="20" ry="14" fill="#cbd5e1" opacity="0.4" filter="url(#glow)"/>
    <ellipse cx="280" cy="20" rx="28" ry="18" fill="#e2e8f0" opacity="0.25" filter="url(#glow)"/>

    <!-- Forge Timber Canopy Posts & Rafters -->
    <rect x="160" y="240" width="16" height="150" fill="#3d2817" stroke="#22170f" stroke-width="2"/>
    <rect x="364" y="240" width="16" height="150" fill="#3d2817" stroke="#22170f" stroke-width="2"/>
    <polygon points="140,240 385,190 385,210 140,260" fill="#292524" stroke="#44403c" stroke-width="2"/>

    <!-- East Wing: Armoury & 2-Story Living Quarters (Right side) -->
    <!-- Ground Floor Stone Brick Wall -->
    <rect x="380" y="270" width="280" height="120" fill="#334155" stroke="#475569" stroke-width="3"/>
    <!-- Upper Floor Timber & Plaster (Calcite/White Terracotta) -->
    <rect x="380" y="180" width="280" height="95" fill="#f1f5f9" stroke="#1e293b" stroke-width="3"/>

    <!-- Timber Corner Piers & Framing -->
    <rect x="380" y="180" width="18" height="210" fill="#3d2817"/>
    <rect x="510" y="180" width="16" height="210" fill="#3d2817"/>
    <rect x="642" y="180" width="18" height="210" fill="#3d2817"/>
    <rect x="380" y="265" width="280" height="14" fill="#2d1c10"/>

    <!-- Armoury Front Door (Oak Door + Stone Arch) -->
    <rect x="430" y="305" width="38" height="85" rx="3" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <rect x="435" y="315" width="12" height="25" fill="#92400e"/>
    <rect x="450" y="315" width="12" height="25" fill="#92400e"/>
    <circle cx="436" cy="355" r="3" fill="#facc15"/>
    <polygon points="425,305 450,290 475,305" fill="#1e293b"/>

    <!-- Windows with Glass Panes & Shutters -->
    <rect x="545" y="310" width="40" height="45" fill="#38bdf8" stroke="#0284c7" stroke-width="2" opacity="0.8"/>
    <line x1="565" y1="310" x2="565" y2="355" stroke="#1e293b" stroke-width="2"/>
    <line x1="545" y1="332" x2="585" y2="332" stroke="#1e293b" stroke-width="2"/>
    <!-- Window Shutters -->
    <rect x="530" y="310" width="15" height="45" fill="#78350f"/>
    <rect x="585" y="310" width="15" height="45" fill="#78350f"/>

    <!-- Upper Dormer Window -->
    <rect x="500" y="195" width="44" height="48" fill="#38bdf8" stroke="#0284c7" stroke-width="2" opacity="0.85"/>
    <line x1="522" y1="195" x2="522" y2="243" stroke="#1e293b" stroke-width="2"/>
    <line x1="500" y1="219" x2="544" y2="219" stroke="#1e293b" stroke-width="2"/>
    <rect x="488" y="195" width="12" height="48" fill="#78350f"/>
    <rect x="544" y="195" width="12" height="48" fill="#78350f"/>

    <!-- Steep Main Gable Roof -->
    <polygon points="360,195 520,70 680,195" fill="#1c1917" stroke="#292524" stroke-width="4"/>
    <!-- Deepslate Tile Roof Trim / Bargeboard -->
    <polygon points="350,205 520,60 690,205 675,205 520,75 365,205" fill="#0f172a" stroke="#334155" stroke-width="2"/>
    
    <!-- Hanging Porch Lantern -->
    <line x1="410" y1="290" x2="410" y2="310" stroke="#64748b" stroke-width="2"/>
    <rect x="403" y="310" width="14" height="20" rx="3" fill="#f59e0b" filter="url(#glow)"/>
  `,
  `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a101d"/><stop offset="50%" stop-color="#141c2e"/><stop offset="100%" stop-color="#1c2538"/></linearGradient>`
);

// 2. Interior Forge Close-Up
const interiorForgeSvg = templateSvg(
  'FORGE &amp; SMELTERY',
  'Master Forge Hearth &amp; Smelting Workstation',
  'Molten Lava Crucible, Blast Furnaces, Anvil, Water Trough &amp; Iron Tooling',
  `
    <!-- Forge Floor & Workshop Walls -->
    <rect x="100" y="80" width="600" height="310" fill="#1e293b" stroke="#334155" stroke-width="4"/>
    
    <!-- Stone Brick Texture Backdrop -->
    <path d="M100,140 H700 M100,200 H700 M100,260 H700 M100,320 H700" stroke="rgba(255,255,255,0.05)" stroke-width="2"/>
    
    <!-- Central Forge Hearth -->
    <rect x="260" y="160" width="280" height="230" fill="#0f172a" stroke="#334155" stroke-width="4"/>
    
    <!-- Molten Lava Crucible Core with fiery radiant glow -->
    <rect x="320" y="240" width="160" height="110" rx="8" fill="#ea580c" filter="url(#glow)"/>
    <ellipse cx="400" cy="295" rx="70" ry="38" fill="#fbbf24" opacity="0.95"/>
    <ellipse cx="400" cy="290" rx="45" ry="20" fill="#fef08a"/>

    <!-- Iron Safety Grate / Bars -->
    <line x1="340" y1="230" x2="340" y2="360" stroke="#cbd5e1" stroke-width="5"/>
    <line x1="370" y1="230" x2="370" y2="360" stroke="#cbd5e1" stroke-width="5"/>
    <line x1="400" y1="230" x2="400" y2="360" stroke="#cbd5e1" stroke-width="5"/>
    <line x1="430" y1="230" x2="430" y2="360" stroke="#cbd5e1" stroke-width="5"/>
    <line x1="460" y1="230" x2="460" y2="360" stroke="#cbd5e1" stroke-width="5"/>
    <line x1="320" y1="290" x2="480" y2="290" stroke="#64748b" stroke-width="4"/>

    <!-- Heavy Anvil on Log Stand -->
    <rect x="150" y="320" width="50" height="70" fill="#3d2817"/>
    <polygon points="140,290 210,290 195,305 210,305 210,320 140,320 140,305 155,305" fill="#475569" stroke="#64748b" stroke-width="2"/>
    <ellipse cx="175" cy="292" rx="30" ry="5" fill="#94a3b8"/>

    <!-- Quenching Water Cauldron -->
    <rect x="600" y="310" width="60" height="70" rx="4" fill="#334155" stroke="#475569" stroke-width="3"/>
    <ellipse cx="630" cy="315" rx="24" ry="10" fill="#0284c7" filter="url(#glow)"/>
    <!-- Tripwire Hook Faucet above Cauldron -->
    <line x1="630" y1="270" x2="630" y2="295" stroke="#64748b" stroke-width="4"/>
    <line x1="630" y1="295" x2="620" y2="295" stroke="#64748b" stroke-width="4"/>

    <!-- Tool Racks & Smithing Weapons -->
    <rect x="130" y="160" width="80" height="60" rx="4" fill="#292524" stroke="#44403c" stroke-width="2"/>
    <!-- Sword Silhouette -->
    <line x1="150" y1="170" x2="190" y2="210" stroke="#38bdf8" stroke-width="3"/>
    <line x1="165" y1="175" x2="155" y2="185" stroke="#e2e8f0" stroke-width="2"/>
    <!-- Hammer Silhouette -->
    <line x1="180" y1="170" x2="180" y2="210" stroke="#94a3b8" stroke-width="3"/>
    <rect x="172" y="170" width="16" height="12" fill="#64748b"/>

    <!-- Ingot Barrels -->
    <rect x="550" y="320" width="40" height="65" rx="6" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <line x1="550" y1="335" x2="590" y2="335" stroke="#000" stroke-width="2"/>
    <line x1="550" y1="365" x2="590" y2="365" stroke="#000" stroke-width="2"/>

    <!-- Warm Glowing Lanterns -->
    <line x1="280" y1="80" x2="280" y2="130" stroke="#475569" stroke-width="2"/>
    <rect x="272" y="130" width="16" height="24" rx="3" fill="#f59e0b" filter="url(#glow)"/>

    <line x1="520" y1="80" x2="520" y2="130" stroke="#475569" stroke-width="2"/>
    <rect x="512" y="130" width="16" height="24" rx="3" fill="#f59e0b" filter="url(#glow)"/>
  `,
  `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#180e07"/><stop offset="50%" stop-color="#2a160a"/><stop offset="100%" stop-color="#3d1d0c"/></linearGradient>`
);

// 3. Interior Loft Living Quarters View
const interiorLoftSvg = templateSvg(
  'RESIDENTIAL LOFT',
  'Blacksmith Loft Residence &amp; Study Alcove',
  'Supported Bunk Bed, Nightstand Lantern, Chiseled Bookshelf &amp; Timber Rafters',
  `
    <!-- Sloping Timber Loft Roof Interior -->
    <polygon points="100,390 100,120 400,60 700,120 700,390" fill="#292524" stroke="#44403c" stroke-width="4"/>
    
    <!-- Exposed High Timber Rafters -->
    <line x1="400" y1="60" x2="100" y2="280" stroke="#1c1917" stroke-width="12"/>
    <line x1="400" y1="60" x2="700" y2="280" stroke="#1c1917" stroke-width="12"/>
    <line x1="220" y1="180" x2="580" y2="180" stroke="#3d2817" stroke-width="8"/>

    <!-- Wood Plank Flooring -->
    <rect x="100" y="350" width="600" height="40" fill="#78350f" stroke="#451a03" stroke-width="2"/>

    <!-- Blacksmith Red Bed with Oak Frame -->
    <rect x="140" y="290" width="140" height="60" rx="4" fill="#78350f"/>
    <!-- Pillow -->
    <rect x="150" y="295" width="30" height="50" rx="3" fill="#f1f5f9"/>
    <!-- Red Wool Blanket -->
    <rect x="180" y="295" width="95" height="50" rx="2" fill="#dc2626"/>

    <!-- Bedside Nightstand & Lantern -->
    <rect x="290" y="310" width="40" height="40" rx="4" fill="#451a03"/>
    <rect x="302" y="285" width="16" height="24" rx="3" fill="#f59e0b" filter="url(#glow)"/>

    <!-- Dormer Window in Background with Sunset View -->
    <rect x="360" y="150" width="100" height="110" rx="6" fill="#f97316" stroke="#451a03" stroke-width="4" opacity="0.9"/>
    <rect x="370" y="160" width="80" height="90" fill="#fdba74" filter="url(#glow)"/>
    <line x1="410" y1="150" x2="410" y2="260" stroke="#451a03" stroke-width="3"/>
    <line x1="360" y1="205" x2="460" y2="205" stroke="#451a03" stroke-width="3"/>

    <!-- Study Desk, Chair & Bookshelf -->
    <rect x="520" y="270" width="80" height="15" fill="#a16207"/>
    <line x1="530" y1="285" x2="530" y2="350" stroke="#78350f" stroke-width="6"/>
    <line x1="590" y1="285" x2="590" y2="350" stroke="#78350f" stroke-width="6"/>
    
    <!-- Chiseled Bookshelf -->
    <rect x="610" y="230" width="70" height="120" fill="#451a03" stroke="#292524" stroke-width="3"/>
    <rect x="618" y="240" width="22" height="30" fill="#3b82f6"/>
    <rect x="644" y="240" width="28" height="30" fill="#ef4444"/>
    <rect x="618" y="280" width="30" height="30" fill="#10b981"/>
    <rect x="652" y="280" width="20" height="30" fill="#f59e0b"/>

    <!-- Potted Plant on Desk -->
    <rect x="545" y="255" width="14" height="15" fill="#b45309"/>
    <circle cx="552" cy="245" r="8" fill="#15803d"/>

    <!-- Hanging Brass Chandelier from Center Collar Beam -->
    <line x1="400" y1="180" x2="400" y2="220" stroke="#94a3b8" stroke-width="3"/>
    <line x1="370" y1="220" x2="430" y2="220" stroke="#78350f" stroke-width="4"/>
    <rect x="365" y="222" width="12" height="18" rx="2" fill="#fbbf24" filter="url(#glow)"/>
    <rect x="423" y="222" width="12" height="18" rx="2" fill="#fbbf24" filter="url(#glow)"/>
  `,
  `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0e1726"/><stop offset="50%" stop-color="#1e293b"/><stop offset="100%" stop-color="#2d3748"/></linearGradient>`
);

fs.writeFileSync(path.join(outDir, 'exterior_front.svg'), exteriorSvg);
fs.writeFileSync(path.join(outDir, 'interior_ground.svg'), interiorForgeSvg);
fs.writeFileSync(path.join(outDir, 'interior_loft.svg'), interiorLoftSvg);

// Also copy/symlink to .png filenames or keep as .svg so any reference resolves!
fs.writeFileSync(path.join(outDir, 'exterior_front.png'), exteriorSvg);
fs.writeFileSync(path.join(outDir, 'interior_ground.png'), interiorForgeSvg);
fs.writeFileSync(path.join(outDir, 'interior_loft.png'), interiorLoftSvg);

console.log('Successfully generated Build #2 SVG galleries in:', outDir);
