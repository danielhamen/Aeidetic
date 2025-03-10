"use client";

import { Flex } from "api/components/layout/Flex";
import { useBounds } from "api/hooks/useBounds";
import React, {
  ComponentProps,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { DarkModeSwitch } from "api/components/input/DarkModeSwitch";

export interface CodeContextProps {
  code: string;
  setCode: (code: string) => void;
  autoCompile: boolean;
  setAutoCompile: (autoCompile: boolean) => void;
  themeMode: "light" | "dark";
  setThemeMode: (themeMode: "light" | "dark") => void;
}

export const CodeContext = createContext<CodeContextProps | null>(null);

export function CodeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [code, setCode] = useState(`\

\\begin{align*}

  % Enter some LaTeX here...

\\end{align*}

`);

  const [autoCompile, setAutoCompile] = useState(false);

  return (
    <CodeContext.Provider
      value={{
        code: code,
        setCode: setCode,
        autoCompile: autoCompile,
        setAutoCompile: setAutoCompile,
        themeMode: themeMode,
        setThemeMode: setThemeMode,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}

export function useCodeContext() {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error("useCodeContext must be used within a CodeContextProvider");
  }
  return context;
}

export function CodeEditor() {
  const { code, setCode, autoCompile, themeMode } = useCodeContext();
  const [codeStream, setCodeStream] = useState<string>(code);
  const editorRef = useRef<any>(null);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Register LaTeX as a new language
      monaco.languages.register({ id: "latex" });

      // Define syntax highlighting rules for LaTeX using Monarch
      monaco.languages.setMonarchTokensProvider("latex", {
        tokenizer: {
          root: [
            [/%.*$/, "comment"], // Comments
            [/\\[a-zA-Z]+/, "keyword"], // LaTeX commands
            [/{[^}]*}/, "string"], // Curly braces content
            [/[$][^$]*[$]/, "variable"], // Inline math mode
            [/[$]{2}[^$]*[$]{2}/, "variable"], // Block math mode
          ],
        },
      });

      // Configure language features: auto-closing brackets, surrounding pairs, etc.
      monaco.languages.setLanguageConfiguration("latex", {
        comments: {
          lineComment: "%",
        },
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"],
        ],
        autoClosingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
        ],
        surroundingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
        ],
      });

      // Add auto-completion: When typing \begin, offer to auto-close with \end
      monaco.languages.registerCompletionItemProvider("latex", {
        triggerCharacters: ["{"],
        provideCompletionItems: (model, position) => {
          const textUntilCursor = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          // If the user types "\begin" immediately before a "{", trigger the snippet suggestion
          // if (/\\begin$/.test(textUntilCursor.trim())) {
          //   return {
          //     suggestions: [
          // {
          //   label: "\\begin{...} -> \\end{...}",
          //   kind: monaco.languages.CompletionItemKind.Snippet,
          //   insertText: "\\begin{$1}\n\t$0\n\\end{$1}",
          //   insertTextRules:
          //     monaco.languages.CompletionItemInsertTextRule
          //       .InsertAsSnippet,
          //   documentation: "Auto-complete \\begin with matching \\end",
          // },
          //     ],
          //   };
          // }

          return { suggestions: [] };
        },
      });
    }
  }, [monaco]);

  return (
    <Flex
      grow
      onKeyDown={(e) => {
        if (
          navigator.userAgent.indexOf("Mac") > -1
            ? e.key === "s" &&
              e.metaKey &&
              !e.ctrlKey &&
              !e.altKey &&
              !e.shiftKey &&
              !e.repeat
            : e.key === "s" &&
              e.ctrlKey &&
              !e.altKey &&
              !e.shiftKey &&
              !e.metaKey &&
              !e.repeat
        ) {
          setCode(codeStream);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <MonacoEditor
        height="100%"
        width="100%"
        theme={themeMode == "light" ? `vs-light` : `vs-dark`}
        options={{
          fontSize: 16,
        }}
        defaultLanguage="latex"
        defaultValue={codeStream}
        onChange={(c) => {
          if (c) {
            setCodeStream(c);

            if (autoCompile) {
              setCode(c ?? code);
            }
          }
        }}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </Flex>
  );
}

export function Header(props: ComponentProps<"div">) {
  const { themeMode, setThemeMode } = useCodeContext();
  return (
    <Flex
      direction="row"
      {...props}
      className={`border-b border-black p-2 ${props.className ?? ""} border-b border-${themeMode === "light" ? "gray-300" : "gray-700"}`}
      style={{
        backgroundColor: themeMode === "light" ? "white" : "#1e1e1e",
        boxShadow: `0px 2px 4px ${themeMode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
        zIndex: 1,
      }}
    >
      Hello!:
      <DarkModeSwitch
        isDarkMode={themeMode === "dark"}
        setDarkMode={(isDark: boolean) =>
          setThemeMode(isDark ? "dark" : "light")
        }
      />
    </Flex>
  );
}

export function Editor(props: ComponentProps<"div">) {
  return (
    <Flex grow {...props}>
      <CodeEditor />
    </Flex>
  );
}

// Preview component renders the LaTeX code as HTML using KaTeX.
export function Preview(props: ComponentProps<"div">) {
  const { code, themeMode } = useCodeContext();
  const [renderedHtml, setRenderedHtml] = useState<string>("");
  useEffect(() => {
    let renderedHTML = "";
    try {
      renderedHTML = katex.renderToString(code, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      renderedHTML = `<pre style="color: red;">Error: ${error}</pre>`;
    }

    setRenderedHtml(renderedHTML);
  }, [code]);

  return (
    <Flex
      grow
      {...props}
      style={{
        overflowY: "scroll",
        height: "100%",
      }}
      className={`${themeMode === "light" ? "bg-gray-100" : "bg-neutral-900"}`}
      align="center"
    >
      <div
        className={`${themeMode === "light" ? "bg-white" : "bg-neutral-800"} rounded-lg`}
        style={{
          marginTop: 32,
          color: themeMode === "light" ? "black" : "white",
          width: "8in",
          height: "fit-content",
          overflow: "hidden",
          minHeight: "12in",
        }}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    </Flex>
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizeRef = useRef<HTMLDivElement | null>(null);
  const containerBounds = useBounds(containerRef);
  const [MIN_WIDTH] = useState<number>(200);
  const [MAX_WIDTH, SET_MAX_WIDTH] = useState<number>(Infinity);
  useEffect(
    () => SET_MAX_WIDTH((containerBounds?.width ?? Infinity) - 200),
    [containerBounds],
  );

  // Stores the width of the editor
  const [editorWidth, setEditorWidth] = useState<number | null>(null);
  const [grabbing, setGrabbing] = useState<boolean>(false);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!grabbing || e.pageX <= MIN_WIDTH || e.pageX >= MAX_WIDTH) return;
      setEditorWidth((prev) =>
        Math.min(Math.max(MIN_WIDTH, prev + e.movementX), MAX_WIDTH),
      ); // Prevent too small widths
    }

    function handleMouseUp() {
      setGrabbing(false);
    }

    if (grabbing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [grabbing]);

  return (
    <CodeContextProvider>
      <Flex ref={containerRef} grow={1} style={{ overflow: "hidden" }}>
        <Header />
        <Flex
          grow={1}
          direction="row"
          className="relative"
          style={{ overflow: "hidden" }}
        >
          <Editor
            style={{
              minWidth: editorWidth ?? "50%",
              width: editorWidth ?? "50%",
              maxWidth: editorWidth ?? "50%",
            }}
          />
          <div
            ref={resizeRef}
            className="w-2 h-full bg-gray-400 cursor-ew-resize"
            onMouseDown={() => setGrabbing(true)}
          />
          <Preview />
        </Flex>
      </Flex>
    </CodeContextProvider>
  );
}
