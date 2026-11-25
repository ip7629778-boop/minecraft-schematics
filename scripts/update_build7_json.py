import json

with open('data/schematics.json', 'r', encoding='utf-8') as f:
    schems = json.load(f)

for s in schems:
    if s['id'] == 'medieval-alchemist-manor':
        s['image'] = 'assets/images/builds/build7/exterior_master_front.png'
        s['screenshots'] = [
            {
                'url': 'assets/images/builds/build7/exterior_master_front.png',
                'caption': 'Exterior Front Elevation with Steep Gables, Front Porch Bell, Terraced Farmland & Smoking Chimney'
            },
            {
                'url': 'assets/images/builds/build7/interior_enchanting_study.png',
                'caption': 'Alchemical Enchanting Study with Floor-to-Ceiling Garden Windows, Arcane Bookshelves & Warm Lanterns'
            },
            {
                'url': 'assets/images/builds/build7/interior_bedroom_loft.png',
                'caption': 'Master Bedroom Loft with Timber Bedframe, Built-in Wardrobes & Glass Walkout Balcony'
            },
            {
                'url': 'assets/images/builds/build7/interior_library_hearth.png',
                'caption': 'Ground Floor Living Quarters with Chiseled Bookshelves, Cartography Desk & Stairway to Lofts'
            }
        ]
        break

with open('data/schematics.json', 'w', encoding='utf-8') as f:
    json.dump(schems, f, indent=2)

print('Updated data/schematics.json with 4 authentic in-game screenshots for Build #7!')
