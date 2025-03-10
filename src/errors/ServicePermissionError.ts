/**
 * Custom error class for handling permission-related errors in ServiceNodes.
 *
 * This error is thrown when a ServiceNode attempts to perform an operation
 * without having the necessary permission.
 */
export class ServicePermissionError extends Error {
  /**
   * Constructs a new `ServicePermissionError`.
   *
   * @param message - A descriptive error message explaining the missing permission.
   */
  constructor(message: string) {
    super(message);

    // Set the error name explicitly
    this.name = "ServicePermissionError";
  }
}
