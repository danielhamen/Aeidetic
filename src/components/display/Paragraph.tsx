import React from "react";

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Paragraph({ children, ...props }: ParagraphProps) {
  return <p {...props}>{children}</p>;
}

export function P(props: ParagraphProps) {
  return <Paragraph {...props} />;
}
