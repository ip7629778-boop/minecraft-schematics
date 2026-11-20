import nbtlib
from PIL import Image, ImageDraw
import math

f = nbtlib.load(r'Refrences\Survival Cottage 2 V1.0\survivalcottage2.schem')
schem = f['Schematic']
w = int(schem['Width'])
h = int(schem['Height'])
l = int(schem['Length'])
pal = schem['Blocks']['Palette']
raw_data = bytes(schem['Blocks']['Data'])

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

# Isometric render
# Map block to color
color_map = {
    'air': None,
    'dirt': (134, 96, 67),
    'grass_block': (92, 148, 56),
    'stone': (125, 125, 125),
    'andesite': (136, 136, 136),
    'cobblestone': (110, 110, 110),
    'deepslate': (60, 60, 65),
    'deepslate_tiles': (50, 50, 55),
    'deepslate_tile_stairs': (50, 50, 55),
    'cobbled_deepslate': (70, 70, 75),
    'stripped_dark_oak': (80, 55, 35),
    'dark_oak': (60, 40, 25),
    'spruce': (115, 85, 50),
    'oak_leaves': (65, 120, 45),
    'birch_leaves': (80, 135, 55),
    'azalea_leaves': (75, 130, 50),
    'glass': (180, 220, 230),
    'water': (60, 100, 200),
    'sand': (215, 205, 150),
    'tuff': (95, 95, 90),
}

def get_color(name):
    clean = name.split('[')[0].replace('minecraft:', '')
    if clean == 'air':
        return None
    for k, c in color_map.items():
        if k in clean:
            return c
    return (150, 140, 130)

img_w, img_h = 1000, 900
img = Image.new('RGBA', (img_w, img_h), (25, 28, 35, 255))
draw = ImageDraw.Draw(img)

# Sort coordinates painter's algorithm
# Camera looking from front-right: x+z increases away from camera
scale = 12
origin_x = img_w // 2
origin_y = img_h // 2 + 150

voxels = []
for y in range(h):
    for z in range(l):
        for x in range(w):
            pid = data[(y * l + z) * w + x]
            name = inv_pal[pid]
            col = get_color(name)
            if col:
                voxels.append((x, y, z, col, name))

# Sort voxels from back to front:
# Isometric: sx = (x - z) * cos(30), sy = (x + z) * sin(30) - y
voxels.sort(key=lambda v: (v[0] + v[2], v[1]))

cos30 = math.cos(math.radians(30))
sin30 = math.sin(math.radians(30))

for x, y, z, col, name in voxels:
    # project
    px = origin_x + int((x - z) * scale * cos30)
    py = origin_y + int((x + z) * scale * sin30) - int(y * scale * 0.9)
    
    r, g, b = col
    # Top face
    draw.polygon([
        (px, py - int(scale * 0.5)),
        (px + int(scale * cos30), py),
        (px, py + int(scale * 0.5)),
        (px - int(scale * cos30), py)
    ], fill=(min(255, r + 25), min(255, g + 25), min(255, b + 25)))
    
    # Left face
    draw.polygon([
        (px - int(scale * cos30), py),
        (px, py + int(scale * 0.5)),
        (px, py + int(scale * 1.2)),
        (px - int(scale * cos30), py + int(scale * 0.7))
    ], fill=(max(0, r - 30), max(0, g - 30), max(0, b - 30)))
    
    # Right face
    draw.polygon([
        (px, py + int(scale * 0.5)),
        (px + int(scale * cos30), py),
        (px + int(scale * cos30), py + int(scale * 0.7)),
        (px, py + int(scale * 1.2))
    ], fill=(max(0, r - 15), max(0, g - 15), max(0, b - 15)))

img.save('scripts/preview_cottage.png')
print('Rendered preview_cottage.png')
