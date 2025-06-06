import React, { HTMLAttributes, ReactNode } from "react";

export interface TBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export function TBody({ children, ...props }: TBodyProps) {
  return <tbody {...props}>{children}</tbody>;
}
