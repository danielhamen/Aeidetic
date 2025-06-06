"use client";
import { TailwindColorName } from "api/components/web/core/Text";
import { createContext, useContext, useMemo } from "react";
import { usePath } from "./usePath";

export type AccentColor = TailwindColorName;

export const AccentContext = createContext<AccentColor | null>(null);

export const AccentProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePath();

  const accent = useMemo<AccentColor>(() => {
    if (pathname) {
      const path = pathname.split("/").filter((s) => s.trim() !== "");
      if (path.length > 0) {
        switch (path[0]) {
          case "lexos":
            return "slate";
          case "lexicon":
            return "amber";
          case "learn":
            return "indigo";
          case "mark":
            return "red";
          default:
            return "blue";
        }
      }
    }
    return "blue";
  }, [pathname]);

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
