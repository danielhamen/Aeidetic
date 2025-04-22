"use client";
import { Flex, P } from "api/components/web";
import { usePath } from "api/hooks/usePath";
import React, { ReactNode, useState, useEffect, useCallback } from "react";
import {
  Course,
  CourseCode,
  isCourse,
  isCourseCode,
  isLanding,
  isLandingSection,
  isLesson,
  isModule,
  isPractice,
  isQuiz,
  isResource,
  isResourceId,
  isResourcePreface,
  isRoute,
  isRouter,
  isTopicType,
  isUnit,
  LandingSection,
  Lesson,
  Module,
  Resource,
  ResourceFile,
  ResourceId,
  Route,
  Router,
  Topic,
  TopicType,
  Unit,
} from "../types";
import { LandingView } from "./LandingView";
import { CourseLayout } from "./CourseLayout";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex grow className={`overflow-y-hidden`}>
      {children}
    </Flex>
  );
}

export async function fetchRouter(): Promise<Router> {
  const routerUrl = "/public/api/learn/content/router.json";
  const response = await fetch(routerUrl);
  const data = await response.json();
  if (!isRouter(data)) {
    throw new Error("Invalid JSON Schema for Router.");
  }
  return data;
}

export async function fetchTopic(rid: ResourceId): Promise<Topic> {
  const topicType = rid.split("/")[0];
  if (!isTopicType(topicType)) {
    throw new Error("Invalid Resource ID.");
  }

  switch (topicType) {
    case "lesson":
      const lessonUrl = `/public/api/learn/content/${rid}/index.json`;
      const contentUrl = `/public/api/learn/content/${rid}/content.xml`;

      const lessonResponse = await fetch(lessonUrl);
      const lessonData = await lessonResponse.json();
      const contentResponse = await fetch(contentUrl);
      const contentData = await contentResponse.text();

      const id = lessonData.id;
      if (!isResourceId(id)) {
        throw new Error("Invalid Resource ID.");
      }

      const type = lessonData.type;
      if (!isTopicType(type) || type !== "lesson") {
        throw new Error("Invalid Topic Type.");
      }

      const name = lessonData.name;
      if (!name || typeof name !== "string") {
        throw new Error("Invalid Topic Name.");
      }

      const description = lessonData.description || undefined;
      if (
        (!description || typeof description !== "string") &&
        description !== undefined
      ) {
        throw new Error("Invalid Topic Description.");
      }

      const parser = new DOMParser();
      const content = parser.parseFromString(contentData, "text/xml");

      const lesson = {
        id,
        type,
        name,
        description,
        content,
      };

      return lesson as Lesson;
    case "practice":
      break;
    case "quiz":
      break;
  }

  throw new Error(`Invalid JSON Schema for Topic: ${rid}`);
}

export async function fetchModule(rid: ResourceId): Promise<Module> {
  if (rid.split("/")[0] !== "module") {
    throw new Error("Invalid Resource ID.");
  }

  const unitUrl = `/public/api/learn/content/${rid}/index.json`;
  const response = await fetch(unitUrl);
  const data = await response.json();
  if (
    "id" in data &&
    isResourceId(data.id) &&
    "name" in data &&
    typeof data.name === "string" &&
    "description" in data &&
    typeof data.description === "string" &&
    "topics" in data &&
    Array.isArray(data.topics)
  ) {
    const id: ResourceId = data.id;
    const name: string = data.name;
    const description: string = data.description;
    const topics: Topic[] = await Promise.all(
      data.topics.map(async (topic: unknown): Promise<Topic> => {
        if (
          typeof topic === "object" &&
          topic !== null &&
          "type" in topic &&
          isTopicType(topic.type) &&
          "ref" in topic &&
          isResourceId(topic.ref)
        ) {
          return await fetchTopic(topic.ref);
        }
        throw new Error(
          `Invalid JSON Schema for Topic: ${JSON.stringify(topic)}`,
        );
      }),
    );

    return { id, name, description, topics };
  }

  throw new Error(`Invalid JSON Schema for Module: ${JSON.stringify(data)}`);
}

export async function fetchUnit(rid: ResourceId): Promise<Unit> {
  if (rid.split("/")[0] !== "unit") {
    throw new Error("Invalid Resource ID.");
  }

  const unitUrl = `/public/api/learn/content/${rid}/index.json`;
  const response = await fetch(unitUrl);
  const data = await response.json();
  if (
    "id" in data &&
    isResourceId(data.id) &&
    "title" in data &&
    typeof data.title === "string" &&
    "description" in data &&
    typeof data.description === "string" &&
    "modules" in data &&
    Array.isArray(data.modules)
  ) {
    const unitId: ResourceId = data.id;
    const title: string = data.title;
    const description: string = data.description;
    const uri: string = data.uri;
    const modules: Module[] = await Promise.all(
      data.modules.map(async (module: unknown): Promise<Module> => {
        if (
          typeof module === "object" &&
          module !== null &&
          "ref" in module &&
          isResourceId(module.ref)
        ) {
          return await fetchModule(module.ref);
        }
        throw new Error("Invalid JSON Schema for Module.");
      }),
    );

    return { id: unitId, name: title, description, uri, modules };
  }

  throw new Error(`Invalid JSON Schema for Unit: ${JSON.stringify(data)}`);
}

export async function getResourceFile(id: string): Promise<ResourceFile> {
  const resourcePath = `/public/api/learn/content/${id}/index.json`;
  if (!isResourceId(id)) {
    throw new Error("Invalid Resource ID.");
  }
  const resourceType = id.split("/")[0];
  if (!isResourcePreface(resourceType)) {
    throw new Error("Invalid Resource Type.");
  }
  const response = await fetch(resourcePath);
  const data = await response.json();
  if (!data || !isResource(data)) {
    throw new Error(
      `Invalid JSON Schema for Resource. Object does not conform to: ${resourceType}. Content: ${JSON.stringify(data)}`,
    );
  }
  return {
    id: id,
    path: resourcePath,
    content: data,
    type: resourceType,
  };
}

export function LayoutHandler() {
  const pathname = usePath();
  const [router, setRouter] = useState<Router | null>(null);
  const [layout, setLayout] = useState<ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [resourceUrl, setResourceUrl] = useState<string | null>(null);
  const [route, setRoute] = useState<Route | null>(null);

  const getLayoutFromResourceFile = useCallback(
    async (resFile: ResourceFile): Promise<ReactNode> => {
      const obj = resFile.content;
      if (obj.visibility !== "public" && obj.visibility !== undefined) {
        throw new Error(`Resource is not public`);
      }

      switch (resFile.type) {
        case "landing":
          if (
            "id" in obj &&
            isResourceId(obj.id) &&
            "title" in obj &&
            typeof obj.title === "string" &&
            "subtitle" in obj &&
            typeof obj.subtitle === "string" &&
            "sections" in obj &&
            Array.isArray(obj.sections)
          ) {
            const id: ResourceId = obj.id;
            const title: string = obj.title;
            const subtitle: string = obj.subtitle;
            const sections: LandingSection[] = await Promise.all(
              obj.sections.map(async (section): Promise<LandingSection> => {
                if ("ref" in section && typeof section.ref === "string") {
                  const ref: string = section.ref;
                  const refData = await getResourceFile(ref);

                  const title =
                    ("title" in refData &&
                      typeof refData.title === "string" &&
                      refData.title) ||
                    null;
                  const points =
                    ("points" in refData &&
                      Array.isArray(refData.points) &&
                      refData.points.every(
                        (point) => typeof point === "string",
                      )) ||
                    null;
                  const href =
                    ("href" in refData &&
                      typeof refData.href === "string" &&
                      refData.href) ||
                    null;

                  const landingSection: LandingSection = {
                    title: title,
                    points: points,
                    href: href,
                    ...section,
                  };

                  if (isLandingSection(landingSection)) {
                    return landingSection;
                  }

                  throw new Error("Invalid landing section");
                }

                throw new Error("Ref not included.");
              }),
            );

            return (
              <LandingView
                landing={{
                  id: id,
                  title: title,
                  subtitle: subtitle,
                  sections: sections,
                }}
              />
            );
          }
          break;
        case "course":
          if (
            "id" in obj &&
            isResourceId(obj.id) &&
            "code" in obj &&
            isCourseCode(obj.code) &&
            "title" in obj &&
            typeof obj.title === "string" &&
            "description" in obj &&
            typeof obj.description === "string" &&
            "highlights" in obj &&
            Array.isArray(obj.highlights) &&
            obj.highlights.every((p) => typeof p === "string") &&
            "prerequisites" in obj &&
            Array.isArray(obj.prerequisites) &&
            obj.prerequisites.every((p) => typeof p === "string") &&
            "outline" in obj &&
            Array.isArray(obj.outline)
          ) {
            const courseId: ResourceId = obj.id;
            const courseCode: CourseCode = obj.code;
            const courseTitle: string = obj.title;
            const courseDescription: string = obj.description;
            const courseHighlights: string[] = obj.highlights;
            const coursePrerequisites: string[] = obj.prerequisites;

            const courseOutline = await Promise.all(
              obj.outline.map(async (unit): Promise<Unit> => {
                if ("ref" in unit && isResourceId(unit.ref)) {
                  const unitRef: ResourceId = unit.ref;
                  const unitData = await fetchUnit(unitRef);
                  return unitData;
                }

                throw new Error("Invalid unit reference");
              }),
            );

            const course = {
              id: courseId,
              code: courseCode,
              title: courseTitle,
              description: courseDescription,
              highlights: courseHighlights,
              prerequisites: coursePrerequisites,
              outline: courseOutline,
            };

            if (isCourse(course)) {
              return <CourseLayout course={course} basePath={resourceUrl} />;
            }

            throw new Error(`Invalid course schema: ${JSON.stringify(course)}`);
          }
          break;
      }

      throw new Error("Unknown layout for requested resource file.");
    },
    [resourceUrl],
  );

  useEffect(() => {
    if (!router) {
      fetchRouter()
        .then((data) => setRouter(data))
        .catch((error) => {
          setError(error.message);
          console.error(error);
        });
    }
  }, [router]);

  useEffect(() => {
    if (pathname && router) {
      let path = pathname.split("/");
      path = path.slice(path.indexOf("learn"));

      let route: Route | null = null;
      let obj: Router = router;
      let i = 0;
      while (i < path.length) {
        const slug = `/${path[i]}`; // path slug conforming to `/${string}`
        if (!(slug in obj)) {
          setError(`404`);
          return;
        }

        obj = obj[slug];

        // Check if index file; if not, raise error
        if (i === path.length - 1) {
          if ("index" in obj) {
            route = obj["index"] as Route;
            break;
          }
        }

        if (isRoute(obj)) {
          route = obj as Route;
          break;
        } else if (isRouter(obj)) {
          i++;
          continue;
        }

        setError(`404.1`);
        return;
      }

      const resourceRef = route;
      if (!resourceRef) {
        setError(`404.2`);
        return;
      }

      // Get course based on reference
      setRoute(resourceRef);
      setResourceUrl(path.slice(0, i + 1).join("/"));
    }
  }, [pathname, router]);

  useEffect(() => {
    if (!route || !resourceUrl) {
      return;
    }

    getResourceFile(route.ref)
      .then((courseFile) => {
        getLayoutFromResourceFile(courseFile)
          .then((layout) => {
            setLayout(layout);
          })
          .catch((error) => {
            console.error(error);
            setError("555");
            return;
          });
      })
      .catch((error) => {
        setError(`404.3`);
        console.error(error);
      });
  }, [route, resourceUrl, getLayoutFromResourceFile]);

  if (error) {
    return (
      <Layout>
        <P>An error occurred: {error}</P>
      </Layout>
    );
  }

  if (!pathname || !layout) {
    return null;
  }

  return <Layout>{layout}</Layout>;
}
