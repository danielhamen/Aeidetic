import { AppHeader, AppIcon, Button, Flex, Text } from "api/components/web";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <AppHeader title="Expo" icon={<AppIcon name="looks" />}>
      <Link href="/expo/demo">
        <Button buttonStyle="link">Demo</Button>
      </Link>
      <Button buttonStyle="link">Pricing</Button>
      <Button buttonStyle="link">About</Button>
    </AppHeader>
  );
}

function Main() {
  return (
    <Flex>
      <Text>The only service you need for events.</Text>
    </Flex>
  );
}

export default function Page() {
  return (
    <Flex>
      <Header />
      <Main />
    </Flex>
  );
}
