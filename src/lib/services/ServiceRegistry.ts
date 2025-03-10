import { ServiceNode } from "./ServiceNode";

export class ServiceRegistry {
  private static nodes: Map<string, ServiceNode> = new Map();

  /** Registers a ServiceNode in the system */
  static register(serviceNode: ServiceNode) {
    if (this.nodes.has(serviceNode.serviceId)) {
      throw new Error(
        `ServiceNode '${serviceNode.serviceId}' is already registered.`,
      );
    }
    this.nodes.set(serviceNode.serviceId, serviceNode);
    console.log(`[ServiceRegistry] Registered: ${serviceNode.serviceName}`);
  }

  /** Unregisters a ServiceNode from the system */
  static unregister(serviceNode: ServiceNode) {
    if (!this.nodes.has(serviceNode.serviceId)) {
      throw new Error(
        `ServiceNode '${serviceNode.serviceId}' is not registered.`,
      );
    }
    this.nodes.delete(serviceNode.serviceId);
    console.log(`[ServiceRegistry] Unregistered: ${serviceNode.serviceName}`);
  }

  /** Retrieves a ServiceNode by its ID */
  static get(serviceId: string): ServiceNode | undefined {
    return this.nodes.get(serviceId);
  }

  /** Retrieves all ServiceNodes */
  static getAll(): ServiceNode[] {
    return Array.from(this.nodes.values());
  }

  /** Checks if a ServiceNode is registered */
  static exists(serviceId: string): boolean {
    return this.nodes.has(serviceId);
  }
}
