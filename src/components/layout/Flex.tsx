import React, { ComponentProps } from "react";
import { View } from "../core/View";

export interface FlexProps extends ComponentProps<"div"> {
  children?: React.ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
  grow?: number | boolean;
  spacing?: number;
  gap?: number;
}

/**
 * Flex component for arranging elements using Flexbox.
 *
 * @param {string} direction - Layout direction (`row` or `column`).
 * @param {string} justify - Justify content alignment.
 * @param {string} align - Align items.
 * @param {string} grow - Grows.
 * @param {boolean} wrap - Whether to wrap content.
 */
export function Flex({
  children,
  direction = "column",
  justify = "start",
  align = "stretch",
  grow = undefined,
  wrap = false,
  spacing,
  gap,
  ...props
}: FlexProps) {
  return (
    <View
      {...props}
      className={`flex flex-${direction === "row" ? "row" : "col"} ${typeof grow === "number" ? grow : grow === undefined ? "" : "grow"} flex-${wrap ? "wrap" : "nowrap"} justify-${justify} items-${align} gap-${gap ?? spacing ?? 0} ${props.className || ""}`}
    >
      {children}
    </View>
  );
}
