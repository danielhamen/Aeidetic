import { VCursor } from "./../Types/VCursor";
import React from "react";

export function UICursor({ cursor }: { cursor: VCursor }) {
  return (
    <div style={{ position: "absolute", left: `${cursor * 10}px` }}>|</div>
  );
}
