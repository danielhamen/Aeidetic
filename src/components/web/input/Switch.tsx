import React, { useEffect, useState } from "react";
import { Flex } from "./../layout/Flex";
import { Icon, IconList } from "../icon/Icon";

export interface SwitchProps {
  toggled: boolean;
  setToggled: (b: boolean) => void;
  disabled?: boolean;
  icon?: keyof typeof IconList;
}

export function Switch({
  toggled,
  setToggled,
  disabled = false,
  icon = "CHECKMARK",
}: SwitchProps) {
  const [foreground, setForeground] = useState<string | undefined>(undefined);
  const [background, setBackground] = useState<string | undefined>(undefined);
  // const [iconScale, setIconScale] = useState<number | undefined>(undefined);
  // const [scale, setScale] = useState<number | undefined>(undefined);
  // const [border, setBorder] = useState<string | undefined>(undefined);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (disabled) {
      setCursor("not-allowed");
    } else {
      setCursor("pointer");
    }

    if (toggled) {
      setForeground("gray-100");
      setBackground("blue-500");
      // setBorder("gray-600");
    } else {
      setForeground("red-800");
      setBackground("gray-50");
      // setBorder("gray-300");
    }
  }, [toggled, disabled]);
  return (
    <Flex
      className={`w-6 h-6 m-1 border rounded-md border-gray-300 transition duration-150 bg-${background} cursor-${cursor} opacity-${disabled ? "75" : "100"}`}
      align="center"
      justify="center"
      onClick={() => !disabled && setToggled(!toggled)}
    >
      <Icon name={icon} size={18} color={foreground} />
    </Flex>
  );
}
