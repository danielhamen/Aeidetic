import { EndpointRequest } from "./Endpoint";

export type Middleware = (req: EndpointRequest) => Promise<void>;
