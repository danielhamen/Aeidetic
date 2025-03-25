import { Endpoint, EndpointRequest } from "./Endpoint";

export interface Module {
  id: string;
  basePath: string;
  endpoints: () => Endpoint[];
  name?: string;
  desc?: string;
}
