"use client";
import React, { useEffect } from "react";
import { AppHeader, AppIcon, Button, Flex, Text } from "api/components/web";
import { useAuth } from "api/lib/hooks/useAuth";

function Header() {
  return (
    <AppHeader
      title="Account"
      icon={<AppIcon name="person" />}
      showUserMenu={true}
    />
  );
}

export default function Page() {
  const auth = useAuth();
  if (auth.loading) return;
  return (
    <Flex>
      <Header />
    </Flex>
  );
}
