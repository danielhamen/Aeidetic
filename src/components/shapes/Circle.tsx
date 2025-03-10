import React from "react";
import { View } from "../core/View";

export interface CircleProps {
  size: number;
  color: string;
}

export function Circle(props: CircleProps) {
  const { size, color } = props;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: color,
      }}
    />
  );
}
