import React, { TdHTMLAttributes, ReactNode } from "react";

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function Td({ children, ...props }: TdProps) {
  return (
    <td
      {...props}
      className={`px-4 py-2 border-b border-gray-200 ${props.className ?? ""}`}
    >
      {children}
    </td>
  );
}
