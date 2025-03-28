import { Image, StyleSheet, Platform, View } from "react-native";

import { useWord, WordProvider, WordWidget } from "@/components/WordWidget";
import { useEffect, useState } from "react";
import { Word } from "../../../../../api/__api/Modules/APP_WORD_A_DAY/Module";

export function Overview() {
  const { data, getWordByDate } = useWord();
  const [word, setWord] = useState<Word | null>(null);
  useEffect(() => {
    if (!word && data) {
      const w = getWordByDate(new Date());
      setWord(w);
    }
  }, [word, data, getWordByDate]);
  return <WordWidget word={word ?? undefined} />;
}

export default function HomeScreen() {
  return (
    <WordProvider>
      <View style={{ flexGrow: 1 }}>
        <Overview />
      </View>
    </WordProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
