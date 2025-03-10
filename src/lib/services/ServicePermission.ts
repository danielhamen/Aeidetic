/**
 * Defines all possible permissions that a Service Node can have.
 * Permissions are **explicitly granted** to prevent unintended access.
 */
export enum ServicePermission {
  /** Allows reading files from the Service Node's file system. */
  FILE_READ = "FILE:READ",

  /** Allows writing files to the Service Node's file system. */
  FILE_WRITE = "FILE:WRITE",

  /** Allows deleting files from the Service Node's file system. */
  FILE_DELETE = "FILE:DELETE",

  /** Allows accessing the network from the Service Node. */
  NETWORK_ACCESS = "NETWORK:ACCESS",

  /** Allows access to external URLs */
  EXTERNAL_URLS = "EXTERNAL_URLS",

  /** Allows configuration writing */
  CONFIG_WRITE = "CONFIG:WRITE",

  /** Allows configuration reading */
  CONFIG_READ = "CONFIG:READ",

  /** Allows task queuing */
  TASKS_ENQUEUE = "TASKS:ENQUEUE",

  /** Allows task dequeuing */
  TASKS_DEQUEUE = "TASKS:DEQUEUE",

  /** Allows task execution */
  TASKS_EXECUTE = "TASKS:EXECUTE",

  /** Allows task scheduling */
  TASKS_SCHEDULE = "TASKS:SCHEDULE",

  /** Allows task cancellation */
  TASKS_CANCEL = "TASKS:CANCEL",

  /** Allows reading permissions of other service nodes */
  PERMISSION_READ = "PERMISSION:READ",

  /** Allows granting permissions to other service nodes */
  PERMISSION_GRANT = "PERMISSION:GRANT",

  /** Allows revoking permissions from other service nodes */
  PERMISSION_REVOKE = "PERMISSION:REVOKE",

  /** Allows reading time in milliseconds */
  TIME_READ = "TIME:READ",
}
