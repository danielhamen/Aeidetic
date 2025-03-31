import { VCursor } from "./../Types/VCursor";
import React from "react";

export function UICursor({}: { cursor: VCursor }) {
  return <div style={{ position: "absolute", left: `${10}px` }}>|</div>;
}
