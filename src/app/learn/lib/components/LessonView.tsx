import React from "react";
import { estimateReadTimeForLesson, Lesson } from "../types";
import { Flex, Text } from "api/components/web";
import { parseLesson, Section, Title, Divider, I, P } from "./ui/xmlParser";

export function Tag({
  text,
  color = "blue",
}: {
  text: string;
  color: "blue" | "green" | "red";
}) {
  return (
    <Flex className={`bg-${color}-100 rounded-full py-[2] px-2`}>
      <Text
        textColor={`${color}-600`}
        fontFamily="caption"
        fontWeight="600"
        fontSize={15}
      >
        {text}
      </Text>
    </Flex>
  );
}

export function LessonView({ lesson }: { lesson: Lesson }) {
  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  };
  return (
    <Flex>
      <Section props={{}}>
        <Title props={{}}>{lesson.name}</Title>
        <Flex direction="row" align="center" gap={2}>
          <Tag
            text={toTitleCase(lesson.visibility || "public")}
            color="green"
          />
          <Tag text={toTitleCase(lesson.type)} color="blue" />
          <Tag
            text={`~ ${parseFloat(estimateReadTimeForLesson(lesson).toFixed(1))} mins`}
            color="green"
          />
        </Flex>
        <Flex className="border-l-2 pl-4 border-indigo-600 mt-2">
          <Text>
            {lesson.description || (
              <I props={{}}>No description provided for this content.</I>
            )}
          </Text>
        </Flex>
      </Section>
      <Divider />
      {parseLesson(lesson.content)}
    </Flex>
  );
}
