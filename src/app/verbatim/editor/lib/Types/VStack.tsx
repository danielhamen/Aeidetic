import { VCursor } from "./VCursor";
import { VNode } from "./VNode";

export interface VStack {
  id: string;
  nodes: VNode[];
  cursors: VCursor[];
  position: [number, number];
  anchor: [number, number];
  size: [number, number];
  direction?: "row" | "column";
  padding?: number;
  margin?: number;
  background?: string;
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end";
}
