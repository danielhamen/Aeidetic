import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FontRegistry } from "api/app/__layout/__font";

export type {
  TailwindColorName,
  TailwindStaticColorName,
  TailwindColorWeight,
  TailwindFontWeight,
  TailwindSize,
  TailwindAlignment,
  TailwindWeight,
  TailwindColor,
} from "./tw-src/index";

import {
  textColorMap,
  TailwindColor,
  fontWeightMap,
  fontSizeMap,
  TailwindSize,
  TailwindFontWeight,
} from "./tw-src/index";

export {
  fontWeightMap,
  textColorMap,
  bgColorMap,
  backgroundColorMap,
  textAlignMap,
} from "./tw-src/index";

export type TextFont = keyof typeof FontRegistry;

export const fontFor = (font: TextFont): NextFontWithVariable => {
  return FontRegistry[font] ?? FontRegistry.regular;
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;

  /** @deprecated — use textColor */
  color?: string | TailwindColor;
  /** @deprecated — use fontFamily */
  font?: TextFont;
  /** @deprecated — use fontSize */
  size?: number | null;
  /** @deprecated — use fontWeight */
  weight?: number;

  textColor?: TailwindColor | null;
  fontFamily?: TextFont | null;
  fontSize?: number | TailwindSize | null;
  fontWeight?: TailwindFontWeight | null;
  overrideHtmlElement?: keyof HTMLElementTagNameMap;
}

export function Text({
  children,
  overrideHtmlElement = "span",
  color,
  font,
  size,
  weight,

  // Prefer new props; fall back to deprecated ones if necessary
  textColor,
  fontFamily = font ?? "regular",
  fontSize = size ?? 16,
  fontWeight = "400",
  ...props
}: TextProps) {
  // Warn about using peprecated props
  if (
    color !== undefined ||
    font !== undefined ||
    size !== undefined ||
    weight !== undefined
  ) {
    console.warn(
      "Deprecated props used in Text component. Use new props instead.",
    );
  }

  const Component = overrideHtmlElement as keyof JSX.IntrinsicElements;

  // Get the corresponding color class
  const textColorClass =
    textColor === null
      ? undefined
      : textColorMap[
          textColor === undefined ? "gray-800" : (textColor as TailwindColor)
        ];

  // Get the corresponding font size class
  const fontSizeClass =
    fontSize === null
      ? undefined
      : typeof fontSize === "string"
        ? fontSizeMap[fontSize as TailwindSize]
        : undefined;

  const fontWeightClass =
    fontWeight === null
      ? undefined
      : (fontWeightMap[fontWeight] ?? "font-normal");

  const fontVariable =
    fontFamily === null ? undefined : fontFor(fontFamily).variable;

  return (
    <Component
      {...props}
      className={clsx(
        textColorClass,
        fontSizeClass,
        fontWeightClass,
        fontVariable,
        props.className,
      )}
      style={{
        fontSize: typeof fontSize === "number" ? fontSize : undefined,
        fontWeight: typeof fontWeight === "number" ? fontWeight : undefined,
        fontFamily: fontFamily === null ? undefined : `var(--font)`,
        ...props.style,
      }}
    >
      {children}
    </Component>
  );
}

export function P(props: TextProps) {
  return <Text {...props} />;
}
