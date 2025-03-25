"use client";
import React, { ReactNode } from "react";
import { Button as CoreButton } from "./../core/Button";
import { AttributeWidth, WidthProvider } from "../attributes/CustomAttribute";
import { Text } from "../display/Text";

export type ButtonStyle = "primary" | "outline" | "link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textContent?: string;
  children?: ReactNode;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
  textAlign?: "left" | "center" | "right";
  width?: AttributeWidth;
}

export function Button({
  children,
  disabled,
  buttonStyle,
  textContent,
  textAlign,
  width = "fit",
  ...props
}: ButtonProps) {
  return (
    <WidthProvider width={width}>
      <CoreButton
        {...props}
        className={`bg-blue-500 text-white border-none transition-all duration-100 outline-0 outline-blue-200 active:outline-4 p-2 px-4 rounded-lg ${props.className || ""}`}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          ...props.style,
        }}
      >
        {children}
        {textContent && (
          <Text className={`text-${textAlign}`}>{textContent}</Text>
        )}
      </CoreButton>
    </WidthProvider>
  );
}
