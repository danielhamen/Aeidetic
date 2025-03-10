import { ServicePermission } from "./../ServicePermission.ts";
import { ServiceNode } from "./../ServiceNode.ts";
import * as fs from "fs/promises";
import path from "path";

/**
 * ServiceNode responsible for encoding strings using HTML entities.
 */
export class StringEncodingServiceNode extends ServiceNode {
  private entities: Record<
    string,
    { codepoints: number[]; characters: string }
  > = {};
  private charToEntityMap: Map<string, string> = new Map();

  /**
   * Constructs the StringEncodingServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "string-encode",
      serviceName: "String Encode Service",
      serviceDescription: "Handles string encoding operations",
      servicePermissions: [],
    });
  }

  /**
   * Initializes the StringEncodingServiceNode.
   */
  async initialize(): Promise<void> {
    try {
      const filePath = path.join(__dirname, "htmlEntities.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      this.entities = JSON.parse(fileContent);

      this.buildCharToEntityMap();

      console.log(
        `[${this.serviceName}] initialized with ${Object.keys(this.entities).length} HTML entities.`,
      );
    } catch (error) {
      console.error(
        `[${this.serviceName}] Failed to load HTML entities:`,
        error,
      );
    }
  }

  /**
   * Builds a mapping from characters to their corresponding HTML entity names.
   */
  private buildCharToEntityMap(): void {
    for (const [entity, { characters }] of Object.entries(this.entities)) {
      for (const char of characters) {
        this.charToEntityMap.set(char, entity);
      }
    }
  }

  /**
   * Encodes a given string by replacing applicable characters with their HTML entity equivalents.
   * @param input - The string to encode.
   * @returns The encoded string.
   */
  encode(input: string): string {
    return input
      .split("")
      .map((char) => this.charToEntityMap.get(char) || char)
      .join("");
  }

  /**
   * Shuts down the StringEncodingServiceNode.
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
