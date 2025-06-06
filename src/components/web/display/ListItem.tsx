import React, { LiHTMLAttributes, ReactNode } from "react";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
}

export function ListItem({ children, ...props }: ListItemProps) {
  return (
    <li {...props} className={`my-1 ${props.className ?? ""}`}>
      {children}
    </li>
  );
}
