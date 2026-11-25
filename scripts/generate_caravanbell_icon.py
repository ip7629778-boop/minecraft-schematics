import os
from PIL import Image, ImageDraw

def generate_caravanbell_icon():
    size = (128, 128)
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Dark Rounded Background tile (Modrinth style)
    pad = 6
    bg_box = [pad, pad, size[0] - pad, size[1] - pad]
    # Deep slate obsidian background
    draw.rounded_rectangle(bg_box, radius=24, fill=(15, 23, 42, 255), outline=(51, 65, 85, 255), width=3)

    # Subtle inner glow
    draw.rounded_rectangle([pad + 3, pad + 3, size[0] - pad - 3, size[1] - pad - 3], radius=21, outline=(30, 41, 59, 255), width=2)

    # 2. Golden Bell Body
    # Top wooden / dark oak beam/handle
    draw.rounded_rectangle([48, 22, 80, 32], radius=4, fill=(101, 67, 33, 255), outline=(62, 39, 18, 255), width=2)
    # Bell hanger loop
    draw.ellipse([58, 28, 70, 40], outline=(217, 119, 6, 255), width=3)

    # Bell dome (Golden)
    # Upper dome
    draw.polygon([
        (56, 38), (72, 38),
        (82, 68), (88, 86),
        (40, 86), (46, 68)
    ], fill=(245, 158, 11, 255), outline=(180, 83, 9, 255))

    # Bell highlight gradient simulation (left side lighter)
    draw.polygon([
        (58, 40), (66, 40),
        (64, 84), (46, 84)
    ], fill=(251, 191, 36, 255))

    # Bell rim (thick gold bottom)
    draw.rounded_rectangle([36, 84, 92, 94], radius=5, fill=(217, 119, 6, 255), outline=(146, 64, 14, 255), width=2)
    draw.rounded_rectangle([39, 85, 89, 90], radius=3, fill=(251, 191, 36, 255))

    # Bell clapper (bottom ball)
    draw.ellipse([59, 92, 69, 102], fill=(146, 64, 14, 255), outline=(120, 53, 15, 255), width=2)

    # 3. Emerald Sparkles & Sound Chimes
    # Sparkle 1 (Top right)
    s1 = (100, 34)
    draw.polygon([(s1[0], s1[1]-8), (s1[0]+3, s1[1]-2), (s1[0]+8, s1[1]), (s1[0]+3, s1[1]+2),
                  (s1[0], s1[1]+8), (s1[0]-3, s1[1]+2), (s1[0]-8, s1[1]), (s1[0]-3, s1[1]-2)], fill=(52, 211, 153, 255))
    draw.ellipse([s1[0]-2, s1[1]-2, s1[0]+2, s1[1]+2], fill=(209, 250, 229, 255))

    # Sparkle 2 (Bottom left)
    s2 = (28, 76)
    draw.polygon([(s2[0], s2[1]-6), (s2[0]+2, s2[1]-2), (s2[0]+6, s2[1]), (s2[0]+2, s2[1]+2),
                  (s2[0], s2[1]+6), (s2[0]-2, s2[1]+2), (s2[0]-6, s2[1]), (s2[0]-2, s2[1]-2)], fill=(16, 185, 129, 255))

    # 4. Stylized Lead Knot / Ribbon (wrapped gently)
    # Lead string looping down
    draw.arc([16, 88, 52, 116], start=30, end=240, fill=(180, 83, 9, 255), width=3)
    draw.arc([18, 90, 50, 114], start=30, end=240, fill=(217, 119, 6, 255), width=2)
    # Knot loop
    draw.ellipse([22, 102, 34, 114], fill=(120, 53, 15, 255), outline=(180, 83, 9, 255), width=2)

    # Save to mod resources and assets
    out_paths = [
        "caravan-bell/src/main/resources/assets/caravanbell/icon.png",
        "assets/icons/caravanbell.png"
    ]
    for p in out_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        img.save(p, "PNG")
        print(f"Saved icon to: {p}")

if __name__ == "__main__":
    generate_caravanbell_icon()
