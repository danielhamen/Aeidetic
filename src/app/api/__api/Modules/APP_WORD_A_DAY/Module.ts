import fs from "fs";
import { Endpoint, EndpointRequest, JSONEndpoint } from "../../Types/Endpoint";
import { Module } from "./../../Types/Module";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Middleware as EndpointMiddleware } from "../../Types/Middleware";

export interface Word {
  id: number;
  word: string;
  definition: string;
  example: string;
  etymology: string;
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
  related: string[];
  translations: {
    de: string[];
    fr: string[];
    es: string[];
    it: string[];
  };
}

export interface IWordManager {
  startDate: Date;
  endDate: Date;
  getWordByDate(date: Date): Word | undefined;
  getWordsByRange(startDate: Date, endDate: Date): Word[] | undefined;
  getWords(): Word[];
  getWordById(id: number): Word | undefined;
  loadDefaults(): Promise<void>;
}

export class WordManager implements IWordManager {
  private words: Word[];

  constructor() {
    this.words = [];
  }

  get startDate(): Date {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setFullYear(2025);
    return startDate;
  }

  get endDate(): Date {
    const endDate = new Date(this.startDate);
    endDate.setDate(this.startDate.getDate() + this.getWordIds().length);

    return endDate;
  }

  getWordsByRange(
    startDate: Date,
    endDate: Date,
    exitWhenUndefined: boolean = true,
  ): Word[] | undefined {
    const words: Word[] = [];
    const d = new Date(startDate);
    while (d.getTime() < endDate.getTime()) {
      const w = this.getWordByDate(d);
      if (!w && exitWhenUndefined) {
        return undefined;
      } else if (!w) {
        continue;
      }

      words.push(w);
      d.setTime(d.getTime() + 60 * 60 * 24);
    }

    return words;
  }

  getWordByDate(date: Date, clamp: boolean = false): Word | undefined {
    const deltaDays = Math.floor(
      (date.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    return this.getWordById(
      this.getWordIds()[deltaDays % (clamp ? this.words.length : 1)],
    );
  }

  getWordIds(): number[] {
    return Object.values(this.words)
      .map((word) => word.id)
      .sort();
  }

  getWordById(id: number): Word | undefined {
    return Object.values(this.words).find((word) => word.id === id);
  }

  async loadDefaults(): Promise<void> {
    const dataPath = path.join(__dirname, "data.json");
    const wordList = await fs.promises
      .readFile(dataPath, "utf8")
      .then((data) => {
        const words = JSON.parse(data);
        Object.keys(words).forEach((key) => {
          words[key] = WordManager.parseWord(words[key]);
          if (!words[key]) {
            delete words[key];
          }
        });
        console.log("\n\n", words, "\n\n");
        this.words = words;
        return this.words;
      });

    this.words = wordList;
  }

  getWords(): Word[] {
    return this.words;
  }

  static parseWord(word: any): Word | undefined {
    const wordRecord: Word = {
      lexeme: word?.lexeme,
      id: word?.id,
      definition: word?.definition,
      example: word?.example,
      etymology: word?.etymology,
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

    if (Object.values(wordRecord).some((v) => v === undefined))
      return undefined;
    return wordRecord;
  }
}

/**
 * Parses a date string in the format YYYY-MM-DD.
 */
function parseDate(dateString: any): Date | undefined {
  if (typeof dateString !== "string") return undefined;

  const packedDate = dateString.split("-").map(Number);
  if (packedDate.length !== 3) return undefined;
  if (!packedDate.every((v) => Number.isInteger(v))) return undefined;

  const date = new Date(dateString);
  const YYYY = packedDate[0];
  const MM = packedDate[1];
  const DD = packedDate[2];

  if (YYYY < 1970 || YYYY > 2100) return undefined;
  if (MM < 1 || MM > 12) return undefined;
  if (DD < 1 || DD > 31) return undefined;

  return date;
}

const Middleware: Record<string, EndpointMiddleware> = {
  EnforceSearchQuery: async ({ url, blockRequest, setStatus }) => {
    const q = url.searchParams.get("query");
    const isValid = (q: string | null) => {
      switch (q) {
        case "date":
          const date = url.searchParams.get("date");
          if (parseDate(date)) {
            return true;
          }
          break;
        case "range":
          const startDate = url.searchParams.get("start-date");
          const endDate = url.searchParams.get("end-date");
          if (parseDate(startDate) && parseDate(endDate)) {
            return true;
          }
          break;
        case null:
          return true;
      }
    };

    if (isValid(q)) {
      return true;
    }

    blockRequest("BAD");
    setStatus(400);
  },
};

const mod: Module = {
  id: "APP_WORD_A_DAY",
  basePath: "WORD_A_DAY",
  endpoints: (): Endpoint[] => {
    return [
      {
        path: "data",
        contentType: "application/json",
        method: "GET",
        middleware: [Middleware.EnforceSearchQuery],
        content: async ({ url, blockRequest, setStatus }: EndpointRequest) => {
          const wm = new WordManager();
          await wm.loadDefaults();

          type SearchQuery = "date" | "range" | null;
          const searchQuery = url.searchParams.get("query") as SearchQuery;

          const getResponse = () => {
            switch (searchQuery) {
              case "date":
                const date = parseDate(url.searchParams.get("date")) as Date;
                const word = wm.getWordByDate(date);
                if (!word) {
                  blockRequest("DateOutOfRange");
                  setStatus(400);
                  return;
                }

                return word;
              case "range":
                const startDate = parseDate(
                  url.searchParams.get("start-date"),
                ) as Date;
                const endDate = parseDate(
                  url.searchParams.get("end-date"),
                ) as Date;
                const words = wm.getWordsByRange(startDate, endDate);
                if (!words || words.length < 1) {
                  blockRequest("DateOutOfRange");
                  setStatus(400);
                  return;
                }

                return words;
              default:
                const _word = wm.getWordByDate(new Date());
                if (!_word) {
                  blockRequest("DateOutOfRange");
                  setStatus(400);
                  return;
                }

                return _word;
            }
          };

          const response = getResponse();
          if (!response) {
            blockRequest("Test");
            setStatus(400);
            return;
          }

          return response as JSONEndpoint;
        },
      },
    ];
  },
};

export default mod;
