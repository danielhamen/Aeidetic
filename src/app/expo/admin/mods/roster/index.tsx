import { Flex, H3 } from "api/components/web";
import { ModuleExport } from "../Module";

const Main = () => {
  return (
    <Flex>
      <table>
        <thead>
          <tr>
            <th>Contes</th>
          </tr>
        </thead>
      </table>
    </Flex>
  );
};

const Export: ModuleExport = {
  id: "roster",
  slug: "roster",
  name: "Roster",
  icon: "edit_note",
  main: Main,
};

export default Export;
