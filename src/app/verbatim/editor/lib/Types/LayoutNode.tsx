import { FC } from "react";
import { LexemeNode } from "./LexemeNode";

export interface LayoutNodeAttribute {
  id: string;
  name: string;
  desc?: string;
  type: "enum" | "string" | "number" | "boolean";

  /** Only available for type: 'enum' */
  options?: string[];

  min?: number;
  max?: number;
  step?: number;
  precision?: "float" | "integer";
  expanded?: boolean;
}

/**
 *
 */
export interface LayoutNode {
  id: string;
  name: string;
  desc?: string;
  attrs: LayoutNodeAttribute[];
  content: LexemeNode[] | null;
  node: FC<{
    attrs: Record<string, string | number | boolean | null>;
    content: LexemeNode[];
  }>;
}
