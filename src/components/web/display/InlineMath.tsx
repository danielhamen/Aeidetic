// components/InlineMath.tsx
"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] },
};

export function InlineMath({ tex }: { tex: string }) {
  return (
    <MathJaxContext config={config}>
      <MathJax inline dynamic>
        {"\\(" + tex + "\\)"}
      </MathJax>
    </MathJaxContext>
  );
}

export function Math({ tex }: { tex: string }) {
  return <InlineMath tex={tex} />;
}
