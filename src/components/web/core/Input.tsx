"use client";
import React, { useEffect, useState } from "react";
import { Flex } from "../layout/Flex";
import { Icon } from "../icon/Icon";
import {
  fontFor,
  TailwindColor,
  TailwindColorName,
  textColorMap,
  TextFont,
} from "./Text";

export interface SharedInputProps {
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
  /** Font family displayed */
  font?: TextFont;
  /** When true, a red outline will be displayed around the input */
  error?: boolean;
  /** Callback to set the error state */
  setError?: (err: boolean) => void;
  /** The current value of the input. */
  value: string;
  /** Callback to update the input value. */
  setValue: (value: string) => void;
  textColor?: TailwindColor;
  ref?: React.Ref<HTMLInputElement>;
}

export type InputProps = SharedInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof SharedInputProps>;

export type TextareaProps = SharedInputProps &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof SharedInputProps
  >;

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
  textColor = "gray-700",
  error,
  setError,
  ref,
  ...props
}: InputProps | TextareaProps) {
  const [showClear, setShowClear] = useState(false);
  const TextColorClass =
    textColorMap[(textColor as TailwindColor) ?? "gray-700"];

  useEffect(() => {
    setShowClear(clearable && value.length > 0);
    if (setError) setError(false);
  }, [clearable, value, setError]);

  const isValidInputType = (t: string): t is "text" | "password" | "hidden" =>
    t === "text" || t === "password" || t === "hidden";

  if (!isValidInputType(type)) {
    throw new Error(
      `Invalid input type: '${type}'. Only 'text', 'password', or 'hidden' are allowed.`,
    );
  }

  const baseClass =
    `${TextColorClass} border border-gray-200 outline-0 outline-blue-100 ${
      error ? "outline-4 outline-red-400" : ""
    } focus:outline-4 transition-all duration-100 rounded-lg p-2 text-[16px] w-full ` +
    (leadingIcon ? "pl-10 " : "pl-2 ") +
    (trailingIcon || showClear ? "pr-10 " : "pr-2 ") +
    ` ${fontFor(font).variable}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValue(e.target.value);

  return (
    <Flex className="relative" style={{ justifyContent: "center" }}>
      {leadingIcon && (
        <Flex className="absolute left-3" justify="center" align="center">
          {leadingIcon}
        </Flex>
      )}

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
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ref={ref}
          value={value}
          readOnly={readOnly}
          onChange={handleChange}
          rows={lineLimit}
          className={baseClass}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          ref={ref}
          type={type}
          value={value}
          readOnly={readOnly}
          onChange={handleChange}
          className={baseClass}
        />
      )}
    </Flex>
  );
}
