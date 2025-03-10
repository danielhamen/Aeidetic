import React, { ReactNode } from "react";
import { IntegerRange } from "api/lib/types/IntegerRange";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  level?: IntegerRange<1, 7>;
}

export function Heading({ children, level = 1, ...props }: HeadingProps) {
  const Tag = `h${level}`;
  return <Tag {...props}>{children}</Tag>;
}

export function H1(props: HeadingProps) {
  return <Heading {...props} level={1} />;
}

export function H2(props: HeadingProps) {
  return <Heading {...props} level={2} />;
}

export function H3(props: HeadingProps) {
  return <Heading {...props} level={3} />;
}

export function H4(props: HeadingProps) {
  return <Heading {...props} level={4} />;
}

export function H5(props: HeadingProps) {
  return <Heading {...props} level={5} />;
}

export function H6(props: HeadingProps) {
  return <Heading {...props} level={6} />;
}
