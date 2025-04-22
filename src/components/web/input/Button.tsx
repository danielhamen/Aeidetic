"use client";
import React, { ReactNode } from "react";
import { Button as CoreButton } from "../core/Button";
import { AttributeWidth, WidthProvider } from "../attributes/CustomAttribute";
import { Text } from "../display/Text";

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
  return (
    <WidthProvider width={buttonContent === "icon" ? "fit" : width}>
      <CoreButton
        {...props}
        className={[
          `flex transition-all duration-150 ease-in-out outline-0 focus-visible:ring-4 focus-visible:ring-blue-300 active:scale-[0.98] font-semibold`,
          buttonContent === "text"
            ? "px-4 py-2 rounded-xl w-fit"
            : "rounded-full items-center justify-center size-12",
          buttonStyle === "primary"
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            : "",
          buttonStyle === "secondary"
            ? "bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm"
            : "",
          buttonStyle === "outline"
            ? "bg-white border-2 border-blue-400 text-blue-500 hover:bg-blue-50"
            : "",
          buttonStyle === "link" ? "text-blue-600 hover:underline p-0" : "",
          disabled ? "opacity-50 pointer-events-none" : "",
          props.className ?? "",
        ].join(" ")}
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
