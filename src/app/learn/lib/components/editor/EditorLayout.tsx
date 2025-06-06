import React, { useState, useEffect, useRef } from "react";
import { Flex, Text, Icon, Touchable } from "api/components/web";

function Header() {
  return <Flex></Flex>;
}

function OutlineLabel({ label }: { label: string | null }) {
  const textRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>(label);
  return (
    <Flex
      className="w-full p-1 border-b border-gray-200 bg-gray-100 select-none"
      direction="row"
      align="center"
    >
      {label && (
        <Text fontFamily="mono" ref={textRef}>
          {value}
        </Text>
      )}
      <Flex direction="row" gap={2} className="ml-auto">
        <Touchable
          animation={["scale", "opacity"]}
          className="cursor-pointer"
          scaleFactor={"0.90"}
          onClick={() => {
            const newValue = prompt(
              "Enter a new pathname for this route (you do not need to include '/')",
            );
            if (newValue && newValue.startsWith("/")) {
              setValue(newValue);
            } else {
              alert("Invalid pathname");
            }
          }}
        >
          <Icon name="text_select_start" size={16} color="gray-800" />
        </Touchable>
        <Touchable
          animation={["scale", "opacity"]}
          className="cursor-pointer"
          scaleFactor={"0.90"}
        >
          <Icon name="visibility" size={16} color="gray-800" />
        </Touchable>
        <Touchable
          animation={["scale", "opacity"]}
          className="cursor-pointer"
          scaleFactor={"0.90"}
        >
          <Icon name="add" size={16} color="gray-800" />
        </Touchable>
      </Flex>
    </Flex>
  );
}

function ContentOutline() {
  return (
    <Flex
      direction="row"
      className="h-full w-96 border-r border-gray-100 bg-gray-50"
    >
      <Flex direction="column" grow className="border border-gray-200">
        <OutlineLabel label="/cs" />
        <OutlineLabel label="/mathematics" />
        <OutlineLabel label="/physics" />
        <OutlineLabel label="/biology" />
        <OutlineLabel label="/chemistry" />
      </Flex>
    </Flex>
  );
}

function LessonEditor() {
  return <Flex></Flex>;
}

function MainContent() {
  return (
    <Flex grow className="bg-white">
      <LessonEditor />
    </Flex>
  );
}

export function EditorLayout() {
  return (
    <Flex grow>
      <Header />
      <Flex direction="row" grow>
        <ContentOutline />
        <MainContent />
      </Flex>
    </Flex>
  );
}
