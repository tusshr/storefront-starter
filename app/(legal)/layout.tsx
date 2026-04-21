import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <SiteNav />
      <main id="main" className="flex-1 bg-muted/20">
        <article className="mx-auto w-full max-w-3xl px-4 py-12 text-sm leading-6 text-foreground lg:px-8 lg:py-16">
          {children}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
