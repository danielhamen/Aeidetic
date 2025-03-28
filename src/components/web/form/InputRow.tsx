import React, { ReactNode } from "react";

export interface InputRowProps {}

/**
 * Creates a row of input fields for the IconGroup component.
 */
export function InputRow({
  label,
  input,
}: {
  label: string;
  input: ReactNode;
}) {
  return <div className="input-row">{/* Add your input fields here */}</div>;
}
