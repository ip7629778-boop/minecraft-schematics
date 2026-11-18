import nbtlib

schem_path = 'downloads/medieval_blacksmith_armoury.schem'
nbt = nbtlib.load(schem_path)
s = nbt.get('Schematic', nbt)
w = int(s['Width'])
h = int(s['Height'])
l = int(s['Length'])
pal = {int(v): str(k) for k, v in s['Palette'].items()}
raw = bytes(s['BlockData'])

# Decode varints
def read_varints(buf):
    i = 0
    res = []
    while i < len(buf):
        value = 0
        shift = 0
        while True:
            b = buf[i]
            i += 1
            value |= (b & 0x7F) << shift
            shift += 7
            if not (b & 0x80):
                break
        res.append(value)
    return res

blocks = read_varints(raw)

def get(x, y, z):
    if 0 <= x < w and 0 <= y < h and 0 <= z < l:
        idx = (y * l + z) * w + x
        return pal.get(blocks[idx], 'minecraft:air')
    return 'minecraft:air'

print(f"=== Refurbished Build #2 Verification ({w}x{h}x{l}) ===")

# 1. Check doors
doors = [(x, y, z, get(x, y, z)) for y in range(h) for z in range(l) for x in range(w) if 'door' in get(x, y, z)]
print(f"Total door blocks: {len(doors)}")
for d in doors:
    print(f"  Door at ({d[0]},{d[1]},{d[2]}): {d[3]}")

# 2. Check iron doors
iron_doors = [d for d in doors if 'iron_door' in d[3]]
print(f"Iron doors (must be 0): {len(iron_doors)}")

# 3. Check connecting archway at X=9, Z=6..8
arch_blocks = [(9, y, z, get(9, y, z)) for y in range(1, 4) for z in range(6, 9)]
print("\nConnecting archway passage blocks:")
for a in arch_blocks:
    print(f"  ({a[0]},{a[1]},{a[2]}): {a[3]}")

# 4. Check stair headroom along ascent:
stair_steps = [
    (17, 1, 12),
    (17, 2, 11),
    (17, 3, 10),
    (17, 4, 9),
    (17, 4, 8),
    (16, 4, 8),
    (15, 5, 8),
    (14, 5, 8)
]
print("\nStairway Headroom Check:")
all_clear = True
for sx, sy, sz in stair_steps:
    h1 = get(sx, sy + 1, sz)
    h2 = get(sx, sy + 2, sz)
    h3 = get(sx, sy + 3, sz)
    clear = all(b == 'minecraft:air' for b in [h1, h2, h3])
    print(f"  Step at ({sx},{sy},{sz}) -> Y+{sy+1}: {h1}, Y+{sy+2}: {h2}, Y+{sy+3}: {h3} [Clear: {clear}]")
    if not clear:
        all_clear = False
print(f"Stairway continuous 3.0 blocks headroom: {'PASSED' if all_clear else 'FAILED'}")

# 5. Check glass pane connections
panes = [(x, y, z, get(x, y, z)) for y in range(h) for z in range(l) for x in range(w) if 'glass_pane' in get(x, y, z)]
print(f"\nTotal glass panes: {len(panes)}")
disconnected_panes = [p for p in panes if 'east=false,north=false,south=false,west=false' in p[3] or p[3] == 'minecraft:glass_pane']
print(f"Disconnected glass panes: {len(disconnected_panes)} (must be 0)")

# 6. Check foliage and organic detailing
foliage = [(x, y, z, get(x, y, z)) for y in range(h) for z in range(l) for x in range(w) if any(k in get(x, y, z) for k in ['leaves', 'azalea', 'potted', 'flower', 'candle', 'chain'])]
print(f"\nOrganic detailing blocks (foliage/potted/candles/chains): {len(foliage)}")

# 7. Check chimney and campfire
campfire = [(x, y, z, get(x, y, z)) for y in range(h) for z in range(l) for x in range(w) if 'campfire' in get(x, y, z)]
print(f"Chimney campfires: {len(campfire)}")
for c in campfire:
    print(f"  Campfire at ({c[0]},{c[1]},{c[2]}): {c[3]}")
    hay = get(c[0], c[1] - 1, c[2])
    print(f"  Underneath campfire at Y-1: {hay} (hay block for signal fire!)")
