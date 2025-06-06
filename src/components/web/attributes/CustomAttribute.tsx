"use client";
import React, { ReactNode, useMemo } from "react";
import { Flex } from "../layout/Flex";

export type AttributeWidth =
  | "full"
  | "fit"
  | "auto"
  | "short"
  | "medium"
  | "long";

export interface AttributeProps<T> {
  value: T;
  setValue: (value: T) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * Attributes with a `width: AttributeWidth` property
 * should be wrapped in this component to ensure consistent width.
 */
export function WidthProvider({
  width,
  children,
}: {
  width: AttributeWidth;
  children: ReactNode;
}) {
  const style = useMemo(() => {
    switch (width) {
      case "full":
        return { width: "100%" };
      case "fit":
        return { width: "fit-content" };
      case "auto":
        return { width: "auto" };
      case "short":
        return { width: 200, minWidth: 200 };
      case "medium":
        return { width: 270, minWidth: 270 };
      case "long":
        return { width: 350, minWidth: 350 };
      default:
        return {};
    }
  }, [width]);

  return (
    <Flex style={{ maxWidth: "100%", ...style }}>{children}</Flex>
  );
}
