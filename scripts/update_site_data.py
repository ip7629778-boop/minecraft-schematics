import json
import re

# 1. Update data/schematics.json
with open('data/schematics.json', 'r', encoding='utf-8') as f:
    schematics = json.load(f)

# Find build 7
new_entry = {
    "id": "medieval-alchemist-manor",
    "title": "Medieval Alchemist Manor & Botanical Estate",
    "subtitle": "Handcrafted Medieval Fantasy Estate with Octagonal Garden Pavilion, Timber Framing, Alchemical Laboratory & Farming Terraces",
    "author": "MineVault Studio (Remix of Survival Cottage 2)",
    "category": "Medieval",
    "version": "1.20 - 1.21+",
    "image": "assets/images/builds/build7/exterior_front.png",
    "screenshots": [
        {
            "url": "assets/images/builds/build7/exterior_front.png",
            "caption": "Exterior 3/4 Perspective with Octagonal Garden Pavilion, Timber Gables & Chimney Spire"
        },
        {
            "url": "assets/images/builds/build7/interior_main.png",
            "caption": "Interior Cross-Section with Alchemical Brewing Quarters, Chiseled Bookshelves & Stone Hearth"
        },
        {
            "url": "assets/images/builds/build7/sails_detail.png",
            "caption": "Rear Perspective of Botanical Terraced Garden Plots, Crop Beds & Retaining Masonry"
        }
    ],
    "downloadsCount": 412,
    "likesCount": 356,
    "dateAdded": "2026-11-20",
    "dimensions": {
        "width": 23,
        "height": 32,
        "length": 27
    },
    "blockCount": 5505,
    "tags": [
        "Medieval",
        "Fantasy",
        "Cottage",
        "Apothecary",
        "Alchemist",
        "Estate",
        "Survival",
        "Master-Tier"
    ],
    "formats": [
        {
            "type": ".schem (WorldEdit / Sponge)",
            "file": "downloads/medieval_alchemist_manor.schem",
            "size": "8.3 KB"
        },
        {
            "type": ".litematic (Litematica / Fabric)",
            "file": "downloads/medieval_alchemist_manor.litematic",
            "size": "9.8 KB"
        }
    ],
    "description": "A handcrafted master-tier medieval fantasy estate and alchemist botanical retreat. Features an imposing octagonal stone garden gazebo with conical roof, steep Tudor timber framing with bright calcite plaster infill, deepslate tile gabled roofs, and a soaring stone masonry chimney stack with active campfire smoke. Includes a fully furnished interior with alchemical brewing apparatus, chiseled bookshelves, enchanting alcoves, cozy loft bedrooms, and terraced survival farm plots with wheat, carrots, potatoes, and beehives.",
    "features": [
        "Handcrafted Master Architecture: 5,505 authentic blocks across 291 rich palette states with zero procedural distortion",
        "Octagonal Garden Pavilion: Symmetrical stone gazebo with spruce balustrades, deepslate tile cone roof, and warm ambient lanterns",
        "Alchemical Laboratory & Quarters: Integrated brewing stands, water cauldron, chiseled bookshelves, enchanting table, and cartography desk",
        "Soaring Stone Chimney Stack: 32-block tall masonry flue with campfire hearth venting genuine particle smoke over the ridge",
        "100% Vanilla 1.20-1.21+ Compatibility: Cleaned of all modded items and stabilized with gravity-safe calcite plaster infill",
        "Complete Survival Agronomy: Lush perimeter gardens with wheat, carrot, and potato fields, composter stations, and 12 functional beehives"
    ],
    "materials": [
        {"name": "Stripped Dark Oak Wood", "count": 608},
        {"name": "Grass Block", "count": 273},
        {"name": "Andesite", "count": 208},
        {"name": "Stone", "count": 187},
        {"name": "Spruce Planks", "count": 163},
        {"name": "Dark Oak Stairs", "count": 160},
        {"name": "Deepslate Tiles", "count": 147},
        {"name": "Smooth Sandstone", "count": 119},
        {"name": "Short Grass", "count": 119},
        {"name": "Deepslate Tile Stairs", "count": 116},
        {"name": "Dark Oak Trapdoor", "count": 99},
        {"name": "Glass Pane", "count": 91},
        {"name": "Cobbled Deepslate Stairs", "count": 91},
        {"name": "Cobbled Deepslate", "count": 88},
        {"name": "Dark Oak Slab", "count": 87},
        {"name": "Calcite", "count": 83},
        {"name": "Spruce Stairs", "count": 79},
        {"name": "Tuff", "count": 76},
        {"name": "Deepslate Tile Slab", "count": 68},
        {"name": "Azalea Leaves", "count": 52}
    ]
}

# Replace build 7 or append
if len(schematics) >= 7:
    schematics[6] = new_entry
else:
    schematics.append(new_entry)

with open('data/schematics.json', 'w', encoding='utf-8') as f:
    json.dump(schematics, f, indent=2)
print('Updated data/schematics.json with Build #7 Medieval Alchemist Manor!')

# 2. Update app.js embedded fallback
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the rustic-windmill-granary block in app.js
pattern = r'\{\s*"id":\s*"rustic-windmill-granary".*?\n    \}'
replacement = json.dumps(new_entry, indent=8)[4:-4] # format nicely
# Let's do a clean regex replacement
match = re.search(r'\{\s*"id":\s*"rustic-windmill-granary"[\s\S]*?\n    \}', content)
if match:
    content = content[:match.start()] + json.dumps(new_entry, indent=4) + content[match.end():]
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated app.js with Build #7 entry!')
else:
    print('Could not find rustic-windmill-granary in app.js, checking if medieval-alchemist-manor exists')

# 3. Update data/master_catalog_500.json
with open('data/master_catalog_500.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

# Update build 7 in catalog
for b in cat['catalog']:
    if b['id'] == 'mv-med-006' or b.get('schematicId') == 'rustic-windmill-granary' or b.get('schematicId') == 'medieval-alchemist-manor':
        b['title'] = 'Medieval Alchemist Manor & Botanical Estate'
        b['schematicId'] = 'medieval-alchemist-manor'
        b['status'] = 'completed'
        b['dimensions'] = '23x32x27'
        b['blockCount'] = 5505
        break

cat['completedCount'] = 7
cat['remainingCount'] = cat['totalBuildsGoal'] - 7

with open('data/master_catalog_500.json', 'w', encoding='utf-8') as f:
    json.dump(cat, f, indent=2)
print('Updated data/master_catalog_500.json!')
