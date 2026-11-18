const { VoxelCanvas } = require('./voxel_canvas');

class VoxelArchitect extends VoxelCanvas {
  constructor(w, h, l) {
    super(w, h, l);
  }

  // Doorway opening through a wall
  doorway(x, y, z, width = 1, height = 2, axis = 'x') {
    if (axis === 'x') {
      this.box(x, y, z, x + width - 1, y + height - 1, z, 'minecraft:air');
    } else {
      this.box(x, y, z, x, y + height - 1, z + width - 1, 'minecraft:air');
    }
  }

  // Window opening with glass panes
  window(x, y, z, width = 2, height = 2, axis = 'x', glassBlock = 'minecraft:glass_pane') {
    if (axis === 'x') {
      this.box(x, y, z, x + width - 1, y + height - 1, z, glassBlock);
    } else {
      this.box(x, y, z, x, y + height - 1, z + width - 1, glassBlock);
    }
  }

  // Linear staircase connecting two floor levels with automatic headroom cutout
  straightStairs(startX, startY, startZ, length, dx, dz, width = 2, stairBlock = 'minecraft:spruce_stairs', plankBlock = 'minecraft:spruce_planks') {
    for (let step = 0; step < length; step++) {
      const cx = startX + step * dx;
      const cy = startY + step;
      const cz = startZ + step * dz;

      // Cutout 3 blocks of headroom so players don't hit their head
      if (dx !== 0) {
        this.box(cx, cy, cz, cx, cy + 3, cz + width - 1, 'minecraft:air');
        this.box(cx, cy, cz, cx, cy, cz + width - 1, stairBlock);
        if (step > 0) {
          this.box(cx, startY, cz, cx, cy - 1, cz + width - 1, plankBlock);
        }
      } else {
        this.box(cx, cy, cz, cx + width - 1, cy + 3, cz, 'minecraft:air');
        this.box(cx, cy, cz, cx + width - 1, cy, cz, stairBlock);
        if (step > 0) {
          this.box(cx, startY, cz, cx + width - 1, cy - 1, cz, plankBlock);
        }
      }
    }
  }

  // Spiral staircase inside a circular or square tower
  spiralStairs(cx, cz, yStart, yEnd, radius = 2, centerPillar = 'minecraft:stripped_spruce_log', stairBlock = 'minecraft:stone_brick_stairs') {
    // Center pillar
    this.box(cx, yStart, cz, cx, yEnd, cz, centerPillar);
    const steps = [
      { dx: 1, dz: 0 },
      { dx: 1, dz: 1 },
      { dx: 0, dz: 1 },
      { dx: -1, dz: 1 },
      { dx: -1, dz: 0 },
      { dx: -1, dz: -1 },
      { dx: 0, dz: -1 },
      { dx: 1, dz: -1 }
    ];

    let stepIdx = 0;
    for (let y = yStart; y <= yEnd; y++) {
      const s = steps[stepIdx % steps.length];
      this.set(cx + s.dx, y, cz + s.dz, stairBlock);
      // Ensure headroom above
      if (y + 1 <= yEnd) this.set(cx + s.dx, y + 1, cz + s.dz, 'minecraft:air');
      if (y + 2 <= yEnd) this.set(cx + s.dx, y + 2, cz + s.dz, 'minecraft:air');
      stepIdx++;
    }
  }

  // Hanging Chandelier with iron chain and lanterns
  chandelier(cx, cy, cz, dropLength = 2, spread = 1) {
    // Chain from ceiling
    for (let dy = 0; dy < dropLength; dy++) {
      this.set(cx, cy - dy, cz, 'minecraft:chain');
    }
    const baseY = cy - dropLength;
    this.set(cx, baseY, cz, 'minecraft:spruce_fence');
    if (spread === 0) {
      this.set(cx, baseY - 1, cz, 'minecraft:lantern[hanging=true]');
    } else {
      this.set(cx + spread, baseY, cz, 'minecraft:spruce_fence');
      this.set(cx - spread, baseY, cz, 'minecraft:spruce_fence');
      this.set(cx, baseY, cz + spread, 'minecraft:spruce_fence');
      this.set(cx, baseY, cz - spread, 'minecraft:spruce_fence');

      this.set(cx + spread, baseY - 1, cz, 'minecraft:lantern[hanging=true]');
      this.set(cx - spread, baseY - 1, cz, 'minecraft:lantern[hanging=true]');
      this.set(cx, baseY - 1, cz + spread, 'minecraft:lantern[hanging=true]');
      this.set(cx, baseY - 1, cz - spread, 'minecraft:lantern[hanging=true]');
      this.set(cx, baseY - 1, cz, 'minecraft:lantern[hanging=true]');
    }
  }

  // Grand Fireplace & Hearth with brick chimney
  fireplace(x, y, z, width = 3, height = 4, brickBlock = 'minecraft:bricks', chimneyHeight = 8) {
    // Hearth Base
    this.box(x, y, z, x + width - 1, y, z + 1, brickBlock);
    // Fire opening
    this.box(x + 1, y + 1, z, x + width - 2, y + 2, z, 'minecraft:air');
    this.box(x + 1, y + 1, z, x + width - 2, y + 1, z, 'minecraft:campfire');
    // Surroundings
    this.box(x, y + 1, z, x, y + height - 1, z, brickBlock);
    this.box(x + width - 1, y + 1, z, x + width - 1, y + height - 1, z, brickBlock);
    this.box(x, y + height - 1, z, x + width - 1, y + height - 1, z, brickBlock);
    // Chimney stack
    this.box(x + 1, y + height, z, x + width - 2, y + height + chimneyHeight, z, brickBlock);
    this.set(x + 1, y + height + chimneyHeight + 1, z, 'minecraft:campfire'); // smoking chimney top
  }

  // Long Dining / Banquet Table with stair chairs
  diningTable(x1, z1, x2, z2, y, tableBlock = 'minecraft:spruce_slab', chairBlock = 'minecraft:dark_oak_stairs') {
    this.box(x1, y, z1, x2, y, z2, tableBlock);
    // Place chairs along the lengths
    const minX = Math.min(x1, x2); const maxX = Math.max(x1, x2);
    const minZ = Math.min(z1, z2); const maxZ = Math.max(z1, z2);

    for (let x = minX; x <= maxX; x++) {
      if (z1 - 1 >= 0) this.set(x, y, z1 - 1, chairBlock);
      if (z2 + 1 < this.l) this.set(x, y, z2 + 1, chairBlock);
      // Table settings (flower pot / candle)
      if (x % 2 === 0) this.set(x, y + 1, Math.floor((minZ + maxZ) / 2), 'minecraft:flower_pot');
    }
  }

  // Four-Poster Master Bed with canopy & nightstands
  fourPosterBed(x, y, z, woodType = 'spruce', woolColor = 'red') {
    // Corner posts
    this.box(x, y, z, x, y + 3, z, `minecraft:stripped_${woodType}_log`);
    this.box(x + 2, y, z, x + 2, y + 3, z, `minecraft:stripped_${woodType}_log`);
    this.box(x, y, z + 3, x, y + 3, z + 3, `minecraft:stripped_${woodType}_log`);
    this.box(x + 2, y, z + 3, x + 2, y + 3, z + 3, `minecraft:stripped_${woodType}_log`);

    // Top canopy rails
    this.box(x, y + 3, z, x + 2, y + 3, z, `minecraft:${woodType}_slab`);
    this.box(x, y + 3, z + 3, x + 2, y + 3, z + 3, `minecraft:${woodType}_slab`);
    this.box(x, y + 3, z, x, y + 3, z + 3, `minecraft:${woodType}_slab`);
    this.box(x + 2, y + 3, z, x + 2, y + 3, z + 3, `minecraft:${woodType}_slab`);

    // Double Bed mattress
    this.box(x + 1, y, z + 1, x + 1, y, z + 2, `minecraft:${woolColor}_bed`);
    this.set(x + 1, y, z + 3, `minecraft:${woodType}_trapdoor`); // headboard

    // Nightstands
    if (x - 1 >= 0) {
      this.set(x - 1, y, z + 2, 'minecraft:barrel');
      this.set(x - 1, y + 1, z + 2, 'minecraft:lantern[hanging=false]');
    }
    if (x + 3 < this.w) {
      this.set(x + 3, y, z + 2, 'minecraft:barrel');
      this.set(x + 3, y + 1, z + 2, 'minecraft:flower_pot');
    }
  }

  // Full Functional Kitchen Countertop Unit
  kitchenCounter(startX, y, startZ, length, axis = 'x') {
    const blocks = [
      'minecraft:smoker',
      'minecraft:blast_furnace',
      'minecraft:crafting_table',
      'minecraft:barrel',
      'minecraft:cauldron[level=3]',
      'minecraft:barrel'
    ];

    for (let i = 0; i < length; i++) {
      const cx = (axis === 'x') ? startX + i : startX;
      const cz = (axis === 'x') ? startZ : startZ + i;
      const block = blocks[i % blocks.length];
      this.set(cx, y, cz, block);
      // Countertop wall shelves above
      this.set(cx, y + 2, cz, 'minecraft:spruce_slab');
      if (i % 2 === 0) this.set(cx, y + 3, cz, 'minecraft:lantern[hanging=true]');
    }
  }

  // Full 30-Level Enchanting Sanctum with surrounding bookshelves
  enchantingRoom(cx, cy, cz) {
    // Enchanting table at center
    this.set(cx, cy, cz, 'minecraft:enchanting_table');
    // Bookshelf ring around (leaving 1 block air gap for power level 30)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) === 2 || Math.abs(dz) === 2) {
          // Leave entrance opening at dz = -2, dx = 0
          if (dz === -2 && dx === 0) continue;
          this.set(cx + dx, cy, cz + dz, 'minecraft:bookshelf');
          this.set(cx + dx, cy + 1, cz + dz, 'minecraft:bookshelf');
        }
      }
    }
    // Brewing stands & Lectern
    this.set(cx - 1, cy, cz - 2, 'minecraft:brewing_stand');
    this.set(cx + 1, cy, cz - 2, 'minecraft:lectern');
    this.set(cx, cy + 3, cz, 'minecraft:chain');
    this.set(cx, cy + 2, cz, 'minecraft:lantern[hanging=true]');
  }

  // Exposed Rafter Beams with hanging lanterns across ceiling
  exposedRafters(x1, z1, x2, z2, y, axis = 'x', spacing = 3, logBlock = 'minecraft:stripped_spruce_log') {
    if (axis === 'x') {
      const minZ = Math.min(z1, z2); const maxZ = Math.max(z1, z2);
      for (let z = minZ; z <= maxZ; z += spacing) {
        this.box(x1, y, z, x2, y, z, logBlock);
        // Lantern in the middle
        const midX = Math.floor((x1 + x2) / 2);
        this.set(midX, y - 1, z, 'minecraft:lantern[hanging=true]');
      }
    } else {
      const minX = Math.min(x1, x2); const maxX = Math.max(x1, x2);
      for (let x = minX; x <= maxX; x += spacing) {
        this.box(x, y, z1, x, y, z2, logBlock);
        const midZ = Math.floor((z1 + z2) / 2);
        this.set(x, y - 1, midZ, 'minecraft:lantern[hanging=true]');
      }
    }
  }
}

module.exports = { VoxelArchitect };
