import { NextRequest } from "next/server";
import { Middleware } from "./Middleware";

export interface EndpointRequest {
  req: NextRequest;
  url: URL;
  blockRequest: (reason?: string) => void;
  setStatus: (status: number) => void;
}

export type XMLEndpoint = XMLDocument;

export type JSONEndpoint = Record<string, unknown>;

export type Endpoint = {
  path: string;
  contentType: "application/xml" | "application/json";
  content: (req: EndpointRequest) => Promise<XMLEndpoint | JSONEndpoint>;
  middleware?: Middleware[];
  method: "GET" | "POST" | "PUT" | "DELETE";
};
