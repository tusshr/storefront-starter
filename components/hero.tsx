import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-label="Featured"
      className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-10"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-linear-to-br from-muted via-card to-secondary p-8 shadow-sm lg:p-16">
        <div className="absolute inset-0 z-0 opacity-60">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="relative z-10 flex max-w-xl flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-md border border-border bg-background/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Placeholder hero — final design TBD
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Everything you need, delivered across the US.
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Fashion, jewelry, watches, beauty, and more. Free shipping on
            orders over $50.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/c/mens" className={buttonVariants({ size: "lg" })}>
              Shop Men
            </Link>
            <Link
              href="/c/womens"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Shop Women
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
