# MineVault Specification: Build #5 — Enchanted Fantasy Forest Manor & Estate
> **Classification:** Tier 1 — Woodland Megabuild & Master Fantasy Estate  
> **Original Author:** istroberi / MineVault Studio  
> **Target Edition:** Minecraft Java Edition 1.20 - 1.21+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Handcrafted woodland fantasy mega-architecture featuring triple-gabled steep rooflines, weathered stone brick archways, a central observation belfry spire, tinted-glass botanical solarium greenhouse, and an immense 3-story fully-furnished interior.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $58$ blocks
- **Height ($Y$):** $43$ blocks
- **Length ($Z$):** $54$ blocks
- **Total Non-Air Blocks:** $10,403$ blocks across $217$ palette states
- **Tile Entities:** $517$ functional containers, workstations, brewing stands, beds, and decorative details (over $90$ labeled chests)
- **Primary Footprint Geometry:** Asymmetrical Multi-Wing Fantasy Megastructure
  - Central 3-story Great Living Hall with soaring timber rafters
  - East Wing: Tinted glass botanical greenhouse conservatory & herbal alchemy laboratory
  - West Wing: Master residential chambers, sleeping lofts, and scholar library
  - Ground Level: Weathered stone brick cellars, storage vaults, and podzol garden apron

```
Y=38..43 [ Central Belfry Spire, Weathered Oak Finials & Chimney Flues ]
Y=30..37 [ Steep Triple-Gable Rooflines, Deepslate Tile Ridges & Dormer Windows ]
Y=22..29 [ Third Floor Attic Lofts, Living Chambers & High Timber Rafters ]
Y=14..21 [ Second Floor Great Hall, Mezzanine Balconies & Library Nooks ]
Y=6..13  [ First Floor Hearth Living Room, Kitchen, Botanical Greenhouse Solarium ]
Y=1..5   [ Ground Level Stone Masonry Cellars, Vaults, Podzol Forest Terrain ]
Y=0      [ Foundation Base Plate & Forest Undergrowth ]
```

---

## 2. Authentic Architectural Features & Interior Zoning

### Zone 1: Exterior Steep Gables & Botanical Solarium
- **Triple-Gabled Fantasy Silhouette:** Majestic steep-pitched roofs built from $500$ Deepslate Tiles and dark oak overhangs draped with wild climbing flora.
- **Botanical Greenhouse Conservatory:** Framed with $165$ Tinted Glass blocks, housing elevated planter beds, potion brewing stands, and rare botanical specimens.
- **Living Forest Hillside:** Naturally integrated with $1,536$ Podzol, $431$ Grass Blocks, rooted dirt, and wild ferns flowing down from the foundation walls.

### Zone 2: Grand Hearth Living Hall (First & Second Floor)
- **Exposed Post-and-Beam Timbering:** Supported by nearly $2,000$ Stripped Spruce Wood blocks and deep arched trusses.
- **Beehive Inset Parquet Flooring:** $135$ decorative beehives arranged to create an intricate, warm architectural parquetry floor.
- **Monumental Stone Hearth:** Multi-story stone brick fireplace with smoke flue extending through all three floors.

### Zone 3: Storage Vaults & Residential Lofts
- **Massive Survival Storage:** Over $90$ storage chests organized across dedicated storage pantries, cellars, and craft rooms.
- **Master Sleeping Chambers:** Cozy canopy beds, bedside lanterns, chiseled bookshelves, and quiet reading alcoves.
- **Herbal Alchemy Lab:** Complete brewing setups with cauldrons, ingredient barrels, and drying herb racks.

---

## 3. Verified File Deployments

- **Sponge V2 (`.schem`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\enchanted_forest_manor.schem` ($236.5$ KB)
  - `downloads/enchanted_forest_manor.schem` ($236.5$ KB)
- **Litematica (`.litematic`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\enchanted_forest_manor.litematic` ($17.4$ KB)
  - `downloads/enchanted_forest_manor.litematic` ($17.4$ KB)

---

## 4. Minecraft In-Game Loading Guide

### Option A: WorldEdit (Forge / Fabric / Paper / Sponge)
1. The schematic is ready in your schematics directory.
2. Select a spacious open clearing ($65 \times 65$ blocks recommended).
3. Run command:
   ```mcfunction
   //schem load enchanted_forest_manor
   //paste
   ```
4. If you wish to preview the paste boundary first:
   ```mcfunction
   //paste -s
   ```

### Option B: Litematica (Fabric)
1. In-game, press `M` &rarr; **Load Schematics**.
2. Select `enchanted_forest_manor.litematic` and click **Load Schematic**.
3. Use the Litematica tool item (stick) to align the bounding box and paste into your world.
