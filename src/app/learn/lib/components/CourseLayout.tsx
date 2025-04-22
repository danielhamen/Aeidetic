import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Flex, H3, P, Text } from "api/components/web";
import {
  Course,
  isCourse,
  isModule,
  isResourceId,
  isTopic,
  isUnit,
  Module,
  rURI,
  Topic,
  Unit,
} from "../types";
import {
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarSubItem,
  SidebarTitle,
  SidebarView,
} from "./Sidebar";
import { usePath } from "api/hooks/usePath";
import { CourseView } from "./CourseView";
import { ModuleView } from "./ModuleView";
import { TopicView } from "./TopicView";
import { UnitView } from "./UnitView";
import { fetchModule, fetchTopic, fetchUnit } from "./LayoutHandler";

export function toRoman(num: number): string {
  if (num < 1 || num > 100) throw new Error("Only supports 1 to 100");

  const romanMap: [number, string][] = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

export function CourseLayout({
  course,
  basePath,
}: {
  course: Course;
  basePath: string | null;
}) {
  const pathname = usePath();
  const [adContent, setAdContent] = useState<ReactNode | null>(null);
  useEffect(() => {
    setAdContent(null);
  }, []);
  const [asideWidth, setAsideWidth] = useState<number>(256);
  const [content, setContent] = useState<Course | Unit | Module | Topic | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [layout, setLayout] = useState<ReactNode | null>(null);

  const asyncSetUnitFromUrl = useCallback(async () => {
    if (!pathname || !basePath) {
      setLayout(null);
      setContent(null);
      return;
    }

    const trail = pathname.split("/").slice(basePath.split("/").length + 1);

    // Show course home
    if (trail.length === 0) {
      setContent(course);
      return;
    }

    // Show unit home
    const unitUri = trail[0];
    const unit: Unit | undefined = course.outline.find(
      (unit: Unit) => rURI(unit.id) === unitUri,
    );
    if (!unit) {
      setError("Invalid unit ID");
      return;
    }
    if (trail.length === 1) {
      setContent(unit);
      return;
    }

    // Show module home
    const modUri = trail[1];
    const mod: Module | undefined = unit.modules.find(
      (module: Module) => rURI(module.id) === modUri,
    );
    if (!mod) {
      setError("Invalid module ID");
      return;
    }
    if (trail.length === 2) {
      setContent(mod);
      return;
    }

    // Show topic home
    const topicUri = trail[2];
    const topic: Topic | undefined = mod.topics.find(
      (topic: Topic) => rURI(topic.id) === topicUri,
    );
    if (!topic) {
      setError("Invalid topic ID");
      return;
    }
    if (trail.length === 3) {
      setContent(topic);
      return;
    }

    // Show error
    else {
      setContent(null);
      return;
    }
  }, [basePath, course, pathname]);

  useEffect(() => {
    asyncSetUnitFromUrl();
  }, [pathname, basePath, course, asyncSetUnitFromUrl]);

  // Set `layout` based on `content`
  useEffect(() => {
    if (!content) return;

    if (isCourse(content)) {
      setLayout(<CourseView course={content} />);
    } else if (isModule(content)) {
      setLayout(<ModuleView module={content} />);
    } else if (isTopic(content)) {
      setLayout(<TopicView topic={content} />);
    } else if (isUnit(content)) {
      setLayout(<UnitView unit={content} />);
    } else {
      setError("Route 404.");
    }
  }, [content]);

  if (!basePath) {
    return null;
  }

  return (
    <Flex grow className="overflow-y-hidden">
      {error ? (
        <P>Error {error}</P>
      ) : (
        <Flex direction="row" grow className={` overflow-y-hidden`}>
          <SidebarView>
            <SidebarTitle
              title={course.title}
              code={course.code}
              icon="function"
              href={`/${basePath}`}
            />
            <SidebarContent>
              {course.outline.map((unit, idx) => {
                const selected = isUnit(content) && content.id === unit.id;
                const unitUrl = `/${basePath}/${unit.id.split("/").at(-1)}`;
                const unitPrefix = `${idx + 1 < 100 ? toRoman(idx + 1) : idx + 1}`;
                return (
                  <SidebarGroup
                    title={`${unitPrefix}. ${unit.name}`}
                    key={idx}
                    selected={selected}
                    href={unitUrl}
                  >
                    {unit.modules.map((module, _idx) => {
                      const moduleUrl = `${unitUrl}/${module.id.split("/").at(-1)}`;
                      const selected =
                        isModule(content) && content.id === module.id;
                      const modulePrefix = `${unitPrefix}.${_idx + 1 < 100 ? toRoman(_idx + 1) : _idx + 1}`;
                      return (
                        <SidebarItem
                          alwaysShowChildren={true}
                          title={`${modulePrefix}. ${module.name}`}
                          key={_idx}
                          selected={selected}
                          href={moduleUrl}
                        >
                          {/* {module?.topics?.map((topic, __idx) => {
                            const selected =
                              isTopic(content) && content.id === topic.id;
                            return (
                              <SidebarSubItem
                                key={__idx}
                                selected={selected}
                                href=""
                              >
                                <Text>{topic.name}</Text>
                              </SidebarSubItem>
                            );
                          })} */}
                        </SidebarItem>
                      );
                    })}
                  </SidebarGroup>
                );
              })}
            </SidebarContent>
          </SidebarView>
          <Flex grow direction="row" className="overflow-y-scroll bg-white">
            <Flex grow className={`p-8 bg-white w-full h-fit`}>
              {layout}
            </Flex>
            <Flex
              className={`h-full border-l border-gray-100 sticky right-0 top-0 bg-white p-2`}
              style={{
                minWidth: asideWidth,
                width: asideWidth,
                maxWidth: asideWidth,
              }}
            >
              {adContent}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
