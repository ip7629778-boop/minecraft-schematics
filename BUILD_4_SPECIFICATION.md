# MineVault Specification: Build #4 — Minimalist Modern House & Pool Villa
> **Classification:** Tier 1 — Luxury Contemporary & Modern Villa  
> **Original Author:** Immortal_Turk / MineVault Studio  
> **Target Edition:** Minecraft Java Edition 1.20 - 1.21+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Modernist minimalist architecture featuring bold cantilevered concrete forms, floor-to-ceiling panoramic glass sightlines, natural horizontal timber siding, manicured rooftop gardens, and an integrated private swimming pool.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $32$ blocks
- **Height ($Y$):** $32$ blocks
- **Length ($Z$):** $32$ blocks
- **Total Non-Air Blocks:** $3,155$ blocks across $81$ palette states
- **Tile Entities:** $16$ functional stations, beds, storage containers, and decorated ceramic pots
- **Primary Footprint Geometry:** Asymmetrical Multi-Level Modernist Villa
  - Cantilevered upper residential box with spruce panel accents
  - Sunken luxury swimming pool with prismarine floor tiles
  - Polished andesite ground terrace and outdoor sunbathing deck
  - Manicured rooftop garden with flowering azalea planters and glass balustrades

```
Y=24..31 [ Rooftop Terrace, Glass Balustrades & Flowering Azalea Planter Boxes ]
Y=16..23 [ Cantilevered Upper Master Bedroom Suite, Picture Windows & Timber Siding ]
Y=10..15 [ Architectural Concrete Overhang Eaves & Recessed LED Strip Lighting ]
Y=5..9   [ Ground Floor Open Living Lounge, Designer Kitchen Bar & Hardwood Flooring ]
Y=2..4   [ Polished Andesite Patio Decking, Sunken Prismarine Swimming Pool ]
Y=0..1   [ Clean Foundation Substrate, Surrounding Lawn & Landscaping Apron ]
```

---

## 2. Authentic Architectural Features & Interior Zoning

### Zone 1: Cantilevered Concrete Facade & Exterior Patio
- **Dual Concrete Contrast:** Heavy geometric interplay between $404$ Gray Concrete blocks and $84$ White Concrete blocks creating floating cantilevered overhangs.
- **Panoramic Glass Curtain Walls:** Over $160$ glass panes (both clear and gray-tinted) delivering clean sightlines out to the pool and surrounding horizon.
- **Sunken Pool & Water Features:** $126$ source water blocks framed with polished andesite borders and prismarine tiled basin flooring.

### Zone 2: Ground-Level Open-Concept Lounge & Kitchen
- **Hardwood Timber Flooring:** $533$ Spruce Planks creating a warm, organic contrast against the modern concrete walls.
- **Designer Accents:** Decorated ceramic pots, mangrove stairs styled as modern lounge seating, and vibrant red carpet runners.
- **Clean Storage:** Integrated storage barrels and chests flush-mounted into modern cabinetry.

### Zone 3: Upper Master Suite & Rooftop Garden
- **Master Bedroom Suite:** Modern bed arrangements with bedside tables, panoramic morning light, and acoustic wood paneling.
- **Rooftop Sky Terrace:** Secure glass balustrades enclosing an elevated relaxation terrace adorned with manicured azalea shrubbery and short grass.

---

## 3. Verified File Deployments

- **Sponge V2 (`.schem`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\minimalist_modern_villa.schem` ($40.4$ KB)
  - `downloads/minimalist_modern_villa.schem` ($40.4$ KB)
- **Litematica (`.litematic`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\minimalist_modern_villa.litematic` ($2.9$ KB)
  - `downloads/minimalist_modern_villa.litematic` ($2.9$ KB)

---

## 4. Minecraft In-Game Loading Guide

### Option A: WorldEdit (Forge / Fabric / Paper / Sponge)
1. The schematic is already placed in your active Minecraft folder.
2. Find an open, flat build site ($35 \times 35$ space recommended).
3. Execute:
   ```mcfunction
   //schem load minimalist_modern_villa
   //paste
   ```
4. If you want to preview the alignment before pasting:
   ```mcfunction
   //paste -s
   ```

### Option B: Litematica (Fabric)
1. Press `M` to open the Litematica in-game menu.
2. Navigate to **Load Schematics**.
3. Select `minimalist_modern_villa.litematic` and click **Load Schematic**.
4. Use your Litematica tool item (default stick) to position and paste the holographic projection into your world.
