"use client";
import React, { ReactNode } from "react";
import { Button as CoreButton } from "../core/Button";
import { AttributeWidth, WidthProvider } from "../attributes/CustomAttribute";
import { Text } from "../display/Text";

export type ButtonStyle = "primary" | "outline" | "link";
export type ButtonContent = "icon" | "text";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textContent?: string;
  children?: ReactNode;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
  buttonContent?: ButtonContent;
  textAlign?: "left" | "center" | "right";
  width?: AttributeWidth;
}

export function Button({
  children,
  disabled,
  textContent,
  buttonContent = "text",
  textAlign,
  width = "fit",
  ...props
}: ButtonProps) {
  return (
    <WidthProvider width={buttonContent === "icon" ? "fit" : width}>
      <CoreButton
        {...props}
        className={`flex bg-blue-500 text-white border-none transition-all duration-100 outline-0 outline-blue-200 active:outline-4 p-2 ${buttonContent === "text" ? "px-4 rounded-lg w-fit" : "rounded-full items-center justify-center size-12"} ${props.className || ""}`}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          ...props.style,
        }}
      >
        {children}
        {textContent && (
          <Text className={`text-${textAlign} align-middle`}>
            {textContent}
          </Text>
        )}
      </CoreButton>
    </WidthProvider>
  );
}
