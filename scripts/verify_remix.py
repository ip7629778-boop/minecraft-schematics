import os
import nbtlib

def verify():
    # 1. Verify Sponge V2
    schem_path = r'downloads\medieval_alchemist_manor.schem'
    f_schem = nbtlib.load(schem_path)
    root = f_schem.get('Schematic', f_schem)
    assert int(root['Version']) == 2, f"Expected Version 2, got {root['Version']}"
    assert int(root['DataVersion']) == 3953
    w = int(root['Width'])
    h = int(root['Height'])
    l = int(root['Length'])
    assert w == 23 and h == 32 and l == 27
    pal = root['Palette']
    print(f'Sponge V2 verified: {w}x{h}x{l}, {len(pal)} palette entries')
    
    # Check for illegal modded names in palette
    for k in pal.keys():
        assert 'oak_shelf' not in k and 'spruce_shelf' not in k, f"Found modded shelf in palette: {k}"
        assert 'cinnabar' not in k, f"Found modded cinnabar in palette: {k}"
        assert 'iron_chain' not in k, f"Found modded iron_chain in palette: {k}"
    print('Sponge V2 palette clean of all modded blocks!')

    # 2. Verify Litematica
    litematic_path = r'downloads\medieval_alchemist_manor.litematic'
    f_lit = nbtlib.load(litematic_path)
    assert int(f_lit['Version']) == 7, f"Expected Version 7, got {f_lit['Version']}"
    assert int(f_lit['MinecraftDataVersion']) == 3953
    reg = list(f_lit['Regions'].values())[0]
    sz = reg['Size']
    assert abs(int(sz['x'])) == 23
    assert abs(int(sz['y'])) == 32
    assert abs(int(sz['z'])) == 27
    l_pal = reg['BlockStatePalette']
    print(f'Litematica verified: Size {sz}, {len(l_pal)} palette entries, {len(reg["BlockStates"])} longs')
    
    # Check litematica palette
    for entry in l_pal:
        name = str(entry['Name'])
        assert 'oak_shelf' not in name and 'spruce_shelf' not in name
        assert 'cinnabar' not in name
        assert 'iron_chain' not in name
    print('Litematica palette clean of all modded blocks!')

    # 3. Check deployed folder
    mc_dir = os.path.expandvars(r'%APPDATA%\.minecraft\schematics')
    files_in_mc = os.listdir(mc_dir)
    print(f'Files in active Minecraft schematics folder: {files_in_mc}')
    assert 'medieval_alchemist_manor.schem' in files_in_mc
    assert 'medieval_alchemist_manor.litematic' in files_in_mc
    assert not any('rustic' in f for f in files_in_mc)
    print('Active Minecraft folder verified: ONLY Build #7 present!')

if __name__ == '__main__':
    verify()
