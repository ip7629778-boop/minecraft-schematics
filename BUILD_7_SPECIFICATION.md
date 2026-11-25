# MineVault Specification: Build #7 — Medieval Alchemist Manor & Botanical Estate
> **Classification:** Tier 1 — Remixed Master Medieval Fantasy Manor & Alchemical Botanical Retreat  
> **Original Blueprint Source:** Survival Cottage 2 | **Remix & Engineering:** MineVault Studio  
> **Target Edition:** Minecraft Java Edition 1.20 - 1.21+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Programmatic remix (Option 2) transforming an authentic master survival cottage blueprint into an opulent Medieval Alchemist Manor & Botanical Estate. Features an imposing octagonal stone garden gazebo, steep multi-tier Tudor timber gables, a 32-block smoking stone chimney, enchanting alcoves, chiseled book libraries, brewing workshops, and 100% vanilla 1.20-1.21+ compatibility with gravity-safe calcite plaster infill.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $23$ blocks
- **Height ($Y$):** $32$ blocks
- **Length ($Z$):** $27$ blocks
- **Total Non-Air Blocks:** $5,505$ blocks across $291$ palette states
- **Tile Entities:** $60$ functional workstations, double-chests, barrels, chiseled bookshelves, beehives, brewing stations, and hearth campfires
- **Primary Footprint Geometry:** Multi-tier Medieval Estate with Octagonal Courtyard Pavilion
  - Ground floor alchemical laboratory and living hearth quarters
  - Symmetrical front octagonal gazebo with conical deepslate roof
  - Second-floor enchanting study, botanical specimen storage, and sleeping loft
  - 32-block tall masonry flue with active campfire smoke plume
  - Integrated hillside retaining terraces with wheat, carrots, potatoes, and 12 beehives

```
Y=25..32 [ Stone Chimney Spire, Iron Bars Cap & Rising Smoke Plume ]
Y=20..24 [ High Ridge Deepslate Tile Gables & Attic Dormers ]
Y=14..19 [ Upper Floor Enchanting Quarters, Bedroom Loft & Timber Framing ]
Y=9..13  [ Second Floor Overhangs, Calcite Plaster Infill & Window Sills ]
Y=4..8   [ Ground Floor Alchemical Lab, Hearth Fireplace & Gazebo Conical Roof ]
Y=1..3   [ Ground Terrace Gardens, Farmland, Water Channels & Stone Masonry ]
Y=0      [ Solid Heavy Stone & Deepslate Retaining Substrate ]
```

---

## 2. Authentic Architectural Features & Interior Zoning

### Zone 1: The Octagonal Garden Pavilion & Botanical Grounds
- **Octagonal Stone Gazebo:** Prominently situated at the front entrance, featuring a cobblestone/andesite balustrade, spruce fence colonnade, and an 8-sided conical deepslate tile roof illuminated with warm hanging lanterns.
- **Terraced Agronomy:** Surrounding the estate are terraced crop fields irrigated by clean water channels, planted with wheat, carrots, and potatoes, bordered by composter stations and 12 active beehives.
- **Botanical Landscaping:** Decorated with flowering azalea bushes, blue orchids, allium, rose bushes, and climbing vines.

### Zone 2: Tudor Timber-Framing & Calcite Plaster
- **Stripped Dark Oak Timber Skeleton:** $608$ stripped dark oak beams forming authentic vertical, horizontal, and diagonal braces.
- **Gravity-Safe Calcite Walls:** Replaced fragile falling sand with solid calcite and smooth sandstone, delivering high-contrast, authentic medieval wattle-and-daub plaster that will never collapse.
- **Gothic Steep-Pitch Roof:** Over $600$ combined deepslate tiles, cobbled deepslate, and dark oak stairs engineered into multi-gabled, steep-pitched rooflines with dormer window alcoves.

### Zone 3: Alchemical Workshop & Living Quarters
- **Alchemical Laboratory:** Fully equipped with potion brewing apparatus, water cauldrons, ingredient barrels, cartography tables, and smithing amenities.
- **Enchanting Alcove:** Complete with enchanting table surrounded by chiseled bookshelves stocked with arcane knowledge.
- **Master Hearth:** Authentic stone fireplace housing a lit campfire whose smoke vents up through the internal stone chimney flue and billows out above the roofline.

---

## 3. Verified File Deployments

- **Sponge V2 (`.schem`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\medieval_alchemist_manor.schem` ($8.3$ KB)
  - `downloads/medieval_alchemist_manor.schem` ($8.3$ KB)
- **Litematica (`.litematic`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\medieval_alchemist_manor.litematic` ($9.8$ KB, GZIP compressed, Version 7)
  - `downloads/medieval_alchemist_manor.litematic` ($9.8$ KB, GZIP compressed, Version 7)

### Verified In-Game Shader Screenshots (1080p)
1. **Exterior Front Elevation:** `assets/images/builds/build7/exterior_master_front.png` — Steep multi-tier timber gables, porch entrance bell, flower beds, terraced wheat farm, and smoking chimney.
2. **Alchemical Enchanting Study:** `assets/images/builds/build7/interior_enchanting_study.png` — Enchanting table with open spellbooks, floor-to-ceiling garden windows, arcane bookshelves, and hanging lanterns.
3. **Master Bedroom Loft:** `assets/images/builds/build7/interior_bedroom_loft.png` — Wooden double bed, side tables with potted flowers, storage shelves, and glass walkout balcony door.
4. **Living Quarters & Cartography Desk:** `assets/images/builds/build7/interior_library_hearth.png` — Chiseled bookshelves, cartography desk with map and candle, stairwell, and hall to living hearth.

---

## 4. Minecraft In-Game Loading Guide

### Option A: WorldEdit (Forge / Fabric / Paper / Sponge)
1. The schematic is already placed in your active Minecraft folder.
2. Select an open ground plot ($30 \times 35$ blocks recommended).
3. Run command:
   ```mcfunction
   //schem load medieval_alchemist_manor
   //paste
   ```
4. If checking alignment before committing:
   ```mcfunction
   //paste -s
   ```

### Option B: Litematica (Fabric)
1. In-game, press `M` &rarr; **Load Schematics**.
2. Select `medieval_alchemist_manor.litematic` and click **Load Schematic**.
3. Align the holographic projection on ground level and paste into your world.
