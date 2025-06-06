import React from "react";
import { Flex } from "api/components/web";
import { LayoutHandler } from "./lib/components/LayoutHandler";
import { Header } from "./lib/components/Header";

export default function Page() {
  return (
    <Flex grow className={`overflow-hidden`}>
      <Header />
      <Flex grow className={`bg-gray-50 overflow-hidden`}>
        <LayoutHandler />
      </Flex>
    </Flex>
  );
}
