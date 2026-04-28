import { Suspense } from "react";

import { SiteDock } from "@/components/site-dock";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";

export default function StoreFrontLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <SiteNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <div aria-hidden className="h-20 md:hidden" />
      <Suspense fallback={null}>
        <SiteDock />
      </Suspense>
    </>
  );
}
