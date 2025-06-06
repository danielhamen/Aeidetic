"use client";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import {
  Flex,
  AppHeader,
  AppIcon,
  H1,
  H3,
  Code,
  Grid,
  CInput,
  CText,
  Icon,
  Text,
  Button,
  H5,
  Divider,
  EnumAttribute,
} from "api/components/web";
import { Highlight as Prism, themes } from "prism-react-renderer";
import { SP } from "next/dist/shared/lib/utils";

function Header() {
  return (
    <AppHeader
      title="Lexos"
      icon={<AppIcon name="heap_snapshot_thumbnail" />}
      showUserMenu={true}
    />
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <Flex
      grow
      className="w-full rounded-lg bg-gray-800 overflow-x-auto border border-gray-700 flex-col text-sm p-4"
    >
      <Prism theme={themes.vsDark} code={code} language={lang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} w-full`}
            style={{ ...style, background: "none" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="text-gray-500 pr-4 w-8 text-right select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });
                  return (
                    <Code key={key} {...tokenProps} textColor={"white"}>
                      {token.content}
                    </Code>
                  );
                })}
              </div>
            ))}
          </pre>
        )}
      </Prism>
    </Flex>
  );
}

function InputWithInlineAutocompletion({
  value,
  setValue,
  onEnter = () => {},
  complete,
}: {
  value: string;
  setValue: (value: string) => void;
  onEnter?: () => void;
  complete: (value: string) => string[];
}) {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setValue(value.trim().toLowerCase());
    setOptions(complete(value).slice(0, 10));
  }, [value, complete, setValue]);

  useEffect(() => {
    setShowSuggestions(
      options.length > 0 &&
        value.length > 0 &&
        document.activeElement === inputRef.current &&
        inputRef.current !== null,
    );
  }, [options, value, inputRef]);

  return (
    <Flex className="relative">
      {/* Inline Text */}
      <Flex className="absolute top-2 left-2 p-[1px] w-full z-20 pointer-events-none">
        <CText
          fontFamily="mono"
          style={{ paddingLeft: `${value.length}ch` }}
          textColor="gray-400"
        >
          {value.length > 0 && options.length > 0
            ? options[selected]?.slice(value.length)
            : ""}
        </CText>
      </Flex>

      {/* Input */}
      <CInput
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        value={value.toLowerCase().trim()}
        setValue={setValue}
        placeholder="Enter your answer"
        className="absolute top-0 left-0 w-full z-10"
        textColor={
          options?.length > 0 || value?.trim()?.length === 0
            ? "gray-800"
            : "red-400"
        }
        ref={inputRef}
        font="mono"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            setValue(options[selected]);
            onEnter();
          } else if (e.key === "ArrowDown") {
            setSelected((selected + 1) % options.length);
            e.preventDefault();
          } else if (e.key === "ArrowUp") {
            setSelected((options.length + (selected - 1)) % options.length);
            e.preventDefault();
          } else if (e.key === "Escape") {
            setSelected(0);
            setValue("");
          } else if (/[0-9]/.test(e.key) && e.key.length === 1 && e.ctrlKey) {
            const num = parseInt(e.key);
            const idx = (10 + (num - 1)) % 10;
            if (idx < options.length) {
              e.preventDefault();
              e.stopPropagation();
              setSelected(idx);
              setValue(options[idx]);
            }
          }
        }}
        onKeyUp={() => {
          if (selected >= options.length) {
            setSelected(0);
          }
        }}
      />

      {/* Right-hand Text */}
      <CText className="absolute top-2 right-2 p-[2px]" fontSize="xs">
        <Code>&#9166; Enter</Code>
      </CText>

      {/* Suggestions */}
      <Flex
        className={`absolute top-12 w-full p-2 bg-white rounded-lg border border-gray-200 ${showSuggestions ? "flex" : "hidden"}`}
      >
        {options.slice(0, 10).map((option, index) => {
          return (
            <Flex key={index} direction="row" align="center" gap={2}>
              <Code fontSize="sm" textColor="gray-500">
                ⌃&thinsp;{(index + 1) % 10}
              </Code>
              {index === selected && <Icon name="arrow_right_alt" size={14} />}
              <Code fontSize="base">{option}</Code>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

function SideMenuItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Flex
      direction="row"
      className="p-4 gap-2 select-none cursor-pointer border border-gray-50 bg-white rounded-lg"
      align="center"
    >
      {icon}
      <Text fontSize={15}>{text}</Text>
    </Flex>
  );
}

function SideMenu() {
  return (
    <Flex direction="row">
      {/* Content */}
      <Flex className="w-96 bg-gray-100 p-1" gap={2}>
        {/* Start New Game */}
        <SideMenuItem
          text="New Game"
          icon={<Icon name="start" color="gray-600" size={20} />}
        />

        {/* Leaderboard */}
        <SideMenuItem
          text="Leaderboard"
          icon={<Icon name="leaderboard" color="gray-600" size={20} />}
        />

        {/* My Games */}
        <SideMenuItem
          text="My Games"
          icon={<Icon name="receipt_long" color="gray-600" size={20} />}
        />

        {/* Learn */}
        <SideMenuItem
          text="Learn"
          icon={<Icon name="school" color="gray-600" size={20} />}
        />
      </Flex>

      {/* Handle */}
      <Flex className="w-[1px] h-full">
        <Flex className="w-full h-full cursor-grab bg-blue-600"></Flex>
      </Flex>
    </Flex>
  );
}

const LanguageContext = createContext<string[] | null>(null);
const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<string[] | null>(null);
  useEffect(() => {
    if (!values) {
      fetch("/public/api/lexos/index.json")
        .then((response) => response.json())
        .then((data) => {
          setValues(Object.keys(data));
        });
    }
  }, [values]);
  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};
const useLanguages = () => useContext(LanguageContext);

function safeStartsWith(str: string, prefix: string): boolean {
  str = str.toLowerCase();
  prefix = prefix.toLowerCase();

  str = str.replace(/\+/g, "p");
  prefix = prefix.replace(/\+/g, "p");

  str = str.replace(/\#/g, "sharp");
  prefix = prefix.replace(/\#/g, "sharp");

  return str.startsWith(prefix);
}

function NewGame() {
  const [languageType, setLanguageType] = useState<string>("spoken");
  const [difficulty, setDifficulty] = useState<string>("easy");

  const sectionHeadingProps = { className: "text-md mt-4 mb-2" };
  return (
    <Flex
      className="p-4 border border-gray-50 bg-white rounded-lg w-2xl h-fit shadow-md"
      gap={2}
    >
      <H3>New Game</H3>
      <Divider />
      <Flex
        direction="column"
        gap={2}
        className="bg-gray-50 p-2 mt-4 shadow-inner rounded-xl"
      >
        <Text fontSize="lg">Game Settings</Text>
        <Flex>
          <Text {...sectionHeadingProps}>Difficulty</Text>
          <EnumAttribute
            items={[
              ["Easy", "easy"],
              ["Medium", "medium"],
              ["Hard", "hard"],
            ]}
            viewStyle="fill"
            width={"full"}
            value={difficulty}
            setValue={setDifficulty}
            textAlign="center"
          />
        </Flex>
        <Flex>
          <Text {...sectionHeadingProps}>Language Type</Text>
          <EnumAttribute
            items={[
              ["Spoken", "spoken"],
              ["Coding", "coding"],
              ["Mixed", "mixed"],
            ]}
            viewStyle="default"
            width={"full"}
            value={languageType}
            setValue={setLanguageType}
            textAlign="left"
          />
        </Flex>
        <Flex>
          <Text {...sectionHeadingProps}>Difficulty</Text>
          <EnumAttribute
            items={[
              ["Easy", "easy"],
              ["Medium", "medium"],
              ["Hard", "hard"],
            ]}
            viewStyle="fill"
            width={"full"}
            value={difficulty}
            setValue={setDifficulty}
            textAlign="center"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function QuizQuestion({ inputType }: { inputType: "choices" | "text" }) {
  const langs = useLanguages();
  const [options, setOptions] = useState<string[] | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [codeAlt, setCodeAlt] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    setTitle("Guess the Language");
    setHint("Hint: It's a popular language for web development.");
    setCodeAlt("Create a function to add two numbers");
    setLang("js");
    setOptions(["JavaScript", "Python", "Java", "C++"]);
    setCode(
      `
function sum(x, y) {
  return x + y;
}
`.trim(),
    );
  }, []);

  if (!options || !title || !hint || !code || !lang || !codeAlt || !langs) {
    return null;
  }

  return (
    <Flex
      className="w-4xl h-fit p-4 bg-white max-w-screen border border-gray-100 rounded-xl shadow-sm"
      gap={4}
    >
      <Flex direction="row">
        <H3 className="text-left">{title}</H3>
      </Flex>
      <CodeBlock code={code} lang={lang} />

      {/* Options */}
      {inputType === "choices" && (
        <Flex gap={4}>
          {options.map((option, index) => (
            <Flex key={index} className="bg-blue-300 p-2 rounded-lg">
              <Code>{option}</Code>
            </Flex>
          ))}
        </Flex>
      )}
      {inputType === "text" && (
        <Flex gap={4}>
          <InputWithInlineAutocompletion
            value={inputValue}
            setValue={setInputValue}
            complete={(value: string) => {
              value = value.trim().toLowerCase();
              return langs.filter((opt) => {
                opt = opt.trim().toLowerCase();
                return safeStartsWith(opt, value);
              });
            }}
          />
        </Flex>
      )}
    </Flex>
  );
}

function Content() {
  return <Flex grow></Flex>;
}

function Layout() {
  return (
    <Flex grow className="relative">
      <Header />
      <Flex grow className="bg-gray-50" direction="row">
        <SideMenu />
        <Content />
      </Flex>
      <Flex
        className="absolute top-0 left-0 w-screen h-screen"
        align="center"
        justify="center"
      >
        <Flex className="absolute left-0 top-0 w-screen h-screen bg-black opacity-20 z-10"></Flex>
        <Flex className="z-20">
          <NewGame />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}
