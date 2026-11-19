# MineVault Specification: Build #6 — Steampunk Grand Vault & Automated Trading Cathedral
> **Classification:** Tier 1 — Remixed Master Commerce Hub & Industrial Redstone Complex  
> **Original Architecture:** Sbopurch | **Remix & Engineering:** MineVault Studio  
> **Target Edition:** Minecraft Java Edition 1.20 - 1.21+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Programmatic remix (Option 2) transforming a standard timber trading barn into an opulent Steampunk industrial cathedral of commerce. Features waxed cut copper structural ribbing, vaulted deepslate tile arches, orange stained glass clerestory skylights, custom gaslight chandeliers, and 100% vanilla 1.20-1.21+ compatibility with over 60 isolated villager trading cells.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $33$ blocks
- **Height ($Y$):** $20$ blocks
- **Length ($Z$):** $55$ blocks
- **Total Non-Air Blocks:** $9,225$ blocks across $127$ palette states
- **Tile Entities:** $684$ functional workstations, double-chests, barrels, lecterns, and signage
- **Primary Footprint Geometry:** Symmetrical Steampunk Cathedral of Commerce
  - 55-block central nave and public trading concourse
  - Flanking east and west merchant colonnades with 60+ individual trader cells
  - Elevated clerestory stained-glass skylights and copper truss rafters
  - Automated redstone logistics channels and workstation containment cells

```
Y=18..20 [ Steampunk Cut Copper Spire Crests, Weathered Flues & Ridge Trusses ]
Y=14..17 [ Vaulted Deepslate Tile Arches & Orange Stained Glass Clerestory ]
Y=9..13  [ Upper Colonnade Gaslight Luminaires, Dark Oak Rafters & Hanging Soul Lanterns ]
Y=4..8   [ Ground Aisle Trading Booths, Workstations, Iron Grates & Display Counters ]
Y=1..3   [ Polished Deepslate Central Runner Floor & Acoustic Beehive Parquet Ceilings ]
Y=0      [ Solid Heavy Foundation Substrate & Underfloor Redstone Routing Channels ]
```

---

## 2. Authentic Architectural Features & Interior Zoning

### Zone 1: The Steampunk Cathedral Nave & Architecture
- **Waxed Cut Copper Framing:** $307$ blocks of polished and waxed cut copper framing structural arch collars and ornamental transaction counters that will never oxidize.
- **Deepslate Tile Vaulting:** Over $3,200$ combined deepslate tiles, slabs, and stairs engineered into soaring gothic rib vaults replacing basic wood beams.
- **Orange Stained Glass Clerestory:** $274$ orange stained glass panes flooding the central concourse with warm amber sunlight by day and industrial gaslight warmth by night.

### Zone 2: Automated Commerce & Workstation Cubicles
- **60+ Containment Trading Cells:** Modular 1-block villager containment cells equipped with profession workstations (lecterns, barrels, smokers, blast furnaces, fletching tables, cartography tables).
- **Zombie Infection & Curing Utility:** Built-in mechanical access points enabling easy 1-emerald trade discounting.
- **100% Vanilla Overhaul:** Replaced all non-vanilla modded blocks (such as third-party shelves) with official vanilla waxed copper slabs and polished deepslate trims.

### Zone 3: Storage Logistics & Beehive Parquet
- **Massive Inventory Capacity:** $684$ active tile entities including double-chests organized by trade commodity (enchanted books, armor, tools, food, materials).
- **Acoustic Ceiling Parquetry:** $526$ beehives integrated into the upper roof structure, producing a stunning visual texture reminiscent of industrial pressed copper ceiling tiles.

---

## 3. Verified File Deployments

- **Sponge V2 (`.schem`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\steampunk_trading_cathedral.schem` ($142.8$ KB)
  - `downloads/steampunk_trading_cathedral.schem` ($142.8$ KB)
- **Litematica (`.litematic`):**
  - `C:\Users\ip762\AppData\Roaming\.minecraft\schematics\steampunk_trading_cathedral.litematic` ($12.2$ KB)
  - `downloads/steampunk_trading_cathedral.litematic` ($12.2$ KB)

---

## 4. Minecraft In-Game Loading Guide

### Option A: WorldEdit (Forge / Fabric / Paper / Sponge)
1. The schematic is already placed in your active Minecraft folder.
2. Clear an elongated site ($40 \times 60$ blocks recommended).
3. Run command:
   ```mcfunction
   //schem load steampunk_trading_cathedral
   //paste
   ```
4. If you want to check alignment before committing:
   ```mcfunction
   //paste -s
   ```

### Option B: Litematica (Fabric)
1. In-game, press `M` &rarr; **Load Schematics**.
2. Select `steampunk_trading_cathedral.litematic` and click **Load Schematic**.
3. Align the holographic projection with your tool item and paste into your world.
