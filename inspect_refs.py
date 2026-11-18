import gzip
import struct
import os
import sys

def parse_nbt(data, offset=0):
    # Basic NBT parser to inspect tags
    pass

# Let's inspect the files in Refrences/
ref_dir = r"c:\Users\ip762\OneDrive\Desktop\New folder\Refrences"
files = [
    r"Medieval-Fantasy-House-2-V1.0\fantasyhouse2.schem",
    r"Survival Cottage 2 V1.0\survivalcottage2.schem",
    r"Rustic Stone & Timber House-from-abfielder.litematic",
    r"Minimalist_Modern_HouseByImmTurk.schem"
]

for rel_p in files:
    full_p = os.path.join(ref_dir, rel_p)
    if os.path.exists(full_p):
        print(f"=== {rel_p} ===")
        with open(full_p, 'rb') as f:
            raw = f.read()
        try:
            decomp = gzip.decompress(raw)
            print(f"Decompressed size: {len(decomp)} bytes")
        except Exception as e:
            print(f"Decompress error: {e}")
