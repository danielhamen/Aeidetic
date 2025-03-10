import { ServicePermission } from "./../ServicePermission.ts";
import { ServiceNode } from "./../ServiceNode.ts";

/**
 * ServiceNode responsible for reading and manipulating date and time information.
 */
export class DateTimeServiceNode extends ServiceNode {
  /**
   * Constructs the DateTimeServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "date-time",
      serviceName: "Date Time Service",
      serviceDescription: "Handles date and time operations",
      servicePermissions: [ServicePermission.TIME_READ],
    });
  }

  /**
   * Returns the current date and time as a Date object.
   */
  async getCurrentDateTime(): Promise<Date> {
    return new Date();
  }

  /**
   * Returns the current time in milliseconds (UNIX timestamp).
   */
  async getUnixTimestamp(): Promise<number> {
    return Date.now();
  }

  /**
   * Returns the current date-time in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).
   */
  async getISODateTime(): Promise<string> {
    return new Date().toISOString();
  }

  /**
   * Returns the current date in a formatted string.
   * @param format The format string (e.g., "YYYY-MM-DD HH:mm:ss").
   */
  async getFormattedDate(
    format: string = "YYYY-MM-DD HH:mm:ss",
  ): Promise<string> {
    const now = new Date();
    return this.formatDate(now, format);
  }

  /**
   * Converts a given date-time to a specified timezone.
   * @param date The date to convert.
   * @param timezone The target timezone (e.g., "America/New_York").
   */
  async convertToTimezone(date: Date, timezone: string): Promise<string> {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  /**
   * Adds a specified amount of time to a given date.
   * @param date The date to modify.
   * @param amount The amount to add.
   * @param unit The unit of time (e.g., "milliseconds", "seconds", "minutes", "hours", "days").
   */
  async addTime(date: Date, amount: number, unit: string): Promise<Date> {
    const newDate = new Date(date);
    switch (unit) {
      case "milliseconds":
        newDate.setMilliseconds(newDate.getMilliseconds() + amount);
        break;
      case "seconds":
        newDate.setSeconds(newDate.getSeconds() + amount);
        break;
      case "minutes":
        newDate.setMinutes(newDate.getMinutes() + amount);
        break;
      case "hours":
        newDate.setHours(newDate.getHours() + amount);
        break;
      case "days":
        newDate.setDate(newDate.getDate() + amount);
        break;
      default:
        throw new Error("Invalid time unit.");
    }
    return newDate;
  }

  /**
   * Subtracts a specified amount of time from a given date.
   * @param date The date to modify.
   * @param amount The amount to subtract.
   * @param unit The unit of time (e.g., "milliseconds", "seconds", "minutes", "hours", "days").
   */
  async subtractTime(date: Date, amount: number, unit: string): Promise<Date> {
    return this.addTime(date, -amount, unit);
  }

  /**
   * Calculates the difference between two dates in the specified unit.
   * @param date1 The first date.
   * @param date2 The second date.
   * @param unit The unit of time (e.g., "milliseconds", "seconds", "minutes", "hours", "days").
   */
  async getTimeDifference(
    date1: Date,
    date2: Date,
    unit: string,
  ): Promise<number> {
    const diffMs = date2.getTime() - date1.getTime();
    switch (unit) {
      case "milliseconds":
        return diffMs;
      case "seconds":
        return diffMs / 1000;
      case "minutes":
        return diffMs / (1000 * 60);
      case "hours":
        return diffMs / (1000 * 60 * 60);
      case "days":
        return diffMs / (1000 * 60 * 60 * 24);
      default:
        throw new Error("Invalid time unit.");
    }
  }

  /**
   * Checks if a given year is a leap year.
   * @param year The year to check.
   */
  async isLeapYear(year: number): Promise<boolean> {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /**
   * Formats a date according to a given format.
   * @param date The date to format.
   * @param format The format string (e.g., "YYYY-MM-DD HH:mm:ss").
   */
  private formatDate(date: Date, format: string): string {
    return format
      .replace("YYYY", date.getFullYear().toString())
      .replace("MM", String(date.getMonth() + 1).padStart(2, "0"))
      .replace("DD", String(date.getDate()).padStart(2, "0"))
      .replace("HH", String(date.getHours()).padStart(2, "0"))
      .replace("mm", String(date.getMinutes()).padStart(2, "0"))
      .replace("ss", String(date.getSeconds()).padStart(2, "0"));
  }

  /**
   * Initializes the DateTimeServiceNode.
   */
  async initialize(): Promise<void> {
    console.log(`[${this.serviceName}] initialized.`);
  }

  /**
   * Shuts down the DateTimeServiceNode.
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
