import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  0?: undefined;
}

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
