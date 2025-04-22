"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  AppHeader,
  AppIcon,
  C3,
  Divider,
  Flex,
  H1,
  H3,
  H4,
  H6,
  I,
  Icon,
  Text,
  TextAttribute,
} from "api/components/web";
import { usePath } from "api/hooks/usePath";

function LexemeInput({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <TextAttribute
      name="lexeme"
      value={value}
      width={"long"}
      setValue={setValue}
      leadingIcon={<Icon name="edit" size={16} />}
    />
  );
}

function LexemeView({ lexeme }: { lexeme: string }) {
  const [value, setValue] = useState<string>(lexeme);
  return (
    <Flex grow>
      <Flex align="center" className="my-8">
        <LexemeInput value={value} setValue={setValue} />
      </Flex>
      <Flex
        className="p-8 h-full w-full max-w-6xl border-x border-gray-100 mx-auto gap-1"
        grow
      >
        <Flex direction="row" align="center" className="gap-6">
          <H1 style={{ margin: 0 }} weight={600}>
            {lexeme}
          </H1>
          <Text fontFamily="caption">
            <I>noun</I>
          </Text>
        </Flex>
        <Text fontFamily="regular" textColor="gray-500">
          /ˌafəˈdāvət/
        </Text>
        <Text className="mt-4">
          a written statement confirmed by oath or affirmation, used as evidence
          in court
        </Text>
        <Text textColor="gray-600">
          <I>His lawyer filed an affidavit in support of the motion.</I>
        </Text>
        <Divider margin={24} />
        <Flex direction="row" gap={8}>
          <Flex className="flex-1/2 gap-8">
            <Flex gap={4}>
              <H3 style={{ margin: 0 }}>Translations</H3>
              <Flex>
                <H6 style={{ margin: 0 }}>Spanish</H6>
                <Text>
                  <I>declaración judicial</I>
                </Text>
              </Flex>
              <Flex>
                <H6 style={{ margin: 0 }}>French</H6>
                <Text>
                  <I>affidavit</I>
                </Text>
              </Flex>
              <Flex>
                <H6 style={{ margin: 0 }}>German</H6>
                <Text>
                  <I>Zeugnis</I>
                </Text>
              </Flex>
            </Flex>
            <Flex gap={4}>
              <H3 style={{ margin: 0 }}>Origin</H3>
              <Text>
                mid 16th century: from medieval Latin, literally ‘he has stated
                on oath’, from affidare .
              </Text>
            </Flex>
          </Flex>
          <Flex className="flex-1/2 gap-8">
            <Flex gap={4}>
              <H3 style={{ margin: 0 }}>Synonyms</H3>
              <Flex className="list-disc ml-8">
                <Text className="list-item">sworn statement</Text>
                <Text className="list-item">statement</Text>
                <Text className="list-item">testimony</Text>
              </Flex>
            </Flex>
            <Flex gap={4}>
              <H3 style={{ margin: 0 }}>Synonyms</H3>
              <Flex className="list-disc ml-8">
                <Text className="list-item">refutation</Text>
                <Text className="list-item">disproof</Text>
                <Text className="list-item">contravention</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Header() {
  return (
    <AppHeader
      icon={<AppIcon color="amber" name="dictionary" />}
      title="Lexicon"
      showUserMenu={true}
    />
  );
}

export function HomeView() {
  return <Flex>Welcome to the Lexicon!</Flex>;
}

function LayoutHandler() {
  const path = usePath();
  const [content, setContent] = useState<ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (path) {
      let request = path.split("/");
      request = request.slice(request.indexOf("lexicon"));
      if (request.length === 1) {
        setContent(<HomeView />);
        return;
      }

      if (request.length === 3 && request[1] === "lexeme") {
        setContent(<LexemeView lexeme={request[2]} />);
        return;
      }

      setError("404.");
      return;
    }
  }, [path]);

  if (error) {
    return <Flex>Error: {error}</Flex>;
  }

  if (!path) return null;

  return (
    <Flex grow>
      <Header />
      <Flex grow>{content}</Flex>
    </Flex>
  );
}

export default function LexiconPage() {
  return <LayoutHandler />;
}
