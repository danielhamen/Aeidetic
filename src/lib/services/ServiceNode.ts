import { ServicePermission } from "./ServicePermission.ts";
import { ServicePermissionError } from "./../Errors/ServicePermissionError.ts";
import { ServiceRegistry } from "./ServiceRegistry.ts";

/**
 * Defines the structure of a ServiceNode, which represents an independent service
 * responsible for specific tasks, such as logging, networking, or authentication.
 *
 * Each ServiceNode operates within a defined scope and has restricted permissions
 * to ensure security and modularity.
 */
export interface IServiceNode {
  /** Unique identifier for the Service Node */
  readonly serviceId: string;

  /** Human-readable name of the Service Node */
  readonly serviceName: string;

  /** A detailed description of what the Service Node does */
  readonly serviceDescription: string;

  /** The specific set of permissions granted to the Service Node */
  readonly servicePermissions: ServicePermission[];

  /** The absolute root path this Service Node is allowed to access (if applicable) */
  readonly rootDirectory: string;

  /** The external URLs this Service Node is allowed to access (if applicable) */
  readonly externalUrls?: string[];

  /**
   * Initializes the ServiceNode and sets up required configurations.
   * This method is called when the ServiceNode is first registered.
   */
  initialize(): Promise<void>;

  /**
   * Shuts down the ServiceNode, ensuring a clean exit and resource cleanup.
   */
  shutdown(): Promise<void>;

  /**
   * Ensures that the ServiceNode has the required permission before executing an operation.
   * Throws a `ServicePermissionError` if the permission is not granted.
   *
   * @param permission - The required permission to be checked.
   * @throws {ServicePermissionError} If the ServiceNode does not have the required permission.
   */
  ensurePermission(permission: ServicePermission): Promise<void>;
}

/**
 * Abstract class representing a base ServiceNode.
 *
 * ServiceNodes are self-contained units responsible for handling specific
 * operations with strict permission controls. Every ServiceNode registers itself
 * to the `ServiceRegistry` upon creation.
 */
export abstract class ServiceNode implements IServiceNode {
  /** Unique identifier for the Service Node */
  readonly serviceId: string;

  /** Human-readable name of the Service Node */
  readonly serviceName: string;

  /** A detailed description of what the Service Node does */
  readonly serviceDescription: string;

  /** The specific set of permissions granted to the Service Node */
  readonly servicePermissions: ServicePermission[];

  /** The absolute root path this Service Node is allowed to access (if applicable) */
  readonly rootDirectory: string;

  /** The external URLs this Service Node is allowed to access (if applicable) */
  readonly externalUrls: string[];

  /**
   * Constructs a new ServiceNode instance.
   *
   * @param params - Configuration options for the ServiceNode.
   * @param params.serviceId - Unique identifier for the ServiceNode.
   * @param params.serviceName - Human-readable name of the ServiceNode.
   * @param params.serviceDescription - Description of the ServiceNode's purpose.
   * @param params.servicePermissions - List of granted permissions.
   * @param params.rootDirectory - The root directory this ServiceNode has access to.
   * @param params.externalUrls - A list of allowed external URLs for this ServiceNode.
   */
  constructor(params: {
    serviceId: string;
    serviceName: string;
    serviceDescription: string;
    servicePermissions: ServicePermission[];
    rootDirectory?: string;
    externalUrls?: string[];
  }) {
    this.serviceId = params.serviceId;
    this.serviceName = params.serviceName;
    this.serviceDescription = params.serviceDescription;
    this.servicePermissions = params.servicePermissions;
    this.rootDirectory = params.rootDirectory ?? "/";
    this.externalUrls = params.externalUrls ?? [];

    // Automatically register the ServiceNode with the ServiceRegistry
    ServiceRegistry.register(this);
  }

  /**
   * Ensures that the ServiceNode has the necessary permission before executing an operation.
   * If the permission is not found in `servicePermissions`, an error is thrown.
   *
   * @param permission - The permission to check.
   * @throws {ServicePermissionError} If the ServiceNode lacks the required permission.
   */
  async ensurePermission(permission: ServicePermission): Promise<void> {
    if (!this.servicePermissions.includes(permission)) {
      throw new ServicePermissionError(
        `Permission denied: '${this.serviceId}' does not have '${permission}'.`,
      );
    }
  }

  /** Lifecycle method to initialize the ServiceNode */
  abstract initialize(): Promise<void>;

  /** Lifecycle method to gracefully shut down the ServiceNode */
  abstract shutdown(): Promise<void>;
}
