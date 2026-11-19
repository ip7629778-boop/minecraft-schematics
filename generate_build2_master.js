/**
 * generate_build2_master.js
 * =============================================================================
 * MINEVAULT MASTER SPECIFICATION: BUILD #2 (ORGANIC MASTER EDITION)
 * Medieval Village Blacksmith & Weapons Armoury
 *
 * ARCHITECTURAL SPECIFICATIONS:
 * - Footprint: Asymmetric Cross-Gable / L-Footprint (24 x 21 x 24 blocks)
 *   * Main Workshop & Armoury Hall: X=10..22, Z=4..22
 *   * Open-Air Artisan Forge Wing: X=2..12, Z=8..18
 * - Depth: True 3-Block Multi-Layered Facades
 *   * Outer Proud Log Posts with Stone Plinths
 *   * 1-Block Recessed Weathered Plaster Walls with Diagonal Half-Timbers
 *   * Deep Inset Windows with Directional Panes, Shutters & Living Flower Boxes
 * - Roof: Dynamic Catenary Gothic Curving Double-Gable Roof with Flared Eaves,
 *         Central Sag, Overhanging Bargeboards & Cascading Foliage Overgrowth
 * - Chimney: Heavy Tapered Stone Masonry Chimney Breast rising from Y=0 to Y=19
 *            with Embedded Blast Furnaces & Active Sky Smoke Plume
 * - Interior: Dense Lived-In Medieval Artisan Workshop & Armoury:
 *   * Ground Floor: Merchant Service Counter, Scales, Armor Plinths, Double Chests
 *   * Staircase: Continuous 3.0-block headroom with reverse stair soffits
 *   * Upper Loft: Master Bed Alcove, Blueprint Draughting Studio & Cathedral Rafters
 * - Landscaping: Weathered Gravel/Dirt Path, Cobblestone Steps, Leaf Hedges & Bushes
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const { VoxelCanvas } = require('./voxel_canvas');

console.log('Generating Organic Master Medieval Blacksmith & Armoury (24x21x24)...');

const WIDTH = 24;
const HEIGHT = 21;
const LENGTH = 24;

const b = new VoxelCanvas(WIDTH, HEIGHT, LENGTH);

// =============================================================================
// PALETTE & TEXTURING HELPERS
// =============================================================================
function getStoneFoundation(x, y, z) {
  const seed = (x * 13 + y * 37 + z * 59) & 0xffff;
  if (y === 0) {
    if (seed % 3 === 0) return 'minecraft:mossy_cobblestone';
    if (seed % 3 === 1) return 'minecraft:cobblestone';
    return 'minecraft:stone_bricks';
  } else if (y === 1) {
    if (seed % 4 === 0) return 'minecraft:cracked_stone_bricks';
    if (seed % 4 === 1) return 'minecraft:mossy_cobblestone';
    if (seed % 4 === 2) return 'minecraft:stone_bricks';
    return 'minecraft:cobblestone';
  } else {
    if (seed % 3 === 0) return 'minecraft:cracked_stone_bricks';
    if (seed % 3 === 1) return 'minecraft:stone_bricks';
    return 'minecraft:stone_bricks';
  }
}

function getPlaster(seed) {
  const val = Math.abs(seed) % 10;
  if (val < 5) return 'minecraft:white_terracotta';
  if (val < 8) return 'minecraft:calcite';
  if (val < 9) return 'minecraft:diorite';
  return 'minecraft:birch_planks'; // exposed wood lath underneath eroded plaster!
}

function getRoofMaterial(seed) {
  const val = Math.abs(seed) % 10;
  if (val < 5) return 'deepslate_tiles';
  if (val < 8) return 'cobbled_deepslate';
  return 'deepslate_bricks';
}

function getRoofStair(seed) {
  const val = Math.abs(seed) % 10;
  if (val < 5) return 'deepslate_tile_stairs';
  if (val < 8) return 'cobbled_deepslate_stairs';
  return 'deepslate_brick_stairs';
}

function getRoofSlab(seed) {
  const val = Math.abs(seed) % 10;
  if (val < 6) return 'deepslate_tile_slab';
  return 'cobbled_deepslate_slab';
}

// =============================================================================
// 1. GROUND TERRAIN, SUNKEN FORGE APRON & PATHWAYS (Y=0)
// =============================================================================
console.log('Phase 1: Sculpting Ground Terrain & Weathered Pathways...');

// Fill baseline ground foundation with grass and dirt
for (let x = 0; x < WIDTH; x++) {
  for (let z = 0; z < LENGTH; z++) {
    b.set(x, 0, z, 'minecraft:dirt');
  }
}

// Surrounding village path curving around the building
const pathCoords = [
  // Front approach leading to entrance at (16, 4)
  [15, 0], [16, 0], [17, 0],
  [15, 1], [16, 1], [17, 1],
  [15, 2], [16, 2], [17, 2],
  [15, 3], [16, 3], [17, 3],
  // Path curving west to the forge pavilion
  [14, 2], [13, 2], [12, 2], [11, 3], [10, 4], [9, 5], [8, 6], [7, 6], [6, 7],
  [5, 7], [4, 7], [3, 7], [2, 7], [1, 7], [1, 8],
  // Western path along the forge
  [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 16], [1, 17],
  [1, 18], [2, 19], [3, 20], [4, 21], [5, 21], [6, 22], [7, 22], [8, 22],
  // Eastern perimeter path
  [22, 1], [23, 2], [23, 3], [23, 4], [23, 5], [23, 6], [23, 7],
  [23, 15], [23, 16], [23, 17], [23, 18], [23, 19], [23, 20], [22, 21], [21, 22]
];

for (const [px, pz] of pathCoords) {
  if (px >= 0 && px < WIDTH && pz >= 0 && pz < LENGTH) {
    const pSeed = (px * 17 + pz * 31) % 6;
    if (pSeed === 0) b.set(px, 0, pz, 'minecraft:gravel');
    else if (pSeed === 1) b.set(px, 0, pz, 'minecraft:coarse_dirt');
    else if (pSeed === 2) b.set(px, 0, pz, 'minecraft:dirt_path');
    else if (pSeed === 3) b.set(px, 0, pz, 'minecraft:cobblestone');
    else b.set(px, 0, pz, 'minecraft:dirt_path');
  }
}

// Scattered stone button pebbles along path edges
const pebbles = [
  [14, 1, 1], [17, 1, 2], [12, 1, 1], [7, 1, 5], [2, 1, 6],
  [1, 1, 12], [1, 1, 15], [3, 1, 21], [7, 1, 23], [23, 1, 8]
];
for (const [bx, by, bz] of pebbles) {
  b.set(bx, by, bz, 'minecraft:stone_button[face=floor,facing=north,powered=false]');
}

// Sunken Forge Apron (X=2..10, Z=8..18) at Y=0
for (let x = 2; x <= 10; x++) {
  for (let z = 8; z <= 18; z++) {
    const fSeed = (x * 19 + z * 23) % 4;
    if (fSeed === 0) b.set(x, 0, z, 'minecraft:cobblestone');
    else if (fSeed === 1) b.set(x, 0, z, 'minecraft:mossy_cobblestone');
    else if (fSeed === 2) b.set(x, 0, z, 'minecraft:stone_bricks');
    else b.set(x, 0, z, 'minecraft:cracked_stone_bricks');
  }
}

// Smooth Stone Stair Rim bordering the sunken forge apron
for (let x = 2; x <= 10; x++) {
  b.set(x, 1, 8, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
}
for (let z = 8; z <= 18; z++) {
  b.set(2, 1, z, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
}

// =============================================================================
// 2. HEAVY PROUD LOG COLUMNS & STONE FOUNDATION PLINTHS (Y=0..5)
// =============================================================================
console.log('Phase 2: Erecting Heavy Structural Framing Columns & Stone Plinths...');

// Structural Column Locations (proud by 1 block relative to infill panels)
const structuralColumns = [
  // Main Hall Posts
  [10, 4], [16, 4], [22, 4],
  [10, 10], [22, 10],
  [10, 16], [22, 16],
  [10, 22], [16, 22], [22, 22],
  // Forge Pavilion Posts
  [2, 8], [2, 14], [2, 18],
  [6, 18], [10, 18]
];

for (const [cx, cz] of structuralColumns) {
  // Y=0: Heavy stone plinth foot
  b.set(cx, 0, cz, 'minecraft:stone_bricks');
  // Y=1: Stone brick stairs wrapping the base as corbel footings
  b.set(cx, 1, cz, 'minecraft:stone_bricks');
  // Y=2..5: Proud stripped dark oak structural column
  for (let y = 2; y <= 5; y++) {
    b.set(cx, y, cz, 'minecraft:stripped_dark_oak_log[axis=y]');
  }
  // Decorative joinery stone button pin at Y=3
  if (cz === 4) b.set(cx, 3, cz - 1, 'minecraft:stone_button[face=wall,facing=north,powered=false]');
  if (cz === 22) b.set(cx, 3, cz + 1, 'minecraft:stone_button[face=wall,facing=south,powered=false]');
  if (cx === 22) b.set(cx + 1, 3, cz, 'minecraft:stone_button[face=wall,facing=east,powered=false]');
}

// =============================================================================
// 3. RECESSED GROUND FLOOR WALLS & STONE MASONRY SKIRT (Y=1..4)
// =============================================================================
console.log('Phase 3: Building Recessed Ground Floor Walls & Stone Skirt...');

// Main Hall Foundation Floorboards at Y=1 (Interior: X=11..21, Z=5..21)
for (let x = 11; x <= 21; x++) {
  for (let z = 5; z <= 21; z++) {
    // Herringbone spruce floor with weathered dark oak patches
    const flSeed = (x * 7 + z * 13) % 8;
    if (flSeed === 0) b.set(x, 1, z, 'minecraft:stripped_spruce_wood[axis=y]');
    else if (flSeed === 1) b.set(x, 1, z, 'minecraft:dark_oak_planks');
    else b.set(x, 1, z, 'minecraft:spruce_planks');
  }
}

// North Wall (Z=4, X=11..21 between posts 10, 16, 22):
// Recessed by 1 block relative to columns!
for (let x = 11; x <= 21; x++) {
  if (x !== 16) {
    b.set(x, 1, 4, getStoneFoundation(x, 1, 4));
    b.set(x, 2, 4, getStoneFoundation(x, 2, 4));
    b.set(x, 3, 4, getPlaster(x * 11));
    b.set(x, 4, 4, getPlaster(x * 11 + 1));
  }
}

// Main Entrance Doorway at X=16, Z=4:
b.set(16, 1, 4, 'minecraft:spruce_door[facing=north,half=lower,hinge=left,open=false,powered=false]');
b.set(16, 2, 4, 'minecraft:spruce_door[facing=north,half=upper,hinge=left,open=false,powered=false]');
b.set(16, 3, 4, 'minecraft:spruce_stairs[facing=north,half=top,shape=straight,waterlogged=false]'); // Arch lintel
b.set(16, 1, 3, 'minecraft:spruce_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]'); // Welcome threshold step
b.set(15, 2, 3, 'minecraft:lantern[hanging=false,waterlogged=false]'); // Welcoming porch lantern on fence
b.set(15, 1, 3, 'minecraft:spruce_fence[east=false,north=false,south=false,waterlogged=false,west=false]');

// Inset Windows on North Wall at X=13 and X=19 (Y=2..3):
b.set(13, 2, 4, 'minecraft:stone_brick_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Sill
b.set(13, 3, 4, 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]');
b.set(12, 3, 3, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]'); // Left Shutter
b.set(14, 3, 3, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]'); // Right Shutter

b.set(19, 2, 4, 'minecraft:stone_brick_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(19, 3, 4, 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]');
b.set(18, 3, 3, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');
b.set(20, 3, 3, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');

// East Wall (X=22, Z=5..21):
for (let z = 5; z <= 21; z++) {
  if (z !== 10 && z !== 16) {
    b.set(22, 1, z, getStoneFoundation(22, 1, z));
    b.set(22, 2, z, getStoneFoundation(22, 2, z));
    b.set(22, 3, z, getPlaster(z * 13));
    b.set(22, 4, z, getPlaster(z * 13 + 1));
  }
}

// Inset Windows on East Wall at Z=7, Z=13, Z=19:
for (const wz of [7, 13, 19]) {
  b.set(22, 2, wz, 'minecraft:stone_brick_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
  b.set(22, 3, wz, 'minecraft:glass_pane[east=false,west=false,north=true,south=true,waterlogged=false]');
  b.set(23, 3, wz - 1, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,waterlogged=false]');
  b.set(23, 3, wz + 1, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,waterlogged=false]');
  // Window flower box with sweet berry bush!
  b.set(23, 2, wz, 'minecraft:dirt');
  b.set(23, 2, wz - 1, 'minecraft:spruce_trapdoor[facing=north,half=top,open=true,waterlogged=false]');
  b.set(23, 2, wz + 1, 'minecraft:spruce_trapdoor[facing=south,half=top,open=true,waterlogged=false]');
  b.set(24, 2, wz, 'minecraft:spruce_trapdoor[facing=east,half=top,open=true,waterlogged=false]');
  b.set(23, 3, wz, 'minecraft:sweet_berry_bush[age=2]');
}

// South Wall (Z=22, X=11..21):
for (let x = 11; x <= 21; x++) {
  if (x !== 16) {
    b.set(x, 1, 22, getStoneFoundation(x, 1, 22));
    b.set(x, 2, 22, getStoneFoundation(x, 2, 22));
    b.set(x, 3, 22, getPlaster(x * 19));
    b.set(x, 4, 22, getPlaster(x * 19 + 1));
  }
}
// South Window at X=16, Z=22:
b.set(16, 2, 22, 'minecraft:stone_brick_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(16, 3, 22, 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]');
b.set(15, 3, 23, 'minecraft:spruce_trapdoor[facing=south,half=bottom,open=true,waterlogged=false]');
b.set(17, 3, 23, 'minecraft:spruce_trapdoor[facing=south,half=bottom,open=true,waterlogged=false]');

// West Wall of Main Hall (X=10, Z=5..21):
// North section (Z=5..9):
for (let z = 5; z <= 9; z++) {
  b.set(10, 1, z, getStoneFoundation(10, 1, z));
  b.set(10, 2, z, getStoneFoundation(10, 2, z));
  b.set(10, 3, z, getPlaster(z * 23));
  b.set(10, 4, z, getPlaster(z * 23 + 1));
}

// GRAND 3-WIDE OPEN TIMBER ARCHWAY CONNECTING SHOP & FORGE (X=10, Z=11..13):
// Allows seamless, obstacle-free walking between indoor armoury and outdoor forge!
for (let z = 11; z <= 13; z++) {
  b.set(10, 1, z, 'minecraft:air');
  b.set(10, 2, z, 'minecraft:air');
  b.set(10, 3, z, 'minecraft:air');
  b.set(10, 4, z, 'minecraft:spruce_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
}
b.set(10, 4, 11, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(10, 4, 13, 'minecraft:spruce_stairs[facing=north,half=top,shape=straight,waterlogged=false]');

// South section of West Wall (Z=17..21):
for (let z = 17; z <= 21; z++) {
  b.set(10, 1, z, getStoneFoundation(10, 1, z));
  b.set(10, 2, z, getStoneFoundation(10, 2, z));
  b.set(10, 3, z, getPlaster(z * 29));
  b.set(10, 4, z, getPlaster(z * 29 + 1));
}

// =============================================================================
// 4. MASSIVE STONE CHIMNEY BREAST & SMOKE PLUME (Y=0..20)
// =============================================================================
console.log('Phase 4: Constructing Heavy Stone Chimney Breast & Smoke Plume...');

// Heavy Stone Chimney Base at X=8..10, Z=7..9:
// Intersects the forge and main hall walls seamlessly!
for (let y = 0; y <= 4; y++) {
  for (let cx = 8; cx <= 10; cx++) {
    for (let cz = 7; cz <= 9; cz++) {
      b.set(cx, y, cz, getStoneFoundation(cx, y, cz));
    }
  }
}

// Twin Active Blast Furnaces facing the forge at X=7, Z=8..9:
b.set(7, 1, 8, 'minecraft:blast_furnace[facing=west,lit=true]');
b.set(7, 2, 8, 'minecraft:deepslate_brick_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(7, 1, 9, 'minecraft:blast_furnace[facing=west,lit=true]');
b.set(7, 2, 9, 'minecraft:deepslate_brick_stairs[facing=west,half=top,shape=straight,waterlogged=false]');

// Chimney Tapering & Step-in at Y=5..8:
for (let y = 5; y <= 8; y++) {
  for (let cx = 8; cx <= 10; cx++) {
    for (let cz = 7; cz <= 9; cz++) {
      if (cx === 8 && cz === 7) {
        b.set(cx, y, cz, 'minecraft:stone_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
      } else {
        b.set(cx, y, cz, 'minecraft:deepslate_bricks');
      }
    }
  }
}

// Chimney Stack piercing the roof at Y=9..17 (2x2 column at X=9..10, Z=7..8):
for (let y = 9; y <= 17; y++) {
  b.set(9, y, 7, 'minecraft:deepslate_bricks');
  b.set(10, y, 7, 'minecraft:deepslate_bricks');
  b.set(9, y, 8, 'minecraft:deepslate_bricks');
  b.set(10, y, 8, 'minecraft:deepslate_bricks');
}

// Internal smoke flue inside chimney
for (let y = 1; y <= 17; y++) {
  b.set(9, y, 8, 'minecraft:air');
}

// Chimney Top Cap at Y=18..19:
b.set(9, 17, 8, 'minecraft:hay_block[axis=y]'); // Signal fire booster
b.set(9, 18, 8, 'minecraft:campfire[facing=north,lit=true,signal_fire=true,waterlogged=false]');
b.set(9, 19, 8, 'minecraft:deepslate_tile_slab[type=bottom,waterlogged=false]');
b.set(10, 18, 7, 'minecraft:deepslate_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]');
b.set(9, 18, 7, 'minecraft:deepslate_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]');
b.set(10, 18, 8, 'minecraft:deepslate_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]');

// =============================================================================
// 5. OPEN-AIR ARTISAN FORGE PAVILION (X=2..10, Z=8..18)
// =============================================================================
console.log('Phase 5: Detailing Open-Air Artisan Forge Pavilion...');

// Molten Lava Crucible (X=4..5, Z=10..11):
b.set(4, 0, 10, 'minecraft:lava[level=0]');
b.set(5, 0, 10, 'minecraft:lava[level=0]');
b.set(4, 0, 11, 'minecraft:lava[level=0]');
b.set(5, 0, 11, 'minecraft:lava[level=0]');
// Protective Stone Rim & Iron Bars at Y=1:
b.set(3, 1, 10, 'minecraft:stone_brick_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
b.set(3, 1, 11, 'minecraft:stone_brick_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
b.set(6, 1, 10, 'minecraft:stone_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
b.set(6, 1, 11, 'minecraft:stone_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
b.set(4, 1, 9, 'minecraft:stone_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(5, 1, 9, 'minecraft:stone_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(4, 1, 12, 'minecraft:iron_bars[east=true,west=true,north=true,south=false,waterlogged=false]');
b.set(5, 1, 12, 'minecraft:iron_bars[east=true,west=true,north=true,south=false,waterlogged=false]');

// Artisan Workstations:
b.set(3, 1, 13, 'minecraft:stripped_oak_log[axis=y]'); // Tree trunk plinth
b.set(3, 2, 13, 'minecraft:anvil[facing=north]'); // Solid working anvil!
b.set(3, 1, 15, 'minecraft:grindstone[facing=north,face=floor]'); // Grindstone
b.set(3, 1, 16, 'minecraft:smithing_table'); // Smithing table
b.set(4, 1, 16, 'minecraft:crafting_table'); // Crafting bench
b.set(5, 1, 16, 'minecraft:cauldron'); // Water quench trough
b.set(5, 2, 16, 'minecraft:tripwire_hook[attached=false,facing=south,powered=false]'); // Water faucet tap

// Storage Barrels & Fuel Reserves:
b.set(8, 1, 15, 'minecraft:barrel[facing=up,open=false]'); // Coal reserve
b.set(8, 1, 16, 'minecraft:barrel[facing=north,open=false]'); // Iron ore
b.set(8, 2, 15, 'minecraft:barrel[facing=up,open=false]');
b.set(9, 1, 16, 'minecraft:raw_iron_block'); // Stack of raw iron!

// Firewood Pile at X=2..3, Z=17:
b.set(2, 1, 17, 'minecraft:spruce_log[axis=x]');
b.set(3, 1, 17, 'minecraft:spruce_log[axis=x]');
b.set(2, 2, 17, 'minecraft:spruce_slab[type=bottom,waterlogged=false]');

// Heavy Timber Truss Canopy Overhead (Y=4..5):
for (let x = 2; x <= 10; x++) {
  b.set(x, 5, 8, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 5, 14, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 5, 18, 'minecraft:stripped_dark_oak_wood[axis=x]');
}
for (let z = 8; z <= 18; z++) {
  b.set(2, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
  b.set(6, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
}

// Inverted Knee-Braces on Forge Canopy Posts (Y=4):
b.set(3, 4, 8, 'minecraft:spruce_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(2, 4, 9, 'minecraft:spruce_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(3, 4, 14, 'minecraft:spruce_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(3, 4, 18, 'minecraft:spruce_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(2, 4, 17, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');

// Hanging Forge Chandeliers on Chains:
b.set(4, 5, 13, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(4, 4, 13, 'minecraft:lantern[hanging=true,waterlogged=false]');
b.set(7, 5, 13, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(7, 4, 13, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =============================================================================
// 6. GROUND FLOOR ARMOURY & SHOWROOM INTERIOR (Y=1..4)
// =============================================================================
console.log('Phase 6: Furnishing Ground Floor Armoury & Weapons Showroom...');

// 6.1. Central Red Runner Carpet (X=16, Z=5..19)
for (let z = 5; z <= 19; z++) {
  b.set(16, 1, z, 'minecraft:red_carpet');
}

// 6.2. Merchant Service Counter & Sales Ledger (X=13..15, Z=7..8):
// Inverted dark oak stair counter with sales ledger on lectern
b.set(13, 1, 7, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(14, 1, 7, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(15, 1, 7, 'minecraft:dark_oak_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(13, 2, 7, 'minecraft:lectern[facing=north,has_book=true]'); // Master sales ledger!
b.set(14, 2, 7, 'minecraft:lantern[hanging=false,waterlogged=false]'); // Counter desk lamp
b.set(15, 2, 7, 'minecraft:flower_pot'); // Coin dish / pen pot

// 6.3. Armor Display Plinths & Weapon Racks along East Wall (X=21, Z=6..10):
b.set(21, 1, 6, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
b.set(21, 2, 6, 'minecraft:chiseled_bookshelf[facing=west]');
b.set(21, 1, 7, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
b.set(21, 2, 7, 'minecraft:grindstone[facing=west,face=floor]');
b.set(21, 1, 9, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
b.set(21, 2, 9, 'minecraft:chiseled_bookshelf[facing=west]');
b.set(21, 1, 10, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
b.set(21, 2, 10, 'minecraft:anvil[facing=west]');

// 6.4. Large Double Weapons Storage Chest with confirmed open lid space:
b.set(21, 1, 14, 'minecraft:chest[facing=west,type=right,waterlogged=false]');
b.set(21, 1, 15, 'minecraft:chest[facing=west,type=left,waterlogged=false]');
b.set(21, 2, 14, 'minecraft:air'); // 100% open lid swing clearance
b.set(21, 2, 15, 'minecraft:air');

// 6.5. South Area Archery & Crossbow Workshop (X=12..14, Z=21):
b.set(13, 1, 21, 'minecraft:fletching_table');
b.set(14, 1, 21, 'minecraft:target');
b.set(13, 2, 21, 'minecraft:lantern[hanging=false,waterlogged=false]');
b.set(12, 1, 21, 'minecraft:barrel[facing=up,open=false]');

// 6.6. Customer Waiting Settee (X=18..19, Z=5):
b.set(18, 1, 5, 'minecraft:spruce_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(19, 1, 5, 'minecraft:spruce_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');

// 6.7. Exposed Ceiling Beams & Suspended Chandeliers (Y=4..5):
for (let x = 11; x <= 21; x++) {
  b.set(x, 4, 7, 'minecraft:spruce_slab[type=top,waterlogged=false]');
  b.set(x, 4, 11, 'minecraft:spruce_slab[type=top,waterlogged=false]');
  b.set(x, 4, 15, 'minecraft:spruce_slab[type=top,waterlogged=false]');
  b.set(x, 4, 19, 'minecraft:spruce_slab[type=top,waterlogged=false]');
}
// Two warm hanging chandeliers on chains:
b.set(16, 4, 9, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 3, 9, 'minecraft:lantern[hanging=true,waterlogged=false]');
b.set(16, 4, 17, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 3, 17, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =============================================================================
// 7. CENTER-RIDGE ASCENDING STAIRCASE (Y=1..6)
// =============================================================================
console.log('Phase 7: Building Center-Ridge Ascending Staircase with 3.0-block Headroom...');

// Ascent Vector: Climbs North along East wall (X=20, Z=21 down to 18),
// lands onto turn (X=19..20, Z=17), then steps WEST toward center ridge (X=17..18)!
// Guaranteed 3.0 blocks continuous vertical headroom above every step!

// Step 1: at Z=21
b.set(20, 1, 21, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(20, 2, 21, 'minecraft:air');
b.set(20, 3, 21, 'minecraft:air');
b.set(20, 4, 21, 'minecraft:air');

// Step 2: at Z=20
b.set(20, 1, 20, 'minecraft:spruce_planks');
b.set(20, 2, 20, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(20, 1, 20, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Reverse soffit
b.set(20, 3, 20, 'minecraft:air');
b.set(20, 4, 20, 'minecraft:air');
b.set(20, 5, 20, 'minecraft:air');

// Step 3: at Z=19
b.set(20, 2, 19, 'minecraft:spruce_planks');
b.set(20, 3, 19, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(20, 2, 19, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(20, 4, 19, 'minecraft:air');
b.set(20, 5, 19, 'minecraft:air');
b.set(20, 6, 19, 'minecraft:air');

// Step 4: at Z=18
b.set(20, 3, 18, 'minecraft:spruce_planks');
b.set(20, 4, 18, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(20, 3, 18, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(20, 5, 18, 'minecraft:air');
b.set(20, 6, 18, 'minecraft:air');
b.set(20, 7, 18, 'minecraft:air');

// Turning Landing at Z=17: X=19..20
b.set(20, 4, 17, 'minecraft:spruce_planks');
b.set(19, 4, 17, 'minecraft:spruce_planks');
b.set(20, 5, 17, 'minecraft:air');
b.set(20, 6, 17, 'minecraft:air');
b.set(20, 7, 17, 'minecraft:air');
b.set(19, 5, 17, 'minecraft:air');
b.set(19, 6, 17, 'minecraft:air');
b.set(19, 7, 17, 'minecraft:air');

// Final Step 5: Steps WEST toward center at X=18, Z=17
b.set(18, 5, 17, 'minecraft:spruce_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
b.set(18, 4, 17, 'minecraft:spruce_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(18, 6, 17, 'minecraft:air');
b.set(18, 7, 17, 'minecraft:air');
b.set(18, 8, 17, 'minecraft:air');

// Loft Arrival Floor at X=17, Z=17:
b.set(17, 5, 17, 'minecraft:spruce_planks');
b.set(17, 6, 17, 'minecraft:air');
b.set(17, 7, 17, 'minecraft:air');
b.set(17, 8, 17, 'minecraft:air');

// Cut out ceiling floorboards above entire stairwell at Y=5!
for (let z = 17; z <= 21; z++) {
  b.set(20, 5, z, 'minecraft:air');
  b.set(19, 5, z, 'minecraft:air');
}

// =============================================================================
// 8. CANTILEVERED JETTY OVERHANG & SECOND FLOOR FLOORING (Y=5..6)
// =============================================================================
console.log('Phase 8: Framing Cantilevered Jetty Overhang & Second Floor...');

// Cantilevered jetty perimeter extends 1 block outward (X=10..22, Z=4..22)
// Jetty floor framing beams at Y=5:
for (let x = 10; x <= 22; x++) {
  b.set(x, 5, 4, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 5, 22, 'minecraft:stripped_dark_oak_wood[axis=x]');
}
for (let z = 4; z <= 22; z++) {
  b.set(10, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
  b.set(22, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
}

// Inverted Stair Corbel Brackets underneath the jetty (Y=4):
for (let x = 11; x <= 21; x += 3) {
  b.set(x, 4, 3, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
  b.set(x, 4, 23, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
}
for (let z = 5; z <= 21; z += 3) {
  b.set(23, 4, z, 'minecraft:dark_oak_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
}

// Second floorboards at Y=5 (inside perimeter X=11..21, Z=5..21):
for (let x = 11; x <= 21; x++) {
  for (let z = 5; z <= 21; z++) {
    // Leave stairwell open
    if (!(x >= 18 && z >= 17 && z <= 21)) {
      b.set(x, 5, z, 'minecraft:spruce_planks');
    }
  }
}

// =============================================================================
// 9. UPPER LOFT LIVING QUARTERS & STUDY (Y=6..9)
// =============================================================================
console.log('Phase 9: Building Open-Concept Upper Loft Master Residence & Study...');

// Corner & Wall Framing Timber Posts at Y=6..9:
const loftPosts = [
  [10, 4], [16, 4], [22, 4],
  [10, 10], [22, 10],
  [10, 16], [22, 16],
  [10, 22], [16, 22], [22, 22]
];
for (const [lx, lz] of loftPosts) {
  for (let y = 6; y <= 9; y++) {
    b.set(lx, y, lz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  }
}

// Recessed Plaster Infill Walls at Y=6..8:
// North Wall (Z=4):
for (let x = 11; x <= 21; x++) {
  if (x !== 16) {
    b.set(x, 6, 4, getPlaster(x * 7));
    b.set(x, 7, 4, getPlaster(x * 7 + 1));
    b.set(x, 8, 4, getPlaster(x * 7 + 2));
  }
}
// North Dormer Gable Window at X=15..17, Y=7:
b.set(15, 7, 4, 'minecraft:glass_pane[east=true,west=false,north=false,south=false,waterlogged=false]');
b.set(16, 7, 4, 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]');
b.set(17, 7, 4, 'minecraft:glass_pane[east=false,west=true,north=false,south=false,waterlogged=false]');
b.set(15, 8, 4, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(16, 8, 4, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(17, 8, 4, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(14, 7, 3, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');
b.set(18, 7, 3, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');

// South Wall (Z=22):
for (let x = 11; x <= 21; x++) {
  if (x !== 16) {
    b.set(x, 6, 22, getPlaster(x * 9));
    b.set(x, 7, 22, getPlaster(x * 9 + 1));
    b.set(x, 8, 22, getPlaster(x * 9 + 2));
  }
}
// South Window at X=16, Y=7:
b.set(16, 7, 22, 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]');
b.set(16, 8, 22, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(15, 7, 23, 'minecraft:spruce_trapdoor[facing=south,half=bottom,open=true,waterlogged=false]');
b.set(17, 7, 23, 'minecraft:spruce_trapdoor[facing=south,half=bottom,open=true,waterlogged=false]');

// East Wall (X=22):
for (let z = 5; z <= 21; z++) {
  if (z !== 10 && z !== 16) {
    b.set(22, 6, z, getPlaster(z * 11));
    b.set(22, 7, z, getPlaster(z * 11 + 1));
    b.set(22, 8, z, getPlaster(z * 11 + 2));
  }
}
// East Loft Window at Z=10, Y=7:
b.set(22, 7, 10, 'minecraft:glass_pane[east=false,west=false,north=true,south=true,waterlogged=false]');
b.set(22, 8, 10, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');

// West Wall (X=10):
for (let z = 5; z <= 21; z++) {
  if (z !== 10 && z !== 16) {
    b.set(10, 6, z, getPlaster(z * 13));
    b.set(10, 7, z, getPlaster(z * 13 + 1));
    b.set(10, 8, z, getPlaster(z * 13 + 2));
  }
}

// 9.1. Clear Central Walking & Living Space (Zero Partition Walls!):
for (let x = 11; x <= 21; x++) {
  for (let z = 5; z <= 21; z++) {
    if (!(x >= 18 && z >= 17 && z <= 21)) {
      b.set(x, 6, z, 'minecraft:air');
      b.set(x, 7, z, 'minecraft:air');
      b.set(x, 8, z, 'minecraft:air');
    }
  }
}

// 9.2. North Wing: Master Sleeping Alcove (Z=5..8):
// Red Bed tucked along quiet north wall
b.set(12, 6, 6, 'minecraft:red_bed[facing=south,occupied=false,part=head]');
b.set(12, 6, 5, 'minecraft:red_bed[facing=south,occupied=false,part=foot]');

// Bedside Nightstand Barrel & Warm Lantern:
b.set(13, 6, 5, 'minecraft:barrel[facing=up,open=false]');
b.set(13, 7, 5, 'minecraft:lantern[hanging=false,waterlogged=false]');

// Personal Storage Chest with confirmed open lid space:
b.set(14, 6, 5, 'minecraft:chest[facing=south,type=single,waterlogged=false]');
b.set(14, 7, 5, 'minecraft:air');

// Soft bedside runner rug:
b.set(12, 6, 7, 'minecraft:white_carpet');
b.set(13, 6, 7, 'minecraft:white_carpet');
b.set(14, 6, 7, 'minecraft:white_carpet');

// Northwest Corner Bookshelf Nook:
b.set(11, 6, 5, 'minecraft:bookshelf');
b.set(11, 7, 5, 'minecraft:flower_pot');

// 9.3. South Wing: Architectural Draughting Studio (Z=19..21):
// Polished dark oak writing desk under the south window
b.set(15, 6, 21, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(16, 6, 21, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(15, 7, 21, 'minecraft:lantern[hanging=false,waterlogged=false]'); // Desk lamp
b.set(16, 7, 21, 'minecraft:candle[candles=1,lit=true,waterlogged=false]'); // Candle

// Comfortable study chair facing desk:
b.set(16, 6, 20, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');

// Cartography Table for drafting maps & building blueprints:
b.set(14, 6, 21, 'minecraft:cartography_table');
b.set(14, 7, 21, 'minecraft:air');

// Architectural Library Bookshelves along southwest wall:
b.set(11, 6, 19, 'minecraft:chiseled_bookshelf[facing=east]');
b.set(11, 7, 19, 'minecraft:chiseled_bookshelf[facing=east]');
b.set(11, 6, 20, 'minecraft:bookshelf');
b.set(11, 7, 20, 'minecraft:bookshelf');

// 9.4. Safety Railing around Stair Opening (X=17, Z=18..21):
b.set(17, 6, 18, 'minecraft:spruce_fence[east=false,north=false,south=true,waterlogged=false,west=false]');
b.set(17, 6, 19, 'minecraft:spruce_fence[east=false,north=true,south=true,waterlogged=false,west=false]');
b.set(17, 6, 20, 'minecraft:spruce_fence[east=false,north=true,south=true,waterlogged=false,west=false]');
b.set(17, 6, 21, 'minecraft:spruce_fence[east=false,north=true,south=false,waterlogged=false,west=false]');

// 100% Guaranteed Unobstructed Stair Arrival & Landing Corridor:
b.set(18, 6, 17, 'minecraft:air');
b.set(18, 7, 17, 'minecraft:air');
b.set(17, 6, 17, 'minecraft:air');
b.set(17, 7, 17, 'minecraft:air');
b.set(16, 6, 17, 'minecraft:air');
b.set(16, 7, 17, 'minecraft:air');

// 9.5. Exposed Dark Oak Tie-Beams Across Cathedral Roof (Y=9):
for (let x = 10; x <= 22; x++) {
  b.set(x, 9, 4, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 9, 10, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 9, 16, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 9, 22, 'minecraft:stripped_dark_oak_wood[axis=x]');
}

// Single Grand Wrought-Iron Chandelier suspended from ridge peak (Y=16 down to Y=11):
b.set(16, 16, 12, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 15, 12, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 14, 12, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 13, 12, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 12, 12, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(16, 11, 12, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =============================================================================
// 10. ORGANIC CATENARY CURVING GOTHIC ROOF & CROSS-GABLES (Y=9..19)
// =============================================================================
console.log('Phase 10: Engineering Catenary Curving Gothic Roof & Cross-Gables...');

// 10.1. MAIN HALL GOTHIC ROOF (Runs North-South, Ridge at X=16, Z=3..23)
// Half-width = 7 blocks (X=9 to X=23)
// Catenary curve profile:
// dx=0 (X=16): Ridge Peak (Y=17, sags to Y=16 at center Z=11..15, rises to Y=18 at gables Z=3, 23)
// dx=1 (X=15, 17): Upper Slope (Y=17)
// dx=2 (X=14, 18): Mid-High Slope (Y=16)
// dx=3 (X=13, 19): Mid Slope (Y=15)
// dx=4 (X=12, 20): Steep Slope (Y=13)
// dx=5 (X=11, 21): Lower Slope (Y=11)
// dx=6 (X=10, 22): Flared Eave (Y=10)
// dx=7 (X=9, 23): Eave Overhang (Y=9 top slab & inverted stair corbel!)

for (let z = 3; z <= 23; z++) {
  const isGableTrim = (z === 3 || z === 23);
  const zSag = (z >= 11 && z <= 15) ? -1 : (isGableTrim ? 1 : 0);

  // Skip the western roof slope where the Cross-Gable Forge Roof intersects!
  // Forge roof intersects at X=9..15, Z=9..17
  const isForgeIntersection = (z >= 9 && z <= 17);

  // --- East Slope (X=16 to X=23) ---
  // Eave overhang at X=23, Y=9 + zSag
  const eaveY = 9 + zSag;
  const eaveSlab = isGableTrim ? 'dark_oak_slab' : getRoofSlab(z * 3);
  const eaveStair = isGableTrim ? 'dark_oak_stairs' : getRoofStair(z * 3);
  const roofBlock = isGableTrim ? 'dark_oak_planks' : getRoofMaterial(z * 3);

  b.set(23, eaveY, z, `minecraft:${eaveSlab}[type=top,waterlogged=false]`);
  b.set(23, eaveY - 1, z, 'minecraft:spruce_trapdoor[facing=west,half=top,open=false,waterlogged=false]'); // Soffit
  b.set(22, eaveY + 1, z, `minecraft:${eaveStair}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(22, eaveY, z, `minecraft:${eaveStair}[facing=east,half=top,shape=straight,waterlogged=false]`); // Corbel

  b.set(21, eaveY + 2, z, `minecraft:${eaveStair}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(20, eaveY + 4, z, `minecraft:${eaveStair}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(20, eaveY + 3, z, `minecraft:${roofBlock}`);
  b.set(19, eaveY + 6, z, `minecraft:${eaveStair}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(19, eaveY + 5, z, `minecraft:${roofBlock}`);
  b.set(18, eaveY + 7, z, `minecraft:${eaveStair}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(17, eaveY + 8, z, `minecraft:${roofBlock}`);

  // Ridge Peak at X=16:
  const ridgeY = 17 + zSag;
  b.set(16, ridgeY, z, `minecraft:${eaveSlab}[type=bottom,waterlogged=false]`);
  b.set(16, ridgeY - 1, z, `minecraft:${roofBlock}`);

  // Gable Peak Spires at Z=3 and Z=23:
  if (isGableTrim) {
    b.set(16, ridgeY + 1, z, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
    b.set(16, ridgeY + 2, z, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
  }

  // --- West Slope (X=9 to X=15) ---
  if (!isForgeIntersection) {
    b.set(9, eaveY, z, `minecraft:${eaveSlab}[type=top,waterlogged=false]`);
    b.set(9, eaveY - 1, z, 'minecraft:spruce_trapdoor[facing=east,half=top,open=false,waterlogged=false]');
    b.set(10, eaveY + 1, z, `minecraft:${eaveStair}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
    b.set(10, eaveY, z, `minecraft:${eaveStair}[facing=west,half=top,shape=straight,waterlogged=false]`);

    b.set(11, eaveY + 2, z, `minecraft:${eaveStair}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
    b.set(12, eaveY + 4, z, `minecraft:${eaveStair}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
    b.set(12, eaveY + 3, z, `minecraft:${roofBlock}`);
    b.set(13, eaveY + 6, z, `minecraft:${eaveStair}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
    b.set(13, eaveY + 5, z, `minecraft:${roofBlock}`);
    b.set(14, eaveY + 7, z, `minecraft:${eaveStair}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
    b.set(15, eaveY + 8, z, `minecraft:${roofBlock}`);
  }
}

// 10.2. CROSS-GABLE FORGE ROOF (Runs East-West, Ridge at Z=13, X=1..16)
// Half-width = 5 blocks (Z=8 to Z=18)
// Intersects seamlessly into the Main Hall Roof at X=12..16!
for (let x = 1; x <= 15; x++) {
  const isGableTrim = (x === 1);
  const forgeStair = isGableTrim ? 'dark_oak_stairs' : getRoofStair(x * 5);
  const forgeSlab = isGableTrim ? 'dark_oak_slab' : getRoofSlab(x * 5);
  const forgeBlock = isGableTrim ? 'dark_oak_planks' : getRoofMaterial(x * 5);

  // Ridge Peak at Z=13, Y=15:
  b.set(x, 15, 13, `minecraft:${forgeSlab}[type=bottom,waterlogged=false]`);
  b.set(x, 14, 13, `minecraft:${forgeBlock}`);

  if (isGableTrim) {
    b.set(x, 16, 13, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
  }

  // North Slope of Forge (Z=12 down to Z=8):
  b.set(x, 14, 12, `minecraft:${forgeStair}[facing=south,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 13, 11, `minecraft:${forgeStair}[facing=south,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 12, 10, `minecraft:${forgeStair}[facing=south,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 11, 9, `minecraft:${forgeStair}[facing=south,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 10, 8, `minecraft:${forgeSlab}[type=top,waterlogged=false]`); // Flared eave
  b.set(x, 9, 8, 'minecraft:spruce_trapdoor[facing=north,half=top,open=false,waterlogged=false]');

  // South Slope of Forge (Z=14 down to Z=18):
  b.set(x, 14, 14, `minecraft:${forgeStair}[facing=north,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 13, 15, `minecraft:${forgeStair}[facing=north,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 12, 16, `minecraft:${forgeStair}[facing=north,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 11, 17, `minecraft:${forgeStair}[facing=north,half=bottom,shape=straight,waterlogged=false]`);
  b.set(x, 10, 18, `minecraft:${forgeSlab}[type=top,waterlogged=false]`); // Flared eave
  b.set(x, 9, 18, 'minecraft:spruce_trapdoor[facing=south,half=top,open=false,waterlogged=false]');
}

// 10.3. Gable Wall Infill Triangles (Z=4 and Z=22):
for (let y = 9; y <= 16; y++) {
  const dxMax = Math.max(0, 16 - Math.round((y - 9) * 0.9));
  for (let x = 16 - dxMax; x <= 16 + dxMax; x++) {
    if (b.get(x, y, 4) === 'minecraft:air') b.set(x, y, 4, getPlaster(x * 13 + y));
    if (b.get(x, y, 22) === 'minecraft:air') b.set(x, y, 22, getPlaster(x * 17 + y));
  }
}

// West Gable Wall Infill Triangle for Forge at X=2:
for (let y = 6; y <= 14; y++) {
  const dzMax = Math.max(0, Math.round((14 - y) * 0.6));
  for (let z = 13 - dzMax; z <= 13 + dzMax; z++) {
    if (b.get(2, y, z) === 'minecraft:air') {
      b.set(2, y, z, getPlaster(z * 19 + y));
    }
  }
}

// =============================================================================
// 11. CASCADING ORGANIC FOLIAGE & ENVIRONMENTAL OVERGROWTH
// =============================================================================
console.log('Phase 11: Draping Cascading Organic Foliage, Vines & Overgrowth...');

// Overgrowth cascading down the eaves, roof valleys, and foundation
const foliageLocations = [
  // Eaves Overgrowth (East Slope)
  [23, 10, 6], [23, 9, 7], [24, 8, 7], [23, 10, 8],
  [23, 10, 14], [23, 9, 15], [24, 8, 15], [23, 10, 16],
  [23, 10, 20], [23, 9, 21],
  // Valley Overgrowth where Forge roof meets Main roof (X=11..13, Z=9..11)
  [12, 13, 9], [12, 12, 8], [11, 11, 8],
  [12, 13, 17], [12, 12, 18], [11, 11, 18],
  // Chimney Overgrowth (creeping up the stone breast)
  [8, 5, 6], [8, 6, 6], [8, 7, 6], [7, 6, 7],
  [10, 8, 6], [10, 9, 6], [11, 9, 7],
  // Forge Canopy Vines
  [1, 9, 13], [1, 8, 13], [2, 10, 7], [2, 9, 7], [2, 8, 7],
  [6, 5, 19], [6, 4, 19], [6, 3, 19],
  // Foundation Garden Shrubbery
  [11, 1, 3], [12, 1, 3], [18, 1, 3], [19, 1, 3],
  [23, 1, 10], [23, 1, 11], [23, 1, 12],
  [21, 1, 23], [20, 1, 23], [11, 1, 23]
];

for (const [fx, fy, fz] of foliageLocations) {
  if (fx >= 0 && fx < WIDTH && fy >= 0 && fy < HEIGHT && fz >= 0 && fz < LENGTH) {
    if (b.get(fx, fy, fz) === 'minecraft:air') {
      const leafType = ((fx + fy + fz) % 3 === 0) ? 'flowering_azalea_leaves' : 'oak_leaves';
      b.set(fx, fy, fz, `minecraft:${leafType}[distance=1,persistent=true,waterlogged=false]`);
    }
  }
}

// Foundation Ferns & Flowers in surrounding grass
const flowerScatter = [
  [10, 1, 2], [14, 1, 2], [20, 1, 2], [23, 1, 5],
  [23, 1, 14], [23, 1, 21], [18, 1, 23], [12, 1, 23]
];
for (const [flx, fly, flz] of flowerScatter) {
  if (b.get(flx, fly, flz) === 'minecraft:air') {
    const fType = ((flx + flz) % 2 === 0) ? 'fern' : 'poppy';
    b.set(flx, fly, flz, `minecraft:${fType}`);
  }
}

// =============================================================================
// 12. EXPORTING SCHEMATIC & LITEMATICA FILES
// =============================================================================
console.log('Phase 12: Exporting Sponge V2 Schematic & Litematica Blueprint...');

// Count materials and non-air blocks
const { totalBlocks, materials } = b.countMaterials();

console.log(`Master Organic Build #2: ${totalBlocks} non-air blocks placed across ${materials.length} distinct materials.`);

// Save material counts JSON
fs.writeFileSync('build2_organic_materials.json', JSON.stringify({
  dimensions: { width: WIDTH, height: HEIGHT, length: LENGTH },
  blockCount: totalBlocks,
  materials: materials
}, null, 2));

// Export Sponge V2 Schematic
const schemBuf = b.toSpongeSchematic();
fs.writeFileSync('downloads/medieval_blacksmith_armoury.schem', schemBuf);
fs.writeFileSync('C:\\Users\\ip762\\AppData\\Roaming\\.minecraft\\schematics\\medieval_blacksmith_armoury.schem', schemBuf);

// Export Litematica Blueprint
const litematicBuf = b.toLitematic('Medieval Village Blacksmith & Armoury (Master Organic Edition)', 'MineVault Studio');
fs.writeFileSync('downloads/medieval_blacksmith_armoury.litematic', litematicBuf);
fs.writeFileSync('C:\\Users\\ip762\\AppData\\Roaming\\.minecraft\\schematics\\medieval_blacksmith_armoury.litematic', litematicBuf);

console.log('Master Organic Build #2 successfully generated and synced to Minecraft schematics directory!');
