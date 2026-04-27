import { ViewTransition } from "react";

import { SiteDock } from "@/components/site-dock";

export default function StoreFrontLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransition>
      {children}
      <div aria-hidden className="h-20 md:hidden" />
      <SiteDock />
    </ViewTransition>
  );
}
