import { TimeProvider } from "api/hooks/useTime";
import React, { ReactNode } from "react";
import { AccentProvider } from "api/hooks/useAccent";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AccentProvider>
      <TimeProvider>{children}</TimeProvider>
    </AccentProvider>
  );
}
