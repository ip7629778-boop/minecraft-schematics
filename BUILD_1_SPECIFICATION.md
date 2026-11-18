# MineVault Specification: Build #1 — Cozy Survival Starter House
> **Classification:** Tier 1 — Survival Starter / Cottage  
> **Target Edition:** Minecraft Java Edition 1.20+ (Format: `.schem` Sponge V2/V3 & `.litematic`)  
> **Philosophy:** Survival-first, collision-safe, geometrically consistent, 100% verified anchors.

---

## 1. Doorway & Player Hitbox Geometry

### Standard Standing Player Dimensions
- **Hitbox Width:** $0.6$ blocks
- **Hitbox Depth:** $0.6$ blocks
- **Hitbox Height:** $1.8$ blocks
- **Eye Height:** $1.62$ blocks

### Elevation & Coordinate Reference
With the finished interior/porch walking surface at elevation $Y$:
```
Y+3  [ Roof / Upper Timber Tie-Beam / Wall Structure ]
Y+2  [ Lintel / Arch Beam ] (Solid block or inverted stair half=top; minimum standing clearance ends here)
Y+1  [ Door Upper Half ]    (Clear passage; no signs, lanterns, or trapdoors intruding)
Y    [ Door Lower Half ]    (Clear passage; door frame threshold)
Y-1  [ Floor Foundation ]   (Top surface is flush at elevation Y)
```

### Construction Requirements
1. **Flush Threshold:** Exterior porch floor, door threshold, and interior floor must share the exact same walking elevation ($Y-1$ full block or top-slab). No bottom slabs or raised blocks creating accidental half-step bumps.
2. **Door Clearance:** Both door blocks must be installed correctly. No fences, wall posts, lanterns, or decorative blocks intruding into the doorway volume.
3. **Vertical Clearance:** Maintain at least 2.0 full blocks of unobstructed vertical clearance above the walking surface ($Y$ and $Y+1$ are open air).
4. **Lintel Positioning:** Solid lintels can safely begin at $Y+2$ because a standing player hitbox terminates at $Y+1.8$.
5. **Decorative Arches:** Inverted stairs (`half=top`) or slabs (`type=top`) placed at $Y+2$ provide full $2.0$-block clearance below.
6. **Roof Overhang:** Porch eave overhangs must terminate at or above $Y+2.5$.
7. **Door Operation:** Validated in both open and closed states without obstructing the primary interior entry path.

---

## 2. Staircase Technique & Headroom Clearance

### The 2-Block Vertical Clearance Rule
The player's head must never intersect a solid collision shape while traversing the staircase.
- Maintain at least **$2.0$ blocks of unobstructed vertical space** above the actual walking surface throughout the entire flight.
- Clearance is measured vertically from the top surface on which the player's feet stand at every step.
- Check the entire player hitbox along the stair route, including transitions between consecutive steps.
- **Beam Exclusion:** No horizontal timber beams, ceiling joists, hanging lanterns, or chandeliers may intersect the clearance envelope.

### Staircase Construction Requirements
1. **Stair Orientation:** Every stair must face the intended ascent direction with `half=bottom`.
2. **Continuous Ascent:** Each step connects directly to the next without accidental air drops or obstacles.
3. **Full Stairwell Cutout:** Upper-floor ceiling boards, joists, and slabs must be completely cut out across the entire stair flight and 1 block past the top landing step.
4. **Landing Clearance:** The upper landing must provide at least $2.0$ blocks of unobstructed vertical headroom before the gable roof slope begins.
5. **Decorative Trim:** Inverted stairs (`half=top`) framing the stairwell opening must sit entirely outside the player's clearance path.

---

## 3. Furniture Anchor & Physics Matrix

| Object | Correct Placement Requirement | Orientation / Block-State Standard |
| :--- | :--- | :--- |
| **Bed** | Solid floor support underneath **both** halves at $Y-1$ | Two paired blocks: `foot` at $(X,Y,Z)$ and `head` at $(X,Y,Z+1)$ for `facing=south`. Fully usable in Survival mode. |
| **Double Chest** | Solid floor support at $Y-1$; transparent/air space directly above at $Y+1$ | Java Edition blockstates: Matching `facing=north`, with complementary `type=left` and `type=right` placed adjacently. Space above must be `air`, `stairs[half=top]`, or `slab[type=top]` to allow opening. |
| **Hanging Lantern** | Attached to a solid block ceiling, chain, or fence post at $Y+1$ | `lantern[hanging=true,waterlogged=false]`. Never placed against air or bottom slabs. |
| **Standing Lantern** | Solid top surface at $Y-1$ | `lantern[hanging=false,waterlogged=false]`. Sits on tables, counters, barrels, or solid floors. |
| **Trapdoor Shutters** | Attached to a valid solid wall face | Hinge orientation and facing set to open outward against exterior wall piers. |
| **Flower Pots & Candles** | Placed only on blocks supporting them | Sits on barrels, crafting tables, chiseled bookshelves, or upside-down stair mantels. |
| **Hearth & Chimney** | Solid stone/brick foundation; fire-safe construction | `campfire[lit=true,facing=south]` recessed into stone; brick range hood with smoke path into chimney through the roof. |

---

## 4. Interior Zoning & Complete Coordinate Layout

### Dimensions
- **Footprint:** $13$ wide (X: 0 to 12) $\times 11$ deep (Z: 0 to 10)
- **Total Height:** $12$ blocks (Y: 0 foundation to Y: 11 roof ridge)
- **Floor Elevation:** Walking surface is $Y=1$ (Subfloor / foundation top is $Y=0$).

### 5 Functional Interior Zones
1. **Front Entrance ($X=6, Z=0$):**
   - Stone brick porch steps leading to a flush oak plank threshold.
   - Oak door with lintel at $Y=3$ ($2.0$ blocks clear air at $Y=1, 2$).
2. **Central Living Room ($X=5..7, Z=1..5$):**
   - $2$-block-wide clear central walking aisle.
   - Wool carpet runner, high exposed spruce timber rafters, standing and hanging lanterns.
3. **Hearth & Kitchen Alcove ($X=1..4, Z=1..4$):**
   - Recessed brick fireplace with campfire, stone brick chimney, and brick stair range hood.
   - Kitchen counter: barrels, water cauldron with tripwire hook faucet, smoker.
4. **Workbench & Workshop Alcove ($X=8..11, Z=1..4$):**
   - Crafting table, anvil, and double chest with clear opening overhead.
   - Chiseled bookshelf with candles and potted plant.
5. **Staircase & Loft Bedroom ($X=8..11, Z=5..9$):**
   - L-shaped wooden staircase starting at $X=8, Z=5$ climbing up along the wall to upper loft at $Y=5$.
   - Stairwell opening completely cut out from $Y=4$ ceiling joists.
   - Loft bedroom with supported double bed, bedside barrel nightstand with candle, and panoramic gable window.

---

## 5. 14-Point Survival Acceptance Checklist

- [ ] 1. Walk through the front entrance without jumping or sneaking.
- [ ] 2. Open and close the front door from both sides.
- [ ] 3. Walk through the entire interior without hitting the ceiling.
- [ ] 4. Climb the complete staircase without hitting beams or ceiling blocks.
- [ ] 5. Walk onto the upper landing without collision.
- [ ] 6. Open and close every chest.
- [ ] 7. Sleep in the bed successfully.
- [ ] 8. Use the crafting table, smoker, and other functional blocks.
- [ ] 9. Check every lantern, pot, candle, and shutter.
- [ ] 10. Verify the fireplace and chimney are fire-safe.
- [ ] 11. Check the roof for unwanted collision obstructions.
- [ ] 12. Check all interior zones for accessible walking paths.
- [ ] 13. Verify all decorations are correctly supported (zero floating items).
- [ ] 14. Test the completed build in Survival mode.
