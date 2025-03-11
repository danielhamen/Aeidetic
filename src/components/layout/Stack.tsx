import React, { ComponentProps, ReactNode } from "react";
import { View } from "../core/View";

/**
 * 📌 `Stack.tsx`
 * A **vertical/horizontal stack layout** for consistent spacing.
 */
export interface StackProps extends ComponentProps<"div"> {
  children?: ReactNode;
  spacing?: number | string;
  direction?: "row" | "column";
}

export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 4,
  direction = "column",
  ...props
}) => {
  return (
    <View className={`flex flex-${direction} gap-${spacing}`} {...props}>
      {children}
    </View>
  );
};
