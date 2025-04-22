export type ResourceVisibility = "public" | "private" | "draft" | "premium";

export function rURI(rID: ResourceId): string {
  const uri = rID.split("/").at(-1);
  if (!uri) throw new Error("Invalid resource ID");
  return uri;
}

export function isResourceVisibility(obj: unknown): obj is ResourceVisibility {
  return (
    typeof obj === "string" &&
    ["public", "private", "draft", "premium"].includes(obj)
  );
}

export type ResourcePreface =
  | "course"
  | "landing"
  | "lesson"
  | "module"
  | "quiz"
  | "practice"
  | "unit";

export function isResourcePreface(obj: unknown): obj is ResourcePreface {
  return (
    typeof obj === "string" &&
    [
      "course",
      "landing",
      "lesson",
      "module",
      "quiz",
      "practice",
      "unit",
    ].includes(obj)
  );
}

export type ResourceId = `${ResourcePreface}/${string}`;

export function isResourceId(obj: unknown): obj is ResourceId {
  return (
    typeof obj === "string" &&
    obj.split("/").length >= 2 &&
    isResourcePreface(obj.split("/")[0])
  );
}

export interface Resource {
  id: ResourceId;
  visibility?: ResourceVisibility;
}

export function isResource(obj: unknown): obj is Resource {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "string" &&
    ("visibility" in obj ? isResourceVisibility(obj) : true)
  );
}

export interface LandingSection {
  /** If not specified, the title will be derived from the course */
  title: string;

  /** If not specified, the points will be derived from the course highlights */
  points: string[];

  icon?: string;

  /** If not specified, the tags will be derived from the course */
  tags?: string[];

  /** Link to course */
  href: string;

  /** Text that appears on the continue button */
  linkText?: string;
}

export function isLandingSection(obj: unknown): obj is LandingSection {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "points" in obj &&
    Array.isArray(obj.points) &&
    obj.points.every((point) => typeof point === "string") &&
    "href" in obj &&
    typeof obj.href === "string" &&
    ("icon" in obj ? typeof obj.icon === "string" : true) &&
    ("tags" in obj
      ? Array.isArray(obj.tags) &&
        obj.tags.every((tag) => typeof tag === "string")
      : true) &&
    ("linkText" in obj ? typeof obj.linkText === "string" : true)
  );
}

export interface Landing extends Resource {
  title: string;
  subtitle: string;
  sections: LandingSection[];
}

export function isLanding(obj: unknown): obj is Landing {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "subtitle" in obj &&
    typeof obj.subtitle === "string" &&
    "sections" in obj &&
    Array.isArray(obj.sections) &&
    obj.sections.every(isLandingSection)
  );
}

export type TopicType = "lesson" | "quiz" | "practice";

export function isTopicType(value: unknown): value is TopicType {
  return (
    typeof value === "string" && ["lesson", "quiz", "practice"].includes(value)
  );
}

export interface Topic extends Resource {
  type: TopicType;
  name: string;
  description?: string;
}

export interface Lesson extends Topic {
  content: Document;
}

export function isLesson(obj: unknown): obj is Lesson {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "type" in obj &&
    isTopicType(obj.type) &&
    obj.type === "lesson" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "content" in obj &&
    obj.content instanceof Document
  );
}

export function estimateReadTimeForLesson(lesson: Lesson): number {
  const READING_SPEED = 260; // words per minute
  const words = Array.from(lesson.content.querySelectorAll("*"))
    .map((e) => e.textContent)
    .join(" ")
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);

  return words.length / READING_SPEED;
}

export interface Practice extends Topic {
  content: string;
}

export function isPractice(obj: unknown): obj is Practice {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "type" in obj &&
    isTopicType(obj.type) &&
    obj.type === "practice" &&
    "content" in obj &&
    typeof obj.content === "string"
  );
}

export type QuizType = "multiple-choice" | "true-false";

export interface MultipleChoice {
  id: string;
  type: QuizType;
  /** Whether the question is generated through JS */
  dynamic?: boolean;
  shuffleChoices?: boolean;
  choices: { label: string; correct?: boolean }[];
  explanation?: string;
}

export function isMultipleChoice(obj: unknown): obj is MultipleChoice {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "type" in obj &&
    obj.type === "multiple-choice" &&
    "choices" in obj &&
    Array.isArray(obj.choices) &&
    obj.choices.every(
      (choice) =>
        typeof choice === "object" &&
        choice !== null &&
        "label" in choice &&
        typeof choice.label === "string",
    ) &&
    // At least one choice must be correct
    obj.choices.some(
      (choice) =>
        "correct" in choice &&
        typeof choice.correct === "boolean" &&
        choice.correct === true,
    )
  );
}

export type QuizQuestion = MultipleChoice;

export interface Quiz extends Topic {
  content: string;
  associates: string[];
  shuffleQuestions?: boolean;
  questions: QuizQuestion[];
}

export function isQuiz(obj: unknown): obj is Quiz {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "type" in obj &&
    isTopicType(obj.type) &&
    obj.type === "quiz" &&
    "content" in obj &&
    typeof obj.content === "string"
  );
}

export function isTopic(obj: unknown): obj is Topic {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "type" in obj &&
    isTopicType(obj.type) &&
    (obj.type === "lesson"
      ? isLesson(obj)
      : obj.type === "practice"
        ? isPractice(obj)
        : obj.type === "quiz"
          ? isQuiz(obj)
          : false)
  );
}

export interface Module extends Resource {
  name: string;
  description?: string;
  topics?: Topic[];
}

export function isModule(obj: unknown): obj is Module {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "description" in obj &&
    (typeof obj.description === "string" || obj.description === undefined) &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "topics" in obj &&
    Array.isArray(obj.topics) &&
    obj.topics.every(isTopic)
  );
}

export interface Unit extends Resource {
  name: string;
  description?: string;
  modules: Module[];
}

export function isUnit(obj: unknown): obj is Unit {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "modules" in obj &&
    Array.isArray(obj.modules) &&
    obj.modules.every(isModule)
  );
}

export type CoursePreface =
  | "CS"
  | "MATH"
  | "PHY"
  | "ENGR"
  | "LANG"
  | "CHEM"
  | "STAT";

export function isCoursePreface(obj: unknown): obj is CoursePreface {
  return (
    typeof obj === "string" &&
    ["CS", "MATH", "PHY", "ENGR", "LANG", "CHEM", "STAT"].includes(obj)
  );
}

export type CourseCode = `${CoursePreface}-${number}`;

export function isCourseCode(obj: unknown): obj is CourseCode {
  return (
    typeof obj === "string" &&
    obj.split("-").length === 2 &&
    isCoursePreface(obj.split("-")[0]) &&
    Number.isInteger(Number(obj.split("-")[1])) &&
    obj.split("-")[1].length === 4
  );
}

export interface Course extends Resource {
  code: CourseCode;
  title: string;
  description: string;
  highlights: string[];
  prerequisites: string[];
  outline: Unit[];
}

export function isCourse(obj: unknown): obj is Course {
  return (
    typeof obj === "object" &&
    obj !== null &&
    isResource(obj) &&
    "code" in obj &&
    isCourseCode(obj.code) &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "highlights" in obj &&
    Array.isArray(obj.highlights) &&
    obj.highlights.every((highlight) => typeof highlight === "string") &&
    "prerequisites" in obj &&
    Array.isArray(obj.prerequisites) &&
    obj.prerequisites.every(
      (prerequisite) => typeof prerequisite === "string",
    ) &&
    "outline" in obj &&
    Array.isArray(obj.outline) &&
    obj.outline.every(isUnit)
  );
}

export interface Route {
  visibility: ResourceVisibility;
  type: ResourcePreface;
  ref: string;
}

export function isRoute(obj: unknown): obj is Route {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "visibility" in obj &&
    typeof obj.visibility === "string" &&
    isResourceVisibility(obj.visibility) &&
    "type" in obj &&
    typeof obj.type === "string" &&
    "ref" in obj &&
    typeof obj.ref === "string"
  );
}

export interface Router {
  index?: Route;
  [key: `/${string}`]: Router | Route;
}

export function isRouter(obj: unknown): obj is Router {
  if (typeof obj !== "object" || obj === null) return false;

  const o = obj as Record<string, unknown>;

  for (const [key, value] of Object.entries(o)) {
    if (key === "index") {
      if (!isRoute(value)) return false;
    } else if (key.startsWith("/")) {
      if (!isRoute(value) && !isRouter(value)) return false;
    } else {
      return false; // invalid key (must start with '/' or be 'index')
    }
  }

  return true;
}

export interface ResourceFile {
  id: string;
  path: string;
  content: Resource;
  type: ResourcePreface;
}
