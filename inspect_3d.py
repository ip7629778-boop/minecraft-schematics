import parse_nbt

def inspect_locations(schem_path, label):
    print(f"\n=======================================================")
    print(f"3D BLOCK INSPECTION: {label}")
    print(f"=======================================================")
    res = parse_nbt.load_nbt(schem_path)
    root = list(res.values())[0]
    if 'Schematic' in root: schem = root['Schematic']
    else: schem = root

    w = schem['Width']
    h = schem['Height']
    l = schem['Length']

    blocks_tag = schem.get('Blocks', schem)
    palette = blocks_tag['Palette']
    id_to_name = {v: k for k, v in palette.items()}

    # Sponge V2 vs V3 BlockData:
    data = blocks_tag.get('Data', blocks_tag.get('BlockData'))
    if isinstance(data, list):
        data = bytes(data)

    # Let's decode VarInt array
    blocks = []
    idx = 0
    while idx < len(data):
        val = 0
        shift = 0
        while True:
            b = data[idx]
            idx += 1
            val |= (b & 0x7F) << shift
            if (b & 0x80) == 0:
                break
            shift += 7
        blocks.append(val)

    print(f"Decoded {len(blocks)} blocks (expected {w*h*l})")

    def get_block(x, y, z):
        if 0 <= x < w and 0 <= y < h and 0 <= z < l:
            index = (y * l + z) * w + x
            if index < len(blocks):
                bid = blocks[index]
                return id_to_name.get(bid, f"unknown_{bid}")
        return 'out_of_bounds'

    # Find all doors and see surrounding blocks
    print("\n--- DETECTED DOORS & SURROUNDINGS ---")
    door_coords = []
    for y in range(h):
        for z in range(l):
            for x in range(w):
                name = get_block(x, y, z)
                if 'door' in name and 'trap' not in name and 'lower' in name:
                    door_coords.append((x, y, z, name))

    for x, y, z, name in door_coords[:6]:
        print(f"\nDoor at ({x}, {y}, {z}): {name}")
        print(f"  Under (y-1): {get_block(x, y-1, z)}")
        print(f"  Upper (y+1): {get_block(x, y+1, z)}")
        print(f"  Lintel (y+2): {get_block(x, y+2, z)}")
        print(f"  West (x-1): {get_block(x-1, y, z)}")
        print(f"  East (x+1): {get_block(x+1, y, z)}")
        print(f"  North (z-1): {get_block(x, y, z-1)}")
        print(f"  South (z+1): {get_block(x, y, z+1)}")

    # Find stairs used for climbing (between Y levels)
    print("\n--- DETECTED STAIRWAYS ---")
    stair_coords = []
    for y in range(h):
        for z in range(l):
            for x in range(w):
                name = get_block(x, y, z)
                if 'stairs' in name and 'bottom' in name:
                    # check if y+1 or y-1 has stair nearby
                    stair_coords.append((x, y, z, name))

    print(f"Found {len(stair_coords)} ascending stair blocks. Showing connected flights:")
    # Group stairs by flights
    for x, y, z, name in stair_coords[:15]:
        print(f"  Step at ({x}, {y}, {z}): {name}")
        print(f"    Above 1 (y+1): {get_block(x, y+1, z)}")
        print(f"    Above 2 (y+2): {get_block(x, y+2, z)}")
        print(f"    Above 3 (y+3): {get_block(x, y+3, z)}")

if __name__ == '__main__':
    inspect_locations(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Medieval-Fantasy-House-2-V1.0\fantasyhouse2.schem", "Medieval Fantasy House 2")
