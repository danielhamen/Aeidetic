import React from "react";
import {
  AttributeProps,
  AttributeWidth,
  WidthProvider,
} from "./CustomAttribute";
import { Input, InputProps } from "../core/Input";

export interface TextAttributeProps extends InputProps, AttributeProps<string> {
  placeholder?: string;
  width?: AttributeWidth;
  name: string;
}

export function TextAttribute({
  value,
  setValue,
  name,
  width = "medium",
  ...props
}: TextAttributeProps) {
  return (
    <WidthProvider width={width}>
      <Input
        type="text"
        {...props}
        name={name}
        value={value}
        setValue={setValue}
      />
    </WidthProvider>
  );
}
