import React from "react";

export function useBounds(ref: React.RefObject<HTMLElement | null>) {
  const [bounds, setBounds] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateBounds = () => setBounds(element.getBoundingClientRect());
    updateBounds();

    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [ref]);

  return bounds;
}
