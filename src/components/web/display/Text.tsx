import React from "react";
import { Text as BaseText, TextFont } from "../core/Text";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: string;
  font?: TextFont;
  size?: number;
}

export function Text({ children, ...props }: TextProps) {
  return <BaseText {...props}>{children}</BaseText>;
}
