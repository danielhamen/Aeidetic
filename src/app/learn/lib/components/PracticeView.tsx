import React from "react";
import { Practice } from "../types";
import { Flex, Text } from "api/components/web";

export function PracticeView({ practice }: { practice: Practice }) {
  return (
    <Flex>
      Practice <Text>{practice.name}</Text>
    </Flex>
  );
}
