import { ServicePermission } from "./../ServicePermission.ts";
import { ServiceNode } from "./../ServiceNode.ts";

/**
 * ServiceNode responsible for acting as the central API for Verbatum.
 */
export class VerbatumServiceNode extends ServiceNode {
  /**
   * Constructs the VerbatumServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "verbatum",
      serviceName: "Verbatum Service",
      serviceDescription: "Handles Verbatum operations",
      servicePermissions: [],
    });
  }

  /**
   * Initializes the VerbatumServiceNode.
   */
  async initialize(): Promise<void> {
    console.log(`[${this.serviceName}] initialized.`);
  }

  /**
   * Shuts down the VerbatumServiceNode.
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
