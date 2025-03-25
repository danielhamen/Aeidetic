"use client";
import React from "react";
import { Flex } from "api/components/layout/Flex";
import { Word } from "api/app/api/__api/Modules/APP_WORD_A_DAY/Module";

export interface EpithetProps {
  getDate(date: Date): Promise<Word | undefined>;
}

export const EpithetContext = React.createContext<EpithetProps | null>(null);

export function EpithetProvider({ children }: { children: React.ReactNode }) {
  const [epithet, setEpithet] = React.useState<EpithetProps | null>(null);

  function getDate(date: Date): Promise<Word | undefined> {
    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1;
    const DD = date.getDate();
    return Promise.resolve(undefined);
  }

  return (
    <EpithetContext.Provider value={epithet}>
      {children}
    </EpithetContext.Provider>
  );
}

export function useEpithet() {
  const context = React.useContext(EpithetContext);
  if (!context) {
    throw new Error("useEpithet must be used within an EpithetProvider");
  }
  return context;
}

export default function Page() {
  return (
    <Flex>
      <h1>Epithet</h1>
      <p>The</p>
    </Flex>
  );
}
