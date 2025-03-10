import React, { ComponentProps, ReactNode } from "react";
import { View } from "../core/View";

/**
 * 📌 `Container.tsx`
 * A **responsive wrapper** that centers content.
 */
export interface ContainerProps extends ComponentProps<"div"> {
  children?: ReactNode;
  maxWidth?: string | number;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 1200,
  ...props
}) => {
  return (
    <View
      className="w-full mx-auto px-4"
      style={{ maxWidth: maxWidth }}
      {...props}
    >
      {children}
    </View>
  );
};
