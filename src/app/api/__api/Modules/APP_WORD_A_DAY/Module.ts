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
  lexeme: string;
  definition: string;
  example: string;
  ipa?: string;
  pronunciation?: string;
  etymology: string;
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
  date: `${string}-${string}-${string}`;
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
  getWords(): Record<string, Word>;
  getWordById(id: number): Word | undefined;
  loadDefaults(): Promise<void>;
}

export class WordManager implements IWordManager {
  private words: Record<string, Word>;

  constructor() {
    this.words = {};
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

  getWordByDate(date: Date): Word | undefined {
    return Object.values(this.words)
      .sort((a, b) => {
        const ad = parseDate(a.date);
        const bd = parseDate(b.date);
        if (!ad || !bd) {
          console.error("Invalid entry for ", a.lexeme, b.lexeme);
          return 0;
        }

        return ad.getTime() - bd.getTime();
      })
      .find((w) => {
        console.log(
          w.date,
          `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
        );
        return (
          w.date ===
          `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${(date.getDate() + 1).toString().padStart(2, "0")}`
        );
      });
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
    // Path to data.json
    const dataPath = path.join(__dirname, "data.json");

    // Read data.json
    const wordList = await fs.promises
      .readFile(dataPath, "utf8")
      .then((data) => {
        const words = JSON.parse(data);
        Object.keys(words).forEach((key) => {
          words[key] = WordManager.parseWord(words[key]);

          // Remove if `parseWord` returns undefined
          if (!words[key]) {
            delete words[key];
          }
        });
        this.words = words;
        return this.words;
      });

    this.words = wordList;
  }

  getWords(): Record<string, Word> {
    return this.words;
  }

  static isWordLike(obj: unknown): obj is Word {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "lexeme" in obj &&
      "id" in obj &&
      "definition" in obj &&
      "example" in obj &&
      "etymology" in obj &&
      // "pronunciation" in obj &&
      // "ipa" in obj &&
      "partOfSpeech" in obj &&
      "date" in obj &&
      "synonyms" in obj &&
      "antonyms" in obj &&
      "related" in obj &&
      "translations" in obj
    );
  }

  static parseWord(word: unknown): Word | undefined {
    if (!this.isWordLike(word)) return undefined;

    const wordRecord: Word = {
      lexeme: word.lexeme,
      id: word.id,
      definition: word.definition,
      example: word.example,
      etymology: word.etymology,
      pronunciation: word.pronunciation,
      ipa: word.ipa,
      partOfSpeech: word.partOfSpeech,
      date: word.date,
      synonyms: word.synonyms,
      antonyms: word.antonyms,
      related: word.related,
      translations: {
        de: word.translations.de,
        fr: word.translations.fr,
        es: word.translations.es,
        it: word.translations.it,
      },
    };

    return wordRecord;
  }
}

/**
 * Parses a date string in the format YYYY-MM-DD.
 */
function parseDate(dateString: unknown): Date | undefined {
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
        case "getstartdate":
          return true;
        case null:
          return true;
      }
    };

    if (isValid(q)) {
      return;
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

          type SearchQuery = "date" | "range" | "getstartdate" | null;
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
              case "getstartdate":
                return {
                  year: wm.startDate.getFullYear(),
                  month: wm.startDate.getMonth() + 1,
                  day: wm.startDate.getDate(),
                };
              default:
                const _words = wm.getWords();
                if (!_words || Object.keys(_words).length === 0) {
                  blockRequest("WordsNotFound");
                  setStatus(400);
                  return;
                }

                return _words;
            }
          };

          const response = getResponse();
          if (!response) {
            // blockRequest("Test");
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
