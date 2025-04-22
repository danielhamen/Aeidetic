import React from "react";
import { Course } from "../types";
import { Flex, P } from "api/components/web";

export interface CourseViewProps {
  course?: Course;
}

export function CourseView({ course }: CourseViewProps) {
  if (!course) return null;
  return (
    <Flex grow>
      <P>Course: {course.title}</P>
    </Flex>
  );
}
