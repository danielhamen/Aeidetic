import { MarkProperties } from "./MarkProperties";

/**
 * Node containing exactly one string of text.
 */
export interface MarkNodes {
  id: string;
  name?: string;
  lexeme?: string;
  style?: MarkProperties;
}
