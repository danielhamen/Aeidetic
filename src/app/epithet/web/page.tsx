"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  ReactNode,
} from "react";
import {
  Flex,
  H1,
  H4,
  I,
  Icon,
  Button,
  C1,
  C3,
  Divider,
  P,
  Text,
} from "api/components/web/index";
import { Word } from "api/app/api/__api/Modules/APP_WORD_A_DAY/Module";

export interface EpithetProps {
  incrementToday: () => void;
  decrementToday: () => void;
  today: [Word, Date] | undefined;
  setToday(_: [Word, Date] | undefined): void;
  getDate(date: Date): Promise<Word | undefined>;
}

export const EpithetContext = React.createContext<EpithetProps | null>(null);

export function EpithetProvider({ children }: { children: React.ReactNode }) {
  const [today, setToday] = useState<[Word, Date] | undefined>(undefined);

  async function getDate(date: Date): Promise<Word | undefined> {
    const YYYY = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0"); // Ensuring two-digit month
    const DD = String(date.getDate()).padStart(2, "0"); // Ensuring two-digit day
    const dateString = `${YYYY}-${MM}-${DD}`;

    try {
      const response = await fetch(
        `/api/WORD_A_DAY/data?query=date&date=${dateString}`,
      );

      if (!response.ok) {
        throw new Error(`Unexpected error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch word of the day:", error);
      return undefined;
    }
  }

  const incrementToday = () => {
    if (!today) return;
    const newDate = new Date(today[1].getTime() + 24 * 60 * 60 * 1000);
    getDate(newDate).then((w) => {
      if (!w) {
        setToday(undefined);
      } else {
        setToday([w, newDate]);
      }
    });
  };

  const decrementToday = () => {
    if (!today) return;
    const newDate = new Date(today[1].getTime() - 24 * 60 * 60 * 1000);
    getDate(newDate).then((w) => {
      if (!w) {
        setToday(undefined);
      } else {
        setToday([w, newDate]);
      }
    });
  };

  useEffect(() => {
    const d = new Date();
    getDate(d).then((w) => {
      if (!w) {
        setToday(undefined);
      } else {
        setToday([w, d]);
      }
    });
  }, []);

  const value = useMemo(
    () => ({ today, setToday, getDate, incrementToday, decrementToday }),
    [today, incrementToday, decrementToday],
  );

  return (
    <EpithetContext.Provider value={value}>{children}</EpithetContext.Provider>
  );
}

export function useEpithet() {
  const context = useContext(EpithetContext);
  if (!context) {
    throw new Error("useEpithet must be used within an EpithetProvider");
  }
  return context;
}

export interface WordWidgetProps {
  title: string;
  children?: ReactNode;
  maxWidth?: number | string;
  width?: number | string;
  minWidth?: number | string;
  invisible?: boolean;
  grow?: boolean;
}

export function WordWidget({
  title,
  children,
  maxWidth,
  width = "100%",
  minWidth,
  invisible = false,
  grow = false,
}: WordWidgetProps) {
  return (
    <Flex
      className={`rounded-md ${!invisible ? "border border-gray-200" : ""} p-4`}
      style={{ maxWidth, width, minWidth }}
      grow={grow === true ? true : undefined}
    >
      {invisible ? null : <H4>{title}</H4>}
      {children}
    </Flex>
  );
}

export function DateOverlay({
  date,
  containerStyle,
}: {
  date?: Date;
  containerStyle?: React.CSSProperties;
}) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
    if (date) {
      setFormattedDate(date.toLocaleDateString());
    } else {
      setFormattedDate(null);
    }
  }, [date]);
  if (!date) return null;

  return (
    <Flex className={`absolute top-0 right-0`} style={containerStyle}>
      <C1 className={`gap-4 inline-flex items-center`}>
        <Text>&bull;</Text>
        {formattedDate}
        <Text>&bull;</Text>
      </C1>
    </Flex>
  );
}

export function DateNavigatorOverlay({}) {
  const { incrementToday, decrementToday } = useEpithet();
  const [iconStyle] = useState(`cursor-pointer p-4`);

  return (
    <Flex
      className={`absolute top-1/2 h-fit -translate-y-1/2`}
      style={{
        width: `calc(100% + 8em)`,
        maxWidth: "100vw",
      }}
      direction="row"
      justify="space-between"
    >
      <Icon
        name={"chevron_left"}
        className={iconStyle}
        onClick={decrementToday}
      />
      <Icon
        name={"chevron_right"}
        className={iconStyle}
        onClick={incrementToday}
      />
    </Flex>
  );
}

export function Overview({ word, date }: { word?: Word; date?: Date }) {
  if (!word) {
    return null;
  }

  return (
    <Flex
      className={`absolute z-10 w-full h-full`}
      align="center"
      justify="center"
    >
      <Flex
        className={`relative p-8 pt-32 pb-4 max-w-4xl h-fit w-full mx-auto border border-gray-200 rounded-2xl`}
        align="center"
        gap={4}
      >
        <DateOverlay
          date={date}
          containerStyle={{
            position: "absolute",
            zIndex: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
            top: 32,
          }}
        />
        <DateNavigatorOverlay />
        <Flex align="center" gap={2}>
          <Flex direction="row" align="center" className={`relative`}>
            <Flex
              className={`absolute -translate-x-8 top-0 -translate-y-[2px]`}
            >
              <Button buttonStyle="primary" buttonContent="icon">
                <Icon name="volume_up" color="white" />
              </Button>
            </Flex>
            <H1 style={{ margin: 0 }}>“{word.lexeme}”</H1>
          </Flex>
          <C3>/fôrˈto͞oədəs/</C3>
        </Flex>
        <WordWidget title="Definition" invisible>
          <Flex align="center" gap={4}>
            <Flex direction="row" align="start" gap={2}>
              <H4 className={`inline-flex items-start justify-start`}>
                {word.partOfSpeech}
              </H4>
              <P>“{word.definition}”</P>
            </Flex>
            <Flex
              direction="row"
              align="center"
              gap={4}
              className={`border-x border-gray-300 bg-gray-50 px-8`}
            >
              <Text>«</Text>
              <P size={15} className={`text-center`}>
                <I>{word.example}</I>
              </P>
              <Text>»</Text>
            </Flex>
          </Flex>
        </WordWidget>
        <Divider maxSize={400} margin={24} />
        <WordWidget title="Etymology">
          <P>{word.etymology}</P>
        </WordWidget>
        <Flex direction="row" gap={4} className={`w-full`}>
          <Flex className={`w-full`} direction="column" gap={4}>
            <Flex direction="row" gap={4}>
              <WordWidget title="Synonyms">
                <P>{word.synonyms.join(", ")}</P>
              </WordWidget>
              <WordWidget title="Antonyms">
                <P>{word.antonyms.join(", ")}</P>
              </WordWidget>
            </Flex>
            <WordWidget title="Related Words">
              <P>{word.related.join(", ")}</P>
            </WordWidget>
          </Flex>
          <Flex grow className={`w-64`}>
            <WordWidget title="Translations" grow={true}>
              {Object.keys(word.translations as Record<string, string[]>).map(
                (lang, i) => {
                  const translations = (
                    word.translations as Record<string, string[]>
                  )[lang];
                  return (
                    <P key={i}>
                      <Text
                        className={`inline-flex select-none mx-2 align-middle`}
                      >
                        &bull;
                      </Text>
                      <Text font="serif_sc" className={`select-none`}>
                        {lang}{" "}
                      </Text>
                      {translations.join(", ") ?? ""}
                    </P>
                  );
                },
              )}
            </WordWidget>
          </Flex>
        </Flex>
        <Text font="cursive" size={32} className={`my-4`}>
          Epithet
        </Text>
      </Flex>
    </Flex>
  );
}

export function EpithetHome() {
  const { today } = useEpithet();
  if (!today) {
    return null;
  }

  return (
    <Flex className={`relative w-full h-full`} grow>
      <Overview word={today[0]} date={today[1]} />
    </Flex>
  );
}

export default function Page() {
  return (
    <EpithetProvider>
      <EpithetHome />
    </EpithetProvider>
  );
}
