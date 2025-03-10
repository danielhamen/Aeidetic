import React, { ReactNode } from "react";

export interface BoldProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export function Bold({ children, ...props }: BoldProps) {
  return <b {...props}>{children}</b>;
}

export function B(props: BoldProps) {
  return <Bold {...props} />;
}
