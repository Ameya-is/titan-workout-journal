import os

dir_path = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(dir_path, 'index.html'), 'r', encoding='utf-8') as f:
    html = f.read()

with open(os.path.join(dir_path, 'styles.css'), 'r', encoding='utf-8') as f:
    css = f.read()

with open(os.path.join(dir_path, 'qr-generator.js'), 'r', encoding='utf-8') as f:
    qr_js = f.read()

with open(os.path.join(dir_path, 'program_data.js'), 'r', encoding='utf-8') as f:
    prog_js = f.read()

with open(os.path.join(dir_path, 'app.js'), 'r', encoding='utf-8') as f:
    app_js = f.read()

import re

# Replace css link with inlined style
html = re.sub(r'<link\s+rel="stylesheet"\s+href="styles\.css[^"]*">', lambda m: f'<style>\n{css}\n</style>', html)

# Replace script tags with inlined scripts
script_block = f"""
<script>
{qr_js}
</script>
<script>
{prog_js}
</script>
<script>
{app_js}
</script>
"""

# Remove old script tags
html = re.sub(r'<script\s+src="tunnel_info\.js[^"]*"></script>', '', html)
html = re.sub(r'<script\s+src="qr-generator\.js[^"]*"></script>', '', html)
html = re.sub(r'<script\s+src="program_data\.js[^"]*"></script>', '', html)
html = re.sub(r'<script\s+src="app\.js[^"]*"></script>', lambda m: script_block, html)

with open(os.path.join(dir_path, 'wimpy_standalone_offline.html'), 'w', encoding='utf-8') as f:
    f.write(html)

with open(os.path.join(dir_path, 'titan_standalone_offline.html'), 'w', encoding='utf-8') as f:
    f.write(html)

print("Bundled standalone single-file editions successfully!")
