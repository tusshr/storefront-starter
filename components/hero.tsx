import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-label="Featured"
      className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-10"
    >
      <div className="border-border from-muted via-card to-secondary relative overflow-hidden rounded-xl border bg-linear-to-br p-8 shadow-sm lg:p-16">
        <div className="absolute inset-0 z-0 opacity-60">
          <div className="bg-primary/10 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl" />
          <div className="bg-accent/30 absolute -bottom-24 -left-16 h-72 w-72 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex max-w-xl flex-col gap-4">
          <span className="border-border bg-background/60 text-muted-foreground inline-flex w-fit items-center rounded-md border px-2.5 py-0.5 text-xs font-medium">
            Placeholder hero — final design TBD
          </span>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need, delivered across the US.
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Fashion, jewelry, watches, beauty, and more. Free shipping on orders
            over $50.
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
