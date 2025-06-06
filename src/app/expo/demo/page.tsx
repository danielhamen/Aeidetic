import { Flex, H3 } from "api/components/web";
import { Header } from "../page";
import React from "react";

export default function Page() {
  return (
    <Flex grow className="h-screen">
      <Header />
      <Flex className="w-full h-full p-8">
        <Flex
          className="w-full h-full rounded-xl bg-gray-100 shadow-sm border-gray-50"
          align="center"
          justify="center"
        >
          <H3>Demonstration video coming soon!</H3>
        </Flex>
      </Flex>
    </Flex>
  );
}
