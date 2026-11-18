import parse_nbt

def decode_litematic(filepath):
    res = parse_nbt.load_nbt(filepath)
    root = list(res.values())[0]
    region = list(root['Regions'].values())[0]
    size = region['Size']
    dx = abs(size['x'])
    dy = abs(size['y'])
    dz = abs(size['z'])
    pal = region['BlockStatePalette']
    print(f"Litematic Size: {dx} x {dy} x {dz}, Palette: {len(pal)}")
    
    # Palette map
    for i, p in enumerate(pal):
        name = p['Name']
        props = p.get('Properties', {})
        prop_str = ",".join(f"{k}={v}" for k, v in props.items())
        full = f"{name}[{prop_str}]" if prop_str else name
        if 'door' in name or 'stairs' in name or 'glass' in name or 'log' in name:
            if i < 35:
                print(f"  [{i:2d}] {full}")

if __name__ == '__main__':
    decode_litematic(r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Rustic Stone & Timber House-from-abfielder.litematic")
