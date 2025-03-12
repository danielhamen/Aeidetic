"use client";
import {
  EnumAttribute,
  EnumRecord,
} from "api/components/attributes/EnumAttribute";
import { Flex } from "api/components/layout/Flex";
import React, { useState } from "react";

export default function Page() {
  const enumOptions: EnumRecord[] = [
    ["OP1", "Option 1"],
    ["OP2", "Option 2"],
    ["OP3", "Option 3"],
    ["OP4", "Option 4"],
    ["OP5", "Option 5"],
    ["OP6", "Option 6"],
    ["OP7", "Option 7"],
    ["OP8", "Option 8"],
  ];
  const [value, setValue] = useState<EnumRecord>(enumOptions[0]);
  return (
    <Flex grow className="p-32">
      <EnumAttribute
        value={value}
        setValue={setValue}
        disabled={true}
        readOnly={false}
        items={enumOptions}
      />
    </Flex>
  );
}
