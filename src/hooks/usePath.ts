import { useState, useEffect } from "react";

export function usePath() {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return path;
}
