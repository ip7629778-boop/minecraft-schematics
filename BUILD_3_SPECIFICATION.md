# MineVault Specification: Build #3 — Traditional Japanese Minka Estate (Master Zen Edition)
> **Classification:** Tier 1 — Master Oriental & Zen Estate  
> **Original Author:** ItsBuddyKun / MineVault Studio  
> **Target Edition:** Minecraft Java Edition 1.20 - 1.21+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Authentic handcrafted Japanese minka architecture, sweeping multi-tiered Irimoya (hip-and-gable) roofs with deepslate tiles, delicate shoji lattice partitions, wraparound engawa timber verandas, concealed soft lighting, and fully zoned living pavilions.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $37$ blocks
- **Height ($Y$):** $21$ blocks
- **Length ($Z$):** $34$ blocks
- **Total Non-Air Blocks:** $4,188$ blocks across $190$ palette states
- **Tile Entities:** $188$ functional stations, containers, and decorative signs
- **Primary Footprint Geometry:** Asymmetrical Japanese Compound
  - Central living and reception pavilion (Minka Hall)
  - Perimeter timber veranda (*Engawa*) with sliding lattice doors
  - Private tea lounge, study, and sleeping quarters (*Zashiki*)
  - Stone-paved forecourt with tranquil bamboo garden (*Niwa*)

```
Y=20..21 [ Upper Ridge Crest, Onigawara Tile Caps & Ridge Tile Beams ]
Y=16..19 [ Upper Tier Irimoya Gable Pediments, Dark Oak Timber Bracing ]
Y=12..15 [ Sweeping Upturned Eaves (Deepslate Tile Slabs & Dark Oak Trusses) ]
Y=8..11  [ Upper Gallery Rafters, Hanging Lantern Array & Shoji Transoms ]
Y=4..7   [ Main Living Hall, Tatami Lounges, Bookshelf Study, Bedroom Alcoves ]
Y=2..3   [ Raised Engawa Timber Veranda Decking & Sliding Shoji Screen Partitions ]
Y=0..1   [ Stone Masonry Foundation Stilt Piers, Stepping Paths & Zen Garden Ground ]
```

---

## 2. Authentic Architectural Features & Interior Zoning

### Zone 1: Exterior Engawa & Irimoya Roofline
- **Tiered Irimoya Roof:** Handcrafted dual-tier hip-and-gable roof constructed from $630$ Deepslate Tile Slabs and $285$ Deepslate Tiles, featuring sweeping curves, upturned eaves, and dark oak timber eaves.
- **Wraparound Engawa:** Raised polished spruce timber veranda running along the outer perimeter, bridging indoor and outdoor spaces.
- **Shoji Screen Partitions:** Crafted using over $440$ spruce and dark oak trapdoors, white wool, and dark oak fence gates simulating authentic Japanese sliding paper lattice doors.

### Zone 2: Central Living Hall & Tea Lounge (*Chanoma*)
- **Tatami-Textured Seating:** Inset composter and wool floors mimicking traditional rush mat tatami patterns.
- **Ambient Concealed Illumination:** $24$ concealed glowstone light blocks beneath decking paired with $51$ hanging lanterns creating soft, glare-free indirect warmth.
- **Low Tea Tables & Sitting Mats:** Styled with dark oak slabs, red and white carpet mats, and ikebana-style flower accents.

### Zone 3: Scholar Study & Private Quarters (*Shoin & Nando*)
- **Scroll Library:** Chiseled bookshelves and standard bookshelves storing enchanted scrolls and records.
- **Bedding Nooks:** $4$ traditional sleeping arrangements with bedside chests and privacy screens.
- **Survival Storage & Alchemy:** $52$ storage barrels and $7$ chests organized throughout the house, plus an indoor herbal and potion workstation.

---

## 3. Verified File Deployments

- **Sponge V2 (`.schem`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\traditional_japanese_minka_estate.schem` ($78.9$ KB)
  - `downloads/traditional_japanese_minka_estate.schem` ($78.9$ KB)
- **Litematica (`.litematic`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\traditional_japanese_minka_estate.litematic` ($7.3$ KB)
  - `downloads/traditional_japanese_minka_estate.litematic` ($7.3$ KB)

---

## 4. Minecraft In-Game Loading Guide

### Option A: WorldEdit (Forge / Fabric / Paper / Sponge)
1. Place the file in your schematics folder (already completed automatically).
2. Stand in an open flat area ($40 \times 40$ clearance recommended).
3. Run command:
   ```mcfunction
   //schem load traditional_japanese_minka_estate
   //paste
   ```
4. If you want to preview the paste position before committing:
   ```mcfunction
   //paste -s
   ```

### Option B: Litematica (Fabric)
1. In-game, press `M` (default Litematica menu).
2. Click **Load Schematics**.
3. Select `traditional_japanese_minka_estate.litematic` and click **Load Schematic**.
4. Position the holographic projection with `Tool Item` (default: stick) and use **Paste Schematic into World** in Creative, or follow the 3D ghost layer-by-layer in Survival.
