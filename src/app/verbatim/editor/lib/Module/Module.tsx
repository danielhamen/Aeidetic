import { LayoutNode } from "../Types/LayoutNode";
import { LexemeNode } from "../Types/LexemeNode";
import { ModulePermission } from "./ModulePermission";

export interface Module {
  id: string;
  name: string;
  desc?: string;
  author?: string;
  permissions: ModulePermission[];
  registrations: (LayoutNode | LexemeNode)[];
}
