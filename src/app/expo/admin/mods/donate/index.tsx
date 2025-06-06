import { Flex } from "api/components/web";
import { ModuleExport } from "../Module";

const Export: ModuleExport = {
  id: "donate",
  slug: "donations",
  name: "Donations",
  icon: "volunteer_activism",
  main: (context) => <Flex>{context.project.projectId}</Flex>,
};

export default Export;
