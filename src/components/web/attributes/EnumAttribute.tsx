"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { Flex } from "../layout/Flex";
import { Text } from "../display/Text";
import {
  AttributeProps,
  AttributeWidth,
  WidthProvider,
} from "./CustomAttribute";
import { Icon } from "../icon/Icon";
import clsx from "clsx";
import { TailwindTextAlign } from "../core/Text";
import { useAccent } from "api/hooks/useAccent";
import { Touchable } from "../feedback/Touchable";
export type EnumLabel = string;
export type EnumID = string;

/**
 * A tuple representing an enum item, where:
 * - The first element is the display label.
 * - The second element is the actual value.
 */
export type EnumRecord = [label: EnumLabel, id: EnumID];

export type EnumViewStyle = "default" | "fill";

/**
 * Props for the `EnumAttribute` component.
 */
export interface EnumAttributeProps extends AttributeProps<EnumID> {
  /**
   * A list of available enum items (each item is a [label, value] tuple).
   */
  items: EnumRecord[];

  /**
   * Width size (small, medium, large, or a custom value) for the dropdown container.
   */
  width?: AttributeWidth;

  /**
   * Optionally override the default render method for each item in the list.
   * Should be a functional component receiving the item and its index.
   */
  renderItem?: FC<{
    item: EnumRecord;
    index: number;
  }>;

  /**
   * Maximum height (in pixels) for the dropdown list before it scrolls.
   * Defaults to `200`.
   */
  maxHeight?: number;

  viewStyle?: EnumViewStyle;

  textAlign?: "left" | "center" | "right" | "justify";
}

/**
 * A dropdown component for rendering a list of enum items.
 *
 * @remarks
 * - Renders the currently selected value as a label.
 * - Expands into a list on click (unless disabled).
 * - Collapses on outside click or ESC key.
 * - Collapses automatically when `disabled` changes to `true`.
 */
export function EnumAttribute({
  items = [],
  width = "medium",
  value,
  setValue,
  disabled = false,
  readOnly = false,
  maxHeight = 200,
  viewStyle = "default",
  textAlign = "left",
  renderItem: RenderItem = ({ item, index }) => (
    <Text key={index} textColor={null} fontSize="md">
      {item[0]}
    </Text>
  ),
}: EnumAttributeProps) {
  const accentColor = useAccent();
  // State & reference definitions
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Collapse dropdown on outside click or `ESC` key press.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (
        target !== containerRef.current &&
        !containerRef.current?.contains(target)
      ) {
        setExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    window.document.addEventListener("mousedown", handleClickOutside);
    window.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.removeEventListener("mousedown", handleClickOutside);
      window.document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Collapse dropdown when disabled changes to `true`.
  useEffect(() => {
    if (disabled || readOnly) {
      setExpanded(false);
    }
  }, [disabled, readOnly]);

  return (
    <WidthProvider width={width}>
      <Flex className="relative select-none w-full" ref={containerRef}>
        {/* Primary display (selected item) */}
        <Touchable animation="scale" scaleFactor="0.99">
          <Flex
            className={`relative border border-gray-200 rounded-lg py-2 px-4  ${
              disabled ? "bg-gray-100" : " bg-white"
            } shadow-sm rounded-lg`}
            style={{
              cursor: disabled || readOnly ? "not-allowed" : "pointer",
              display: viewStyle === "default" ? "flex" : "none",
            }}
            onClick={() => {
              if (!disabled && !readOnly) {
                setExpanded(!expanded);
              }
            }}
          >
            <RenderItem
              item={items.find((item) => item[1] === value) as EnumRecord}
              index={-1}
            />
            <Flex
              className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1"
              align="center"
              justify="center"
            >
              <Icon name={expanded ? "unfold_less" : "unfold_more"} size={16} />
            </Flex>
          </Flex>
        </Touchable>

        {/* Dropdown list of items */}
        <Flex
          className={clsx(
            `${viewStyle === "default" ? "absolute" : ""} transition-all duration-150 border border-gray-200 w-full rounded-lg top-full p-1 bg-white z-30`,
          )}
          gap={1}
          direction={viewStyle === "default" ? "column" : "row"}
          style={
            viewStyle === "default"
              ? {
                  opacity: expanded ? 1 : 0,
                  pointerEvents: expanded ? "auto" : "none",
                  transform: `translateY(${expanded ? 4 : 0}px)`,
                  maxHeight: maxHeight,
                  overflowY: "auto",
                }
              : {}
          }
        >
          {items.map((item, i) => (
            <Touchable
              key={i}
              animation="scale"
              scaleFactor={viewStyle === "default" ? "0.99" : "0.95"}
            >
              <Flex
                grow
                onClick={() => {
                  if (!disabled) {
                    setValue(item[1]);
                    setExpanded(false);
                  }
                }}
                className={`${item[1] === value ? "bg-" + accentColor + "-500 text-white" : ""} hover:${
                  item[1] === value
                    ? "bg-" + accentColor + "-300"
                    : "bg-" + accentColor + "-50"
                } active:${item[1] === value ? "bg-" + accentColor + "-500" : "bg-" + accentColor + "-100"} rounded-lg px-2 py-2 cursor-pointer ${("text-" + (textAlign ?? "left")) as TailwindTextAlign}`}
              >
                <RenderItem item={item} index={i} />
              </Flex>
            </Touchable>
          ))}
        </Flex>
      </Flex>
    </WidthProvider>
  );
}
