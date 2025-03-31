import React from "react";
import { WidthProvider } from "./CustomAttribute";
import { TextAttribute, TextAttributeProps } from "./TextAttribute";
import { Icon } from "../icon/Icon";

export interface EmailAttributeProps extends TextAttributeProps {
  0?: undefined;
}

export function EmailAttribute({
  value,
  setValue,
  width = "medium",
  placeholder = "Type your email",
  ...props
}: EmailAttributeProps) {
  return (
    <WidthProvider width={width}>
      <TextAttribute
        leadingIcon={<Icon name="email" size={16} />}
        {...props}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
      />
    </WidthProvider>
  );
}
