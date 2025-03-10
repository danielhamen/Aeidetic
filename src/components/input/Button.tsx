import React, { ReactNode } from "react";

export type ButtonStyle = "primary" | "outline" | "link";
export type ButtonWidth = "full" | "fit" | number | string;

export interface ButtonProps {
  textContent?: string;
  children?: ReactNode;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
  foregroundColor?: string;
  backgroundColor?: string;
  textAlign?: "left" | "center" | "right";
  width?: ButtonWidth;
}

export function Button({
  children,
  disabled,
  backgroundColor,
  foregroundColor,
  buttonStyle,
  textContent,
  textAlign,
  width = "full",
}: ButtonProps) {
  return (
    <button
      className={`bg-${backgroundColor} fg-${foregroundColor} border border-gray-300`}
      style={{
        width: (
          {
            full: "100%",
            fit: "fit-content",
            number: `${width}px`,
            string: width,
          } as { [key: ButtonWidth]: string }
        )[width],
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
      {textContent && (
        <span className={`text-${textAlign}`}>{textContent}</span>
      )}
    </button>
  );
}
