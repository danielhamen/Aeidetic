import React from "react";

export interface ButtonGroupProps {
  children?: React.ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <div>{children}</div>;
}
