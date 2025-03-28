import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Word } from "../../../../api/__api/Modules/APP_WORD_A_DAY/Module";

export interface WordManager {
  data: Record<number, Word>;
  setData: (d: Record<number, Word>) => void;
  getOffsetByDate: (d: Date) => number;
  getWordByDate: (d: Date) => Word;
  fetchWords: () => Promise<void>;
}

// Create the Word context
const WordContext = createContext<WordManager | null>(null);

// WordProvider component
export function WordProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Word[] | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  function parseWord(word: any): Word | undefined {
    const wordRecord: Word = {
      lexeme: word?.lexeme,
      id: word?.id,
      definition: word?.definition,
      example: word?.example,
      etymology: word?.etymology,
      pronunciation: word?.pronunciation,
      date: word?.date,
      ipa: word?.ipa,
      partOfSpeech: word?.partOfSpeech,
      synonyms: word?.synonyms,
      antonyms: word?.antonyms,
      related: word?.related,
      translations: {
        de: word?.translations?.de,
        fr: word?.translations?.fr,
        es: word?.translations?.es,
        it: word?.translations?.it,
      },
    };

    return wordRecord;
  }

  // Fetch words from an API or a local data source
  // Test
  const fetchWords = useCallback(async () => {
    const res = await fetch("http://127.0.0.1:3000/api/WORD_A_DAY/data", {
      method: "GET",
      mode: "no-cors", // This bypasses the CORS policy
    });
    if (!res.ok) {
      throw new Error("NetworkError");
    }

    const data = await res.json();
    const wordMap: Word[] = Object.values(data)
      .map((val) => parseWord(val))
      .filter((w) => w !== undefined);

    setData(wordMap);
  }, []);

  const getWordByDate = useCallback(
    (date: Date): Word | undefined => {
      return (
        data?.find(
          (value) =>
            value.date ===
            `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${(date.getDate() + 1).toString().padStart(2, "0")}`,
        ) ?? undefined
      );
    },
    [data],
  );

  const getOffsetByDate = useCallback(() => {}, []);

  async function getStartDate(): Promise<Date> {
    const req = await fetch(
      "http://127.0.0.1:3000/api/WORD_A_DAY/data?query=getstartdate",
      {
        method: "GET",
        mode: "no-cors", // This bypasses the CORS policy
      },
    );
    if (!req.ok) {
      throw new Error(
        "Unknown Error occurred. Cannot determine the start date.",
      );
    }

    const data = await req.json();
    const YYYY = data["year"];
    const MM = data["month"];
    const DD = data["day"];

    if (!YYYY || !MM || !DD) {
      throw new Error(
        "Undefined or illegal values for Year, Month, and/or Day",
      );
    }

    const date = new Date();
    date.setFullYear(YYYY);
    date.setMonth(MM);
    date.setDate(DD);

    return date;
  }

  useEffect(() => {
    fetchWords()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });

    // Get start date
    if (!startDate) {
      getStartDate()
        .then((date: Date) => {
          setStartDate(date);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [startDate, fetchWords]);

  const value = {
    data,
    setData,
    startDate,
    getOffsetByDate,
    getWordByDate,
    fetchWords,
  };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
}

// useWord hook to access WordContext
export const useWord = (): WordManager => {
  const context = useContext(WordContext);

  if (!context) {
    throw new Error("useWord must be used within a WordProvider");
  }

  return context;
};

export function formatDate(date: Date): string {
  const YYYY = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const DD = date.getDate().toString().padStart(2, "0");

  return `${MM}-${DD}-${YYYY}`;
}

export function DateOverlay({ date }: { date?: string }) {
  if (!date) {
    return null;
  }
  return (
    <View>
      <Text>{date}</Text>
    </View>
  );
}

export function Title({ text }: { text: string }) {
  return <Text style={styles.title}>{text}</Text>;
}

export function Divider() {
  return <View style={styles.divider}></View>;
}

export interface WordWidgetProps {
  word?: Word;
}

export function WordWidget({ word }: WordWidgetProps) {
  const [dateString, setDateString] = useState<string | null>(null);
  useEffect(() => {
    if (!word) {
      setDateString(null);
    } else {
      setDateString(word.date);
    }
  }, [word]);

  if (!word) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DateOverlay date={dateString ?? undefined} />
      <View>
        <Text style={styles.lexeme}>« {word.lexeme} »</Text>
        <Text>{word.ipa}</Text>
        <Text style={styles.definition}>
          ({word.partOfSpeech}): {word.definition}
        </Text>
        <Text style={styles.example}>{word.example}</Text>
      </View>
      <Divider />
      <View style={{ width: "100%", gap: 12 }}>
        <View style={styles.widget}>
          <Title text="Etymology" />
          <Text>{word.etymology}</Text>
        </View>
        <View
          style={{ flexDirection: "row", flexGrow: 1, width: "100%", gap: 12 }}
        >
          <View style={[styles.widget, { flex: 0.5 }]}>
            <Title text="Synonyms" />
            <Text>{word.synonyms.join(", ")}</Text>
          </View>
          <View style={[styles.widget, { flex: 0.5 }]}>
            <Title text="Antonyms" />
            <Text>{word.antonyms.join(", ")}</Text>
          </View>
        </View>
        <View style={styles.widget}>
          <Title text="Related Words" />
          <Text>{word.related.join(", ")}</Text>
        </View>
        <View style={styles.widget}>
          <Title text="Translations" />
          <Text>{Object.values(word.translations).join(", ")}</Text>
        </View>
      </View>
    </View>
  );
}

export function HorizontalWordFeed({
  date,
  setDate,
}: {
  date: Date;
  setDate: (d: Date) => void;
}) {
  const [data, setData] = useState<[Word, Date][] | null>(null);
  useEffect(() => {}, [date]);

  if (!data) {
    return null;
  }

  return <View></View>;
}

const GRAY_200 = "#e5e7eb";
const SHADOW = "rgba(0, 0, 0, 0.05)";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  widget: {
    // border: `1px solid ${GRAY_200}`,
    // padding: 8,
    // borderRadius: 8,
    gap: 4,
    marginBottom: 16,
    // boxShadow: `0 0 8px ${SHADOW}`,
  },
  title: {
    fontWeight: 600,
    marginVertical: 4,
    fontFamily: "Urbanist",
  },
  lexeme: {
    textAlign: "center",
    marginVertical: 32,
    fontSize: 32,
    fontFamily: "Baskervville",
  },
  divider: {
    width: "80%",
    height: 1,
    borderRadius: 999,
    backgroundColor: GRAY_200,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  definition: {
    fontFamily: "Urbanist",
    textAlign: "justify",
  },
  example: {
    fontFamily: "UrbanistItalic",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 2,
    fontSize: 13,
    maxWidth: 400,
    width: "calc(100% - 16px)",
    marginHorizontal: "auto",
    marginTop: 12,
    textAlign: "center",
  },
});
