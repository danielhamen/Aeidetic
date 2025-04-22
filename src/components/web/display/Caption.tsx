import React, { ReactNode } from "react";
import { IntegerRange } from "api/lib/types/IntegerRange";
import { Text } from "../core/Text";

export interface CaptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  level?: IntegerRange<1, 4>;
}

export const CaptionFontSize = {
  1: "text-base",
  2: "text-sm",
  3: "text-xs",
};

export function Caption({ children, level = 1, ...props }: CaptionProps) {
  return (
    <Text
      {...props}
      className={`${CaptionFontSize[level]}  ${props.className ?? ""}`}
      size={null}
    >
      {children}
    </Text>
  );
}

export function C1(props: CaptionProps) {
  return <Caption {...props} level={1} />;
}

export function C2(props: CaptionProps) {
  return <Caption {...props} level={2} />;
}

export function C3(props: CaptionProps) {
  return <Caption {...props} level={3} />;
}
