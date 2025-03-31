import { Module } from "./../Module/Module";
import { LayoutNode } from "./LayoutNode";
import { VNode } from "./VNode";
import { LexemeNode } from "./LexemeNode";
import { VCursor } from "./VCursor";
import { ReactNode } from "react";

/**
 * Document state;
 * - protected: only suggestions can be made;
 * - editable: no protections placed; editing as usual is allowed;
 * - readonly: can only read document contents.
 */
export type DocumentState = "protected" | "editable" | "readonly";

export type DocumentAccessMemoryType = number | string | boolean | null;

export interface DOMMap<WrappedObject, HTMLElement> {
  wrappedObject: WrappedObject;
  htmlElement: HTMLElement;
}

/**
 * Serializable document representation.
 */
export interface Document {
  accessMemory?: {
    memoryHeap: { [key: number]: DocumentAccessMemoryType };
    freeMemory: (addr: number) => void;
    writeMemory: (addr: number, value: DocumentAccessMemoryType) => void;
    readMemory: (addr: number) => DocumentAccessMemoryType;
    clearMemory: () => void;
    getMemorySize: () => number;
  };
  documentContent: {
    content: VNode[];
    setContent: (content: VNode[]) => void;
    cursors: VCursor[];
    setCursors: (cursors: VCursor[]) => void;
    mappedContent: {
      cursorMap: Record<string, DOMMap<VCursor, HTMLDivElement>>;
      lexemeMap: Record<string, DOMMap<LexemeNode, HTMLSpanElement>>;
      layoutMap: Record<string, DOMMap<VNode, HTMLDivElement>>;
    };
    documentLayers: {
      CursorLayer: ReactNode;
      ContentLayer: ReactNode;
      DocumentLayer: ReactNode;
    };
    // pushStack: (stack: VStack) => void;
    // removeStack: (stack: VStack) => void;
  };
  documentMetadata: {
    name: string;
    setName: (name: string) => void;
    desc: string;
    setDesc: (desc: string) => void;

    /** Incremental version number; every time the document is saved, it is incremented */
    localVersion: number;

    documentState: DocumentState;
  };
  executionOperators: {
    /** Undo last operation */
    undo: () => void;
    /** Redo last undone operation */
    redo: () => void;
    /** Save document */
    save: () => void;
    /** Save document as */
    saveAs: () => void;
    /** Copy document */
    copy: () => void;
    /** Paste document */
    paste: () => void;
    /** Cut document */
    cut: () => void;

    /** Safely close the document */
    close: () => void;

    /**  */
    export: () => void;
  };
  moduleRegistry: {
    modules: Module[];
    registerModule: (module: Module) => void;
    unregisterModule: (module: Module) => void;
  };
  layoutRegistry: {
    layoutNodes: LayoutNode[];
    registerNode: (node: LayoutNode) => void;
    unregisterNode: (node: LayoutNode) => void;
    getNodeById: (id: string) => LayoutNode | undefined;
  };
}
