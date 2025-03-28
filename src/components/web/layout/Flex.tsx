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
  inline?: boolean;
  gap?: number;
}

export const JustifyMap = {
  start: "start",
  center: "center",
  end: "end",
  "space-between": "between",
  "space-around": "around",
};

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
  inline = false,
  wrap = false,
  spacing,
  gap,
  ...props
}: FlexProps) {
  return (
    <View
      {...props}
      className={`${inline ? "inline-" : ""}flex flex-${direction === "row" ? "row" : "col"} ${typeof grow === "number" ? grow : grow === undefined ? "" : "grow"} flex-${wrap ? "wrap" : "nowrap"} justify-${JustifyMap[justify ?? "stretch"]} items-${align} gap-${gap ?? spacing ?? 0} ${props.className || ""}`}
    >
      {children}
    </View>
  );
}
