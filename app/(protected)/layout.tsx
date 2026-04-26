import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <SiteNav />
      <main id="main" className="bg-muted/20 flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
