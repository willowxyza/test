import json
import os

# The json string is in the step 12 output
# But let's read the file directly
file_path = r"C:\Users\NHWM\.gemini\antigravity\brain\db7585ae-2541-42f8-9d90-b4cbc455d1bb\.system_generated\steps\12\output.txt"
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Sort colors into primitives
primitives = {
    'white': '#ffffff',
    'black': '#000000',
    'gray': {
        '50': '#f5f5f5',
        '100': '#f3f3f3',
        '200': '#e6e6e6',
        '300': '#d9d9d9',
        '400': '#b3b3b3',
        '500': '#767676',
        '600': '#5a5a5a',
        '700': '#434343',
        '800': '#2c2c2c',
        '900': '#1e1e1e',
    },
    'green': {
        '50': '#ebffee',
        '100': '#cff7d3',
        '200': '#aff4c6',
        '500': '#14ae5c',
        '600': '#009951',
        '800': '#02542d',
        '900': '#024023',
    },
    'amber': {
        '50': '#fffbeb',
        '100': '#fff1c2',
        '400': '#e8b931',
        '500': '#e5a000',
        '600': '#bf6a02',
        '700': '#975102',
        '800': '#682d03',
        '900': '#522504',
        '950': '#401b01',
    },
    'red': {
        '50': '#fee9e7',
        '100': '#fdd3d0',
        '200': '#fcb3ad',
        '500': '#ec221f',
        '700': '#c00f0c',
        '900': '#900b09',
    },
    'blackAlpha': {
        '5': '#0c0c0d0d',
        '10': '#0c0c0d1a',
    }
}

primitive_hex_map = {}
for category, values in primitives.items():
    if isinstance(values, dict):
        for scale, hex_code in values.items():
            primitive_hex_map[hex_code] = f"primitives.{category}[{scale}]"
    else:
        primitive_hex_map[values] = f"primitives.{category}"

# Some sizes and radii
# var(--sds-size-radius-200)":"8"
semantic_tokens = {}
css_vars = []

for k, v in data.items():
    if k.startswith('var('):
        var_name = k.replace('var(', '').replace(')', '')
        # it is a CSS variable definition
        
        # for tokens.ts, we want to build an object tree for semantics
        parts = var_name.replace('--sds-', '').split('-')
        
        # skip complex font configs for now, focus on single values
        # e.g., "Title Hero" - skip those, focus on var(--...)
        # We also have "Effect(type: DROP_SHADOW...)" which we should map manually if possible
        if "Effect(" in v:
            css_vars.append(f"  {var_name}: {v}; /* Note: Box shadow conversion might be needed */")
            continue

        if v.startswith('#'):
            # try to match primitive
            primitive_ref = primitive_hex_map.get(v, f"'{v}'")
            semantic_tokens[var_name] = primitive_ref
            css_vars.append(f"  {var_name}: {v};")
        elif v.isdigit() or v.replace('-', '').replace('.', '').isdigit():
            # append px for sizing, space, radius
            unit = "px" if var_name.startswith('--sds-size-') or var_name.startswith('--sds-typography-scale-') or var_name.endswith('-size') or var_name.endswith('-base') or var_name.endswith('-medium') or var_name.endswith('-small') else ""
            if "font-weight" in var_name or "lineHeight" in var_name: unit = ""
            
            # for CSS
            css_vars.append(f"  {var_name}: {v}{unit};")
        else:
            # e.g. "Inter", "Semi Bold"
            css_vars.append(f"  {var_name}: {v};")

# Write tokens.ts
tokens_ts_content = "export const primitives = " + json.dumps(primitives, indent=2).replace('"', "'") + ";\n\n"
tokens_ts_content += "export const semantics = {\n"
for var_name, primitive_ref in semantic_tokens.items():
    tokens_ts_content += f"  '{var_name}': {primitive_ref},\n"
tokens_ts_content += "};\n"

os.makedirs(r"C:\Users\NHWM\Desktop\test\my-project\src\styles", exist_ok=True)
with open(r"C:\Users\NHWM\Desktop\test\my-project\src\styles\tokens.ts", "w", encoding="utf-8") as f:
    f.write(tokens_ts_content)

# Global CSS Content
global_css_content = """@import "tailwindcss";

@theme inline {
  --color-background: var(--sds-color-background-default-default, #ffffff);
  --color-foreground: var(--sds-color-text-default-default, #1e1e1e);
  --font-sans: var(--sds-typography-body-font-family, Inter), sans-serif;
  --font-mono: var(--sds-typography-code-font-family, Roboto Mono), monospace;
  
  /* Semantic Colors from Figma */
"""

# Extract semantic colors to inject into @theme inline
for k, v in data.items():
    if k.startswith('var(--sds-color-') and v.startswith('#'):
        var_name = k.replace('var(', '').replace(')', '')
        # Map `--sds-color-background-warning-tertiary` to `--color-background-warning-tertiary`
        tailwind_var_name = var_name.replace('--sds-color-', '--color-')
        global_css_content += f"  {tailwind_var_name}: var({var_name});\n"

# Sizes, spacing, radius mapping to tailwind core utility variables
global_css_content += "\n  /* Typography, Sizes, Radii from Figma */\n"
for k, v in data.items():
    if k.startswith('var(--sds-size-space-') and v.isdigit():
        var_name = k.replace('var(', '').replace(')', '')
        tw_name = var_name.replace('--sds-size-space-', '--spacing-')
        global_css_content += f"  {tw_name}: var({var_name});\n"
    elif k.startswith('var(--sds-size-radius-') and v.isdigit():
        var_name = k.replace('var(', '').replace(')', '')
        tw_name = var_name.replace('--sds-size-radius-', '--radius-')
        global_css_content += f"  {tw_name}: var({var_name});\n"
    elif k.startswith('var(--sds-typography-heading-size-') and v.isdigit():
        var_name = k.replace('var(', '').replace(')', '')
        tw_name = var_name.replace('--sds-typography-heading-size-', '--text-heading-')
        global_css_content += f"  {tw_name}: var({var_name});\n"


global_css_content += "}\n\n:root {\n"
for c in css_vars:
    global_css_content += c + "\n"
global_css_content += "}\n\n"

global_css_content += """body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
"""

with open(r"C:\Users\NHWM\Desktop\test\my-project\src\global.css", "w", encoding="utf-8") as f:
    f.write(global_css_content)

print("Tokens and global.css generated successfully.")
