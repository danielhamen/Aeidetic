import { FeedbackType } from "api/hooks/useFeedback";
import React from "react";
import { Flex } from "../layout/Flex";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: FeedbackType;
  icon?: string;
}

export function Message({ children, ...props }: MessageProps) {
  return <Flex {...props}>{children}</Flex>;
}
