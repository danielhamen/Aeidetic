import React, { ReactNode } from "react";

export interface InputRowProps {
  label: string;
  input: ReactNode;
}

/**
 * Creates a row of input fields for the IconGroup component.
 */
export function InputRow({}: InputRowProps) {
  return <div className="input-row">{/* Add your input fields here */}</div>;
}
