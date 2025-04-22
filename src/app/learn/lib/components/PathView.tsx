import { Flex, Divider, Icon, C2 } from "@aeidetic/ui";
import React from "react";

export interface PathViewProps {
  path: { title: string; link?: string }[];
}

export function PathView({ path }: PathViewProps) {
  return (
    <Flex
      direction="row"
      className="w-full p-2 border-y border-gray-100 gap-2"
      align="center"
    >
      <Icon name="conversion_path" size={16} />
      <Divider vertical />
      {path.map((slug, index) => {
        return (
          <Flex direction="row" key={index} style={{ gap: 8 }}>
            <a href={slug.link || "/"}>
              <Flex className="select-none cursor-pointer">
                <C2 className="select-none cursor-pointer">{slug.title}</C2>
              </Flex>
            </a>
            <C2 className="select-none">
              {index === path.length - 1 ? "" : "»"}
            </C2>
          </Flex>
        );
      })}
    </Flex>
  );
}
