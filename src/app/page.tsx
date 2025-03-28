"use client";
import {
  Flex,
  Button,
  EmailAttribute,
  Divider,
  PasswordAttribute,
} from "api/components/web/index";
import { useState } from "react";

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
