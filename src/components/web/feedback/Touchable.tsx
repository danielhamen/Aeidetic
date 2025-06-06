import React from "react";
import { Flex, FlexProps } from "../layout/Flex";
import clsx from "clsx";

export type TouchableAnimation = "none" | "opacity" | "scale" | "ripple";
export type ScaleFactor =
  | "0.99"
  | "0.98"
  | "0.97"
  | "0.96"
  | "0.95"
  | "0.94"
  | "0.93"
  | "0.92"
  | "0.91"
  | "0.90";

export const scaleFactorMap: Record<ScaleFactor, string> = {
  "0.99": "active:scale-[0.99]",
  "0.98": "active:scale-[0.98]",
  "0.97": "active:scale-[0.97]",
  "0.96": "active:scale-[0.96]",
  "0.95": "active:scale-[0.95]",
  "0.94": "active:scale-[0.94]",
  "0.93": "active:scale-[0.93]",
  "0.92": "active:scale-[0.92]",
  "0.91": "active:scale-[0.91]",
  "0.90": "active:scale-[0.90]",
};

export interface TouchableProps extends FlexProps {
  children: React.ReactNode;
  animation?: TouchableAnimation | TouchableAnimation[];
  scaleFactor?: ScaleFactor;
}

export function Touchable({
  children,
  animation = ["none"],
  scaleFactor = "0.98",
  ...props
}: TouchableProps) {
  const animations = Array.isArray(animation) ? animation : [animation];
  const animationClass =
    (animations.includes("scale") ? scaleFactorMap[scaleFactor] : "") +
    (animations.includes("opacity") ? " active:opacity-95" : "") +
    (animations.includes("ripple")
      ? " active:bg-gray-200 active:rounded-full"
      : "");

  return (
    <Flex
      {...props}
      className={clsx(
        "transition-transform duration-100 ease-in-out",
        animationClass,
        props.className ?? "",
      )}
    >
      {children}
    </Flex>
  );
}
