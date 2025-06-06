import { Flex, Text, Button, Icon } from "api/components/web";
import { useAuth } from "api/lib/hooks/useAuth";
import { ReactNode } from "react";

export interface AppHeaderProps {
  icon: ReactNode;

  title: string | ReactNode;

  subtitle?: string;

  showUserMenu?: boolean;

  children?: ReactNode;
}

function UserMenu() {
  const auth = useAuth();
  if (auth.loading) {
    return <Flex></Flex>;
  }

  return (
    <Flex>
      {auth.user ? (
        <Flex direction="row" gap={3}>
          <Icon name="account_circle" />
          <Text>{"@danielhamen_"}</Text>
        </Flex>
      ) : (
        <Button buttonStyle="outline" textAlign="center">
          Join Today!
        </Button>
      )}
    </Flex>
  );
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
          {typeof title === "string" ? (
            <Text fontWeight={"semibold"} fontSize={28}>
              {title}
            </Text>
          ) : (
            title
          )}
          {subtitle && <Text fontWeight="300">{subtitle}</Text>}
        </Flex>
      </Flex>
      <Flex direction="row" gap={4} align="center" className={`ml-auto w-fit`}>
        {children}
        {showUserMenu ? <UserMenu /> : <></>}
      </Flex>
    </Flex>
  );
}
