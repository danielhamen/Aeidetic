import React from "react";
import { Text as BaseText, TextProps } from "../core/Text";

export function Code({ ...props }: TextProps) {
  return <BaseText fontFamily="mono" fontSize={"sm"} {...props} />;
}
