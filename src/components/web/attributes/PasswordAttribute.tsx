import React, { useEffect, useState } from "react";
import { WidthProvider } from "./CustomAttribute";
import { TextAttribute, TextAttributeProps } from "./TextAttribute";
import { Icon } from "../icon/Icon";

export interface PasswordAttributeProps extends TextAttributeProps {}

export function PasswordAttribute({
  value,
  setValue,
  width = "medium",
  placeholder = "Type your password",
  ...props
}: PasswordAttributeProps) {
  return (
    <WidthProvider width={width}>
      <TextAttribute
        type="password"
        leadingIcon={<Icon name="password" size={16} />}
        {...props}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
      />
    </WidthProvider>
  );
}
