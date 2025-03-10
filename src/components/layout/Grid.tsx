import React, { ComponentProps, ReactNode } from "react";
import { View } from "../core/View";

/**
 * 📌 `Grid.tsx`
 * Provides a **flexible row-column grid system**.
 */
export interface GridProps extends ComponentProps<"div"> {
  children?: ReactNode;
  columns?: number;
  gap?: number | string;
}
export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = "4",
  ...props
}) => {
  return (
    <View className={`grid grid-cols-${columns} gap-${gap}`} {...props}>
      {children}
    </View>
  );
};
