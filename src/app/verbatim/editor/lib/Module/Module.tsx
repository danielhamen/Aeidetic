import { LayoutNode } from "../Types/LayoutNode";
import { InlineNode } from "../Types/InlineNode";
import { ModulePermission } from "./ModulePermission";

export interface Module {
  id: string;
  name: string;
  desc?: string;
  author?: string;
  permissions: ModulePermission[];
  registrations: (LayoutNode | InlineNode)[];
}
