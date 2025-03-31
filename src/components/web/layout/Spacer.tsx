import React from "react";
import { View } from "../core/View";

export interface SpacerProps {
  0?: undefined;
}

/**
 * Spacer component that expands to fill available space.
 */
export function Spacer() {
  return <View style={{ flexGrow: 1 }} />;
}
