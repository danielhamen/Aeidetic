import { useState } from "react";

export function useBool(
  initialValue: boolean = false,
): [boolean, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}
