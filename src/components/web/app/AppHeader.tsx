import { Flex, Text, Button, P } from "api/components/web";
import { ReactNode } from "react";

export interface AppHeaderProps {
  icon: ReactNode;

  title: string;

  subtitle?: string;

  showUserMenu?: boolean;

  children?: ReactNode;
}

export function AppHeader({
  icon,
  title,
  subtitle = "by Aeidetic",
  children,
  showUserMenu,
}: AppHeaderProps) {
  return (
    <Flex
      direction="row"
      className={`p-4 px-8 border-b border-gray-100`}
      justify="space-between"
    >
      <Flex align="start" direction="row" gap={2}>
        <Flex className={`mt-2`}>{icon}</Flex>
        <Flex direction="column">
          <Text weight={600} size={32}>
            {title}
          </Text>
          {subtitle && <Text weight={300}>{subtitle}</Text>}
        </Flex>
      </Flex>
      <Flex direction="row" gap={4} align="center" className={`ml-auto w-fit`}>
        {children}
        {showUserMenu ? <Button buttonStyle="outline"> Log in </Button> : <></>}
      </Flex>
    </Flex>
  );
}
