import { TimeProvider } from "api/hooks/useTime";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <TimeProvider>{children}</TimeProvider>;
}
