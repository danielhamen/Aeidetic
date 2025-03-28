import React, { ComponentProps, ReactNode } from "react";

export interface ViewProps extends ComponentProps<"div"> {
  children?: ReactNode;
}

export function View({ children, ...props }: ViewProps) {
  return <div {...props}>{children}</div>;
}
