import { ServicePermission } from "./../ServicePermission";
import { ServiceNode } from "./../ServiceNode";
import fs from "fs/promises";
import path from "path";

/**
 * Represents metadata about a file.
 */
export interface FileStats {
  /** The size of the file in bytes */
  size: number;

  /** The date and time when the file was created */
  createdAt: Date;

  /** The date and time when the file was last modified */
  modifiedAt: Date;
}

/**
 * ServiceNode responsible for managing file system operations securely.
 *
 * This service handles file reading, writing, deletion, and directory management
 * within its designated root directory. It ensures strict permission enforcement
 * and path validation to prevent unauthorized access.
 */
export class FileStorageServiceNode extends ServiceNode {
  /**
   * Constructs the FileStorageServiceNode instance.
   */
  constructor() {
    super({
      serviceId: "file-storage",
      serviceName: "File Storage Service",
      serviceDescription: "Handles file system operations",
      servicePermissions: [
        ServicePermission.FILE_READ,
        ServicePermission.FILE_WRITE,
        ServicePermission.FILE_DELETE,
      ],
    });
  }

  /**
   * Ensures a file path is within the allowed `rootDirectory` to prevent path traversal attacks.
   *
   * @param filePath - The requested file path.
   * @returns The absolute, sanitized file path.
   * @throws {Error} If the file path is outside the allowed directory.
   */
  async sanitizePath(filePath: string): Promise<string> {
    const safePath = path.resolve(this.rootDirectory, filePath);
    if (!safePath.startsWith(path.resolve(this.rootDirectory))) {
      throw new Error(
        `Access denied: '${filePath}' is outside the allowed directory.`,
      );
    }
    return safePath;
  }

  /**
   * Lists the contents of the root directory.
   *
   * @returns An array of filenames in the directory.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async listDir(): Promise<string[]> {
    await this.ensurePermission(ServicePermission.FILE_READ);
    return fs.readdir(this.rootDirectory);
  }

  /**
   * Retrieves metadata for a specific file.
   *
   * @param filePath - Path to the file.
   * @returns File metadata.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async getFileInfo(filePath: string): Promise<FileStats> {
    await this.ensurePermission(ServicePermission.FILE_READ);
    const safePath = await this.sanitizePath(filePath);
    const stats = await fs.stat(safePath);
    return {
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    };
  }

  /**
   * Reads the contents of a file.
   *
   * @param filePath - Path to the file.
   * @returns The file contents as a string.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async readFile(filePath: string): Promise<string> {
    await this.ensurePermission(ServicePermission.FILE_READ);
    const safePath = await this.sanitizePath(filePath);
    return fs.readFile(safePath, "utf-8");
  }

  /**
   * Writes data to a file, creating it if it doesn't exist.
   *
   * @param filePath - Path to the file.
   * @param content - Data to write.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async writeFile(filePath: string, content: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_WRITE);
    const safePath = await this.sanitizePath(filePath);
    await fs.writeFile(safePath, content, "utf-8");
  }

  /**
   * Appends data to an existing file.
   *
   * @param filePath - Path to the file.
   * @param content - Data to append.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async appendFile(filePath: string, content: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_WRITE);
    const safePath = await this.sanitizePath(filePath);
    await fs.appendFile(safePath, content, "utf-8");
  }

  /**
   * Deletes a file from the system.
   *
   * @param filePath - Path to the file.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async deleteFile(filePath: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_DELETE);
    const safePath = await this.sanitizePath(filePath);
    await fs.unlink(safePath);
  }

  /**
   * Renames a file.
   *
   * @param oldPath - Current file path.
   * @param newPath - New file path.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async renameFile(oldPath: string, newPath: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_WRITE);
    const safeOldPath = await this.sanitizePath(oldPath);
    const safeNewPath = await this.sanitizePath(newPath);
    await fs.rename(safeOldPath, safeNewPath);
  }

  /**
   * Creates a new directory.
   *
   * @param dirPath - Path to the directory.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async createDir(dirPath: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_WRITE);
    const safePath = await this.sanitizePath(dirPath);
    await fs.mkdir(safePath, { recursive: true });
  }

  /**
   * Deletes a directory.
   *
   * @param dirPath - Path to the directory.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async deleteDir(dirPath: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_DELETE);
    const safePath = await this.sanitizePath(dirPath);
    await fs.rmdir(safePath, { recursive: true });
  }

  /**
   * Moves a file or directory to a new location.
   *
   * @param oldPath - The current file/directory path.
   * @param newPath - The target file/directory path.
   * @throws {ServicePermissionError} If the node lacks the required permission.
   */
  async moveItem(oldPath: string, newPath: string): Promise<void> {
    await this.ensurePermission(ServicePermission.FILE_WRITE);
    const safeOldPath = await this.sanitizePath(oldPath);
    const safeNewPath = await this.sanitizePath(newPath);
    await fs.rename(safeOldPath, safeNewPath);
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
