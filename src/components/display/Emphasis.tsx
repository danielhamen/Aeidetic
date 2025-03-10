import React, { ReactNode } from "react";

export interface EmphasisProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export function Emphasis({ children, ...props }: EmphasisProps) {
  return <em {...props}>{children}</em>;
}

export function Em(props: EmphasisProps) {
  return <Emphasis {...props} />;
}
