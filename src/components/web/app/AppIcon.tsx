"use client";
import React from "react";
import { Flex, Icon } from "api/components/web";
import { useAccent } from "api/hooks/useAccent";
import {
  backgroundColorMap,
  TailwindColor,
  TailwindColorName,
} from "../core/Text";

export interface AppIconProps {
  name: string;
  fill?: boolean;
  color?: TailwindColorName;
}

export function AppIcon({ name, fill = true, color }: AppIconProps) {
  const accentColor = useAccent();
  return (
    <Flex
      className={`p-1 ${backgroundColorMap[((color ?? accentColor) + "-500") as TailwindColor]} rounded-md`}
    >
      <Icon name={name} color={"white"} fill={fill} size={24} />
    </Flex>
  );
}
