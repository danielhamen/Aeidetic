import React from "react";
import { Text as BaseText, TextProps as BaseTextProps } from "../core/Text";

export function Paragraph(props: BaseTextProps) {
  return <BaseText {...props} />;
}

export function P(props: BaseTextProps) {
  return <Paragraph {...props} style={{ lineHeight: 1.6, ...props.style }} />;
}
