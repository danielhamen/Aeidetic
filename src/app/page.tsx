"use client";
import { Flex } from "api/components/layout/Flex";
import { Button } from "api/components/input/Button";
import { TextAttribute } from "api/components/attributes/TextAttribute";
import { useState } from "react";
import { Stack } from "api/components/layout/Stack";
import { Icon } from "api/components/icon/Icon";
import { EmailAttribute } from "api/components/attributes/EmailAttribute";
import { Divider } from "api/components/layout/Divider";
import { PasswordAttribute } from "api/components/attributes/PasswordAttribute";

export default function Home() {
  const [value, setValue] = useState("");
  return (
    <Flex className="p-32" direction="row">
      <Flex direction="column" gap={8}>
        <EmailAttribute
          value={value}
          setValue={setValue}
          name="email"
          placeholder="Type your email"
        />
        <PasswordAttribute
          value={value}
          setValue={setValue}
          name="password"
          placeholder="Type your password"
        />
        <Divider maxSize={"80%"} alignSelf="center" />
        <Button textContent="Sign Up!" onClick={() => {}} width={"medium"} />
      </Flex>
      <Divider
        vertical={true}
        marginStart={32}
        marginEnd={32}
        maxSize={128}
        alignSelf="center"
      />
    </Flex>
  );
}
