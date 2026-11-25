from PIL import Image, ImageDraw, ImageFilter

# 128x128 icon for Smart Stash
size = 128
im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(im)

# Rounded background
bg_color = (15, 23, 42, 255)
draw.rounded_rectangle([4, 4, 124, 124], radius=24, fill=(16, 26, 44, 255), outline=(52, 211, 153, 200), width=3)

# Glowing radial burst in background
for r in range(45, 0, -5):
    alpha = int(35 * (1 - r / 45))
    draw.ellipse([64 - r, 64 - r, 64 + r, 64 + r], fill=(16, 185, 129, alpha))

# Minecraft stylized Chest
# Chest Body (Brown Oak/Spruce)
chest_left = 30
chest_top = 46
chest_right = 98
chest_bottom = 96
chest_lid_h = 16

# Shadow
draw.ellipse([26, 92, 102, 106], fill=(0, 0, 0, 100))

# Chest base
draw.rectangle([chest_left, chest_top + chest_lid_h, chest_right, chest_bottom], fill=(140, 88, 48), outline=(60, 36, 18), width=3)

# Chest lid
draw.rectangle([chest_left, chest_top, chest_right, chest_top + chest_lid_h], fill=(175, 115, 62), outline=(60, 36, 18), width=3)

# Iron reinforcement band
draw.rectangle([chest_left + 4, chest_top + chest_lid_h - 2, chest_right - 4, chest_top + chest_lid_h + 2], fill=(80, 85, 95))

# Lock clasp (Gold / Yellow)
lock_cx = 64
draw.rectangle([lock_cx - 5, chest_top + chest_lid_h - 6, lock_cx + 5, chest_top + chest_lid_h + 8], fill=(251, 191, 36), outline=(180, 120, 15), width=2)
draw.rectangle([lock_cx - 2, chest_top + chest_lid_h + 2, lock_cx + 2, chest_top + chest_lid_h + 5], fill=(30, 20, 10))

# Stash Sparkles / Magnetic Influx (Cyan / Emerald Stacking Beams)
# Floating items flying into chest
draw.polygon([(64, 22), (69, 32), (64, 28), (59, 32)], fill=(52, 211, 153))
draw.polygon([(44, 30), (48, 38), (44, 35), (40, 38)], fill=(56, 189, 248))
draw.polygon([(84, 30), (88, 38), (84, 35), (80, 38)], fill=(251, 191, 36))

# Sparkles
for sx, sy in [(34, 26), (94, 24), (64, 14), (24, 60), (104, 60)]:
    draw.line([(sx - 3, sy), (sx + 3, sy)], fill=(255, 255, 255, 220), width=2)
    draw.line([(sx, sy - 3), (sx, sy + 3)], fill=(255, 255, 255, 220), width=2)

im.save('assets/icons/smartstash.png')
im.save('smart-stash/src/main/resources/assets/smartstash/icon.png')
print('Generated crisp 128x128 Smart Stash icon!')
