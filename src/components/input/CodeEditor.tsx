import React from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <MonacoEditor
      height="500px"
      language="javascript" // Change this dynamically (e.g., "python", "latex")
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        multiCursorModifier: "ctrlCmd",
        minimap: { enabled: true },
      }}
    />
  );
};

export default CodeEditor;
