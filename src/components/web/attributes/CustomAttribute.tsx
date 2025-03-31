import React, { ReactNode, useEffect, useState } from "react";
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
  const [containerWidth, setContainerWidth] = useState<string | number | null>(
    null,
  );
  useEffect(() => {
    switch (width) {
      case "full":
        setContainerWidth("100%");
        break;
      case "fit":
        setContainerWidth("fit-content");
        break;
      case "auto":
        setContainerWidth("auto");
        break;
      case "short":
        setContainerWidth(200);
        break;
      case "medium":
        setContainerWidth(270);
        break;
      case "long":
        setContainerWidth(350);
        break;
    }
  }, [width]);
  return (
    <Flex
      style={{
        minWidth:
          typeof containerWidth === "number" ? containerWidth : undefined,
        width: containerWidth ?? undefined,
        maxWidth: "100%",
      }}
    >
      {children}
    </Flex>
  );
}
