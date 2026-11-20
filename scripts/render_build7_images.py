import os
import math
import nbtlib
from PIL import Image, ImageDraw, ImageEnhance

schem_path = r'downloads\medieval_alchemist_manor.schem'
f = nbtlib.load(schem_path)
root = f['Schematic']
w = int(root['Width'])
h = int(root['Height'])
l = int(root['Length'])
pal = root['Palette']
raw_data = bytes(root['BlockData'])

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

COLOR_MAP = {
    'air': None,
    'calcite': (235, 230, 225),
    'smooth_sandstone': (218, 204, 150),
    'sand': (218, 204, 150),
    'dirt': (134, 96, 67),
    'coarse_dirt': (119, 85, 59),
    'grass_block': (95, 155, 60),
    'dirt_path': (168, 130, 78),
    'stone': (125, 125, 125),
    'stone_bricks': (120, 120, 120),
    'mossy_stone_bricks': (110, 130, 105),
    'cracked_stone_bricks': (115, 115, 115),
    'andesite': (138, 138, 138),
    'polished_andesite': (145, 145, 145),
    'cobblestone': (110, 110, 110),
    'mossy_cobblestone': (100, 125, 95),
    'deepslate': (60, 60, 65),
    'deepslate_tiles': (52, 52, 58),
    'deepslate_tile_stairs': (52, 52, 58),
    'deepslate_tile_slab': (52, 52, 58),
    'cobbled_deepslate': (72, 72, 78),
    'cobbled_deepslate_stairs': (72, 72, 78),
    'stripped_dark_oak': (75, 50, 32),
    'dark_oak': (60, 40, 25),
    'spruce_planks': (115, 85, 50),
    'spruce': (115, 85, 50),
    'birch': (190, 180, 135),
    'oak': (140, 110, 70),
    'leaves': (65, 120, 45),
    'flowering_azalea': (85, 135, 65),
    'azalea': (75, 130, 50),
    'glass': (190, 225, 240),
    'water': (60, 110, 210),
    'tuff': (95, 95, 90),
    'lantern': (255, 210, 100),
    'torch': (255, 200, 80),
    'campfire': (255, 140, 40),
    'carpet': (140, 80, 60),
    'flower': (220, 80, 100),
    'crop': (160, 180, 60),
    'wheat': (180, 170, 70),
    'carrot': (210, 120, 40),
    'potato': (130, 160, 50),
    'bookshelf': (120, 85, 55),
    'chest': (145, 105, 45),
    'barrel': (125, 95, 55),
    'enchanting': (130, 45, 45),
    'bell': (230, 190, 50)
}

def get_block_color(block_str):
    clean = block_str.split('[')[0].replace('minecraft:', '')
    if clean == 'air':
        return None
    for k, col in COLOR_MAP.items():
        if k in clean:
            return col
    return (140, 130, 120)

def render_iso(view_mode='front', scale=22, offset_x=0, offset_y=160, cutaway=False):
    img_w, img_h = 1600, 1000
    
    # Gradient twilight background
    bg = Image.new('RGBA', (img_w, img_h), (0, 0, 0, 255))
    draw_bg = ImageDraw.Draw(bg)
    for y_coord in range(img_h):
        ratio = y_coord / img_h
        r = int(18 + ratio * 28)
        g = int(24 + ratio * 38)
        b = int(38 + ratio * 50)
        draw_bg.line([(0, y_coord), (img_w, y_coord)], fill=(r, g, b, 255))
    
    draw = ImageDraw.Draw(bg)
    origin_x = img_w // 2 + offset_x
    origin_y = img_h // 2 + offset_y
    
    cos30 = math.cos(math.radians(30))
    sin30 = math.sin(math.radians(30))
    
    voxels = []
    for y in range(h):
        for z in range(l):
            for x in range(w):
                if cutaway and (x > 11 and z > 13 and y > 4):
                    continue
                pid = data[(y * l + z) * w + x]
                name = inv_pal[pid]
                col = get_block_color(name)
                if col:
                    if view_mode == 'front':
                        vx, vy, vz = x, y, z
                        sort_key = (vx + vz, vy)
                    elif view_mode == 'side':
                        vx, vy, vz = z, y, w - 1 - x
                        sort_key = (vx + vz, vy)
                    elif view_mode == 'rear':
                        vx, vy, vz = w - 1 - x, y, l - 1 - z
                        sort_key = (vx + vz, vy)
                    else: # 'interior'
                        vx, vy, vz = x, y, z
                        sort_key = (vx + vz, vy)
                    voxels.append((vx, vy, vz, col, name, sort_key))
                    
    voxels.sort(key=lambda item: item[5])
    
    for vx, vy, vz, col, name, _ in voxels:
        px = origin_x + int((vx - vz) * scale * cos30)
        py = origin_y + int((vx + vz) * scale * sin30) - int(vy * scale * 0.95)
        
        r, g, b = col
        light = 0.85 + (vy / h) * 0.22
        
        top_col = (min(255, int(r * 1.15 * light)), min(255, int(g * 1.15 * light)), min(255, int(b * 1.15 * light)))
        left_col = (max(0, int(r * 0.72 * light)), max(0, int(g * 0.72 * light)), max(0, int(b * 0.72 * light)))
        right_col = (max(0, int(r * 0.88 * light)), max(0, int(g * 0.88 * light)), max(0, int(b * 0.88 * light)))
        
        if 'lantern' in name or 'campfire' in name:
            top_col = (255, 230, 140)
            left_col = (255, 195, 90)
            right_col = (255, 210, 110)
            # subtle warm sparkle
            draw.ellipse([(px - 4, py - 4), (px + 4, py + 4)], fill=(255, 240, 180, 180))

        # Top face
        draw.polygon([
            (px, py - int(scale * 0.5)),
            (px + int(scale * cos30), py),
            (px, py + int(scale * 0.5)),
            (px - int(scale * cos30), py)
        ], fill=top_col)
        
        # Left face
        draw.polygon([
            (px - int(scale * cos30), py),
            (px, py + int(scale * 0.5)),
            (px, py + int(scale * 1.25)),
            (px - int(scale * cos30), py + int(scale * 0.75))
        ], fill=left_col)
        
        # Right face
        draw.polygon([
            (px, py + int(scale * 0.5)),
            (px + int(scale * cos30), py),
            (px + int(scale * cos30), py + int(scale * 0.75)),
            (px, py + int(scale * 1.25))
        ], fill=right_col)

    enhancer = ImageEnhance.Contrast(bg)
    return enhancer.enhance(1.08)

os.makedirs(r'assets\images\builds\build7', exist_ok=True)

# 1. Front perspective: showing the gorgeous octagonal gazebo, Tudor beams, upper dormers & chimney
print('Rendering exterior_front.png...')
render_iso(view_mode='front', scale=22, offset_y=170).save(r'assets\images\builds\build7\exterior_front.png', quality=95)

# 2. Interior perspective (cutaway showing rooms and hearth)
print('Rendering interior_main.png...')
render_iso(view_mode='front', scale=24, offset_y=180, cutaway=True).save(r'assets\images\builds\build7\interior_main.png', quality=95)

# 3. Rear/Side perspective: showing the botanical terrace gardens & stonework
print('Rendering sails_detail.png...')
render_iso(view_mode='rear', scale=22, offset_y=170).save(r'assets\images\builds\build7\sails_detail.png', quality=95)

print('Updated all 3 build 7 preview images!')
