"use client";
import React, { ReactNode } from "react";
import { Button as CoreButton } from "../core/Button";
import { AttributeWidth, WidthProvider } from "../attributes/CustomAttribute";
import { Text } from "../display/Text";
import { useAccent } from "../../../hooks/useAccent";

export type ButtonStyle = "primary" | "secondary" | "outline" | "link";
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
  buttonStyle = "primary",
  textAlign,
  width = "fit",
  ...props
}: ButtonProps) {
  const accent = useAccent();
  return (
    <WidthProvider width={buttonContent === "icon" ? "fit" : width}>
      <CoreButton
        {...props}
        disabled={disabled}
        className={[
          `flex transition-all duration-150 ease-in-out outline-0 focus-visible:ring-4 focus-visible:ring-${accent}-300 ${!disabled ? "active:scale-[0.98]" : ""} font-semibold flex-grow items-center`,
          buttonContent === "text"
            ? "px-4 py-2 rounded-xl w-fit"
            : "rounded-full items-center justify-center size-12",
          buttonStyle === "primary"
            ? `bg-${accent}-600 hover:bg-${accent}-700 text-white shadow-md w-full`
            : "",
          buttonStyle === "secondary"
            ? `bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm w-full`
            : "",
          buttonStyle === "outline"
            ? `bg-white border-2 border-${accent}-400 text-${accent}-500 hover:bg-${accent}-50 w-full`
            : "",
          buttonStyle === "link"
            ? `text-${accent}-600 hover:underline p-0`
            : "",
          disabled ? "opacity-50" : "",
          `justify-${textAlign}`,
          props.className ?? "",
        ].join(" ")}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          ...props.style,
        }}
      >
        {children}
        {textContent && (
          <Text className={`text-${textAlign} align-middle w-full`}>
            {textContent}
          </Text>
        )}
      </CoreButton>
    </WidthProvider>
  );
}
