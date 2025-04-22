import React from "react";
import { AppHeader, AppIcon } from "api/components/web";

export function Header() {
  return (
    <AppHeader
      title="Learn"
      subtitle="by Aeidetic"
      icon={<AppIcon name="school" fill={true} />}
      showUserMenu={true}
    >
      <a href="/learn">Learn</a>
      <a href="/premium">Premium</a>
    </AppHeader>
  );
}
