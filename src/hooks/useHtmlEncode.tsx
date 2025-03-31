import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

export type EntitiesJsonData = object;

const EntitiesContext = createContext<EntitiesJsonData | undefined>(undefined);

export const HtmlEntitiesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [entities] = useState<EntitiesJsonData>({});

  // useEffect(() => {
  //   fetch("/assets/data/htmlEntities.json")
  //     .then((response) => response.json())
  //     .then((data) => setEntities(data))
  //     .catch((err) => console.error("Failed to load entities JSON:", err));
  // }, []);

  return (
    <EntitiesContext.Provider value={entities}>
      {children}
    </EntitiesContext.Provider>
  );
};

export function useHtmlEncode(): {
  encode: (s: string) => string;
  decode: (s: string) => string;
} {
  const entities = useContext(EntitiesContext);
  if (entities === undefined) {
    throw new Error(
      "useHtmlEntities must be used within a <HtmlEntitiesProvider>",
    );
  }

  throw new Error("Not implemented");

  return {
    encode: (s: string) => s,
    decode: (s: string) => s,
  };
}
