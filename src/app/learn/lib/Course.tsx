import { Flex } from "api/components/web";
import React, { Children, ReactNode, useEffect, useState } from "react";

export type CoursePreface =
  | "CS"
  | "MATH"
  | "PHY"
  | "ENGR"
  | "LANG"
  | "CHEM"
  | "STAT";

export type CourseCode = `${CoursePreface}-${number}`;

export interface Quiz {
  id: string;
}

export interface Lesson {
  id: string;
}

export interface Example {
  id: string;
}

export interface Practice {
  id: string;
}

export interface Video {
  id: string;
}

export type Content = Lesson | Example | Quiz | Practice | Video;
export type ContentType = "lesson" | "example" | "quiz" | "practice" | "video";
export function isContentType(obj: unknown): obj is ContentType {
  return (
    typeof obj === "string" &&
    ["lesson", "example", "quiz", "practice", "video"].includes(obj)
  );
}

export function getIconFor(ctype: ContentType): string {
  switch (ctype) {
    case "example":
      return "glyphs";
    case "lesson":
      return "newspaper";
    case "practice":
      return "neurology";
    case "video":
      return "slideshow";
    case "quiz":
      return "quiz";
  }
}

export interface Topic {
  id: string;
  name?: string;
  content?: Content;
  type?: ContentType;
}

export interface Module {
  id: string;
  name: string;
  description?: string;
  topics: Topic[];
}

export interface Unit {
  id: string;
  index: number;
  name: string;
  description: string;
  modules: Module[];
}

export interface Course {
  id: string;
  code: CourseCode;
  goal?: string;
  name: string;
  description: string;
  units: Unit[];
}

export function isCourse(obj: unknown): obj is Course {
  if (!obj || typeof obj !== "object") return false;

  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "code" in obj &&
    typeof obj.code === "string" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "units" in obj &&
    Array.isArray(obj.units)
  );
}

export interface CourseManager {
  getCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course>;
  getCourseByCode(code: CourseCode): Promise<Course>;
  getCoursesByPreface(preface: CoursePreface): Promise<Course>;
}

export const CalculusCourse: Course = {
  id: "",
  code: "MATH-1000",
  goal: "Master the fundamentals of calculus",
  name: "Calculus I",
  description: "",
  units: [
    {
      id: "",
      index: 1,
      name: "Pre-Calculus Review",
      description: "",
      modules: [
        {
          id: "",
          name: "Functions & Graphs Review",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Algebra Review",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Trigonometry Review",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Analytic Geometry",
          description: "",
          topics: [],
        },
      ],
    },
    {
      id: "",
      index: 2,
      name: "Limits & Continuity",
      description: "",
      modules: [
        {
          id: "",
          name: "Introduction to Limits",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Limit Laws",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Limits to Infinity",
          description: "",
          topics: [
            {
              id: "",
              type: "lesson",
              name: "Introduction",
              content: {
                id: "",
              } as Lesson,
            },
          ],
        },
        {
          id: "",
          name: "Limits of Special Functions",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Continuity",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Limit Techniques",
          description: "",
          topics: [],
        },
      ],
    },
    {
      id: "",
      index: 3,
      name: "Derivatives",
      description: "",
      modules: [
        {
          id: "",
          name: "Definition of Derivatives",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Basic Derivative Rules",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Product & Quotient Rules",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Chain Rule",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Derivatives of Trigonometric Functions",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Derivatives of Exponential and Logarithmic Functions",
          description: "",
          topics: [],
        },
      ],
    },
    {
      id: "",
      index: 4,
      name: "Applications of Derivatives",
      description: "",
      modules: [
        {
          id: "",
          name: "Rates of Change",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Graphing with Derivatives",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Optimization",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Mean Value Theorem",
          description: "",
          topics: [],
        },
        {
          id: "",
          name: "Linear Approximation and Differentials",
          description: "",
          topics: [],
        },
      ],
    },
    {
      id: "",
      index: 5,
      name: "Integration",
      description: "",
      modules: [],
    },
    {
      id: "",
      index: 6,
      name: "Applications of Integration",
      description: "",
      modules: [],
    },
  ],
};

export const Courses = {
  Mathematics: {
    Calculus: {
      "Calculus I": CalculusCourse,
      "Calculus II": null,
      "Calculus III": null,
    },
    "Discrete Mathematics": {},
    "Linear Algebra": {},
  },
  Science: {
    Physics: {
      "Classical Physics": {
        "Physics I": null,
        "Physics II": null,
        "Physics III": null,
      },
    },
    Chemistry: {},
    Biology: {},
  },
  Engineering: {},
  Language: {},
};

export interface PageRoute {}

export interface PageMetadata {
  public?: boolean;
  title?: string;
}

export interface PageContent {
  type: string;
}

export interface CourseListOverview extends PageContent {
  type: "course-list-overview";
  title: string;
  items: { title: string; points: string[] }[];
}

export type PageRouter = {
  public?: boolean;
  title?: string;
  content?: string;
  paths?: {
    [key: `/${string}`]: PageRoute | PageRouter | null;
  };
};

// /learn/*
export const _Router: PageRouter = {
  public: true,
  paths: {
    // /learn/science/*
    "/science": {
      public: true,
      paths: {
        // /learn/science/physics/*
        "/physics": {
          public: true,
          // /learn/science/physics/classical-physics/*
          "/classical-physics": {
            public: true,
            content: {},
            "physics-i": {},
            "physics-ii": null,
            "physics-iii": null,
          },
        },
        "/biology": {},
        "/chemistry": {},
      },
    },
    "/mathematics": {
      public: true,
      paths: {
        "/calculus": {
          "/calculus-i": {},
          "/calculus-ii": null,
          "/calculus-iii": null,
        },
        "/pre-calculus": {},
      },
    },
  },
};

export interface RouteProps {
  path: `/${string}`;
}

export function Route({ path }: RouteProps) {}

export interface RouterProps {
  root?: `/${string}`;
  children: ReactNode;
}

export function Router({ children, root }: RouterProps) {
  const [error, setError] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);
  useEffect(() => {
    Children.forEach(children, (child) => {});
  }, [children]);

  return <Flex></Flex>;
}

export function LearnRouter() {
  return (
    <Router root="/learn">
      <Route path="/science"></Route>
    </Router>
  );
}
