import { ServiceNode } from "../ServiceNode";

/**
 * ServiceNode responsible for random operations.
 */
export class RandomServiceNode extends ServiceNode {
  /**
   * Constructs the RandomServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "random",
      serviceName: "Random Service",
      serviceDescription: "Handles Random Operations",
      servicePermissions: [],
    });
  }

  /**
   * Generates a random UUIDv4.
   */
  randomUUID(): string {
    return crypto.randomUUID();
  }

  /**
   * Generates a random number. Calls `Math.random()`
   *
   * This function should be called instead of Math.random()
   * directly to ensure consistent behavior across different
   * environments as well as keeping all operations internal.
   */
  random(): number {
    return Math.random();
  }

  /**
   * Returns a random element of `population`
   */
  randomChoice<T>(population: T[]): T {
    return population[Math.floor(Math.random() * population.length)];
  }

  /**
   * Returns `k` random elements of `population`
   */
  randomChoices<T>(population: T[], k: number): T[] {
    const choices = [];
    for (let i = 0; i < k; i++) {
      choices.push(this.randomChoice(population));
    }
    return choices;
  }

  /**
   * Returns `k` unique random elements of `population`
   */
  randomUniqueChoices<T>(population: T[], k: number): T[] {
    const choices = [];
    const usedIndices = new Set<number>();
    for (let i = 0; i < k; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * population.length);
      } while (usedIndices.has(index));
      choices.push(population[index]);
      usedIndices.add(index);
    }
    return choices;
  }

  /**
   * Generates a random integer within a specified range.
   * @param min The minimum value of the range (inclusive).
   * @param max The maximum value of the range (inclusive).
   * @returns A random integer within the specified range.
   */
  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random float within a specified range.
   * @param min The minimum value of the range (inclusive).
   * @param max The maximum value of the range (inclusive).
   * @returns A random float within the specified range.
   */
  randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generates a random boolean value.
   * @returns A random boolean value.
   */
  randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Initializes the RandomServiceNode.
   */
  async initialize(): Promise<void> {
    console.log(`[${this.serviceName}] initialized.`);
  }

  /**
   * Shuts down the RandomServiceNode.
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
