import React from "react";
import { Flex } from "../layout/Flex";
import { Icon } from "../icon/Icon";

export interface DarkModeSwitchProps {
  isDarkMode: boolean;
  setDarkMode: (b: boolean) => void;
  showLabels?: boolean;
}

export function DarkModeSwitch({
  isDarkMode,
  setDarkMode,
}: DarkModeSwitchProps) {
  return (
    // Container
    <Flex
      direction="row"
      justify="center"
      align="center"
      onClick={() => setDarkMode(!isDarkMode)}
      className={`transition-all duration-150 relative w-16 p-2 h-8 bg-${isDarkMode ? "black" : "white"} border border-${isDarkMode ? "gray-700" : "gray-200"} rounded-full cursor-pointer`}
    >
      {/* Ball */}
      <Flex
        className={`transition-all duration-150 absolute w-6 h-6 bg-indigo-600 rounded-full z-10`}
        style={{
          left: isDarkMode ? "calc(100% - 4px)" : 4,
          translate: isDarkMode ? "-100%" : 0,
          // right: isDarkMode ? 4 : "auto",
        }}
      ></Flex>

      {/* Light Mode Icon */}
      <Icon
        name="LIGHT_MODE"
        size={14}
        color={isDarkMode ? "gray-400" : "gray-200"}
        weight={300}
        className={`absolute left-[9px] z-20`}
      />

      {/* Dark Mode Icon */}
      <Icon
        name="DARK_MODE"
        size={14}
        color={isDarkMode ? "gray-200" : "gray-300"}
        weight={300}
        className={`absolute right-[9px] z-20`}
      />
    </Flex>
  );
}
