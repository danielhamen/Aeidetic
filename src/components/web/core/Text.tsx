import { NextFont, NextFontWithVariable } from "next/dist/compiled/@next/font";
import React, { HTMLAttributes, ReactNode } from "react";
import { FontRegistry } from "api/app/__layout/__font";

export type TextFont = keyof typeof FontRegistry;

export const fontFor = (font: TextFont): NextFontWithVariable => {
  switch (font) {
    case "mono":
      return FontRegistry.mono;
    case "serif":
      return FontRegistry.serif;
    case "serif_sc":
      return FontRegistry.serif_sc;
    case "cursive":
      return FontRegistry.cursive;
    case "regular":
    default:
      return FontRegistry.regular;
  }
};

export const weightFor = (font: NextFont, weight: number): number => {
  if (!font.weights) return 400;

  const weights = (font.weights as string[]).map((w) => parseInt(w, 10)).sort();

  if (weights.includes(weight)) {
    return weight;
  }

  if (weight < weights[0]) {
    return weights[0];
  }

  if (weight > weights[weights.length - 1]) {
    return weights[weights.length - 1];
  }

  for (let i = 0; i < weights.length - 1; i++) {
    const w0 = weights[i];
    const w1 = weights[i + 1];

    // In between two weights
    if (w0 < weight && w1 > weight) {
      // Return the closest weight
      if (Math.abs(w0 - weight) > Math.abs(weight - w1)) {
        return w1;
      }
      return w0;
    }
  }

  return 400;
};

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: string;
  font?: TextFont;
  size?: number;
}

export function Text({
  children,
  color = "gray-800",
  font = "regular",
  size = 16,
  ...props
}: TextProps) {
  return (
    <span
      {...props}
      className={`text-${color} ${props.className || ""} ${fontFor(font).variable}`}
      style={{ fontFamily: `var(--font)`, fontSize: size, ...props.style }}
    >
      {children}
    </span>
  );
}
