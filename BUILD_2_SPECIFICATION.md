# MineVault Specification: Build #2 — Medieval Village Blacksmith & Armoury (Master Reference Edition)
> **Classification:** Tier 1 — Medieval Workshop & Residence  
> **Target Edition:** Minecraft Java Edition 1.20+ (Format: `.schem` Sponge V2 & `.litematic`)  
> **Philosophy:** Authentic medieval fantasy aesthetic, active open-air forge, collision-safe player clearances, 100% verified functional utility.

---

## 1. Dimensional Footprint & Structural Elevation

### Core Dimensions
- **Width ($X$):** $20$ blocks ($X=0$ to $X=19$)
- **Length ($Z$):** $16$ blocks ($Z=0$ to $Z=15$)
- **Total Height ($Y$):** $17$ blocks ($Y=0$ subfloor foundation to $Y=16$ chimney cap and spire finials)
- **Total Non-Air Blocks:** $1,416$ blocks
- **Primary Walking Elevations:**
  - Ground Floor Interior & Forge: $Y=1$ (Subfloor / foundation top is $Y=0$)
  - Upper Loft Living Quarters: $Y=6$ (Loft floorboards sit at $Y=5$)

```
Y=16 [ Chimney Wall Crest, Roof Finial Spires & Deepslate Cap ]
Y=15 [ High Ridge Peak Crest (X=13..14) & Active Smoke Chimney Top ]
Y=14 [ Curving Gable Bargeboard Overhang & Campfire Signal Fire ]
Y=10..13 [ Steep Gothic Roof Rafters & Gable Wall Plaster Infill ]
Y=9  [ Upper Collar Tie-Beams Across Loft Ceiling ]
Y=6  [ Loft Walking Surface (Bed, Study Desk, Bookshelf, Dormer Window) ]
Y=5  [ Cantilevered Jetty Floor Framing (1-Block Overhang with Corbel Brackets) ]
Y=4  [ Inverted Stair Knee-Braces & Recessed Wall Panel Tops ]
Y=2..3 [ Door Arch Lintels & Framed Directional Window Openings ]
Y=1  [ Ground Walking Surface (Flush Threshold Across Porch & Door) ]
Y=0  [ Flared Stone Skirt, Cobblestone Wall Plinth & Weathered Path ]
```

---

## 2. Doorway & Player Hitbox Geometry

### Standing Player Standard ($0.6 \times 0.6 \times 1.8$ Blocks)
1. **Wooden Doors (Zero Iron Doors / Zero Detached Buttons):**
   - The front entrance ($X=12, Z=2$) features an authentic right-clickable **Spruce Door** (`minecraft:spruce_door[facing=north,half=lower/upper,hinge=left,open=false,powered=false]`) placed directly on a solid spruce threshold at $Y=1$.
   - Sills and jambs are framed with `stripped_dark_oak_log` posts, topped with an inverted `spruce_stairs[half=top,facing=north,shape=straight]` arch lintel at $Y=3$.
2. **Direct Open Forge Timber Archway:**
   - A grand **$2$-wide open timber and stone archway** ($X=8, Z=5..6, Y=1..3$) connects the outdoor forge pavilion directly to the indoor showroom with zero obstructions, allowing the player to walk seamlessly back and forth without having to open/close doors while working.

---

## 3. Directional Window & Glass Placement

### Physically Connected Directional Glass Panes
All glass panes are exported with explicit Minecraft 1.20+ directional connection flags, ensuring they physically connect to surrounding walls, sills, and jambs without rendering as isolated poles:
- **East-West Walls (Facing North / South):**
  - `minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]`
  - Used in North wall ($Z=2$) and South wall ($Z=12$).
- **North-South Walls (Facing East / West):**
  - `minecraft:glass_pane[north=true,south=true,east=false,west=false,waterlogged=false]`
  - Used along East wall ($X=16$).
- **Architectural Framing:**
  - Sills: Solid `stone_bricks` or inverted `spruce_stairs[half=top]`.
  - Shutters: Exterior openable `spruce_trapdoor[open=true]` flanking the window openings.

---

## 4. Staircase Technique & Headroom Clearance

### Center-Ridge Ascending Staircase (Zero Dead Ends!)
- **Ascent Vector:** Climbs North along the east interior perimeter ($X=15, Z=11 \to 8$), steps onto a turning landing ($X=14..15, Z=7$), and then steps **WEST toward the center ridge ($X=12$)** directly into the spacious, open second-story room.
- **Continuous Headroom:**
  - Full $3.0$ blocks of unobstructed vertical air above every single step ($Y+1, Y+2, Y+3$ are open air).
  - Upper ceiling floorboards at $Y=5$ are generously cut out across the entire stairwell ($X=14..15, Z=8..11$).
- **Reverse Undersides:** Inverted spruce stairs (`half=top`) are placed beneath each ascending step, creating a smooth angled timber soffit rather than exposed stepped notches.
- **Spacious Arrival:** The landing at $Y=6$ provides over $5.0$ blocks of open vertical clearance under the central roof ridge ($Y=13$), completely avoiding the low roof eaves.

---

## 5. Functional Zones & Survival Utility

### Zone 1: Open-Air Forge Pavilion ($X=1..7, Z=1..13$)
- **Molten Lava Crucible:** $2 \times 2$ lava pit recessed at $X=3..4, Z=3..4$ at $Y=1$, protected by iron bars (`minecraft:iron_bars`).
- **Twin Active Blast Furnaces:** East- and west-facing blast furnaces flanking the crucible.
- **Smithing Workstations:** Solid anvil (`minecraft:anvil[facing=north]`), grindstone (`minecraft:grindstone`), and smithing table.
- **Quenching Cauldron Trough:** Water cauldron with wall-mounted tripwire hook faucet.
- **Raw Material Barrels:** Dedicated storage for coal and iron ore.
- **Active Smoking Chimney Flue:** Stone brick chimney terminating with a campfire at $Y=13$ producing a continuous smoke plume into the sky.

### Zone 2: Indoor Armoury Showroom ($X=8..16, Z=2..12$)
- **Floor & Runner:** Spruce planking with a central red wool carpet runner.
- **Weapon Display Shelves:** Chiseled bookshelves and display counters for arms and tools.
- **Armor Stand Plinths:** Smooth stone slab bases with armor stands.
- **Double Storage Chest:** Large weapons and ingot chest ($X=9, Z=9..10$) with confirmed open air overhead at $Y=2$ allowing lids to swing fully open.

### Zone 3: Blacksmith's Loft Living Quarters ($X=8..16, Z=2..12, Y=6..9$)
- **Bunk Bed:** Supported Red Bed with solid floor underneath both `foot` and `head` halves.
- **Nightstand:** Barrel nightstand with standing lantern.
- **Personal Chest:** Single chest at $X=9, Z=7$ with open air overhead.
- **Study Desk:** Inverted stair desk surface with candle and potted plant.
- **Dormer Gable Window:** Glass panes with openable spruce trapdoor shutters framing the village street view.
- **Full Enclosure:** All second-floor walls and roof triangles are completely enclosed up to the ridge with zero open holes.

---

## 6. 14-Point Survival Acceptance Checklist

- [x] 1. Walk through the front entrance without jumping or sneaking.
- [x] 2. Open and close the front spruce door naturally by right-clicking (zero iron doors/detached buttons).
- [x] 3. Walk freely between forge and armoury through the 2-wide timber archway.
- [x] 4. Climb the complete center-ridge staircase with $3.0$ blocks unobstructed headroom above every step.
- [x] 5. Arrive smoothly into the wide, spacious central loft floor (zero dead ends or wall collisions).
- [x] 6. Open and close both ground double chests and loft personal chest.
- [x] 7. Sleep in the loft bed and successfully set respawn point.
- [x] 8. Use both blast furnaces, the anvil, smithing table, and grindstone.
- [x] 9. Quench items in the water cauldron sink.
- [x] 10. Verify forge lava is securely contained behind iron bars (fire-safe).
- [x] 11. Inspect the smoking chimney column rising high above the roof.
- [x] 12. Check all glass panes (100% connected directional states touching walls, zero isolated spikes).
- [x] 13. Verify dual format files (`.schem` and `.litematic`) exist in `downloads/` and `%APPDATA%\.minecraft\schematics\`.
- [x] 14. Catalog entry registered in `data/schematics.json` and `app.js` with multi-angle gallery assets.
