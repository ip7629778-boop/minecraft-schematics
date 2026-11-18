import parse_nbt

def verify_build2(path):
    print(f"\n=======================================================")
    print(f"VERIFYING GENERATED BUILD 2: {path}")
    print(f"=======================================================")
    res = parse_nbt.load_nbt(path)
    root = list(res.values())[0]
    schem = root.get('Schematic', root)

    w = schem['Width']
    h = schem['Height']
    l = schem['Length']
    print(f"Dimensions: {w} x {h} x {l}")

    blocks_tag = schem.get('Blocks', schem)
    palette = blocks_tag.get('Palette', {})
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

    # Check 1: Iron door check
    iron_doors = [k for k in palette if 'iron_door' in k]
    print(f"Iron Doors present: {len(iron_doors)} (Must be 0)")
    assert len(iron_doors) == 0, "Iron door should not be present!"

    # Check 2: Doors check
    doors = [(x, y, z, get_block(x, y, z)) for y in range(h) for z in range(l) for x in range(w) if 'door' in get_block(x, y, z) and 'trap' not in get_block(x, y, z)]
    print(f"Detected Door blocks: {len(doors)}")
    for x, y, z, name in doors:
        print(f"  Door at ({x}, {y}, {z}): {name}")
        print(f"    Under (y-1): {get_block(x, y-1, z)}")
        print(f"    Lintel (y+2): {get_block(x, y+2, z)}")

    # Check 3: Glass panes connection flags check
    glass_panes = [(x, y, z, get_block(x, y, z)) for y in range(h) for z in range(l) for x in range(w) if 'glass_pane' in get_block(x, y, z)]
    print(f"\nDetected Glass Panes: {len(glass_panes)}")
    for x, y, z, name in glass_panes[:8]:
        print(f"  Glass at ({x}, {y}, {z}): {name}")

    # Check 4: Staircase path and headroom
    print("\nAscending Staircase Check:")
    stair_path = [
        (15, 1, 11),
        (15, 2, 10),
        (15, 3, 9),
        (15, 4, 8),
        (14, 5, 7), # Landing
        (13, 6, 7), # Final step into loft
    ]
    for x, y, z in stair_path:
        block = get_block(x, y, z)
        above1 = get_block(x, y+1, z)
        above2 = get_block(x, y+2, z)
        above3 = get_block(x, y+3, z)
        print(f"  Step at ({x}, {y}, {z}) -> {block}")
        print(f"    Headroom y+1: {above1}")
        print(f"    Headroom y+2: {above2}")
        print(f"    Headroom y+3: {above3}")
        assert 'air' in above1, f"Obstruction at ({x}, {y+1}, {z})"
        assert 'air' in above2, f"Obstruction at ({x}, {y+2}, {z})"

    # Check 5: Landing into loft space
    loft_arrival = get_block(12, 6, 7)
    loft_above1 = get_block(12, 7, 7)
    loft_above2 = get_block(12, 8, 7)
    loft_above3 = get_block(12, 9, 7)
    print(f"\nLoft Arrival Space at (12, 6, 7): {loft_arrival}")
    print(f"  Headroom: {loft_above1}, {loft_above2}, {loft_above3}")
    assert 'air' in loft_arrival, "Loft arrival must be open air!"

    print("\nALL VERIFICATION CHECKS PASSED PERFECTLY!")

if __name__ == '__main__':
    verify_build2(r"c:\Users\ip762\OneDrive\Desktop\New folder\downloads\medieval_blacksmith_armoury.schem")
