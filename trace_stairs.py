import parse_nbt

def trace_staircase(schem_path, label):
    print(f"\n=======================================================")
    print(f"STAIRCASE TRACE: {label}")
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

    stairs = []
    for y in range(h):
        for z in range(l):
            for x in range(w):
                name = get_block(x, y, z)
                # Filter stairs that have air above them (walking stairs)
                if 'stairs' in name and 'bottom' in name:
                    above1 = get_block(x, y+1, z)
                    above2 = get_block(x, y+2, z)
                    if 'air' in above1 and 'air' in above2:
                        stairs.append((x, y, z, name))

    print(f"Total walkable stairs: {len(stairs)}")
    # Sort by Y
    stairs.sort(key=lambda item: (item[1], item[0], item[2]))
    for x, y, z, name in stairs[:25]:
        print(f"Step at ({x:2d}, {y:2d}, {z:2d}) -> {name}")

if __name__ == '__main__':
    trace_staircase(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Survival Cottage 2 V1.0\survivalcottage2.schem", "Survival Cottage 2")
    trace_staircase(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Rustic Stone & Timber House-from-abfielder.litematic", "Rustic Stone & Timber")
