import React, { TableHTMLAttributes, ReactNode } from "react";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
}

export function Table({ children, ...props }: TableProps) {
  return (
    <table
      {...props}
      className={`min-w-full border-collapse ${props.className ?? ""}`}
    >
      {children}
    </table>
  );
}
