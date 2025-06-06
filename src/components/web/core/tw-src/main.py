import datetime
import json
from itertools import product

def generate_tailwind_helper_classes() -> str:
    with open("config.json", "r") as f:
        config = json.load(f)

    expected_keys = ["weighted_colors", "static_colors", "color_weights", "sizes", "align", "font_weights", "flex_align"]
    assert all(key in config for key in expected_keys), f"Expected keys {expected_keys} not found in config.json"

    tailwindColorNames = config["weighted_colors"]
    tailwindSizes = config["sizes"]
    tailwindAlignments = config["align"]
    tailwindStaticColors = config["static_colors"]
    tailwindColorWeights = config["color_weights"]
    tailwindFontWeights = config["font_weights"]
    tailwindFlexAligns = config["flex_align"]

    # Generate TailwindColor
    tailwindColorUnion = [f'"{color}-{weight}"' for color, weight in product(tailwindColorNames, tailwindColorWeights)]
    tailwindColorUnion += [f'"{color}"' for color in tailwindStaticColors]

    # Generate color maps
    bgColorMap = ",".join(
        [f'"{color}-{weight}":"bg-{color}-{weight}"' for color, weight in product(tailwindColorNames, tailwindColorWeights)] +
        [f'"{color}":"bg-{color}"' for color in tailwindStaticColors]
    )
    textColorMap = ",".join(
        [f'"{color}-{weight}":"text-{color}-{weight}"' for color, weight in product(tailwindColorNames, tailwindColorWeights)] +
        [f'"{color}":"text-{color}"' for color in tailwindStaticColors]
    )
    textAlignMap = ",".join(
        [f'"{alignment}":"text-{alignment}"' for alignment in tailwindAlignments]
    )

    # Font weight mapping
    fontClassMap = {
        "100": "thin", "200": "light", "300": "light", "400": "normal",
        "500": "medium", "600": "semibold", "700": "bold",
        "800": "bold", "900": "black",
        "thin": "thin", "light": "light", "normal": "normal",
        "medium": "medium", "semibold": "semibold", "bold": "bold", "black": "black"
    }

    fontWeightMap = ",".join(
        [f'"{fw}":"font-{fontClassMap[fw]}"' for fw in tailwindFontWeights]
    )

    # Font size mapping
    fontSizeMap = ",".join(
        [f'"{size}":"text-{size}"' for size in tailwindSizes]
    )

    basic_size_maps = {"width": "w", "height": "h", "gap": "gap"}

    exports = [
        f"export type TailwindColorName={'|'.join(repr(x) for x in tailwindColorNames)};",
        f"export type TailwindStaticColorName={'|'.join(repr(x) for x in tailwindStaticColors)};",
        f"export type TailwindColorWeight={'|'.join(repr(x) for x in tailwindColorWeights)};",
        f"export type TailwindFontWeight={'|'.join(repr(x) for x in tailwindFontWeights)};",
        f"export type TailwindSize={'|'.join(repr(x) for x in tailwindSizes)};",
        f"export type TailwindAlignment={'|'.join(repr(x) for x in tailwindAlignments)};",
        f"export type TailwindColor={'|'.join(tailwindColorUnion)};",
        f"export const textAlignMap:Record<TailwindAlignment, string>={{ {textAlignMap} }};",
        f"export const bgColorMap:Record<TailwindColor, string>={{ {bgColorMap} }};",
        f"export const textColorMap:Record<TailwindColor, string>={{ {textColorMap} }};",
        f"export const fontWeightMap:Record<TailwindFontWeight, string>={{ {fontWeightMap} }};",
        f"export const fontSizeMap:Record<TailwindSize, string>={{ {fontSizeMap} }};",
        "/** @deprecated use bgColorMap instead for consistency */ export const backgroundColorMap = bgColorMap;",
        "/** @deprecated use specific TailwindColorWeight or TailwindFontWeight */ export type TailwindWeight = TailwindColorWeight;",
        *[f"export const {k}Map:Record<TailwindSize, string>={{ " + ",".join(
            [f'"{size}":"{v}-{size}"' for size in tailwindSizes]
        ) + " };" for k, v in basic_size_maps.items()],
    ]

    exports = "\n".join(exports)

    return f"""
// tw-src/index.ts
// this file was generated using tw-src/main.py
//      time: {datetime.datetime.now()}
// --------------------------------------------

{exports}
"""

if __name__ == "__main__":
    code = generate_tailwind_helper_classes()
    with open("index.ts", "w") as f:
        f.write(code)
