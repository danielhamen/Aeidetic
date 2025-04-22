import React from "react";
import { Text as BaseText, TextProps as BaseTextProps } from "../core/Text";

// export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
//   children: React.ReactNode;
//   color?: string;
//   font?: TextFont;
//   size?: number;
//   weight?: number;
// }

export function Text({ children, ...props }: BaseTextProps) {
  return <BaseText {...props}>{children}</BaseText>;
}
