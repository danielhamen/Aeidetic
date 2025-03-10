import { ServicePermission } from "./../ServicePermission.ts";
import { ServiceNode } from "./../ServiceNode.ts";

export class NetworkServiceNode extends ServiceNode {
  constructor() {
    super({
      serviceId: "network",
      serviceName: "Network Service",
      serviceDescription: "Handles external API calls",
      servicePermissions: [ServicePermission.NETWORK_ACCESS],
      externalUrls: ["api.example.com", "services.axiom.io"],
    });
  }

  async sanitizeUrl(url: string): Promise<string> {
    const parsedUrl = new URL(url);
    if (!this.externalUrls.includes(parsedUrl.hostname)) {
      throw new Error(`Access denied: Unauthorized external URL '${url}'`);
    }
    return url;
  }

  async getRequest(url: string): Promise<any> {
    await this.ensurePermission(ServicePermission.NETWORK_ACCESS);
    const sanitizedUrl = await this.sanitizeUrl(url);

    const response = await fetch(sanitizedUrl, { method: "GET" });
    if (!response.ok)
      throw new Error(`GET request failed: ${response.statusText}`);

    return response.json();
  }

  async postRequest(url: string, data: any): Promise<any> {
    await this.ensurePermission(ServicePermission.NETWORK_ACCESS);
    const sanitizedUrl = await this.sanitizeUrl(url);

    const response = await fetch(sanitizedUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok)
      throw new Error(`POST request failed: ${response.statusText}`);

    return response.json();
  }

  async initialize(): Promise<void> {
    console.log(`[${this.serviceName}] initialized.`);
  }

  async shutdown(): Promise<void> {
    console.log(`[${this.serviceName}] shutting down.`);
  }
}
