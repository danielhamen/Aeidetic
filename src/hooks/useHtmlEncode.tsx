import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { encode, decode } from "html-entities";

export type EntitiesJsonData = {};

const EntitiesContext = createContext<EntitiesJsonData | undefined>(undefined);

export const HtmlEntitiesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [entities, setEntities] = useState<EntitiesJsonData>({});

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

  return {
    encode: (s: string) => encode(s).replace(/ /g, "&nbsp;"),
    decode: (s: string) => decode(s),
  };
}
