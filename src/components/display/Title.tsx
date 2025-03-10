import React, { ReactNode } from "react";
import { IntegerRange } from "api/lib/types/IntegerRange";

export interface TitleProps extends React.HTMLAttributes<HTMLTitleElement> {
  children?: ReactNode;
  level?: IntegerRange<1, 7>;
}

export function Title({ children, level = 1, ...props }: TitleProps) {
  const Tag = `h${level}`;
  return <Tag {...props}>{children}</Tag>;
}

export function T1(props: TitleProps) {
  return <Title {...props} level={1} />;
}

export function T2(props: TitleProps) {
  return <Title {...props} level={2} />;
}

export function T3(props: TitleProps) {
  return <Title {...props} level={3} />;
}

export function T4(props: TitleProps) {
  return <Title {...props} level={4} />;
}

export function T5(props: TitleProps) {
  return <Title {...props} level={5} />;
}

export function T6(props: TitleProps) {
  return <Title {...props} level={6} />;
}
