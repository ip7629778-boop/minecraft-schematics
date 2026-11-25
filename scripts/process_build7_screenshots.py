import os
import shutil
from PIL import Image

src_dir = 'pictures'
dest_dir = os.path.join('assets', 'images', 'builds', 'build7')
os.makedirs(dest_dir, exist_ok=True)

files = sorted([f for f in os.listdir(src_dir) if f.endswith('.png')])
print(f'Found {len(files)} files in {src_dir}: {files}')

# Map files to semantic target filenames
mapping = [
    # 1. 10_59_14 -> Exterior Front
    (files[0], ['exterior_master_front.png', 'exterior_front.png']),
    # 2. 11_02_06 -> Enchanting Study
    (files[1], ['interior_enchanting_study.png', 'interior_main.png']),
    # 3. 11_02_32 -> Bedroom Loft & Balcony
    (files[2], ['interior_bedroom_loft.png']),
    # 4. 11_03_49 -> Library, Writing Desk & Living Quarters
    (files[3], ['interior_library_hearth.png', 'sails_detail.png'])
]

for src_name, targets in mapping:
    src_path = os.path.join(src_dir, src_name)
    im = Image.open(src_path)
    print(f'Processing {src_name} ({im.size})...')
    
    # Save optimized copy for each target
    for target in targets:
        dest_path = os.path.join(dest_dir, target)
        # Convert RGBA to RGB for standard web display or preserve RGBA
        im.save(dest_path, format='PNG', optimize=True)
        print(f'  -> Saved {dest_path} ({os.path.getsize(dest_path)} bytes)')
    
    # Also save raw original name in build7 folder
    raw_dest = os.path.join(dest_dir, src_name)
    shutil.copy2(src_path, raw_dest)
    print(f'  -> Copied raw {raw_dest}')

# Verify all destination files exist
print('\nVerifying files in dest_dir:')
for f in os.listdir(dest_dir):
    p = os.path.join(dest_dir, f)
    print(f'  {f}: {os.path.getsize(p)} bytes')

# Clean up raw files from pictures/ as per standing rule
for f in files:
    raw_p = os.path.join(src_dir, f)
    os.remove(raw_p)
    print(f'Cleaned from pictures/: {f}')

print('\nScreenshots processing complete!')
