import json
import re

with open('data/schematics.json', 'r', encoding='utf-8') as f:
    schem_data = json.load(f)

print(f'Loaded {len(schem_data)} schematics from data/schematics.json')
for i, s in enumerate(schem_data):
    print(f'  [{i+1}] {s["id"]}: {s["title"]}')

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find start of const DEFAULT_SCHEMATICS = [
start_marker = 'const DEFAULT_SCHEMATICS = ['
idx_start = content.find(start_marker)
if idx_start == -1:
    raise ValueError('Could not find const DEFAULT_SCHEMATICS')

# Find the end of DEFAULT_SCHEMATICS, which precedes `// App State`
end_marker = '// App State'
idx_end = content.find(end_marker)
if idx_end == -1:
    raise ValueError('Could not find // App State')

formatted_json = json.dumps(schem_data, indent=2)

new_content = content[:idx_start] + 'const DEFAULT_SCHEMATICS = ' + formatted_json + ';\n\n' + content[idx_end:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully re-injected DEFAULT_SCHEMATICS into app.js!')
