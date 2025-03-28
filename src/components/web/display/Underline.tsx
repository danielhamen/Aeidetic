import React, { ReactNode } from "react";

export interface UnderlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export function Underline({ children, ...props }: UnderlineProps) {
  return <u {...props}>{children}</u>;
}

export function U(props: UnderlineProps) {
  return <Underline {...props} />;
}
