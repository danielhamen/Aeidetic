// "use client";
// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import {
//   C1,
//   C2,
//   C3,
//   Divider,
//   Flex,
//   H1,
//   H2,
//   H3,
//   P,
//   InlineMath,
//   Button,
//   Text,
//   H4,
// } from "api/components/web";
// import {
//   Course,
//   Courses,
//   isCourse,
//   Unit,
//   Topic,
//   getIconFor,
// } from "./lib/Course";
// import { usePath } from "api/hooks/usePath";
// import { Icon } from "api/components/web";
// import Link from "next/link";

// // ───────────────────────────────
// // Utility: slugify
// // Converts a string to lowercase, replaces '&' with 'and', and spaces with dashes.
// const slugify = (str: string): string => {
//   return str.toLowerCase().replace(/&/g, "and").replace(/ /g, "-");
// };

// // Utility: deslugify
// // Converts a slug (with dashes) back into a human-readable title.
// const deslugify = (str: string): string => {
//   return str
//     .replace(/-/g, " ")
//     .replace(/and/g, "&")
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// // ───────────────────────────────
// // Navigation Context & Provider
// // ───────────────────────────────

// enum NavigationState {
//   LOADING,
//   ERROR,
//   READY,
// }

// interface NavigationProps {
//   state: NavigationState;
//   course: Course | null;
//   /** Breadcrumbs from root to the course */
//   coursePath: string[] | null;
//   /** URL segments after the course slug (could be unit, module, topic) */
//   courseSlug: string[] | null;
//   courseDiscipline: string | null;
// }

// const NavigationContext = createContext<NavigationProps | null>(null);

// function NavigationProvider({ children }: { children: ReactNode }) {
//   const path = usePath();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [state, setState] = useState<NavigationState>(NavigationState.LOADING);
//   const [coursePath, setCoursePath] = useState<string[] | null>(null);
//   const [courseSlug, setCourseSlug] = useState<string[] | null>(null);
//   const [courseDiscipline, setCourseDiscipline] = useState<string | null>(null);

//   useEffect(() => {
//     if (path !== null && state === NavigationState.LOADING) {
//       const queryData: {
//         course: Course | null;
//         slug: string[];
//         trail: string[];
//       } = {
//         course: null,
//         slug: [],
//         trail: [],
//       };

//       let query = path.split("/");
//       // Remove everything up to and including "learn"
//       query = query.slice(query.indexOf("learn") + 1);
//       const stringToSlug = (str: string) => slugify(str);

//       let node: any = Courses;
//       // First token (discipline) is used for breadcrumbs.
//       setCourseDiscipline(deslugify(query[0]));
//       query.forEach((slug) => {
//         const keys = Object.keys(node);
//         if (queryData.course) {
//           queryData.slug.push(slug);
//           return;
//         }
//         for (const key of keys) {
//           const value = node[key];
//           if (stringToSlug(key) === slug) {
//             queryData.trail.push(key);
//             if (isCourse(value)) {
//               queryData.course = value;
//             }
//             node = value;
//             break;
//           }
//         }
//       });

//       if (!queryData.course) {
//         setCourse(null);
//         setCoursePath([]);
//         setState(NavigationState.ERROR);
//         // console.error(
//         //   "Error 404. Cannot find a course at the corresponding URL.",
//         // );
//         return;
//       } else if (isCourse(queryData.course)) {
//         setCourse(queryData.course);
//         setCoursePath(queryData.trail);
//         setCourseSlug(queryData.slug);
//         setState(NavigationState.READY);
//       }
//     }
//   }, [path, state]);

//   return (
//     <NavigationContext.Provider
//       value={{ state, course, coursePath, courseSlug, courseDiscipline }}
//     >
//       {children}
//     </NavigationContext.Provider>
//   );
// }

// function useNavigation(): NavigationProps {
//   const ctx = useContext(NavigationContext);
//   if (!ctx) {
//     throw new Error("useNavigation must be used within a NavigationProvider");
//   }
//   return ctx;
// }

// function LayoutHandler() {
//   const { course, courseSlug } = useNavigation();
//   if (!course || !courseSlug) {
//     return null;
//   }

//   let mainContent;

//   // Filesystem-like routing:
//   // 0 extra tokens  -> show CourseOverview.
//   // 1 extra token   -> treat as Unit slug -> show UnitOverview.
//   // 2 extra tokens  -> treat as Unit + Module -> show ModuleView.
//   // 3+ extra tokens -> assume last token is a topic specifier "c{index}" -> show TopicView.
//   if (courseSlug.length === 0) {
//     mainContent = <CourseOverview />;
//   } else if (courseSlug.length === 1) {
//     mainContent = <UnitOverview />;
//   } else if (courseSlug.length === 2) {
//     mainContent = <ModuleView />;
//   } else {
//     const lastSegment = courseSlug[courseSlug.length - 1];
//     const match = lastSegment.match(/^c(\d+)$/);
//     if (match) {
//       const selectedUnitSlug = courseSlug[0];
//       const selectedModuleSlug = courseSlug[1];
//       const selectedUnit = course.units.find(
//         (unit) => slugify(unit.name) === selectedUnitSlug,
//       );
//       const selectedModule = selectedUnit?.modules.find(
//         (mod) => slugify(mod.name) === selectedModuleSlug,
//       );
//       if (selectedModule) {
//         const topicIndex = parseInt(match[1], 10);
//         const topic = selectedModule.topics[topicIndex];
//         if (topic) {
//           mainContent = (
//             <TopicView type={topic.type || "lesson"} index={topicIndex} />
//           );
//         } else {
//           mainContent = <ModuleView />;
//         }
//       } else {
//         mainContent = <ModuleView />;
//       }
//     } else {
//       // Fallback in case pattern doesn't match.
//       mainContent = <ModuleView />;
//     }
//   }

//   return (
//     <Flex className="overflow-hidden gap-4">
//       <Flex className={`w-full rounded-md bg-white shadow-md`}>
//         <Breadcrumbs />
//       </Flex>
//       <Flex
//         direction="row"
//         grow
//         className="overflow-hidden bg-white rounded-md"
//       >
//         <SidebarView />
//         <Flex className="gap-1 p-8 overflow-y-scroll" grow>
//           {mainContent}
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// }

// function Layout() {
//   const pathname = usePath();
//   const { state } = useNavigation();
//   if (state === NavigationState.LOADING) return null;
//   if (state === NavigationState.ERROR) {
//     if (!pathname) return null;
//     const reqUrl = pathname;
//     switch (reqUrl) {
//       case "/learn/mathematics/calculus":
//         return <CalculusHomepage />;
//       case "/learn/science/physics/classical-physics":
//         return <ClassicalPhysicsHomepage />;
//     }
//     return <p>Error: {reqUrl}</p>;
//   }

//   return (
//     <Flex className="p-2 bg-gray-100">
//       <LayoutHandler />
//     </Flex>
//   );
// }

// export default function Page() {
//   return (
//     <NavigationProvider>
//       <Flex className="overflow-hidden" grow>
//         <Header />
//         <Flex direction="row" grow className="overflow-hidden">
//           <Flex className="w-full overflow-hidden bg-gray-50 h-full" grow>
//             <Layout />
//           </Flex>
//         </Flex>
//       </Flex>
//     </NavigationProvider>
//   );
// }

// "use client";
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
