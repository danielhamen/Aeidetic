import React from "react";

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: number;
}

export function Paragraph({ children, ...props }: ParagraphProps) {
  return (
    <p {...props} style={{ fontSize: props.size ?? undefined }}>
      {children}
    </p>
  );
}

export function P(props: ParagraphProps) {
  return <Paragraph {...props} />;
}
