import React, { HTMLAttributes, ReactNode } from "react";

export interface TrProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
  hover?: boolean;
}

export function Tr({ children, hover = true, ...props }: TrProps) {
  return (
    <tr
      {...props}
      className={`${hover ? "hover:bg-gray-50" : ""} ${props.className ?? ""}`}
    >
      {children}
    </tr>
  );
}
