import { Endpoint } from "./Endpoint";
import { Module } from "./Module";

export interface IModuleRegistry {
  modules: Module[];
  registerModule(module: Module): void;
  unregisterModule(module: Module): void;
  moduleExists(id: string): boolean;
  getEndpointByUrl(url: URL): Endpoint | undefined;
  getModuleByBasePath(basePath: string): Module | undefined;
}

export class ModuleRegistry implements IModuleRegistry {
  private _modules: Record<string, Module>;

  constructor(modules: Module[]) {
    this._modules = {};
    modules.forEach((module) => this.registerModule(module));
  }

  registerModule(module: Module): void {
    // Ensure no duplicate ID
    if (this._modules[module.id]) {
      throw new Error(`Module with id ${module.id} already registered`);
    }

    // Ensure no duplicate `basePath`
    if (
      Object.values(this._modules).some((m) => m.basePath === module.basePath)
    ) {
      throw new Error(
        `Module with basePath ${module.basePath} already registered`,
      );
    }

    this._modules[module.id] = module;
  }

  unregisterModule(module: Module): void {
    delete this._modules[module.id];
  }

  moduleExists(id: string): boolean {
    return !!this._modules[id];
  }

  getModuleByBasePath(basePath: string): Module | undefined {
    return Object.values(this._modules).find(
      (module) => module.basePath === basePath,
    );
  }

  getEndpointByUrl(url: URL): Endpoint | undefined {
    const targetPath = url.pathname.slice(url.pathname.indexOf("/api") + 5);
    for (let i = 0; i < this.modules.length; i++) {
      const mod = this.modules[i];
      const endpoints = mod.endpoints();
      for (let j = 0; j < endpoints.length; j++) {
        const endpoint = endpoints[j];
        const endpointUrl = `${mod.basePath}/${endpoint.path}`;
        console.log(endpointUrl, targetPath);
        if (endpointUrl === targetPath) {
          return endpoint;
        }
      }
    }

    return undefined;
  }

  get modules(): Module[] {
    return Object.values(this._modules);
  }

  set modules(_: Module[]) {
    throw new Error("Cannot write modules directly");
  }
}
