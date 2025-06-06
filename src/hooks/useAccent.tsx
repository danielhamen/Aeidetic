"use client";
import { TailwindColorName } from "api/components/web/core/Text";
import { createContext, useContext, useEffect, useState } from "react";
import { usePath } from "./usePath";

export type AccentColor = TailwindColorName;

export const AccentContext = createContext<AccentColor | null>(null);

export const AccentProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePath();
  const [accent, setAccent] = useState<AccentColor>("blue");
  useEffect(() => {
    if (pathname) {
      const path = pathname.split("/").filter((s) => s.trim() !== "");
      if (path.length > 0) {
        switch (path[0]) {
          case "lexos":
            setAccent("slate");
            break;
          case "lexicon":
            setAccent("amber");
            break;
          case "learn":
            setAccent("indigo");
            break;
          case "mark":
            setAccent("red");
            break;
          default:
            setAccent("blue");
        }
      }
    }
  }, [accent, pathname]);

  return (
    <AccentContext.Provider value={accent}>{children}</AccentContext.Provider>
  );
};

export const useAccent = () => {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error("useAccent must be used within an AccentProvider");
  }
  return context;
};
