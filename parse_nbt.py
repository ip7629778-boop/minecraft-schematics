import gzip
import struct
import io

class NBTReader:
    def __init__(self, data):
        self.stream = io.BytesIO(data)

    def read_byte(self):
        b = self.stream.read(1)
        if not b: raise EOFError()
        return struct.unpack('>b', b)[0]

    def read_ubyte(self):
        b = self.stream.read(1)
        if not b: raise EOFError()
        return struct.unpack('>B', b)[0]

    def read_short(self):
        return struct.unpack('>h', self.stream.read(2))[0]

    def read_int(self):
        return struct.unpack('>i', self.stream.read(4))[0]

    def read_long(self):
        return struct.unpack('>q', self.stream.read(8))[0]

    def read_float(self):
        return struct.unpack('>f', self.stream.read(4))[0]

    def read_double(self):
        return struct.unpack('>d', self.stream.read(8))[0]

    def read_string(self):
        length = struct.unpack('>H', self.stream.read(2))[0]
        return self.stream.read(length).decode('utf-8', errors='replace')

    def read_tag(self, tag_type):
        if tag_type == 0: return None
        if tag_type == 1: return self.read_byte()
        if tag_type == 2: return self.read_short()
        if tag_type == 3: return self.read_int()
        if tag_type == 4: return self.read_long()
        if tag_type == 5: return self.read_float()
        if tag_type == 6: return self.read_double()
        if tag_type == 7:
            length = self.read_int()
            return self.stream.read(length)
        if tag_type == 8: return self.read_string()
        if tag_type == 9:
            item_type = self.read_ubyte()
            length = self.read_int()
            return [self.read_tag(item_type) for _ in range(length)]
        if tag_type == 10:
            res = {}
            while True:
                t = self.read_ubyte()
                if t == 0: break
                name = self.read_string()
                val = self.read_tag(t)
                res[name] = val
            return res
        if tag_type == 11:
            length = self.read_int()
            return struct.unpack(f'>{length}i', self.stream.read(length * 4))
        if tag_type == 12:
            length = self.read_int()
            return struct.unpack(f'>{length}q', self.stream.read(length * 8))
        raise ValueError(f"Unknown tag type {tag_type}")

    def parse(self):
        root_type = self.read_ubyte()
        if root_type == 0: return None
        root_name = self.read_string()
        root_val = self.read_tag(root_type)
        return {root_name: root_val}

def load_nbt(filepath):
    with open(filepath, 'rb') as f:
        raw = f.read()
    try:
        data = gzip.decompress(raw)
    except Exception:
        data = raw
    return NBTReader(data).parse()

if __name__ == '__main__':
    import os
    ref = r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences\Medieval-Fantasy-House-2-V1.0\fantasyhouse2.schem"
    res = load_nbt(ref)
    root = list(res.values())[0] if res else {}
    if 'Schematic' in root:
        root = root['Schematic']
    print("Keys in Schematic:", list(root.keys()))
    print("Width:", root.get('Width'), "Height:", root.get('Height'), "Length:", root.get('Length'))
    palette = root.get('Palette', {})
    print(f"Palette size: {len(palette)}")
    doors = [k for k in palette if 'door' in k]
    stairs = [k for k in palette if 'stairs' in k]
    glasses = [k for k in palette if 'glass' in k]
    print("\nDoors in palette:")
    for d in doors: print(" ", d)
    print(f"\nStairs in palette ({len(stairs)}):")
    for s in stairs[:15]: print(" ", s)
    print(f"\nGlasses in palette ({len(glasses)}):")
    for g in glasses: print(" ", g)
