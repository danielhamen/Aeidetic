export interface MarkProperties {
  backgroundColor?: string;
  foregroundColor?: string;

  // --- Font ---
  fontWeight?: number;
  fontFamily?: string;

  // --- Underline ---
  underlineWidth?: number;
  underlineColor?: string;
  underlineStyle?: "solid" | "dashed" | "dotted";

  // --- Strikethrough ---
  strikethroughWidth?: number;
  strikethroughColor?: string;
  strikethroughStyle?: "solid" | "dashed" | "dotted";

  // --- Overline ---
  overlineWidth?: number;
  overlineColor?: string;
  overlineStyle?: "solid" | "dashed" | "dotted";

  // --- Outline ---
  outlineWidth?: number;
  outlineColor?: string;
  outlineStyle?: "solid" | "dashed" | "dotted";
}
