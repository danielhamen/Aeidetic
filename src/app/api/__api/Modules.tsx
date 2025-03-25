import { ModuleRegistry } from "./Types/ModuleRegistry";

// Asynchronously load modules
const moduleNames = ["APP_WORD_A_DAY"];
const modulePromises = moduleNames.map((name) =>
  import(`./Modules/${name}/Module`).then((mod) => mod.default),
);

// Load modules and create the registry
export const Modules = Promise.all(modulePromises).then((resolvedModules) => {
  return new ModuleRegistry(resolvedModules);
});
