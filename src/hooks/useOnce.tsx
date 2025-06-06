import React, { useEffect, EffectCallback, DependencyList } from "react";

export function useOnce(effect: EffectCallback, deps?: DependencyList) {
  const called = React.useRef(false);
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    return effect();
  }, deps);
}
