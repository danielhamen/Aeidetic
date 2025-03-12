import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Flex } from "../layout/Flex";
import { Text } from "../display/Text";
import {
  AttributeProps,
  AttributeWidth,
  WidthProvider,
} from "./CustomAttribute";
import { Icon } from "../icon/Icon";

export type EnumRecord = [string, string];

export interface EnumAttributeProps extends AttributeProps<EnumRecord> {
  items: EnumRecord[];
  width?: AttributeWidth;
  renderItem?: FC<{
    item: EnumRecord;
    index: number;
  }>;
  maxHeight?: number;
}

export function EnumAttribute({
  items = [],
  width = "medium",
  value,
  setValue,
  disabled = false,
  readOnly = false,
  maxHeight = 200,
  renderItem: RenderItem = ({ item, index }) => (
    <Text key={index}>{item[0]}</Text>
  ),
}: EnumAttributeProps) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Collapse when click out
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (
        target !== containerRef.current &&
        !containerRef?.current?.contains(target)
      )
        setExpanded(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    window?.document?.addEventListener("mousedown", handleClickOutside);
    window?.document?.addEventListener("keydown", handleKeyDown);
    return () => {
      window?.document?.removeEventListener("mousedown", handleClickOutside);
      window?.document?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Collapse when disabled
  useEffect(() => {
    if (disabled) setExpanded(false);
  }, [disabled]);

  return (
    <WidthProvider width={width}>
      <Flex className="relative select-none" ref={containerRef}>
        {/* Container */}
        <Flex
          className={`border border-gray-200 rounded-md p-1 ${disabled ? "bg-gray-100" : ""}`}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onClick={() => !disabled && setExpanded(!expanded)}
        >
          <RenderItem item={value} index={-1} />

          <Flex
            className="absolute right-0 top-1/2 -translate-y-1/4 -translate-x-1"
            align="center"
            justify="center"
          >
            <Icon name={expanded ? "unfold_less" : "unfold_more"} size={16} />
          </Flex>
        </Flex>

        {/* Items */}
        <Flex
          className="absolute transition-all duration-150 border border-gray-200 w-full rounded-lg top-full p-1"
          gap={4}
          style={{
            opacity: expanded ? 1 : 0,
            pointerEvents: expanded ? "auto" : "none",
            transform: `translateY(${expanded ? 4 : 0}px)`,
            maxHeight: maxHeight,
            overflowY: "auto",
          }}
        >
          {items.map((item, i) => (
            <Flex
              key={i}
              grow
              onClick={() =>
                !disabled &&
                (() => {
                  setValue(item);
                  setExpanded(false);
                })()
              }
              className={`${item[0] === value[0] ? "bg-blue-200" : ""} hover:${item[0] === value[0] ? "bg-blue-200" : "bg-blue-50"} active:bg-blue-100 rounded-md pl-1 cursor-pointer`}
            >
              <RenderItem item={item} index={i} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </WidthProvider>
  );
}
