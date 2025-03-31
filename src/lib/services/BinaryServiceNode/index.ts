import { exec } from "child_process";
import { join } from "path";
import { ServiceNode } from "../ServiceNode";
import { ServicePermission } from "../ServicePermission";

/**
 * ServiceNode responsible for running and handling binary executables.
 */
export class BinaryServiceNode extends ServiceNode {
  /**
   * Constructs the BinaryServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "binary",
      serviceName: "Binary Service",
      serviceDescription: "Handles Binary Executables",
      servicePermissions: [ServicePermission.FILE_EXECUTE],
      rootDirectory: "/server/bin",
    });
  }

  /**
   * Executes a registered binary executable.
   */
  async executeCommand(execp: string, args: string[]) {
    const execPath = join(this.rootDirectory, execp);
    try {
      const result = exec(`${execPath} ${args.join(" ")}`);
      console.log(
        `[${this.serviceName}] Executed ${execPath} with args ${args.join(", ")}`,
      );
      console.log(`[${this.serviceName}] Output: ${result.stdout}`);
    } catch (error) {
      console.error(
        `[${this.serviceName}] Error executing ${execPath} with args ${args.join(", ")}`,
      );
      console.error(error);
    }
  }

  /**
   * Initializes the BinaryServiceNode.
   */
  async initialize(): Promise<void> {
    console.log(`[${this.serviceName}] initialized.`);
  }

  /**
   * Shuts down the BinaryServiceNode.
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
