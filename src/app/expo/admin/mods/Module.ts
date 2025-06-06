import { ExpoProject } from "api/lib/lib/Common";
import { ReactNode } from "react";

export interface ModuleContext {
  project: ExpoProject;
}

export interface ModuleExport {
  id: string;
  name: string;
  icon: string;
  slug: string;
  title?: string;
  main: (context: ModuleContext) => ReactNode;
}
