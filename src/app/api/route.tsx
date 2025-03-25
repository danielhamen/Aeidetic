import { NextRequest, NextResponse } from "next/server";
import { Modules } from "./__api/Modules";
import {
  EndpointRequest,
  XMLEndpoint,
  JSONEndpoint,
} from "./__api/Types/Endpoint";

// Handle GET requests
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const modules = await Modules;
  const endpoint = modules.getEndpointByUrl(url);
  if (!endpoint || endpoint.method !== "GET") {
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  let requestWasBlocked = false;
  let requestError = null;
  let responseStatus = 200;
  const endpointRequest: EndpointRequest = {
    req: req,
    url: url,
    blockRequest: (reason?: string) => {
      requestWasBlocked = true;
      requestError = reason;
      responseStatus = 403;
    },
    setStatus: (status: number) => {
      responseStatus = status;
    },
  };

  // Execute middleware
  const middleware = endpoint?.middleware ?? [];
  await Promise.all(middleware.map((m) => m(endpointRequest)));

  // Proceed with endpoint logic
  if (!requestWasBlocked) {
    const data = await endpoint.content(endpointRequest);
    const contentType = endpoint.contentType;

    if (data && contentType) {
      return new Response(JSON.stringify(data), {
        status: responseStatus,
        headers: { "Content-Type": contentType },
      });
    }
  }

  return new Response(
    JSON.stringify({
      error: `Invalid request: ${requestError || "Unknown error"}`,
    }),
    {
      status: responseStatus,
      headers: { "Content-Type": "application/json" },
    },
  );
}
