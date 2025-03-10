import { Flex } from "api/components/layout/Flex";
import React, { ReactNode } from "react";

export type FeedbackType = "success" | "error" | "warning" | "info";

export const FeedbackContext = React.createContext({});

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const value = React.useMemo(() => ({ feedback, setFeedback }), [feedback]);

  return (
    <FeedbackContext.Provider value={value}>
      <Flex className="fixed w-full h-full top-0 left-0"></Flex>
      {children}
    </FeedbackContext.Provider>
  );
}

export interface FeedbackProps {
  createToast: () => void;
  createAlert: () => void;
  createMessage: ({
    type,
    textContent,
    children,
  }: {
    type: FeedbackType;
    textContent?: string;
    children?: ReactNode;
  }) => void;
}

export function useFeedback() {}
