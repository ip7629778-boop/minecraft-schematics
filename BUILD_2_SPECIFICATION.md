# MineVault Specification: Build #2 — Medieval Village Blacksmith & Armoury
> **Classification:** Tier 1 — Medieval Workshop & Residence  
> **Target Edition:** Minecraft Java Edition 1.20+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Authentic medieval fantasy aesthetic, active open-air forge, collision-safe player clearances, 100% verified functional utility.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $17$ blocks ($X=0$ to $X=16$)
- **Length ($Z$):** $14$ blocks ($Z=0$ to $Z=13$)
- **Total Height ($Y$):** $14$ blocks ($Y=0$ subfloor foundation to $Y=13$ chimney cap and gable peak)
- **Primary Walking Elevations:**
  - Ground Floor Interior & Forge: $Y=1$ (Subfloor / foundation top is $Y=0$)
  - Upper Loft Living Quarters: $Y=6$ (Loft floorboards sit at $Y=5$)

```
Y=13 [ Chimney Smoke Cap & Ornamental Deepslate Crest Slab ]
Y=12 [ Roof Ridge Peak (X=11..12) & Smoking Campfire Top ]
Y=9  [ Upper Timber Tie-Beams & Loft Eaves Line ]
Y=6  [ Loft Finished Walking Surface (Bed, Study Desk, Dormer Window) ]
Y=5  [ Loft Subfloor Framing & Ground Ceiling Timber Joists ]
Y=2  [ Door Arch Lintels & Window Openings ]
Y=1  [ Ground Walking Surface (Flush Threshold Across Porch & Door) ]
Y=0  [ Stone Brick / Cobblestone / Andesite Foundation Plinth ]
```

---

## 2. Doorway & Player Hitbox Geometry

### Standing Player Standard ($0.6 \times 0.6 \times 1.8$ Blocks)
1. **Flush Thresholds:** The exterior stone brick approach steps ($Z=1$), the doorway threshold sill ($Z=2$), and the interior spruce showroom floor ($Z=3..10$) share the exact same walking elevation at $Y=1$. Zero bottom slabs or jump-blocking obstacles.
2. **Double Door Opening:** The front armoury entrance ($X=11, Z=2$) features an Oak Door with inverted Dark Oak Stair arch lintel at $Y=3$, providing $2.0$ full blocks of unobstructed clearance ($Y=1, 2$).
3. **Internal Forge Access:** An iron security door at $X=8, Z=6$ connects the showroom directly to the open forge pavilion with wall buttons on both sides.

---

## 3. Staircase Technique & Headroom Clearance

### The 2-Block Vertical Clearance Standard
- **Ascent Path:** L-shaped wooden staircase climbing along the eastern wall ($X=13..14, Z=7..10$).
- **Headroom Cutout:** The upper loft floor joists at $Y=5$ are completely cut out across the entire stair route.
  - Step 1 ($Z=7, Y=1$): Clear air up to $Y=4$ ($3.0$ blocks headroom).
  - Step 2 ($Z=8, Y=2$): Clear air up to $Y=5$ ($3.0$ blocks headroom).
  - Step 3 ($Z=9, Y=3$): Clear air up to $Y=6$ ($3.0$ blocks headroom).
  - Landing ($Z=10, Y=4$): Full $2 \times 2$ flat turning space with open air to $Y=7$.
  - Final Step ($X=14, Z=9, Y=5$): Unobstructed arrival into the loft at $Y=6$.
- **Guardrail:** Protective spruce fencing along the loft opening edge at $Y=6$ prevents accidental falls into the stairwell.

---

## 4. Functional Zones & Survival Utility

### Zone 1: Open-Air Forge Pavilion ($X=1..7, Z=1..12$)
- **Molten Lava Crucible:** Active lava pool recessed at $X=3..4, Z=3$, contained behind safety iron bars.
- **Twin Blast Furnaces:** East- and west-facing active blast furnaces flanking the lava pit.
- **Smithing Workstations:** Working anvil (`minecraft:anvil`), grindstone, and smithing table on solid floor.
- **Quenching Cauldron Trough:** Full water cauldron with wall-mounted tripwire hook faucet.
- **Raw Material Barrels:** Storage barrels for coal and iron ore adjacent to the forge.
- **Smoking Chimney Stack:** Stone brick flue terminating with a campfire at $Y=12$ producing a continuous smoke plume into the sky.

### Zone 2: Indoor Armoury Showroom ($X=8..15, Z=2..11$)
- **Floor & Décor:** Spruce planking with a vibrant red wool carpet runner down the central aisle.
- **Weapon Display Shelves:** Chiseled bookshelves and display counters for arms and tools.
- **Armor Stand Plinths:** Smooth stone slab bases with armor display stands.
- **Double Storage Chest:** Large weapons and ingot chest ($X=9, Z=8..9$) with confirmed open air overhead at $Y=2$ allowing lids to swing fully open.

### Zone 3: Blacksmith's Loft Living Quarters ($X=8..15, Z=2..11, Y=6..9$)
- **Bunk Bed:** Supported Red Bed with solid floor underneath both `foot` and `head` halves.
- **Nightstand:** Oak barrel nightstand with standing lantern.
- **Personal Chest:** Single chest at $X=9, Z=6$ with open air overhead.
- **Study Desk:** Inverted stair desk surface with candle and potted plant.
- **Dormer Gable Window:** Glass panes with openable spruce trapdoor shutters framing the village street view.

---

## 5. Architectural Palette & Texturing Gradient

| Component | Materials Used |
| :--- | :--- |
| **Foundation & Ground** | Stone Bricks, Mossy Cobblestone, Cobblestone, Polished Andesite, Gravel |
| **Heavy Timber Framing** | Stripped Dark Oak Logs (Pillars), Stripped Dark Oak Wood (Tie-Beams) |
| **Plaster Wall Infill** | White Terracotta, Calcite |
| **Main Gable Roof** | Dark Oak Stairs, Dark Oak Planks |
| **Roof Trim & Eaves** | Deepslate Tile Stairs, Deepslate Tile Slabs (Upside-down corbel brackets) |
| **Forge Crucible & Chimney** | Deepslate Bricks, Deepslate Tile Stairs, Stone Bricks, Stone Brick Wall, Campfire |
| **Interior Furniture** | Spruce Planks, Spruce Stairs, Spruce Fence, Red Bed, Barrels, Cauldron, Anvil |

---

## 6. 14-Point Survival Acceptance Checklist

- [x] 1. Walk through the front entrance without jumping or sneaking.
- [x] 2. Open and close the front door and forge connecting door.
- [x] 3. Walk through the entire ground floor showroom without hitting ceiling joists.
- [x] 4. Climb the complete L-staircase with $2.0+$ blocks unobstructed headroom above every step.
- [x] 5. Turn safely on the $2 \times 2$ landing without clipping walls.
- [x] 6. Open and close both ground double chests and loft personal chest.
- [x] 7. Sleep in the loft bed and successfully set respawn point.
- [x] 8. Use both blast furnaces, the anvil, smithing table, and grindstone.
- [x] 9. Quench items in the water cauldron sink.
- [x] 10. Verify forge lava is securely contained behind iron bars (fire-safe).
- [x] 11. Inspect the smoking chimney column rising high above the roof.
- [x] 12. Check all interior and exterior lanterns (100% attached to valid solid faces, zero floating).
- [x] 13. Verify dual format files (`.schem` and `.litematic`) exist in `downloads/`.
- [x] 14. Catalog entry registered in `data/schematics.json` and `app.js` with multi-angle gallery assets.
