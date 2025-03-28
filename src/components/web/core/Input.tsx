import React, { useEffect, useState } from "react";
import { Flex } from "../layout/Flex";
import { Icon } from "../icon/Icon";
import { fontFor, TextFont } from "./Text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Only "text" is allowed here. */
  type?: "text" | "password" | "hidden";
  /** Number of lines; if greater than 1, a <textarea> is rendered. */
  lineLimit?: number;
  /** Whether the input is read-only. */
  readOnly?: boolean;
  /** Whether to show a clear ("x") icon when there is a value. */
  clearable?: boolean;
  /** Icon displayed on the left side of the input. */
  leadingIcon?: React.ReactNode;
  /** Icon displayed on the right side (replaced by clear icon if `clearable`). */
  trailingIcon?: React.ReactNode;
  /** The current value of the input. */
  value: string;
  /** Callback to update the input value. */
  setValue: (value: string) => void;
  /** Font family displayed */
  font?: TextFont;
  /** When true, a red outline will be displayed around the input */
  error?: boolean;
  /** Callback to set the error state */
  setError?: (err: boolean) => void;
}

/**
 * A custom text input (or textarea if `lineLimit > 1`) with optional leading/trailing icons and clear button.
 */
export function Input({
  type = "text",
  font = "regular",
  lineLimit = 1,
  readOnly = false,
  clearable = false,
  value,
  setValue,
  leadingIcon,
  trailingIcon,
  error,
  setError,
  ...props
}: InputProps) {
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    // Show the clear icon if `clearable` is true AND there's a non-empty value
    setShowClear(clearable && value.length > 0);
  }, [clearable, value]);

  const isValidInputType = (type: string) =>
    type === "text" || type === "password" || type === "hidden";

  // Only allow type="text", "password", or "hidden". If you need more types, consider separate specialized components.
  if (!isValidInputType(type)) {
    throw new Error(
      `Invalid input type: '${type}'; expected 'text'. If you need other types, provide a specialized component.`,
    );
  }

  // Shared class for both <input> and <textarea>
  // Adjust left padding if there's a leading icon; adjust right padding if there's a trailing icon or the clear icon
  const baseClass =
    `border border-gray-200 outline-0 outline-blue-100 ${error ? "outline-4 outline-red-400" : ""} focus:outline-4 transition-all duration-100 rounded-lg p-2 text-[16px] w-full ` +
    (leadingIcon ? "pl-10 " : "pl-2 ") +
    (trailingIcon || showClear ? "pr-10 " : "pr-2 ") +
    ` ${fontFor(font).variable}`;

  return (
    <Flex className="relative">
      {/* Leading Icon */}
      {leadingIcon && (
        <Flex
          className="absolute left-3 top-1/2 -translate-y-1/4"
          justify="center"
          align="center"
        >
          {leadingIcon}
        </Flex>
      )}

      {/* Trailing Icon or Clear Icon */}
      {(trailingIcon || showClear) && (
        <Flex
          className="absolute right-3 top-1/2 -translate-y-1/4"
          justify="center"
          align="center"
        >
          {showClear ? (
            <Icon
              name="close"
              onClick={() => setValue("")}
              className="cursor-pointer"
              size={16}
            />
          ) : (
            trailingIcon
          )}
        </Flex>
      )}

      {lineLimit > 1 ? (
        <textarea
          {...props}
          value={value}
          readOnly={readOnly}
          onChange={(e) => setValue(e.target.value)}
          rows={lineLimit}
          className={baseClass}
        />
      ) : (
        <input
          {...props}
          type={type}
          value={value}
          readOnly={readOnly}
          onChange={(e) => setValue(e.target.value)}
          className={baseClass}
        />
      )}
    </Flex>
  );
}
