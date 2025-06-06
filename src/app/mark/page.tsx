"use client";
import React from "react";
import {
  AppIcon,
  AppHeader,
  Flex,
  Text,
  Button,
  Divider,
} from "api/components/web";

function Header() {
  return (
    <AppHeader
      title="Mark"
      icon={<AppIcon name="qr_code" />}
      showUserMenu={true}
    />
  );
}

type QRType = "URL" | "Text" | "Email";

interface AppContext {
  type: QRType;
  setType: (type: QRType) => void;
  content: string;
  setContent: (value: string) => void;
}

const AppCtx = React.createContext<AppContext | null>(null);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = React.useState<QRType>("URL");
  const [content, setContent] = React.useState<string>("");

  return (
    <AppCtx.Provider value={{ type, setType, content, setContent }}>
      {children}
    </AppCtx.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppCtx);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

function QRTypeSelector() {
  const { type, setType } = useAppContext();
  const options: QRType[] = ["URL", "Text", "Email"];

  return (
    <Flex direction="row" gap={2} className="mb-4">
      {options.map((opt) => (
        <Button
          key={opt}
          onClick={() => setType(opt)}
          buttonStyle={type === opt ? "primary" : "outline"}
        >
          {opt}
        </Button>
      ))}
    </Flex>
  );
}

function QRContentInput() {
  const { content, setContent } = useAppContext();
  return (
    <Flex direction="column" className="w-full mb-4">
      <Text size="sm" weight="medium" className="mb-1">
        Enter {content?.trim() ? content : "value"}:
      </Text>
      <textarea
        value={content}
        placeholder="Type or paste your content here..."
        onChange={(e) => setContent(e.target.value)}
        className="resize-none w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </Flex>
  );
}

function QRPlaceholder() {
  return (
    <Flex
      align="center"
      justify="center"
      className="w-full h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg"
    >
      <Text size="lg" color="gray">
        QR Code Preview
      </Text>
    </Flex>
  );
}

function MainLayout() {
  return (
    <Flex
      direction="column"
      className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden md:flex-row md:divide-x"
    >
      <Flex className="p-6 md:w-1/2" direction="column">
        <QRTypeSelector />
        <QRContentInput />
        <Divider />
        <Button className="my-4">Generate QR Code</Button>
      </Flex>

      <Flex
        className="p-6 md:w-1/2"
        direction="column"
        align="center"
        justify="center"
      >
        <QRPlaceholder />
      </Flex>
    </Flex>
  );
}

export default function Page() {
  return (
    <Flex direction="column" className="min-h-screen">
      <Header />
      <AppProvider>
        <Flex className="flex-1 p-8 bg-gray-50">
          <MainLayout />
        </Flex>
      </AppProvider>
    </Flex>
  );
}
