const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

class NbtWriter {
  constructor() { this.buffers = []; }
  writeByte(val) { const b = Buffer.alloc(1); b.writeInt8(val); this.buffers.push(b); }
  writeShort(val) { const b = Buffer.alloc(2); b.writeInt16BE(val); this.buffers.push(b); }
  writeInt(val) { const b = Buffer.alloc(4); b.writeInt32BE(val); this.buffers.push(b); }
  writeLong(val) { const b = Buffer.alloc(8); b.writeBigInt64BE(BigInt.asIntN(64, BigInt(val))); this.buffers.push(b); }
  writeString(str) { const strBuf = Buffer.from(str, 'utf8'); this.writeShort(strBuf.length); this.buffers.push(strBuf); }
  writeTagHeader(type, name) { this.writeByte(type); this.writeString(name); }
  getBuffer() { return Buffer.concat(this.buffers); }
}

function writeTag(writer, type, name, val) {
  writer.writeTagHeader(type, name);
  if (type === 1) writer.writeByte(val);
  else if (type === 2) writer.writeShort(val);
  else if (type === 3) writer.writeInt(val);
  else if (type === 4) writer.writeLong(val);
  else if (type === 8) writer.writeString(val);
}

class VoxelCanvas {
  constructor(w, h, l) {
    this.w = w;
    this.h = h;
    this.l = l;
    this.paletteMap = { 'minecraft:air': 0 };
    this.paletteList = ['minecraft:air'];
    this.blocks = new Uint16Array(w * h * l);
  }

  getId(blockName) {
    if (this.paletteMap[blockName] !== undefined) return this.paletteMap[blockName];
    const newId = this.paletteList.length;
    this.paletteMap[blockName] = newId;
    this.paletteList.push(blockName);
    return newId;
  }

  set(x, y, z, blockName) {
    x = Math.round(x); y = Math.round(y); z = Math.round(z);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h || z < 0 || z >= this.l) return;
    const idx = (y * this.l + z) * this.w + x;
    this.blocks[idx] = this.getId(blockName);
  }

  get(x, y, z) {
    x = Math.round(x); y = Math.round(y); z = Math.round(z);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h || z < 0 || z >= this.l) return 'minecraft:air';
    const idx = (y * this.l + z) * this.w + x;
    return this.paletteList[this.blocks[idx]] || 'minecraft:air';
  }

  box(x1, y1, z1, x2, y2, z2, blockName) {
    const minX = Math.max(0, Math.min(x1, x2));
    const maxX = Math.min(this.w - 1, Math.max(x1, x2));
    const minY = Math.max(0, Math.min(y1, y2));
    const maxY = Math.min(this.h - 1, Math.max(y1, y2));
    const minZ = Math.max(0, Math.min(z1, z2));
    const maxZ = Math.min(this.l - 1, Math.max(z1, z2));
    const id = this.getId(blockName);

    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        for (let x = minX; x <= maxX; x++) {
          this.blocks[(y * this.l + z) * this.w + x] = id;
        }
      }
    }
  }

  walls(x1, y1, z1, x2, y2, z2, blockName) {
    const minX = Math.min(x1, x2); const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2); const maxY = Math.max(y1, y2);
    const minZ = Math.min(z1, z2); const maxZ = Math.max(z1, z2);
    this.box(minX, minY, minZ, maxX, maxY, minZ, blockName);
    this.box(minX, minY, maxZ, maxX, maxY, maxZ, blockName);
    this.box(minX, minY, minZ, minX, maxY, maxZ, blockName);
    this.box(maxX, minY, minZ, maxX, maxY, maxZ, blockName);
  }

  hollowBox(x1, y1, z1, x2, y2, z2, blockName) {
    this.walls(x1, y1, z1, x2, y2, z2, blockName);
    this.floor(x1, z1, x2, z2, y1, blockName);
    this.floor(x1, z1, x2, z2, y2, blockName);
  }

  floor(x1, z1, x2, z2, y, blockName) {
    this.box(x1, y, z1, x2, y, z2, blockName);
  }

  cylinder(cx, cz, y1, y2, radius, blockName, hollow = false) {
    const minY = Math.max(0, Math.min(y1, y2));
    const maxY = Math.min(this.h - 1, Math.max(y1, y2));
    const r2 = radius * radius;
    const innerR2 = (radius - 1) * (radius - 1);
    const id = this.getId(blockName);

    for (let y = minY; y <= maxY; y++) {
      for (let dz = -radius; dz <= radius; dz++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const dist2 = dx * dx + dz * dz;
          if (dist2 <= r2) {
            if (!hollow || dist2 >= innerR2) {
              const px = Math.round(cx + dx);
              const pz = Math.round(cz + dz);
              if (px >= 0 && px < this.w && pz >= 0 && pz < this.l) {
                this.blocks[(y * this.l + pz) * this.w + px] = id;
              }
            }
          }
        }
      }
    }
  }

  cone(cx, cz, yBase, height, baseRadius, blockName) {
    const id = this.getId(blockName);
    for (let dy = 0; dy < height; dy++) {
      const y = yBase + dy;
      if (y >= this.h) break;
      const r = baseRadius * (1 - dy / height);
      const r2 = r * r;
      for (let dz = -Math.ceil(r); dz <= Math.ceil(r); dz++) {
        for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
          if (dx * dx + dz * dz <= r2) {
            const px = Math.round(cx + dx);
            const pz = Math.round(cz + dz);
            if (px >= 0 && px < this.w && pz >= 0 && pz < this.l) {
              this.blocks[(y * this.l + pz) * this.w + px] = id;
            }
          }
        }
      }
    }
  }

  ellipsoid(cx, cy, cz, rx, ry, rz, blockName) {
    const id = this.getId(blockName);
    for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(this.h - 1, Math.ceil(cy + ry)); y++) {
      const dy = (y - cy) / ry;
      for (let z = Math.max(0, Math.floor(cz - rz)); z <= Math.min(this.l - 1, Math.ceil(cz + rz)); z++) {
        const dz = (z - cz) / rz;
        for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(this.w - 1, Math.ceil(cx + rx)); x++) {
          const dx = (x - cx) / rx;
          if (dx * dx + dy * dy + dz * dz <= 1.0) {
            this.blocks[(y * this.l + z) * this.w + x] = id;
          }
        }
      }
    }
  }

  pitchedRoofX(x1, z1, x2, z2, yBase, roofBlock, wallBlock) {
    const minZ = Math.min(z1, z2); const maxZ = Math.max(z1, z2);
    const minX = Math.min(x1, x2); const maxX = Math.max(x1, x2);
    const depth = maxZ - minZ;
    const halfDepth = Math.floor(depth / 2);

    for (let step = 0; step <= halfDepth; step++) {
      const y = yBase + step;
      if (y >= this.h) break;
      const curZ1 = minZ + step;
      const curZ2 = maxZ - step;
      this.box(minX, y, curZ1, maxX, y, curZ1, roofBlock);
      this.box(minX, y, curZ2, maxX, y, curZ2, roofBlock);
      // Fill gable walls at both X ends
      if (wallBlock) {
        this.box(minX, y, curZ1 + 1, minX, y, curZ2 - 1, wallBlock);
        this.box(maxX, y, curZ1 + 1, maxX, y, curZ2 - 1, wallBlock);
      }
    }
  }

  pitchedRoofZ(x1, z1, x2, z2, yBase, roofBlock, wallBlock) {
    const minX = Math.min(x1, x2); const maxX = Math.max(x1, x2);
    const minZ = Math.min(z1, z2); const maxZ = Math.max(z1, z2);
    const width = maxX - minX;
    const halfWidth = Math.floor(width / 2);

    for (let step = 0; step <= halfWidth; step++) {
      const y = yBase + step;
      if (y >= this.h) break;
      const curX1 = minX + step;
      const curX2 = maxX - step;
      this.box(curX1, y, minZ, curX1, y, maxZ, roofBlock);
      this.box(curX2, y, minZ, curX2, y, maxZ, roofBlock);
      if (wallBlock) {
        this.box(curX1 + 1, y, minZ, curX2 - 1, y, minZ, wallBlock);
        this.box(curX1 + 1, y, maxZ, curX2 - 1, y, maxZ, wallBlock);
      }
    }
  }

  countMaterials() {
    const counts = {};
    let total = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      const id = this.blocks[i];
      if (id !== 0) {
        const name = this.paletteList[id];
        counts[name] = (counts[name] || 0) + 1;
        total++;
      }
    }

    // Format into friendly Minecraft names
    const materials = Object.entries(counts)
      .map(([rawName, count]) => {
        let cleanName = rawName.replace('minecraft:', '').split('[')[0];
        cleanName = cleanName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return { name: cleanName, count };
      })
      .sort((a, b) => b.count - a.count);

    return { totalBlocks: total, materials };
  }

  toSpongeSchematic() {
    const w = new NbtWriter();
    w.writeByte(0x0a); // TAG_Compound
    w.writeString('Schematic');

    writeTag(w, 3, 'Version', 2);
    writeTag(w, 3, 'DataVersion', 3465); // 1.20+
    writeTag(w, 2, 'Width', this.w);
    writeTag(w, 2, 'Height', this.h);
    writeTag(w, 2, 'Length', this.l);

    // Offset [0, 0, 0]
    w.writeTagHeader(0x0b, 'Offset');
    w.writeInt(3);
    w.writeInt(0); w.writeInt(0); w.writeInt(0);

    // Palette
    w.writeTagHeader(0x0a, 'Palette');
    for (const [blockName, id] of Object.entries(this.paletteMap)) {
      writeTag(w, 3, blockName, id);
    }
    w.writeByte(0x00); // End Palette

    writeTag(w, 3, 'PaletteMax', this.paletteList.length);

    // BlockData (VarInt bytes)
    const varIntBufs = [];
    for (let i = 0; i < this.blocks.length; i++) {
      let val = this.blocks[i];
      while ((val & -128) !== 0) {
        varIntBufs.push(Buffer.from([(val & 127) | 128]));
        val >>>= 7;
      }
      varIntBufs.push(Buffer.from([val]));
    }
    const blockData = Buffer.concat(varIntBufs);

    w.writeTagHeader(0x07, 'BlockData');
    w.writeInt(blockData.length);
    w.buffers.push(blockData);

    // Empty BlockEntities and Entities
    w.writeTagHeader(0x09, 'BlockEntities');
    w.writeByte(0x0a);
    w.writeInt(0);

    w.writeTagHeader(0x09, 'Entities');
    w.writeByte(0x0a);
    w.writeInt(0);

    w.writeByte(0x00); // End Schematic
    return zlib.gzipSync(w.getBuffer());
  }

  toLitematic(buildName, author) {
    const w = new NbtWriter();
    w.writeByte(0x0a); // TAG_Compound
    w.writeString('Litematic');

    writeTag(w, 3, 'MinecraftDataVersion', 3465);
    writeTag(w, 3, 'Version', 6);

    // Metadata
    w.writeTagHeader(0x0a, 'Metadata');
    writeTag(w, 8, 'Author', author || 'MineVault');
    writeTag(w, 8, 'Description', 'MineVault Verified Build');
    writeTag(w, 8, 'Name', buildName || 'Build');

    w.writeTagHeader(0x0a, 'EnclosingSize');
    writeTag(w, 3, 'x', this.w);
    writeTag(w, 3, 'y', this.h);
    writeTag(w, 3, 'z', this.l);
    w.writeByte(0x00);

    let totalNonAir = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i] !== 0) totalNonAir++;
    }
    writeTag(w, 3, 'TotalBlocks', totalNonAir);
    writeTag(w, 3, 'TotalVolume', this.w * this.h * this.l);
    w.writeByte(0x00); // End Metadata

    // Regions
    w.writeTagHeader(0x0a, 'Regions');
    w.writeTagHeader(0x0a, 'Main');

    w.writeTagHeader(0x0a, 'Position');
    writeTag(w, 3, 'x', 0);
    writeTag(w, 3, 'y', 0);
    writeTag(w, 3, 'z', 0);
    w.writeByte(0x00);

    w.writeTagHeader(0x0a, 'Size');
    writeTag(w, 3, 'x', this.w);
    writeTag(w, 3, 'y', this.h);
    writeTag(w, 3, 'z', this.l);
    w.writeByte(0x00);

    // BlockStatePalette
    w.writeTagHeader(0x09, 'BlockStatePalette');
    w.writeByte(0x0a);
    w.writeInt(this.paletteList.length);
    for (const blockName of this.paletteList) {
      writeTag(w, 8, 'Name', blockName);
      w.writeByte(0x00);
    }

    // Bit-packed BlockStates Long Array
    const bits = Math.max(2, Math.ceil(Math.log2(this.paletteList.length || 1)));
    const totalEntries = this.w * this.h * this.l;
    const entriesPerLong = Math.floor(64 / bits);
    const totalLongs = Math.ceil(totalEntries / entriesPerLong);

    w.writeTagHeader(0x0c, 'BlockStates');
    w.writeInt(totalLongs);

    let currentLong = 0n;
    let inLongCount = 0;

    for (let i = 0; i < totalEntries; i++) {
      const val = BigInt(this.blocks[i] || 0);
      const shift = BigInt(inLongCount * bits);
      currentLong |= (val << shift);
      inLongCount++;

      if (inLongCount === entriesPerLong || i === totalEntries - 1) {
        w.writeLong(currentLong);
        currentLong = 0n;
        inLongCount = 0;
      }
    }

    w.writeTagHeader(0x09, 'Entities');
    w.writeByte(0x0a);
    w.writeInt(0);

    w.writeTagHeader(0x09, 'PendingBlockTicks');
    w.writeByte(0x0a);
    w.writeInt(0);

    w.writeTagHeader(0x09, 'TileEntities');
    w.writeByte(0x0a);
    w.writeInt(0);

    w.writeByte(0x00); // End Main
    w.writeByte(0x00); // End Regions
    w.writeByte(0x00); // End Root
    return zlib.gzipSync(w.getBuffer());
  }
}

module.exports = { VoxelCanvas };
