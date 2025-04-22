import React from "react";
import { Module, Unit } from "../types";
import { Divider, Flex, H1, H3, P } from "api/components/web";

export function ModuleCard({
  module,
  index,
}: {
  module: Module;
  index?: number;
}) {
  return (
    <Flex className={`w-full p-2 border border-gray-100 rounded-lg`}>
      <H3 className="text-lg">
        {index !== undefined && `Module ${index}: `}
        {module.name}
      </H3>
      <Flex direction="row">
        {module?.topics?.map((topic, _idx) => {
          return (
            <Flex key={_idx} className="flex-1/2 p-1">
              <P>{topic.name}</P>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export function UnitView({ unit }: { unit: Unit }) {
  if (!unit) return null;
  return (
    <Flex>
      <H1>Unit: {unit.name}</H1>
      {unit.description && <P>{unit.description}</P>}
      <Divider />
      <Flex className="gap-4 my-4">
        {unit.modules.map((mod, idx) => {
          return <ModuleCard key={idx} module={mod} index={idx + 1} />;
        })}
      </Flex>
    </Flex>
  );
}
