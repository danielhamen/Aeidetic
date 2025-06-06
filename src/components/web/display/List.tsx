import React, { HTMLAttributes, ReactNode } from "react";

export interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children?: ReactNode;
  ordered?: boolean;
}

export function List({ children, ordered = false, ...props }: ListProps) {
  const Component: any = ordered ? "ol" : "ul";
  return (
    <Component
      {...props}
      className={`list-inside ${ordered ? "list-decimal" : "list-disc"} ${
        props.className ?? ""
      }`}
    >
      {children}
    </Component>
  );
}
