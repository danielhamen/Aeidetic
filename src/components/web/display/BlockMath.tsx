"use client";
import { MathJaxContext, MathJax } from "better-react-mathjax";

export function BlockMath({ math }: { math: string }) {
  return (
    <MathJaxContext
      config={{ loader: { load: ["input/tex", "output/chtml"] } }}
    >
      <MathJax inline={false}>{math}</MathJax>
    </MathJaxContext>
  );
}
