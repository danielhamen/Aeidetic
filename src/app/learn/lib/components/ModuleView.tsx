import React from "react";
import { isLesson, isPractice, isQuiz, Module } from "../types";
import { Flex, H3, P } from "api/components/web";
import { LessonView } from "./LessonView";
import { QuizView } from "./QuizView";
import { PracticeView } from "./PracticeView";

export interface ModuleViewProps {
  module?: Module;
}

export function ModuleView({ module }: ModuleViewProps) {
  if (!module) return null;
  return (
    <Flex grow>
      {module?.topics?.map((topic, idx) => {
        if (topic.type === "lesson" && isLesson(topic)) {
          return (
            <Flex key={idx}>
              {idx > 0 && <H3>Lesson:</H3>}
              <LessonView lesson={topic} />
            </Flex>
          );
        } else if (topic.type === "quiz" && isQuiz(topic)) {
          return (
            <Flex key={idx}>
              <H3>Quiz:</H3>
              <QuizView quiz={topic} />
            </Flex>
          );
        } else if (topic.type === "practice" && isPractice(topic)) {
          return (
            <Flex key={idx}>
              <H3>Practice:</H3>
              <PracticeView practice={topic} />
            </Flex>
          );
        }
      })}
    </Flex>
  );
}
