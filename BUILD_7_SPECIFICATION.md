# MineVault Specification: Build #7 — Rustic Windmill & High Granary
> **Classification:** Tier 1 — Master Medieval Milling Complex & Baker's Granary  
> **Original Architecture & Engineering:** MineVault Studio  
> **Target Edition:** Minecraft Java Edition 1.20 - 1.21+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Authentic medieval engineering featuring a tapered octagonal stone-and-timber milling tower, rotating deepslate tile cap roof, an imposing 4-blade canvas sail assembly spanning 22 blocks across, and an attached bread bakery and wheat granary cottage with smoking brick chimney.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $27$ blocks
- **Height ($Y$):** $34$ blocks
- **Length ($Z$):** $27$ blocks
- **Total Non-Air Blocks:** $1,862$ blocks across $58$ palette states
- **Primary Footprint Geometry:** Octagonal Milling Tower with Gabled Cottage Annex
  - 5-story tapered octagonal windmill tower ($R=4.6 \to 3.4$)
  - Attached eastern granary cottage & bakery ($8 \times 9$ blocks)
  - Active smoking brick chimney stack ($10$ blocks tall)
  - Perimeter farmland with wheat plots, hay bale stacks, water trough, and composters

```
Y=27..34 [ Rotating Cap Roof, Iron Lightning Rod, Weather Vane, Upper Blade Tips ]
Y=22..26 [ Horizontal Drive Axle Hub & 22-Block Diameter 4-Blade Canvas Sail Cross ]
Y=15..21 [ Observation Balcony, Dark Oak Rafters, Upper Braking Levers & Drive Shaft ]
Y=8..14  [ Second Floor Grain Silo Storage, Hop-Backs & Flour Sack Barrels ]
Y=2..7   [ Ground Floor Millstone Grinding Wheel, Attached Bakery & Smoker Hearth ]
Y=0..1   [ Octagonal Weathered Stone Masonry Base, Dirt Paths & Farmland Apron ]
```

---

## 2. Authentic Architectural Features & Interior Zoning

### Zone 1: The 4-Blade Sail Mechanism & Cap Roof
- **22-Block Sail Cross:** 4 diagonal sail arms built from dark oak fencing, spruce trapdoors, and white wool canvas angled to simulate wind catch.
- **Rotating Cap Structure:** Heavy deepslate tile roof with observation balcony and iron weather vane rod.
- **Vertical Drive Shaft:** Centered stripped dark oak axle running through all 4 interior floors.

### Zone 2: Ground Floor Milling Chamber
- **Millstone Grinder:** Grindstone unit linked to a hopper collection chute and flour barrel.
- **Crafting & Workshop:** Crafting table, storage chests, and tool repair stations.

### Zone 3: Granary Cottage & Bread Bakery
- **Active Smoking Hearth:** Brick chimney with lit campfire generating authentic smoke rising over the gables.
- **Baking Facilities:** Smoker and blast furnace for processing grain into bread and provisions.
- **Wheat Storage:** Hay bale stacks and labeled food barrels.

---

## 3. Verified File Deployments

- **Sponge V2 (`.schem`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\rustic_windmill_granary.schem` ($27.6$ KB)
  - `downloads/rustic_windmill_granary.schem` ($27.6$ KB)
- **Litematica (`.litematic`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\rustic_windmill_granary.litematic` ($22.6$ KB)
  - `downloads/rustic_windmill_granary.litematic` ($22.6$ KB)

---

## 4. Minecraft In-Game Loading Guide

### Option A: WorldEdit (Forge / Fabric / Paper / Sponge)
1. The schematic is already placed in your active Minecraft folder.
2. Find an open area ($30 \times 30$ space recommended).
3. Run command:
   ```mcfunction
   //schem load rustic_windmill_granary
   //paste
   ```
4. If you wish to preview the paste position before committing:
   ```mcfunction
   //paste -s
   ```

### Option B: Litematica (Fabric)
1. In-game, press `M` &rarr; **Load Schematics**.
2. Select `rustic_windmill_granary.litematic` and click **Load Schematic**.
3. Align the holographic projection with your tool item and paste into your world.
