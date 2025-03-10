import React from "react";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Text({ children, ...props }: TextProps) {
  return <span {...props}>{children}</span>;
}
