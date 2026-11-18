const fs = require('fs');
const path = require('path');
const { VoxelCanvas } = require('./voxel_canvas');

// Dimensions: 20 wide (X), 17 high (Y), 16 deep (Z)
const b = new VoxelCanvas(20, 17, 16);

// --- Palette Helpers ---
const STONE_GRADIENT = [
  'minecraft:stone_bricks',
  'minecraft:stone_bricks',
  'minecraft:cracked_stone_bricks',
  'minecraft:cobblestone',
  'minecraft:mossy_cobblestone',
  'minecraft:andesite',
  'minecraft:tuff'
];

function getStone(seed) {
  return STONE_GRADIENT[Math.abs(seed) % STONE_GRADIENT.length];
}

const PLASTER_GRADIENT = [
  'minecraft:white_terracotta',
  'minecraft:white_terracotta',
  'minecraft:calcite',
  'minecraft:diorite'
];

function getPlaster(seed) {
  return PLASTER_GRADIENT[Math.abs(seed) % PLASTER_GRADIENT.length];
}

console.log('Building Master Refurbished Blacksmith & Armoury...');

// =========================================================================
// 1. FOUNDATION SKIRT & TERRAIN PLINTH (Y=0)
// =========================================================================
// Ground natural apron across the entire footprint
for (let x = 0; x < 20; x++) {
  for (let z = 0; z < 16; z++) {
    const isInterior = (x >= 9 && x <= 18 && z >= 3 && z <= 13);
    const isForge = (x >= 1 && x <= 8 && z >= 2 && z <= 13);
    const isPorch = (x >= 11 && x <= 14 && z >= 1 && z <= 2);
    const isBorder = (x === 0 || x === 19 || z === 0 || z === 15);

    if (isInterior) {
      b.set(x, 0, z, 'minecraft:spruce_planks');
    } else if (isForge) {
      // Forge floor has heavy cobblestone, stone bricks, and andesite wear
      b.set(x, 0, z, getStone(x * 7 + z * 13));
    } else if (isPorch) {
      b.set(x, 0, z, 'minecraft:stone_bricks');
    } else if (!isBorder) {
      // Natural weathered path/plinth perimeter
      if ((x + z) % 3 === 0) {
        b.set(x, 0, z, 'minecraft:gravel');
      } else if ((x + z) % 3 === 1) {
        b.set(x, 0, z, 'minecraft:cobblestone');
      } else {
        b.set(x, 0, z, 'minecraft:mossy_cobblestone');
      }
    }
  }
}

// Organic foundation stair skirt & cobblestone wall base corners
b.set(9, 0, 2, 'minecraft:stone_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(10, 0, 2, 'minecraft:cobblestone_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=none]');
b.set(15, 0, 2, 'minecraft:cobblestone_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=none]');
b.set(16, 0, 2, 'minecraft:stone_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(17, 0, 2, 'minecraft:stone_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(18, 0, 2, 'minecraft:cobblestone_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=none]');

// East wall skirt
for (let z = 3; z <= 13; z++) {
  if (z % 3 === 0) {
    b.set(19, 0, z, 'minecraft:stone_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
  }
}
// South wall skirt
for (let x = 9; x <= 18; x++) {
  if (x % 3 === 0) {
    b.set(x, 0, 14, 'minecraft:stone_brick_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
  }
}

// =========================================================================
// 2. GROUND FLOOR STRUCTURAL TIMBER FRAMING (Y=1..5)
// =========================================================================
// Main Hall corners: (9,3), (18,3), (9,13), (18,13)
// Intermediate structural posts: (14,3), (18,8), (14,13)
const timberColumns = [
  [9, 3], [14, 3], [18, 3],
  [18, 8],
  [9, 13], [14, 13], [18, 13]
];

for (const [cx, cz] of timberColumns) {
  for (let y = 1; y <= 5; y++) {
    b.set(cx, y, cz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  }
  // Beam pegs on exterior faces
  b.set(cx, 1, cz - 1, 'minecraft:stone_button[facing=north,face=wall]');
}

// Forge Pavilion Timber Posts: (1,2), (5,2), (1,7), (1,13), (5,13)
const forgeColumns = [
  [1, 2], [5, 2], [1, 7], [1, 13], [5, 13]
];

for (const [fx, fz] of forgeColumns) {
  // Stone brick plinth pedestal at Y=1
  b.set(fx, 1, fz, 'minecraft:stone_bricks');
  for (let y = 2; y <= 5; y++) {
    b.set(fx, y, fz, 'minecraft:stripped_dark_oak_log[axis=y]');
  }
}

// Horizontal Crossbeams at Y=5 (Tie-beams)
// Connecting main hall posts
for (let x = 9; x <= 18; x++) {
  b.set(x, 5, 3, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 5, 13, 'minecraft:stripped_dark_oak_wood[axis=x]');
}
for (let z = 3; z <= 13; z++) {
  b.set(9, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
  b.set(18, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
}
// Forge tie-beams at Y=5
for (let x = 1; x <= 9; x++) {
  b.set(x, 5, 2, 'minecraft:stripped_dark_oak_log[axis=x]');
  b.set(x, 5, 7, 'minecraft:stripped_dark_oak_log[axis=x]');
  b.set(x, 5, 13, 'minecraft:stripped_dark_oak_log[axis=x]');
}
for (let z = 2; z <= 13; z++) {
  b.set(1, 5, z, 'minecraft:stripped_dark_oak_log[axis=z]');
}

// Inverted stair knee-braces supporting forge tie-beams
b.set(2, 4, 2, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(4, 4, 2, 'minecraft:dark_oak_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(1, 4, 3, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(1, 4, 6, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(2, 4, 7, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(4, 4, 7, 'minecraft:dark_oak_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
b.set(1, 4, 12, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(2, 4, 13, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(4, 4, 13, 'minecraft:dark_oak_stairs[facing=west,half=top,shape=straight,waterlogged=false]');

// =========================================================================
// 3. GROUND FLOOR WALLS & 3D RECESSED PANELS (Y=1..4)
// =========================================================================
// Note: Exterior timber frame is at X=9, X=18, Z=3, Z=13.
// Walls are inset into the panels between the posts.

// --- North Wall (Z=3, X=10..17) ---
// Y=1: Foundation plinth
for (let x = 10; x <= 17; x++) {
  if (x !== 14) b.set(x, 1, 3, getStone(x * 11));
}
// Front entrance door at X=12
b.set(12, 1, 3, 'minecraft:spruce_door[facing=north,half=lower,hinge=left,open=false,powered=false]');
b.set(12, 2, 3, 'minecraft:spruce_door[facing=north,half=upper,hinge=left,open=false,powered=false]');
b.set(12, 3, 3, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(12, 4, 3, getPlaster(12));

// Window 1 at X=10..11
b.set(10, 2, 3, 'minecraft:glass_pane[east=true,west=false,north=false,south=false,waterlogged=false]');
b.set(11, 2, 3, 'minecraft:glass_pane[east=false,west=true,north=false,south=false,waterlogged=false]');
b.set(10, 3, 3, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(11, 3, 3, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(10, 4, 3, getPlaster(10));
b.set(11, 4, 3, getPlaster(11));
// Exterior shutters & flower box for North Window 1
b.set(9, 2, 2, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');
b.set(10, 1, 2, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(11, 1, 2, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(10, 2, 2, 'minecraft:potted_cornflower');
b.set(11, 2, 2, 'minecraft:potted_poppy');

// Window 2 at X=16
b.set(16, 2, 3, 'minecraft:glass_pane[east=true,west=true,north=false,south=false,waterlogged=false]');
b.set(15, 2, 3, getPlaster(15));
b.set(17, 2, 3, getPlaster(17));
b.set(15, 3, 3, getPlaster(15));
b.set(16, 3, 3, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(17, 3, 3, getPlaster(17));
b.set(15, 4, 3, getPlaster(15));
b.set(16, 4, 3, getPlaster(16));
b.set(17, 4, 3, getPlaster(17));
// Exterior flower box for Window 2
b.set(16, 1, 2, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(16, 2, 2, 'minecraft:potted_azure_bluet');

// Porch Lantern over entrance
b.set(12, 3, 2, 'minecraft:lantern[hanging=true,waterlogged=false]');

// --- East Wall (X=18, Z=4..12) ---
for (let z = 4; z <= 12; z++) {
  if (z !== 8) {
    b.set(18, 1, z, getStone(z * 13));
    b.set(18, 2, z, getPlaster(z * 5));
    b.set(18, 3, z, getPlaster(z * 5 + 1));
    b.set(18, 4, z, getPlaster(z * 5 + 2));
  }
}
// East Wall Windows: Z=5..6 and Z=10..11
b.set(18, 2, 5, 'minecraft:glass_pane[east=false,west=false,north=false,south=true,waterlogged=false]');
b.set(18, 2, 6, 'minecraft:glass_pane[east=false,west=false,north=true,south=false,waterlogged=false]');
b.set(18, 3, 5, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(18, 3, 6, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(19, 2, 4, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,waterlogged=false]');
b.set(19, 2, 7, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,waterlogged=false]');

b.set(18, 2, 10, 'minecraft:glass_pane[east=false,west=false,north=false,south=true,waterlogged=false]');
b.set(18, 2, 11, 'minecraft:glass_pane[east=false,west=false,north=true,south=false,waterlogged=false]');
b.set(18, 3, 10, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(18, 3, 11, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');
b.set(19, 2, 9, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,waterlogged=false]');
b.set(19, 2, 12, 'minecraft:spruce_trapdoor[facing=east,half=bottom,open=true,waterlogged=false]');

// --- South Wall (Z=13, X=10..17) ---
for (let x = 10; x <= 17; x++) {
  if (x !== 14) {
    b.set(x, 1, 13, getStone(x * 19));
    b.set(x, 2, 13, getPlaster(x * 3));
    b.set(x, 3, 13, getPlaster(x * 3 + 1));
    b.set(x, 4, 13, getPlaster(x * 3 + 2));
  }
}
// South Window at X=11..12
b.set(11, 2, 13, 'minecraft:glass_pane[east=true,west=false,north=false,south=false,waterlogged=false]');
b.set(12, 2, 13, 'minecraft:glass_pane[east=false,west=true,north=false,south=false,waterlogged=false]');
b.set(11, 3, 13, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(12, 3, 13, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');

// --- West Dividing Wall (X=9, Z=4..12) ---
// Separates the indoor armoury from the open-air forge.
// Features a Grand 3-Wide Open Timber & Stone Archway at Z=6..8!
for (let z = 4; z <= 12; z++) {
  const isArch = (z >= 6 && z <= 8);
  if (isArch) {
    // Open air passage at Y=1, 2, 3
    b.set(9, 1, z, 'minecraft:air');
    b.set(9, 2, z, 'minecraft:air');
    b.set(9, 3, z, 'minecraft:air');
    // Arch framing at Y=3 & 4
    if (z === 6) b.set(9, 3, z, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
    if (z === 8) b.set(9, 3, z, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
    if (z === 7) b.set(9, 4, z, 'minecraft:dark_oak_slab[type=top,waterlogged=false]');
    b.set(9, 4, 6, 'minecraft:stone_bricks');
    b.set(9, 4, 8, 'minecraft:stone_bricks');
  } else {
    // Solid dividing wall
    b.set(9, 1, z, getStone(z * 7));
    b.set(9, 2, z, getStone(z * 7 + 1));
    b.set(9, 3, z, getPlaster(z * 7 + 2));
    b.set(9, 4, z, getPlaster(z * 7 + 3));
  }
}

// =========================================================================
// 4. OPEN-AIR FORGE PAVILION & CHIMNEY (X=1..8, Z=2..12)
// =========================================================================
// The Hearth Basin & Chimney: X=3..5, Z=3..5
// Y=1: Cobbled deepslate hearth base
b.set(3, 1, 3, 'minecraft:cobbled_deepslate');
b.set(4, 1, 3, 'minecraft:cobbled_deepslate');
b.set(5, 1, 3, 'minecraft:cobbled_deepslate');
b.set(3, 1, 4, 'minecraft:cobbled_deepslate');
b.set(4, 1, 4, 'minecraft:lava[level=0]'); // Molten lava crucible!
b.set(5, 1, 4, 'minecraft:cobbled_deepslate');
b.set(3, 1, 5, 'minecraft:cobbled_deepslate');
b.set(4, 1, 5, 'minecraft:cobbled_deepslate');
b.set(5, 1, 5, 'minecraft:cobbled_deepslate');

// Crucible safety: Iron bars around lava
b.set(4, 2, 3, 'minecraft:iron_bars[east=true,west=true,north=false,south=true,waterlogged=false]');
b.set(3, 2, 4, 'minecraft:blast_furnace[facing=east,lit=true]'); // Active blast furnace 1
b.set(5, 2, 4, 'minecraft:blast_furnace[facing=west,lit=true]'); // Active blast furnace 2
b.set(4, 2, 5, 'minecraft:iron_bars[east=true,west=true,north=true,south=false,waterlogged=false]');

// Hearth hood and smoke gathering flue (Y=3..4)
for (let hx = 3; hx <= 5; hx++) {
  for (let hz = 3; hz <= 5; hz++) {
    b.set(hx, 3, hz, 'minecraft:deepslate_bricks');
  }
}
b.set(4, 3, 4, 'minecraft:air'); // Smoke shaft open
b.set(3, 3, 3, 'minecraft:deepslate_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(5, 3, 3, 'minecraft:deepslate_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]');
b.set(3, 3, 5, 'minecraft:deepslate_brick_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(5, 3, 5, 'minecraft:deepslate_brick_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');

// The Chimney Stack: Rises from Y=4 through the roof to Y=15!
for (let y = 4; y <= 14; y++) {
  // 2x2 stone & deepslate chimney column at X=4..5, Z=4..5
  b.set(4, y, 4, (y > 9) ? 'minecraft:stone_bricks' : 'minecraft:deepslate_bricks');
  b.set(5, y, 4, (y > 9) ? 'minecraft:stone_bricks' : 'minecraft:deepslate_bricks');
  b.set(4, y, 5, (y > 9) ? 'minecraft:stone_bricks' : 'minecraft:deepslate_bricks');
  b.set(5, y, 5, (y > 9) ? 'minecraft:stone_bricks' : 'minecraft:deepslate_bricks');
}
// Internal smoke flue inside chimney
for (let y = 4; y <= 13; y++) {
  b.set(4, y, 4, 'minecraft:air');
}
// Campfire with signal fire (hay bale) at Y=14 for towering smoke column!
b.set(4, 13, 4, 'minecraft:hay_block[axis=y]');
b.set(4, 14, 4, 'minecraft:campfire[facing=north,lit=true,signal_fire=true,waterlogged=false]');
b.set(4, 15, 4, 'minecraft:deepslate_tile_slab[type=bottom,waterlogged=false]');
b.set(5, 15, 4, 'minecraft:stone_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]');
b.set(4, 15, 5, 'minecraft:stone_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]');
b.set(5, 15, 5, 'minecraft:stone_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]');

// Smithing Workstations in Forge Pavilion
b.set(2, 1, 4, 'minecraft:stripped_oak_log[axis=y]'); // Tree trunk plinth
b.set(2, 2, 4, 'minecraft:anvil[facing=north]'); // Solid working anvil!
b.set(2, 1, 6, 'minecraft:grindstone[facing=north,face=floor]'); // Grindstone
b.set(2, 1, 8, 'minecraft:smithing_table'); // Smithing table
b.set(2, 1, 9, 'minecraft:crafting_table'); // Crafting bench
b.set(2, 1, 10, 'minecraft:cauldron'); // Water quench cauldron
b.set(2, 2, 10, 'minecraft:tripwire_hook[attached=false,facing=east,powered=false]'); // Water tap faucet

// Coal and Ore Barrels
b.set(7, 1, 3, 'minecraft:barrel[facing=up,open=false]');
b.set(7, 1, 4, 'minecraft:barrel[facing=north,open=false]');
b.set(7, 2, 3, 'minecraft:barrel[facing=up,open=false]');

// Firewood pile at X=2..3, Z=12
b.set(2, 1, 12, 'minecraft:spruce_log[axis=x]');
b.set(3, 1, 12, 'minecraft:spruce_log[axis=x]');
b.set(2, 2, 12, 'minecraft:spruce_slab[type=bottom,waterlogged=false]');

// Hanging Lanterns on Chains in Forge
b.set(3, 5, 8, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(3, 4, 8, 'minecraft:lantern[hanging=true,waterlogged=false]');
b.set(6, 5, 8, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(6, 4, 8, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =========================================================================
// 5. INDOOR ARMOURY FURNISHING & FLOOR (Y=1)
// =========================================================================
// Central red wool runner
for (let z = 4; z <= 12; z++) {
  b.set(13, 1, z, 'minecraft:red_carpet');
}
// Double storage chest with open air overhead
b.set(10, 1, 10, 'minecraft:chest[facing=east,type=right,waterlogged=false]');
b.set(10, 1, 11, 'minecraft:chest[facing=east,type=left,waterlogged=false]');
b.set(10, 2, 10, 'minecraft:air'); // Confirmed lid swing clearance
b.set(10, 2, 11, 'minecraft:air');

// Armor Stand Plinths & Weapon Displays
b.set(10, 1, 5, 'minecraft:smooth_stone_slab[type=bottom,waterlogged=false]');
b.set(10, 1, 4, 'minecraft:chiseled_bookshelf[facing=east]');
b.set(14, 1, 4, 'minecraft:fletching_table');
b.set(15, 1, 4, 'minecraft:target');

// Chandelier hanging in Armoury
b.set(13, 5, 8, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(13, 4, 8, 'minecraft:chain[axis=y,waterlogged=false]');
b.set(13, 3, 8, 'minecraft:lantern[hanging=true,waterlogged=false]');

// =========================================================================
// 6. MASTER CENTER-RIDGE ASCENDING STAIRCASE (Y=1..5)
// =========================================================================
// Ascent vector: climbs North along the East wall (X=17, Z=12..9),
// lands onto turn (X=16..17, Z=8), then steps WEST toward center ridge (X=14..15)!
// Continuous 3.0 blocks vertical headroom guaranteed!

// Step 1: at Z=12
b.set(17, 1, 12, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(17, 2, 12, 'minecraft:air');
b.set(17, 3, 12, 'minecraft:air');
b.set(17, 4, 12, 'minecraft:air');

// Step 2: at Z=11
b.set(17, 1, 11, 'minecraft:spruce_planks');
b.set(17, 2, 11, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(17, 1, 11, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Reverse underside
b.set(17, 3, 11, 'minecraft:air');
b.set(17, 4, 11, 'minecraft:air');
b.set(17, 5, 11, 'minecraft:air');

// Step 3: at Z=10
b.set(17, 2, 10, 'minecraft:spruce_planks');
b.set(17, 3, 10, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(17, 2, 10, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Reverse underside
b.set(17, 4, 10, 'minecraft:air');
b.set(17, 5, 10, 'minecraft:air');
b.set(17, 6, 10, 'minecraft:air');

// Step 4: at Z=9
b.set(17, 3, 9, 'minecraft:spruce_planks');
b.set(17, 4, 9, 'minecraft:spruce_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]');
b.set(17, 3, 9, 'minecraft:spruce_stairs[facing=south,half=top,shape=straight,waterlogged=false]'); // Reverse underside
b.set(17, 5, 9, 'minecraft:air');
b.set(17, 6, 9, 'minecraft:air');
b.set(17, 7, 9, 'minecraft:air');

// Turning Landing at Z=8: X=16..17
b.set(17, 4, 8, 'minecraft:spruce_planks');
b.set(16, 4, 8, 'minecraft:spruce_planks');
b.set(17, 5, 8, 'minecraft:air');
b.set(17, 6, 8, 'minecraft:air');
b.set(17, 7, 8, 'minecraft:air');
b.set(16, 5, 8, 'minecraft:air');
b.set(16, 6, 8, 'minecraft:air');
b.set(16, 7, 8, 'minecraft:air');

// Final Step 5: Steps WEST toward center at X=15, Z=8
b.set(15, 5, 8, 'minecraft:spruce_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]');
b.set(15, 4, 8, 'minecraft:spruce_stairs[facing=east,half=top,shape=straight,waterlogged=false]'); // Reverse underside
b.set(15, 6, 8, 'minecraft:air');
b.set(15, 7, 8, 'minecraft:air');
b.set(15, 8, 8, 'minecraft:air');

// Loft Arrival Floor at X=14, Z=8: wide, open corridor under the high center ridge!
b.set(14, 5, 8, 'minecraft:spruce_planks');
b.set(14, 6, 8, 'minecraft:air');
b.set(14, 7, 8, 'minecraft:air');
b.set(14, 8, 8, 'minecraft:air');

// Cut out ceiling floorboards above the entire stairwell at Y=5!
for (let z = 8; z <= 12; z++) {
  b.set(17, 5, z, 'minecraft:air');
  b.set(16, 5, z, 'minecraft:air');
}

// =========================================================================
// 7. THE CANTILEVERED JETTY OVERHANG (Y=5..6)
// =========================================================================
// Signature medieval master technique: The second floor overhangs 1 block!
// North overhang: Z=2 (above entrance)
// South overhang: Z=14
// East overhang: X=19
// West overhang: X=8

// Floor joists extending outward at Y=5:
for (let x = 8; x <= 19; x++) {
  b.set(x, 5, 2, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 5, 14, 'minecraft:stripped_dark_oak_wood[axis=x]');
}
for (let z = 2; z <= 14; z++) {
  b.set(8, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
  b.set(19, 5, z, 'minecraft:stripped_dark_oak_wood[axis=z]');
}

// Structural Corbel Brackets underneath the overhang (Y=4):
// North jetty brackets:
for (let x = 9; x <= 18; x += 3) {
  b.set(x, 4, 2, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
  b.set(x, 3, 2, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
}
// South jetty brackets:
for (let x = 9; x <= 18; x += 3) {
  b.set(x, 4, 14, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
  b.set(x, 3, 14, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
}
// East jetty brackets:
for (let z = 4; z <= 12; z += 3) {
  b.set(19, 4, z, 'minecraft:dark_oak_stairs[facing=west,half=top,shape=straight,waterlogged=false]');
}

// Second floorboards at Y=5 (inside the cantilevered perimeter X=9..18, Z=3..13)
for (let x = 9; x <= 18; x++) {
  for (let z = 3; z <= 13; z++) {
    // Leave stairwell open
    if (!(x >= 16 && z >= 8 && z <= 12)) {
      b.set(x, 5, z, 'minecraft:spruce_planks');
    }
  }
}

// =========================================================================
// 8. UPPER LOFT LIVING QUARTERS (Y=6..9)
// =========================================================================
// Corner & Framing posts at Y=6..9
const loftPosts = [
  [8, 2], [13, 2], [19, 2],
  [8, 14], [13, 14], [19, 14],
  [8, 8], [19, 8]
];

for (const [lx, lz] of loftPosts) {
  for (let y = 6; y <= 9; y++) {
    b.set(lx, y, lz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  }
}

// Recessed Plaster Infill Walls at Y=6..8:
// North Wall (Z=2):
for (let x = 9; x <= 18; x++) {
  if (x !== 13) {
    b.set(x, 6, 2, getPlaster(x * 7));
    b.set(x, 7, 2, getPlaster(x * 7 + 1));
    b.set(x, 8, 2, getPlaster(x * 7 + 2));
  }
}
// Dormer North Gable Window at X=13..14, Y=7
b.set(13, 7, 2, 'minecraft:glass_pane[east=true,west=false,north=false,south=false,waterlogged=false]');
b.set(14, 7, 2, 'minecraft:glass_pane[east=false,west=true,north=false,south=false,waterlogged=false]');
b.set(13, 8, 2, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(14, 8, 2, 'minecraft:dark_oak_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(12, 7, 1, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');
b.set(15, 7, 1, 'minecraft:spruce_trapdoor[facing=north,half=bottom,open=true,waterlogged=false]');

// South Wall (Z=14):
for (let x = 9; x <= 18; x++) {
  if (x !== 13) {
    b.set(x, 6, 14, getPlaster(x * 9));
    b.set(x, 7, 14, getPlaster(x * 9 + 1));
    b.set(x, 8, 14, getPlaster(x * 9 + 2));
  }
}
// South Window at X=13..14, Y=7
b.set(13, 7, 14, 'minecraft:glass_pane[east=true,west=false,north=false,south=false,waterlogged=false]');
b.set(14, 7, 14, 'minecraft:glass_pane[east=false,west=true,north=false,south=false,waterlogged=false]');
b.set(13, 8, 14, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');
b.set(14, 8, 14, 'minecraft:dark_oak_stairs[facing=south,half=top,shape=straight,waterlogged=false]');

// East Wall (X=19):
for (let z = 3; z <= 13; z++) {
  if (z !== 8) {
    b.set(19, 6, z, getPlaster(z * 11));
    b.set(19, 7, z, getPlaster(z * 11 + 1));
    b.set(19, 8, z, getPlaster(z * 11 + 2));
  }
}
// East Loft Window at Z=8, Y=7
b.set(19, 7, 8, 'minecraft:glass_pane[east=false,west=false,north=true,south=true,waterlogged=false]');
b.set(19, 8, 8, 'minecraft:dark_oak_stairs[facing=east,half=top,shape=straight,waterlogged=false]');

// West Wall (X=8):
for (let z = 3; z <= 13; z++) {
  if (z !== 8) {
    b.set(8, 6, z, getPlaster(z * 13));
    b.set(8, 7, z, getPlaster(z * 13 + 1));
    b.set(8, 8, z, getPlaster(z * 13 + 2));
  }
}

// Loft Furnishings:
// Blacksmith's Bunk Bed at X=10..11, Z=4
b.set(10, 6, 4, 'minecraft:red_bed[facing=south,occupied=false,part=head]');
b.set(10, 6, 3, 'minecraft:red_bed[facing=south,occupied=false,part=foot]');
// Nightstand & Lantern
b.set(11, 6, 3, 'minecraft:barrel[facing=up,open=false]');
b.set(11, 7, 3, 'minecraft:lantern[hanging=false,waterlogged=false]');
// Personal loot chest
b.set(12, 6, 4, 'minecraft:chest[facing=south,type=single,waterlogged=false]');
b.set(12, 7, 4, 'minecraft:air'); // Lid clearance
// Study desk
b.set(10, 6, 12, 'minecraft:spruce_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(11, 6, 12, 'minecraft:spruce_stairs[facing=north,half=top,shape=straight,waterlogged=false]');
b.set(10, 7, 12, 'minecraft:potted_cornflower');
b.set(11, 7, 12, 'minecraft:candle[candles=2,lit=true,waterlogged=false]');
b.set(9, 6, 12, 'minecraft:chiseled_bookshelf[facing=north]');

// Safety railing along the west side of the stair opening at Y=6
b.set(15, 6, 9, 'minecraft:spruce_fence[east=false,north=false,south=true,waterlogged=false,west=false]');
b.set(15, 6, 10, 'minecraft:spruce_fence[east=false,north=true,south=true,waterlogged=false,west=false]');
b.set(15, 6, 11, 'minecraft:spruce_fence[east=false,north=true,south=true,waterlogged=false,west=false]');
b.set(15, 6, 12, 'minecraft:spruce_fence[east=false,north=true,south=false,waterlogged=false,west=false]');
// Ensure landing at X=16..17, Z=8 is 100% open air at Y=5..8
b.set(16, 6, 8, 'minecraft:air');
b.set(16, 7, 8, 'minecraft:air');
b.set(17, 6, 8, 'minecraft:air');
b.set(17, 7, 8, 'minecraft:air');

// Upper Collar Tie-Beams across loft ceiling at Y=9
for (let x = 8; x <= 19; x++) {
  b.set(x, 9, 2, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 9, 8, 'minecraft:stripped_dark_oak_wood[axis=x]');
  b.set(x, 9, 14, 'minecraft:stripped_dark_oak_wood[axis=x]');
}

// =========================================================================
// 9. THE MASTER FANTASY CURVING ROOF & GABLES (Y=9..16)
// =========================================================================
// Center Ridge is at X=13..14!
// Curving Gothic profile:
// X=7 / X=20: Eaves flare (Y=8..9)
// X=8 / X=19: Lower slope (Y=9..10)
// X=9..10 / X=17..18: Mid slope (Y=11..12)
// X=11..12 / X=15..16: High slope (Y=13..14)
// X=13..14: Peak Ridge (Y=15)
//
// Front Gable bargeboard extends 1 block in front to Z=1!
// Rear Gable bargeboard extends 1 block behind to Z=15!

// Let's build the roof rafters for every Z from 1 to 15:
for (let z = 1; z <= 15; z++) {
  const isGableTrim = (z === 1 || z === 15);
  const stairMat = isGableTrim ? 'dark_oak_stairs' : 'deepslate_tile_stairs';
  const slabMat = isGableTrim ? 'dark_oak_slab' : 'deepslate_tile_slab';
  const blockMat = isGableTrim ? 'dark_oak_planks' : 'deepslate_tiles';

  // --- West Slope (X=7 to X=13) ---
  // Eave overhang at X=7, Y=8
  b.set(7, 8, z, `minecraft:${slabMat}[type=top,waterlogged=false]`);
  b.set(7, 7, z, 'minecraft:spruce_trapdoor[facing=east,half=top,open=false,waterlogged=false]'); // Eave soffit
  
  // Step 1: X=8, Y=9
  b.set(8, 9, z, `minecraft:${stairMat}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
  b.set(8, 8, z, `minecraft:${stairMat}[facing=west,half=top,shape=straight,waterlogged=false]`); // Reverse corbel

  // Step 2: X=9, Y=10
  b.set(9, 10, z, `minecraft:${stairMat}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
  b.set(9, 9, z, `minecraft:${blockMat}`);

  // Step 3: X=10, Y=11
  b.set(10, 11, z, `minecraft:${stairMat}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
  b.set(10, 10, z, `minecraft:${blockMat}`);

  // Step 4: X=11, Y=12
  b.set(11, 12, z, `minecraft:${stairMat}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
  b.set(11, 11, z, `minecraft:${blockMat}`);

  // Step 5: X=12, Y=13
  b.set(12, 13, z, `minecraft:${stairMat}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
  b.set(12, 12, z, `minecraft:${blockMat}`);

  // Step 6: X=13, Y=14
  b.set(13, 14, z, `minecraft:${stairMat}[facing=east,half=bottom,shape=straight,waterlogged=false]`);
  b.set(13, 13, z, `minecraft:${blockMat}`);

  // --- East Slope (X=20 down to X=14) ---
  // Eave overhang at X=20, Y=8
  b.set(20, 8, z, `minecraft:${slabMat}[type=top,waterlogged=false]`);
  b.set(20, 7, z, 'minecraft:spruce_trapdoor[facing=west,half=top,open=false,waterlogged=false]'); // Eave soffit

  // Step 1: X=19, Y=9
  b.set(19, 9, z, `minecraft:${stairMat}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(19, 8, z, `minecraft:${stairMat}[facing=east,half=top,shape=straight,waterlogged=false]`);

  // Step 2: X=18, Y=10
  b.set(18, 10, z, `minecraft:${stairMat}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(18, 9, z, `minecraft:${blockMat}`);

  // Step 3: X=17, Y=11
  b.set(17, 11, z, `minecraft:${stairMat}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(17, 10, z, `minecraft:${blockMat}`);

  // Step 4: X=16, Y=12
  b.set(16, 12, z, `minecraft:${stairMat}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(16, 11, z, `minecraft:${blockMat}`);

  // Step 5: X=15, Y=13
  b.set(15, 13, z, `minecraft:${stairMat}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(15, 12, z, `minecraft:${blockMat}`);

  // Step 6: X=14, Y=14
  b.set(14, 14, z, `minecraft:${stairMat}[facing=west,half=bottom,shape=straight,waterlogged=false]`);
  b.set(14, 13, z, `minecraft:${blockMat}`);

  // --- Peak Ridge Crest (X=13..14, Y=15) ---
  b.set(13, 15, z, 'minecraft:dark_oak_slab[type=bottom,waterlogged=false]');
  b.set(14, 15, z, 'minecraft:dark_oak_slab[type=bottom,waterlogged=false]');
}

// Gable Wall Infill (Z=2 and Z=14) up to the roof rafters:
for (const gz of [2, 14]) {
  // Infill above Y=9:
  b.set(9, 9, gz, getPlaster(gz * 3));
  b.set(10, 9, gz, getPlaster(gz * 3 + 1));
  b.set(10, 10, gz, getPlaster(gz * 3 + 2));
  b.set(11, 9, gz, getPlaster(gz * 3 + 3));
  b.set(11, 10, gz, getPlaster(gz * 3 + 4));
  b.set(11, 11, gz, getPlaster(gz * 3 + 5));
  b.set(12, 9, gz, getPlaster(gz * 3 + 6));
  b.set(12, 10, gz, getPlaster(gz * 3 + 7));
  b.set(12, 11, gz, getPlaster(gz * 3 + 8));
  b.set(12, 12, gz, getPlaster(gz * 3 + 9));
  b.set(13, 9, gz, 'minecraft:stripped_dark_oak_wood[axis=y]'); // Center vertical timber truss!
  b.set(13, 10, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(13, 11, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(13, 12, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(13, 13, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');

  b.set(14, 9, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(14, 10, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(14, 11, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(14, 12, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(14, 13, gz, 'minecraft:stripped_dark_oak_wood[axis=y]');
  b.set(15, 9, gz, getPlaster(gz * 5));
  b.set(15, 10, gz, getPlaster(gz * 5 + 1));
  b.set(15, 11, gz, getPlaster(gz * 5 + 2));
  b.set(15, 12, gz, getPlaster(gz * 5 + 3));
  b.set(16, 9, gz, getPlaster(gz * 5 + 4));
  b.set(16, 10, gz, getPlaster(gz * 5 + 5));
  b.set(16, 11, gz, getPlaster(gz * 5 + 6));
  b.set(17, 9, gz, getPlaster(gz * 5 + 7));
  b.set(17, 10, gz, getPlaster(gz * 5 + 8));
  b.set(18, 9, gz, getPlaster(gz * 5 + 9));
}

// Ornamental Roof Spire Finials on Front & Back Gables
b.set(13, 16, 1, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
b.set(14, 16, 1, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
b.set(13, 16, 15, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');
b.set(14, 16, 15, 'minecraft:dark_oak_fence[east=false,north=false,south=false,waterlogged=false,west=false]');

// =========================================================================
// 10. FORGE PAVILION LEAN-TO ROOF (X=1..7, Z=2..13)
// =========================================================================
// The forge has a handsome, sloping open timber roof covering the forge area:
// Slopes gently down to the West:
// X=7: Y=7
// X=5..6: Y=6
// X=3..4: Y=6
// X=1..2: Y=5
for (let z = 2; z <= 13; z++) {
  // Avoid chimney intersection at X=4..5, Z=4..5
  const isChimney = (z >= 4 && z <= 5);

  b.set(7, 7, z, 'minecraft:deepslate_tile_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
  b.set(6, 6, z, 'minecraft:dark_oak_slab[type=top,waterlogged=false]');
  if (!(isChimney)) {
    b.set(5, 6, z, 'minecraft:spruce_planks');
    b.set(4, 6, z, 'minecraft:spruce_planks');
  }
  b.set(3, 6, z, 'minecraft:dark_oak_slab[type=top,waterlogged=false]');
  b.set(2, 5, z, 'minecraft:deepslate_tile_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
  b.set(1, 5, z, 'minecraft:dark_oak_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]');
  b.set(0, 5, z, 'minecraft:dark_oak_slab[type=top,waterlogged=false]'); // Outer eave overhang
}

// =========================================================================
// 11. ORGANIC NATURE & FOLIAGE DRAPING
// =========================================================================
// Master-builder signature: leaves cascading over eaves and stone pillars
const foliageBlocks = [
  // Chimney climbers
  [3, 4, 3, 'minecraft:flowering_azalea_leaves[distance=1,persistent=true,waterlogged=false]'],
  [3, 5, 3, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  [3, 6, 3, 'minecraft:flowering_azalea_leaves[distance=1,persistent=true,waterlogged=false]'],
  [6, 5, 4, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  [6, 6, 4, 'minecraft:flowering_azalea_leaves[distance=1,persistent=true,waterlogged=false]'],
  // Forge eave drape
  [0, 4, 3, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  [0, 4, 8, 'minecraft:flowering_azalea_leaves[distance=1,persistent=true,waterlogged=false]'],
  [0, 4, 12, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  [1, 4, 13, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  // Corner wall drape
  [19, 3, 2, 'minecraft:flowering_azalea_leaves[distance=1,persistent=true,waterlogged=false]'],
  [19, 4, 2, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  [19, 3, 14, 'minecraft:oak_leaves[distance=1,persistent=true,waterlogged=false]'],
  [19, 4, 14, 'minecraft:flowering_azalea_leaves[distance=1,persistent=true,waterlogged=false]']
];

for (const [fx, fy, fz, fBlock] of foliageBlocks) {
  if (b.get(fx, fy, fz) === 'minecraft:air') {
    b.set(fx, fy, fz, fBlock);
  }
}

// =========================================================================
// 12. EXPORT SCHEMATIC AND LITEMATIC
// =========================================================================
console.log('Counting materials...');
const { totalBlocks, materials } = b.countMaterials();
console.log(`Master Refurbished Build #2: ${totalBlocks} non-air blocks placed.`);

// Consolidate duplicates
const consolidatedMap = new Map();
for (const item of materials) {
  consolidatedMap.set(item.name, (consolidatedMap.get(item.name) || 0) + item.count);
}
const finalMaterials = Array.from(consolidatedMap.entries())
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 18);

fs.writeFileSync('build2_refurbished_materials.json', JSON.stringify({
  dimensions: { width: 20, height: 17, length: 16 },
  blockCount: totalBlocks,
  materials: finalMaterials
}, null, 2));

console.log('Writing Sponge V2 Schematic...');
const schemBuf = b.toSpongeSchematic('Medieval Village Blacksmith & Armoury (Master Edition)', 'MineVault Studio');
fs.writeFileSync('downloads/medieval_blacksmith_armoury.schem', schemBuf);
fs.writeFileSync('C:\\Users\\ip762\\AppData\\Roaming\\.minecraft\\schematics\\medieval_blacksmith_armoury.schem', schemBuf);

console.log('Writing Litematica Blueprint...');
const litematicBuf = b.toLitematic('Medieval Village Blacksmith & Armoury (Master Edition)', 'MineVault Studio');
fs.writeFileSync('downloads/medieval_blacksmith_armoury.litematic', litematicBuf);
fs.writeFileSync('C:\\Users\\ip762\\AppData\\Roaming\\.minecraft\\schematics\\medieval_blacksmith_armoury.litematic', litematicBuf);

console.log('Build #2 Master Refurbishment successfully completed and placed in Minecraft schematics folder!');
