import React from "react";
import { View } from "../core/View";

/**
 * 📌 `Divider.tsx`
 * A **visual separator** (horizontal or vertical).
 */
export interface DividerProps {
  vertical?: boolean;
  thickness?: string;
  color?: string;
}
export const Divider: React.FC<DividerProps> = ({
  vertical = false,
  thickness = "1px",
  color = "gray-300",
}) => {
  return (
    <View
      className={`${vertical ? "w-[1px] h-full" : "w-full h-[1px]"} bg-${color}`}
      style={{
        width: vertical ? thickness : "100%",
        height: vertical ? "100%" : thickness,
      }}
    />
  );
};
