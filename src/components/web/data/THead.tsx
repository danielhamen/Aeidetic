import React, { HTMLAttributes, ReactNode } from "react";

export interface THeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export function THead({ children, ...props }: THeadProps) {
  return (
    <thead {...props} className={`bg-gray-100 text-left ${props.className ?? ""}`}>
      {children}
    </thead>
  );
}
