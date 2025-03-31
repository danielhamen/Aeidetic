import { NextFontWithVariable } from "next/dist/compiled/@next/font";
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
