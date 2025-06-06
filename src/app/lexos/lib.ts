export type LanguageType = "real" | "code";
export type LanguageDifficulty = "easy" | "medium" | "hard";

export interface GameProps {
  contentType: LanguageType[];
}

export interface Language {
  id: string;
  name: string;
  aliases: string[];
  difficulty: LanguageDifficulty;
  prism?: string;
  overview?: string;
  examples: string[];
}

export interface Round {}
