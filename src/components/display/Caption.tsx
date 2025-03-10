import React, { ReactNode } from "react";
import { IntegerRange } from "api/lib/types/IntegerRange";

export interface CaptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  level?: IntegerRange<1, 7>;
}

export function Caption({ children, ...props }: CaptionProps) {
  return <p {...props}>{children}</p>;
}

export function C1(props: CaptionProps) {
  return <Caption {...props} level={1} />;
}

export function C2(props: CaptionProps) {
  return <Caption {...props} level={2} />;
}

export function C3(props: CaptionProps) {
  return <Caption {...props} level={3} />;
}

export function C4(props: CaptionProps) {
  return <Caption {...props} level={4} />;
}

export function C5(props: CaptionProps) {
  return <Caption {...props} level={5} />;
}

export function C6(props: CaptionProps) {
  return <Caption {...props} level={6} />;
}
