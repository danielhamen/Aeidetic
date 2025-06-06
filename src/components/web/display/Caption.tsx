import React from "react";
import { Text, TextProps } from "../core/Text";

export interface CaptionProps extends TextProps {
  level?: 1 | 2 | 3;
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
      fontSize={null}
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
