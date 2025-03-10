import React, { ComponentProps } from "react";
import { View } from "../core/View";

export interface FlexProps extends ComponentProps<"div"> {
  children?: React.ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
  grow?: number | boolean;
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
  gap = 0,
  ...props
}: FlexProps) {
  return (
    <View
      {...props}
      style={{
        display: "flex",
        flexDirection: direction === "row" ? "row" : "column",
        flexGrow:
          typeof grow === "number" ? grow : grow === undefined ? undefined : 1,
        flexWrap: wrap ? "wrap" : "nowrap",
        justifyContent: justify,
        alignItems: align,
        gap: gap,
        ...props.style,
      }}
    >
      {children}
    </View>
  );
}
