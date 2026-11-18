import parse_nbt

def analyze_schematic(path, name):
    print(f"\n=======================================================")
    print(f"ANAYLZING: {name}")
    print(f"=======================================================")
    res = parse_nbt.load_nbt(path)
    root = list(res.values())[0]
    if 'Schematic' in root:
        schem = root['Schematic']
    else:
        schem = root

    w = schem.get('Width')
    h = schem.get('Height')
    l = schem.get('Length')
    print(f"Dimensions: Width={w}, Height={h}, Length={l}")

    blocks_tag = schem.get('Blocks', schem)
    palette = blocks_tag.get('Palette', {})
    print(f"Total Palette Entries: {len(palette)}")

    doors = {k: v for k, v in palette.items() if 'door' in k and 'trap' not in k}
    trapdoors = {k: v for k, v in palette.items() if 'trapdoor' in k}
    stairs = {k: v for k, v in palette.items() if 'stairs' in k}
    glasses = {k: v for k, v in palette.items() if 'glass' in k}
    fences = {k: v for k, v in palette.items() if 'fence' in k or 'wall' in k}

    print("\n--- DOORS ---")
    for k in doors: print(f"  {k} -> ID {palette[k]}")

    print(f"\n--- TRAPDOORS ({len(trapdoors)}) ---")
    for k in list(trapdoors.keys())[:8]: print(f"  {k}")

    print(f"\n--- STAIRS ({len(stairs)}) ---")
    for k in list(stairs.keys())[:12]: print(f"  {k}")

    print(f"\n--- GLASS / WINDOWS ({len(glasses)}) ---")
    for k in glasses: print(f"  {k}")

if __name__ == '__main__':
    analyze_schematic(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Medieval-Fantasy-House-2-V1.0\fantasyhouse2.schem", "Medieval Fantasy House 2")
    analyze_schematic(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Survival Cottage 2 V1.0\survivalcottage2.schem", "Survival Cottage 2")
