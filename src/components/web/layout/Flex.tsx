import React, { ComponentProps } from "react";
import { View } from "../core/View";
import { gapMap, TailwindSize } from "../core/tw-src";
import clsx from "clsx";

export interface FlexProps extends ComponentProps<"div"> {
  children?: React.ReactNode;
  direction?: "row" | "column";
  reversed?: boolean;
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
  grow?: number | boolean;
  spacing?: number;
  inline?: boolean;
  gap?: number | TailwindSize;
  hidden?: boolean;
}

export type AlignType =
  | "items-start"
  | "items-center"
  | "items-end"
  | "items-stretch";
const AlignMap: Record<string, AlignType> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export type JustifyType =
  | "justify-start"
  | "justify-center"
  | "justify-end"
  | "justify-between"
  | "justify-around";
export const JustifyMap: Record<string, JustifyType> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
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
  reversed = false,
  grow,
  inline,
  wrap,
  hidden,
  gap,
  ...props
}: FlexProps) {
  // flex | inline-flex
  const inlineCls: "inline-flex" | "flex" = inline ? "inline-flex" : "flex";

  // flex-row | flex-col
  const dirCls:
    | "flex-row"
    | "flex-col"
    | "flex-row-reverse"
    | "flex-col-reverse" =
    direction === "row"
      ? reversed
        ? "flex-row-reverse"
        : "flex-row"
      : reversed
        ? "flex-col-reverse"
        : "flex-col";

  // flex-grow?
  const growCls: string = grow ? "flex-grow" : "";

  // flex-wrap?
  const wrapCls: "flex-wrap" | "" = wrap ? "flex-wrap" : "";

  // gap?
  const gapCls =
    typeof gap === "string" && gapMap[gap]
      ? gapMap[gap]
      : typeof gap === "number"
        ? `gap-${gap}`
        : "";

  const justifyCls = JustifyMap[justify ?? "stretch"];
  const itemsCls = AlignMap[align ?? "stretch"];

  return (
    <View
      {...props}
      className={clsx(
        !hidden ? inlineCls : "hidden",
        dirCls,
        growCls,
        wrapCls,
        gapCls,
        justifyCls,
        itemsCls,
        props.className || "",
      )}
    >
      {children}
    </View>
  );
}
