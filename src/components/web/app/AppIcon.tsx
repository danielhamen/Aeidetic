import React from "react";
import { Flex, Icon } from "api/components/web";

export interface AppIconProps {
  name: string;
  fill?: boolean;
  color?: "indigo" | "green" | "orange" | "amber";
}

const colorMap = {
  indigo: "bg-indigo-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
};

export function AppIcon({ name, fill = true, color = "indigo" }: AppIconProps) {
  return (
    <Flex className={`p-1 ${colorMap[color] ?? "bg-indigo-500"} rounded-md`}>
      <Icon name={name} color={"white"} fill={fill} size={24} />
    </Flex>
  );
}
