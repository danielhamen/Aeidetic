import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Document, DOMMap } from "../Types/Document";
import { Module } from "../Module/Module";
import { LexemeNode } from "../Types/LexemeNode";
import { LayoutNode } from "../Types/LayoutNode";
import { VNode } from "../Types/VNode";
import { VCursor } from "../Types/VCursor";
import { Flex } from "api/components/layout/Flex";

export function TextInteractable({ content }: { content: string }) {
  return <span className="cursor-interactable">{content}</span>;
}

export const DocumentContext = React.createContext<Document | null>(null);

export const DocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [document, setDocument] = React.useState<Document | null>(null);
  const [size1, setSize1] = useState<[number, number]>([100, 100]);

  const [n1] = useState(
    new VNode({
      index: 0,
      size: size1,
      setSize: setSize1,
      node: "ParagraphNode",
      attrs: {},
    }),
  );
  const [documentContent, setDocumentContent] = React.useState<VNode[]>([n1]);

  // `moduleRegistry`
  const [modules, setModules] = React.useState<Module[]>([]);

  // `layoutRegistry`
  const [layoutNodes, setLayoutNodes] = useState<LayoutNode[]>([
    {
      id: "ParagraphNode",
      name: "Paragraph Node",
      attrs: [
        {
          id: "align",
          type: "enum",
          name: "Align",
          options: ["Left", "Center", "Right"],
        },
      ],
      content: [],
      node: ({
        content,
      }: {
        attrs: Record<string, string | number | boolean | null>;
        content: LexemeNode[];
      }) => {
        return (
          <p>
            {content.map((node, index) => (
              <TextInteractable key={index} content={node.content} />
            ))}
          </p>
        );
      },
    },
  ]);
  const getNodeById = useCallback(
    (id: string) => {
      return layoutNodes.find((ln) => ln.id === id);
    },
    [layoutNodes],
  );
  const registerNode = useCallback(
    (layoutNode: LayoutNode) => {
      // Ensure layout node ID doesn't exist:
      if (layoutNodes.some((ln) => ln.id === layoutNode.id)) {
        throw new Error("Layout node ID already exists");
      }

      setLayoutNodes([...layoutNodes, layoutNode]);
    },
    [layoutNodes],
  );
  const unregisterNode = useCallback(
    (layoutNode: LayoutNode) => {
      setLayoutNodes(layoutNodes.filter((ln) => ln !== layoutNode));
    },
    [layoutNodes],
  );

  // `documentMetadata`:
  const [name, setName] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [cursors, setCursors] = useState<VCursor[]>([]);
  const [cursorMap, setCursorMap] = useState<
    Record<string, DOMMap<VCursor, HTMLDivElement>>
  >({});
  const [lexemeMap, setLexemeMap] = useState<
    Record<string, DOMMap<LexemeNode, HTMLSpanElement>>
  >({});
  const [layoutMap, setLayoutMap] = useState<
    Record<string, DOMMap<VNode, HTMLDivElement>>
  >({});
  const [CursorLayer, setCursorLayer] = useState<ReactNode>(null);
  const [ContentLayer, setContentLayer] = useState<ReactNode>(null);
  const [DocumentLayer, setDocumentLayer] = useState<ReactNode>(null);

  // Build ContentLayer and DocumentLayer
  useEffect(() => {
    const _cursorMap: Record<string, DOMMap<VNode, HTMLDivElement>> = {};
    const _lexemeMap: Record<string, DOMMap<VNode, HTMLDivElement>> = {};
    const _layoutMap: Record<string, DOMMap<VNode, HTMLDivElement>> = {};
    const contentLayer = () => (
      <Flex grow className={`absolute z-20`}>
        <Flex direction={"column"}>
          {/* Display all nodes in the stack */}
          {documentContent.map((node, _index) => {
            const requestedNode = getNodeById(node.node);
            if (!requestedNode) {
              throw new Error(`Node not found: ${node.node}`);
            }

            const Node = requestedNode.node;

            return (
              <Node
                key={_index}
                attrs={{}}
                content={[
                  { content: "H", id: crypto.randomUUID() },
                  { content: "e", id: crypto.randomUUID() },
                  { content: "l", id: crypto.randomUUID() },
                  { content: "l", id: crypto.randomUUID() },
                  { content: "o", id: crypto.randomUUID() },
                ]}
              />
            );
          })}
        </Flex>
      </Flex>
    );

    const documentLayer = () => (
      <Flex
        grow
        className={`absolute z-10 rounded-md border border-gray-200`}
        style={{
          width: "8in",
          minHeight: "11in",
        }}
      ></Flex>
    );

    setDocumentLayer(documentLayer);
    setContentLayer(contentLayer);
  }, [lexemeMap, layoutMap, documentContent, getNodeById]);
  useEffect(() => {}, [cursors, cursorMap]);

  useEffect(() => {
    setDocument({
      documentContent: {
        content: documentContent,
        setContent: setDocumentContent,
        cursors: cursors,
        setCursors: setCursors,
        mappedContent: {
          cursorMap: cursorMap,
          lexemeMap: lexemeMap,
          layoutMap: layoutMap,
        },
        documentLayers: {
          CursorLayer,
          ContentLayer,
          DocumentLayer,
        },
      },
      documentMetadata: {
        name: name,
        setName: setName,
        desc: desc,
        setDesc: setDesc,
        localVersion: 1,
        documentState: "editable",
      },
      moduleRegistry: {
        modules: modules,
        registerModule: (module: Module) => {
          // Ensure module ID doesn't exist:
          if (modules.some((m) => m.id === module.id)) {
            throw new Error("Module ID already exists");
          }

          setModules([...modules, module]);
        },
        unregisterModule: (module: Module) => {
          setModules(modules.filter((m) => m !== module));
        },
      },
      layoutRegistry: {
        layoutNodes: layoutNodes,
        registerNode,
        unregisterNode,
        getNodeById,
      },
      executionOperators: {
        undo: () => {},
        redo: () => {},
        save: () => {},
        saveAs: () => {},
        copy: () => {},
        paste: () => {},
        cut: () => {},
        close: () => {},
        export: () => {},
      },
    });
  }, [name, desc, documentContent, modules, layoutNodes]);

  return (
    <DocumentContext.Provider value={document}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => React.useContext(DocumentContext);
