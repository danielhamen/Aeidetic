import React, { ReactNode } from "react";

export interface ItalicProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export function Italic({ children, ...props }: ItalicProps) {
  return <i {...props}>{children}</i>;
}

export function I(props: ItalicProps) {
  return <Italic {...props} />;
}
