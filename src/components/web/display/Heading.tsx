import React, { ReactNode } from "react";
import { IntegerRange } from "api/lib/types/IntegerRange";
import { fontFor, TextFont } from "api/components/web/core/Text";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  font?: TextFont;
  level?: IntegerRange<1, 7>;
  weight?: number;
  overrideHtmlElementLevel?: IntegerRange<1, 7>;
}

export const HeadingFontSize = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
};

export function Heading({
  children,
  level = 1,
  font = "serif",
  weight = 500,
  overrideHtmlElementLevel,
  ...props
}: HeadingProps) {
  type NativeHeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const Tag: NativeHeadingTag = `h${overrideHtmlElementLevel ?? level}`;
  return (
    <Tag
      {...props}
      className={`${fontFor(font).variable} ${HeadingFontSize[Tag]} my-4 ${props.className || ""}`}
      style={{ fontWeight: weight ?? 500, ...props.style }}
    >
      {children}
    </Tag>
  );
}

export function H1(props: HeadingProps) {
  return <Heading {...props} level={1} />;
}

export function H2(props: HeadingProps) {
  return <Heading {...props} level={2} />;
}

export function H3(props: HeadingProps) {
  return <Heading font="serif_sc" {...props} level={3} />;
}

export function H4(props: HeadingProps) {
  return (
    <Heading
      font="serif_sc"
      {...props}
      style={{ margin: 0, ...props.style }}
      level={4}
    />
  );
}

export function H5(props: HeadingProps) {
  return <Heading font="serif_sc" {...props} level={5} />;
}

export function H6(props: HeadingProps) {
  return <Heading font="serif_sc" {...props} level={6} />;
}
