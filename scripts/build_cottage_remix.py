import os
import gzip
import json
import math
import nbtlib
from nbtlib.tag import Compound, String, Int, Short, Long, Byte, ByteArray, IntArray, List

def remap_block_state(bs):
    # 1. Modded blocks
    if 'minecraft:iron_chain' in bs:
        return bs.replace('minecraft:iron_chain', 'minecraft:chain')
    if 'minecraft:oak_shelf' in bs:
        return 'minecraft:oak_slab[type=bottom,waterlogged=false]'
    if 'minecraft:spruce_shelf' in bs:
        return 'minecraft:spruce_slab[type=bottom,waterlogged=false]'
    if 'minecraft:polished_cinnabar_slab' in bs:
        return 'minecraft:polished_blackstone_brick_slab[type=bottom,waterlogged=false]'
    
    # 2. Gravity / Unstable plaster -> Calcite Tudor infill
    if bs == 'minecraft:sand':
        return 'minecraft:calcite'
    
    # 3. Dead coral textures -> Natural stone & tuff masonry
    if 'dead_brain_coral_block' in bs:
        return 'minecraft:andesite'
    if 'dead_bubble_coral_block' in bs:
        return 'minecraft:tuff'
    if 'dead_horn_coral_block' in bs:
        return 'minecraft:cobblestone'
    
    return bs

def build_remix():
    src_path = r'Refrences\Survival Cottage 2 V1.0\survivalcottage2.schem'
    f = nbtlib.load(src_path)
    schem = f['Schematic']
    w = int(schem['Width'])
    h = int(schem['Height'])
    l = int(schem['Length'])
    pal = schem['Blocks']['Palette']
    raw_data = bytes(schem['Blocks']['Data'])

    # Decode varints
    data = []
    i = 0
    while i < len(raw_data):
        val = 0
        shift = 0
        while True:
            b = raw_data[i]
            i += 1
            val |= (b & 0x7F) << shift
            if not (b & 0x80):
                break
            shift += 7
        data.append(val)

    inv_pal = {int(v): k for k, v in pal.items()}
    
    # Apply remap to every cell
    remapped_blocks = []
    for pid in data:
        orig_name = inv_pal[pid]
        new_name = remap_block_state(orig_name)
        remapped_blocks.append(new_name)

    # Build new unique palette
    new_palette = {}
    next_id = 0
    # Ensure air is 0
    new_palette['minecraft:air'] = 0
    next_id = 1

    flat_ids = []
    materials_count = {}
    for b in remapped_blocks:
        if b not in new_palette:
            new_palette[b] = next_id
            next_id += 1
        pid = new_palette[b]
        flat_ids.append(pid)
        base = b.split('[')[0].replace('minecraft:', '')
        if base != 'air':
            materials_count[base] = materials_count.get(base, 0) + 1

    total_non_air = sum(materials_count.values())
    print(f'Decoded: {w}x{h}x{l}, Non-air: {total_non_air}, Palette size: {len(new_palette)}')

    # Filter Block Entities
    bes = schem['Blocks'].get('BlockEntities', [])
    filtered_bes = []
    for be in bes:
        tid = str(be.get('Id', ''))
        if 'shelf' in tid:
            continue
        filtered_bes.append(be)
    print(f'Preserved block entities: {len(filtered_bes)} (removed {len(bes) - len(filtered_bes)} modded shelf entities)')

    # --- 1. SPONGE V2 SCHEMATIC ---
    # Encode varints for Sponge V2
    varint_bytes = bytearray()
    for pid in flat_ids:
        val = pid
        while True:
            b = val & 0x7F
            val >>= 7
            if val != 0:
                b |= 0x80
            varint_bytes.append(b)
            if val == 0:
                break

    sponge_palette = Compound({k: Int(v) for k, v in new_palette.items()})
    schem_root = Compound({
        'Version': Int(2),
        'DataVersion': Int(3953),
        'Width': Short(w),
        'Height': Short(h),
        'Length': Short(l),
        'PaletteMax': Int(len(new_palette)),
        'Palette': sponge_palette,
        'BlockData': ByteArray(varint_bytes),
        'Offset': IntArray([0, 0, 0]),
        'BlockEntities': List[Compound](filtered_bes),
        'Metadata': Compound({
            'Name': String('Medieval Alchemist Manor & Botanical Estate'),
            'Author': String('ip762 & Antigravity (Remix of Survival Cottage 2)'),
            'Date': Long(1795000000000),
            'RequiredMods': List[String]([])
        })
    })

    schem_file = nbtlib.File({'Schematic': schem_root})
    out_schem_pkg = os.path.join('downloads', 'medieval_alchemist_manor.schem')
    schem_file.save(out_schem_pkg, gzipped=True)
    print(f'Saved Sponge V2: {out_schem_pkg} ({os.path.getsize(out_schem_pkg)} bytes)')

    # --- 2. LITEMATICA (.litematic) ---
    # Litematica palette
    litematic_palette = []
    for b_str in sorted(new_palette.keys(), key=lambda k: new_palette[k]):
        parts = b_str.split('[')
        name = parts[0]
        prop_compound = Compound({})
        if len(parts) > 1:
            prop_str = parts[1].rstrip(']')
            for kv in prop_str.split(','):
                k, v = kv.split('=')
                prop_compound[k] = String(v)
        entry = Compound({'Name': String(name)})
        if len(prop_compound) > 0:
            entry['Properties'] = prop_compound
        litematic_palette.append(entry)

    # Bit packing
    pal_len = len(litematic_palette)
    bits = max(2, (pal_len - 1).bit_length())
    total_blocks = len(flat_ids)
    total_bits = total_blocks * bits
    num_longs = (total_bits + 63) // 64
    longs_unsigned = [0] * num_longs

    for i, pid in enumerate(flat_ids):
        sb = i * bits
        sl = sb // 64
        off = sb % 64
        if off + bits <= 64:
            longs_unsigned[sl] |= (pid << off)
        else:
            fit = 64 - off
            longs_unsigned[sl] |= ((pid & ((1 << fit) - 1)) << off)
            longs_unsigned[sl + 1] |= (pid >> fit)

    # Convert unsigned to signed 64-bit int for NBT Long
    longs_signed = []
    for u in longs_unsigned:
        s = u if u < 0x8000000000000000 else u - 0x10000000000000000
        longs_signed.append(Long(s))

    # Litematica BlockEntities:
    # Need x, y, z in each block entity
    litematic_bes = []
    for be in filtered_bes:
        new_be = Compound(dict(be))
        # Ensure Pos / x,y,z formatting
        if 'Pos' in new_be:
            p = new_be['Pos']
            new_be['x'] = Int(int(p[0]))
            new_be['y'] = Int(int(p[1]))
            new_be['z'] = Int(int(p[2]))
        litematic_bes.append(new_be)

    region_name = 'Medieval Alchemist Manor'
    litematic_root = Compound({
        'MinecraftDataVersion': Int(3953),
        'Version': Int(7),
        'SubVersion': Int(1),
        'Metadata': Compound({
            'Author': String('ip762 & Antigravity'),
            'Description': String('Medieval Alchemist Manor & Botanical Estate (Option 2 Master Blueprint Remix)'),
            'Name': String('Medieval Alchemist Manor & Botanical Estate'),
            'EnclosingSize': Compound({'x': Int(w), 'y': Int(h), 'z': Int(l)}),
            'RegionCount': Int(1),
            'TimeCreated': Long(1795000000000),
            'TimeModified': Long(1795000000000),
            'TotalBlocks': Int(total_non_air),
            'TotalVolume': Int(w * h * l)
        }),
        'Regions': Compound({
            region_name: Compound({
                'Position': Compound({'x': Int(0), 'y': Int(0), 'z': Int(l - 1)}),
                'Size': Compound({'x': Int(w), 'y': Int(h), 'z': Int(-l)}),
                'BlockStatePalette': List[Compound](litematic_palette),
                'BlockStates': nbtlib.tag.LongArray(longs_signed),
                'TileEntities': List[Compound](litematic_bes),
                'Entities': List[Compound]([])
            })
        })
    })

    out_litematic_pkg = os.path.join('downloads', 'medieval_alchemist_manor.litematic')
    litematic_file = nbtlib.File(litematic_root)
    litematic_file.save(out_litematic_pkg, gzipped=True)
    print(f'Saved Litematica (GZIP): {out_litematic_pkg} ({os.path.getsize(out_litematic_pkg)} bytes)')

    # --- 3. DEPLOY TO MINECRAFT SCHEMATICS FOLDER ---
    mc_dir = os.path.expandvars(r'%APPDATA%\.minecraft\schematics')
    if os.path.exists(mc_dir):
        # Remove old rustic_windmill_granary files
        for old in os.listdir(mc_dir):
            if 'rustic_windmill' in old:
                try:
                    os.remove(os.path.join(mc_dir, old))
                    print(f'Removed old active build: {old}')
                except Exception as ex:
                    print(f'Could not remove {old}: {ex}')

        # Copy new files
        mc_schem = os.path.join(mc_dir, 'medieval_alchemist_manor.schem')
        mc_litematic = os.path.join(mc_dir, 'medieval_alchemist_manor.litematic')
        with open(out_schem_pkg, 'rb') as f_in, open(mc_schem, 'wb') as f_out:
            f_out.write(f_in.read())
        with open(out_litematic_pkg, 'rb') as f_in, open(mc_litematic, 'wb') as f_out:
            f_out.write(f_in.read())
        print(f'Deployed to active Minecraft schematics: {mc_schem} and {mc_litematic}')

    # --- 4. EXPORT MATERIALS JSON ---
    materials_list = []
    for name, count in sorted(materials_count.items(), key=lambda x: -x[1]):
        materials_list.append({
            'name': name.replace('_', ' ').title(),
            'item_id': f'minecraft:{name}',
            'count': count
        })

    with open('build7_materials.json', 'w', encoding='utf-8') as f_mat:
        json.dump({
            'build_id': 'medieval-alchemist-manor',
            'title': 'Medieval Alchemist Manor & Botanical Estate',
            'total_blocks': total_non_air,
            'dimensions': {'width': w, 'height': h, 'length': l},
            'materials': materials_list
        }, f_mat, indent=2)
    print('Exported build7_materials.json')

if __name__ == '__main__':
    build_remix()
