import React from "react";
import { Quiz } from "../types";
import { Flex, Text } from "api/components/web";

export function QuizView({ quiz }: { quiz: Quiz }) {
  return (
    <Flex>
      Quiz <Text>{quiz.name}</Text>
    </Flex>
  );
}
