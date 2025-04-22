import { View } from "react-native";

import {
  useWord,
  WordProvider,
  OverviewCard,
} from "./../../components/WordWidget";
import { useEffect, useState } from "react";
import { Word } from "../../../../../api/__api/Modules/APP_WORD_A_DAY/Module";

export function Overview() {
  const { data, getWordByDate } = useWord();
  const [word, setWord] = useState<Word | null>(null);
  useEffect(() => {
    if (!word && data) {
      const w = getWordByDate(new Date());
      if (w) {
        setWord(w);
      }
    }
  }, [word, data, getWordByDate]);
  return <OverviewCard word={word ?? undefined} />;
}

export function Header() {
  return (
    <View style={{ padding: 32, backgroundColor: "red", width: "100%" }}></View>
  );
}

export default function HomeScreen() {
  return (
    <WordProvider>
      <View
        style={{
          flexGrow: 1,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Header />
        <Overview />
      </View>
    </WordProvider>
  );
}
