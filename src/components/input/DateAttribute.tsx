import React from "react";

export interface PickerProps<T> {
  value: T;
  setValue: (val: T) => void;
}

export function Picker<T>({}: PickerProps<T>) {}
