import { IntegerRange } from "./../../../lib/types/IntegerRange";
import React from "react";

/** Represents the icon key */
export type IconKey = string;
export type IconSource = "MATERIAL_ICONS";
export type IconValue = { src: IconSource; name: string };

/** Represents the icon weight */
export type IconWeight =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | IntegerRange<100, 700>;

/** Represents the icon grade */
export type IconGrade = IntegerRange<-25, 200>;

/** Represents the icon optical size */
export type IconOpticalSize = IntegerRange<20, 48>;

export const IconList: Record<IconKey, IconValue> = {
  DEFAULT: { src: "MATERIAL_ICONS", name: "disabled_by_default" },
  UNDO: { src: "MATERIAL_ICONS", name: "undo" },
  REDO: { src: "MATERIAL_ICONS", name: "redo" },
  CHECKMARK: { src: "MATERIAL_ICONS", name: "check" },
  DOUBLE_CHECKMARK: { src: "MATERIAL_ICONS", name: "done_all" },
  H1: { src: "MATERIAL_ICONS", name: "format_h1" },
  H2: { src: "MATERIAL_ICONS", name: "format_h2" },
  H3: { src: "MATERIAL_ICONS", name: "format_h3" },
  H4: { src: "MATERIAL_ICONS", name: "format_h4" },
  H5: { src: "MATERIAL_ICONS", name: "format_h5" },
  H6: { src: "MATERIAL_ICONS", name: "format_h6" },
  BLOCK_QUOTE: { src: "MATERIAL_ICONS", name: "format_quote" },
  NUMBERED_LIST: { src: "MATERIAL_ICONS", name: "format_list_numbered" },
  BULLET_LIST: { src: "MATERIAL_ICONS", name: "format_list_bulleted" },
  DRAG_INDICATOR: { src: "MATERIAL_ICONS", name: "drag_indicator" },
  DRAG_HANDLE: { src: "MATERIAL_ICONS", name: "drag_handle" },
  LIGHT_MODE: { src: "MATERIAL_ICONS", name: "light_mode" },
  DARK_MODE: { src: "MATERIAL_ICONS", name: "dark_mode" },
} as const;

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: keyof typeof IconList | string;
  size?: number;
  color?: string;
  weight?: IconWeight;
  grade?: IconGrade;
  opticalSize?: IconOpticalSize;
  fill?: boolean;
}

export function Icon({
  name = "DEFAULT",
  size = 24,
  color = "black",
  weight = 400,
  grade = 0,
  opticalSize = 24,
  fill = false,
  ...props
}: IconProps) {
  return (
    <span
      {...props}
      style={{
        userSelect: "none",
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
        ...props.style,
      }}
      className={`material-symbols-rounded text-${color} ${props.className || ""}`}
    >
      {Object.keys(IconList).includes(name) ? IconList[name].name : name}
    </span>
  );
}
