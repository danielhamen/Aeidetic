import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FontRegistry } from "api/app/__layout/__font";

export type TailwindColorName =
  | "gray"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink"
  | "orange"
  | "teal"
  | "cyan";

export type TailwindWeight =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type TailwindColor =
  | `${TailwindColorName}-${TailwindWeight}`
  | "white"
  | "black"
  | "transparent";

export type TailwindSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type TextFont = keyof typeof FontRegistry;

export const fontFor = (font: TextFont): NextFontWithVariable => {
  return FontRegistry[font] ?? FontRegistry.regular;
};

export type TailwindFontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export const fontWeightMap: Record<TailwindFontWeight, string> = {
  "100": "font-thin",
  "200": "font-light",
  "300": "font-light",
  "400": "font-normal",
  "500": "font-medium",
  "600": "font-semibold",
  "700": "font-bold",
  "800": "font-bold",
  "900": "font-black",
};

// Define an explicit mapping so Tailwind sees literal class names.
export const backgroundColorMap: Record<TailwindColor, string> = {
  "gray-50": "bg-gray-50",
  "gray-100": "bg-gray-100",
  "gray-200": "bg-gray-200",
  "gray-300": "bg-gray-300",
  "gray-400": "bg-gray-400",
  "gray-500": "bg-gray-500",
  "gray-600": "bg-gray-600",
  "gray-700": "bg-gray-700",
  "gray-800": "bg-gray-800",
  "gray-900": "bg-gray-900",
  "red-50": "bg-red-50",
  "red-100": "bg-red-100",
  "red-200": "bg-red-200",
  "red-300": "bg-red-300",
  "red-400": "bg-red-400",
  "red-500": "bg-red-500",
  "red-600": "bg-red-600",
  "red-700": "bg-red-700",
  "red-800": "bg-red-800",
  "red-900": "bg-red-900",
  "blue-50": "bg-blue-50",
  "blue-100": "bg-blue-100",
  "blue-200": "bg-blue-200",
  "blue-300": "bg-blue-300",
  "blue-400": "bg-blue-400",
  "blue-500": "bg-blue-500",
  "blue-600": "bg-blue-600",
  "blue-700": "bg-blue-700",
  "blue-800": "bg-blue-800",
  "blue-900": "bg-blue-900",
  "green-50": "bg-green-50",
  "green-100": "bg-green-100",
  "green-200": "bg-green-200",
  "green-300": "bg-green-300",
  "green-400": "bg-green-400",
  "green-500": "bg-green-500",
  "green-600": "bg-green-600",
  "green-700": "bg-green-700",
  "green-800": "bg-green-800",
  "green-900": "bg-green-900",
  "yellow-50": "bg-yellow-50",
  "yellow-100": "bg-yellow-100",
  "yellow-200": "bg-yellow-200",
  "yellow-300": "bg-yellow-300",
  "yellow-400": "bg-yellow-400",
  "yellow-500": "bg-yellow-500",
  "yellow-600": "bg-yellow-600",
  "yellow-700": "bg-yellow-700",
  "yellow-800": "bg-yellow-800",
  "yellow-900": "bg-yellow-900",
  "indigo-50": "bg-indigo-50",
  "indigo-100": "bg-indigo-100",
  "indigo-200": "bg-indigo-200",
  "indigo-300": "bg-indigo-300",
  "indigo-400": "bg-indigo-400",
  "indigo-500": "bg-indigo-500",
  "indigo-600": "bg-indigo-600",
  "indigo-700": "bg-indigo-700",
  "indigo-800": "bg-indigo-800",
  "indigo-900": "bg-indigo-900",
  "purple-50": "bg-purple-50",
  "purple-100": "bg-purple-100",
  "purple-200": "bg-purple-200",
  "purple-300": "bg-purple-300",
  "purple-400": "bg-purple-400",
  "purple-500": "bg-purple-500",
  "purple-600": "bg-purple-600",
  "purple-700": "bg-purple-700",
  "purple-800": "bg-purple-800",
  "purple-900": "bg-purple-900",
  "pink-50": "bg-pink-50",
  "pink-100": "bg-pink-100",
  "pink-200": "bg-pink-200",
  "pink-300": "bg-pink-300",
  "pink-400": "bg-pink-400",
  "pink-500": "bg-pink-500",
  "pink-600": "bg-pink-600",
  "pink-700": "bg-pink-700",
  "pink-800": "bg-pink-800",
  "pink-900": "bg-pink-900",
  "orange-50": "bg-orange-50",
  "orange-100": "bg-orange-100",
  "orange-200": "bg-orange-200",
  "orange-300": "bg-orange-300",
  "orange-400": "bg-orange-400",
  "orange-500": "bg-orange-500",
  "orange-600": "bg-orange-600",
  "orange-700": "bg-orange-700",
  "orange-800": "bg-orange-800",
  "orange-900": "bg-orange-900",
  "teal-50": "bg-teal-50",
  "teal-100": "bg-teal-100",
  "teal-200": "bg-teal-200",
  "teal-300": "bg-teal-300",
  "teal-400": "bg-teal-400",
  "teal-500": "bg-teal-500",
  "teal-600": "bg-teal-600",
  "teal-700": "bg-teal-700",
  "teal-800": "bg-teal-800",
  "teal-900": "bg-teal-900",
  "cyan-50": "bg-cyan-50",
  "cyan-100": "bg-cyan-100",
  "cyan-200": "bg-cyan-200",
  "cyan-300": "bg-cyan-300",
  "cyan-400": "bg-cyan-400",
  "cyan-500": "bg-cyan-500",
  "cyan-600": "bg-cyan-600",
  "cyan-700": "bg-cyan-700",
  "cyan-800": "bg-cyan-800",
  "cyan-900": "bg-cyan-900",
  white: "bg-white",
  black: "bg-black",
  transparent: "bg-transparent",
};

// Define an explicit mapping so Tailwind sees literal class names.
export const textColorMap: Record<TailwindColor, string> = {
  "gray-50": "text-gray-50",
  "gray-100": "text-gray-100",
  "gray-200": "text-gray-200",
  "gray-300": "text-gray-300",
  "gray-400": "text-gray-400",
  "gray-500": "text-gray-500",
  "gray-600": "text-gray-600",
  "gray-700": "text-gray-700",
  "gray-800": "text-gray-800",
  "gray-900": "text-gray-900",
  "red-50": "text-red-50",
  "red-100": "text-red-100",
  "red-200": "text-red-200",
  "red-300": "text-red-300",
  "red-400": "text-red-400",
  "red-500": "text-red-500",
  "red-600": "text-red-600",
  "red-700": "text-red-700",
  "red-800": "text-red-800",
  "red-900": "text-red-900",
  "blue-50": "text-blue-50",
  "blue-100": "text-blue-100",
  "blue-200": "text-blue-200",
  "blue-300": "text-blue-300",
  "blue-400": "text-blue-400",
  "blue-500": "text-blue-500",
  "blue-600": "text-blue-600",
  "blue-700": "text-blue-700",
  "blue-800": "text-blue-800",
  "blue-900": "text-blue-900",
  "green-50": "text-green-50",
  "green-100": "text-green-100",
  "green-200": "text-green-200",
  "green-300": "text-green-300",
  "green-400": "text-green-400",
  "green-500": "text-green-500",
  "green-600": "text-green-600",
  "green-700": "text-green-700",
  "green-800": "text-green-800",
  "green-900": "text-green-900",
  "yellow-50": "text-yellow-50",
  "yellow-100": "text-yellow-100",
  "yellow-200": "text-yellow-200",
  "yellow-300": "text-yellow-300",
  "yellow-400": "text-yellow-400",
  "yellow-500": "text-yellow-500",
  "yellow-600": "text-yellow-600",
  "yellow-700": "text-yellow-700",
  "yellow-800": "text-yellow-800",
  "yellow-900": "text-yellow-900",
  "indigo-50": "text-indigo-50",
  "indigo-100": "text-indigo-100",
  "indigo-200": "text-indigo-200",
  "indigo-300": "text-indigo-300",
  "indigo-400": "text-indigo-400",
  "indigo-500": "text-indigo-500",
  "indigo-600": "text-indigo-600",
  "indigo-700": "text-indigo-700",
  "indigo-800": "text-indigo-800",
  "indigo-900": "text-indigo-900",
  "purple-50": "text-purple-50",
  "purple-100": "text-purple-100",
  "purple-200": "text-purple-200",
  "purple-300": "text-purple-300",
  "purple-400": "text-purple-400",
  "purple-500": "text-purple-500",
  "purple-600": "text-purple-600",
  "purple-700": "text-purple-700",
  "purple-800": "text-purple-800",
  "purple-900": "text-purple-900",
  "pink-50": "text-pink-50",
  "pink-100": "text-pink-100",
  "pink-200": "text-pink-200",
  "pink-300": "text-pink-300",
  "pink-400": "text-pink-400",
  "pink-500": "text-pink-500",
  "pink-600": "text-pink-600",
  "pink-700": "text-pink-700",
  "pink-800": "text-pink-800",
  "pink-900": "text-pink-900",
  "orange-50": "text-orange-50",
  "orange-100": "text-orange-100",
  "orange-200": "text-orange-200",
  "orange-300": "text-orange-300",
  "orange-400": "text-orange-400",
  "orange-500": "text-orange-500",
  "orange-600": "text-orange-600",
  "orange-700": "text-orange-700",
  "orange-800": "text-orange-800",
  "orange-900": "text-orange-900",
  "teal-50": "text-teal-50",
  "teal-100": "text-teal-100",
  "teal-200": "text-teal-200",
  "teal-300": "text-teal-300",
  "teal-400": "text-teal-400",
  "teal-500": "text-teal-500",
  "teal-600": "text-teal-600",
  "teal-700": "text-teal-700",
  "teal-800": "text-teal-800",
  "teal-900": "text-teal-900",
  "cyan-50": "text-cyan-50",
  "cyan-100": "text-cyan-100",
  "cyan-200": "text-cyan-200",
  "cyan-300": "text-cyan-300",
  "cyan-400": "text-cyan-400",
  "cyan-500": "text-cyan-500",
  "cyan-600": "text-cyan-600",
  "cyan-700": "text-cyan-700",
  "cyan-800": "text-cyan-800",
  "cyan-900": "text-cyan-900",
  white: "text-white",
  black: "text-black",
  transparent: "text-transparent",
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

  textColor?: TailwindColor;
  fontFamily?: TextFont;
  fontSize?: number | TailwindSize;
  fontWeight?: TailwindFontWeight;
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
  textColor = (color as TailwindColor) ?? "gray-800",
  fontFamily = font ?? "regular",
  fontSize = size ?? 16,
  fontWeight = "400",
  ...props
}: TextProps) {
  const Component = overrideHtmlElement as keyof JSX.IntrinsicElements;

  // Use the mapping to create a static, literal class string.
  const textColorClass = textColorMap[textColor] ?? "text-gray-800";
  const fontSizeClass =
    typeof fontSize === "string" ? `text-${fontSize}` : undefined;
  const fontWeightClass = fontWeightMap[fontWeight] ?? "font-normal";

  return (
    <Component
      {...props}
      className={clsx(
        textColorClass,
        fontSizeClass,
        fontWeightClass,
        fontFor(fontFamily).variable,
        props.className,
      )}
      style={{
        fontSize: typeof fontSize === "number" ? fontSize : undefined,
        fontWeight: typeof fontWeight === "number" ? fontWeight : undefined,
        fontFamily: `var(--font)`,
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
