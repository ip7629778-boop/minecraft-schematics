const fs = require('fs');
const path = require('path');
const { VoxelArchitect } = require('./voxel_architect');

console.log('=== Generating Build #2: Medieval Village Blacksmith & Armoury ===\n');

const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

// Dimensions: 17 wide (X: 0..16), 14 tall (Y: 0..13), 14 deep (Z: 0..13)
const W = 17, H = 14, L = 14;
const b = new VoxelArchitect(W, H, L);

// =========================================================================
// 1. FOUNDATION & GROUND LEVEL (Y = 0)
// =========================================================================
// Cobblestone, Stone Bricks & Andesite textured base
for (let x = 0; x < W; x++) {
  for (let z = 0; z < L; z++) {
    if ((x + z) % 5 === 0) b.set(x, 0, z, 'minecraft:mossy_cobblestone');
    else if ((x + z) % 3 === 0) b.set(x, 0, z, 'minecraft:cobblestone');
    else if ((x + z) % 2 === 0) b.set(x, 0, z, 'minecraft:stone_bricks');
    else b.set(x, 0, z, 'minecraft:polished_andesite');
  }
}

// Outdoor gravel & cobblestone apron around forge (X: 0..8, Z: 0..13)
for (let x = 0; x <= 8; x++) {
  for (let z = 0; z <= 13; z++) {
    if (x === 0 || z === 0 || z === 13) {
      b.set(x, 0, z, (x + z) % 2 === 0 ? 'minecraft:gravel' : 'minecraft:cobblestone');
    }
  }
}

// Interior Armoury Floor (X: 8..15, Z: 2..11 at Y = 0)
b.box(8, 0, 2, 15, 0, 11, 'minecraft:spruce_planks');
// Red carpet runner down central aisle of Armoury (X: 11, Z: 3..9 at Y = 1)
for (let z = 3; z <= 9; z++) {
  b.set(11, 1, z, 'minecraft:red_carpet');
}

// =========================================================================
// 2. TIMBER FRAME & LOAD-BEARING PILLARS (Ground to Roof)
// =========================================================================
// Heavy stripped dark oak logs at structural nodes
const pillars = [
  // Forge Canopy posts (open air)
  { x: 1, z: 1, top: 5 },
  { x: 7, z: 1, top: 5 },
  { x: 1, z: 6, top: 5 },
  { x: 1, z: 12, top: 5 },
  { x: 7, z: 12, top: 5 },

  // Armoury Main Hall posts
  { x: 8, z: 2, top: 9 },
  { x: 15, z: 2, top: 9 },
  { x: 8, z: 7, top: 9 },
  { x: 15, z: 7, top: 9 },
  { x: 8, z: 11, top: 9 },
  { x: 15, z: 11, top: 9 }
];

pillars.forEach(p => {
  b.box(p.x, 1, p.z, p.x, p.top, p.z, 'minecraft:stripped_dark_oak_log');
});

// Stone brick foundation bases for exterior timber posts (Y = 1)
pillars.forEach(p => {
  b.set(p.x, 1, p.z, 'minecraft:stone_brick_wall');
});

// Horizontal timber tie-beams at Y = 5 (Ground ceiling / lintel line)
b.box(1, 5, 1, 7, 5, 1, 'minecraft:stripped_dark_oak_wood');
b.box(1, 5, 12, 7, 5, 12, 'minecraft:stripped_dark_oak_wood');
b.box(1, 5, 1, 1, 5, 12, 'minecraft:stripped_dark_oak_wood');
b.box(7, 5, 1, 7, 5, 12, 'minecraft:stripped_dark_oak_wood');

b.box(8, 5, 2, 15, 5, 2, 'minecraft:stripped_dark_oak_wood');
b.box(8, 5, 11, 15, 5, 11, 'minecraft:stripped_dark_oak_wood');
b.box(8, 5, 2, 8, 5, 11, 'minecraft:stripped_dark_oak_wood');
b.box(15, 5, 2, 15, 5, 11, 'minecraft:stripped_dark_oak_wood');

// Upper floor horizontal timber tie-beams at Y = 9 (Loft eaves line)
b.box(8, 9, 2, 15, 9, 2, 'minecraft:stripped_dark_oak_wood');
b.box(8, 9, 11, 15, 9, 11, 'minecraft:stripped_dark_oak_wood');
b.box(8, 9, 2, 8, 9, 11, 'minecraft:stripped_dark_oak_wood');
b.box(15, 9, 2, 15, 9, 11, 'minecraft:stripped_dark_oak_wood');

// =========================================================================
// 3. ARMOURY WALLS & ENCLOSURE (Ground Floor Y: 1..5)
// =========================================================================
// Exterior walls: Stone bricks at Y=1..2, White Terracotta & Calcite at Y=3..4
// Dividing wall between forge & armoury (X = 8, Z: 2..11)
for (let z = 2; z <= 11; z++) {
  // Lower foundation wall
  b.set(8, 1, z, (z % 2 === 0) ? 'minecraft:stone_bricks' : 'minecraft:cracked_stone_bricks');
  b.set(8, 2, z, 'minecraft:stone_bricks');
  // Upper plaster infill
  b.set(8, 3, z, (z % 2 === 0) ? 'minecraft:white_terracotta' : 'minecraft:calcite');
  b.set(8, 4, z, 'minecraft:white_terracotta');
}

// East exterior wall (X = 15, Z: 2..11)
for (let z = 2; z <= 11; z++) {
  b.set(15, 1, z, (z % 3 === 0) ? 'minecraft:mossy_stone_bricks' : 'minecraft:stone_bricks');
  b.set(15, 2, z, 'minecraft:stone_bricks');
  b.set(15, 3, z, (z % 2 === 0) ? 'minecraft:calcite' : 'minecraft:white_terracotta');
  b.set(15, 4, z, 'minecraft:white_terracotta');
}

// South exterior wall (Z = 11, X: 8..15)
for (let x = 8; x <= 15; x++) {
  b.set(x, 1, 11, 'minecraft:stone_bricks');
  b.set(x, 2, 11, 'minecraft:stone_bricks');
  b.set(x, 3, 11, 'minecraft:white_terracotta');
  b.set(x, 4, 11, 'minecraft:calcite');
}

// North exterior wall (Z = 2, X: 8..15)
for (let x = 8; x <= 15; x++) {
  b.set(x, 1, 2, 'minecraft:stone_bricks');
  b.set(x, 2, 2, 'minecraft:stone_bricks');
  b.set(x, 3, 2, 'minecraft:white_terracotta');
  b.set(x, 4, 2, 'minecraft:white_terracotta');
}

// Armoury Front Entrance (X = 11, Z = 2)
// Clear 2-high door opening with flush threshold at Y=1
b.set(11, 1, 2, 'minecraft:oak_door[half=lower,facing=north,hinge=left]');
b.set(11, 2, 2, 'minecraft:oak_door[half=upper,facing=north,hinge=left]');
b.set(11, 3, 2, 'minecraft:dark_oak_stairs[half=top,facing=north]'); // Arch lintel

// Porch steps leading into doorway at Z = 1
b.set(11, 0, 1, 'minecraft:stone_brick_stairs[half=bottom,facing=south]');
b.set(10, 1, 1, 'minecraft:lantern[hanging=false]'); // Welcoming porch lantern

// Windows with glass panes & spruce trapdoor shutters
// East wall windows
b.set(15, 2, 4, 'minecraft:glass_pane');
b.set(15, 3, 4, 'minecraft:glass_pane');
b.set(15, 2, 9, 'minecraft:glass_pane');
b.set(15, 3, 9, 'minecraft:glass_pane');
// North wall window
b.set(13, 2, 2, 'minecraft:glass_pane');
b.set(13, 3, 2, 'minecraft:glass_pane');
// South wall window
b.set(11, 2, 11, 'minecraft:glass_pane');
b.set(11, 3, 11, 'minecraft:glass_pane');

// Connecting door between Forge and Armoury (X = 8, Z = 6)
b.set(8, 1, 6, 'minecraft:iron_door[half=lower,facing=west,hinge=right]');
b.set(8, 2, 6, 'minecraft:iron_door[half=upper,facing=west,hinge=right]');
b.set(8, 3, 6, 'minecraft:stone_brick_stairs[half=top,facing=west]');
b.set(7, 2, 6, 'minecraft:stone_button[facing=west]'); // Button to enter from forge
b.set(9, 2, 6, 'minecraft:stone_button[facing=east]'); // Button to exit to forge

// =========================================================================
// 4. THE FORGE & SMELTERY PAVILION (West Wing: X: 1..7, Z: 1..12)
// =========================================================================
// Forge Hearth & Lava Crucible (X: 2..5, Z: 2..5)
// Heavy deepslate and stone brick chimney base
b.box(2, 1, 2, 5, 1, 5, 'minecraft:deepslate_bricks');
b.box(2, 2, 2, 5, 2, 5, 'minecraft:deepslate_bricks');

// Lava pit (recessed into forge crucible)
b.set(3, 1, 3, 'minecraft:lava');
b.set(4, 1, 3, 'minecraft:lava');
// Safety containment: iron bars along front of lava crucible
b.set(3, 2, 2, 'minecraft:iron_bars');
b.set(4, 2, 2, 'minecraft:iron_bars');

// Twin blast furnaces flanking the forge
b.set(2, 2, 3, 'minecraft:blast_furnace[facing=east,lit=true]');
b.set(5, 2, 3, 'minecraft:blast_furnace[facing=west,lit=true]');

// Forge hood & chimney intake at Y = 3..4
b.box(2, 3, 2, 5, 3, 5, 'minecraft:deepslate_tile_stairs[half=top]');
b.box(2, 4, 2, 5, 4, 5, 'minecraft:deepslate_bricks');

// Chimney Flue & Smoke Stack (X: 3..4, Z: 3..4 climbing up to Y = 13)
b.box(3, 5, 3, 4, 12, 4, 'minecraft:stone_bricks');
// Chimney cap with smoking campfire
b.set(3, 13, 3, 'minecraft:stone_brick_wall');
b.set(4, 13, 3, 'minecraft:stone_brick_wall');
b.set(3, 13, 4, 'minecraft:stone_brick_wall');
b.set(4, 13, 4, 'minecraft:stone_brick_wall');
b.set(3, 12, 3, 'minecraft:campfire[lit=true]'); // produces realistic chimney smoke column!

// Smithing Workstations in the open forge
// Working Anvil
b.set(3, 1, 6, 'minecraft:anvil[facing=north]');
// Grindstone
b.set(5, 1, 6, 'minecraft:grindstone[facing=west,face=floor]');
// Smithing Table
b.set(2, 1, 6, 'minecraft:smithing_table');
// Water Cauldron Trough (for quenching hot steel)
b.set(2, 1, 8, 'minecraft:cauldron[level=3]');
b.set(2, 2, 8, 'minecraft:tripwire_hook[facing=south]'); // Faucet

// Coal & Ingot Storage Barrels
b.set(2, 1, 10, 'minecraft:barrel');
b.set(2, 2, 10, 'minecraft:barrel');
b.set(3, 1, 10, 'minecraft:raw_iron_block');
b.set(4, 1, 10, 'minecraft:coal_block');

// Forge ceiling lighting
b.set(4, 4, 8, 'minecraft:chain');
b.set(4, 3, 8, 'minecraft:lantern[hanging=true]');
b.set(4, 4, 1, 'minecraft:lantern[hanging=true]');

// =========================================================================
// 5. INDOOR ARMOURY FURNISHING (Ground Floor X: 9..14, Z: 3..10)
// =========================================================================
// Weapon Racks & Weapon Displays (West interior wall)
b.set(9, 1, 3, 'minecraft:chiseled_bookshelf');
b.set(9, 2, 3, 'minecraft:lantern[hanging=false]');
b.set(9, 1, 4, 'minecraft:crafting_table');
b.set(9, 1, 5, 'minecraft:fletching_table');

// Secure Double Chest for Weapons & Ingots (X: 9, Z: 8..9)
// Solid floor at Y=0, clear air above at Y=2 for lid opening!
b.set(9, 1, 8, 'minecraft:chest[type=right,facing=east]');
b.set(9, 1, 9, 'minecraft:chest[type=left,facing=east]');
b.set(9, 2, 8, 'minecraft:air'); // clearance verified
b.set(9, 2, 9, 'minecraft:air'); // clearance verified

// Armor Display Stands (East interior wall)
b.set(14, 1, 3, 'minecraft:smooth_stone_slab[type=bottom]');
b.set(14, 2, 3, 'minecraft:armor_stand');
b.set(14, 1, 5, 'minecraft:smooth_stone_slab[type=bottom]');
b.set(14, 2, 5, 'minecraft:armor_stand');

// Central Chandelier in Armoury (Y = 4)
b.set(11, 5, 6, 'minecraft:chain');
b.set(11, 4, 6, 'minecraft:lantern[hanging=true]');

// =========================================================================
// 6. STAIRCASE TO UPPER LOFT (X: 13..14, Z: 7..10)
// 100% Collision-Safe with 2.0+ Blocks Continuous Headroom
// =========================================================================
// Step 1 (Z = 7, Y = 1)
b.set(13, 1, 7, 'minecraft:spruce_stairs[half=bottom,facing=south]');
b.box(13, 2, 7, 13, 4, 7, 'minecraft:air'); // Headroom

// Step 2 (Z = 8, Y = 2)
b.set(13, 2, 8, 'minecraft:spruce_stairs[half=bottom,facing=south]');
b.set(13, 1, 8, 'minecraft:spruce_planks');
b.box(13, 3, 8, 13, 5, 8, 'minecraft:air'); // Headroom

// Step 3 (Z = 9, Y = 3)
b.set(13, 3, 9, 'minecraft:spruce_stairs[half=bottom,facing=south]');
b.box(13, 1, 9, 13, 2, 9, 'minecraft:spruce_planks');
b.box(13, 4, 9, 13, 6, 9, 'minecraft:air'); // Headroom

// Turning Landing (Z = 10, X = 13..14 at Y = 4)
b.box(13, 4, 10, 14, 4, 10, 'minecraft:spruce_planks');
b.box(13, 1, 10, 14, 3, 10, 'minecraft:spruce_planks');
b.box(13, 5, 10, 14, 7, 10, 'minecraft:air'); // Full 3-block landing headroom!

// Final Top Step to Loft Floor (X = 14, Z = 9 at Y = 5)
b.set(14, 5, 9, 'minecraft:spruce_stairs[half=bottom,facing=north]');
b.box(14, 1, 9, 14, 4, 9, 'minecraft:spruce_planks');
b.box(14, 6, 9, 14, 8, 9, 'minecraft:air'); // Loft arrival headroom!

// Safe Stair Guardrail at Y = 6
b.set(12, 6, 7, 'minecraft:spruce_fence');
b.set(12, 6, 8, 'minecraft:spruce_fence');
b.set(12, 6, 9, 'minecraft:spruce_fence');
b.set(12, 6, 10, 'minecraft:spruce_fence');

// =========================================================================
// 7. UPPER LOFT LIVING QUARTERS (Floor 2: Y = 5..9, X: 8..15, Z: 2..11)
// =========================================================================
// Loft Floor Subfloor (Y = 5, cut out around stairwell)
for (let x = 8; x <= 15; x++) {
  for (let z = 2; z <= 11; z++) {
    // Leave stairwell void open!
    if (x >= 13 && z >= 7) continue;
    b.set(x, 5, z, 'minecraft:spruce_planks');
  }
}

// Loft Walls (Y: 6..8)
// Gable end walls at Z = 2 and Z = 11
for (let x = 8; x <= 15; x++) {
  b.set(x, 6, 2, (x % 2 === 0) ? 'minecraft:white_terracotta' : 'minecraft:calcite');
  b.set(x, 7, 2, 'minecraft:white_terracotta');
  b.set(x, 8, 2, 'minecraft:white_terracotta');

  b.set(x, 6, 11, (x % 2 === 0) ? 'minecraft:calcite' : 'minecraft:white_terracotta');
  b.set(x, 7, 11, 'minecraft:white_terracotta');
  b.set(x, 8, 11, 'minecraft:white_terracotta');
}

// Front Dormer Window (Z = 2, X: 11..12 at Y = 6..7)
b.set(11, 6, 2, 'minecraft:glass_pane');
b.set(12, 6, 2, 'minecraft:glass_pane');
b.set(11, 7, 2, 'minecraft:glass_pane');
b.set(12, 7, 2, 'minecraft:glass_pane');
b.set(10, 6, 2, 'minecraft:spruce_trapdoor[facing=north,open=true]');
b.set(13, 6, 2, 'minecraft:spruce_trapdoor[facing=north,open=true]');

// Back Loft Window (Z = 11, X: 11..12 at Y = 6..7)
b.set(11, 6, 11, 'minecraft:glass_pane');
b.set(12, 6, 11, 'minecraft:glass_pane');

// Blacksmith's Bunk Bed Alcove (X: 9, Z: 3..4 at Y = 6)
// Solid floor verified underneath both halves!
b.set(9, 6, 3, 'minecraft:red_bed[facing=south,part=head]');
b.set(9, 6, 4, 'minecraft:red_bed[facing=south,part=foot]');

// Bedside Nightstand & Lantern
b.set(9, 6, 2, 'minecraft:barrel');
b.set(9, 7, 2, 'minecraft:lantern[hanging=false]');

// Study Desk & Bookshelf (X: 13..14, Z: 3..4)
b.set(13, 6, 3, 'minecraft:spruce_stairs[half=top,facing=south]'); // Desk surface
b.set(14, 6, 3, 'minecraft:chiseled_bookshelf');
b.set(13, 7, 3, 'minecraft:flower_pot');
b.set(14, 7, 3, 'minecraft:candle[lit=true]');

// Personal Supply Chest (X: 9, Z: 6) with clear air overhead at Y = 7
b.set(9, 6, 6, 'minecraft:chest[type=single,facing=east]');
b.set(9, 7, 6, 'minecraft:air');

// Loft Ceiling Lanterns hanging from tie-beams
b.set(11, 8, 5, 'minecraft:lantern[hanging=true]');
b.set(11, 8, 8, 'minecraft:lantern[hanging=true]');

// =========================================================================
// 8. DUAL-PITCHED GABLE ROOF & OVERHANGING EAVES (Y: 5..13)
// =========================================================================
// A. Forge Pavilion Roof (X: 0..8, Z: 0..13)
// Pitched along X axis, sloping down toward west (X = 0)
for (let z = 0; z <= 13; z++) {
  // Eave overhang at X = 0 (Y = 4 with upside down stairs bracket below at Y = 3)
  b.set(0, 4, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
  b.set(0, 3, z, 'minecraft:deepslate_tile_stairs[half=top,facing=west]');

  // Sloping rafters
  b.set(1, 5, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(2, 5, z, 'minecraft:dark_oak_planks');
  b.set(3, 6, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(4, 6, z, 'minecraft:dark_oak_planks');
  b.set(5, 7, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(6, 7, z, 'minecraft:dark_oak_planks');
  b.set(7, 8, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(8, 8, z, 'minecraft:dark_oak_planks');

  // Deepslate tile decorative trim along gable ends (Z = 0 and Z = 13)
  if (z === 0 || z === 13) {
    b.set(1, 5, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(3, 6, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(5, 7, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(7, 8, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
  }
}

// B. Main Hall Gable Roof (X: 7..16, Z: 1..12)
// High steep symmetrical A-frame roof centered along X = 11..12
for (let z = 1; z <= 12; z++) {
  // Overhang at West (X = 7, Y = 8)
  b.set(7, 8, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
  b.set(7, 7, z, 'minecraft:deepslate_tile_stairs[half=top,facing=west]');

  // Overhang at East (X = 16, Y = 8)
  b.set(16, 8, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east]');
  b.set(16, 7, z, 'minecraft:deepslate_tile_stairs[half=top,facing=east]');

  // Slope up from West
  b.set(8, 9, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(9, 10, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(10, 11, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');

  // Ridge Peak (X: 11..12 at Y = 12)
  b.set(11, 12, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west]');
  b.set(12, 12, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east]');

  // Slope down to East
  b.set(13, 11, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east]');
  b.set(14, 10, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east]');
  b.set(15, 9, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east]');

  // Contrasting Deepslate Tile bargeboard trim on front & back gables (Z = 1 and Z = 12)
  if (z === 1 || z === 12) {
    b.set(8, 9, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(9, 10, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(10, 11, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(11, 12, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west]');
    b.set(12, 12, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east]');
    b.set(13, 11, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east]');
    b.set(14, 10, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east]');
    b.set(15, 9, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east]');
  }
}

// Gable peak ornamental slab crest (Y = 13, X = 11..12, Z: 1..12)
for (let z = 1; z <= 12; z++) {
  b.set(11, 13, z, 'minecraft:deepslate_tile_slab[type=bottom]');
  b.set(12, 13, z, 'minecraft:deepslate_tile_slab[type=bottom]');
}

// Re-verify Chimney Flue through roof structure (X: 3..4, Z: 3..4 up to Y = 13)
b.box(3, 5, 3, 4, 12, 4, 'minecraft:stone_bricks');
b.set(3, 13, 3, 'minecraft:stone_brick_wall');
b.set(4, 13, 3, 'minecraft:stone_brick_wall');
b.set(3, 13, 4, 'minecraft:stone_brick_wall');
b.set(4, 13, 4, 'minecraft:stone_brick_wall');
b.set(3, 12, 3, 'minecraft:campfire[lit=true]'); // Chimney smoke generator

// =========================================================================
// 9. EXPORT & STATS CALCULATION
// =========================================================================
const schemBuffer = b.toSpongeSchematic();
const litematicBuffer = b.toLitematic('Medieval Village Blacksmith', 'MineVault Studio');

const schemPath = path.join(downloadsDir, 'medieval_blacksmith_armoury.schem');
const litematicPath = path.join(downloadsDir, 'medieval_blacksmith_armoury.litematic');

fs.writeFileSync(schemPath, schemBuffer);
fs.writeFileSync(litematicPath, litematicBuffer);

const { totalBlocks, materials } = b.countMaterials();

// Consolidate materials by clean name to avoid duplicate rows from different blockstates
const consolidated = {};
for (const m of materials) {
  consolidated[m.name] = (consolidated[m.name] || 0) + m.count;
}
const sortedMats = Object.entries(consolidated)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 15);

console.log(`Generated .schem successfully: ${schemPath} (${(schemBuffer.length / 1024).toFixed(2)} KB)`);
console.log(`Generated .litematic successfully: ${litematicPath} (${(litematicBuffer.length / 1024).toFixed(2)} KB)`);
console.log(`Total non-air blocks: ${totalBlocks}`);
console.log('\nTop 15 Materials:');
console.log(JSON.stringify(sortedMats, null, 2));

// Export material array for schematics.json
fs.writeFileSync(
  path.join(__dirname, 'build2_materials.json'),
  JSON.stringify({
    dimensions: { width: W, height: H, length: L },
    blockCount: totalBlocks,
    schemSize: `${(schemBuffer.length / 1024).toFixed(1)} KB`,
    litematicSize: `${(litematicBuffer.length / 1024).toFixed(1)} KB`,
    materials: sortedMats
  }, null, 2)
);
