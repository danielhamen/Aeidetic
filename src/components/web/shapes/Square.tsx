import React from "react";
import { View } from "../core/View";

export interface SquareProps {
  size: number;
  color: string;
}

export function Square(props: SquareProps) {
  const { size, color } = props;

  return <View style={{ width: size, height: size, backgroundColor: color }} />;
}
