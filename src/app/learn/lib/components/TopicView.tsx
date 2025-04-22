import React from "react";
import { isLesson, isPractice, isQuiz, Topic } from "../types";
import { Flex, P } from "api/components/web";
import { LessonView } from "./LessonView";
import { PracticeView } from "./PracticeView";
import { QuizView } from "./QuizView";

export interface TopicViewProps {
  topic?: Topic;
}

export function TopicView({ topic }: TopicViewProps) {
  if (!topic) return null;

  switch (topic.type) {
    case "lesson":
      if (!isLesson(topic)) {
        return null;
      }

      return <LessonView lesson={topic} />;
    case "practice":
      if (!isPractice(topic)) {
        return null;
      }

      return <PracticeView practice={topic} />;
    case "quiz":
      if (!isQuiz(topic)) {
        return null;
      }

      return <QuizView quiz={topic} />;
  }

  return (
    <Flex>
      <P>Error. This should never happen.</P>
    </Flex>
  );
}
