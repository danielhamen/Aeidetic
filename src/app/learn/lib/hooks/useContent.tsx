import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { ResourceFile, Router } from "../types";

export interface ContentManager {
  resourceFiles: ResourceFile[];
  getRouter(): Router;
}

export const ContentManagerContext = createContext<ContentManager | null>(null);

export function ContentManagerProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentManager | null>(null);

  useEffect(() => {
    if (!content) {
      const resourceFiles: ResourceFile[] = [];
    }
  }, [content]);

  return (
    <ContentManagerContext.Provider value={content}>
      {children}
    </ContentManagerContext.Provider>
  );
}

export function useContent(): ContentManager {
  const contentManager = useContext(ContentManagerContext);

  if (!contentManager) {
    throw new Error("useContent must be used within a ContentManagerProvider");
  }

  return contentManager;
}
