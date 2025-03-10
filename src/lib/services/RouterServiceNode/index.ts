import { ServicePermission } from "./../ServicePermission.ts";
import { ServiceNode } from "./../ServiceNode.ts";
import React from "react";

export class RouterServiceNode extends ServiceNode {
  /**
   * Constructs a new RouterServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "router",
      serviceName: "Router Service",
      serviceDescription: "A service for routing requests",
      servicePermissions: [],
    });
  }

  /**
   * Initializes the FileStorageServiceNode.
   */
  async initialize(): Promise<void> {
    console.log(`[${this.serviceName}] initialized.`);
  }

  /**
   * Shuts down the FileStorageServiceNode.
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
