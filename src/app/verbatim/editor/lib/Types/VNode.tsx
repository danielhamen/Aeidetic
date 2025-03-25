import { LexemeNode } from "./LexemeNode";

export interface IVNode {
  index: number;
  size: [number, number];
  setSize: (size: [number, number]) => void;
  node: string;
  attrs: Record<string, string | number | boolean | null>;
  content?: LexemeNode[];
}

export class VNode implements IVNode {
  index: number;
  id: string;
  size: [number, number];
  setSize: (size: [number, number]) => void;
  node: string;
  attrs: Record<string, string | number | boolean | null>;
  content?: LexemeNode[];

  constructor({ index, size, setSize, node, attrs, content = [] }: IVNode) {
    this.index = index;
    this.id = crypto.randomUUID();
    this.size = size;
    this.setSize = setSize;
    this.node = node;
    this.attrs = attrs;
    this.content = content;
  }
}
