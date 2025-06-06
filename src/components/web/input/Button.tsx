"use client";
import React, { ReactNode } from "react";
import { Button as CoreButton } from "../core/Button";
import { AttributeWidth, WidthProvider } from "../attributes/CustomAttribute";
import { Text } from "../display/Text";
import { useAccent } from "../../../hooks/useAccent";
import clsx from "clsx";

export type ButtonStyle = "primary" | "secondary" | "outline" | "link";
export type ButtonContent = "icon" | "text";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

  const base = clsx(
    "flex items-center font-semibold transition-all duration-150 ease-in-out focus-visible:ring-4 outline-none",
    `focus-visible:ring-${accent}-300`,
    !disabled && "active:scale-[0.98]",
    disabled && "opacity-50 cursor-not-allowed",
    `justify-${textAlign}`,
  );

  const sizeCls =
    buttonContent === "icon"
      ? "rounded-full justify-center items-center size-12"
      : "px-4 py-2 rounded-lg";

  const styleCls = (() => {
    switch (buttonStyle) {
      case "secondary":
        return "bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm";
      case "outline":
        return `bg-white border-2 border-${accent}-400 text-${accent}-500 hover:bg-${accent}-50`;
      case "link":
        return `bg-transparent text-${accent}-600 hover:underline p-0`;
      default:
        return `bg-${accent}-600 hover:bg-${accent}-700 text-white shadow-md`;
    }
  })();

  return (
    <WidthProvider width={buttonContent === "icon" ? "fit" : width}>
      <CoreButton
        {...props}
        disabled={disabled}
        className={clsx(base, sizeCls, styleCls, props.className)}
        style={{ cursor: disabled ? "not-allowed" : "pointer", ...props.style }}
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
