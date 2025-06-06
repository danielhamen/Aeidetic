import React from "react";
import { Flex, H1, H4 } from "api/components/web";

function HeroSection() {
  return (
    <Flex
      className="w-full h-screen p-2 lg:p-32 md:p-16"
      align="center"
      justify="center"
    >
      <Flex direction="row">
        <Flex className="">
          <H1>Welcome to Learn!</H1>
          <H4>Your Platform to Master Any Skill!</H4>
        </Flex>
        <Flex className="w-64 h-32 bg-red-400"></Flex>
      </Flex>
    </Flex>
  );
}

export function LearnHome() {
  return (
    <Flex grow className="overflow-y-scroll">
      <HeroSection />
    </Flex>
  );
}
