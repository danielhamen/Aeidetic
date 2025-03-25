import React from "react";
import { View } from "../core/View";

/**
 * 📌 `Divider.tsx`
 * A **visual separator** (horizontal or vertical).
 */
export interface DividerProps {
  vertical?: boolean;
  thickness?: string | number;
  color?: string;
  maxSize?: string | number;
  minSize?: string | number;
  marginStart?: string | number;
  marginEnd?: string | number;
  margin?: string | number | null;
  alignSelf?: "leading" | "center" | "trailing";
}
export const Divider: React.FC<DividerProps> = ({
  vertical = false,
  thickness = 1,
  color = "gray-300",
  maxSize,
  minSize,
  alignSelf,
  marginStart = 0,
  marginEnd = 0,
  margin = null,
}) => {
  return (
    <View
      className={`bg-${color}`}
      style={{
        width: vertical ? thickness : "100%",
        height: vertical ? "100%" : thickness,
        maxWidth: vertical ? undefined : maxSize,
        maxHeight: vertical ? maxSize : undefined,
        minWidth: vertical ? undefined : minSize,
        minHeight: vertical ? undefined : minSize,
        marginLeft: vertical
          ? (margin ?? marginStart)
          : alignSelf === "center" || alignSelf === "trailing"
            ? "auto"
            : undefined,
        marginRight: vertical
          ? (margin ?? marginEnd)
          : alignSelf === "center" || alignSelf === "leading"
            ? "auto"
            : undefined,
        marginTop: !vertical
          ? (margin ?? marginStart)
          : alignSelf === "center" || alignSelf === "trailing"
            ? "auto"
            : undefined,
        marginBottom: !vertical
          ? (margin ?? marginEnd)
          : alignSelf === "center" || alignSelf === "leading"
            ? "auto"
            : undefined,
      }}
    />
  );
};
