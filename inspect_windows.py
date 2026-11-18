import parse_nbt

def inspect_windows(schem_path, label):
    print(f"\n=======================================================")
    print(f"WINDOW & GLASS INSPECTION: {label}")
    print(f"=======================================================")
    res = parse_nbt.load_nbt(schem_path)
    root = list(res.values())[0]
    schem = root.get('Schematic', root)

    w = schem['Width']
    h = schem['Height']
    l = schem['Length']

    blocks_tag = schem.get('Blocks', schem)
    palette = blocks_tag['Palette']
    id_to_name = {v: k for k, v in palette.items()}

    data = blocks_tag.get('Data', blocks_tag.get('BlockData'))
    if isinstance(data, list): data = bytes(data)

    blocks = []
    idx = 0
    while idx < len(data):
        val = 0
        shift = 0
        while True:
            b = data[idx]
            idx += 1
            val |= (b & 0x7F) << shift
            if (b & 0x80) == 0: break
            shift += 7
        blocks.append(val)

    def get_block(x, y, z):
        if 0 <= x < w and 0 <= y < h and 0 <= z < l:
            index = (y * l + z) * w + x
            if index < len(blocks):
                bid = blocks[index]
                return id_to_name.get(bid, f"unknown_{bid}")
        return 'out_of_bounds'

    glass_coords = []
    for y in range(h):
        for z in range(l):
            for x in range(w):
                name = get_block(x, y, z)
                if 'glass' in name:
                    glass_coords.append((x, y, z, name))

    print(f"Found {len(glass_coords)} glass blocks:")
    for x, y, z, name in glass_coords[:8]:
        print(f"\nGlass at ({x}, {y}, {z}): {name}")
        print(f"  Sill (y-1): {get_block(x, y-1, z)}")
        print(f"  Head (y+1): {get_block(x, y+1, z)}")
        print(f"  Left (x-1): {get_block(x-1, y, z)}")
        print(f"  Right (x+1): {get_block(x+1, y, z)}")
        print(f"  Front/Back (z-1, z+1): {get_block(x, y, z-1)} | {get_block(x, y, z+1)}")

if __name__ == '__main__':
    inspect_windows(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Medieval-Fantasy-House-2-V1.0\fantasyhouse2.schem", "Medieval Fantasy House 2")
    inspect_windows(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Survival Cottage 2 V1.0\survivalcottage2.schem", "Survival Cottage 2")
