const fs = require('fs');
const path = require('path');
const { VoxelArchitect } = require('./voxel_architect');

console.log('=== Rebuilding Build #2: Medieval Village Blacksmith & Armoury (Master Reference Edition) ===\n');

const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

// Dimensions: 18 wide (X: 0..17), 15 tall (Y: 0..14), 15 deep (Z: 0..14)
const W = 18, H = 15, L = 15;
const b = new VoxelArchitect(W, H, L);

// Helper for glass panes with directional connection properties
const GP_EW = 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]';
const GP_NS = 'minecraft:glass_pane[north=true,south=true,east=false,west=false,waterlogged=false]';

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

// Outdoor gravel & cobblestone apron around forge (X: 0..8, Z: 0..14)
for (let x = 0; x <= 8; x++) {
  for (let z = 0; z <= 14; z++) {
    if (x === 0 || z === 0 || z === 14) {
      b.set(x, 0, z, (x + z) % 2 === 0 ? 'minecraft:gravel' : 'minecraft:cobblestone');
    }
  }
}

// Interior Armoury Floor (X: 8..16, Z: 2..12 at Y = 0)
b.box(8, 0, 2, 16, 0, 12, 'minecraft:spruce_planks');

// Red carpet runner down central aisle of Armoury (X: 11..12, Z: 3..10 at Y = 1)
for (let z = 3; z <= 10; z++) {
  b.set(11, 1, z, 'minecraft:red_carpet');
}

// =========================================================================
// 2. TIMBER FRAME & LOAD-BEARING PILLARS (Ground to Roof)
// =========================================================================
// Structural posts using stripped dark oak logs (axis=y)
const pillars = [
  // Forge Canopy posts (open air)
  { x: 1, z: 1, top: 5 },
  { x: 7, z: 1, top: 5 },
  { x: 1, z: 6, top: 5 },
  { x: 1, z: 13, top: 5 },
  { x: 7, z: 13, top: 5 },

  // Armoury Main Hall posts
  { x: 8, z: 2, top: 9 },
  { x: 16, z: 2, top: 9 },
  { x: 8, z: 7, top: 9 },
  { x: 16, z: 7, top: 9 },
  { x: 8, z: 12, top: 9 },
  { x: 16, z: 12, top: 9 },

  // Entrance door jamb posts
  { x: 11, z: 2, top: 5 },
  { x: 13, z: 2, top: 5 }
];

pillars.forEach(p => {
  b.box(p.x, 1, p.z, p.x, p.top, p.z, 'minecraft:stripped_dark_oak_log[axis=y]');
});

// Stone brick foundation bases under exterior pillars (Y = 1)
b.set(1, 1, 1, 'minecraft:stone_bricks');
b.set(7, 1, 1, 'minecraft:stone_bricks');
b.set(1, 1, 6, 'minecraft:stone_bricks');
b.set(1, 1, 13, 'minecraft:stone_bricks');
b.set(7, 1, 13, 'minecraft:stone_bricks');
b.set(8, 1, 2, 'minecraft:stone_bricks');
b.set(16, 1, 2, 'minecraft:stone_bricks');
b.set(16, 1, 7, 'minecraft:stone_bricks');
b.set(8, 1, 12, 'minecraft:stone_bricks');
b.set(16, 1, 12, 'minecraft:stone_bricks');

// Horizontal timber tie-beams at Y = 5 (Ground ceiling / lintel line)
b.box(1, 5, 1, 7, 5, 1, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(1, 5, 13, 7, 5, 13, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(1, 5, 1, 1, 5, 13, 'minecraft:stripped_dark_oak_wood[axis=z]');
b.box(7, 5, 1, 7, 5, 13, 'minecraft:stripped_dark_oak_wood[axis=z]');

b.box(8, 5, 2, 16, 5, 2, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(8, 5, 12, 16, 5, 12, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(8, 5, 2, 8, 5, 12, 'minecraft:stripped_dark_oak_wood[axis=z]');
b.box(16, 5, 2, 16, 5, 12, 'minecraft:stripped_dark_oak_wood[axis=z]');

// Upper floor horizontal timber tie-beams at Y = 9 (Loft eaves line)
b.box(8, 9, 2, 16, 9, 2, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(8, 9, 12, 16, 9, 12, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(8, 9, 2, 8, 9, 12, 'minecraft:stripped_dark_oak_wood[axis=z]');
b.box(16, 9, 2, 16, 9, 12, 'minecraft:stripped_dark_oak_wood[axis=z]');

// Cross collar ties across loft ceiling at Y = 10 (reinforces rafters)
b.box(8, 10, 5, 16, 10, 5, 'minecraft:stripped_dark_oak_wood[axis=x]');
b.box(8, 10, 9, 16, 10, 9, 'minecraft:stripped_dark_oak_wood[axis=x]');

// =========================================================================
// 3. GROUND FLOOR ENCLOSURE & WALLS (Y: 1..5)
// =========================================================================
// A. Dividing wall between Forge & Armoury (X = 8, Z: 2..12)
for (let z = 2; z <= 12; z++) {
  // Lower foundation wall
  b.set(8, 1, z, (z % 2 === 0) ? 'minecraft:stone_bricks' : 'minecraft:cracked_stone_bricks');
  b.set(8, 2, z, 'minecraft:stone_bricks');
  // Upper plaster
  b.set(8, 3, z, (z % 2 === 0) ? 'minecraft:white_terracotta' : 'minecraft:calcite');
  b.set(8, 4, z, 'minecraft:white_terracotta');
}

// B. East exterior wall (X = 16, Z: 2..12)
for (let z = 2; z <= 12; z++) {
  b.set(16, 1, z, (z % 3 === 0) ? 'minecraft:mossy_stone_bricks' : 'minecraft:stone_bricks');
  b.set(16, 2, z, 'minecraft:stone_bricks');
  b.set(16, 3, z, (z % 2 === 0) ? 'minecraft:calcite' : 'minecraft:white_terracotta');
  b.set(16, 4, z, 'minecraft:white_terracotta');
}

// C. South exterior wall (Z = 12, X: 8..16)
for (let x = 8; x <= 16; x++) {
  b.set(x, 1, 12, 'minecraft:stone_bricks');
  b.set(x, 2, 12, 'minecraft:stone_bricks');
  b.set(x, 3, 12, 'minecraft:white_terracotta');
  b.set(x, 4, 12, 'minecraft:calcite');
}

// D. North exterior wall (Z = 2, X: 8..16)
for (let x = 8; x <= 16; x++) {
  b.set(x, 1, 2, 'minecraft:stone_bricks');
  b.set(x, 2, 2, 'minecraft:stone_bricks');
  b.set(x, 3, 2, 'minecraft:white_terracotta');
  b.set(x, 4, 2, 'minecraft:white_terracotta');
}

// =========================================================================
// 4. AUTHENTIC DOORS & ARCHWAYS (100% Wooden, Zero Iron / Zero Buttons!)
// =========================================================================
// A. Front Main Entrance (X = 12, Z = 2)
// Flush threshold: stone brick step at Z=1 leading seamlessly into spruce planks
b.set(12, 0, 1, 'minecraft:stone_brick_stairs[half=bottom,facing=south,shape=straight]');
b.set(12, 0, 2, 'minecraft:spruce_planks'); // Solid threshold under door

// Authentic Spruce Door with full 1.20+ blockstates
b.set(12, 1, 2, 'minecraft:spruce_door[facing=north,half=lower,hinge=left,open=false,powered=false]');
b.set(12, 2, 2, 'minecraft:spruce_door[facing=north,half=upper,hinge=left,open=false,powered=false]');
// Inverted stair arch lintel directly above door
b.set(12, 3, 2, 'minecraft:spruce_stairs[half=top,facing=north,shape=straight]');
b.set(12, 4, 2, 'minecraft:white_terracotta');

// Welcoming exterior porch lantern on timber post
b.set(11, 2, 1, 'minecraft:lantern[hanging=false,waterlogged=false]');

// B. Connecting Archway Between Forge & Armoury (X = 8, Z: 5..6)
// A grand 2-wide open timber & stone archway for smooth, natural movement!
b.box(8, 1, 5, 8, 3, 6, 'minecraft:air'); // Open walking passage!
// Archway inverted stairs lintels
b.set(8, 3, 5, 'minecraft:stone_brick_stairs[half=top,facing=south,shape=straight]');
b.set(8, 3, 6, 'minecraft:stone_brick_stairs[half=top,facing=north,shape=straight]');
b.set(8, 4, 5, 'minecraft:stripped_dark_oak_wood[axis=z]');
b.set(8, 4, 6, 'minecraft:stripped_dark_oak_wood[axis=z]');

// =========================================================================
// 5. WINDOWS & PROPERLY CONNECTED DIRECTIONAL GLASS PANES
// =========================================================================
// East Wall Windows (in North-South wall X = 16):
// Window 1 (Z = 4..5, Y = 2..3)
b.set(16, 1, 4, 'minecraft:stone_bricks');
b.set(16, 1, 5, 'minecraft:stone_bricks');
b.set(16, 2, 4, GP_NS);
b.set(16, 3, 4, GP_NS);
b.set(16, 2, 5, GP_NS);
b.set(16, 3, 5, GP_NS);
b.set(16, 4, 4, 'minecraft:spruce_stairs[half=top,facing=east,shape=straight]');
b.set(16, 4, 5, 'minecraft:spruce_stairs[half=top,facing=east,shape=straight]');
// Window shutters
b.set(16, 2, 3, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,powered=false,waterlogged=false]');
b.set(16, 2, 6, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,powered=false,waterlogged=false]');

// Window 2 (Z = 9..10, Y = 2..3)
b.set(16, 1, 9, 'minecraft:stone_bricks');
b.set(16, 1, 10, 'minecraft:stone_bricks');
b.set(16, 2, 9, GP_NS);
b.set(16, 3, 9, GP_NS);
b.set(16, 2, 10, GP_NS);
b.set(16, 3, 10, GP_NS);
b.set(16, 4, 9, 'minecraft:spruce_stairs[half=top,facing=east,shape=straight]');
b.set(16, 4, 10, 'minecraft:spruce_stairs[half=top,facing=east,shape=straight]');

// North Wall Window (in East-West wall Z = 2, X = 14..15)
b.set(14, 2, 2, GP_EW);
b.set(15, 2, 2, GP_EW);
b.set(14, 3, 2, GP_EW);
b.set(15, 3, 2, GP_EW);

// South Wall Window (in East-West wall Z = 12, X = 11..12)
b.set(11, 2, 12, GP_EW);
b.set(12, 2, 12, GP_EW);
b.set(11, 3, 12, GP_EW);
b.set(12, 3, 12, GP_EW);

// =========================================================================
// 6. THE FORGE & SMELTERY (West Wing: X: 1..7, Z: 1..13)
// =========================================================================
// Forge Hearth & Deepslate Crucible Base (X: 2..5, Z: 2..5)
b.box(2, 1, 2, 5, 1, 5, 'minecraft:deepslate_bricks');
b.box(2, 2, 2, 5, 2, 5, 'minecraft:deepslate_bricks');

// Active Molten Lava Crucible
b.set(3, 1, 3, 'minecraft:lava[level=0]');
b.set(4, 1, 3, 'minecraft:lava[level=0]');
b.set(3, 1, 4, 'minecraft:lava[level=0]');
b.set(4, 1, 4, 'minecraft:lava[level=0]');

// Protective Safety Iron Bars in front of the crucible
b.set(3, 2, 2, 'minecraft:iron_bars[east=true,west=true,north=false,south=true,waterlogged=false]');
b.set(4, 2, 2, 'minecraft:iron_bars[east=true,west=true,north=false,south=true,waterlogged=false]');

// Twin Active Blast Furnaces flanking the crucible
b.set(2, 2, 3, 'minecraft:blast_furnace[facing=east,lit=true]');
b.set(5, 2, 3, 'minecraft:blast_furnace[facing=west,lit=true]');

// Forge Hood intake at Y = 3..4
b.set(2, 3, 2, 'minecraft:deepslate_tile_stairs[half=top,facing=south,shape=straight]');
b.set(3, 3, 2, 'minecraft:deepslate_tile_stairs[half=top,facing=south,shape=straight]');
b.set(4, 3, 2, 'minecraft:deepslate_tile_stairs[half=top,facing=south,shape=straight]');
b.set(5, 3, 2, 'minecraft:deepslate_tile_stairs[half=top,facing=south,shape=straight]');
b.box(2, 4, 2, 5, 4, 5, 'minecraft:deepslate_bricks');

// Heavy Chimney Stack (X: 3..4, Z: 3..4, rising up to Y = 14)
b.box(3, 5, 3, 4, 13, 4, 'minecraft:stone_bricks');
// Chimney Cap with active campfire smoke column
b.set(3, 13, 3, 'minecraft:campfire[lit=true,waterlogged=false]');
b.set(4, 13, 3, 'minecraft:stone_brick_wall');
b.set(3, 13, 4, 'minecraft:stone_brick_wall');
b.set(4, 13, 4, 'minecraft:stone_brick_wall');
b.set(3, 14, 3, 'minecraft:stone_brick_slab[type=bottom]');

// Smithing Workstations in the open forge
b.set(3, 1, 7, 'minecraft:anvil[facing=north]');
b.set(5, 1, 7, 'minecraft:grindstone[facing=west,face=floor]');
b.set(2, 1, 7, 'minecraft:smithing_table');

// Quenching Water Trough with wall-mounted tripwire hook faucet
b.set(2, 1, 9, 'minecraft:cauldron[level=3]');
b.set(2, 2, 9, 'minecraft:tripwire_hook[facing=south,attached=true]');

// Raw Materials Storage Barrels & Mineral Bins
b.set(2, 1, 11, 'minecraft:barrel[facing=up]');
b.set(2, 2, 11, 'minecraft:barrel[facing=up]');
b.set(3, 1, 11, 'minecraft:raw_iron_block');
b.set(4, 1, 11, 'minecraft:coal_block');

// Forge ceiling lantern
b.set(4, 5, 8, 'minecraft:chain[axis=y]');
b.set(4, 4, 8, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =========================================================================
// 7. INDOOR ARMOURY FURNISHINGS (Ground Floor X: 9..15, Z: 3..11)
// =========================================================================
// Weapon Racks & Weapon Displays (West interior wall)
b.set(9, 1, 3, 'minecraft:chiseled_bookshelf[facing=east]');
b.set(9, 2, 3, 'minecraft:lantern[hanging=false,waterlogged=false]');
b.set(9, 1, 4, 'minecraft:crafting_table');
b.set(9, 1, 7, 'minecraft:fletching_table');

// Large Secure Chest for Weapons & Ingots (X: 9, Z: 9..10)
// Solid floor at Y=0, clear air directly overhead at Y=2 for lid clearance!
b.set(9, 1, 9, 'minecraft:chest[type=right,facing=east,waterlogged=false]');
b.set(9, 1, 10, 'minecraft:chest[type=left,facing=east,waterlogged=false]');
b.set(9, 2, 9, 'minecraft:air');
b.set(9, 2, 10, 'minecraft:air');

// Armor Display Stands on polished stone plinths (East interior wall)
b.set(15, 1, 3, 'minecraft:smooth_stone_slab[type=bottom]');
b.set(15, 2, 3, 'minecraft:armor_stand');
b.set(15, 1, 6, 'minecraft:smooth_stone_slab[type=bottom]');
b.set(15, 2, 6, 'minecraft:armor_stand');

// Central Chandelier in Armoury
b.set(12, 5, 7, 'minecraft:chain[axis=y]');
b.set(12, 4, 7, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =========================================================================
// 8. FLAWLESS STAIRCASE TO LOFT (Climbing towards Center Ridge)
// 100% Collision-Safe, Continuous 3-Block Headroom, Wide Open Landing!
// =========================================================================
// The staircase ascends North along X = 15, then steps seamlessly into the open loft:
// Step 1 (X = 15, Z = 11, Y = 1)
b.set(15, 1, 11, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(15, 0, 11, 'minecraft:spruce_planks');
b.box(15, 2, 11, 15, 5, 11, 'minecraft:air'); // Headroom

// Step 2 (X = 15, Z = 10, Y = 2)
b.set(15, 2, 10, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(15, 1, 10, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Finished reverse underside!
b.box(15, 3, 10, 15, 6, 10, 'minecraft:air'); // Headroom

// Step 3 (X = 15, Z = 9, Y = 3)
b.set(15, 3, 9, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(15, 2, 9, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Reverse underside!
b.box(15, 4, 9, 15, 7, 9, 'minecraft:air'); // Headroom

// Step 4 (X = 15, Z = 8, Y = 4)
b.set(15, 4, 8, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(15, 3, 8, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Reverse underside!
b.box(15, 5, 8, 15, 8, 8, 'minecraft:air'); // Headroom

// Turning Landing (X = 14..15, Z = 7 at Y = 5)
// Solid floor at Y=5 with full 3.5 blocks of vertical headroom!
b.box(14, 5, 7, 15, 5, 7, 'minecraft:spruce_planks');
b.box(14, 6, 7, 15, 9, 7, 'minecraft:air'); // Huge open turning headroom!

// Final Top Step into Central Loft Floor (X = 13, Z = 7 at Y = 6)
// Steps WEST directly toward the center ridge (X = 12) into the open room!
b.set(13, 6, 7, 'minecraft:spruce_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
b.set(13, 5, 7, 'minecraft:spruce_planks');
b.box(13, 7, 7, 13, 10, 7, 'minecraft:air'); // 4 blocks of headroom at ridge!

// Safe Protective Guardrail along stairwell edge at Y = 6
b.set(14, 6, 8, 'minecraft:spruce_fence');
b.set(14, 6, 9, 'minecraft:spruce_fence');
b.set(14, 6, 10, 'minecraft:spruce_fence');
b.set(14, 6, 11, 'minecraft:spruce_fence');

// =========================================================================
// 9. UPPER LOFT RESIDENTIAL LIVING QUARTERS (Floor 2: Y = 5..9)
// Fully Enclosed with Walls, Windows & High Rafters
// =========================================================================
// Loft Floor Subfloor (Y = 5, cut out cleanly around the stairwell)
for (let x = 8; x <= 16; x++) {
  for (let z = 2; z <= 12; z++) {
    // Leave stairwell void open!
    if (x >= 14 && z >= 8 && z <= 11) continue;
    b.set(x, 5, z, 'minecraft:spruce_planks');
  }
}

// Side Exterior Walls of the Loft (Y: 6..8):
// A. East Wall (X = 16, Z: 2..12) - Fully enclosed!
for (let z = 2; z <= 12; z++) {
  b.set(16, 6, z, (z % 2 === 0) ? 'minecraft:white_terracotta' : 'minecraft:calcite');
  b.set(16, 7, z, 'minecraft:white_terracotta');
  b.set(16, 8, z, 'minecraft:white_terracotta');
}

// B. West Wall (X = 8, Z: 2..12) - Fully enclosed!
for (let z = 2; z <= 12; z++) {
  b.set(8, 6, z, (z % 2 === 0) ? 'minecraft:calcite' : 'minecraft:white_terracotta');
  b.set(8, 7, z, 'minecraft:white_terracotta');
  b.set(8, 8, z, 'minecraft:white_terracotta');
}

// C. Front Gable Wall (Z = 2, X: 8..16) - Infill up to roof ridge!
for (let x = 8; x <= 16; x++) {
  b.set(x, 6, 2, 'minecraft:white_terracotta');
  b.set(x, 7, 2, 'minecraft:white_terracotta');
  b.set(x, 8, 2, 'minecraft:white_terracotta');
  b.set(x, 9, 2, (x % 2 === 0) ? 'minecraft:calcite' : 'minecraft:white_terracotta');
}
// Gable peak triangular infill (Z = 2)
b.box(9, 10, 2, 15, 10, 2, 'minecraft:white_terracotta');
b.box(10, 11, 2, 14, 11, 2, 'minecraft:white_terracotta');
b.box(11, 12, 2, 13, 12, 2, 'minecraft:white_terracotta');

// D. Back Gable Wall (Z = 12, X: 8..16) - Infill up to roof ridge!
for (let x = 8; x <= 16; x++) {
  b.set(x, 6, 12, 'minecraft:white_terracotta');
  b.set(x, 7, 12, 'minecraft:white_terracotta');
  b.set(x, 8, 12, 'minecraft:white_terracotta');
  b.set(x, 9, 12, (x % 2 === 0) ? 'minecraft:calcite' : 'minecraft:white_terracotta');
}
// Gable peak triangular infill (Z = 12)
b.box(9, 10, 12, 15, 10, 12, 'minecraft:white_terracotta');
b.box(10, 11, 12, 14, 11, 12, 'minecraft:white_terracotta');
b.box(11, 12, 12, 13, 12, 12, 'minecraft:white_terracotta');

// Front Gable Dormer Window (Z = 2, X: 11..13 at Y = 7..8)
b.set(11, 7, 2, GP_EW);
b.set(12, 7, 2, GP_EW);
b.set(13, 7, 2, GP_EW);
b.set(11, 8, 2, GP_EW);
b.set(12, 8, 2, GP_EW);
b.set(13, 8, 2, GP_EW);
// Exterior Dormer Shutters
b.set(10, 7, 2, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]');
b.set(14, 7, 2, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]');

// Back Loft Window (Z = 12, X: 11..13 at Y = 7..8)
b.set(11, 7, 12, GP_EW);
b.set(12, 7, 12, GP_EW);
b.set(13, 7, 12, GP_EW);

// Blacksmith's Supported Bed Alcove (X: 9..10, Z: 3..4 at Y = 6)
// Solid floor verified underneath both halves!
b.set(9, 6, 3, 'minecraft:red_bed[facing=south,part=head]');
b.set(9, 6, 4, 'minecraft:red_bed[facing=south,part=foot]');

// Bedside Nightstand & Standing Lantern
b.set(9, 6, 2, 'minecraft:barrel[facing=up]');
b.set(9, 7, 2, 'minecraft:lantern[hanging=false,waterlogged=false]');

// Study Desk & Chiseled Bookshelf (X: 9..10, Z: 10..11)
b.set(9, 6, 10, 'minecraft:spruce_stairs[half=top,facing=east,shape=straight]');
b.set(9, 6, 11, 'minecraft:chiseled_bookshelf[facing=east]');
b.set(9, 7, 10, 'minecraft:flower_pot');
b.set(9, 7, 11, 'minecraft:candle[lit=true]');

// Personal Storage Chest with clear open space above!
b.set(9, 6, 7, 'minecraft:chest[type=single,facing=east,waterlogged=false]');
b.set(9, 7, 7, 'minecraft:air');

// High Loft Ceiling Lanterns hanging from tie-beams
b.set(12, 10, 5, 'minecraft:chain[axis=y]');
b.set(12, 9, 5, 'minecraft:lantern[hanging=true,waterlogged=false]');
b.set(12, 10, 9, 'minecraft:chain[axis=y]');
b.set(12, 9, 9, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =========================================================================
// 10. DUAL-PITCHED GABLE ROOF & OVERHANGING EAVES (Y: 5..14)
// =========================================================================
// A. Forge Pavilion Shed Roof (X: 0..8, Z: 0..14)
// Rises smoothly from West (X = 0) to East (X = 8)
for (let z = 0; z <= 14; z++) {
  // Overhang at West (X = 0)
  b.set(0, 4, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
  b.set(0, 3, z, 'minecraft:deepslate_tile_stairs[half=top,facing=west,shape=straight]');

  // Sloping rafters
  b.set(1, 5, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(2, 5, z, 'minecraft:dark_oak_planks');
  b.set(3, 6, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(4, 6, z, 'minecraft:dark_oak_planks');
  b.set(5, 7, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(6, 7, z, 'minecraft:dark_oak_planks');
  b.set(7, 8, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(8, 8, z, 'minecraft:dark_oak_planks');

  // Contrasting Deepslate Tile bargeboard trim on front & back gables (Z = 0 and Z = 14)
  if (z === 0 || z === 14) {
    b.set(1, 5, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(3, 6, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(5, 7, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(7, 8, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
  }
}

// B. Main Hall Steep Symmetrical A-Frame Gable Roof (X: 7..17, Z: 1..13)
// Peak centered at X = 12..13 at Y = 13
for (let z = 1; z <= 13; z++) {
  // Overhang at West (X = 7, Y = 8)
  b.set(7, 8, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
  b.set(7, 7, z, 'minecraft:deepslate_tile_stairs[half=top,facing=west,shape=straight]');

  // Overhang at East (X = 17, Y = 8)
  b.set(17, 8, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east,shape=straight]');
  b.set(17, 7, z, 'minecraft:deepslate_tile_stairs[half=top,facing=east,shape=straight]');

  // West Slope Rafters
  b.set(8, 9, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(8, 8, z, 'minecraft:dark_oak_stairs[half=top,facing=east,shape=straight]'); // Finished underside!

  b.set(9, 10, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(9, 9, z, 'minecraft:dark_oak_stairs[half=top,facing=east,shape=straight]');

  b.set(10, 11, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(10, 10, z, 'minecraft:dark_oak_stairs[half=top,facing=east,shape=straight]');

  b.set(11, 12, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(11, 11, z, 'minecraft:dark_oak_stairs[half=top,facing=east,shape=straight]');

  // Ridge Peak (X = 12..13 at Y = 13)
  b.set(12, 13, z, 'minecraft:dark_oak_stairs[half=bottom,facing=west,shape=straight]');
  b.set(13, 13, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east,shape=straight]');

  // East Slope Rafters
  b.set(14, 12, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east,shape=straight]');
  b.set(14, 11, z, 'minecraft:dark_oak_stairs[half=top,facing=west,shape=straight]');

  b.set(15, 11, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east,shape=straight]');
  b.set(15, 10, z, 'minecraft:dark_oak_stairs[half=top,facing=west,shape=straight]');

  b.set(16, 10, z, 'minecraft:dark_oak_stairs[half=bottom,facing=east,shape=straight]');
  b.set(16, 9, z, 'minecraft:dark_oak_stairs[half=top,facing=west,shape=straight]');

  // Contrasting Deepslate Tile bargeboard trim on front & back gables (Z = 1 and Z = 13)
  if (z === 1 || z === 13) {
    b.set(8, 9, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(9, 10, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(10, 11, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(11, 12, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(12, 13, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=west,shape=straight]');
    b.set(13, 13, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east,shape=straight]');
    b.set(14, 12, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east,shape=straight]');
    b.set(15, 11, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east,shape=straight]');
    b.set(16, 10, z, 'minecraft:deepslate_tile_stairs[half=bottom,facing=east,shape=straight]');
  }
}

// Ridge crest ornamental capping slabs (Y = 14, X = 12..13, Z: 1..13)
for (let z = 1; z <= 13; z++) {
  b.set(12, 14, z, 'minecraft:deepslate_tile_slab[type=bottom,waterlogged=false]');
  b.set(13, 14, z, 'minecraft:deepslate_tile_slab[type=bottom,waterlogged=false]');
}

// Re-verify Chimney Flue penetration through roof (X: 3..4, Z: 3..4 up to Y = 14)
b.box(3, 5, 3, 4, 13, 4, 'minecraft:stone_bricks');
b.set(3, 13, 3, 'minecraft:campfire[lit=true,waterlogged=false]'); // Active continuous smoke!
b.set(4, 13, 3, 'minecraft:stone_brick_wall');
b.set(3, 13, 4, 'minecraft:stone_brick_wall');
b.set(4, 13, 4, 'minecraft:stone_brick_wall');
b.set(3, 14, 3, 'minecraft:stone_brick_slab[type=bottom]');

// =========================================================================
// 11. EXPORT TO SCHEMATIC & LITEMATICA
// =========================================================================
const schemBuffer = b.toSpongeSchematic();
const litematicBuffer = b.toLitematic('Medieval Village Blacksmith', 'MineVault Studio');

const schemPath = path.join(downloadsDir, 'medieval_blacksmith_armoury.schem');
const litematicPath = path.join(downloadsDir, 'medieval_blacksmith_armoury.litematic');

fs.writeFileSync(schemPath, schemBuffer);
fs.writeFileSync(litematicPath, litematicBuffer);

const { totalBlocks, materials } = b.countMaterials();

// Consolidate materials by clean name
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
