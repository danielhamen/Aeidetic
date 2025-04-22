import { Flex, C1, C3, Icon, P } from "api/components/web";
import React, { ReactNode, useState } from "react";

// ───────────────────────────────
// Sidebar Components (SidebarView)
// ───────────────────────────────

export function SidebarTitle({
  title,
  code,
  icon,
  href,
}: {
  title: string;
  code: string;
  icon: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="cursor-pointer *:select-none shadow-sm hover:shadow-md transition-all duration-150 rounded-xl active:scale-[0.98]"
    >
      <Flex
        direction="row"
        className="bg-blue-50 py-8 px-6 rounded-xl hover:bg-blue-100"
        align="center"
        gap={4}
      >
        <Icon name={icon} size={24} />
        <Flex>
          <C3>{code}</C3>
          <C1>{title}</C1>
        </Flex>
      </Flex>
    </a>
  );
}

export function SidebarSubItem({
  children,
  selected,
  href,
}: {
  children: ReactNode;
  selected: boolean;
  href: string;
}) {
  return (
    <a href={href}>
      <Flex
        className={`p-1 ${
          selected ? "bg-indigo-100" : ""
        } rounded-xl cursor-pointer select-none ml-12 px-2 border-l border-gray-50 hover:bg-indigo-100`}
      >
        {children}
      </Flex>
    </a>
  );
}

export function SidebarItem({
  title,
  selected,
  href,
  alwaysShowChildren = false,
  children,
}: {
  title: string;
  selected: boolean;
  href: string;
  children?: ReactNode;
  alwaysShowChildren?: boolean;
}) {
  return (
    <Flex>
      <a href={href}>
        <Flex
          className={`p-1 ${
            selected ? "bg-indigo-100" : ""
          } rounded-xl cursor-pointer select-none pl-8 transition-all duration-150 hover:bg-indigo-100 active:scale-[0.98]`}
        >
          <P>{title}</P>
        </Flex>
      </a>
      <Flex className={`${selected || alwaysShowChildren ? "" : "hidden"}`}>
        {children}
      </Flex>
    </Flex>
  );
}

export function SidebarGroup({
  selected,
  title,
  href,
  children,
}: {
  selected: boolean;
  title: string;
  href: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <Flex className="p-1 gap-2 bg-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-150">
      <Flex direction="row" align="center">
        <a href={href} className="flex-grow">
          <Flex
            direction="row"
            align="center"
            grow
            className={`select-none cursor-pointer p-1 pl-4 ${
              selected ? "bg-indigo-100" : ""
            } rounded-xl hover:bg-indigo-100 active:scale-[.98]`}
          >
            <P>{title}</P>
          </Flex>
        </a>
        <Flex className="p-2 cursor-pointer" onClick={() => setOpen(!open)}>
          <Icon
            name="chevron_right"
            size={12}
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </Flex>
      </Flex>
      <Flex gap={2} className={`${open ? "" : "hidden"}`}>
        {children}
      </Flex>
    </Flex>
  );
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return (
    <Flex grow className="overflow-y-scroll">
      <Flex className="gap-4">{children}</Flex>
    </Flex>
  );
}

export function SidebarView({ children }: { children: ReactNode }) {
  return (
    <Flex
      direction="column"
      grow
      className="w-96 min-w-96 max-w-96 border-r border-gray-200 h-full p-4 bg-gray-50 gap-4 overflow-y-scroll"
    >
      {children}
    </Flex>
  );
}
