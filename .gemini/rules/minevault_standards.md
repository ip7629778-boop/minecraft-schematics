# MineVault Master Architectural Standards & Build Guidelines

All agents working in this workspace must follow these verified rules across every Minecraft build:

## 1. Doorway & Entrance Standards
- **Wooden Doors Only:** Use survival-friendly wooden doors (Spruce, Oak, Dark Oak). Never use iron doors that require buttons or levers.
- **Flush Threshold Elevation:** Exterior porch, door sill, and interior floor must share the exact same walking surface elevation (Y=1).
- **Clear Vertical Headroom:** At least 2 full blocks of clear passage above the walking surface. Lintels and inverted arch stairs begin at Y+2.
- **Open Archways:** Open-air workshops (like forges, stables) connect to indoor rooms via 2-wide seamless open timber/stone archways.

## 2. Window & Glass Pane Placement
- **Directional Connection Flags:** Always generate glass panes with explicit directional connection properties (e.g. `[east=true,west=true]` for E-W walls) so they connect to wall posts and sills instead of floating as disconnected poles.

## 3. Staircase & Headroom Geometry
- **Ascend Toward Center Ridge:** Staircases must climb toward the high central roof ridge to guarantee 3-5 blocks of headroom, avoiding low sloping eaves.
- **Finished Undersides:** Place inverted stairs underneath each step for clean, professional finishes.
- **Open Landing:** Staircases must land onto an open, walkable floor (minimum 2x2 clear landing) with zero dead-ends or accidental drops.

## 4. Roof & Gable Enclosures
- **Full Gable Triangles:** Never leave open air gaps between top wall beams and the roof peak. Fill gables with matching wall blocks (terracotta, stripped wood, or planks).
- **Contrasting Trim:** Use deepslate, stone brick, or dark oak stairs for roof fascia and trim to create depth against the main roof material.

## 5. File Formats & Metadata
- Export dual formats to `downloads/`: `.schem` (WorldEdit Sponge V2) and `.litematic` (Fabric Litematica).
- Update `data/schematics.json` with exact dimensions ($X \times Y \times Z$), non-air block count, materials list, and screenshots in `pictures/` or `assets/images/builds/`.
- Maintain collision-safe clearances around double chests (never place solid full blocks directly above chest lids).
