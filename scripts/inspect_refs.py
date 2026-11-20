import nbtlib

files = [
    r'Refrences\Survival Cottage 2 V1.0\survivalcottage2.schem',
    r'Refrences\Rustic Stone & Timber House-from-abfielder.litematic',
    r'Refrences\Poolside Courtyard Villa-from-abfielder.litematic',
    r'Refrences\32323.schem',
    r'Refrences\Medieval-Fantasy-House-2-V1.0\fantasyhouse2.schem'
]

for p in files:
    try:
        f = nbtlib.load(p)
        if 'Width' in f:
            print(p, 'SCHEM', int(f['Width']), 'x', int(f['Height']), 'x', int(f['Length']))
            palette = f.get('Palette', {})
            print('  Palette sample:', list(palette.keys())[:10])
        elif 'Regions' in f:
            for k, r in f['Regions'].items():
                s = r['Size']
                print(p, 'LITEMATIC', k, abs(int(s['x'])), 'x', abs(int(s['y'])), 'x', abs(int(s['z'])))
                pal = r.get('BlockStatePalette', [])
                print('  Palette sample:', [x.get('Name') for x in pal[:10]])
        else:
            print(p, 'Unknown keys', list(f.keys())[:5])
    except Exception as e:
        print(p, 'Error:', e)
